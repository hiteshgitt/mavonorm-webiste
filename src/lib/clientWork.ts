import fs from "node:fs";
import path from "node:path";

export interface ClientWork {
  /** Folder name under public/images/client — also the DOM id for anchoring. */
  key: string;
  /** Client name as shown on the site. */
  name: string;
  /** Web-sized photos, ordered as supplied. */
  images: string[];
}

/**
 * Real client stands, shown as photography only.
 *
 * Deliberately NOT modelled as `Project` (see ./projects): that shape requires
 * year, area, location, challenge, solution and results, and inventing those
 * for named, identifiable companies would be publishing fabricated claims about
 * real businesses. Everything here is either the client name visible on the
 * stand or supplied directly. Promote an entry to a full case study once the
 * real project details are available.
 */
const CLIENTS: { key: string; name: string }[] = [
  { key: "dji", name: "DJI" },
  { key: "master-lock", name: "Master Lock" },
  { key: "american-orthodontics", name: "American Orthodontics" },
  // The supplied "natural" set turned out to hold three different stands, each
  // identifiable from its own branding, so it is split rather than filed under
  // one client name.
  { key: "natural", name: "Natural" },
  { key: "botanicall", name: "Botanic'all" },
  { key: "atelier-emocio", name: "Atelier Emocio" },
  { key: "lg-chem", name: "LG Chem" },
  { key: "technik", name: "Technik" },
  { key: "sesa-chem", name: "Sesa Chem" },
  { key: "allana", name: "Allana" },
  // `key` is the folder on disk, `name` is what visitors see
  { key: "general", name: "General Electric" },
];

const CLIENT_DIR = path.join(process.cwd(), "public", "images", "client");

/**
 * Read the photo sets at build time. Files are discovered rather than listed so
 * adding or removing a photo needs no code change; a client with no files on
 * disk simply drops out instead of rendering broken images.
 */
export const clientWork: ClientWork[] = CLIENTS.map(({ key, name }) => {
  let images: string[] = [];
  try {
    images = fs
      .readdirSync(path.join(CLIENT_DIR, key))
      .filter((f) => f.endsWith(".webp"))
      .sort()
      .map((f) => `/images/client/${key}/${f}`);
  } catch {
    // folder not present — leave the entry empty and let the filter below drop it
  }
  return { key, name, images };
}).filter((c) => c.images.length > 0);
