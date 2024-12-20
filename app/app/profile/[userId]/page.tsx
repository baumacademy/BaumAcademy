"use client";
import React, { useEffect, useState } from "react";
import Profile, { ProfileProps } from "./ProfilePage";
import axios from "axios";
import { redirect, useParams } from "next/navigation";
import { apiURL } from "@/app/utils";
import { useLocalStorage } from "@/app/LocalStorageContextProvider";

const LandingPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<ProfileProps>();
  const { state } = useLocalStorage();
  const isMyProfile = state == userId
  useEffect(() => {
    if(!state){
      redirect('/')
    }
    const fetchUser = async () => {
      const response = await axios.get<{ user: ProfileProps }>(
        `${apiURL}/${userId}`
      );
      setUser(response.data.user);
    };
    fetchUser();
  }, [userId, state]);

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 pt-12">
      <Profile user={user} isMyProfile={isMyProfile} />
    </div>
  );
};

export default LandingPage;
