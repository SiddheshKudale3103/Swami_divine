import { motion } from "framer-motion";
import Media from "./components/Media";
import { ImageMediaData } from "./helpers/ImageMediaData";
import { VideoMediaData } from "./helpers/VideoMediaData";
import { PdfMediaData } from "./helpers/PdfMediaData";

const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "videos", label: "Videos" },
  { id: "contact", label: "Contact" },
];

export default function App() {
  return (
    <div>
      <header className="sticky top-0 z-50 bg-neutral-950/70 backdrop-blur">
        <div className="container-p flex items-center justify-between py-3">
          <a href="#home" className="font-bold tracking-wide">
            DIVINE ✨
          </a>
          <nav className="hidden md:flex gap-4 text-sm">
            {nav.map((n) => (
              <a key={n.id} href={"#" + n.id} className="btn">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="container-p py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid items-center gap-10 md:grid-cols-2"
          >
            <div>
              <h1
                className="title-gradient text-5xl md:text-6xl font-extrabold leading-normal md:leading-snug"
                style={{ overflowWrap: "break-word" }}
              >
                श्री स्वामी समर्थ
                <br /> सेवा सार संघ
              </h1>
              <p className="mt-4 text-neutral-300">
                भक्तांचा एकत्रित प्रवास श्रद्धा विश्वास आणि सेवेसाठी
              </p>
              <div className="mt-6 flex gap-3">
                <a href="#gallery" className="btn">
                  See Gallery
                </a>
                <a href="#contact" className="btn">
                  Contact
                </a>
              </div>
            </div>
            <div className="card">
              <Media
                kind="image"
                src="/media/images/hero.jpg"
                alt="Hero"
                className="w-full rounded-2xl"
              />
            </div>
          </motion.div>
        </section>

        {/* ABOUT */}

        <section id="about" className="container-p py-20">
          <div className="card p-6 border-l-4 border-yellow-400 bg-black/60">
            <h2 className="text-3xl font-semibold title-gradient">
              About the Work
            </h2>
            <p className="mt-3 italic text-neutral-200 leading-relaxed">
              "This devotional service was initiated by
              <span className="font-semibold text-yellow-400">
                {" "}
                Shri Swami Samarth Maharaj
              </span>{" "}
              around 156 years ago. We continue to walk on His path, following
              the principles laid down to understand the soul and attain true
              happiness.{" "}
              <span className="underline decoration-yellow-400/70">
                Here, we guide devotees on how to practice bhakti in its purest
                form, exactly as taught by Swami Samarth — revealing the deeper
                meaning of life and devotion.
              </span>
              <br />
              <span className="text-yellow-300 block mt-2">
                Here, guidance is provided through the Guru–disciple tradition."
              </span>
            </p>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="container-p py-20">
          <h2 className="text-3xl font-semibold title-gradient">Gallery</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {ImageMediaData.map((item, idx) => {
              const ext = item.src.substring(item.src.lastIndexOf(".")); // ".jpeg"
              const prefix = item.src.substring(
                0,
                item.src.lastIndexOf("-") + 1
              ); // "/media/Seva-photo-"
              const src = `${prefix}${idx + 1}${ext}`;
              const alt = `${item.alt}_${idx + 1}`;

              return (
                <div
                  key={idx}
                  className="w-full h-64 flex items-center justify-center rounded-2xl bg-neutral-900/40 relative group"
                >
                  {/* download wrapper */}
                  <a
                    href={src}
                    download={alt}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Media
                      kind="image"
                      src={src}
                      alt={alt}
                      className="max-w-full max-h-full object-contain rounded-2xl"
                    />
                  </a>

                  {/* optional download icon overlay */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition">
                    <a
                      href={src}
                      download={alt}
                      className="bg-black/60 text-white text-xs px-2 py-1 rounded-md"
                    >
                      ⬇ Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        {/* PDFs */}
        <section id="pdfs" className="container-p py-20">
          <h2 className="text-3xl font-semibold title-gradient">PDFs</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {PdfMediaData.map((item, idx) => (
              <Media
                key={idx}
                kind="pdf"
                src={item.src}
                alt={item.title}
                className="card h-40 flex items-center justify-center text-lg font-medium hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
              />
            ))}
          </div>
        </section>

        {/* VIDEOS */}
        <section id="videos" className="container-p py-20">
          <h2 className="text-3xl font-semibold title-gradient">Videos</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {VideoMediaData.map((item, idx) => (
              <Media
                key={idx}
                kind={"video"}
                src={item.src}
                poster={item.poster}
                className="w-full h-72 rounded-2xl object-cover"
              />
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="container-p py-20">
          <div className="card">
            <h2 className="text-3xl font-semibold title-gradient">Contact</h2>
            <p className="mt-3 text-neutral-300">
              Drop a message or blessing ✨
            </p>

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

                // WhatsApp deep link
                const phone = "9860295215";
                // const phone = "7385816591"; // TEMP
                const text = encodeURIComponent(`Hi, I am ${name}. ${message}`);
                window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
              }}
            >
              <input
                className="card"
                type="text"
                name="name"
                placeholder="Your name"
                required
              />
              <textarea
                className="card"
                name="message"
                placeholder="Message"
                rows={4}
                required
              ></textarea>
              <button type="submit" className="btn">
                Send via WhatsApp
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 mt-10">
        <div className="container-p text-sm text-neutral-400">
          © {new Date().getFullYear()} Divine • Built with ❤️
        </div>
      </footer>
    </div>
  );
}
