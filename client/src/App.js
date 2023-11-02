import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from './pages/Home';
import Items from "./pages/Items";
import Categories from "./pages/Categories";
import AddItems from "./components/AddItems";
import AddCategory from "./components/AddCategory";
import CategoriesDetail from "./components/CategoryDetail";
import ItemDetail from "./components/ItemDetail";
import UpdateItem from "./components/UpdateItem";
import UpdateCatgory from "./components/UpdateCategory";
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
      <Route path="/categories/:id" element={<CategoriesDetail />} />
      <Route path="/items/:id" element={<ItemDetail />} />
      <Route path="/items/update/:id" element={<UpdateItem />} />
      <Route path="/categories/update/:id" element={<UpdateCatgory />} />
    </Routes>
  </Router>
  );
}

export default App;
