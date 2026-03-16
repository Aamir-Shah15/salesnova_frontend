import { Product, products } from "@/data/products";

export interface Order {
  id: string;
  customer: string;
  email: string;
  items: { product: Product; quantity: number }[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  address: string;
  payment: "cod" | "online";
}

export const mockOrders: Order[] = [
  {
    id: "ORD-1001", customer: "Alice Johnson", email: "alice@example.com",
    items: [{ product: products[0], quantity: 1 }, { product: products[4], quantity: 2 }],
    total: 139.97, status: "delivered", date: "2026-03-08", address: "123 Main St, New York, NY", payment: "online",
  },
  {
    id: "ORD-1002", customer: "Bob Smith", email: "bob@example.com",
    items: [{ product: products[2], quantity: 1 }],
    total: 899.99, status: "shipped", date: "2026-03-09", address: "456 Oak Ave, Los Angeles, CA", payment: "online",
  },
  {
    id: "ORD-1003", customer: "Carol Davis", email: "carol@example.com",
    items: [{ product: products[3], quantity: 3 }, { product: products[6], quantity: 1 }],
    total: 109.96, status: "processing", date: "2026-03-09", address: "789 Pine Rd, Chicago, IL", payment: "cod",
  },
  {
    id: "ORD-1004", customer: "David Lee", email: "david@example.com",
    items: [{ product: products[1], quantity: 1 }, { product: products[8], quantity: 1 }],
    total: 259.98, status: "pending", date: "2026-03-10", address: "321 Elm St, Houston, TX", payment: "online",
  },
  {
    id: "ORD-1005", customer: "Eve Martinez", email: "eve@example.com",
    items: [{ product: products[5], quantity: 1 }],
    total: 349.99, status: "cancelled", date: "2026-03-07", address: "654 Birch Ln, Phoenix, AZ", payment: "cod",
  },
  {
    id: "ORD-1006", customer: "Frank Wilson", email: "frank@example.com",
    items: [{ product: products[7], quantity: 2 }, { product: products[9], quantity: 1 }],
    total: 139.97, status: "delivered", date: "2026-03-06", address: "987 Cedar Dr, Denver, CO", payment: "online",
  },
];
