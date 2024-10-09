import axios from "axios";
import { useEffect, useState } from "react";
import { UserProfile } from "@/app/types/index";

//Aca es donde voy a manejar si el usuario es admin o no
const useProfile = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const getAdminProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get<UserProfile>("/api/profile");

      setIsAdmin(response?.data.admin);
      setUserProfile(response?.data);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getAdminProfile();
  }, []);

  return { loading, isAdmin, userProfile };
};

export default useProfile;
