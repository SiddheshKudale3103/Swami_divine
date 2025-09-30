import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Media from "./components/Media";
import { PdfMediaData } from "./helpers/PdfMediaData";
import en from "./translations/en";
import mr from "./translations/mr";
import Maintenance from "./components/Maintenance";

const translations = { en, mr };

type MediaManifest = {
  images: string[];
  videos: string[];
};

export default function App() {
  const MAINTENANCE_MODE = false;
  const [manifest, setManifest] = useState<MediaManifest>({
    images: [],
    videos: [],
  });

  const [lang, setLang] = useState<"en" | "mr">("en");
  const t = translations[lang];

  // Pagination state
  const IMAGES_PER_PAGE = 6;
  const VIDEOS_PER_PAGE = 4;
  const [imagePage, setImagePage] = useState(1);
  const [videoPage, setVideoPage] = useState(1);
  const [visibleImages, setVisibleImages] = useState<string[]>([]);
  const [visibleVideos, setVisibleVideos] = useState<string[]>([]);

  // Dynamic fetch of manifest.json
  useEffect(() => {
    fetch("/media/manifest.json")
      .then((res) => res.json())
      .then(setManifest)
      .catch(console.error);
  }, []);

  // Update visible images/videos based on page
  useEffect(() => {
    setVisibleImages(manifest.images.slice(0, IMAGES_PER_PAGE * imagePage));
  }, [manifest.images, imagePage]);

  useEffect(() => {
    setVisibleVideos(manifest.videos.slice(0, VIDEOS_PER_PAGE * videoPage));
  }, [manifest.videos, videoPage]);

  const loadMoreImages = () => setImagePage((prev) => prev + 1);
  const loadMoreVideos = () => setVideoPage((prev) => prev + 1);

  if (MAINTENANCE_MODE) return <Maintenance />;

  return (
    <div>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-neutral-950/70 backdrop-blur">
        <div className="px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 gap-2 sm:gap-0">
          <a href="#home" className="font-bold tracking-wide">
            DIVINE ✨
          </a>
          <nav className="flex flex-wrap gap-3 text-sm">
            {Object.entries(t.nav).map(([id, label]) => (
              <a
                key={id}
                href={"#" + id}
                className="relative px-3 py-1 transition text-neutral-300 hover:text-yellow-400 
                  after:content-[''] after:absolute after:left-0 after:-bottom-1 
                  after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 
                  hover:after:w-full"
              >
                {label}
              </a>
            ))}
          </nav>
          <button
            onClick={() => setLang(lang === "en" ? "mr" : "en")}
            className="ml-4 px-3 py-1 rounded bg-yellow-400 text-black"
          >
            {lang === "en" ? "मराठी" : "EN"}
          </button>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="px-4 sm:px-6 lg:px-12 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid items-center gap-10 md:grid-cols-2"
          >
            <div>
              <h1 className="title-gradient font-extrabold text-3xl sm:text-5xl md:text-7xl leading-tight sm:leading-snug md:leading-normal break-words">
                {t.hero.title}
              </h1>
              <p className="mt-4 text-neutral-300">{t.hero.subtitle}</p>
            </div>
            <div className="card">
              <motion.img
                src="/media/logo/hero.webp" // Static hero image
                alt="Hero Image"
                className="w-full rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                loading={"eager"}
              />
            </div>
          </motion.div>
        </section>

        {/* BANNER */}
        <motion.img
          src="/media/banner/banner3.webp"
          alt="Swami Banner"
          className="w-full h-auto object-contain md:object-cover rounded-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          loading={"eager"}
        />

        {/* ABOUT */}
        <section id="about" className="px-4 sm:px-6 lg:px-12 py-20">
          <div className="card p-6 border-l-4 border-yellow-400 bg-black/60">
            <h2 className="text-2xl sm:text-3xl font-semibold title-gradient">
              {t.about.heading}
            </h2>
            <p className="mt-3 italic text-neutral-200 leading-relaxed">
              {t.about.text}
              <br />
              <span className="text-yellow-300 block mt-2">
                {t.about.subtext}
              </span>
            </p>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="px-4 sm:px-6 lg:px-12 py-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold title-gradient leading-snug sm:leading-normal md:leading-relaxed break-words">
            {t.gallery.heading}
          </h2>
          <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {visibleImages.map((src, idx) => (
              <div
                key={idx}
                className="w-full h-64 flex items-center justify-center rounded-2xl bg-neutral-900/40 relative group"
              >
                <a
                  href={src}
                  download
                  className="w-full h-full flex items-center justify-center"
                >
                  <Media
                    kind="image"
                    src={src}
                    alt={`img-${idx}`}
                    className="max-w-full max-h-full object-contain rounded-2xl"
                    loading={"lazy"}
                  />
                </a>
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition">
                  <a
                    href={src}
                    download
                    className="bg-black/60 text-white text-xs px-2 py-1 rounded-md"
                  >
                    {t.gallery.download}
                  </a>
                </div>
              </div>
            ))}
          </div>
          {visibleImages.length < manifest.images.length && (
            <button onClick={loadMoreImages} className="btn mt-4">
              {t.gallery.loadMore}
            </button>
          )}
        </section>

        {/* PDFs */}
        <section id="pdfs" className="px-4 sm:px-6 lg:px-12 py-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold title-gradient leading-snug sm:leading-normal md:leading-relaxed break-words">
            {t.pdfs.heading}
          </h2>
          <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {PdfMediaData.map((item, idx) => (
              <Media
                key={idx}
                kind="pdf"
                src={item.src}
                alt={item.title}
                className="card h-40 flex items-center justify-center text-lg font-medium hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
                loading={"lazy"}
              />
            ))}
          </div>
        </section>

        {/* VIDEOS */}
        <section id="videos" className="px-4 sm:px-6 lg:px-12 py-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold title-gradient leading-snug sm:leading-normal md:leading-relaxed break-words">
            {t.videos.heading}
          </h2>
          <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2">
            {visibleVideos.map((src, idx) => (
              <Media
                key={idx}
                kind="video"
                src={src}
                alt={`video-${idx}`}
                poster="/media/thumbnail/Thumbnail.jpeg"
                className="w-full aspect-video rounded-2xl object-cover"
                loading={"lazy"}
              />
            ))}
          </div>
          {visibleVideos.length < manifest.videos.length && (
            <button onClick={loadMoreVideos} className="btn mt-4">
              {t.videos.loadMore}
            </button>
          )}
        </section>

        {/* CONTACT */}
        <section id="contact" className="px-4 sm:px-6 lg:px-12 py-20">
          <div className="card">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold title-gradient leading-snug sm:leading-normal md:leading-relaxed break-words">
              {t.contact.heading}
            </h2>
            <p className="mt-3 text-neutral-300">{t.contact.subtitle}</p>

            <form
              className="mt-6 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (
                  form.elements.namedItem("name") as HTMLInputElement
                ).value;
                const message = (
                  form.elements.namedItem("message") as HTMLTextAreaElement
                ).value;
                const phone = "9860295215";
                const text = encodeURIComponent(`Hi, I am ${name}. ${message}`);
                window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
              }}
            >
              <div className="flex flex-col">
                <input
                  className="card"
                  type="text"
                  name="name"
                  placeholder={t.contact.namePlaceholder}
                  required
                />
              </div>

              <div className="flex flex-col">
                <textarea
                  className="card"
                  name="message"
                  placeholder={t.contact.messagePlaceholder}
                  rows={4}
                  maxLength={1000}
                  required
                  onInput={(e) => {
                    const target = e.currentTarget;
                    const counter = document.getElementById("charCount");
                    if (counter)
                      counter.textContent = `${target.value.length}/1000`;
                  }}
                />
                <span id="charCount" className="text-xs text-neutral-400 mt-1">
                  0/1000
                </span>
              </div>

              <div className="flex">
                <button type="submit" className="btn mx-auto">
                  {t.contact.button}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 mt-10">
        <div className="px-4 sm:px-6 lg:px-12 text-sm text-neutral-400">
          © {new Date().getFullYear()} Divine • {t.footer.builtWith}
        </div>
      </footer>
    </div>
  );
}
