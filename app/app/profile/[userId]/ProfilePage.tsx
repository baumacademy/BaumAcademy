"use client";
import { apiURL } from "@/app/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useLocalStorage } from "@/app/LocalStorageContextProvider";

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
  isMyProfile?: boolean
};

type ClassResponseType = {
  classes: ClassType[];
};
type ClassType = {
  id?: string;
  subject?: string;
  content?: string;
};

const Profile: React.FC<Props> = ({ user, isMyProfile }) => {
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
  const [error, setError] = useState("")
  const { removeItem } = useLocalStorage();

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
    setError('')
    if (!["male", "female"].includes(profileData!.gender!.toLocaleLowerCase())) {
      setError("Gender can be either Male or Female")
    } else {
      // Logic to save changes, if needed (e.g., API call)
      const result = await axios.patch(`${apiURL}/${user?.id}`, {...profileData, city: "bug city"});
      if (!result.data.success) {
        setError(result.data.message)
      } else {
        setIsEditing(false);
      }
    }

  };

  const navigateToCourses = () => {
    redirect(`/courses/${profileData?.class?.id}`);
  };

  const navigateToClassmates = () => {
    redirect(`/classmates?classId=${profileData?.class?.id}`);
  };

  const navigateToAllStudents = () => {
    redirect(`/students`);
  };

  const onLogOut = () => {
    // localStorage.removeItem('userId')
    removeItem();
    redirect("/");
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto my-10 min-w-full">
      {/* Name and Bio */}
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        {profileData?.firstName + " " + profileData?.lastName}
      </h2>

      {/* Additional Information */}
      <div className="mt-4 space-y-2 text-start flex-col flex">
        <p className="text-gray-600">
          <span className="font-semibold">Email:</span> {profileData?.email}
        </p>
        {isEditing ? (
          <>
            <label className="w-full flex justify-between">
              Location:
              <input
                type="text"
                name="city"
                data-testid="profile-city"
                value={profileData?.city}
                onChange={handleChange}
                className="text-gray-600 text-center border-b border-gray-400 focus:outline-none"
                placeholder="city"
              />
            </label>
            <label className="w-full flex justify-between">
              Gender:
              <input
                type="text"
                name="gender"
                data-testid="profile-gender"
                value={profileData?.gender}
                onChange={handleChange}
                className="text-gray-600 text-center border-b border-gray-400 focus:outline-none"
                placeholder="Gender"
              />
            </label>
            <label className="w-full flex justify-between">
              Occupation:
              <input
                type="text"
                name="occupation"
                data-testid="profile-occupation"
                value={profileData?.occupation}
                onChange={handleChange}
                className="text-gray-600 text-center border-b border-gray-400 focus:outline-none"
                placeholder="Occupation"
              />
            </label>
            <label className="w-full flex justify-between">
              Batch #:
              <input
                type="text"
                name="batch"
                data-testid="profile-batch"
                value={profileData?.batch}
                onChange={handleChange}
                className="text-gray-600 text-center border-b border-gray-400 focus:outline-none"
                placeholder="Batch #"
              />
            </label>
          </>
        ) : (
          <>
            <p className="text-gray-600">
              <span className="font-semibold">Location:</span>{" "}
              {profileData?.city ?? "N/A"}
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
        {error && <div
          className={`flex items-start p-4 rounded-lg border-l-4 shadow-md max-w-lg mx-auto text-red-600`}
        >
          {/* Message */}
          <div className="flex-1">
            <p className="text-sm leading-tight">{error}</p>
          </div>
        </div>}
        {isEditing ? (
          <>
            <div className="flex flex-col space-y-4 p-6 bg-gray-100 rounded-lg max-w-sm mx-auto">
              <p className="text-lg font-semibold">Select an Courses</p>
              {classes.map((cla, idx) => (
                <label key={cla.id} className="flex items-center space-x-2">
                  <input
                    data-testid={`profile-radio-${idx}`}
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
      <div className="flex flex-col items-center">
        {isMyProfile ? <div className="mt-6 flex space-x-4">
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
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={onLogOut}
              >
                Log out
              </button>
            </>
          )}
        </div> : <div className="mt-6 flex space-x-4">
            <>
              <button
                onClick={navigateToClassmates}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Go Back
              </button>
            </>
        </div>}
        {isMyProfile && <>
          {!isEditing && <button
          onClick={navigateToCourses}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-6"
        >
          View Available Courses
        </button>}
        {!isEditing && <button
          onClick={navigateToClassmates}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-6"
        >
          View Classmates
        </button>}
        {!isEditing && <button
          onClick={navigateToAllStudents}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-6"
        >
          View All Students
        </button>}
        </>}
      </div>
    </div>
  );
};

export default Profile;
