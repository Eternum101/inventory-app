import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from './pages/Home';
import Items from "./pages/Items";
import Categories from "./pages/Categories";
import AddItems from "./components/AddItems";
import AddCategory from "./components/AddCategory";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const [backendData, setBackendData] = useState("");

  useEffect(() => {
    fetch("/api")
      .then(response => response.text())
      .then(data => setBackendData(data));
  }, []);

  return (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items" element={<Items />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/add-items" element={<AddItems/>} />
      <Route path="/add-category" element={<AddCategory/>} />
    </Routes>
  </Router>
  );
}

export default App;