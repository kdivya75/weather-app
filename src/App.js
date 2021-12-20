import {react, useState, createContext } from 'react';
import Header from './containers/Header';
import Weather from './containers/Weather';
import './App.css';


function App() {

  const [searchValue, setSearchValue] = useState("")
  const handleSearch = (e, value) => {
    e.preventDefault();
    setSearchValue(value)
  }
  return (
    <div className="app">
      <div>
        <Header handleSearch = {(e, value) => handleSearch(e, value)}/>
      </div>
      <div>
        <Weather  searchValue= {searchValue} />
      </div>
      <footer>
        Footer
      </footer>
    </div>
  );
}

export default App;
