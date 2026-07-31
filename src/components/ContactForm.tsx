"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

export default function ContactForm({ dict }: { dict: Dictionary }) {
  const [sent, setSent] = useState(false);
  const f = dict.contact.form;

  if (sent) {
    return (
      <div className="flex min-h-80 flex-col items-start justify-center border border-line p-10">
        <div className="h-eyebrow text-blue">mavoNORM</div>
        <p className="h-display mt-4 text-3xl">{f.success}</p>
      </div>
    );
  }

  const field =
    "w-full border-b border-line bg-transparent py-3 text-base outline-none transition-colors placeholder:text-muted focus:border-blue";

  return (
    <form
      className="grid gap-8 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label className="block">
        <span className="h-eyebrow text-muted">{f.name}</span>
        <input required name="name" autoComplete="name" className={field} />
      </label>
      <label className="block">
        <span className="h-eyebrow text-muted">{f.email}</span>
        <input required type="email" name="email" autoComplete="email" className={field} />
      </label>
      <label className="block">
        <span className="h-eyebrow text-muted">{f.phone}</span>
        <input type="tel" name="phone" autoComplete="tel" className={field} />
      </label>
      <label className="block">
        <span className="h-eyebrow text-muted">{f.company}</span>
        <input name="company" autoComplete="organization" className={field} />
      </label>
      <label className="block">
        <span className="h-eyebrow text-muted">{f.type}</span>
        <select name="type" className={`${field} cursor-pointer`}>
          {f.types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="h-eyebrow text-muted">{f.budget}</span>
        <select name="budget" className={`${field} cursor-pointer`}>
          {f.budgets.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className="h-eyebrow text-muted">{f.message}</span>
        <textarea required name="message" rows={5} className={`${field} resize-none`} />
      </label>
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-dark">
          {f.submit}
          <span aria-hidden>→</span>
        </button>
        <p className="mt-4 text-xs text-muted">{f.privacy}</p>
      </div>
    </form>
  );
}
