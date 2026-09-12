export type Money = { amount: string; currencyCode: string };

export type ProductImage = { url: string; altText: string | null; width?: number; height?: number };

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  selectedOptions: { name: string; value: string }[];
  image?: ProductImage | null;
};

export type ProductOption = { name: string; values: string[] };

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  productType: string;
  featuredImage: ProductImage | null;
  images: ProductImage[];
  options: ProductOption[];
  variants: ProductVariant[];
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  /** Custom metafield: which 3D model to show (ring | pendant | earring | bracelet | none) */
  model3d?: "ring" | "pendant" | "earring" | "bracelet" | "none";
  /** Custom metafield: short story for the product page */
  story?: string;
  /** Custom metafield: material (goud | zilver | rosegoud) drives 3D material */
  material?: "goud" | "zilver" | "rosegoud";
  /** Custom metafield: stone colour hex for 3D stone */
  stoneColor?: string;
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ProductImage | null;
  products?: Product[];
};

export type CartLine = {
  id: string;
  quantity: number;
  attributes: { key: string; value: string }[];
  merchandise: {
    id: string;
    title: string;
    price: Money;
    selectedOptions: { name: string; value: string }[];
    product: { handle: string; title: string; featuredImage: ProductImage | null };
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: CartLine[];
  cost: { subtotalAmount: Money; totalAmount: Money };
};
