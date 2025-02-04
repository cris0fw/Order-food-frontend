"use client";
import UserTabs from "@/app/components/layouts/UserTabs";
import useProfile from "@/app/components/useProfile";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserTypes } from "@/app/types/index";

const UsersPage = () => {
  const { loading, isAdmin } = useProfile();
  const [users, setUsers] = useState([]);

  const allGetUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allGetUsers();
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  if (!isAdmin) {
    return "Not an admin";
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={true} />

      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user: UserTypes) => (
            <div
              key={user._id}
              className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                <div className="text-gray-900">
                  {!user.name && <span>{user.name}</span>}
                  {!user.name && <span className="italic">No name</span>}
                </div>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div>
                <Link href={`/users/${user._id}`} className="button">
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UsersPage;
