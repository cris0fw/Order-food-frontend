import React, { useRef, useState } from "react";

import Image from "next/image";
import { MenuItemsProps, ExtraPrice } from "@/app/types/index";
import MenuItemsTitle from "./MenuItemTitle";
import { useCartPizza } from "@/app/hooks/useCart";

const MenuItems = (props: MenuItemsProps) => {
  const { menuItem } = props;
  const {
    _id,
    image,
    name,
    description,
    category,
    basePrice,
    sizes,
    extraIngredientPrices,
  } = menuItem;
  const [selectedSize, setSelectedSize] = useState<ExtraPrice | null>(
    sizes?.[0] || null
  );
  const [selectedExtra, setSelectedExtra] = useState<ExtraPrice[]>([]);
  const [showPoput, setShowPoput] = useState(false);
  const { addToCart } = useCartPizza();

  const pizzaAddToCart = () => {
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
    if (hasOptions && !showPoput) {
      setShowPoput(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtra);
    setShowPoput(false);

    setShowPoput(false);
  };

  const handleExtraThingClick = (
    ev: React.ChangeEvent<HTMLInputElement>,
    extraThing: ExtraPrice
  ) => {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtra((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtra((prev) =>
        prev.filter((e) => e.name !== extraThing.name)
      );
    }
  };

  let selectedPrice = basePrice;

  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtra?.length > 0) {
    for (const extra of selectedExtra) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {showPoput && (
        <div
          onClick={() => setShowPoput(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white p-4 rounded-lg max-w-md"
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: "calc(100vh - 100px)" }}
            >
              <Image
                src={image}
                alt={name}
                width={300}
                height={200}
                className="mx-auto"
              />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className="p-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {sizes.map((size) => (
                    <label
                      key={size._id}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        checked={selectedSize?.name === size.name}
                        onChange={() => setSelectedSize(size)}
                        type="radio"
                        name="size"
                      />
                      {size.name} ${basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}
              {extraIngredientPrices?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Any extras?</h3>

                  {extraIngredientPrices.map((extraThing) => (
                    <label
                      key={extraThing._id}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        onChange={(ev) => handleExtraThingClick(ev, extraThing)}
                        type="checkbox"
                        checked={selectedExtra
                          .map((e) => e._id)
                          .includes(extraThing._id)}
                        name={extraThing.name}
                      />
                      {extraThing.name} +${extraThing.price}
                    </label>
                  ))}
                </div>
              )}
              <button
                onClick={pizzaAddToCart}
                className="primary sticky bottom-2"
                type="button"
              >
                Add to cart {selectedPrice}
              </button>
              <button className="mt-2" onClick={() => setShowPoput(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <MenuItemsTitle item={menuItem} onSubmit={pizzaAddToCart} />
    </>
  );
};

export default MenuItems;
