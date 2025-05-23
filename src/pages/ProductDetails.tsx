import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchSingleProduct } from "@/features/products/ProductSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Star } from "lucide-react";
import toast from "react-hot-toast";
import { addToCart, toggleCart } from "@/features/cart/CartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { singleProduct, status, error } = useSelector(
    (state: RootState) => state.ProductReducer
  );
  const { items } = useSelector((state: RootState) => state.CartReducer);
  const { status:loginStatus } = useSelector((state: RootState) => state.LoginReducer);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(Number(id)));
    }
  }, [dispatch, id]);

  if (status === "loading") {
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="w-full h-[400px] mb-4" />
          <Skeleton className="w-3/4 h-8 mb-2" />
          <Skeleton className="w-1/4 h-6 mb-4" />
          <Skeleton className="w-full h-24" />
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!singleProduct) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">Product not found</div>
      </div>
    );
  }
  const existingItem = items.find((item) => item.id === singleProduct.id);

  const handleAddToCart = () => {
    if (loginStatus === "succeeded") {
      dispatch(addToCart(singleProduct));
      toast.success("Item added to Cart!");
    } else {
      toast.error("Please login to add items to cart");
      navigate("/login");
    }
  };

  const handleGotoCart = () => {
    if (loginStatus === "succeeded") {
      dispatch(toggleCart());
    } else {
      toast.error("Please login to view cart");
      navigate("/login");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <Card className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <CardHeader className="p-0">
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <img
                src={singleProduct.image}
                alt={singleProduct.title}
                className="object-contain w-full h-full"
              />
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <h1 className="text-2xl font-bold mb-2">{singleProduct.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary" className="text-lg">
                ${singleProduct.price}
              </Badge>
              <Badge variant="outline">{singleProduct.category}</Badge>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">
                    {singleProduct.rating.rate}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({singleProduct.rating.count} reviews)
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{singleProduct.description}</p>
            {existingItem ? (
              <Button
                variant={"link"}
                className="w-full"
                onClick={handleGotoCart}
              >
                Go to Cart
              </Button>
            ) : (
              <Button className="w-full" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            )}
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
