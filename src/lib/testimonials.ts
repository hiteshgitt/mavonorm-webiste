/**
 * Client feedback, as given to us.
 *
 * The quotes are the clients' own words and are NOT translated per locale —
 * these are attributed to named, real people at named companies, and a Polish
 * "translation" would be words we put in their mouths rather than words they
 * said. Only the page's own copy around them is localised.
 *
 * `kind` splits the list the way the content already splits itself:
 *   "voice"     — the client described the work
 *   "reference" — the client offered to be contacted about it
 * Both are published as given; neither is paraphrased or padded.
 */
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  /** Job title, when the client gave one. */
  role?: string;
  company: string;
  /** The show the feedback refers to, when the client named it. */
  event?: string;
  /** Portfolio slug, only where we hold that client's build in the portfolio. */
  project?: string;
  kind: "voice" | "reference";
}

export const testimonials: Testimonial[] = [
  {
    id: "karen-parnell",
    quote:
      "We were very happy with mavoNORM's thoroughness, attention to detail and timely execution. The work was completed with enough time before the show for us to focus on our remaining priorities. We highly recommend mavoNORM.",
    author: "Karen Parnell",
    role: "CGBP",
    company: "Idaho Commerce",
    kind: "voice",
  },
  {
    id: "denise-shahar",
    quote:
      "Working with mavoNORM was an extremely positive experience. Although this was our first time using an overseas contractor, communication was smooth and dependable, and Lena and her team took care of all our requests. We were very happy with every aspect of the booth and look forward to working with them again.",
    author: "Denise Shahar",
    company: "ShenPaz Dental Furnaces",
    event: "IDS Cologne",
    kind: "voice",
  },
  {
    id: "corina-meldem",
    quote:
      "Our booth built by mavoNORM at InterGEO was functional, attractive and hit the brief perfectly. Lena's responsiveness and willingness to adapt the booth to our needs were extremely valuable and made the project a great experience.",
    author: "Corina Meldem",
    role: "Event Manager",
    company: "Flyability SA",
    event: "InterGEO 2022",
    kind: "voice",
  },
  {
    id: "jake-reynolds",
    quote:
      "The Outdoor Show went great, and we would be happy to give mavoNORM a great recommendation. Prospective clients are welcome to contact us to learn about our experience.",
    author: "Jake Reynolds",
    role: "International Trade Specialist",
    company: "Idaho Commerce",
    event: "Outdoor Show",
    kind: "voice",
  },
  {
    id: "david-lopez",
    quote:
      "Thank you to Lena and the mavoNORM team for their excellent coordination. We were very happy with the show and with their contribution, and our entire team shared very positive feedback about the result.",
    author: "David López",
    role: "Sales Department, Mechanical Engineer MSc",
    company: "ASTAR S.A.",
    event: "Spain",
    kind: "voice",
  },
  {
    id: "kartikeya-baldwa",
    quote:
      "I would be happy to vouch for mavoNORM and its work. Prospective clients are welcome to contact me as a reference.",
    author: "Kartikeya Baldwa",
    company: "Ixoreal",
    kind: "reference",
  },
  {
    id: "marina-yelshanska",
    quote:
      "It would be my pleasure to recommend mavoNORM. Prospective clients are welcome to contact me as a reference.",
    author: "Marina Yelshanska",
    role: "Marketing Manager",
    company: "Verta Media",
    kind: "reference",
  },
  {
    id: "amir-reza-bidgoli",
    quote:
      "Prospective clients are welcome to contact me regarding our experience with mavoNORM. I am happy to serve as a reference for the company.",
    author: "Amir Reza Bidgoli",
    company: "Avesafe",
    kind: "reference",
  },
  {
    id: "julian-lopez",
    quote:
      "I am happy for mavoNORM to share my contact with prospective clients who would like to confirm the stand work completed for Freeze-Cast.",
    author: "Julian Lopez",
    company: "Freeze-Cast",
    kind: "reference",
  },
  {
    id: "hans-jorg-hoffmann",
    quote:
      "Prospective clients are welcome to contact us to learn about our experience with mavoNORM. We are happy for our contact details to be shared as a reference.",
    author: "Hans-Jörg Hoffmann",
    role: "Sales Manager",
    company: "Technic Deutschland",
    project: "technic",
    kind: "reference",
  },
];

export const voices = testimonials.filter((t) => t.kind === "voice");
export const references = testimonials.filter((t) => t.kind === "reference");
