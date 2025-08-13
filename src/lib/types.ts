export type SanityImage = {
  asset?: { _ref?: string; _id?: string } | null;
};

export type Shop = {
  _id: string;
  title: string;
  hours?: Hours | null;
};

export type HoursRange = { start: string; end: string };
export type Hours = {
  monday?: HoursRange[];
  tuesday?: HoursRange[];
  wednesday?: HoursRange[];
  thursday?: HoursRange[];
  friday?: HoursRange[];
  saturday?: HoursRange[];
  sunday?: HoursRange[];
};

export type Category = { _id: string; title: string };
export type Allergen = { _id: string; title: string };

export type ProductVariant = { label: string; price: number };
export type Product = {
  _id: string;
  title: string;
  image?: SanityImage | null;
  description?: string | null;
  basePrice?: number | null;
  variants?: ProductVariant[] | null;
  category?: Category | null; // legacy
  categories?: Category[] | null; // new multi
  allergens?: Allergen[] | null;
};

export type Photo = {
  _id: string;
  title: string;
  image?: SanityImage | null;
};

export type UiProduct = {
  id: string;
  name: string;
  price?: string; // formatted price
  image?: string;
  description?: string;
  details?: string;
  sizes: string[]; // formatted variants
  ingredients?: string; // formatted allergens
  categories?: string[];
};

export type UiGalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
};

export type UiScheduleItem = { day: string; hours: string };

export type UiCategory = string;
