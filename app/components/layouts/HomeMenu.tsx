"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BestSellersType } from "@/app/types/index";
import SectionsHeaders from "./SectionHeaders";
import MenuItems from "../menu/MenuItems";

const HomeMenu = () => {
  const [bestSellers, setBestSellers] = useState([]);

  const allGetItemsMenu = async () => {
    try {
      const response = await axios.get("/api/menu-items");

      const pizzas = response.data.slice(0, 3);
      setBestSellers(pizzas);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allGetItemsMenu();
  }, []);

  return (
    <section className="">
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image src="/sallad1.png" width={109} height={189} alt="sallad1" />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image src="/sallad2.png" width={107} height={195} alt="sallad2" />
        </div>
      </div>
      <div className="text-center mb-4">
        <SectionsHeaders subHeader="check out" mainHeader="Menu" />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {bestSellers?.length > 0 &&
          bestSellers.map((item: BestSellersType) => (
            <MenuItems key={item._id} menuItem={item} />
          ))}
      </div>
    </section>
  );
};

export default HomeMenu;
