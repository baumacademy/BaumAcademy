"use client";
import React, { useEffect, useState } from "react";
import Profile, { ProfileProps } from "./ProfilePage";
import axios from "axios";
import { useParams } from "next/navigation";
import { apiURL } from "@/app/utils";

const CoursesPage = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get<{ classes: any }>(`${apiURL}/classes`);
      setClasses(response.data.classes);
    };
    fetchUser();
  }, []);

  console.log("courses", classes);
  return (
    <div className="flex justify-center min-h-screen bg-gray-100 pt-12">
      Courses
    </div>
  );
};

export default CoursesPage;
