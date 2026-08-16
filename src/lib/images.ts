import fs from "node:fs";
import path from "node:path";

const IMG_DIR = path.join(process.cwd(), "public", "images");

/**
 * Resolve a site image at build/render time (server-only): use the generated
 * file from /public/images when it exists, otherwise fall back to a grayscale
 * placeholder so not-yet-generated images never 404.
 */
export function siteImage(name: string, fallbackSeed: string, w = 1600, h = 1000): string {
  try {
    if (fs.existsSync(path.join(IMG_DIR, name))) return `/images/${name}`;
  } catch {
    // fs unavailable — fall through to placeholder
  }
  return `https://picsum.photos/seed/${fallbackSeed}/${w}/${h}`;
}

/**
 * A real client stand photo, by folder key and 1-based index.
 *
 * Use this anywhere a decorative image would otherwise fall back to a stock
 * placeholder. Do NOT use it where the caption claims the image is something
 * else — our production hall or office, for instance — since these are
 * photographs of finished stands on show floors, not of our facility.
 *
 * Returns "" when the file is absent so callers can fall back deliberately.
 */
export function clientPhoto(key: string, n = 1): string {
  const name = `${key}-${String(n).padStart(2, "0")}.webp`;
  try {
    if (fs.existsSync(path.join(IMG_DIR, "client", key, name))) {
      return `/images/client/${key}/${name}`;
    }
  } catch {
    // fs unavailable
  }
  return "";
}
