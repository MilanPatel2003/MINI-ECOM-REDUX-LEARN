import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/features/products/ProductSlice";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleCart } from "@/features/cart/CartSlice";
import type { AppDispatch, RootState } from "@/app/store";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.CartReducer);

  const existingItem = items.find((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Item added to Cart!");
  };
  const handleGotoCart = () => {
    dispatch(toggleCart());
  };

  return (
    <Card className="w-full flex flex-col">
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
          ${product.price}
        </Badge>
        <p className="text-sm text-gray-500 line-clamp-3">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {existingItem ? (
          <Button variant={"link"} className="w-full" onClick={handleGotoCart}>
            Go to Cart
          </Button>
        ) : (
          <Button className="w-full" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
