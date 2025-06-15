import React from "react";

const Search = (props) => {
  const { searchTerm, setSearchTerm } = props;

  console.log(searchTerm);

  return (
    <div className="search">
      <div>
        <img src="./search.svg" alt="search" />

        <input
          type="text"
          placeholder="Search among Thousand of Movies!"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
