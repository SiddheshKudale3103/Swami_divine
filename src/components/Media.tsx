type MediaProps = {
  src: string;            // e.g., '/media/clip.mp4' or '/media/photo.jpg'
  alt?: string;
  poster?: string;        // e.g., '/media/clip-poster.jpg'
  className?: string;
  kind: 'image' | 'video';
}

export default function Media({ src, alt, poster, className, kind }: MediaProps) {
  if (kind === 'image') {
    return <img src={src} alt={alt ?? ''} loading="lazy" className={className ?? 'w-full rounded-2xl'} />;
  }
  // If you provide clip.mp4 and clip.webm in /public/media, this tries webm first then mp4.
  const webm = src.replace(/\.[a-zA-Z0-9]+$/, '.webm');
  return (
    <video className={className ?? 'w-full rounded-2xl'} controls playsInline poster={poster}>
      <source src={webm} type="video/webm" />
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
