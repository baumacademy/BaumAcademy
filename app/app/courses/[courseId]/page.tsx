"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "@/app/utils";
import { redirect, useParams } from "next/navigation";
import { useLocalStorage } from "../../LocalStorageContextProvider";
interface ListItem {
  id: number;
  content: string;
  subject: string;
}
const CoursesPage = () => {
  const { courseId } = useParams();
  const [query, setQuery] = useState<string>("");
  const [classes, setClasses] = useState<ListItem[]>([]);
  const [filteredData, setFilteredData] = useState<ListItem[]>([]);
  const [selected, setSelected] = useState(courseId)
  const { state: userId } = useLocalStorage();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get<{ classes: ListItem[]; }>(`${apiURL}/classes`);
      setClasses(response.data.classes);
      setFilteredData(response.data.classes)
    };
    fetchUser();
  }, []);

  const handleEnrollCourse = async () => {
    await axios.patch(`${apiURL}/${userId}/course`, { classId: selected })
    redirect(`/profile/${userId}`)
  }


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);

    const filtered = classes.filter(
      (item) =>
        item.subject.toLowerCase().includes(searchTerm) ||
        item.content.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filtered);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 pt-12 flex-col">
      <h1 className="items-center bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto min-w-fit">Courses</h1>

      <div>
        <div className="flex flex-col items-start bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto my-2 min-w-fit">
          <h1 className="text-2xl font-bold mb-4 text-center">Search Items</h1>
          <input
            type="text"
            placeholder="Search by name or description..."
            value={query}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <ul className="flex flex-col items-start bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto my-2 min-w-fit">
          {filteredData?.map((item) => {
            const isSelected = String(item.id) === selected; // Check if item is selected
            const isEnrolled = String(item.id) === courseId; // Check if item is selected
            return (
              <li
                key={item.id}
                className={`p-4 flex justify-between items-center cursor-pointer w-full rounded-md transition ${isSelected ? "bg-blue-100 text-blue-800 font-semibold" : "hover:bg-gray-200"
                  }`}
                onClick={() => setSelected(String(item.id))}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.subject}</h3>
                  <p className="text-sm text-gray-500">{item.content}</p>
                </div>
                {/* Checkmark for selected item */}
                {isEnrolled && (
                  <span className="text-blue-500">
                    ✅
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="flex items-center max-w-lg mx-auto min-w-fit space-x-4">

        {selected !== courseId && <button onClick={handleEnrollCourse} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mx-auto min-w-fit">Enroll Course</button>}
        <button onClick={() => {
          redirect(`/profile/${userId}`)
        }} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mx-auto min-w-fit">Go Back</button>
      </div>
    </div>
  );
};

export default CoursesPage;
