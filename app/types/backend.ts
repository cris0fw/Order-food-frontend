// API/REGISTER/
export interface Register {
  name: string;
  email: string;
  password: string;
}

//API/LOGIN
export interface Login {
  email: string;
  password: string;
}

//API/PROFILE (PUT)
export interface UserProfile {
  _id?: string;
  phone: string;
  email?: string;
  image: string;
  name: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  admin?: boolean;
}

interface AddressInfoUser {
  phone: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
}

//API/CATEGORIES (POST)
//API/CATEGORIES (PUT)
export interface CategoriesGet {
  _id?: string;
  name: string;
}

//API/MENU-ITEMS (GET)
export interface MenuItemsTypes {
  _id?: string;
  image: string;
  name: string;
  description: string;
  category: string;
  basePrice: string;
  sizes: ExtraPriceIngredients[];
  size: {
    _id: string;
    name: string;
    price: number;
  };
  extras: {
    _id: string;
    name: string;
    price: number;
  }[];
  extraIngredientPrices: ExtraPriceIngredients[];
  createdAt: string;
  updatedAt: string;
}

export interface ExtraPriceIngredients {
  name: string;
  price: number;
}

export interface ExtraPrice {
  _id: string;
  name: string;
  price: number;
}

//API/USERS (GET)
export interface UserTypes {
  _id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface LineItem {
  price_data: {
    currency: string;
    product_data: {
      name: string;
    };
    unit_amount: number;
  };
  quantity: number;
}

//API/CHECKOUT (POST)
export interface InfoCheckout {
  address: AddressInfoUser;
  items: MenuItemsTypes[];
}

//API/ORDERS (GET)
export interface OrdersType {
  _id: string;
  userEmail: string;
  phone: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  cartProduct: MenuItemsTypes[];
  paid: boolean;
  createdAt: string;
  updateAt: string;
}
