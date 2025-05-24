import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/app/store';
import { resetCart } from '@/features/cart/CartSlice';
import { Button } from "@/components/ui/button";
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { ContactForm } from '@/components/checkout/ContactForm';
import { ShippingForm } from '@/components/checkout/ShippingForm';
import { PaymentMethod } from '@/components/checkout/PaymentMethod';
import { SuccessDialog } from '@/components/checkout/SuccessDialog';

type OrderStatus = 'idle' | 'placing' | 'error';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items: cartItems } = useSelector((state: RootState) => state.CartReducer);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('idle');
  const [showDialogImmediately, setShowDialogImmediately] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStatus('placing');
    setTimeout(() => {
      setOrderStatus('idle'); // Reset status after 'placement'
      setShowDialogImmediately(true); // Trigger dialog immediately
    }, 1000); // Simulate network delay
  };

  const handleSuccessDialogClose = () => {
    setShowDialogImmediately(false); // Hide dialog
    dispatch(resetCart()); // Reset the cart after closing dialog
    navigate('/'); // Redirect to home page
  };

  if (cartItems.length === 0 && orderStatus === 'idle' && !showDialogImmediately) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
      </div>
    );
  }

  // Render checkout content if cart has items or order is being placed/has error
  const renderCheckoutContent = cartItems.length > 0 || orderStatus === 'placing' || orderStatus === 'error';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {renderCheckoutContent ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Cart Items */}
          <div className="order-2 lg:order-1">
            <OrderSummary />
          </div>

          {/* Right side - Checkout Form */}
          <div className="order-1 lg:order-2">
            <form onSubmit={handleSubmit}>
              <ContactForm 
                formData={formData} 
                onInputChange={handleInputChange} 
              />
              
              <ShippingForm 
                formData={formData} 
                onInputChange={handleInputChange} 
              />
              
              <PaymentMethod 
                paymentMethod={formData.paymentMethod}
                onPaymentMethodChange={handlePaymentMethodChange}
              />

              <Button type="submit" className="w-full" disabled={orderStatus === 'placing' || showDialogImmediately}>
                {orderStatus === 'placing' ? 'Processing...' : 'Pay Now'}
              </Button>
            </form>
          </div>
        </div>
      ) : null}

      <SuccessDialog 
        isOpen={showDialogImmediately}
        onClose={handleSuccessDialogClose}
      />
    </div>
  );
};

export default Checkout; 




