"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "@/app/utils";
import FancyList from "./FancyList";
import {  redirect } from "next/navigation";
import { useLocalStorage } from "../LocalStorageContextProvider";

const CoursesPage = () => {
  const [classes, setClasses] = useState([]);
  const { state : userId} = useLocalStorage();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get<{ classes: any }>(`${apiURL}/classes`);
      setClasses(response.data.classes);
    };
    fetchUser();
  }, []);

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 pt-12 flex-col">
      <h1 className="items-center bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto min-w-fit">Courses</h1>
      <FancyList items={classes} />
      <button onClick={() => {
        redirect(`/landing/${userId}`)
      }} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mx-auto min-w-fit">Go Back</button>
    </div>
  );
};

export default CoursesPage;
