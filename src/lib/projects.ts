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

type Entry = Omit<Project, "hero" | "gallery"> & { key: string };

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
];

export const projects: Project[] = ENTRIES.map(({ key, ...rest }) => {
  const imgs = photos(key);
  return { ...rest, hero: imgs[0] ?? "", gallery: imgs.slice(1) };
}).filter((p) => p.hero);

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function relatedProjects(slug: string, n = 3) {
  return projects.filter((p) => p.slug !== slug).slice(0, n);
}
