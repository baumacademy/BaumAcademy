
'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiURL } from "../utils";
import { redirect } from "next/navigation";
import { useLocalStorage } from "../LocalStorageContextProvider";

// Define the type for a student
interface Student     {
    id: number,
    firstName: string,
    lastName: string,
    occupation: string,
    city: string,
    class: {
        id: number,
        subject: string,
        content: string
    }
}


const StudentTable = () => {
    const {state} = useLocalStorage()
    const [students, setStudents] = useState<Student[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
          const response = await axios.get<Student[]>(
            `${apiURL}`
          );
          setStudents(response.data);
        };
        fetchUsers();
      }, []);

      function capitalizeFirstLetter(str: string) {
        if (!str) return ""; // Handle empty or null strings
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pt-12">
        <div className="flex items-center max-w-lg mx-auto min-w-fit space-x-4">
                <button onClick={() => {
                    redirect(`/profile/${state}`)
                }} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mx-auto min-w-fit">Go Back To Profile Page</button>
            </div>
    <div className="container mx-auto mt-5">
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Student ID</th>
              <th className="py-3 px-6 text-left">First Name</th>
              <th className="py-3 px-6 text-left">Last Name</th>
              <th className="py-3 px-6 text-left">Occupation</th>
              <th className="py-3 px-6 text-left">City</th>
              <th className="py-3 px-6 text-left">Enrolled Course</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {students?.length > 0 ? (
              students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {student.id}
                  </td>
                  <td className="py-3 px-6 text-left">{capitalizeFirstLetter(student.firstName)}</td>
                  <td className="py-3 px-6 text-left">{capitalizeFirstLetter(student.lastName)}</td>
                  <td className="py-3 px-6 text-left">{capitalizeFirstLetter(student.occupation)}</td>
                  <td className="py-3 px-6 text-left">{capitalizeFirstLetter(student.city)}</td>
                  <td className="py-3 px-6 text-left">{capitalizeFirstLetter(student.class?.subject)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-4 text-gray-500 font-medium"
                >
                  No students available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>

  );
};

export default StudentTable;
