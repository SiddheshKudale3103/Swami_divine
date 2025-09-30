import fs from "fs";
import path from "path";

const mediaDir = path.resolve("./public/media");
const manifest = { images: [], videos: [] };

fs.readdirSync(path.join(mediaDir, "images")).forEach((file) => {
  manifest.images.push(`/media/images/${file}`);
});

fs.readdirSync(path.join(mediaDir, "videos")).forEach((file) => {
  manifest.videos.push(`/media/videos/${file}`);
});

fs.writeFileSync(
  path.join(mediaDir, "manifest.json"),
  JSON.stringify(manifest, null, 2)
);

console.log("✅ Manifest generated!");
