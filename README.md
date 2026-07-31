# mavoNORM — Premium Bilingual Website

A custom-designed, bilingual (🇵🇱 `/pl` default · 🇬🇧 `/en`) marketing website for **mavoNORM** — exhibition stand design, booth fabrication, CNC production, interiors and commercial space execution.

Built as a premium editorial experience: deep charcoal & paper palette with industrial blue and copper accents, large Space Grotesk display typography, monochrome duotone photography, and GSAP-driven motion.

## Stack

- **Next.js 16** (App Router, fully static SSG) + React 19 + TypeScript
- **Tailwind CSS 4** (design tokens in `globals.css` via `@theme`)
- **GSAP + ScrollTrigger** — text line reveals, masked image reveals, parallax, animated counters, pinned horizontal process storytelling
- **Lenis** — smooth scrolling wired into GSAP's ticker
- Custom cursor, magnetic buttons, preloader, sticky CTA, marquee client strip, lightbox gallery

## Structure

```
src/
  app/[lang]/            # root layout + all pages (pl/en prerendered)
    page.tsx             # Home — hero, services, featured work, stats, CTA
    about/  services/  process/  portfolio/  portfolio/[slug]/  contact/  legal/
  components/            # Fx (scroll animation engine), Header, Gallery, …
  dictionaries/pl.ts,en.ts   # full translated content (CMS-ready shape)
  lib/i18n.ts            # locale helpers
  lib/projects.ts        # bilingual project/case-study data (10 projects)
```

`/` redirects to `/pl` (see `next.config.ts`). The language switcher preserves the current path. Each page emits localized metadata + hreflang alternates; `sitemap.ts` and `robots.ts` cover both locales.

## Develop

```bash
npm install
npm run dev
```

## Notes for production

- **Photography**: generated images live in `public/images/`. `src/lib/images.ts` resolves each image at build time — if the file exists it is used, otherwise a grayscale `picsum.photos` placeholder is shown, so missing images never 404. Drop in files with these exact names to activate them:

  | File | Used on |
  | --- | --- |
  | `home-hero.png` | Home hero — expanding media card (done) |
  | `home-hero-bg.png` | Home hero — background behind the card (fades out on expand) |
  | `about-workshop.png`, `about-detail.png`, `about-hall.png` | About page |
  | `service-<slug>.png` | Services page — slugs: `exhibition-design`, `booth-fabrication`, `installation`, `interiors`, `cnc`, `custom`, `logistics`, `storage`, `maintenance` |
  | `contact-office.png` | Contact page |
  | `sector-<key>.png` | Home sectors hover thumbnails — keys: `automotive`, `technology`, `medical`, `industrial`, `fmcg`, `furniture`, `energy`, `finance` |
  | `process-1.png` … `process-8.png` | How-we-work slider backgrounds, in step order: brief, consultation, concept, engineering, production, QC, installation, support |
  | `portfolio-<key>-hero.png` | Project hero — keys: `helion` (done), `nordicware` (done), `vantum` (done), `arcline`, `gridpower`, `atlas`, `facade`, `korm`, `polar`, `sonar`, `helix` |
  | `portfolio-<key>-1.png` … `-3.png` (`helion` has 4) | Project galleries |

  Landscape ~16:10 works everywhere except `about-workshop.png` (portrait 3:4). The dev server resolves existence at render time; restart `npm run dev` if a newly added image doesn't appear. Prefer re-exporting large PNGs as JPG/WebP eventually — Next/Image optimizes on the fly either way.
- **Hero video**: the home hero uses a parallax still; drop in a `<video>` with fabrication footage for the full cinematic effect.
- **Contact form**: currently client-side only. Wire the submit handler in `src/components/ContactForm.tsx` to a route handler / email service.
- **CMS**: dictionaries and the projects array are deliberately flat and serializable — straightforward to migrate to Payload CMS or headless WordPress.
- Motion respects `prefers-reduced-motion` throughout.
