import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PizzaCartType, BestSellersType } from "@/app/types/index";

export const useCartPizza = create(
  persist<PizzaCartType>(
    (set, get) => ({
      items: [],

      addToCart: (product, size = null, extras = []) => {
        const currentItem = get().items;

        const existingItem = currentItem.find(
          (item) => item._id === product._id
        );

        if (existingItem) {
          return toast.error("El elemento ya existe en el carrito");
        }

        const cartProduct = { ...product, size, extras };

        set({
          items: [...get().items, cartProduct],
        });

        toast.success("Agregado al carrito");
      },
      removeToCart: (id) => {
        set({
          items: [...get().items.filter((items) => items._id !== id)],
        });
        toast.success("Product Pizza deleted");
      },
      clearToCart: () => {
        set({ items: [] });
      },
      cartProductPrice: (cartProduct) => {
        let price = cartProduct.basePrice;
        if (cartProduct.sizes) {
          price += cartProduct.sizes[0].price;
        }
        if (cartProduct.extraIngredientPrices?.length > 0) {
          for (const extra of cartProduct.extraIngredientPrices) {
            price += extra.price;
          }
        }
        return price;
      },
    }),
    {
      name: "loved-products-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
