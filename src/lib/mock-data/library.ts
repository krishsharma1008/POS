export interface LibraryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  outlet: string;
  description: string;
}

export interface Modifier {
  id: string;
  name: string;
  options: { name: string; price: number }[];
}

export interface Category {
  id: string;
  name: string;
  itemCount: number;
}

export interface Bundle {
  id: string;
  name: string;
  items: string[];
  price: number;
}

export interface Promo {
  id: string;
  name: string;
  type: string;
  value: number;
  startDate: string;
  endDate: string;
  active: boolean;
}

export interface Discount {
  id: string;
  name: string;
  type: "percentage" | "fixed";
  value: number;
  active: boolean;
}

export interface Tax {
  id: string;
  name: string;
  rate: number;
  active: boolean;
}

export interface Gratuity {
  id: string;
  name: string;
  rate: number;
  active: boolean;
}

export interface SalesType {
  id: string;
  name: string;
  active: boolean;
}

export interface Brand {
  id: string;
  name: string;
  itemCount: number;
}

export const initialItems: LibraryItem[] = [];
export const initialModifiers: Modifier[] = [];
export const initialCategories: Category[] = [];
export const initialBundles: Bundle[] = [];
export const initialPromos: Promo[] = [];
export const initialDiscounts: Discount[] = [];
export const initialTaxes: Tax[] = [];
export const initialGratuities: Gratuity[] = [];
export const initialSalesTypes: SalesType[] = [];
export const initialBrands: Brand[] = [];
