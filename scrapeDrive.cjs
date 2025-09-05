const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// Pass folder link as argument
const folderLink = process.argv[2];
if (!folderLink) {
  console.error("❌ Usage: node scrapeDrive.cjs <FOLDER_LINK>");
  process.exit(1);
}

// Extract folder ID from link
const match = folderLink.match(/folders\/([a-zA-Z0-9_-]+)/);
if (!match) {
  console.error(
    "❌ Invalid folder link. Example: https://drive.google.com/drive/folders/XXXX"
  );
  process.exit(1);
}
const folderId = match[1];

async function scrapeDrive(folderId) {
  try {
    const url = `https://drive.google.com/drive/folders/${folderId}`;
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);
    let links = [];

    // Look for <a> tags with file IDs
    $("a").each((_, el) => {
      const href = $(el).attr("href");
      if (href && href.includes("/file/d/")) {
        const id = href.split("/d/")[1].split("/")[0];
        links.push({
          id,
          direct: `https://drive.google.com/uc?export=download&id=${id}`,
          view: `https://drive.google.com/file/d/${id}/view?usp=sharing`,
        });
      }
    });

    // Save JSON
    fs.writeFileSync("mediaData.json", JSON.stringify(links, null, 2));
    console.log(`✅ Scraped ${links.length} files → mediaData.json`);
  } catch (err) {
    console.error("❌ Error scraping folder:", err.message);
  }
}

scrapeDrive(folderId);
