
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDialog({ open, onOpenChange }: CartDialogProps) {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { toast } = useToast();

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      toast({
        variant: "destructive",
        title: "Cart is empty",
        description: "Please add items to your cart before placing an order.",
      });
      return;
    }

    // Create order object
    const order = {
      id: Math.random().toString(36).substr(2, 9),
      studentName: "Employe User", // In a real app, this would come from user profile
      foodItems: items.map(item => ({
        name: item.title,
        quantity: item.quantity,
        price: item.price
      })),
      totalPrice: total,
      orderDate: new Date().toLocaleString(),
      status: "Pending"
    };

    // Get existing orders from localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Add new order
    localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));

    toast({
      title: "Order placed successfully!",
      description: `Total amount: ₹${total.toFixed(2)}`,
    });
    clearCart();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-500">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="font-medium">Total:</span>
            <span className="font-medium">₹{total.toFixed(2)}</span>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={handlePlaceOrder}>Place Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
