import React from "react";
import { IoSearch } from "react-icons/io5";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";

const SearchBar = () => {
  const [{ searchTerm }, dispatch] = useStateValue();

  const handleSearchTermChange = (event) => {
    dispatch({
      type: actionType.SET_SEARCH_TERM,
      searchTerm: event.target.value,
    });
  };

  return (
    <div className="w-full my-4 h-16 bg-card flex items-center justify-center">
      <div className="w-full md:w-2/3 p-4 bg-primary shadow-xl rounded-md flex items-center gap-4">
        <IoSearch className="text-2xl text-textColor" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="w-full h-full bg-transparent text-lg text-textColor border-none outline-none"
          placeholder="Search here ...."
          aria-label="Search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
