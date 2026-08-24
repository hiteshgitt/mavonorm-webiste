import fs from "node:fs";
import path from "node:path";
import type { Locale } from "./i18n";

type L<T = string> = Record<Locale, T>;

export type ProjectCategory = "exhibition" | "interior" | "cnc" | "custom";

export interface Project {
  slug: string;
  title: string;
  client?: string;
  category: ProjectCategory;
  industry: L;
  featured?: boolean;
  excerpt: L;
  services: L<string[]>;
  /** What the stand does spatially — described from the photography. */
  overview: L;
  /** How it is built, from what the photography shows. */
  fabrication: L;
  materials: L<string[]>;
  hero: string;
  gallery: string[];

  /**
   * Verifiable specifics we do not have yet. Left undefined rather than filled
   * in: these are real, named clients, and publishing invented figures for them
   * would be a fabricated claim about a real business. The detail page renders
   * only the facts that are present, so entries stay correct while incomplete.
   */
  year?: string;
  location?: string;
  area?: string;
  results?: L;
}

const CLIENT_DIR = path.join(process.cwd(), "public", "images", "client");

/** Photos for a client, in filename order. First is used as the hero. */
function photos(key: string): string[] {
  try {
    return fs
      .readdirSync(path.join(CLIENT_DIR, key))
      .filter((f) => f.endsWith(".webp"))
      .sort()
      .map((f) => `/images/client/${key}/${f}`);
  } catch {
    return [];
  }
}

/** Services every stand here required by virtue of us having built it. */
const CORE = {
  pl: ["Produkcja", "Montaż", "Logistyka"],
  en: ["Fabrication", "Installation", "Logistics"],
};
const withCore = (pl: string[] = [], en: string[] = []): L<string[]> => ({
  pl: [...CORE.pl, ...pl],
  en: [...CORE.en, ...en],
});

/**
 * `key` names a folder under /images/client. Entries whose photography lives in
 * the fairs folder instead — one stand per photo, sometimes several different
 * clients inside one fair folder — list their files explicitly via `images`.
 */
type Entry = Omit<Project, "hero" | "gallery"> & { key: string; images?: string[] };

const ENTRIES: Entry[] = [
  {
    key: "dji",
    location: "Intergeo, Essen",
    slug: "dji-enterprise",
    title: "DJI Enterprise",
    client: "DJI / Epotronic",
    category: "exhibition",
    industry: { pl: "Technologie i drony", en: "Technology & drones" },
    featured: true,
    excerpt: {
      pl: "Ciemna, kątowa zabudowa z podwieszonym fryzem i zamkniętą salą spotkań, zbudowana wokół ekspozycji dronów.",
      en: "A dark, angular build with a suspended fascia and an enclosed meeting room, arranged around a drone display.",
    },
    overview: {
      pl: "Stoisko narożne otwarte z dwóch stron. Podwieszony fryz niesie logotypy ponad ruchem w alejce, a czarna bryła z grafiką w formie chevronu zamyka tło ekspozycji. Białe lady i stoliki tworzą jasny kontrapunkt, a przeszklona sala spotkań daje zaplecze rozmów handlowych bez wychodzenia ze stoiska.",
      en: "A corner stand open on two sides. A suspended fascia carries the logos above aisle traffic, while a black volume with chevron graphics closes the back of the display. White counters and tables give a light counterpoint, and a glazed meeting room keeps sales conversations on the stand.",
    },
    fabrication: {
      pl: "Konstrukcja podwieszana z zabudową płytową, elementy lakierowane na czerń w macie, wielkoformatowe grafiki, wbudowane ekrany i oświetlenie liniowe w suficie oraz podłoga podniesiona z wykładziną.",
      en: "A suspended structure over panel construction, matte black lacquered elements, large-format graphics, integrated screens, linear ceiling lighting and a raised floor with carpet.",
    },
    materials: {
      pl: ["Płyta lakierowana", "Konstrukcja aluminiowa", "Grafika wielkoformatowa", "Szkło", "LED liniowy"],
      en: ["Lacquered panel", "Aluminium structure", "Large-format graphics", "Glass", "Linear LED"],
    },
    services: withCore(["Grafika", "Oświetlenie"], ["Graphics", "Lighting"]),
  },
  {
    key: "master-lock",
    location: "Eisenwarenmesse, Cologne",
    slug: "master-lock",
    title: "Master Lock — The Vault",
    client: "Master Lock",
    category: "exhibition",
    industry: { pl: "Zabezpieczenia", en: "Security products" },
    featured: true,
    excerpt: {
      pl: "Otwarta zabudowa handlowa ze strefą „The Vault” — kratownicową klatką prezentującą produkt jak w skarbcu.",
      en: "An open retail-style build with a \"The Vault\" feature — a barred cage presenting product like a strongroom.",
    },
    overview: {
      pl: "Układ sklepowy: ściany produktowe z ekspozytorami, lada z ekranem i wydzielona strefa demonstracyjna z nawierzchnią trawiastą dla rowerów i hulajnóg. Centralnym punktem jest klatka „The Vault” ze stalowych prętów, która zatrzymuje ruch w alejce i tłumaczy kategorię produktu bez słów.",
      en: "A retail layout: product walls with display hooks, a counter with screen, and a separate demo zone on artificial turf for bikes and scooters. The centrepiece is \"The Vault\", a steel-barred cage that stops aisle traffic and explains the product category without words.",
    },
    fabrication: {
      pl: "Zabudowa płytowa z okleiną drewnopodobną i lakierem białym, sufit podwieszany z logotypami, klatka ze stalowych prętów na cokole, systemowe ściany ekspozycyjne oraz podłoga z paneli i sztucznej trawy.",
      en: "Panel construction in wood-effect laminate and white lacquer, a suspended ceiling carrying the logos, a steel-bar cage on a plinth, systemised display walls, and flooring in panels and artificial turf.",
    },
    materials: {
      pl: ["Płyta laminowana", "Lakier biały", "Pręt stalowy", "Panel podłogowy", "Trawa syntetyczna"],
      en: ["Laminated panel", "White lacquer", "Steel bar", "Floor panel", "Artificial turf"],
    },
    services: withCore(["Grafika", "Elementy specjalne"], ["Graphics", "Feature elements"]),
  },
  {
    key: "american-orthodontics",
    location: "EOS, Stockholm",
    slug: "american-orthodontics",
    title: "American Orthodontics",
    client: "American Orthodontics",
    category: "exhibition",
    industry: { pl: "Medycyna i ortodoncja", en: "Medical & orthodontics" },
    featured: true,
    excerpt: {
      pl: "Jasna zabudowa z podświetlanymi gablotami i strefami konsultacji, realizowana na kolejnych edycjach targów.",
      en: "A light build with illuminated vitrines and consultation zones, delivered across successive show editions.",
    },
    overview: {
      pl: "Stoisko porządkuje mały, techniczny produkt: podświetlane gabloty i niskie lady prowadzą zwiedzającego wzdłuż ekspozycji, a wysokie bryły z logotypem trzymają markę ponad poziomem wzroku. Strefy siedzące i zaplecze socjalne pozwalają prowadzić dłuższe rozmowy z lekarzami.",
      en: "The stand organises a small, technical product: illuminated vitrines and low counters walk visitors along the display, while tall logo volumes hold the brand above eye level. Seating zones and a back-of-house area support longer conversations with clinicians.",
    },
    fabrication: {
      pl: "Zabudowa płytowa lakierowana na biel z okleiną drewnopodobną, podświetlane gabloty ze szkłem, litery przestrzenne, wbudowane ekrany oraz oświetlenie punktowe na szynach.",
      en: "White-lacquered panel construction with wood-effect laminate, glazed illuminated vitrines, dimensional lettering, integrated screens and track-mounted spotlights.",
    },
    materials: {
      pl: ["Płyta lakierowana", "Okleina drewnopodobna", "Szkło hartowane", "Litery przestrzenne", "Oświetlenie LED"],
      en: ["Lacquered panel", "Wood-effect laminate", "Toughened glass", "Dimensional lettering", "LED lighting"],
    },
    services: withCore(["Grafika", "Oświetlenie"], ["Graphics", "Lighting"]),
  },
  {
    key: "natural",
    location: "Vitafood, Geneve",
    slug: "natural-functional-ingredients",
    title: "Natural — Functional Ingredients",
    client: "Natural",
    category: "exhibition",
    industry: { pl: "Składniki spożywcze", en: "Food ingredients" },
    excerpt: {
      pl: "Zabudowa z podwieszonym kubikiem, ścianą z lameli i wielkoformatowym podświetlanym kadrem plantacji.",
      en: "A build with a suspended cube, a slatted timber wall and a large backlit plantation lightbox.",
    },
    overview: {
      pl: "Otwarta zabudowa z podwieszonym, podświetlanym kubikiem, który niesie logotyp ponad halą. Wnętrze prowadzą pionowe lamele i duży kadr podświetlany z fotografią plantacji — tło dla rozmów przy wysokich stolikach. Lada powitalna wysunięta jest w stronę alejki.",
      en: "An open build with a suspended illuminated cube carrying the logo above the hall. Vertical timber slats and a large backlit plantation image lead the interior, giving a backdrop to conversations at high tables. The welcome counter sits forward toward the aisle.",
    },
    fabrication: {
      pl: "Podwieszany kubik z napinaną tkaniną, ściany z lameli drewnianych na konstrukcji płytowej, kaseton podświetlany LED, lakier biały mat oraz podłoga panelowa.",
      en: "A suspended fabric-faced cube, timber slat walls on panel construction, an LED-backlit lightbox, matte white lacquer and panel flooring.",
    },
    materials: {
      pl: ["Lamele drewniane", "Tkanina napinana", "Płyta lakierowana", "Kaseton LED", "Panel podłogowy"],
      en: ["Timber slats", "Tension fabric", "Lacquered panel", "LED lightbox", "Floor panel"],
    },
    services: withCore(["Grafika", "Oświetlenie"], ["Graphics", "Lighting"]),
  },
  {
    key: "botanicall",
    location: "Vitafood, Geneve",
    slug: "botanicall",
    title: "Botanic'all",
    client: "Botanic'all",
    category: "exhibition",
    industry: { pl: "Ekstrakty roślinne", en: "Plant extracts" },
    excerpt: {
      pl: "Miękkie, zaokrąglone bryły z wycięciami wypełnionymi zielenią stabilizowaną i konturem świetlnym.",
      en: "Soft, rounded volumes with cut-outs filled with preserved greenery and a lit copper reveal.",
    },
    overview: {
      pl: "Zabudowa zbudowana z zaokrąglonych brył, w których wycięto organiczne kształty wypełnione zielenią stabilizowaną — produkt firmy przełożony wprost na formę stoiska. Ciepły kontur świetlny obrysowuje wycięcia, a bulaj w drzwiach zaplecza domyka detal. Wnętrze mieści stoliki spotkań.",
      en: "The build is made of rounded volumes cut with organic openings filled with preserved greenery — the company's product translated directly into the form of the stand. A warm lit reveal outlines each opening, and a porthole in the back-of-house door closes the detail. The interior holds meeting tables.",
    },
    fabrication: {
      pl: "Bryły gięte na frezowanej konstrukcji płytowej, szpachlowane i lakierowane na biel, wycięcia z zielenią stabilizowaną, taśma LED w kontrze oraz drzwi z bulajem.",
      en: "Curved volumes over CNC-milled panel construction, filled, sanded and lacquered white, cut-outs planted with preserved greenery, concealed LED tape and a porthole door.",
    },
    materials: {
      pl: ["Płyta frezowana CNC", "Lakier biały", "Zieleń stabilizowana", "Taśma LED", "Okleina drewnopodobna"],
      en: ["CNC-milled panel", "White lacquer", "Preserved greenery", "LED tape", "Wood-effect laminate"],
    },
    services: withCore(["Frezowanie CNC", "Zieleń"], ["CNC milling", "Planting"]),
  },
  {
    key: "atelier-emocio",
    location: "IAAPA, Barcelona",
    slug: "atelier-emocio",
    title: "Atelier Emocio",
    client: "Atelier Emocio",
    category: "exhibition",
    industry: { pl: "Projektowanie atrakcji", en: "Themed entertainment" },
    excerpt: {
      pl: "Zabudowa z łukowym przejściem i wnętrzem urządzonym jak pokój — dla studia projektującego atrakcje.",
      en: "An arched opening onto a room-like interior, for a studio that designs themed attractions.",
    },
    overview: {
      pl: "Stoisko odwraca konwencję targową: zamiast lady i witryn dostajemy wnętrze urządzone jak salon — boazeria, dywan, telewizor w retro obudowie i lampy. Zielona bryła z białym łukiem kadruje wejście, a podwieszony koralowy krąg z hasłem marki wyprowadza komunikat ponad halę.",
      en: "The stand inverts the trade-show convention: instead of counters and vitrines it offers a room — panelling, rug, a retro-cased television and lamps. A green volume with a white arch frames the entrance, and a suspended coral ring carries the brand line above the hall.",
    },
    fabrication: {
      pl: "Zabudowa płytowa lakierowana w kolorze, łuk frezowany CNC, boazeria z okleiny drewnopodobnej, podwieszany krąg z nadrukiem, grafiki aplikowane oraz elementy scenograficzne.",
      en: "Colour-lacquered panel construction, a CNC-milled arch, wood-effect panelling, a printed suspended ring, applied graphics and set-dressing elements.",
    },
    materials: {
      pl: ["Płyta lakierowana", "Frez CNC", "Okleina drewnopodobna", "Grafika aplikowana", "Elementy scenograficzne"],
      en: ["Lacquered panel", "CNC milling", "Wood-effect laminate", "Applied graphics", "Set dressing"],
    },
    services: withCore(["Frezowanie CNC", "Scenografia"], ["CNC milling", "Set dressing"]),
  },
  {
    key: "lg-chem",
    location: "Interzum, Cologne",
    slug: "lg-chem",
    title: "LG Chem — ceremonia wmurowania",
    client: "LG Chem",
    category: "custom",
    industry: { pl: "Chemia i baterie", en: "Chemicals & batteries" },
    excerpt: {
      pl: "Ściana ekspozycyjna na ceremonię wmurowania kamienia węgielnego pod zakład w Polsce, zbudowana w hali namiotowej.",
      en: "An exhibition wall for the groundbreaking ceremony of the company's plant in Poland, built inside a marquee.",
    },
    overview: {
      pl: "Liniowa ściana ekspozycyjna zbudowana pod jednorazowe wydarzenie. Lewa część niesie narrację o inwestycji — mapę zakładów i ekran; prawa porządkuje ofertę na półkach: ogniwa, moduły i pakiety baterii z opisami. Całość stanęła we wnętrzu namiotowym, co narzuciło lekką, samonośną konstrukcję.",
      en: "A linear exhibition wall built for a single event. The left section carries the investment narrative — a plant map and a screen; the right organises the product range on shelves: cells, modules and battery packs with captions. It stood inside a marquee, which called for a light, self-supporting structure.",
    },
    fabrication: {
      pl: "Samonośna konstrukcja płytowa lakierowana na biel, półki ekspozycyjne pod produkt, grafiki wielkoformatowe, litery przestrzenne z podświetleniem oraz wbudowany ekran.",
      en: "A self-supporting panel structure lacquered white, product display shelves, large-format graphics, illuminated dimensional lettering and an integrated screen.",
    },
    materials: {
      pl: ["Płyta lakierowana", "Grafika wielkoformatowa", "Litery przestrzenne", "Półki ekspozycyjne", "Ekran"],
      en: ["Lacquered panel", "Large-format graphics", "Dimensional lettering", "Display shelving", "Screen"],
    },
    services: withCore(["Grafika"], ["Graphics"]),
  },
  {
    key: "technic",
    location: "Semicon, Munich",
    slug: "technic",
    title: "Technic",
    client: "Technic",
    category: "exhibition",
    industry: { pl: "Chemia dla półprzewodników", en: "Semiconductor chemistry" },
    excerpt: {
      pl: "Zabudowa narożna z zaokrąglonym fryzem i podświetlaną ścianą treści dla dostawcy chemii procesowej.",
      en: "A corner build with a curved fascia and a backlit content wall for a process-chemistry supplier.",
    },
    overview: {
      pl: "Stoisko narożne, w którym zaokrąglony fryz z logotypem prowadzi wzrok wzdłuż obu alejek. Granatowa ściana z listą kompetencji i ekranem robi za tło rozmów, biała lada wysunięta w stronę ruchu obsługuje pierwszy kontakt, a druga ściana niesie grafiki produktowe.",
      en: "A corner stand where a curved logo fascia carries the eye along both aisles. A navy wall listing capabilities, with a screen, backs the conversations; a white counter pushed toward the traffic handles first contact, and the second wall carries product graphics.",
    },
    fabrication: {
      pl: "Fryz gięty na konstrukcji płytowej, lakier granatowy i biały, grafiki wielkoformatowe, wnęki produktowe, oświetlenie punktowe w suficie i taśma LED w cokole lady.",
      en: "A curved fascia over panel construction, navy and white lacquer, large-format graphics, product niches, ceiling spotlights and LED tape in the counter plinth.",
    },
    materials: {
      pl: ["Płyta lakierowana", "Grafika wielkoformatowa", "Szkło", "Oświetlenie punktowe", "Taśma LED"],
      en: ["Lacquered panel", "Large-format graphics", "Glass", "Spotlighting", "LED tape"],
    },
    services: withCore(["Grafika", "Oświetlenie"], ["Graphics", "Lighting"]),
  },
  {
    key: "sesa-chem",
    location: "Interzum, Cologne",
    slug: "sesa",
    title: "SESA",
    client: "SESA",
    category: "exhibition",
    industry: { pl: "Powierzchnie dekoracyjne", en: "Decorative surfaces" },
    excerpt: {
      pl: "Rzeźbiarski łuk wejściowy i owalne panele ekspozycyjne prezentujące próbki powierzchni.",
      en: "A sculptural entrance arch and ovoid display panels presenting surface samples.",
    },
    overview: {
      pl: "Zabudowa oparta na jednym geście: wysoki, zaokrąglony łuk z czerwonym wnętrzem znaczy wejście i widoczny jest z głębi alejki. Wewnątrz owalne panele niosą próbki powierzchni w równym rytmie, a otwarta strefa siedząca pozwala oglądać materiał przy stole.",
      en: "The build rests on a single gesture: a tall rounded arch with a red interior marks the entrance and reads from down the aisle. Inside, ovoid panels carry surface samples in an even rhythm, and an open seating area lets the material be examined at the table.",
    },
    fabrication: {
      pl: "Łuk gięty na frezowanej konstrukcji płytowej z kontrą świetlną, owalne panele z uchwytami na próbki, lakier biały i czerwony, grafiki aplikowane oraz podłoga podniesiona.",
      en: "A curved arch over CNC-milled panel construction with a lit reveal, ovoid panels with sample holders, white and red lacquer, applied graphics and a raised floor.",
    },
    materials: {
      pl: ["Płyta frezowana CNC", "Lakier biały", "Lakier czerwony", "Uchwyty ekspozycyjne", "Taśma LED"],
      en: ["CNC-milled panel", "White lacquer", "Red lacquer", "Sample holders", "LED tape"],
    },
    services: withCore(["Frezowanie CNC", "Grafika"], ["CNC milling", "Graphics"]),
  },
  {
    key: "allana",
    location: "Anuga, Cologne",
    slug: "allana",
    title: "Allana",
    client: "Allana",
    category: "exhibition",
    industry: { pl: "Przetwórstwo spożywcze", en: "Food processing" },
    excerpt: {
      pl: "Czerwono-biała zabudowa z podwieszonym pierścieniem i przestrzennym logotypem, z wielojęzyczną komunikacją marki.",
      en: "A red-and-white build with a suspended ring and dimensional logo, carrying multilingual brand messaging.",
    },
    overview: {
      pl: "Stoisko na dużą, międzynarodową halę spożywczą. Podwieszony czerwony pierścień z logotypem daje widoczność z dystansu, a przestrzenne litery pod nim domykają rozpoznanie z bliska. Wewnątrz koliste grafiki produktowe, lada, strefa siedząca i ściana marek — komunikaty powtórzone w kilku alfabetach.",
      en: "A stand for a large international food hall. A suspended red ring with the logo gives visibility from a distance, and dimensional lettering beneath it closes recognition up close. Inside are circular product graphics, a counter, a seating zone and a brand wall — messaging repeated across several scripts.",
    },
    fabrication: {
      pl: "Podwieszany pierścień na konstrukcji aluminiowej z napinaną grafiką, przestrzenne litery podświetlane, zabudowa płytowa w lakierze czerwonym i białym, kolisty kaseton oraz wbudowany ekran.",
      en: "A suspended ring on aluminium structure with tensioned graphics, illuminated dimensional lettering, panel construction in red and white lacquer, a circular lightbox and an integrated screen.",
    },
    materials: {
      pl: ["Konstrukcja aluminiowa", "Grafika napinana", "Litery przestrzenne", "Płyta lakierowana", "Kaseton LED"],
      en: ["Aluminium structure", "Tensioned graphics", "Dimensional lettering", "Lacquered panel", "LED lightbox"],
    },
    services: withCore(["Grafika", "Oświetlenie"], ["Graphics", "Lighting"]),
  },
  {
    key: "general",
    location: "Prowein, Dusseldorf",
    slug: "general-goods",
    title: "General Goods",
    client: "General Goods",
    category: "exhibition",
    industry: { pl: "Napoje i alkohole", en: "Beverages & spirits" },
    excerpt: {
      pl: "Ciepła, barowa zabudowa z podświetlanymi wnękami na butelki i ladą degustacyjną.",
      en: "A warm, bar-like build with illuminated bottle niches and a tasting counter.",
    },
    overview: {
      pl: "Zabudowa czyta się jak bar: granatowe tło, orzechowe drewno i rytm podświetlanych wnęk, w których butelka staje się eksponatem. Lada degustacyjna wysunięta jest w stronę alejki, ekran i półki niosą markę, a wysokie stoliki tworzą miejsce na rozmowę. Ściana z logotypami porządkuje portfolio marek.",
      en: "The build reads like a bar: a navy ground, walnut timber and a rhythm of illuminated niches in which a bottle becomes an exhibit. The tasting counter sits forward toward the aisle, a screen and shelves carry the brand, and high tables make room to talk. A logo wall organises the brand portfolio.",
    },
    fabrication: {
      pl: "Zabudowa płytowa z okleiną orzechową i lakierem granatowym, frezowane wnęki z taśmą LED, podwieszany fryz z podświetlanym logotypem, lampy wiszące oraz podłoga panelowa.",
      en: "Panel construction in walnut laminate and navy lacquer, milled niches with LED tape, a suspended fascia with illuminated logo, pendant lighting and panel flooring.",
    },
    materials: {
      pl: ["Okleina orzechowa", "Lakier granatowy", "Taśma LED", "Litery przestrzenne", "Panel podłogowy"],
      en: ["Walnut laminate", "Navy lacquer", "LED tape", "Dimensional lettering", "Floor panel"],
    },
    services: withCore(["Grafika", "Oświetlenie"], ["Graphics", "Lighting"]),
  },
  {
    key: "ovobank",
    location: "ESHRE, Paris",
    slug: "ovobank",
    title: "Ovobank",
    client: "Ovobank",
    category: "exhibition",
    industry: { pl: "Medycyna rozrodu", en: "Reproductive medicine" },
    excerpt: {
      pl: "Stoisko w całości utrzymane w magencie, zbudowane wokół giętej lady recepcyjnej i podświetlanego fryzu.",
      en: "A stand carried entirely by colour, built around a curved reception counter and an illuminated fascia.",
    },
    overview: {
      pl: "Kolor robi tu za architekturę: magentowa posadzka i bryła wyodrębniają stoisko z alejki, zanim czytelny stanie się logotyp. Gięty, podświetlany fryz niesie nazwę ponad ruchem, ściana z pionowych lameli ociepla tło, a panel z okrągłymi modułami produktowymi porządkuje ekspozycję. Gięta lada recepcyjna wysunięta jest do przodu i obstawiona hokerami, więc rozmowa zaczyna się na krawędzi stoiska, nie w jego głębi.",
      en: "Colour does the work of architecture here: a magenta floor and structure separate the stand from the aisle before the logo is even legible. A curved, internally lit fascia carries the name above the traffic, a wall of vertical slats warms the back of the space, and a panel of circular product modules orders the display. The curved reception counter sits forward, ringed with stools, so the conversation starts at the edge of the stand rather than inside it.",
    },
    fabrication: {
      pl: "Zabudowa płytowa lakierowana na magentę, gięty fryz podświetlany od wewnątrz, zadrukowane fronty lady z oznaczeniami certyfikatów, ściana z lameli drewnianych, podświetlane wnęki ekspozycyjne, kiosk dotykowy i wykładzina.",
      en: "Panel construction lacquered magenta, a curved fascia lit from within, printed counter facings carrying the certification marks, a timber slat wall, illuminated display niches, a touchscreen kiosk and fitted carpet.",
    },
    materials: {
      pl: ["Płyta lakierowana", "Gięty fryz podświetlany", "Zadrukowane fronty lady", "Lamele drewniane", "Wykładzina"],
      en: ["Lacquered panel", "Curved illuminated fascia", "Printed counter facings", "Timber slatting", "Fitted carpet"],
    },
    services: withCore(["Grafika", "Oświetlenie"], ["Graphics", "Lighting"]),
  },
  {
    key: "anthea-pharma",
    location: "CPHI, Barcelona",
    slug: "anthea-pharma",
    title: "Anthea Pharma",
    client: "Anthea Pharma",
    category: "exhibition",
    industry: { pl: "Farmacja", en: "Pharmaceuticals" },
    excerpt: {
      pl: "Otwarte stoisko pod podwieszonym pierścieniem, z karbowanymi formami u góry i dwiema podświetlanymi ladami od alejki.",
      en: "An open stand beneath a suspended ring, with fluted forms overhead and two illuminated counters facing the aisle.",
    },
    overview: {
      pl: "Stoisko bierze swoją tożsamość z góry: podwieszony pierścień niesie logotyp na całym obwodzie, więc marka czyta się z dowolnego miejsca w hali, a wewnątrz niego wiszą karbowane, ciemnoczerwone formy — element rzeźbiarski, nie nośnik treści. Na poziomie posadzki przestrzeń jest strefowana, nie zamknięta ścianami: ściana liczb, panel z wzorem, część spotkaniowa ze stolikami i strefa loungowa. Dwie podświetlane lady wysunięte są do alejki i przejmują pierwszy kontakt.",
      en: "The stand takes its identity from above: a suspended ring carries the wordmark around its full circumference, so the brand reads from anywhere in the hall, and fluted deep-red forms hang inside it as sculpture rather than signage. At floor level the space is zoned rather than walled — a wall of figures, a patterned panel, a seated meeting area and a lounge. Two illuminated counters sit forward into the aisle and take the first contact.",
    },
    fabrication: {
      pl: "Podwieszony pierścień na kratownicy z giętymi, zadrukowanymi segmentami, karbowane elementy wiszące formowane na CNC, ściany płytowe z grafiką wielkoformatową, lady z podświetlanymi frontami i ekran na ścianie.",
      en: "A suspended ring on truss with curved printed segments, CNC-formed fluted hanging elements, panel walls with large-format graphics, counters with backlit fronts and a wall-mounted screen.",
    },
    materials: {
      pl: ["Kratownica podwieszana", "Gięte segmenty zadrukowane", "Elementy formowane CNC", "Grafika wielkoformatowa", "Podświetlane fronty lad"],
      en: ["Suspended ring truss", "Curved printed segments", "CNC-formed elements", "Large-format graphics", "Backlit counter fronts"],
    },
    services: withCore(["Grafika", "Oświetlenie", "Podwieszenia"], ["Graphics", "Lighting", "Rigging"]),
  },
  {
    key: "dji-batimat",
    location: "Batimat, Paris",
    slug: "dji-enterprise-batimat",
    title: "DJI Enterprise — Batimat",
    client: "DJI / Hexagon",
    category: "exhibition",
    industry: { pl: "Technologie i drony", en: "Technology & drones" },
    excerpt: {
      pl: "Wspólna zabudowa dwóch marek: para podwieszonych fryzów nad ciemnymi bryłami ekspozycyjnymi i długa wyspa lady.",
      en: "A build shared by two brands: paired suspended fascias over dark display volumes and a long counter island.",
    },
    overview: {
      pl: "Całą identyfikację biorą na siebie dwa podwieszone fryzy — czarny dla DJI Enterprise i biały dla Hexagona — każdy załamany na dwóch bokach, więc obie marki czytają się z obu alejek naraz. Pod nimi ciemnoszare bryły niosą ekrany i strefę DJI Terra, pokazując technologię bez zamykania stoiska ścianami. Wzdłuż frontu biegnie długa lada z białym blatem, dzięki czemu do alejki otwiera się cała szerokość zabudowy, a nie jedno wejście.",
      en: "Two suspended fascias carry the whole identity — a black box for DJI Enterprise, a white one for Hexagon — each wrapping two faces so both brands read from either aisle at once. Beneath them, dark grey volumes hold the screens and the DJI Terra zone, putting the technology on show without walling the stand in. A long counter island with a white worktop runs the full front, so the entire width of the build meets the aisle rather than a single entrance.",
    },
    fabrication: {
      pl: "Podwieszane skrzynie fryzowe na podwieszeniach, z literami przestrzennymi i podświetleniem, bryły płytowe w ciemnej szarości z ekranami, zadrukowane panele graficzne, wyspa lady z białym blatem i ciemnymi zadrukowanymi frontami oraz niskie podesty ekspozycyjne.",
      en: "Suspended fascia boxes on rigging with dimensional, lit lettering, panel volumes in dark grey with mounted screens, printed graphic panels, a counter island with a white worktop and dark printed facings, and low display plinths.",
    },
    materials: {
      pl: ["Skrzynie fryzowe podwieszane", "Litery przestrzenne", "Płyta lakierowana", "Panele graficzne", "Blat biały"],
      en: ["Suspended fascia boxes", "Dimensional lettering", "Lacquered panel", "Printed graphic panels", "White worktop"],
    },
    services: withCore(["Grafika", "Oświetlenie", "Podwieszenia"], ["Graphics", "Lighting", "Rigging"]),
  },
  {
    key: "ion8",
    images: ["/images/fairs/ambiente-frankfurt/ambiente-frankfurt-01.webp"],
    location: "Ambiente, Frankfurt",
    slug: "ion8",
    title: "Ion8",
    client: "Ion8",
    category: "exhibition",
    industry: { pl: "Artykuły użytkowe i bidony", en: "Consumer goods & drinkware" },
    excerpt: {
      pl: "Ciąg grafitowych wnęk regałowych pod białym sufitem podwieszanym, z wolnostojącym logotypem przestrzennym zamykającym narożnik.",
      en: "A run of graphite shelving bays under a white suspended ceiling, closed at the corner by freestanding dimensional lettering.",
    },
    overview: {
      pl: "Stoisko zbudowane jako rytm wnęk ekspozycyjnych. Każda wnęka dostaje własny nagłówek linii produktowej i własne półki, więc asortyment czyta się z alejki jak katalog. Biały sufit podwieszany z oprawami wpuszczanymi wyrównuje światło nad całą długością, a wolnostojące białe litery przestrzenne ustawione na czarnej wykładzinie zamykają narożnik i budują rozpoznawalność z drugiego końca hali.",
      en: "The stand is built as a rhythm of display bays. Each bay takes its own product-line header and its own shelves, so the range reads from the aisle like a catalogue. A white suspended ceiling with recessed downlights evens the light along the whole run, and freestanding white dimensional letters set on black carpet close the corner and carry recognition from the far end of the hall.",
    },
    fabrication: {
      pl: "Płyta lakierowana w grafitowej matowości na białej konstrukcji ramowej, półki wspornikowe z listwami zawieszkowymi, pionowe profile LED między wnękami, sufit podwieszany z oprawami wpuszczanymi, wielkoformatowe grafiki podświetlone oraz litery przestrzenne z płyty lakierowanej na białym cokole.",
      en: "Matte graphite lacquered panel on a white framed structure, cantilevered shelves with hook rails, vertical LED profiles between the bays, a suspended ceiling with recessed downlights, large-format backlit graphics, and dimensional letters in lacquered panel on a white plinth.",
    },
    materials: {
      pl: ["Płyta lakierowana", "Konstrukcja ramowa", "LED liniowy", "Litery przestrzenne", "Grafika wielkoformatowa"],
      en: ["Lacquered panel", "Framed structure", "Linear LED", "Dimensional lettering", "Large-format graphics"],
    },
    services: withCore(["Grafika", "Oświetlenie", "Meble ekspozycyjne"], ["Graphics", "Lighting", "Display furniture"]),
  },
  {
    key: "soracom",
    images: ["/images/fairs/cebit-hannover/cebit-hannover-01.webp"],
    location: "Cebit, Hannover",
    slug: "soracom",
    title: "Soracom",
    client: "Soracom",
    category: "exhibition",
    industry: { pl: "Łączność IoT", en: "IoT connectivity" },
    excerpt: {
      pl: "Otwarte stoisko narożne z drewnianą pergolą i żywym drzewem, zestawione z turkusową ścianą partnerów.",
      en: "An open corner stand with a timber pergola and a living tree, set against a turquoise partner wall.",
    },
    overview: {
      pl: "Stoisko rozegrane jako miejsce spotkań, nie jako witryna. Drewniana pergola wyznacza strefę demo, a rosnące pod nią drzewo i pas sztucznej trawy łamią halową surowość i zatrzymują ruch w alejce. Turkusowa ściana z logotypami partnerów domyka układ od strony przejścia i pełni rolę tła rozmów przy stolikach koktajlowych.",
      en: "The stand is played as a meeting place rather than a shop window. A timber pergola marks the demo zone, while the tree beneath it and a band of artificial grass break the hall's hard surfaces and slow aisle traffic. A turquoise wall of partner logos closes the layout towards the walkway and backs the conversations at the cocktail tables.",
    },
    fabrication: {
      pl: "Konstrukcja słupowo-ryglowa z drewna konstrukcyjnego, zabudowa płytowa lakierowana na biało, ściana graficzna z nadrukiem, logotyp podświetlany, gablota szklana, skrzynia z desek pod nasadzenie, sztuczna trawa i podłoga podniesiona.",
      en: "A post-and-beam structure in construction timber, white lacquered panel construction, a printed graphic wall, an illuminated logo, a glass vitrine, a board-built planter box, artificial grass and a raised floor.",
    },
    materials: {
      pl: ["Drewno konstrukcyjne", "Płyta lakierowana", "Grafika wielkoformatowa", "Szkło", "Sztuczna trawa"],
      en: ["Construction timber", "Lacquered panel", "Large-format graphics", "Glass", "Artificial grass"],
    },
    services: withCore(["Grafika", "Oświetlenie", "Zieleń"], ["Graphics", "Lighting", "Planting"]),
  },
  {
    key: "altitude-digital",
    images: ["/images/fairs/dmexco-cologne/dmexco-cologne-01.webp"],
    location: "Dmexco, Cologne",
    slug: "altitude-digital",
    title: "Altitude Digital",
    client: "Altitude Digital",
    category: "exhibition",
    industry: { pl: "Reklama cyfrowa", en: "Digital advertising" },
    excerpt: {
      pl: "Ciemna bryła z podwieszoną kostką reklamową i zamkniętą salą spotkań, obrysowana ciepłym światłem liniowym.",
      en: "A dark volume with a suspended banner cube and an enclosed meeting room, outlined in warm linear light.",
    },
    overview: {
      pl: "Zabudowa gra kontrastem: matowa czerń brył i ciepła pomarańcz światła. Podwieszona kostka z komunikatami niesie markę ponad halą, a opadające pod nią świetlne rurki ściągają wzrok do wejścia. Parter zamyka przeszklona sala spotkań, dzięki czemu rozmowy handlowe toczą się na stoisku, a nie poza nim. Ciepły pas światła u podstawy odrywa bryłę od podłogi.",
      en: "The build works on contrast: matte black volumes against warm orange light. A suspended cube of messaging carries the brand above the hall, and the light tubes dropping beneath it pull the eye down to the entrance. At floor level a glazed meeting room closes the plan, keeping sales conversations on the stand rather than off it. A warm strip of light at the base lifts the volume off the floor.",
    },
    fabrication: {
      pl: "Kostka podwieszana na kratownicy z nadrukiem na wszystkich licach, zabudowa płytowa lakierowana na czerń w macie, logotyp podświetlany na fryzie, przeszklenia satynowane, zwieszane rurki świetlne, oświetlenie liniowe w cokole i reflektory szynowe.",
      en: "A truss-hung banner cube printed on every face, matte black lacquered panel construction, an illuminated logo on the fascia, satin-finish glazing, suspended light tubes, linear lighting in the plinth and track spotlights.",
    },
    materials: {
      pl: ["Płyta lakierowana", "Kratownica", "Grafika wielkoformatowa", "Szkło satynowane", "LED liniowy"],
      en: ["Lacquered panel", "Truss", "Large-format graphics", "Satin glass", "Linear LED"],
    },
    services: withCore(["Grafika", "Oświetlenie", "Podwieszenia"], ["Graphics", "Lighting", "Rigging"]),
  },
  {
    key: "e-eye",
    images: ["/images/fairs/escrs-paris/escrs-paris-01.webp"],
    location: "ESCRS, Paris",
    slug: "e-eye",
    title: "E-Eye",
    client: "E-Eye",
    category: "exhibition",
    industry: { pl: "Okulistyka", en: "Ophthalmology" },
    excerpt: {
      pl: "Granatowa bryła o zaokrąglonych narożnikach, obrysowana w całości niebiesko-fioletowym światłem liniowym.",
      en: "A navy volume with rounded corners, outlined throughout in blue-violet linear light.",
    },
    overview: {
      pl: "Całą zabudowę spina jeden zabieg: każda krawędź bryły dostaje profil świetlny, więc stoisko czyta się jako rysunek konturowy nawet z dużej odległości. Zaokrąglone naroża i miękka biel fryzu zdejmują z granatu ciężar. Wewnątrz układ prowadzi od podświetlonego dysku z nazwą nowości, przez okrągły postument produktowy z pierścieniami światła, do lady recepcyjnej i zaplecza rozmów.",
      en: "One move ties the whole build together: every edge of the volume takes a light profile, so the stand reads as a contour drawing even from a distance. Rounded corners and the soft white of the fascia take the weight off the navy. Inside, the layout runs from the illuminated disc naming the new product, through a circular product plinth ringed with light, to the reception counter and the conversation area behind.",
    },
    fabrication: {
      pl: "Zabudowa płytowa z frezowanymi narożnikami promieniowymi, profile LED RGB w krawędziach, podświetlany dysk i fryz komunikacyjny, gięta lada lakierowana, cylindryczny postument z pierścieniami LED, wpust dywanowy w kształcie koła i żaluzja pozioma w przeszkleniu.",
      en: "Panel construction with radiused corners, RGB LED profiles in the edges, an illuminated disc and message fascia, a curved lacquered counter, a cylindrical plinth ringed with LED, a circular carpet inlay and a horizontal blind in the glazing.",
    },
    materials: {
      pl: ["Płyta lakierowana", "Naroża promieniowe", "LED RGB", "Wykładnia dywanowa", "Ekran LCD"],
      en: ["Lacquered panel", "Radiused corners", "RGB LED", "Carpet inlay", "LCD screen"],
    },
    services: withCore(["Grafika", "Oświetlenie"], ["Graphics", "Lighting"]),
  },
  {
    key: "pts",
    images: ["/images/fairs/semicon-munich/semicon-munich-02.webp"],
    location: "Semicon, Munich",
    slug: "pts",
    title: "PTS",
    client: "PTS",
    category: "exhibition",
    industry: { pl: "Półprzewodniki", en: "Semiconductors" },
    excerpt: {
      pl: "Biała zabudowa z niebieskim fryzem i ażurową ścianą z pionowych lameli, filtrującą widok do wnętrza.",
      en: "A white build with a blue fascia and an open screen of vertical slats filtering the view inside.",
    },
    overview: {
      pl: "Stoisko otwarte z dwóch stron, w którym prywatność załatwia ażur, a nie ściana. Pionowe lamele przepuszczają światło i sylwetki, ale wyciszają tło dla ekranu i plansz technicznych. Niebieski fryz z pasem światła obiega zabudowę i wiąże obie pierzeje, a strefa stolików koktajlowych wychodzi wprost w alejkę. Rabata z trawami odsuwa siedzących od ruchu.",
      en: "A stand open on two sides, where privacy is handled by an open screen rather than a wall. Vertical slats let light and silhouettes through while quieting the background for the screen and the technical panels. A blue fascia with a strip of light runs around the build and ties both frontages together, and the cocktail-table zone opens straight onto the aisle. A planter of grasses sets the seating back from the traffic.",
    },
    fabrication: {
      pl: "Ściana lamelowa z pionowych profili lakierowanych na biało, fryz obwodowy w niebieskiej lakierowanej płycie z profilem LED i oprawami wpuszczanymi, plansze graficzne w ramach, ekran na wysięgniku, lada z frezowanym licem ryflowanym i donica ekspozycyjna.",
      en: "A slatted wall of vertical white lacquered profiles, a perimeter fascia in blue lacquered panel with an LED profile and recessed downlights, framed graphic panels, a screen on a bracket, a counter with a ribbed machined face, and a display planter.",
    },
    materials: {
      pl: ["Płyta lakierowana", "Lamele pionowe", "LED liniowy", "Grafika w ramach", "Front ryflowany"],
      en: ["Lacquered panel", "Vertical slats", "Linear LED", "Framed graphics", "Ribbed facing"],
    },
    services: withCore(["Grafika", "Oświetlenie", "Zieleń"], ["Graphics", "Lighting", "Planting"]),
  },
  {
    key: "eurener-zurich",
    images: ["/images/fairs/solar-and-store-zurich/solar-and-store-zurich-01.webp"],
    location: "Solar & Storage, Zurich",
    slug: "eurener-zurich",
    title: "Eurener",
    client: "Eurener",
    category: "exhibition",
    industry: { pl: "Energetyka słoneczna", en: "Solar energy" },
    excerpt: {
      pl: "Szaro-czarna rama portalowa z podświetlanym logotypem, zbudowana wokół pionowej ekspozycji modułów.",
      en: "A grey and black portal frame with an illuminated logo, built around an upright display of modules.",
    },
    overview: {
      pl: "Zabudowa portalowa, w której produkt stoi pionowo jak obraz w ramie. Moduły fotowoltaiczne wchodzą we wnęki między słupami i dostają własne karty parametrów, więc porównanie mocy odbywa się bez asysty. Podświetlany logotyp na belce niesie markę ponad alejką, a pomarańczowe akcenty i podświetlona podstawa lady odrywają bryłę od podłogi i wyznaczają punkt rozmowy.",
      en: "A portal build in which the product stands upright like a picture in a frame. Photovoltaic modules sit in the bays between the posts and take their own spec cards, so comparing outputs needs no assistance. The illuminated logo on the beam carries the brand above the aisle, while orange accents and the lit base of the counter lift the volume off the floor and mark the point of conversation.",
    },
    fabrication: {
      pl: "Rama portalowa z zabudowy płytowej w szarości i czerni, litery przestrzenne podświetlane typu halo na belce, pas LED w podciągu, wnęki ekspozycyjne pod moduły, lada z podświetlanym cokołem, akcenty w pomarańczu i podłoga w okleinie drewnopodobnej.",
      en: "A portal frame in grey and black panel construction, halo-lit dimensional letters on the beam, an LED strip in the header, display bays for the modules, a counter with an illuminated plinth, orange accent blocks and a wood-effect floor.",
    },
    materials: {
      pl: ["Płyta lakierowana", "Litery przestrzenne", "LED liniowy", "Okleina drewnopodobna", "Grafika wielkoformatowa"],
      en: ["Lacquered panel", "Dimensional lettering", "Linear LED", "Wood-effect finish", "Large-format graphics"],
    },
    services: withCore(["Grafika", "Oświetlenie", "Ekspozycja produktu"], ["Graphics", "Lighting", "Product display"]),
  },
  {
    key: "eurener-stockholm",
    images: ["/images/fairs/solar-expo-stockholm/solar-expo-stockholm-01.webp"],
    location: "Solar Expo, Stockholm",
    slug: "eurener-stockholm",
    title: "Eurener",
    client: "Eurener",
    category: "exhibition",
    industry: { pl: "Energetyka słoneczna", en: "Solar energy" },
    excerpt: {
      pl: "Jasna, otwarta zabudowa z białym fryzem obwodowym i żółtym akcentem pionowym rozcinającym ścianę.",
      en: "A light, open build with a white perimeter fascia and a yellow vertical accent splitting the wall.",
    },
    overview: {
      pl: "Wersja jasna tego samego programu: biel zamiast grafitu, żółć zamiast pomarańczu. Fryz obwodowy prowadzi wokół całego narożnika i porządkuje wysokość, a pionowy pas światła rozcina ścianę na dwie strefy — ekspozycję modułów i część spotkań. Moduły stoją pionowo z kartami mocy, a otwarty narożnik pozwala wejść z dwóch alejek bez progu.",
      en: "The light version of the same programme: white instead of graphite, yellow instead of orange. A perimeter fascia runs the full corner and settles the height, while a vertical band of light splits the wall into two zones — the module display and the meeting area. The modules stand upright with their output cards, and the open corner lets visitors enter from two aisles without a threshold.",
    },
    fabrication: {
      pl: "Fryz obwodowy z płyty lakierowanej na biało z oprawami kierunkowymi, żółty pas świetlny wpuszczony w ścianę, grafika wielkoformatowa na tylnej ścianie, stojaki pod moduły z kartami parametrów, lada z podświetlanym cokołem i wykładzina obiektowa.",
      en: "A white lacquered perimeter fascia with directional fittings, a yellow light band recessed into the wall, large-format graphics on the back wall, module stands with spec cards, a counter with an illuminated plinth and contract carpet.",
    },
    materials: {
      pl: ["Płyta lakierowana", "LED liniowy", "Grafika wielkoformatowa", "Wykładzina obiektowa", "Stojaki ekspozycyjne"],
      en: ["Lacquered panel", "Linear LED", "Large-format graphics", "Contract carpet", "Display stands"],
    },
    services: withCore(["Grafika", "Oświetlenie", "Ekspozycja produktu"], ["Graphics", "Lighting", "Product display"]),
  },
  {
    key: "space-applications-services",
    images: ["/images/fairs/spacetech-expo-bremen/spacetech-expo-bremen-01.webp"],
    location: "Spacetech Expo, Bremen",
    slug: "space-applications-services",
    title: "Space Applications Services",
    client: "Space Applications Services",
    category: "exhibition",
    industry: { pl: "Technologie kosmiczne", en: "Space technology" },
    excerpt: {
      pl: "Wyspa na granatowej wykładzinie, zwieńczona podwieszonym pierścieniem z podświetlanym dnem.",
      en: "An island on navy carpet, crowned by a suspended ring with an illuminated underside.",
    },
    overview: {
      pl: "Stoisko wyspowe dostępne ze wszystkich stron, zaprojektowane wokół eksponatów sprzętowych. Podwieszony pierścień z nadrukiem obwodowym działa jak znacznik pozycji w hali, a jego podświetlone dno oświetla wyspę bez rzucania cieni na gabloty. Ramię robotyczne i witryny na postumentach stoją w otwartej przestrzeni, więc zwiedzający obchodzą je dookoła. Łukowa lada w pasy zamyka jeden bok i przejmuje pierwszy kontakt.",
      en: "An island stand approachable from every side, laid out around hardware exhibits. The suspended ring, printed around its circumference, works as a position marker in the hall, and its illuminated underside lights the island without throwing shadows into the vitrines. A robotic arm and plinth-mounted cases stand in open space so visitors can walk right around them. A curved striped counter closes one side and takes the first contact.",
    },
    fabrication: {
      pl: "Pierścień podwieszany na kratownicy z nadrukiem obwodowym i dnem z materiału rozpraszającego, gabloty szklane na postumentach lakierowanych, ściana graficzna wielkoformatowa, łukowa lada z pasami w dwóch kolorach i wykładzina obiektowa na podeście.",
      en: "A truss-hung ring printed around its circumference with a diffusing underside, glass vitrines on lacquered plinths, a large-format graphic wall, a curved counter banded in two colours and contract carpet on a platform.",
    },
    materials: {
      pl: ["Kratownica", "Grafika wielkoformatowa", "Szkło", "Płyta lakierowana", "Wykładzina obiektowa"],
      en: ["Truss", "Large-format graphics", "Glass", "Lacquered panel", "Contract carpet"],
    },
    services: withCore(["Grafika", "Oświetlenie", "Podwieszenia", "Gabloty"], ["Graphics", "Lighting", "Rigging", "Vitrines"]),
  },
  {
    key: "spielwarenmesse-toys",
    images: ["/images/fairs/spielwarenmesse-nuremberg/spielwarenmesse-nuremberg-01.webp"],
    location: "Spielwarenmesse, Nuremberg",
    slug: "spielwarenmesse-nuremberg",
    title: "Spielwarenmesse, Nuremberg",
    category: "exhibition",
    industry: { pl: "Zabawki", en: "Toys" },
    excerpt: {
      pl: "Zabudowa katalogowa: białe wnęki regałowe pod zielonym fryzem, po jednej linii produktowej na wnękę.",
      en: "A catalogue build: white shelving bays under a green fascia, one product line per bay.",
    },
    overview: {
      pl: "Stoisko sprzedażowe dla asortymentu o dużej liczbie linii. Każda wnęka dostaje własny nadruk nagłówkowy i własny podział półek, więc kupiec znajduje markę bez pytania o obsługę. Zielony fryz obwodowy spina różnobarwne grafiki w jedną całość, a centralna lada z nadrukiem imitującym skrzynię pełni rolę stołu prezentacyjnego. Stoliki po bokach obsługują rozmowy zakupowe.",
      en: "A selling stand for a range with a large number of lines. Each bay takes its own printed header and its own shelf spacing, so a buyer finds a brand without asking staff. A green perimeter fascia pulls the many-coloured graphics into one whole, and a central counter printed as a timber crate acts as the presentation table. Tables to either side carry the buying conversations.",
    },
    fabrication: {
      pl: "Wnęki regałowe z płyty lakierowanej na biało z półkami o zmiennym rozstawie, nadruki nagłówkowe na panelach wymiennych, fryz obwodowy w zieleni, lada centralna z nadrukiem, ekran na ścianie i wykładzina obiektowa.",
      en: "White lacquered shelving bays with variable shelf spacing, printed headers on interchangeable panels, a green perimeter fascia, a printed central counter, a wall-mounted screen and contract carpet.",
    },
    materials: {
      pl: ["Płyta lakierowana", "Panele wymienne", "Grafika wielkoformatowa", "Wykładzina obiektowa", "Oświetlenie punktowe"],
      en: ["Lacquered panel", "Interchangeable panels", "Large-format graphics", "Contract carpet", "Spot lighting"],
    },
    services: withCore(["Grafika", "Oświetlenie", "Meble ekspozycyjne"], ["Graphics", "Lighting", "Display furniture"]),
  },
  {
    key: "novalac",
    images: ["/images/fairs/vitafood-geneva/vitafood-geneva-01.webp"],
    location: "Vitafood, Geneve",
    slug: "novalac",
    title: "Novalac",
    client: "Novalac",
    category: "exhibition",
    industry: { pl: "Żywienie niemowląt", en: "Infant nutrition" },
    excerpt: {
      pl: "Biało-granatowa rama portalowa z logotypem halo, otwarta na dwie alejki i domknięta ścianą asortymentową.",
      en: "A white and navy portal frame with halo lettering, open to two aisles and closed by a range wall.",
    },
    overview: {
      pl: "Dwie bramy portalowe ustawione w jednej linii tworzą przejście przez stoisko i wpuszczają ruch z alejki do środka. Granatowe podcięcia w białych ramach dają głębię i porządkują wejścia. Ściana z pełnym asortymentem w układzie tabelarycznym pozwala odczytać ofertę bez rozmowy, a wielkoformatowa fotografia po prawej ustawia ton całości. Gięta lada z podświetlanym licem przejmuje obsługę.",
      en: "Two portal gates set on one line create a passage through the stand and draw aisle traffic inside. Navy reveals within the white frames give depth and order the entrances. A wall carrying the full range in a tabular layout lets the offer be read without a conversation, and the large-format photography on the right sets the tone. A curved counter with an illuminated face takes the service.",
    },
    fabrication: {
      pl: "Ramy portalowe z zabudowy płytowej lakierowanej na biało z granatowymi podcięciami, litery przestrzenne podświetlane typu halo, profile LED w podciągach, gięta lada z podświetlanym licem, lampy wiszące o formie wielościanu, podświetlane bryły kubiczne i podłoga w okleinie drewnopodobnej.",
      en: "Portal frames in white lacquered panel construction with navy reveals, halo-lit dimensional letters, LED profiles in the headers, a curved counter with an illuminated face, polyhedral pendant lamps, illuminated cube volumes and a wood-effect floor.",
    },
    materials: {
      pl: ["Płyta lakierowana", "Litery przestrzenne", "LED liniowy", "Grafika wielkoformatowa", "Okleina drewnopodobna"],
      en: ["Lacquered panel", "Dimensional lettering", "Linear LED", "Large-format graphics", "Wood-effect finish"],
    },
    services: withCore(["Grafika", "Oświetlenie", "Meble ekspozycyjne"], ["Graphics", "Lighting", "Display furniture"]),
  },
  {
    key: "eggnovo",
    images: ["/images/fairs/vitafood-geneva/vitafood-geneva-02.webp"],
    location: "Vitafood, Geneve",
    slug: "eggnovo",
    title: "Eggnovo",
    client: "Eggnovo",
    category: "exhibition",
    industry: { pl: "Suplementy i składniki funkcjonalne", en: "Supplements & functional ingredients" },
    excerpt: {
      pl: "Ciemna rama z pionowych lameli okalająca jasne wnętrze, z podświetlanym logotypem pierścieniowym w narożniku.",
      en: "A dark frame of vertical slats around a light interior, with an illuminated ring logo at the corner.",
    },
    overview: {
      pl: "Kontrast prowadzi tu cały układ: ciemna, drewnopodobna oprawa z pionowych lameli obejmuje stoisko od zewnątrz, a wnętrze zostaje białe i ciche. Dzięki temu podświetlona plansza produktowa i pierścieniowy logotyp są jedynymi mocnymi punktami. Pionowy podział lameli powtarza się wewnątrz jako ażurowy ekran, który dzieli strefę rozmów od ekspozycji, nie zamykając jej.",
      en: "Contrast drives the whole layout: a dark, wood-effect surround of vertical slats wraps the stand from outside while the interior stays white and quiet. That leaves the backlit product panel and the ring logo as the only strong notes. The vertical division of the slats returns inside as an open screen that separates the conversation area from the display without closing it off.",
    },
    fabrication: {
      pl: "Oprawa z pionowych lameli w okleinie drewnopodobnej na konstrukcji płytowej, podświetlany pierścień z logotypem, wielkoformatowa plansza podświetlana w ramie, ażurowy ekran lamelowy we wnętrzu, postumenty lakierowane, lampy wiszące i podest z wykładziną.",
      en: "A surround of vertical slats in wood-effect finish on panel construction, an illuminated ring logo, a large-format backlit panel in a frame, an open slatted screen inside, lacquered plinths, pendant lamps and a carpeted platform.",
    },
    materials: {
      pl: ["Lamele pionowe", "Okleina drewnopodobna", "Plansza podświetlana", "Płyta lakierowana", "Wykładzina obiektowa"],
      en: ["Vertical slats", "Wood-effect finish", "Backlit panel", "Lacquered panel", "Contract carpet"],
    },
    services: withCore(["Grafika", "Oświetlenie", "Meble ekspozycyjne"], ["Graphics", "Lighting", "Display furniture"]),
  },
];

/** Keep only the paths that are actually on disk, so a missing file drops the
 *  project rather than rendering a broken tile. */
function present(paths: string[]): string[] {
  return paths.filter((rel) => {
    try {
      return fs.existsSync(path.join(process.cwd(), "public", rel.replace(/^\//, "")));
    } catch {
      return false;
    }
  });
}

export const projects: Project[] = ENTRIES.map(({ key, images, ...rest }) => {
  const imgs = images ? present(images) : photos(key);
  return { ...rest, hero: imgs[0] ?? "", gallery: imgs.slice(1) };
}).filter((p) => p.hero);

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function relatedProjects(slug: string, n = 3) {
  return projects.filter((p) => p.slug !== slug).slice(0, n);
}
