import { Session } from "next-auth";
import React, { SetStateAction } from "react";

//USADO EN...
//HomeMenu.tsx (components)
//MenuItems.tsx (PAGE app/menu-items)
//newMenuItems.tsx (PAGE app/menu-items/new)
//editMenuItems.tsx (PAGE app/menu-items/edit/[id])
export interface BestSellersType {
  _id?: string;
  image: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  sizes: ExtraPrice[];
  extraIngredientPrices: ExtraPrice[];
}

//Utilizado en interface BestSellersType
export interface ExtraPrice {
  _id: string;
  name: string;
  price: number;
}

//SECCION SectionHeaders.tsx
export interface SectionHeadersProps {
  subHeader?: string;
  mainHeader?: string;
}

//SECCION MenuItems.tsx
export interface MenuItemsProps {
  menuItem: {
    _id?: string;
    image: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    sizes: ExtraPrice[];
    extraIngredientPrices: ExtraPrice[];
  };
}

export interface MenuItemsTypes {
  _id?: string;
  image: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  sizes: ExtraPrice[];
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
  extraIngredientPrices: ExtraPrice[];
  createdAt: string;
  updatedAt: string;
}

//SECCION MenuItemTitle.tsx
export interface MenuItemsTileProps {
  item: {
    _id?: string;
    image: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    sizes: ExtraPrice[];
    extraIngredientPrices: ExtraPrice[];
  };
  onSubmit: () => void;
}

//SECCION Headers.tsx
export interface AppContextProps {
  children: React.ReactNode;
  session: Session | null;
}

//SECCION Profile/page.tsx (PROFILE)
//SECCION Components/useProfile.tsx
export interface UserProfile {
  _id?: string;
  email?: string;
  image: string;
  name: string;
  phone: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  admin: boolean;
}

export interface AddressInput {
  phone: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
}

//SECCION components/layouts/UserTabs.tsx
export interface UserTabsProps {
  isAdmin: boolean;
}

//SECCION components/layouts/UseForm.tsx
//Usa la itnerface UserProfile
export interface UseFormProps {
  user: UserProfile | null;
  onSave: (e: React.FormEvent<HTMLFormElement>, formValue: UserProfile) => void;
}

//SECCION components/layouts/EditableImage.tsx
export interface EditableImageProps {
  link: string;
  setLink: React.Dispatch<SetStateAction<string>>;
}

//SECCION (pages)/categories/page.tsx CategoryPage
export interface EditedCategory {
  _id?: string;
  name: string | null;
}

export interface GetAllCategories {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

//SECCION components/layouts/DeleteButton.tsx (PARTE DE BORRAR CATEGORIAS)
export interface DeleteButtonProps {
  label: string;
  onDelete: (id?: string) => void;
}

//SECCION components/MenuItemsForm.tsx
export interface MenuItemFormProps {
  menuItem?: BestSellersType | null;
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    formValues: BestSellersType
  ) => void;
}

//SECCION components/MenuItemsPriceProps.tsx
export interface MenuItemsPriceProp {
  sized: ExtraPrice[];
  setSized: React.Dispatch<React.SetStateAction<ExtraPrice[]>>;
  name: string;
  addLabel: string;
}

//SECCION Users.tsx (PAGE app/users)
export interface UserTypes {
  _id: string;
  name: string;
  email: string;
  password?: string;
  image: string;
}

//SECCION useCart.tsx (HOOK ZUSTAND)
export interface PizzaCartType {
  items: BestSellersType[];
  addToCart: (
    product: BestSellersType,
    size?: ExtraPrice | null,
    extras?: ExtraPrice[] | []
  ) => void;
  removeToCart: (id: string) => void;
  clearToCart: () => void;
  cartProductPrice: (cartProduct: BestSellersType) => number;
}

//SECCION AddressInputs.tsx
export interface AddressInputsProps {
  addressProps: AddressInput;
  setAddressProps: (key: keyof AddressInput, value: string) => void;
  disabled: boolean;
}

//SECCION AddToCartButton (Components)
export interface AddButtonCartProps {
  hasSizesOrExtras: boolean;
  onClick: () => void;
  basePrice: number;
}

//SECCION CartProduct.tsx
export interface CartProductProps {
  product: BestSellersType;
  onRemove: ((id: string) => void) | null;
  onCartProductPrice: ((product: BestSellersType) => number) | null;
}

export interface OrderCartUser {
  _id?: string;
  cartProducts: MenuItemsTypes[];
  city: string;
  country: string;
  phone: string;
  postalCode: string;
  streetAddress: string;
  userEmail: string;
  paid: boolean;
  createdAt: string;
  updatedAt: string;
}
