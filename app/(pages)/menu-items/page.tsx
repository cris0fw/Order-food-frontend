"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import Image from "next/image";
import { BestSellersType } from "@/app/types/index";
import UserTabs from "@/app/components/layouts/UserTabs";
import useProfile from "@/app/components/useProfile";

const page = () => {
  const { loading, isAdmin } = useProfile();
  const [menuItems, setMenuItems] = useState<BestSellersType[]>([]);

  const getAllMenuItems = async () => {
    try {
      const response = await axios.get("/api/menu-items");
      setMenuItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMenuItems();
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  if (!isAdmin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />

      <div className="mt-8">
        <Link className="button flex" href={"/menu-items/new"}>
          <span>Create new menu items</span>
          <FaArrowRight />
        </Link>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mt-8">
          Edit Menu Item:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                key={item._id}
                href={`/menu-items/edit/${item._id}`}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-4"
              >
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={`Image of ${item.name}`}
                    width={300}
                    height={200}
                    className="rounded-t-lg object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>

                  <p className="mt-4 text-lg font-bold text-red-500">
                    ${item.basePrice}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default page;
