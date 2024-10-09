"use client";
import AddressInputs from "@/app/components/layouts/AddressInputs";
import SectionsHeaders from "@/app/components/layouts/SectionHeaders";
import { useCartPizza } from "@/app/hooks/useCart";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { OrderCartUser } from "@/app/types/index";
import CartProduct from "@/app/components/menu/CartProduct";

const OrderPage = () => {
  const { clearToCart } = useCartPizza();
  const { id } = useParams();
  const [order, setOrders] = useState<OrderCartUser>();
  const { cartProductPrice } = useCartPizza();
  const [loadingOrders, setLoadingOrders] = useState(true);

  const getOrder = async () => {
    try {
      setLoadingOrders(true);
      const response = await axios.get(`/api/orders?_id=${id}`);
      setOrders(response.data);
      setLoadingOrders(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearToCart();
      }
    }
    getOrder();
  }, []);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  return (
    <section className="max-w-2xl mx-auto text-center mt-8">
      <div className="text-center">
        <SectionsHeaders mainHeader="Your order" />
        <div className="mt-4 mb-8">
          <p>Thanks for your order</p>
          <p>We will call you when your order will be on the way</p>
        </div>
      </div>
      {loadingOrders && <div>Loading order...</div>}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map((item) => (
              <CartProduct
                key={item._id}
                product={item}
                onCartProductPrice={null}
                onRemove={null}
              />
            ))}
            <div className="text-right py-2 text-gray-500">
              Subtotal:
              <span className="text-black font-bold inline-block w-8">
                ${subtotal}
              </span>
              <br />
              Delivery:
              <span className="text-black font-bold inline-block w-8">$5</span>
              <br />
              Total:
              <span className="text-black font-bold inline-block w-8">
                ${subtotal + 5}
              </span>
              <br />
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs
                addressProps={order}
                setAddressProps={() => null}
                disabled={true}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderPage;
