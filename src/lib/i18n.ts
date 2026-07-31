import { pl } from "@/dictionaries/pl";
import { en } from "@/dictionaries/en";

export const locales = ["pl", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pl";

export type Dictionary = typeof pl;

const dictionaries: Record<Locale, Dictionary> = { pl, en };

export function getDictionary(lang: string): Dictionary {
  return dictionaries[(locales as readonly string[]).includes(lang) ? (lang as Locale) : defaultLocale];
}

export function isLocale(lang: string): lang is Locale {
  return (locales as readonly string[]).includes(lang);
}
