import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { toggleCart, increaseQuantity, decreaseQuantity } from "@/features/cart/CartSlice";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

export function CartModal() {
    const dispatch = useDispatch<AppDispatch>();
    const { items: cartItems, totalQuantity, totalPrice, showCart } = useSelector((state: RootState) => state.CartReducer);

    const handleClose = () => {
        dispatch(toggleCart());
    };

    const handleIncreaseQuantity = (productId: number) => {
        dispatch(increaseQuantity(productId));
    };

    const handleDecreaseQuantity = (productId: number) => {
        dispatch(decreaseQuantity(productId));
    };

    return (
        <Dialog open={showCart} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px] flex flex-col h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Shopping Cart ({totalQuantity})</DialogTitle>
                    <DialogDescription>
                        Review your items before checkout.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="flex-grow pr-4 overflow-y-auto min-h-0">
                    {cartItems.length === 0 ? (
                        <div className="text-center text-gray-500">Your cart is empty.</div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 py-2">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-16 h-16 object-contain rounded-md"
                                />
                                <div className="flex-grow">
                                    <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDecreaseQuantity(item.id)}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span>{item.quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleIncreaseQuantity(item.id)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </ScrollArea>

                <Separator className="my-4" />

                <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>

                <DialogFooter>
                    <Button className="w-full">Proceed to Checkout</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
} 