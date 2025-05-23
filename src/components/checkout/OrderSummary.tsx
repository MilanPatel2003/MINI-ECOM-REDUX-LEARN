import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export const OrderSummary = () => {
  const { items: cartItems, totalPrice } = useSelector((state: RootState) => state.CartReducer);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain rounded-md"
              />
              <div className="flex-grow">
                <h4 className="text-sm font-medium line-clamp-2">{item.title}</h4>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <div className="text-sm font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </ScrollArea>
        
        <Separator className="my-4" />
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 