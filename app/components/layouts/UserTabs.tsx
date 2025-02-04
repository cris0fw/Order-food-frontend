import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserTabsProps } from "@/app/types/index";

const UserTabs = ({ isAdmin }: UserTabsProps) => {
  const path = usePathname();

  return (
    <div className="flex mx-auto gap-2 tabs justify-center flex-wrap">
      <Link className={path === "/profile" ? "active" : ""} href="/profile">
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            href="/categories"
            className={path === "/categories" ? "active" : ""}
          >
            Categories
          </Link>
          <Link
            href="/menu-items"
            className={path.includes("menu-items") ? "active" : ""}
          >
            Menu items
          </Link>
          <Link
            href="/users"
            className={path.includes("/users") ? "active" : ""}
          >
            Users
          </Link>
        </>
      )}
      <Link className={path === "/orders" ? "active" : ""} href="/orders">
        Orders
      </Link>
    </div>
  );
};

export default UserTabs;
