export type Product = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  brand: string;
  price: number;
  countInStock: number;
  description: string;
  rating: number;
  numReviews: number;
  quantity?: number;
  shippingPrice: number;
  previousPrice: number;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  token: string;
  isAdmin: boolean;
  role_id?: number;
};

export type Comment = {
  rating: number;
  slug: string;
  username: string | null;
  text: string;
  token: string | null;
  _id: string;
  createdAt: string;
};

export type Order = {
  _id: string;
  orderItems: Product[];
  shippingAddress: ShippingAddress;
  user: User;
  createdAt?: string;
  isPaid?: boolean;
  paidAt?: string;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  status?: "pending" | "in progress" | "dilivered" | "return";
};

export type ShippingAddress = {
  fullName?: string;
  address?: string;
  phone?: string;
};

export type handleOrderData = {
  id: string;
  token?: string;
};

export type orderInput = {
  orderItems: Product[];
  shippingAddress: ShippingAddress;
  user: User;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
};

export type SearchInput = {
  data: Product[];
  value: string;
};

declare global {
  interface Window {
    cloudinary: any; // 👈️ turn off type checking
  }
}

export type updateOrderStatusType = {
  token: string;
  orderCheckedBoxes: string[];
  status: string;
};
