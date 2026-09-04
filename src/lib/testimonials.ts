/**
 * Client feedback, as given to us.
 *
 * The quotes are the clients' own words and are NOT translated per locale —
 * a Polish "translation" would be words we put in their mouths rather than
 * words they said. Only the page's own copy around them is localised.
 *
 * Feedback is published under the client company's name only. The individuals
 * who gave it are deliberately not recorded here — not their names, not their
 * job titles and not their `id`s — so there is nothing in this file a page
 * could accidentally render.
 *
 * `kind` splits the list the way the content already splits itself:
 *   "voice"     — the client described the work
 *   "reference" — the client offered to be contacted about it
 * Both are published as given; neither is paraphrased or padded.
 */
export interface Testimonial {
  id: string;
  quote: string;
  company: string;
  /** The show the feedback refers to, when the client named it. */
  event?: string;
  /** Where the client is based, when that is what they gave us instead of a show. */
  country?: string;
  /** Portfolio slug, only where we hold that client's build in the portfolio. */
  project?: string;
  kind: "voice" | "reference";
}

export const testimonials: Testimonial[] = [
  {
    id: "idaho-commerce",
    quote:
      "We were very happy with mavoNORM's thoroughness, attention to detail and timely execution. The work was completed with enough time before the show for us to focus on our remaining priorities. We highly recommend mavoNORM.",
    company: "Idaho Commerce",
    kind: "voice",
  },
  {
    id: "shenpaz",
    quote:
      "Working with mavoNORM was an extremely positive experience. Although this was our first time using an overseas contractor, communication was smooth and dependable, and Lena and her team took care of all our requests. We were very happy with every aspect of the booth and look forward to working with them again.",
    company: "ShenPaz Dental Furnaces",
    event: "IDS Cologne",
    kind: "voice",
  },
  {
    id: "flyability",
    quote:
      "Our booth built by mavoNORM at InterGEO was functional, attractive and hit the brief perfectly. Lena's responsiveness and willingness to adapt the booth to our needs were extremely valuable and made the project a great experience.",
    company: "Flyability SA",
    event: "InterGEO 2022",
    kind: "voice",
  },
  {
    id: "idaho-commerce-outdoor",
    quote:
      "The Outdoor Show went great, and we would be happy to give mavoNORM a great recommendation. Prospective clients are welcome to contact us to learn about our experience.",
    company: "Idaho Commerce",
    event: "Outdoor Show",
    kind: "voice",
  },
  {
    id: "astar",
    quote:
      "Thank you to Lena and the mavoNORM team for their excellent coordination. We were very happy with the show and with their contribution, and our entire team shared very positive feedback about the result.",
    company: "ASTAR S.A.",
    country: "Spain",
    kind: "voice",
  },
  {
    id: "ixoreal",
    quote:
      "I would be happy to vouch for mavoNORM and its work. Prospective clients are welcome to contact me as a reference.",
    company: "Ixoreal",
    kind: "reference",
  },
  {
    id: "verta-media",
    quote:
      "It would be my pleasure to recommend mavoNORM. Prospective clients are welcome to contact me as a reference.",
    company: "Verta Media",
    kind: "reference",
  },
  {
    id: "avesafe",
    quote:
      "Prospective clients are welcome to contact me regarding our experience with mavoNORM. I am happy to serve as a reference for the company.",
    company: "Avesafe",
    kind: "reference",
  },
  {
    id: "freeze-cast",
    quote:
      "I am happy for mavoNORM to share my contact with prospective clients who would like to confirm the stand work completed for Freeze-Cast.",
    company: "Freeze-Cast",
    kind: "reference",
  },
  {
    id: "technic-deutschland",
    quote:
      "Prospective clients are welcome to contact us to learn about our experience with mavoNORM. We are happy for our contact details to be shared as a reference.",
    company: "Technic Deutschland",
    project: "technic",
    kind: "reference",
  },
];

export const voices = testimonials.filter((t) => t.kind === "voice");
export const references = testimonials.filter((t) => t.kind === "reference");

/**
 * Reviews left on the public stand-review platform, where exhibitors post
 * under their own name rather than their company's.
 *
 * These are a different record from `testimonials` above and are kept apart
 * from it on purpose. There the client wrote to us and is credited to the
 * company; here the review was published by a named individual on a public
 * listing, and the name is part of what was published. Nothing is moved
 * between the two lists.
 *
 * Quotes are reproduced exactly as published, including the reviewer's own
 * spelling of our name.
 *
 * The platform dates each review relative to the day you read it ("4 years
 * ago"), which is not a fact we can store, so no date is carried here.
 */
export interface Review {
  id: string;
  quote: string;
  /** Name the reviewer published under. */
  name: string;
  /** City of the stand the review is about, as the listing names it. */
  city: string;
  /** Out of five, as given. */
  stars: number;
}

export const reviews: Review[] = [
  {
    id: "chapman-kopenhagen",
    quote:
      "Efficient, reasonable and trustworthy - I 100% will be revisiting their services for future events. Highly recommended!",
    name: "Charlotte Chapman",
    city: "Kopenhagen",
    stars: 5,
  },
  {
    id: "ross-hannover",
    quote:
      "Yes we used ManoNorm for Domotex and they were great! So good infact that we are going to re-book them for next year at Domotex, it was by far the best looking stand we have ever had and we have had so many compliments! Many thanks for sending them our way",
    name: "Bob Ross",
    city: "Hannover",
    stars: 5,
  },
  {
    id: "dobie-frankfurt",
    quote:
      "We worked with Lena and felt greatly taken care of - she was very responsive and on top of everything every step of the way. The onsite team for install and dismantle was great, and the booth looked amazing.",
    name: "Sally Dobie",
    city: "Frankfurt",
    stars: 5,
  },
  {
    id: "juliane-koeln",
    quote:
      "We used mavoNORM at a tradeshow in Germany and were very satisfied. The communication and consultation before the event were excellent, and mostly everything was as expected when we arrived at the booth. There were a few changes and adjustments that had to be made, and mavoNORM pulled through and made it happen on the spot. We'd definitely use them again!",
    name: "Juliane",
    city: "Köln",
    stars: 5,
  },
];
