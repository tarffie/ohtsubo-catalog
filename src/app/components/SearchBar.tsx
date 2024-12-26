'use client'

import React from 'react'
import { useEffect, useState } from "react"

const SearchBar = () => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [hideSuggestions, setHideSuggestions] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`https://dummyjson.com/products/search?q=${value}`).then((response) => response.json())

        setSuggestions(data["products"])
      } catch (e) {
        console.error(`Error retrieving products: ${e}`)
      }
    }

    fetchData()
  }, [value])

  return (
    <div className='container mx-auto relative'>
      <input
        type="text"
        className='text-black border-2 border-indigo-500 focus:outline-none'
        placeholder="Search data..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}

        onFocus={() => setHideSuggestions(false)}
        onBlur={async () => {
          setTimeout(() => {
            setHideSuggestions(true);
          }, 200)
        }}
      />
      <div className={`${hideSuggestions ? 'hidden' : 'visible'} flex justify-center`}>

        <div className='w-80 max-w-full bg-white rounded-md shadow-md absolute'>

          <ul className='list-none overflow-y-auto max-h-48 divide-y divide-grey-300 z-10'>
            {suggestions.map((suggestion, index) => (
              <li key={index} className='px-4 py-2 border-l-4 text-black border-indigo-500 hover:bg-indigo-100 hover:text-gray-500 cursor-pointer'>
                {suggestion['title']}
              </li>
            ))}
          </ul>

        </div>

      </div>

    </div>
  )
}


export default SearchBar

