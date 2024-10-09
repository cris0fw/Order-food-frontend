import React from "react";
import { CartProductProps } from "@/app/types/index";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";

const CartProduct = (props: CartProductProps) => {
  const { product, onRemove, onCartProductPrice } = props;

  return (
    <div className="flex items-center gap-4 border-b py-2">
      <div className="w-24">
        <Image width={240} height={240} src={product.image} alt="" />
      </div>
      <div className="grow">
        <h3 className="font-semibold">{product.name}</h3>
        {product.sizes && (
          <div className="text-sm">
            Size: <span>{product.sizes[0].name}</span>
          </div>
        )}
        {product.extraIngredientPrices?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extraIngredientPrices.map((extra) => (
              <div>
                {extra.name} ${extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">
        ${onCartProductPrice ? onCartProductPrice(product) : 0}
      </div>
      {!!onRemove && (
        <div className="ml-2">
          <button
            className="p-2"
            type="button"
            onClick={() => product._id && onRemove && onRemove(product._id)}
          >
            <FaRegTrashAlt />
          </button>
        </div>
      )}
    </div>
  );
};

export default CartProduct;
