"use client";
import DeleteButton from "@/app/components/layouts/DeleteButton";
import MenuItemForm from "@/app/components/layouts/MenuItemsForm";
import UserTabs from "@/app/components/layouts/UserTabs";
import useProfile from "@/app/components/useProfile";
import axios from "axios";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { BestSellersType } from "@/app/types/index";

const page = () => {
  const { loading, isAdmin } = useProfile();
  const [menuItem, setMenuItem] = useState<BestSellersType | null>(null);

  const [redirectToPage, setRedirectToPage] = useState(false);

  const params = useParams() as { id: string };
  const { id } = params;

  const getAllMenuItems = async () => {
    try {
      const response = await axios.get("/api/menu-items");

      const data = response.data.find((item: BestSellersType) => {
        return item._id === id;
      });

      setMenuItem(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMenuItems();
  }, []);

  const handleMenuItemsSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    formData: BestSellersType
  ) => {
    e.preventDefault();
    formData = { ...formData, _id: id };

    try {
      const savingPromise = axios.put("/api/menu-items", formData);

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

  const handleDeleteClick = async () => {
    try {
      const deleteMenuItem = axios.delete(`/api/menu-items?_id=${id}`);

      await toast.promise(deleteMenuItem, {
        loading: "Deleting",
        success: "Deleted",
        error: "Error deleted",
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

      <MenuItemForm menuItem={menuItem} onSubmit={handleMenuItemsSubmit} />
      <div className="max-w-md mx-auto mt-4">
        <DeleteButton
          label="Delete this menu item"
          onDelete={handleDeleteClick}
        />
      </div>
    </section>
  );
};

export default page;
