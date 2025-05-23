import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessDialog = ({ isOpen, onClose }: SuccessDialogProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 animate-in fade-in zoom-in">
        <div className="flex flex-col items-center justify-center py-4">
          <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-semibold text-center mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <Button 
            onClick={onClose} 
            className="w-full"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}; 