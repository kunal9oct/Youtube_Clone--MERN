import React from "react";
import "./SearchList.css";
import { FaSearch } from "react-icons/fa";

function SearchList({ TitleArray, setSearchQuery }) {
  return (
    <>
      <div className="Container_SearchList">
        {TitleArray.map((item) => {
          return (
            <p key={item} className="titleItem" onClick={() => setSearchQuery(item)}>
              <FaSearch className="margin-r-5" />
              {item}
            </p>
          );
        })}
      </div>
    </>
  );
}

export default SearchList;
