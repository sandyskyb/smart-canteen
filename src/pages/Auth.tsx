
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, using simple credentials
    // In production, this should be properly authenticated
    if (isAdmin) {
      if (email === "admin@sterlo.com" && password === "admin") {
        localStorage.setItem("userRole", "admin");
        navigate("/admin");
        return;
      }
    } else {
      // Student login - using simple demo credentials
      if (email.endsWith("employe@sterlo.com") && password === "employe") {
        localStorage.setItem("userRole", "user");
        navigate("/dashboard");
        return;
      }
    }

    toast({
      variant: "destructive",
      title: "Login failed",
      description: isAdmin 
        ? "Please check your admin credentials and try again."
        : "Employe login requires a sterlo email and password",
    });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Card className="w-full max-w-md p-6 backdrop-blur-sm bg-white/20">
        <div className="space-y-6">
          <div className="text-center">
            <img src="/sterlo.png" alt="Sterlo Logo" className="w-32 h-32 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Sterlo Smart Canteen</h1>
            <p className="text-black-600 mt-2">Sign in to your account</p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              variant={isAdmin ? "outline" : "default"}
              onClick={() => setIsAdmin(false)}
            >
              Employe
            </Button>
            <Button
              variant={isAdmin ? "default" : "outline"}
              onClick={() => setIsAdmin(true)}
            >
              Admin
            </Button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Sterlo ID</Label>
              <Input
                id="email"
                type="email"
                placeholder={isAdmin ? "Enter Admin ID" : "Enter Employe ID"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {!isAdmin && (
                <p className="text-sm text-muted-foreground">
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder={isAdmin ? "Enter password" : "Enter password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {!isAdmin && (
                <p className="text-sm text-muted-foreground">
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
