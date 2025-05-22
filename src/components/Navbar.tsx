import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { toggleCart } from "@/features/cart/CartSlice";
export function Navbar() {
    const {totalQuantity} = useSelector((state:RootState)=> state.CartReducer)
    const dispatch = useDispatch<AppDispatch>();
    const handleShowCart = () => {
        dispatch(toggleCart());
    };
    return (
        <nav className="border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold">
                    Mini Ecom
                </Link>
                <div className="flex items-center gap-4">
                    <Link to="/products">
                        <Button variant="ghost">Products</Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={handleShowCart}>
                        <ShoppingCart className="h-5 w-5" />
                        {totalQuantity}
                    </Button>
                </div>
            </div>
        </nav>
    );
} 