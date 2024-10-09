"use client";
import SectionsHeaders from "@/app/components/layouts/SectionHeaders";
import { useCartPizza } from "@/app/hooks/useCart";
import React, { useEffect, useState } from "react";
import { AddressInput } from "@/app/types/index";
import useProfile from "@/app/components/useProfile";
import AddressInputs from "@/app/components/layouts/AddressInputs";
import axios from "axios";
import toast from "react-hot-toast";
import CartProduct from "@/app/components/menu/CartProduct";

const CartPage = () => {
  const { items, cartProductPrice, removeToCart } = useCartPizza();
  const [address, setAddress] = useState<AddressInput>({
    phone: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    country: "",
  });
  const { userProfile } = useProfile();

  let subtotal = 0;
  for (const p of items) {
    subtotal += cartProductPrice(p);
  }

  const formattedSubtotal = subtotal.toFixed(2);
  const deliveryFee = 5;
  const total = (subtotal + deliveryFee).toFixed(2);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment Failed");
      }
    }
  }, []);

  useEffect(() => {
    if (userProfile?.city) {
      const { phone, postalCode, streetAddress, country, city } = userProfile;

      const addressFromProfile = {
        phone,
        postalCode,
        streetAddress,
        country,
        city,
      };

      setAddress(addressFromProfile);
    }
  }, [userProfile]);

  const handleAddressChange = (propName: string, value: string) => {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  };

  const proccedToCheckaut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/checkout", {
        address,
        items,
      });

      const link = response.data;
      window.location = link;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionsHeaders mainHeader="Cart" />
      </div>
      <div className="mt-4 grid gap-4 grid-cols-2">
        <div>
          {items?.length === 0 && <div>No products in your shopping cart</div>}
          {items?.length > 0 &&
            items.map((product) => (
              <CartProduct
                key={product._id}
                product={product}
                onRemove={removeToCart}
                onCartProductPrice={cartProductPrice}
              />
            ))}
          <div className="py-2 flex justify-end items-center text-right pr-16">
            {items.length > 0 && (
              <>
                <div className="text-gray-500">
                  Subtotal: <br />
                  Delivery <br />
                  Total:
                </div>
                <div className="text-lg font-semibold pl-2 text-right">
                  ${formattedSubtotal} <br />${deliveryFee.toFixed(2)} <br />$
                  {total}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proccedToCheckaut}>
            <AddressInputs
              disabled={false}
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay${formattedSubtotal}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
