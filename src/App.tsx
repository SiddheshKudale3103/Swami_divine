import { motion } from "framer-motion";
import Media from "./components/Media";
import { ImageMediaData } from "./helpers/ImageMediaData";
import { VideoMediaData } from "./helpers/VideoMediaData";

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
                Minimal, calm, and responsive. Drop in your photos and videos
                and go live on Netlify.
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
                src="/media/hero.jpg"
                alt="Hero"
                className="w-full rounded-2xl"
              />
            </div>
          </motion.div>
        </section>

        {/* ABOUT */}
        <section id="about" className="container-p py-20">
          <div className="card">
            <h2 className="text-3xl font-semibold title-gradient">
              About the Work
            </h2>
            <p className="mt-3 text-neutral-300">
              This portfolio is built with Vite + React + Tailwind. It uses
              native HTML video for maximum compatibility across Android, iOS,
              Windows, and macOS.
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
                // const phone = "9860295215";
                const phone = "7385816591"; // TEMP
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
