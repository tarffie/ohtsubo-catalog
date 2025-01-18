"use client";

import { fetchServiceFromApi } from "@/lib/utils/apiUtils";
import React from "react";
import { useEffect, useState } from "react";

import { ServiceInput as Service } from "@/lib/interfaces/Service";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState(new Array<string>());
  const [hideSuggestions, setHideSuggestions] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchServiceFromApi("get", "");

        const results: string[] = Object.values(data).map((entry: any) =>
          String(entry.title).toLowerCase(),
        );
        results.pop();

        if (value.trim() === "") {
          setSuggestions([]);
          return;
        }

        const items = results.filter((entry: string) =>
          entry.includes(value.toLowerCase()),
        );

        setSuggestions(items);
      } catch (e) {
        console.error(`Error retrieving products: ${e}`);
      }
    })();
  }, [value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="container mx-auto relative">
      <input
        type="text"
        className="text-black border-2 border-indigo-500 focus:outline-none"
        placeholder="Pesquisar..."
        value={value}
        onChange={handleInputChange}
        onFocus={() => setHideSuggestions(false)}
        onBlur={async () => {
          setTimeout(() => {
            setHideSuggestions(true);
          }, 200);
        }}
      />
      <div
        className={`${hideSuggestions ? "hidden" : "visible"} flex justify-center`}
      >
        <div className="w-80 max-w-full bg-white rounded-md shadow-md absolute">
          <ul className="list-none overflow-y-auto max-h-48 divide-y divide-grey-300 z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 border-l-4 text-black border-indigo-500 hover:bg-indigo-100 hover:text-gray-500 cursor-pointer"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
