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
