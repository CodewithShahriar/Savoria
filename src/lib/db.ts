import { MenuItem, Order, TableReservation } from '@/types';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'db.json');

interface DatabaseSchema {
  menu: MenuItem[];
  orders: Order[];
  reservations: TableReservation[];
}

const INITIAL_MENU: MenuItem[] = [
  // Chinese & Thai
  {
    id: 'ct-1',
    name: 'Szechuan Firecracker Chicken',
    bengaliName: 'শেচুয়ান ফায়ারক্র্যাকার চিকেন',
    description: 'Crispy chicken wok-tossed with fiery Szechuan peppercorns, dried red chilies, scallions, and toasted sesame.',
    price: 580,
    category: 'chinese-thai',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 3,
    isChefSpecial: true,
    isPopular: true,
    prepTime: '15-20 min',
    rating: 4.9,
    reviewsCount: 142,
    dietary: 'halal',
    addons: [
      { id: 'add-1', name: 'Extra Szechuan Glaze', price: 60 },
      { id: 'add-2', name: 'Toasted Cashew Nuts', price: 90 },
      { id: 'add-3', name: 'Crispy Garlic Topping', price: 50 },
    ],
  },
  {
    id: 'ct-2',
    name: 'Royal Dragon Chowmein',
    bengaliName: 'রয়্যাল ড্রাগন চাউমিন',
    description: 'Hand-pulled artisanal noodles stir-fried with tender chicken, tiger prawns, shiitake mushrooms, and dark aromatic oyster-soy glaze.',
    price: 540,
    category: 'chinese-thai',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 2,
    isChefSpecial: false,
    isPopular: true,
    prepTime: '15-18 min',
    rating: 4.8,
    reviewsCount: 198,
    dietary: 'halal',
    addons: [
      { id: 'add-4', name: 'Fried Egg On Top', price: 50 },
      { id: 'add-5', name: 'Extra Tiger Prawns (3 pcs)', price: 180 },
    ],
  },
  {
    id: 'ct-3',
    name: 'Bangkok Tom Yum Seafood Pot',
    bengaliName: 'টম ইয়াম সীফুড পট',
    description: 'Authentic Thai broth infused with galangal, lemongrass, kaffir lime, jumbo prawns, squid, and button mushrooms.',
    price: 690,
    category: 'chinese-thai',
    image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 3,
    isChefSpecial: true,
    isPopular: true,
    prepTime: '20 min',
    rating: 4.9,
    reviewsCount: 110,
    dietary: 'halal',
    addons: [
      { id: 'add-6', name: 'Extra Coconut Milk Creaminess', price: 60 },
      { id: 'add-7', name: 'Steamed Jasmine Rice Bowl', price: 120 },
    ],
  },
  {
    id: 'ct-4',
    name: 'Pad Thai Boran',
    bengaliName: 'ট্র্যাডিশনাল প্যাড থাই',
    description: 'Flat rice noodles tossed in authentic tamarind palm-sugar reduction, crushed peanuts, bean sprouts, and fresh lime with chicken & prawns.',
    price: 520,
    category: 'chinese-thai',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 1,
    isChefSpecial: false,
    isPopular: false,
    prepTime: '15 min',
    rating: 4.7,
    reviewsCount: 84,
    dietary: 'halal',
    addons: [
      { id: 'add-8', name: 'Extra Crushed Peanuts & Chili Flakes', price: 30 },
    ],
  },

  // Indian Royale
  {
    id: 'in-1',
    name: 'Kashmiri Saffron Murgh Makhani',
    bengaliName: 'কাশ্মীরি জাফরানি বাটার চিকেন',
    description: 'Tandoor-charred chicken simmered in a velvety reduction of San Marzano tomatoes, pure Kashmiri saffron, butter, and artisanal cream.',
    price: 650,
    category: 'indian',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 1,
    isChefSpecial: true,
    isPopular: true,
    prepTime: '20-25 min',
    rating: 5.0,
    reviewsCount: 260,
    dietary: 'halal',
    addons: [
      { id: 'add-9', name: 'Butter Garlic Naan', price: 90 },
      { id: 'add-10', name: 'Truffle Cheese Naan', price: 150 },
    ],
  },
  {
    id: 'in-2',
    name: 'Awadhi Shahi Dum Biryani',
    bengaliName: 'আওয়াধি শাহী দম বিরিয়ানি',
    description: 'Fragrant aged Kalijira rice slow-cooked on dum in sealed clay pots with tender mutton shank, saffron milk, kewra water, and caramelised onions.',
    price: 780,
    category: 'indian',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 2,
    isChefSpecial: true,
    isPopular: true,
    prepTime: '25 min',
    rating: 4.9,
    reviewsCount: 312,
    dietary: 'halal',
    addons: [
      { id: 'add-11', name: 'Burani Garlic Raita', price: 70 },
      { id: 'add-12', name: 'Shahi Shami Kebab (2 pcs)', price: 180 },
    ],
  },
  {
    id: 'in-3',
    name: 'Dal Makhani Savoria Grand',
    bengaliName: 'ডাল মাখানি গ্র্যান্ড',
    description: 'Black urad lentils slow-cooked overnight for 24 hours on slow charcoal, infused with organic butter and fenugreek leaves.',
    price: 420,
    category: 'indian',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 1,
    isChefSpecial: false,
    isPopular: true,
    prepTime: '15 min',
    rating: 4.8,
    reviewsCount: 95,
    dietary: 'veg',
    addons: [
      { id: 'add-13', name: 'Lachha Paratha', price: 70 },
    ],
  },

  // Artisan Pizza & Pasta
  {
    id: 'pp-1',
    name: 'Truffle Wild Mushroom Tagliatelle',
    bengaliName: 'ট্রাফেল মাশরুম তাগলিয়াতাল্লে',
    description: 'Fresh handmade pasta ribbons in a decadent white truffle cream sauce, wild porcini mushrooms, and shaved 24-month aged parmesan.',
    price: 680,
    category: 'pizza-pasta',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isChefSpecial: true,
    isPopular: true,
    prepTime: '18 min',
    rating: 4.9,
    reviewsCount: 165,
    dietary: 'veg',
    addons: [
      { id: 'add-14', name: 'Extra Black Truffle Oil Drizzle', price: 120 },
      { id: 'add-15', name: 'Grilled Herb Chicken Strips', price: 140 },
    ],
  },
  {
    id: 'pp-2',
    name: 'Savoria Quattro Formaggi Fire Pizza',
    bengaliName: 'কোয়াট্রো ফরমাজি উড-ফায়ার্ড পিৎজা',
    description: '48-hour fermented Neapolitan dough with San Marzano marinara, fresh fior di latte mozzarella, gorgonzola, smoked provolone, and parmesan.',
    price: 890,
    category: 'pizza-pasta',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isChefSpecial: false,
    isPopular: true,
    prepTime: '20 min',
    rating: 4.8,
    reviewsCount: 220,
    dietary: 'veg',
    addons: [
      { id: 'add-16', name: 'Hot Honey Drizzle', price: 80 },
      { id: 'add-17', name: 'Spicy Beef Pepperoni', price: 160 },
      { id: 'add-18', name: 'Stuffed Crust Cheese', price: 150 },
    ],
  },
  {
    id: 'pp-3',
    name: 'Fiery Diavola Smoked Beef Pizza',
    bengaliName: 'দিয়াভোলা স্মোকড বিফ পিৎজা',
    description: 'Wood-fired crust with artisanal spicy cured beef, fresh jalapeños, chili crunch, San Marzano tomato sauce, and molten mozzarella.',
    price: 940,
    category: 'pizza-pasta',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 2,
    isChefSpecial: true,
    isPopular: true,
    prepTime: '20 min',
    rating: 4.9,
    reviewsCount: 175,
    dietary: 'halal',
    addons: [
      { id: 'add-19', name: 'Extra Mozzarella Melt', price: 110 },
      { id: 'add-20', name: 'Garlic Butter Crust Dip', price: 60 },
    ],
  },

  // Starters & Appetizers
  {
    id: 'st-1',
    name: 'Dynamite Jumbo Prawns',
    bengaliName: 'ডিনামাইট জাম্বো প্রন',
    description: 'Crispy batter-fried Bay of Bengal king prawns coated in our signature spicy cyber-dynamite mayo and tobiko roe.',
    price: 690,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 2,
    isChefSpecial: true,
    isPopular: true,
    prepTime: '12-15 min',
    rating: 5.0,
    reviewsCount: 289,
    dietary: 'halal',
    addons: [
      { id: 'add-21', name: 'Extra Dynamite Sauce Bowl', price: 70 },
    ],
  },
  {
    id: 'st-2',
    name: 'Crispy Golden Calamari Rings',
    bengaliName: 'ক্রিস্পি গোল্ডেন কালামারি',
    description: 'Tender calamari dusted with togarashi spices, fried to golden perfection, served with yuzu citrus tartar and smoked paprika.',
    price: 520,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 1,
    isChefSpecial: false,
    isPopular: true,
    prepTime: '12 min',
    rating: 4.7,
    reviewsCount: 130,
    dietary: 'halal',
    addons: [
      { id: 'add-22', name: 'Wasabi Mayo Dip', price: 60 },
    ],
  },
  {
    id: 'st-3',
    name: 'Yakitori Glazed Chicken Satay',
    bengaliName: 'চিকেন সাতে উইথ পিনাট ডিপ',
    description: 'Flame-grilled lemongrass chicken skewers basted in sweet soy reduction, served with velvety Indonesian roasted peanut sauce.',
    price: 460,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1529563021893-cc83c914d73e?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 1,
    isChefSpecial: false,
    isPopular: false,
    prepTime: '15 min',
    rating: 4.8,
    reviewsCount: 94,
    dietary: 'halal',
    addons: [
      { id: 'add-23', name: 'Extra Roasted Peanut Sauce', price: 60 },
    ],
  },

  // Gourmet Beverages & Cocktails
  {
    id: 'bv-1',
    name: 'Electric Neon Blue Mojito',
    bengaliName: 'ইলেকট্রিক নিয়ন ব্লু মহিতো',
    description: 'Futuristic blue curacao syrup, crushed garden spearmint, muddled Persian limes, fizzy soda, and edible silver sparkles.',
    price: 290,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isChefSpecial: true,
    isPopular: true,
    prepTime: '5-7 min',
    rating: 4.9,
    reviewsCount: 310,
    dietary: 'veg',
    addons: [
      { id: 'add-24', name: 'Double Mint & Lime Burst', price: 40 },
    ],
  },
  {
    id: 'bv-2',
    name: 'Smoked Rosemary Berry Mojito',
    bengaliName: 'স্মোকড রোজমেরি বেরি মহিতো',
    description: 'Wild blackberry reduction, fresh raspberries, activated smoked rosemary sprig, lime, and crushed crystal ice.',
    price: 320,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isChefSpecial: false,
    isPopular: true,
    prepTime: '6 min',
    rating: 4.8,
    reviewsCount: 145,
    dietary: 'veg',
  },
  {
    id: 'bv-3',
    name: 'Nitro Hazelnut Velvet Cold Coffee',
    bengaliName: 'নাইট্রো হ্যাজেলনাট কোল্ড কফি',
    description: 'Single-origin 18-hour cold brew infused with roasted hazelnut cream, cold foam cap, and Valrhona cocoa dust.',
    price: 340,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isChefSpecial: true,
    isPopular: true,
    prepTime: '5 min',
    rating: 4.9,
    reviewsCount: 280,
    dietary: 'veg',
    addons: [
      { id: 'add-25', name: 'Extra Espresso Shot', price: 60 },
      { id: 'add-26', name: 'Whipped Caramel Drizzle Cream', price: 50 },
    ],
  },

  // Decadent Desserts
  {
    id: 'ds-1',
    name: '24K Savoria Cyber Molten Sphere',
    bengaliName: '২৪ ক্যারেট গল্ডেন লাভা স্পেয়ার',
    description: 'Belgian 72% dark chocolate sphere filled with warm liquid chocolate lava, Madagascar vanilla bean gelato, and edible 24K gold leaf.',
    price: 520,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isChefSpecial: true,
    isPopular: true,
    prepTime: '12 min',
    rating: 5.0,
    reviewsCount: 390,
    dietary: 'veg',
  },
  {
    id: 'ds-2',
    name: 'Saffron Pistachio Royal Kunafa',
    bengaliName: 'জাফরানি পেস্তা শাহী কুনাফা',
    description: 'Golden spun kadaif pastry filled with molten sweet akkawi cheese, soaked in saffron-rose nectar and topped with Iranian emerald pistachios.',
    price: 490,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
    spiceLevel: 0,
    isChefSpecial: true,
    isPopular: true,
    prepTime: '15 min',
    rating: 4.9,
    reviewsCount: 215,
    dietary: 'veg',
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'SAV-89241',
    customer: {
      name: 'Tanvir Ahmed',
      phone: '01711223344',
      email: 'tanvir.ahmed@example.com',
      address: 'House 42, Road 11, Block D',
      zone: 'Banani, Dhaka',
      notes: 'Please ring the doorbell twice. Keep spice medium.',
    },
    items: [
      {
        cartItemId: 'item-1',
        menuItem: INITIAL_MENU[0], // Szechuan Chicken
        quantity: 1,
        spiceLevel: 2,
        selectedAddons: [{ id: 'add-2', name: 'Toasted Cashew Nuts', price: 90 }],
        itemTotal: 670,
      },
      {
        cartItemId: 'item-2',
        menuItem: INITIAL_MENU[1], // Royal Dragon Chowmein
        quantity: 2,
        spiceLevel: 2,
        selectedAddons: [],
        itemTotal: 1080,
      },
      {
        cartItemId: 'item-3',
        menuItem: INITIAL_MENU[11], // Electric Blue Mojito
        quantity: 2,
        spiceLevel: 0,
        selectedAddons: [],
        itemTotal: 580,
      },
    ],
    subtotal: 2330,
    deliveryFee: 60,
    vat: 116,
    discount: 200,
    total: 2306,
    paymentMethod: 'bkash',
    paymentStatus: 'paid',
    transactionId: 'BKSH-928471629X',
    status: 'on_the_way',
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    estimatedDeliveryMinutes: 12,
    rider: {
      name: 'Kamrul Hasan',
      phone: '01855998877',
      bikeNumber: 'Dhaka Metro HA-4921',
      rating: 4.9,
    },
    statusTimeline: [
      {
        status: 'confirmed',
        title: 'Order Confirmed',
        description: 'Order SAV-89241 verified and logged in Savoria Central Cloud.',
        time: '7:40 PM',
        completed: true,
      },
      {
        status: 'cooking',
        title: 'Culinary Master Crafting',
        description: 'Chef is wok-frying fresh ingredients at high flame.',
        time: '7:46 PM',
        completed: true,
      },
      {
        status: 'quality_check',
        title: 'Quality & Thermal Sealed',
        description: 'Temperature checked, sealed in thermo-lock cyber packaging.',
        time: '7:58 PM',
        completed: true,
      },
      {
        status: 'on_the_way',
        title: 'Cyber Rider En Route',
        description: 'Rider Kamrul Hasan is speeding toward Banani with your hot meal.',
        time: '8:05 PM',
        completed: true,
      },
      {
        status: 'delivered',
        title: 'Delivered & Bon Appétit',
        description: 'Meal successfully handed over. Enjoy your dining experience!',
        time: 'Expected 8:17 PM',
        completed: false,
      },
    ],
  },
];

const INITIAL_RESERVATIONS: TableReservation[] = [
  {
    id: 'RES-1049',
    customerName: 'Samira Rahman',
    phone: '01912345678',
    email: 'samira@example.com',
    guests: 2,
    date: '2026-11-23',
    timeSlot: '8:00 PM',
    seatingZone: 'Romantic Twilight Corner',
    specialRequest: 'Anniversary celebration with rose petals on table.',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
];

function ensureDbFile(): DatabaseSchema {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    const initialData: DatabaseSchema = {
      menu: INITIAL_MENU,
      orders: INITIAL_ORDERS,
      reservations: INITIAL_RESERVATIONS,
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading DB file, reinitializing', err);
    const initialData: DatabaseSchema = {
      menu: INITIAL_MENU,
      orders: INITIAL_ORDERS,
      reservations: INITIAL_RESERVATIONS,
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
}

function saveDb(data: DatabaseSchema): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export const db = {
  getMenu: (): MenuItem[] => {
    const data = ensureDbFile();
    return data.menu;
  },
  getMenuItemById: (id: string): MenuItem | undefined => {
    const data = ensureDbFile();
    return data.menu.find((item) => item.id === id);
  },
  getOrders: (): Order[] => {
    const data = ensureDbFile();
    return data.orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  getOrderById: (id: string): Order | undefined => {
    const data = ensureDbFile();
    return data.orders.find((o) => o.id.toUpperCase() === id.toUpperCase());
  },
  createOrder: (order: Order): Order => {
    const data = ensureDbFile();
    data.orders.unshift(order);
    saveDb(data);
    return order;
  },
  updateOrderStatus: (id: string, status: Order['status']): Order | null => {
    const data = ensureDbFile();
    const order = data.orders.find((o) => o.id.toUpperCase() === id.toUpperCase());
    if (!order) return null;

    order.status = status;
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Update status timeline
    order.statusTimeline = order.statusTimeline.map((item) => {
      if (item.status === status) {
        return { ...item, completed: true, time: nowStr };
      }
      return item;
    });

    if (status === 'delivered') {
      order.estimatedDeliveryMinutes = 0;
      order.statusTimeline.forEach((t) => (t.completed = true));
    }

    saveDb(data);
    return order;
  },
  getReservations: (): TableReservation[] => {
    const data = ensureDbFile();
    return data.reservations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  createReservation: (res: TableReservation): TableReservation => {
    const data = ensureDbFile();
    data.reservations.unshift(res);
    saveDb(data);
    return res;
  },
};
