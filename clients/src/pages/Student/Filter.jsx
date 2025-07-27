import React, { useState } from "react";

const categories = [
  { id: "Next Js", label: "Next Js" },
  { id: "Data Science", label: "Data Science" },
  { id: "Frontend Development", label: "Frontend Development" },
  { id: "Fullstack Development", label: "Fullstack Development" },
  { id: "MERN Stack Development", label: "MERN Stack Development" },
  { id: "Backend Development", label: "Backend Development" },
  { id: "JavaScript", label: "JavaScript" },
  { id: "Python", label: "Python" },
  { id: "Docker", label: "Docker" },
  { id: "MongoDB", label: "MongoDB" },
  { id: "HTML", label: "HTML" },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [sortByLevel, setSortByLevel] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];

      handleFilterChange(newCategories, sortByPrice, sortByLevel);

      return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue, sortByLevel);
  };
  const selectByLevelHandler = (selectedValue) => {
    setSortByLevel(selectedValue);
    handleFilterChange(selectedCategories, sortByPrice, selectedValue);
  };

  return (
    <div className="w-full md:w-[30%]">
      <div className="flex items-center justify-between gap-3">
        <label className="text-nowrap text-lg font-semibold" htmlFor="category">
          Filter Option
        </label>
        <select
          id="priceSort"
          name="priceSort"
          value={sortByPrice}
          onChange={(e) => selectByPriceHandler(e.target.value)}
          className="border px-4 py-2 rounded-md w-full"
        >
          <option value="">Sort by Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>
      <div className="flex items-center justify-between gap-3 mt-5">
        <label className="text-nowrap text-lg font-semibold" htmlFor="category">
          Course Level
        </label>
        <select
          id="levelSort"
          name="levelSort"
          value={sortByLevel}
          onChange={(e) => selectByLevelHandler(e.target.value)}
          className="border px-4 py-2 rounded-md w-full"
        >
          <option value="">Sort by Level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      <div>
        <h1 className="mt-4 font-bold">CATEGORY</h1>
        {categories?.map((category) => (
          <div key={category.id} className="flex items-center space-x-2 my-2">
            <input
              id={category.id}
              type="checkbox"
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryChange(category.id)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
            />
            <label
              htmlFor={category.id}
              className="ms-2 text-md font-semibold text-primary dark:text-gray-300"
            >
              {category.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
