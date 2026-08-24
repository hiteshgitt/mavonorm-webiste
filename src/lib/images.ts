import fs from "node:fs";
import path from "node:path";

const IMG_DIR = path.join(process.cwd(), "public", "images");

/**
 * Resolve a site image at build/render time (server-only): use the generated
 * file from /public/images when it exists, otherwise fall back to a grayscale
 * placeholder so not-yet-generated images never 404.
 */
export function siteImage(name: string, fallbackSeed: string, w = 1600, h = 1000): string {
  // prefer the .webp sibling: callers still name the .png/.jpg they authored,
  // but the site always serves the web-sized webp when it has been generated
  const webp = name.replace(/\.(png|jpe?g)$/i, ".webp");
  try {
    for (const candidate of webp === name ? [name] : [webp, name]) {
      if (fs.existsSync(path.join(IMG_DIR, candidate))) return `/images/${candidate}`;
    }
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

/**
 * A photo of one of our builds at a named fair, by fair key and 1-based index.
 *
 * Captioned with the fair and city only. The stands belong to our clients and
 * we do not name them here, so the caption asserts nothing beyond where the
 * build stood — which is what the photo itself shows.
 *
 * Returns "" when the file is absent so callers can drop the tile.
 */
export function fairPhoto(key: string, n = 1): string {
  const name = `${key}-${String(n).padStart(2, "0")}.webp`;
  try {
    if (fs.existsSync(path.join(IMG_DIR, "fairs", key, name))) {
      return `/images/fairs/${key}/${name}`;
    }
  } catch {
    // fs unavailable
  }
  return "";
}

/**
 * Every photo we hold for a fair, in file order.
 *
 * Some fairs are represented by more than one build, so the About grid shows
 * each photo as its own tile rather than silently dropping all but the first.
 * Returns [] when the folder is absent so callers can drop the fair entirely.
 */
export function fairPhotos(key: string): string[] {
  try {
    return fs
      .readdirSync(path.join(IMG_DIR, "fairs", key))
      .filter((f) => f.endsWith(".webp"))
      .sort()
      .map((f) => `/images/fairs/${key}/${f}`);
  } catch {
    // folder absent or fs unavailable
    return [];
  }
}
