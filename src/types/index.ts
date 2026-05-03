export type UserRole = "USER" | "MANAGER" | "ADMIN";
export type UserStatus = "ACTIVE" | "BLOCKED";

export type ProductStatus = "ACTIVE" | "DRAFT" | "ARCHIVED";

export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentStatus = "UNPAID" | "PAID" | "FAILED" | "REFUNDED";

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role: UserRole;
  status: UserStatus;
  phone?: string | null;
  street?: string | null;
  city?: string | null;
  country?: string | null;
  postalCode?: string | null;
  createdAt: string;
  updatedAt?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    products: number;
  };
};

export type ProductImage = {
  id?: string;
  url: string;
  publicId: string;
  altText?: string | null;
  productId?: string;
  createdAt?: string;
};

export type ProductSpecification = {
  id?: string;
  name: string;
  value: string;
  productId?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  brand: string;
  price: string | number;
  discountPrice?: string | number | null;
  stock: number;
  ratingAverage: number;
  ratingCount: number;
  soldCount: number;
  viewCount: number;
  tags: string[];
  status: ProductStatus;
  categoryId: string;
  createdById?: string | null;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  images: ProductImage[];
  specifications?: ProductSpecification[];
  reviews?: Review[];
  _count?: {
    reviews: number;
  };
};

export type Review = {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  user?: Pick<User, "id" | "name" | "image">;
};

export type CartItem = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
};

export type CartSummary = {
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
};

export type Cart = {
  id: string | null;
  userId: string;
  items: CartItem[];
  summary: CartSummary;
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  name: string;
  imageUrl?: string | null;
  price: string | number;
  quantity: number;
  product?: Product;
};

export type Payment = {
  id: string;
  orderId: string;
  provider: string;
  providerPaymentId?: string | null;
  amount: string | number;
  currency: string;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  subtotal: string | number;
  shippingFee: string | number;
  tax: string | number;
  total: string | number;
  shippingName: string;
  shippingPhone: string;
  shippingStreet: string;
  shippingCity: string;
  shippingCountry: string;
  shippingPostalCode: string;
  stripeCheckoutSession?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: Pick<User, "id" | "name" | "email" | "phone">;
  items: OrderItem[];
  payment?: Payment | null;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type WishlistItem = {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  product: Product;
};

export type SupportMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isResolved: boolean;
  createdAt: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  createdAt: string;
};