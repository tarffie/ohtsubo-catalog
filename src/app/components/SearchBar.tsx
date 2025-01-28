"use client";

import Link from "next/link";

import { fetchServiceFromApi } from "@/lib/utils/apiUtils";
import React from "react";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState(new Array<any>());
  const [hideSuggestions, setHideSuggestions] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchServiceFromApi("get", "");

        const results = Object.values(data).map((entry: any) => [
          [entry.id, String(entry.title).toLowerCase()],
        ]);

        results.pop();

        if (value.trim() === "") {
          setSuggestions([]);
          return;
        }

        const items = results.filter((entry: any[]) =>
          entry[0][1].includes(String(value).toLowerCase()),
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
        className="text-black border-2 border-wine-500 focus:outline-none"
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
        <div className="w-80 max-w-full bg-white rounded-md shadow-md absolute z-50">
          <ul className="list-none overflow-y-auto max-h-48 divide-y divide-sky_blue-600 z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 border-l-4 text-black border-sky_blue-500 hover:bg-sky_blue-400 hover:text-pale_dogwood-700 cursor-pointer"
              >
                <Link href={`/services/${suggestion[0][0]}`}>
                  {suggestion[0][1]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
