import React from "react";
import { AddButtonCartProps } from "@/app/types/index";

const AddToCartButton = (props: AddButtonCartProps) => {
  const { hasSizesOrExtras, onClick, basePrice } = props;

  return (
    <button
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2"
      type="button"
    >
      {hasSizesOrExtras ? (
        <span>Add to Cart (from ${basePrice})</span>
      ) : (
        <span>Add to cart ${basePrice}</span>
      )}
    </button>
  );
};

export default AddToCartButton;
