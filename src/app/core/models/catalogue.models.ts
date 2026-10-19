export interface CatalogueFilterGroup {
  key: string;
  label: string;
  options: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  thumbnail: string;
  imageAlt: string;
  filters: CatalogueFilterGroup[];
}

export interface ProductVariant {
  colour: string;
  hex: string;
  image: string;
  thumbnail: string;
  alt: string;
}

export interface Product {
  id: string;
  categorySlug: string;
  code?: string;
  price: number;
  newArrival: boolean;
  sizes: string[];
  attributes: Record<string, string>;
  variants: ProductVariant[];
}

export interface StoreLocation {
  id: number;
  slug: string;
  name: string;
  address: string[];
  hours: string[];
  mapUrl: string;
  confirmed: boolean;
}
