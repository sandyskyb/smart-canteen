import { Button } from "./ui/button";
import { Clock, Plus } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../hooks/use-toast";

interface FoodCardProps {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  preparationTime: string;
  isSpecial?: boolean;
}

export function FoodCard({
  title,
  description,
  price,
  imageUrl,
  preparationTime,
  isSpecial,
}: FoodCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem({ title, price, quantity: 1 });
    toast({
      title: "Added to cart",
      description: `${title} has been added to your cart.`,
    });
  };

  return (
    <div className="food-card animated-item">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="price-tag">₹{price}</span>
        </div>
        <p className="text-muted-foreground text-sm mb-4 flex-grow">{description}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{preparationTime}</span>
          </div>
          <Button onClick={handleAddToCart} size="sm" className="add-to-cart-btn gap-2">
            <Plus className="w-4 h-4" /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
