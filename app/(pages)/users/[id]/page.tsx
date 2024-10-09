"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserProfile } from "@/app/types/index";
import useProfile from "@/app/components/useProfile";
import UserTabs from "@/app/components/layouts/UserTabs";
import UseForm from "@/app/components/layouts/UseForm";

const EditUserPage = () => {
  const { loading, isAdmin } = useProfile();
  const { id } = useParams();
  const [userUser, setUserUser] = useState<UserProfile | null>(null);

  const getOneProfile = async () => {
    try {
      const response = await axios.get(`/api/profile?id=${id}`);

      if (response.data && response.status === 200) {
        setUserUser(response.data);
      } else {
        <p>No hay datos para este perfil</p>;
      }
    } catch (error) {
      console.log();
    }
  };

  console.log(userUser);

  useEffect(() => {
    if (id) {
      getOneProfile();
    }
  }, [id]);

  const handleSaveButtonClick = async (
    ev: React.FormEvent<HTMLFormElement>,
    data: UserProfile
  ) => {
    ev.preventDefault();

    try {
      await axios.put("/api/profile", {
        ...data,
        _id: id,
      });
      getOneProfile();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return "Loading user profile...";
  }

  if (!isAdmin) {
    return "Not an admin";
  }
  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <UseForm user={userUser} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
};

export default EditUserPage;
