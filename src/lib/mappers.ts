import { urlFor } from "./sanity";
import type { Hours, Photo, Product, UiGalleryImage, UiProduct, UiScheduleItem } from "./types";

export function formatPrice(price?: number | null): string | undefined {
  if (price == null) return undefined;
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(price);
}

export function mapProductsToUi(products: Product[]): UiProduct[] {
  return products.map((p) => {
    // Ne calcule plus de prix indicatif; on affiche seulement les tailles

    const imageUrl = p.image?.asset ? urlFor(p.image).width(800).height(800).fit("crop").url() : undefined;

    const sizes: string[] = (p.variants || []).map((v) => {
      const priceTxt = typeof v.price === "number" ? formatPrice(v.price) : undefined;
      return priceTxt ? `${v.label} — ${priceTxt}` : v.label;
    });

    const ingredients = (p.allergens || []).map((a) => a.title).join(", ");

    return {
      id: p._id,
      name: p.title,
      price: undefined,
      image: imageUrl,
      description: p.description || undefined,
      details: p.description || undefined,
      sizes,
      ingredients: ingredients || undefined,
      categories: (p.categories && p.categories.length
        ? p.categories
        : p.category
        ? [p.category]
        : [])
        .map((c) => c.title),
    };
  });
}

export function extractCategories(products: UiProduct[]): string[] {
  const set = new Set<string>();
  products.forEach((p) => (p.categories || []).forEach((c) => c && set.add(c)));
  return Array.from(set);
}

export function mapPhotosToUi(photos: Photo[]): UiGalleryImage[] {
  return photos
    .map((ph) => ({
      id: ph._id,
      // Honore le recadrage (crop/hotspot) défini dans Sanity en forçant un 16:9
      src: ph.image?.asset ? urlFor(ph.image).width(1600).height(900).fit("crop").url() : "",
      alt: ph.title || "Photo",
      caption: ph.title || undefined,
    }))
    .filter((p) => Boolean(p.src));
}

const dayOrder: Array<keyof Hours> = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
const dayLabels = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

function hhmmToLabel(hhmm: string): string {
  if (!hhmm || hhmm.length < 3) return hhmm;
  const h = hhmm.slice(0, hhmm.length - 2);
  const m = hhmm.slice(-2);
  return `${parseInt(h, 10)}h${m}`;
}

export function mapHoursToSchedule(hours?: Hours | null): UiScheduleItem[] {
  if (!hours) {
    return dayLabels.map((d) => ({ day: d, hours: "Fermé" }));
  }
  return dayOrder.map((key, idx) => {
    const ranges = (hours[key] || []) as Array<{ start: string; end: string }>;
    if (!ranges.length) return { day: dayLabels[idx], hours: "Fermé" };
    const label = ranges.map((r) => `${hhmmToLabel(r.start)} - ${hhmmToLabel(r.end)}`).join(" & ");
    return { day: dayLabels[idx], hours: label };
  });
}

export function buildOpeningHoursMap(hours?: Hours | null): Record<number, Array<{ start: number; end: number }>> {
  const map: Record<number, Array<{ start: number; end: number }>> = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
  if (!hours) return map;
  dayOrder.forEach((key, idx) => {
    const ranges = (hours[key] || []) as Array<{ start: string; end: string }>;
    map[(idx + 1) % 7] = ranges.map((r) => ({ start: parseInt(r.start, 10), end: parseInt(r.end, 10) }));
  });
  return map;
}
