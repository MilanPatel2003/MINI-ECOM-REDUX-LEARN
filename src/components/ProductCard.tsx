import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Product } from "@/features/products/ProductSlice";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleCart } from "@/features/cart/CartSlice";
import type { AppDispatch, RootState } from "@/app/store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.CartReducer);
  const { status } = useSelector((state: RootState) => state.LoginReducer);

  const existingItem = items.find((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking the button
    if (status === "succeeded") {
      dispatch(addToCart(product));
      toast.success("Item added to Cart!");
    } else {
      toast.error("Please login to add items to cart");
      navigate("/login");
    }
  };

  const handleGotoCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking the button
    if (status === "succeeded") {
      dispatch(toggleCart());
    } else {
      toast.error("Please login to view cart");
      navigate("/login");
    }
  };

  const handleShowDetails = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Card 
      className="w-full flex flex-col cursor-pointer transition-all hover:shadow-lg" 
      onClick={handleShowDetails}
    >
      <CardHeader className="h-48 flex items-center justify-center overflow-hidden p-4">
        <img
          src={product.image}
          alt={product.title}
          className="max-w-full max-h-full object-contain"
        />
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <CardTitle className="text-lg font-semibold line-clamp-2 mb-2">
          {product.title}
        </CardTitle>
        <Badge variant="secondary" className="mb-2 text-base">
          ${product.price} {product.category}
        </Badge>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating.rate}</span>
          <span className="text-sm text-gray-500">({product.rating.count} reviews)</span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-3">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        {existingItem ? (
          <Button variant={"link"} className="w-full" onClick={handleGotoCart}>
            Go to Cart
          </Button>
        ) : (
          <Button className="w-full" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        )}
        <p className="text-sm text-center text-black hover:underline">
          Show Details
        </p>
      </CardFooter>
    </Card>
  );
}
