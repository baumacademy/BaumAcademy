import React from "react";

interface ListItem {
  id: number;
  content: string;
  subject: string;
}

interface FancyListProps {
  items: ListItem[];
  onItemClick?: (id: number) => void;
}

const FancyList: React.FC<FancyListProps> = ({ items, onItemClick }) => {
  return (
    <ul className="flex flex-col items-start bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto my-10 min-w-fit">
      {items.map((item) => (
        <li
          key={item.id}
          className="p-4 flex justify-between items-center hover:bg-gray-100 cursor-pointer"
          onClick={() => onItemClick?.(item.id)}
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{item.subject}</h3>
            <p className="text-sm text-gray-500">{item.content}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FancyList;
