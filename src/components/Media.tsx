type MediaProps = {
  src: string;
  alt?: string;
  poster?: string;
  className?: string;
  kind: "image" | "video" | "pdf";
};

export default function Media({
  src,
  alt,
  poster,
  className,
  kind,
}: MediaProps) {
  if (kind === "image") {
    return (
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        className={className ?? "w-full rounded-2xl"}
      />
    );
  }

  if (kind === "video") {
    const webm = src.replace(/\.[a-zA-Z0-9]+$/, ".webm");
    return (
      <video
        className={className ?? "w-full rounded-2xl"}
        controls
        playsInline
        poster={poster}
      >
        <source src={webm} type="video/webm" />
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  if (kind === "pdf") {
    return (
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className={className ?? "card p-4 flex justify-center items-center"}
      >
        📖 {alt ?? "Open PDF"}
      </a>
    );
  }

  return null;
}
