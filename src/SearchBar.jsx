import {useEffect, useState } from "react";
const SearchBar = ({search,onSearchChange}) => {
     const [error, setError] = useState("");
   const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    onSearchChange(text);   
  };

    return (
        <div className="search-container">
            <form>
                <input type="search"
                    placeholder="Search"
                    value={search}
                    onChange={handleSearch}
                    className="search"
                />
                <button>&#x1F50D;&#xFE0E;</button>
            </form>
        </div>
    );
}
export default SearchBar;