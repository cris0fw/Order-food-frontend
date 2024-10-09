"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { UserProfile } from "@/app/types/index";
import UserTabs from "@/app/components/layouts/UserTabs";
import UseForm from "@/app/components/layouts/UseForm";

const pageProfile = () => {
  const { data: session, status } = useSession();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  const getAllProfile = async () => {
    try {
      const response = await axios.get("/api/profile");
      setUser(response?.data);
      setIsAdmin(response.data?.admin);
      setProfileFetched(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      getAllProfile();
    }
  }, [session, status]);

  const handleProfileInfoUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    formData: UserProfile
  ) => {
    try {
      e.preventDefault();
      const { image, name, phone, streetAddress, city, country, postalCode } =
        formData;

      const response = axios.put("/api/profile", {
        name,
        image,
        phone,
        country,
        streetAddress,
        postalCode,
        city,
      });

      await toast.promise(response, {
        loading: "Loading data profile",
        success: "Profile user updated",
        error: "Error user profile",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />

      <div className="max-w-2xl mx-auto mt-8">
        <UseForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
};

export default pageProfile;
