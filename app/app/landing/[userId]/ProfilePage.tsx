"use client";
import { apiURL } from "@/app/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export interface ProfileProps {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  occupation?: string;
  city?: string;
  gender?: string;
  batch?: string;
  class?: ClassType;
}
export type Props = {
  user?: ProfileProps;
};

type ClassResponseType = {
    classes : ClassType[]
}
type ClassType = {
  id?: string;
  subject?: string;
  content?: string;
};

const Profile: React.FC<Props> = ({ user }) => {
  const defaultUser = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    occupation: user?.occupation,
    city: user?.city,
    gender: user?.gender,
    batch: user?.batch,
    class: user?.class,
  };
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileProps>();
  const [classes, setClasses] = useState<ClassType[]>([]);

  useEffect(() => {
    setProfileData(defaultUser);
    const fetchClasses = async () => {
      const classes = await axios.get<ClassResponseType>(`${apiURL}/classes`);
      setClasses(classes.data.classes);
    };
    fetchClasses();
  }, [user]);

  // Handle input change for the editable fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "class") {
      const filteredClass = classes.find((cla) => cla.id == value);
      setProfileData((prevData) => ({
        ...prevData,
        class: {
          ...filteredClass,
        },
      }));
    } else {
      setProfileData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Toggle editing mode
  const toggleEditing = () => {
    if (isEditing) {
      setProfileData(defaultUser);
    }
    setIsEditing(!isEditing);
  };

  // Save changes and exit editing mode
  const saveChanges = async () => {
    // Logic to save changes, if needed (e.g., API call)
    await axios.patch(`${apiURL}/${user?.id}`, profileData);
    setIsEditing(false);
  };

  const navigateToCourses = () => {
    redirect("/courses");
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto my-10 min-w-fit">
      {/* Name and Bio */}
      {isEditing ? (
        <div className="flex flex-col items-center mt-4">
          <input
            type="text"
            name="firstName"
            value={profileData?.firstName}
            onChange={handleChange}
            className="text-2xl font-semibold text-gray-800 border-b border-gray-400 focus:outline-none text-center"
          />
          <input
            type="text"
            name="lastName"
            value={profileData?.lastName}
            onChange={handleChange}
            className="text-2xl font-semibold text-gray-800 border-b border-gray-400 focus:outline-none text-center"
          />
        </div>
      ) : (
        <>
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            {profileData?.firstName + " " + profileData?.lastName}
          </h2>
        </>
      )}

      {/* Additional Information */}
      <div className="mt-4 space-y-2 text-center">
        {isEditing ? (
          <>
            <input
              type="text"
              name="city"
              value={profileData?.city}
              onChange={handleChange}
              className="text-gray-600 text-center border-b border-gray-400 focus:outline-none w-full"
              placeholder="city"
            />
            <input
              type="email"
              name="email"
              value={profileData?.email}
              onChange={handleChange}
              className="text-gray-600 text-center border-b border-gray-400 focus:outline-none w-full"
              placeholder="Email"
            />
            <input
              type="text"
              name="gender"
              value={profileData?.gender}
              onChange={handleChange}
              className="text-gray-600 text-center border-b border-gray-400 focus:outline-none w-full"
              placeholder="Gender"
            />
            <input
              type="text"
              name="occupation"
              value={profileData?.occupation}
              onChange={handleChange}
              className="text-gray-600 text-center border-b border-gray-400 focus:outline-none w-full"
              placeholder="Occupation"
            />
            <input
              type="text"
              name="batch"
              value={profileData?.batch}
              onChange={handleChange}
              className="text-gray-600 text-center border-b border-gray-400 focus:outline-none w-full"
              placeholder="Batch #"
            />
          </>
        ) : (
          <>
            <p className="text-gray-600">
              <span className="font-semibold">Location:</span>{" "}
              {profileData?.city ?? "N/A"}
            </p>

            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> {profileData?.email}
            </p>

            <p className="text-gray-600">
              <span className="font-semibold">Gender:</span>{" "}
              {profileData?.gender ?? "N/A"}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Occupation:</span>{" "}
              {profileData?.occupation ?? "N/A"}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Batch #:</span>{" "}
              {profileData?.batch ?? "N/A"}
            </p>
          </>
        )}
        {isEditing ? (
          <>
            <div className="flex flex-col space-y-4 p-6 bg-gray-100 rounded-lg max-w-sm mx-auto">
              <p className="text-lg font-semibold">Select an Courses</p>
              {classes.map((cla) => (
                <label key={cla.id} className="flex items-center space-x-2">
                  <input
                    name="class"
                    type="radio"
                    value={cla.id}
                    checked={profileData?.class?.id === cla.id}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{cla.subject}</span>
                </label>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-600">
              <span className="font-semibold">Enrolled Course:</span>{" "}
              {profileData?.class?.subject}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Course Description:</span>{" "}
              {profileData?.class?.content}
            </p>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={saveChanges}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={toggleEditing}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={toggleEditing}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
          </>
        )}
      </div>
      <button
        onClick={navigateToCourses}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-10"
      >
        View Available Courses
      </button>
    </div>
  );
};

export default Profile;
