"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { redirect } from "next/navigation";
import UserTabs from "@/app/components/layouts/UserTabs";
import useProfile from "@/app/components/useProfile";
import { BestSellersType } from "@/app/types/index";
import MenuItemForm from "@/app/components/layouts/MenuItemsForm";

const NewMenuItemPage = () => {
  const { loading, isAdmin } = useProfile();

  const [redirectToPage, setRedirectToPage] = useState(false);

  const handleMenuItemsSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    formData: BestSellersType
  ) => {
    e.preventDefault();
    try {
      const savingPromise = axios.post("/api/menu-items", formData);

      await toast.promise(savingPromise, {
        loading: "Loading menu items",
        success: "Created menu items",
        error: "ups error",
      });

      setRedirectToPage(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirectToPage) {
    return redirect("/menu-items");
  }

  if (loading) {
    return "Loading user info";
  }

  if (!isAdmin) {
    return "Not an Admin...";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />

      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <FaArrowLeft />
          <span>Show All menu items</span>
        </Link>
      </div>

      <MenuItemForm menuItem={null} onSubmit={handleMenuItemsSubmit} />
    </section>
  );
};

export default NewMenuItemPage;
