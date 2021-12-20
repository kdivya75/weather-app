import {react, useState, useEffect} from 'react';
import headerIcon from '../../assets/header-icon.svg'
import './Header.css';

function Header({handleSearch}) {
  const[searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    setSearchText(e.target.value);
  }
    return(
        <header>
        <img src={headerIcon} alt="header-icon" />
        <h1> Weather App </h1>
        <div className="searchContainer">
          <input type="search" value={searchText} onChange = {(e) => handleChange(e)} alt="searchText" placeholder='Search' />
          <button alt="searchBtn" onClick={() => handleSearch(searchText)}>Search</button> 
        </div>

        
      </header>
    )
}

export default Header;