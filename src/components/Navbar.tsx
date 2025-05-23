import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, LogOut, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { toggleCart, resetCart } from "@/features/cart/CartSlice";
import { setLogout } from "@/features/login/LoginSlice";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
    const {totalQuantity} = useSelector((state:RootState)=> state.CartReducer);
    const { status, user } = useSelector((state:RootState)=> state.LoginReducer);
    const dispatch = useDispatch<AppDispatch>();

    const handleShowCart = () => {
        if (status === "succeeded") {
            dispatch(toggleCart());
        } else {
            toast.error("Please login to view cart");
        }
    };

    const handleLogout = () => {
        dispatch(setLogout());
        dispatch(resetCart());
        toast.success("Logged out successfully!");
    };

    return (
        <nav className="border-b bg-white shadow-sm">
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    {/* Left side - Logo and Navigation */}
                    <div className="flex items-center gap-8">
                        <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
                            Mini Ecom
                        </Link>
                        <div className="hidden md:flex items-center gap-2">
                            <Link to="/">
                                <Button variant="ghost" className="font-medium">Home</Button>
                            </Link>
                            <Link to="/products">
                                <Button variant="ghost" className="font-medium">Products</Button>
                            </Link>
                            <Link to="/contact">
                                <Button variant="ghost" className="font-medium">Contact</Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right side - Cart and Auth */}
                    <div className="flex items-center gap-4">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={handleShowCart}
                            className="relative"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {totalQuantity > 0 && (
                                <Badge 
                                    variant="secondary" 
                                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
                                >
                                    {totalQuantity}
                                </Badge>
                            )}
                        </Button>

                        {status === "succeeded" ? (
                            <div className="flex items-center gap-4">
                                <div className="hidden md:flex items-center gap-2">
                                    <User className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm font-medium">{user.username}</span>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={handleLogout}
                                    className="hover:bg-red-50 hover:text-red-600"
                                >
                                    <LogOut className="h-5 w-5" />
                                </Button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <Button variant="default" className="font-medium">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
} 