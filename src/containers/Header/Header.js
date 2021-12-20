import { useState } from 'react';
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
        <form>
        <input type="search" value={searchText} onChange = {(e) => handleChange(e)} alt="searchText" placeholder='Search City' />
          <button alt="searchBtn" type="submit" onClick={(e) => handleSearch(e, searchText)}>Search</button> 

        </form>
         
        </div>

        
      </header>
    )
}

export default Header;