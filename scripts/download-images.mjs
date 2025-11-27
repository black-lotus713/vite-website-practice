import fs from "node:fs/promises";
import { createWriteStream } from "node:fs";
import path from "node:path";
import https from "node:https";
import http from "node:http";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const MANIFEST_PATH = path.resolve(ROOT_DIR, "src/data/propertyImages.manifest.json");
const OUTPUT_DIR = path.resolve(ROOT_DIR, "public/gallery");

const MAX_REDIRECTS = 5;

const readManifest = async () => {
  const raw = await fs.readFile(MANIFEST_PATH, "utf8");
  return JSON.parse(raw);
};

const writeManifest = async manifest => {
  const contents = `${JSON.stringify(manifest, null, 2)}\n`;
  await fs.writeFile(MANIFEST_PATH, contents, "utf8");
};

const ensureDir = async dir => {
  await fs.mkdir(dir, { recursive: true });
};

const getExtension = urlString => {
  const pathname = new URL(urlString).pathname;
  const ext = path.extname(pathname);
  return ext || ".jpg";
};

const downloadFile = (url, destination, redirectCount = 0) => {
  const client = url.startsWith("https") ? https : http;

  return new Promise((resolve, reject) => {
    client
      .get(url, response => {
        const status = response.statusCode ?? 0;

        if (status >= 300 && status < 400 && response.headers.location) {
          if (redirectCount >= MAX_REDIRECTS) {
            reject(new Error(`Too many redirects for ${url}`));
            return;
          }

          const redirectedUrl = new URL(response.headers.location, url).toString();
          response.resume();
          downloadFile(redirectedUrl, destination, redirectCount + 1)
            .then(resolve)
            .catch(reject);
          return;
        }

        if (status >= 400) {
          response.resume();
          reject(new Error(`Request failed with status ${status} for ${url}`));
          return;
        }

        const fileStream = createWriteStream(destination);
        response.pipe(fileStream);
        fileStream.on("finish", () => fileStream.close(resolve));
        fileStream.on("error", reject);
      })
      .on("error", reject);
  });
};

const downloadImages = async () => {
  const manifest = await readManifest();
  await ensureDir(OUTPUT_DIR);

  for await (const entry of manifest) {
    const extension = getExtension(entry.sourceUrl);
    const fileName = entry.localFileName || `${entry.id}${extension}`;
    const destination = path.resolve(OUTPUT_DIR, fileName);
    const localPath = path.relative(ROOT_DIR, destination);

    const fileExists = await fs
      .access(destination)
      .then(() => true)
      .catch(() => false);

    if (fileExists) {
      console.log(`✔ Skipping ${entry.id}, already downloaded (${fileName})`);
    } else {
      console.log(`⬇ Downloading ${entry.id} → ${fileName}`);
      await downloadFile(entry.sourceUrl, destination);
    }

    entry.localFileName = fileName;
    entry.localPath = localPath.replace(/\\/g, "/");
  }

  await writeManifest(manifest);
  console.log(`\n✅ Download complete. Images stored in ${path.relative(ROOT_DIR, OUTPUT_DIR)}`);
  console.log(`📝 Manifest updated at ${path.relative(ROOT_DIR, MANIFEST_PATH)}`);
};

try {
  await downloadImages();
} catch (error) {
  console.error("Image download failed:", error);
  process.exitCode = 1;
}
