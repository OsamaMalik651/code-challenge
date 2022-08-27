import React, { useState } from 'react'

const SearchBar = ({ searchTerm, setSearchTerm, maxPosts }) => {
    const [value, setValue] = useState("")

    const handleSubmit = () => {
        if (value > 0 && value <= maxPosts) {
            setSearchTerm(parseInt(value))
        }
        else setSearchTerm("")
    }
    return (
        <div className="flex max-w-fit gap-10 justify-center rounded-md shadow-md p-4 justify-self-center">
            <input
                className='flex-initial w-96 h-12 border-solid border-2 border-indigo-200 rounded-md px-4 focus:outline-none'
                type="number" min="0" max={maxPosts} value={value} placeholder="Enter post id to search"
                onChange={(e) => setValue(e.target.value)} onBlur={handleSubmit} onFocus={() => setValue("")}
            />
            <button
                className='border-2 border-solid border-indigo-700 rounded-md p-2 pl-4 pr-4 font-bold active:bg-black active:text-white'
                onClick={handleSubmit}> Search</button>
        </div >
    )
}

export default SearchBar