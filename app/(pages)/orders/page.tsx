"use client";
import SectionsHeaders from "@/app/components/layouts/SectionHeaders";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { OrderCartUser } from "@/app/types/index";
import useProfile from "@/app/components/useProfile";
import UserTabs from "@/app/components/layouts/UserTabs";
import { dbTimeForHuman } from "@/libs/Datetime";
import Link from "next/link";

const OrderPage = () => {
  const [orders, setOrders] = useState<OrderCartUser[] | []>([]);
  const { isAdmin } = useProfile();
  const [loadingOrders, setLoadingOrders] = useState(true);

  const getAllOrders = async () => {
    try {
      setLoadingOrders(true);
      const response = await axios.get("/api/orders");
      setOrders(response.data);
      setLoadingOrders(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  console.log(orders);

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={isAdmin} />

      <div className="mt-8">
        {loadingOrders && <div>Loading order...</div>}
        {orders.length > 0 &&
          orders.map((item) => (
            <div
              key={item._id}
              className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6"
            >
              <div className="grow flex flex-col md:flex-row items-center gap-6">
                <div>
                  <div
                    className={`${
                      item.paid ? "bg-green-500" : "bg-red-400"
                    } p-2 rounded-md text-white w-24 text-center`}
                  >
                    {item.paid ? "Paid" : "Not Paid"}
                  </div>
                </div>
                <div className="grow">
                  <div className="flex gap-2 items-center mb-1">
                    <div className="grow">{item.userEmail}</div>
                    <div className="text-gray-500 text-sm">
                      {dbTimeForHuman(item.createdAt)}
                    </div>
                  </div>

                  <div className="text-gray-500 text-sm">
                    {item.cartProducts.map((p) => p.name).join(", ")}
                  </div>
                </div>
              </div>
              <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                <Link href={`/orders/${item._id}`} className="button">
                  Show Order
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default OrderPage;
