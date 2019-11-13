import React from 'react';
import './App.css';
import MyNavbar from './components/Navbar'
import SearchProductForm from "./components/SearchProductForm";


function App() {
  return (
    <div className="App">
      <MyNavbar />
      <SearchProductForm />
    </div>
  );
}

export default App;
