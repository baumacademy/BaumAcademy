"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "@/app/utils";
import { redirect, useSearchParams } from "next/navigation";
import { useLocalStorage } from "../LocalStorageContextProvider";
interface ListItem {
    id: number
    city: string
    lastName: string
    firstName: string
    occupation: string
}
const CoursesPage = () => {
    const searchParams = useSearchParams();
    const classId = searchParams.get('classId');
    const [query, setQuery] = useState<string>("");
    const [classMates, setClassMates] = useState<ListItem[]>([]);
    const [filteredData, setFilteredData] = useState<ListItem[]>([]);
    const { state: userId } = useLocalStorage();
    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get<{ classMates: ListItem[]; }>(`${apiURL}/classes/${classId}`);
            setClassMates(response.data.classMates);
            setFilteredData(response.data.classMates)
        };
        fetchUser();
    }, [classId]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        setQuery(searchTerm);

        const filtered = classMates.filter(
            (item) =>
                item.firstName.toLowerCase().includes(searchTerm) ||
                item.lastName.toLowerCase().includes(searchTerm) ||
                item.occupation.toLowerCase().includes(searchTerm) ||
                item.city.toLowerCase().includes(searchTerm)
        );

        setFilteredData(filtered);
    };

    return (
        <div className="flex min-h-screen bg-gray-100 pt-12 flex-col">
            <h1 className="items-center bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto min-w-fit mb-4">Classmates</h1>
            <div>
                <div className="flex flex-col items-start bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto my-10 min-w-fit">
                    <h1 className="text-2xl font-bold mb-4 text-center">Search Items</h1>
                    <input
                        type="text"
                        placeholder="Search by name or description..."
                        value={query}
                        onChange={handleSearch}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <ul className="flex flex-col items-start bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto my-10 min-w-fit">
                    {filteredData.map((item) => {
                        return (
                            <li
                                key={item.id}
                                className={`p-4 flex justify-between items-center cursor-pointer w-full rounded-md transition flex`}
                            >
                                <div className="flex flex-grow justify-between">
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-900">{item.firstName + " " + item.lastName}</h3>
                                    <p className="text-sm text-gray-500"><strong>occupation</strong> : {item.occupation}</p>
                                    <p className="text-sm text-gray-500"><strong>location</strong> : {item.city}</p>
                                </div>
                                <button onClick={() => {
                    redirect(`/profile/${item.id}`)
                }} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mx-auto min-w-fit">View Profile</button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="flex items-center max-w-lg mx-auto min-w-fit space-x-4">
                <button onClick={() => {
                    redirect(`/profile/${userId}`)
                }} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mx-auto min-w-fit">Go Back</button>
            </div>
        </div>
    );
};

export default CoursesPage;
