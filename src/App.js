import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Cart from "./Components/Cart";
import UserProfile from "./Components/UserProfile";
import Addproduct from "./Components/Addproduct";
import PgfOF from "./Components/PgfOF";
import Allproducts from "./Components/Some-Product-Components/Allproducts";
import Specificproduct from "./Components/Some-Product-Components/Specificproduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/userprofile" element={<UserProfile />} />
        <Route exact path="/sellproduct" element={<Addproduct />} />
        <Route
          exact
          path="/product-type/mobiles"
          element={<Allproducts type={"Mobile"} />}
        />
        <Route
          exact
          path="/product-type/laptops"
          element={<Allproducts type={"Laptop"} />}
        />
        <Route
          exact
          path="/product-type/headphones"
          element={<Allproducts type={"Headphone"} />}
        />
        <Route path="/product/:type/:id" element={<Specificproduct />} />
        <Route path="/cartdata" element={<Cart />} />
        <Route exact path="*" element={<PgfOF />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
