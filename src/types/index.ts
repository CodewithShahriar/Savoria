export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'chinese-thai' | 'indian' | 'pizza-pasta' | 'starters' | 'beverages' | 'desserts';
  image: string;
  spiceLevel: number; // 0 to 3
  isChefSpecial?: boolean;
  isPopular?: boolean;
  prepTime: string; // e.g. "15-20 min"
  rating: number;
  reviewsCount: number;
  dietary: 'halal' | 'veg' | 'non-veg';
  addons?: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  spiceLevel: number;
  selectedAddons: Array<{ id: string; name: string; price: number }>;
  specialInstructions?: string;
  itemTotal: number;
}

export type OrderStatus = 'confirmed' | 'cooking' | 'quality_check' | 'on_the_way' | 'delivered' | 'cancelled';
export type PaymentMethod = 'apple_pay' | 'google_pay' | 'card' | 'cod';

export interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    address: string;
    zone: string;
    notes?: string;
  };
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  vat: number; // 5% culinary sector tax
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending';
  transactionId?: string;
  status: OrderStatus;
  createdAt: string;
  estimatedDeliveryMinutes: number;
  rider?: {
    name: string;
    phone: string;
    bikeNumber: string;
    rating: number;
  };
  statusTimeline: Array<{
    status: OrderStatus;
    title: string;
    description: string;
    time?: string;
    completed: boolean;
  }>;
}

export interface TableReservation {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  guests: number;
  date: string;
  timeSlot: string;
  seatingZone: 'Skyline VIP Lounge' | 'Romantic Twilight Corner' | 'Chef Omakase Counter' | 'Executive Grand Banquet';
  specialRequest?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}
