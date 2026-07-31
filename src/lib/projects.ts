import type { Locale } from "./i18n";

type L<T = string> = Record<Locale, T>;

export type ProjectCategory = "exhibition" | "interior" | "cnc" | "custom";

export interface Project {
  slug: string;
  title: string;
  client?: string;
  category: ProjectCategory;
  industry: L;
  location: string;
  year: string;
  area: string;
  featured?: boolean;
  excerpt: L;
  services: L<string[]>;
  challenge: L;
  solution: L;
  fabrication: L;
  materials: L<string[]>;
  results: L;
  hero: string;
  gallery: string[];
}

import { siteImage } from "./images";

// Generated imagery convention (public/images): portfolio-<key>-hero.png and
// portfolio-<key>-1.png … -N.png. Files that exist are used; the rest fall
// back to grayscale placeholders until they are generated.
const heroImg = (key: string, seed: string) => siteImage(`portfolio-${key}-hero.png`, seed, 1800, 1100);
const galleryImgs = (key: string, seed: string, n: number) =>
  Array.from({ length: n }, (_, i) => siteImage(`portfolio-${key}-${i + 1}.png`, `${seed}-${i + 1}`));

export const projects: Project[] = [
  {
    slug: "helion-automotive-iaa",
    title: "Helion Automotive — IAA Mobility",
    client: "Helion",
    category: "exhibition",
    industry: { pl: "Motoryzacja", en: "Automotive" },
    location: "Monachium, DE",
    year: "2025",
    area: "420 m²",
    featured: true,
    excerpt: {
      pl: "Dwupoziomowe stoisko z zawieszoną świetlną wstęgą i strefą premier produktowych.",
      en: "A double-deck stand with a suspended light ribbon and a product premiere zone.",
    },
    services: {
      pl: ["Projekt koncepcyjny", "Inżynieria", "Produkcja", "Montaż", "Logistyka"],
      en: ["Concept design", "Engineering", "Fabrication", "Installation", "Logistics"],
    },
    challenge: {
      pl: "Klient potrzebował przestrzeni, która pomieści premierę dwóch pojazdów, strefę B2B na piętrze i zaplecze gastronomiczne — na planie z trzema słupami konstrukcyjnymi hali.",
      en: "The client needed a space hosting two vehicle premieres, an upstairs B2B lounge and full catering facilities — on a floor plan interrupted by three structural columns of the hall.",
    },
    solution: {
      pl: "Słupy wchłonęła rzeźbiarska zabudowa centralna, wokół której poprowadziliśmy 36-metrową podświetlaną wstęgę. Piętro o konstrukcji stalowej pomieściło osiem sal spotkań.",
      en: "The columns were absorbed into a sculptural central volume, wrapped by a 36-metre illuminated ribbon. A steel-framed upper deck housed eight meeting rooms.",
    },
    fabrication: {
      pl: "Konstrukcja stalowa z certyfikowaną statyką, panele gięte CNC z MDF, lakier natryskowy w macie, 140 m² grafik napinanych i zintegrowane oświetlenie liniowe.",
      en: "Certified steel structure, CNC-formed MDF panels, matte spray finish, 140 m² of tension fabric graphics and integrated linear lighting.",
    },
    materials: {
      pl: ["Stal certyfikowana", "MDF frezowany CNC", "Lakier PU mat", "Tkaniny napinane", "LED liniowy"],
      en: ["Certified steel", "CNC-milled MDF", "Matte PU lacquer", "Tension fabric", "Linear LED"],
    },
    results: {
      pl: "Najczęściej fotografowane stoisko sektora dostawców. 2 400 zeskanowanych kontaktów w 5 dni targów.",
      en: "The most photographed stand in the supplier sector. 2,400 scanned leads across 5 show days.",
    },
    hero: heroImg("helion", "mavo-iaa"),
    gallery: galleryImgs("helion", "mavo-iaa", 4),
  },
  {
    slug: "nordicware-ism-cologne",
    title: "Nordicware — ISM Cologne",
    client: "Nordicware",
    category: "exhibition",
    industry: { pl: "FMCG", en: "FMCG" },
    location: "Kolonia, DE",
    year: "2025",
    area: "180 m²",
    featured: true,
    excerpt: {
      pl: "Skandynawski minimalizm: jesion, biel i światło dzienne w hali targowej.",
      en: "Scandinavian minimalism: ash wood, white surfaces and daylight inside a trade hall.",
    },
    services: {
      pl: ["Projekt koncepcyjny", "Produkcja", "Montaż", "Magazynowanie"],
      en: ["Concept design", "Fabrication", "Installation", "Storage"],
    },
    challenge: {
      pl: "Marka chciała odtworzyć atmosferę swojego flagowego showroomu w Sztokholmie — w przestrzeni budowanej na trzy dni i rozbieranej w jeden wieczór.",
      en: "The brand wanted to recreate the atmosphere of its flagship Stockholm showroom — in a space built in three days and dismantled in one evening.",
    },
    solution: {
      pl: "Modułowa zabudowa z litego jesionu z systemem szybkozłączy, sufit świetlny imitujący światło dzienne i ekspozytory produktowe na wymiar.",
      en: "A modular solid-ash construction with quick-lock joints, a luminous ceiling imitating daylight and made-to-measure product displays.",
    },
    fabrication: {
      pl: "Lite drewno jesionowe olejowane, ramy aluminiowe, sufit napinany z podświetleniem 6500K, frezowane logotypy 3D.",
      en: "Oiled solid ash, aluminium frames, backlit stretch ceiling at 6500K, CNC-milled 3D logotypes.",
    },
    materials: {
      pl: ["Jesion lity olejowany", "Aluminium", "Sufit napinany", "Szkło hartowane"],
      en: ["Oiled solid ash", "Aluminium", "Stretch ceiling", "Tempered glass"],
    },
    results: {
      pl: "Zabudowa użyta ponownie na czterech kolejnych targach — koszt jednostkowy wydarzenia spadł o 46%.",
      en: "The build was reused at four further fairs — cutting the per-event cost by 46%.",
    },
    hero: heroImg("nordicware", "mavo-ism"),
    gallery: galleryImgs("nordicware", "mavo-ism", 3),
  },
  {
    slug: "vantum-medica",
    title: "Vantum — MEDICA Düsseldorf",
    client: "Vantum",
    category: "exhibition",
    industry: { pl: "Medycyna i farmacja", en: "Medical & Pharma" },
    location: "Düsseldorf, DE",
    year: "2024",
    area: "240 m²",
    featured: true,
    excerpt: {
      pl: "Sterylna precyzja: stoisko-laboratorium z demonstracjami urządzeń na żywo.",
      en: "Sterile precision: a laboratory-like stand with live device demonstrations.",
    },
    services: {
      pl: ["Projekt koncepcyjny", "Inżynieria", "Produkcja", "Montaż", "Serwis"],
      en: ["Concept design", "Engineering", "Fabrication", "Installation", "Maintenance"],
    },
    challenge: {
      pl: "Prezentacja urządzeń diagnostycznych wymagała warunków zbliżonych do laboratoryjnych: stabilnego zasilania, wentylacji i powierzchni odpornych na dezynfekcję.",
      en: "Presenting diagnostic devices required near-laboratory conditions: stable power, ventilation and disinfection-proof surfaces.",
    },
    solution: {
      pl: "Zabudowa z kompozytu mineralnego z bezspoinowymi blatami, dedykowana instalacja elektryczna 63A i przeszklone boksy demonstracyjne z wyciszeniem.",
      en: "A mineral composite build with seamless worktops, a dedicated 63A electrical installation and glazed, acoustically damped demo boxes.",
    },
    fabrication: {
      pl: "Kompozyt mineralny klejony bezspoinowo, profile stalowe malowane proszkowo, szkło laminowane, posadzka techniczna podniesiona.",
      en: "Seamlessly bonded mineral composite, powder-coated steel profiles, laminated glass, raised technical flooring.",
    },
    materials: {
      pl: ["Kompozyt mineralny", "Stal malowana proszkowo", "Szkło laminowane", "Podłoga techniczna"],
      en: ["Mineral composite", "Powder-coated steel", "Laminated glass", "Raised floor"],
    },
    results: {
      pl: "87 umówionych prezentacji produktowych. Klient przedłużył współpracę na kolejne trzy edycje.",
      en: "87 scheduled product demos. The client extended the partnership for the next three editions.",
    },
    hero: heroImg("vantum", "mavo-medica"),
    gallery: galleryImgs("vantum", "mavo-medica", 3),
  },
  {
    slug: "arcline-showroom",
    title: "Arcline — Showroom w Warszawie",
    client: "Arcline",
    category: "interior",
    industry: { pl: "Meble i design", en: "Furniture & Design" },
    location: "Warszawa, PL",
    year: "2025",
    area: "310 m²",
    featured: true,
    excerpt: {
      pl: "Showroom-galeria: beton, dąb i reżyserowane światło dla marki premium.",
      en: "A gallery-like showroom: concrete, oak and choreographed light for a premium brand.",
    },
    services: {
      pl: ["Projekt wnętrza", "Produkcja mebli", "Montaż", "Oświetlenie"],
      en: ["Interior design", "Furniture production", "Installation", "Lighting"],
    },
    challenge: {
      pl: "Postindustrialna przestrzeń o wysokości 5,2 m miała stać się intymną galerią mebli — bez zabudowywania charakteru oryginalnej architektury.",
      en: "A post-industrial space with a 5.2 m ceiling had to become an intimate furniture gallery — without erasing the character of the original architecture.",
    },
    solution: {
      pl: "Wolnostojące kubiki ekspozycyjne z dębu, kurtyny akustyczne i system szyn świetlnych pozwalający zmieniać scenografię w jeden dzień.",
      en: "Free-standing oak display volumes, acoustic curtains and a lighting track system that lets the scenography change within a day.",
    },
    fabrication: {
      pl: "Fornir dębowy na płycie, mikrocement, kurtyny wełniane, szyny magnetyczne z reflektorami 2700K.",
      en: "Oak veneer on board, microcement, wool curtains, magnetic tracks with 2700K spotlights.",
    },
    materials: {
      pl: ["Fornir dębowy", "Mikrocement", "Wełna akustyczna", "Oświetlenie magnetyczne"],
      en: ["Oak veneer", "Microcement", "Acoustic wool", "Magnetic lighting"],
    },
    results: {
      pl: "Sprzedaż w showroomie wzrosła o 31% w pierwszym kwartale po otwarciu.",
      en: "Showroom sales grew 31% in the first quarter after opening.",
    },
    hero: heroImg("arcline", "mavo-arcline"),
    gallery: galleryImgs("arcline", "mavo-arcline", 3),
  },
  {
    slug: "gridpower-enlit",
    title: "GridPower — Enlit Europe",
    client: "GridPower",
    category: "exhibition",
    industry: { pl: "Energetyka", en: "Energy" },
    location: "Paryż, FR",
    year: "2024",
    area: "150 m²",
    excerpt: {
      pl: "Kinetyczna ściana LED i strefa rozmów w wyciszonych boksach.",
      en: "A kinetic LED wall and hushed meeting boxes for focused conversations.",
    },
    services: {
      pl: ["Projekt koncepcyjny", "Produkcja", "Montaż", "Multimedia"],
      en: ["Concept design", "Fabrication", "Installation", "Multimedia"],
    },
    challenge: {
      pl: "Marka z sektora infrastruktury chciała opowiedzieć o niewidzialnym produkcie — przesyle energii — w sposób zmysłowy i zrozumiały.",
      en: "An infrastructure brand wanted to tell the story of an invisible product — energy transmission — in a sensory, understandable way.",
    },
    solution: {
      pl: "Dziewięciometrowa ściana LED o łamanej geometrii wizualizująca przepływy sieci w czasie rzeczywistym, zestawiona z ciepłą strefą rozmów.",
      en: "A nine-metre LED wall with folded geometry visualising grid flows in real time, contrasted with a warm meeting zone.",
    },
    fabrication: {
      pl: "Podkonstrukcja stalowa pod panele LED P2.6, okładziny z płyt akustycznych, stolarka na wymiar, sterowanie treścią show-control.",
      en: "Steel substructure for P2.6 LED panels, acoustic board cladding, custom joinery, show-control content system.",
    },
    materials: {
      pl: ["Panele LED P2.6", "Stal", "Płyty akustyczne", "Dąb bielony"],
      en: ["P2.6 LED panels", "Steel", "Acoustic board", "Bleached oak"],
    },
    results: {
      pl: "Średni czas wizyty na stoisku: 9 minut — trzykrotnie powyżej średniej targowej.",
      en: "Average dwell time: 9 minutes — three times the show average.",
    },
    hero: heroImg("gridpower", "mavo-enlit"),
    gallery: galleryImgs("gridpower", "mavo-enlit", 3),
  },
  {
    slug: "atlas-hq-office",
    title: "Atlas Robotics — biuro i strefa demo",
    client: "Atlas Robotics",
    category: "interior",
    industry: { pl: "Technologia", en: "Technology" },
    location: "Poznań, PL",
    year: "2024",
    area: "540 m²",
    excerpt: {
      pl: "Fit-out biura R&D ze strefą demonstracji robotów dla klientów.",
      en: "An R&D office fit-out with a client-facing robot demonstration zone.",
    },
    services: {
      pl: ["Projekt wnętrza", "Fit-out", "Meble na wymiar", "Akustyka"],
      en: ["Interior design", "Fit-out", "Custom furniture", "Acoustics"],
    },
    challenge: {
      pl: "Połączenie w jednej przestrzeni warsztatu prototypowni, biura inżynierskiego i reprezentacyjnej strefy demo dla klientów enterprise.",
      en: "Combining a prototyping workshop, an engineering office and a representative enterprise demo zone in a single space.",
    },
    solution: {
      pl: "Strefowanie przez posadzki i akustykę: żywica w warsztacie, wykładzina i sufity akustyczne w biurze, czarny boks demo z trybuną.",
      en: "Zoning through flooring and acoustics: resin in the workshop, carpet and acoustic ceilings in the office, a black demo box with tiered seating.",
    },
    fabrication: {
      pl: "Ściany mobilne na kołach, meble warsztatowe ze sklejki z blatami HPL, trybuna z frezowanych elementów CNC.",
      en: "Mobile walls on casters, plywood workshop furniture with HPL tops, a tiered stand from CNC-milled components.",
    },
    materials: {
      pl: ["Sklejka brzozowa", "HPL", "Żywica epoksydowa", "Panele akustyczne PET"],
      en: ["Birch plywood", "HPL", "Epoxy resin", "PET acoustic panels"],
    },
    results: {
      pl: "Przestrzeń obsługuje 20+ wizyt klienckich miesięcznie bez zakłócania pracy zespołu R&D.",
      en: "The space hosts 20+ client visits monthly without disrupting the R&D team's work.",
    },
    hero: heroImg("atlas", "mavo-atlas"),
    gallery: galleryImgs("atlas", "mavo-atlas", 3),
  },
  {
    slug: "parametric-facade",
    title: "Fasada parametryczna — hotel Verte",
    client: "Verte Hotel",
    category: "cnc",
    industry: { pl: "Architektura", en: "Architecture" },
    location: "Gdańsk, PL",
    year: "2025",
    area: "260 m²",
    excerpt: {
      pl: "1 840 unikalnych paneli frezowanych CNC dla wnętrza lobby hotelowego.",
      en: "1,840 unique CNC-milled panels for a hotel lobby interior.",
    },
    services: {
      pl: ["Inżynieria", "Produkcja CNC", "Montaż"],
      en: ["Engineering", "CNC production", "Installation"],
    },
    challenge: {
      pl: "Projekt pracowni architektonicznej zakładał falującą ścianę z paneli, z których żaden nie powtarza się ani razu — przy zachowaniu rygoru budżetu.",
      en: "The architects' design called for an undulating wall of panels where not a single one repeats — within a strict budget.",
    },
    solution: {
      pl: "Parametryczny model produkcyjny generujący pliki CNC bezpośrednio z modelu architektów, nesting minimalizujący odpad do 7%.",
      en: "A parametric production model generating CNC files directly from the architects' model, with nesting that cut waste to 7%.",
    },
    fabrication: {
      pl: "Frezowanie 5-osiowe w MDF-ie barwionym w masie, montaż na podkonstrukcji aluminiowej z ukrytym mocowaniem.",
      en: "5-axis milling in through-dyed MDF, mounted on an aluminium substructure with concealed fixings.",
    },
    materials: {
      pl: ["MDF barwiony w masie", "Aluminium", "Lakier bezbarwny"],
      en: ["Through-dyed MDF", "Aluminium", "Clear lacquer"],
    },
    results: {
      pl: "Realizacja nominowana do nagrody wnętrzarskiej; odpad produkcyjny niższy o 60% od założeń.",
      en: "Nominated for an interior design award; production waste 60% below assumptions.",
    },
    hero: heroImg("facade", "mavo-facade"),
    gallery: galleryImgs("facade", "mavo-facade", 3),
  },
  {
    slug: "kform-popup-retail",
    title: "KORM — sieć pop-up retail",
    client: "KORM",
    category: "custom",
    industry: { pl: "FMCG", en: "FMCG" },
    location: "Berlin / Praga / Wiedeń",
    year: "2024",
    area: "12 × 40 m²",
    excerpt: {
      pl: "Dwanaście identycznych pop-upów rozstawianych w galeriach handlowych w 6 godzin.",
      en: "Twelve identical pop-ups deployed in shopping malls within 6 hours each.",
    },
    services: {
      pl: ["Projekt", "Prototypowanie", "Produkcja seryjna", "Logistyka"],
      en: ["Design", "Prototyping", "Serial production", "Logistics"],
    },
    challenge: {
      pl: "Kampania produktowa wymagała jednoczesnej obecności w trzech krajach — z identyczną jakością i błyskawicznym montażem bez narzędzi.",
      en: "A product campaign required simultaneous presence in three countries — with identical quality and rapid tool-free assembly.",
    },
    solution: {
      pl: "System modułów na zatrzaskach z wbudowanym oświetleniem i okablowaniem, pakowany w dedykowane skrzynie flight case.",
      en: "A snap-fit module system with built-in lighting and wiring, packed in dedicated flight cases.",
    },
    fabrication: {
      pl: "Prototyp + seria 12 zestawów: sklejka lakierowana, aluminiowe ramy, złącza szybkiego montażu, elektryka plug-and-play.",
      en: "Prototype + a series of 12 kits: lacquered plywood, aluminium frames, quick-fit connectors, plug-and-play electrics.",
    },
    materials: {
      pl: ["Sklejka lakierowana", "Aluminium", "Poliwęglan", "LED"],
      en: ["Lacquered plywood", "Aluminium", "Polycarbonate", "LED"],
    },
    results: {
      pl: "38 lokalizacji obsłużonych w jeden sezon; średni czas montażu 5 h 40 min.",
      en: "38 locations covered in one season; average assembly time 5 h 40 min.",
    },
    hero: heroImg("korm", "mavo-korm"),
    gallery: galleryImgs("korm", "mavo-korm", 3),
  },
  {
    slug: "polar-bank-branch",
    title: "Polar Bank — oddział flagowy",
    client: "Polar Bank",
    category: "interior",
    industry: { pl: "Finanse", en: "Finance" },
    location: "Kraków, PL",
    year: "2023",
    area: "290 m²",
    excerpt: {
      pl: "Oddział bankowy nowej generacji: mniej okienek, więcej rozmowy.",
      en: "A new-generation bank branch: fewer counters, more conversation.",
    },
    services: {
      pl: ["Fit-out", "Meble na wymiar", "Oświetlenie", "Oznakowanie"],
      en: ["Fit-out", "Custom furniture", "Lighting", "Signage"],
    },
    challenge: {
      pl: "Transformacja tradycyjnego oddziału w przestrzeń doradczą przy zachowaniu wymogów bezpieczeństwa sektora bankowego.",
      en: "Transforming a traditional branch into an advisory space while meeting banking-sector security requirements.",
    },
    solution: {
      pl: "Otwarta strefa doradcza z meblami lounge, dyskretne boksy rozmów z szybami prywatyzującymi i strefa samoobsługowa 24/7.",
      en: "An open advisory zone with lounge furniture, discreet meeting boxes with privacy glass and a 24/7 self-service area.",
    },
    fabrication: {
      pl: "Zabudowy z forniru orzechowego, lady z konglomeratu kwarcowego, szkło elektrochromatyczne, sufity akustyczne.",
      en: "Walnut veneer builds, quartz composite counters, electrochromic glass, acoustic ceilings.",
    },
    materials: {
      pl: ["Fornir orzechowy", "Konglomerat kwarcowy", "Szkło elektrochromatyczne", "Mosiądz"],
      en: ["Walnut veneer", "Quartz composite", "Electrochromic glass", "Brass"],
    },
    results: {
      pl: "Wzorzec wdrożony następnie w 14 kolejnych oddziałach sieci.",
      en: "The blueprint was subsequently rolled out to 14 further branches.",
    },
    hero: heroImg("polar", "mavo-polar"),
    gallery: galleryImgs("polar", "mavo-polar", 3),
  },
  {
    slug: "sonar-art-installation",
    title: "SONAR — instalacja na biennale designu",
    category: "custom",
    industry: { pl: "Kultura i sztuka", en: "Culture & Arts" },
    location: "Mediolan, IT",
    year: "2025",
    area: "80 m²",
    excerpt: {
      pl: "Chodząca po cienkiej granicy rzeźby i architektury instalacja z 4 200 listew.",
      en: "An installation of 4,200 slats walking the line between sculpture and architecture.",
    },
    services: {
      pl: ["Inżynieria", "Produkcja CNC", "Montaż", "Logistyka"],
      en: ["Engineering", "CNC production", "Installation", "Logistics"],
    },
    challenge: {
      pl: "Projekt artysty istniał wyłącznie jako model 3D. Trzeba było go przełożyć na technologię, transport w trzech ciężarówkach i montaż w 48 godzin.",
      en: "The artist's design existed only as a 3D model. It had to be translated into buildable technology, transport in three trucks and a 48-hour installation.",
    },
    solution: {
      pl: "Dekompozycja formy na 68 prefabrykowanych segmentów z ukrytymi złączami, ponumerowanych i pakowanych w kolejności montażu.",
      en: "Decomposition of the form into 68 prefabricated segments with hidden joints, numbered and packed in installation order.",
    },
    fabrication: {
      pl: "4 200 listew jesionowych ciętych CNC, gięcie na formach, złącza stalowe toczone, olejowanie ręczne.",
      en: "4,200 CNC-cut ash slats, form bending, turned steel connectors, hand oiling.",
    },
    materials: {
      pl: ["Jesion", "Stal toczona", "Olej naturalny"],
      en: ["Ash", "Turned steel", "Natural oil"],
    },
    results: {
      pl: "Instalacja opisana w trzech magazynach wnętrzarskich; obecnie w kolekcji prywatnej.",
      en: "Featured in three interior design magazines; now in a private collection.",
    },
    hero: heroImg("sonar", "mavo-sonar"),
    gallery: galleryImgs("sonar", "mavo-sonar", 3),
  },
  {
    slug: "helix-pharma-cphi",
    title: "Helix Pharma — CPHI Barcelona",
    client: "Helix",
    category: "exhibition",
    industry: { pl: "Medycyna i farmacja", en: "Medical & Pharma" },
    location: "Barcelona, ES",
    year: "2023",
    area: "120 m²",
    excerpt: {
      pl: "Spirala DNA z giętego drewna jako centralny punkt stoiska.",
      en: "A bent-wood DNA helix as the stand's centrepiece.",
    },
    services: {
      pl: ["Projekt koncepcyjny", "Produkcja", "Montaż"],
      en: ["Concept design", "Fabrication", "Installation"],
    },
    challenge: {
      pl: "Wyróżnić firmę kontraktową na targach, gdzie wszyscy konkurenci komunikują to samo: jakość, skalę i zgodność z normami.",
      en: "Differentiating a contract manufacturer at a fair where every competitor communicates the same: quality, scale and compliance.",
    },
    solution: {
      pl: "Sześciometrowa rzeźba spirali z giętej sklejki zawieszona nad strefą baru — znak firmowy widoczny z każdej alejki sektora.",
      en: "A six-metre bent-plywood helix sculpture suspended above the bar zone — a landmark visible from every aisle of the sector.",
    },
    fabrication: {
      pl: "Sklejka gięta na formach próżniowych, cięgna stalowe z atestem, podwieszenie zgodne z regulaminem Fira Barcelona.",
      en: "Vacuum-formed bent plywood, certified steel tension rods, rigging compliant with Fira Barcelona regulations.",
    },
    materials: {
      pl: ["Sklejka gięta", "Stal nierdzewna", "Corian"],
      en: ["Bent plywood", "Stainless steel", "Corian"],
    },
    results: {
      pl: "Wzrost umówionych spotkań o 64% względem poprzedniej edycji targów.",
      en: "A 64% increase in booked meetings versus the previous edition.",
    },
    hero: heroImg("helix", "mavo-helix"),
    gallery: galleryImgs("helix", "mavo-helix", 3),
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function relatedProjects(slug: string, n = 3) {
  const current = getProject(slug);
  if (!current) return projects.slice(0, n);
  return projects
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (b.category === current.category ? 1 : 0) - (a.category === current.category ? 1 : 0))
    .slice(0, n);
}
