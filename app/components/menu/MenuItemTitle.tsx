import React from "react";
import { MenuItemsTileProps } from "@/app/types/index";
import AddToCartButton from "../layouts/AddToCartButton";

const MenuItemsTitle = (props: MenuItemsTileProps) => {
  const { item, onSubmit } = props;
  const { image, description, name, basePrice, sizes, extraIngredientPrices } =
    item;

  const hasSizesOrExtras = sizes.length > 0 || extraIngredientPrices.length > 0;

  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        <img
          src={item.image}
          className="max-h-auto max-h-24 block mx-auto"
          alt="pizza"
        />
      </div>
      <h4 className="font-semibold text-xl my-3">{item.name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{item.description}</p>

      <AddToCartButton
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onSubmit}
        basePrice={basePrice}
      />
    </div>
  );
};

export default MenuItemsTitle;
