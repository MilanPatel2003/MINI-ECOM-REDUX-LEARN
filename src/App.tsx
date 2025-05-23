import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetails from "@/pages/ProductDetails";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import { CartModal } from "@/components/CartModal";
import { Footer } from "@/components/Footer";

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <CartModal />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
