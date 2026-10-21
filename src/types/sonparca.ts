export interface SonparcaProduct {
  id: string;
  brandLabel?: string;
  name: string;
  partNumber?: string;
  price: string;
  image: string;
  href?: string;
}

export interface SonparcaCategory {
  slug: string;
  label: string;
  image: string;
}

export interface SonparcaVehicleBrand {
  name: string;
}

export interface SonparcaBrandListing {
  name: string;
  count: number;
}

export interface SonparcaQuickLink {
  title: string;
  subtitle: string;
  icon: string;
  accent?: boolean;
  href?: string;
}
