import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "../app/context/CartContext";
import BlackLine from "./widgets/BlackLine/BlackLine";
import Header from "./widgets/Header/Header";
import HomePage from "../pages/HomePage/HomePage";
import CartPage from "../pages/CartPage/CartPage";
function App() {
  return (
    <CartProvider>
      <Router>
        <BlackLine />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
