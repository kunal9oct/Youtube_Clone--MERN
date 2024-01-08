import React from "react";
import { useState } from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
import { BsMicFill } from "react-icons/bs";
import SearchList from "./SearchList.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [display, setDisplay] = useState(false);
  const TitleArray = useSelector(s => s.videoReducer)?.data?.filter(q => q?.videoTitle.toUpperCase().includes(searchQuery.toUpperCase())).map(m => m?.videoTitle);
  // const TitleArray = ['video1', 'Video2', 'Animation video', 'Movies'].filter(item => item.toUpperCase().includes(searchQuery.toUpperCase()));

  return (
    <>
      <div className="SearchBar_Container">
        <div className="SearchBar_Container2">
          <div className="search_div">
            <input type="text" className="iBox_SearchBar" placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onClick={(e) => setDisplay(true)}
            // onDoubleClick={() => setSearchQuery(true)}
            />
            <Link to={`/search/${searchQuery}`}>
            <FaSearch className="searchIcon_SearchBar" onClick={(e) => setDisplay(false)} />
            </Link>
            <BsMicFill className="Mic_SearchBar" />
            {searchQuery && display && <SearchList TitleArray={TitleArray} setSearchQuery={setSearchQuery} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
