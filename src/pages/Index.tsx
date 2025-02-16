import { SpecialMenu } from "@/components/SpecialMenu";
import { Button } from "@/components/ui/button";
import { ClipboardList, LogOut, ShoppingCart, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CartDialog } from "@/components/CartDialog";
import { CartProvider } from "@/contexts/CartContext";
import { styleText } from "util";

const Index = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const { toast } = useToast();
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    if (!userRole) {
      navigate("/auth");
    }
  }, [userRole, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/auth");
  };

  const handleViewCart = () => {
    setCartOpen(true);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-grey-100">
        <header className="bg-grey shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-grey-900">  <span>STERLO</span>   Smart Canteen</h1>
                <p className="text-gray-600 mt-2">Order ahead and skip the queue</p>
              </div>
              <div className="flex gap-4">
                {userRole === "admin" ? (
                  <Button
                    onClick={() => navigate("/admin")}
                    variant="outline"
                    className="gap-2"
                  >
                    <ClipboardList className="w-4 h-4" />
                    Order Management
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleViewCart}
                      variant="outline"
                      className="gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      View Cart
                    </Button>
                  </>
                )}
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <SpecialMenu />
          
          <section className="mt-12 text-center">
            <p className="text-gray-600">
              {/* More features coming soon! Stay tuned for: */}
            </p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>Order the food and enjoy the day!</li>
              {/* <li>Real-time Order Tracking</li> */}
              {/* <li>Paym  ent Integration</li> */}
              {/* <li>Order History</li> */}
            </ul>
          </section>
        </main>

        <CartDialog open={cartOpen} onOpenChange={setCartOpen} />
      </div>
    </CartProvider>
  );
};

export default Index;
