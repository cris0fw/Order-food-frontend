"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BestSellersType, GetAllCategories } from "@/app/types/index";
import MenuItems from "@/app/components/menu/MenuItems";
import SectionsHeaders from "@/app/components/layouts/SectionHeaders";

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const getAllCategories = async () => {
    try {
      const response = await axios.get("/api/categories");

      setCategories(response.data);
    } catch (error) {
      console.log();
    }
  };

  const getAllMenuItems = async () => {
    try {
      const response = await axios.get("/api/menu-items");
      setMenuItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllMenuItems();
  }, []);

  return (
    <div className="mt-8">
      {categories.length > 0 &&
        categories.map((category: GetAllCategories) => (
          <div key={category._id}>
            <div className="text-center">
              <SectionsHeaders mainHeader={category.name} />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
              {menuItems
                .filter(
                  (menuItem: BestSellersType) =>
                    menuItem.category === category._id
                )
                .map((item: BestSellersType) => (
                  <MenuItems key={item._id} menuItem={item} />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default MenuPage;
