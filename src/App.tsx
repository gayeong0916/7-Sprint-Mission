import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Header from "./headers/Header";
import AddItem from "./AddItem/AddItem";
import ProductDetail from "./ProductDetail/ProductDetail";
import Items from "./Items";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/header" element={<Header />} />
        <Route path="items" element={<Items />} />
        <Route path="addItem" element={<AddItem />} />
        <Route path="items/:productId" element={<ProductDetail />} />
    </Routes>
  );
}
export default App;
