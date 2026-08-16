import type { pl } from "./pl";

export const en: typeof pl = {
  locale: "en",
  nav: {
    home: "Home",
    about: "Company",
    services: "Services",
    process: "How we work",
    portfolio: "Projects",
    contact: "Contact",
    cta: "Get a quote",
  },
  common: {
    viewProject: "View project",
    viewAll: "All projects",
    readMore: "Read more",
    getQuote: "Request a quote",
    startProject: "Start a project",
    scroll: "Scroll",
    year: "Year",
    client: "Client",
    industry: "Industry",
    location: "Location",
    area: "Area",
    servicesDelivered: "Services delivered",
    materials: "Materials",
    relatedProjects: "Related projects",
    backToPortfolio: "Back to projects",
    overview: "Overview",
    challenge: "The challenge",
    solution: "Design solution",
    fabrication: "Fabrication process",
    results: "Results",
    gallery: "Gallery",
    all: "All",
    search: "Search projects…",
    noResults: "No projects match your criteria.",
  },
  meta: {
    home: {
      title: "mavoNORM — Exhibition Stands, Fabrication & CNC | Premium European Fabrication",
      description:
        "Design and fabrication of exhibition stands, booth construction, commercial interiors and CNC components. European quality, in-house production, installation across Europe.",
    },
    about: { title: "Company — mavoNORM", description: "Meet mavoNORM — a European partner for exhibition fabrication, interiors and custom manufacturing." },
    services: { title: "Services & Capabilities — mavoNORM", description: "Stand design, booth fabrication, installation, interiors, CNC, logistics, storage and maintenance." },
    process: { title: "How We Work — mavoNORM", description: "From brief to installation: the eight-stage mavoNORM delivery process." },
    portfolio: { title: "Projects — mavoNORM", description: "Selected exhibition stands, commercial interiors and custom fabrication projects." },
    contact: { title: "Contact — mavoNORM", description: "Let's talk about your project. Preliminary quote within 48 hours." },
    legal: { title: "Legal — mavoNORM", description: "Privacy policy, GDPR, cookie policy and legal notice." },
  },
  home: {
    hero: {
      eyebrow: "Exhibition fabrication studio — Europe",
      line1: "We design.",
      line2: "We fabricate.",
      line3: "We install.",
      sub: "Exhibition stands, commercial interiors and custom manufacturing — from concept to installation, at a standard you can see in every detail.",
      cta1: "View projects",
      cta2: "Get a quote",
    },
    intro: {
      eyebrow: "mavoNORM",
      heading: "Precision engineering meets craftsmanship.",
      body:
        "mavoNORM is a team of designers, engineers and fabricators that has been delivering exhibition builds and commercial spaces for brands across Europe for over a decade. Our own CNC machinery, joinery and installation crews let us control quality at every stage — from the first sketch to the last screw.",
      link: "About the company",
    },
    services: {
      eyebrow: "What we do",
      heading: "End to end, under one roof.",
      link: "All services",
    },
    featured: {
      eyebrow: "Selected work",
      heading: "A portfolio that speaks for us.",
    },
    why: {
      eyebrow: "Why mavoNORM",
      heading: "A partner, not a subcontractor.",
      items: [
        { title: "In-house production", body: "Over 4,000 m² of production halls, CNC routers, a spray booth and joinery. No quality compromises along the way." },
        { title: "One team, whole process", body: "Design, engineering, production, logistics and installation run by a single project team — single accountability." },
        { title: "European standard", body: "We install at trade fairs in Germany, France, Scandinavia and across the EU. On time, compliant with every venue's technical rules." },
        { title: "Engineering of detail", body: "Every joint, fascia and light detail is drawn in workshop documentation before it reaches the machines." },
      ],
    },
    capabilities: {
      eyebrow: "Manufacturing capabilities",
      heading: "Technology that gives an edge.",
      items: [
        { value: 4000, suffix: " m²", label: "of production space" },
        { value: 3, suffix: "", label: "CNC machining centres" },
        { value: 120, suffix: "+", label: "installations per year" },
        { value: 14, suffix: "", label: "countries delivered" },
      ],
    },
    sectors: {
      eyebrow: "Sectors",
      heading: "Industries we work for",
      items: ["Automotive", "Technology", "Medical & Pharma", "Industrial", "FMCG", "Furniture & Design", "Energy", "Finance"],
    },
    clients: { eyebrow: "Trusted by" },
    testimonials: {
      eyebrow: "Client feedback",
      heading: "What partners say",
      items: [
        {
          quote:
            "The stand mavoNORM built was the most photographed spot in the hall. The finish quality was a level we had never seen from any previous contractor.",
          author: "Marketing Director",
          company: "industrial automation manufacturer",
        },
        {
          quote:
            "Three trade fairs in three countries within six weeks. Everything delivered, installed and handed over without a single correction. This is what professional fabrication should look like.",
          author: "Event Manager",
          company: "international technology group",
        },
        {
          quote:
            "From concept to dismantling — full control and communication. mavoNORM thinks like a business partner, not an order-taker.",
          author: "Head of Brand",
          company: "Scandinavian furniture brand",
        },
      ],
    },
    stats: {
      eyebrow: "Numbers",
      items: [
        { value: 12, suffix: "+", label: "years of experience" },
        { value: 850, suffix: "+", label: "projects delivered" },
        { value: 98, suffix: "%", label: "clients return" },
        { value: 48, suffix: " h", label: "to a preliminary quote" },
      ],
    },
    cta: {
      heading: "A trade fair or a new space ahead of you?",
      body: "Tell us about the project. Within 48 hours we will prepare an initial concept and quote.",
      button: "Let's talk",
    },
  },
  servicesList: [
    {
      slug: "exhibition-design",
      title: "Exhibition Stand Design",
      short: "Creative concepts, 3D visualisations and technical documentation.",
      body: "We start with the brand's business goals, not a catalogue of ready-made solutions. Our design team prepares the spatial concept, 3D visualisations, material selection and full production documentation compliant with venue regulations.",
    },
    {
      slug: "booth-fabrication",
      title: "Booth Fabrication",
      short: "Our own joinery, spray booth and production hall — full quality control.",
      body: "Timber and system structures, hybrid builds, illuminated elements, counters, storage rooms and platforms. Everything is made in our facility based on workshop documentation and internal quality control.",
    },
    {
      slug: "installation",
      title: "Installation & Dismantling",
      short: "Experienced installation crews at trade fairs across Europe.",
      body: "Our crews work in Europe's biggest exhibition halls — from Poznań to Munich, Paris and Stockholm. We know the technical regulations, delivery schedules and specifics of every venue.",
    },
    {
      slug: "interiors",
      title: "Interior Fit-outs",
      short: "Offices, showrooms, retail zones and permanent display spaces.",
      body: "We bring exhibition-grade precision to permanent interiors: showrooms, receptions, brand zones, custom furniture and retail displays. From design to final handover.",
    },
    {
      slug: "cnc",
      title: "CNC Production",
      short: "3- and 5-axis machining in timber, composites and plastics.",
      body: "Three CNC machining centres let us cut and mill components up to 3,200 × 2,100 mm — dimensional letters, perforated panels, 3D forms and structural components with repeatable machine precision.",
    },
    {
      slug: "custom",
      title: "Custom Manufacturing",
      short: "Bespoke structures, prototypes and short runs for brands and architects.",
      body: "We take on non-standard production briefs: art installations, display furniture, product prototypes and short production runs for architecture studios and agencies.",
    },
    {
      slug: "logistics",
      title: "Logistics",
      short: "Dedicated transport, customs and venue delivery coordination.",
      body: "Our own fleet plus vetted carriers. We plan transport, delivery slots and unloading schedules so the build stands on time — regardless of the country.",
    },
    {
      slug: "storage",
      title: "Storage",
      short: "We store client builds between events in our warehouses.",
      body: "Reusable build elements are stored, serviced and prepared for the next events. The client receives a condition report after every dismantling.",
    },
    {
      slug: "maintenance",
      title: "Maintenance",
      short: "Refurbishment, repairs and modifications between seasons.",
      body: "Graphic replacements, lacquer repairs, layout modifications — we keep builds event-ready throughout the project's life cycle.",
    },
  ],
  about: {
    hero: { eyebrow: "Company", heading: "A factory of great first impressions.", sub: "Since 2013 we have been building spaces where brands meet their customers." },
    story: {
      heading: "A history written in projects",
      body1:
        "mavoNORM grew out of a joinery workshop and the conviction that Polish manufacturing can compete on quality with the best European studios. Today we design and fabricate builds for brands exhibiting at the continent's largest trade fairs.",
      body2:
        "We grow organically — every new hall, machine and team member answers real project needs, not a slide in a deck. That is how we sustain the hardest thing in this industry: repeatable quality and kept deadlines.",
    },
    philosophy: {
      eyebrow: "Philosophy",
      heading: "No compromises.",
      body1:
        "mavoNORM Poland stands for German precision and experience, gained during many years of standbuilding across Europe.",
      body2:
        "Avoiding compromises is our strategy — especially in terms of quality. No matter what stand we build, the smallest or the biggest one, we always pay most attention to details. If you are searching for such a philosophy, you have just found the right partner.",
    },
    clients: {
      eyebrow: "Clients",
      heading: "Brands we build for.",
      sub: "Selected stands delivered for clients across Europe and beyond.",
    },
    timeline: {
      eyebrow: "Timeline",
      heading: "Key moments",
      items: [
        { year: "2013", text: "Founded as a joinery workshop delivering its first exhibition builds in Poland." },
        { year: "2016", text: "First international project — ISM Cologne. Purchase of the first CNC machining centre." },
        { year: "2019", text: "Move to a new 2,500 m² production hall. In-house spray booth and design department." },
        { year: "2021", text: "Installation team expansion. Ongoing contracts with clients from Germany and Scandinavia." },
        { year: "2023", text: "Facility expanded to 4,000 m². Third CNC centre and a client build storage warehouse." },
        { year: "2026", text: "Over 850 projects delivered in 14 European countries." },
      ],
    },
    mission: {
      eyebrow: "Mission",
      heading: "We build spaces that sell.",
      body: "An exhibition stand has one job: to stop the right people and start a conversation. Everything we design and fabricate serves that goal.",
    },
    values: {
      eyebrow: "Values",
      heading: "What we stand on",
      items: [
        { title: "Precision", body: "Workshop documentation to the millimetre. Quality control at every production stage." },
        { title: "Accountability", body: "One contract, one team, one responsibility — from design to dismantling." },
        { title: "Punctuality", body: "Trade fairs don't wait. In thirteen years we have never handed over a stand late." },
        { title: "Partnership", body: "We advise, protect the client's budget and say plainly what will work and what won't." },
      ],
    },
    facilities: {
      eyebrow: "Production facilities",
      heading: "4,000 m² of capability",
      body: "Production hall, joinery, spray booth, three CNC centres, metalwork department and high-bay warehouse — all in one location near Poznań, Poland.",
      items: ["4,000 m² production hall", "3 CNC machining centres", "Spray finishing booth", "Metalwork & welding dept.", "Client build warehouse", "Own transport fleet"],
    },
    certifications: {
      eyebrow: "Certificates & standards",
      heading: "Compliance, documented",
      items: ["ISO 9001:2015 — quality management", "Flame-retardant material certificates (B1)", "Certified electrical & rigging crews", "Project liability insurance up to €5M"],
    },
    markets: {
      eyebrow: "Markets",
      heading: "We install across Europe",
      body: "Poland, Germany, France, Italy, Spain, the Netherlands, Belgium, Austria, Switzerland, Czechia, Sweden, Denmark, Norway, Finland.",
    },
  },
  services: {
    hero: { eyebrow: "Services & capabilities", heading: "From concept to the last screw.", sub: "Nine areas of expertise, one accountable partner." },
  },
  process: {
    hero: { eyebrow: "How we work", heading: "A process that removes risk.", sub: "Eight stages. One team. Zero surprises on the show floor." },
    steps: [
      { title: "Brief & discovery", body: "We learn the business goals, budget, audience and specifics of the fair. We analyse venue regulations and technical conditions." },
      { title: "Consultation", body: "A workshop with the client: stand functions, zones, visitor journey, AV and catering requirements." },
      { title: "Concept design", body: "Creative concept, 3D visualisations, material moodboard and a preliminary estimate in two variants." },
      { title: "Engineering", body: "Technical and workshop documentation, structural calculations, electrical and statics drawings for organiser approval." },
      { title: "Production", body: "The build takes shape in our facility: CNC, joinery, spray finishing, and a full test assembly before shipping." },
      { title: "Quality control", body: "Test assembly, detail verification, completeness check and a quality protocol. Only then do we pack." },
      { title: "Installation", body: "Transport, on-site assembly, connections and a documented handover before the fair opens." },
      { title: "Support", body: "On-site service during the event, dismantling, storage of the build and a post-event report." },
    ],
  },
  portfolio: {
    hero: { eyebrow: "Projects", heading: "Craftsmanship at European scale.", sub: "Selected stands, interiors and custom fabrication." },
    filterLabel: "Category",
    industryLabel: "Industry",
    categories: { all: "All", exhibition: "Exhibition stands", interior: "Interiors", cnc: "CNC & production", custom: "Special projects" },
  },
  contact: {
    hero: { eyebrow: "Contact", heading: "Let's talk about your project.", sub: "We reply within one business day. Preliminary quote within 48 hours." },
    form: {
      name: "Full name",
      email: "Email address",
      phone: "Phone (optional)",
      company: "Company",
      type: "Project type",
      types: ["Exhibition stand", "Commercial interior", "CNC / custom production", "Other"],
      budget: "Approximate budget",
      budgets: ["up to €10,000", "€10,000 – €30,000", "€30,000 – €80,000", "over €80,000", "Not sure yet"],
      message: "Tell us about the project",
      submit: "Send enquiry",
      success: "Thank you! We will get back to you within 24 hours.",
      privacy: "By submitting this form you accept our privacy policy.",
    },
    details: {
      heading: "Contact details",
      email: "lena@mavonorm.pl",
      phone: "(+48) 504 315 440",
      fax: "(+48) 61 642 72 19",
      address: ["ul. Rolna 16", "62-021 Paczkowo near Poznań", "Poland"],
      hours: "Mon–Fri, 8:00–17:00 CET",
    },
    map: { label: "Production facility — Paczkowo near Poznań, Poland" },
    quickCta: { heading: "Need a quick quote?", body: "Send floor plans or a brief to", button: "Write to us" },
  },
  legal: {
    hero: { eyebrow: "Legal", heading: "Privacy and terms." },
    sections: [
      {
        title: "Privacy Policy",
        body: "The controller of personal data submitted through forms on this website is mavoNORM Sp. z o.o., registered in Paczkowo near Poznań, Poland. We process data solely to handle enquiries and perform contracts. We do not sell data and do not share it with third parties other than trusted IT service providers.",
      },
      {
        title: "GDPR",
        body: "Under Regulation (EU) 2016/679 (GDPR) you have the right to access, rectify, erase, restrict processing and port your data. Requests should be sent to lena@mavonorm.pl. We retain data only as long as necessary for the purposes it was collected for, and no longer than required by law.",
      },
      {
        title: "Cookie Policy",
        body: "This website uses only essential cookies, including a cookie remembering your language choice. We do not use marketing or profiling cookies without your explicit consent. You can change cookie settings at any time in your browser preferences.",
      },
      {
        title: "Terms",
        body: "Content published on this website is for information purposes and does not constitute an offer within the meaning of the Polish Civil Code. Project terms are defined in individual contracts. All rights to published projects, photography and texts are reserved.",
      },
      {
        title: "Legal Notice",
        body: "mavoNORM Sp. z o.o., ul. Rolna 16, 62-021 Paczkowo near Poznań, Poland. KRS 0000000000, VAT ID PL000-000-00-00, REGON 000000000. Share capital: PLN 200,000.",
      },
    ],
  },
  footer: {
    tagline: "Premium fabrication. European standards.",
    nav: "Navigation",
    officeLabel: "Facility & office",
    followLabel: "Follow us",
    legalLink: "Legal",
    privacyLink: "Privacy policy",
    rights: "All rights reserved.",
  },
};
