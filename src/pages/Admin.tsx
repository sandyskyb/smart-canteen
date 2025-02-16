
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  studentName: string;
  foodItems: OrderItem[];
  totalPrice: number;
  orderDate: string;
  status: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin") {
      navigate("/auth");
    }
    
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, [navigate]);

  const downloadExcel = () => {
    // Create CSV content
    const headers = ["Order ID", "Employe Name", "Food Items", "Total Price", "Order Date", "Status"];
    const csvContent = [
      headers.join(","),
      ...orders.map(order => 
        [
          order.id,
          order.studentName,
          order.foodItems.map(item => `${item.name}(${item.quantity})`).join('; '),
          order.totalPrice,
          order.orderDate,
          order.status
        ].join(",")
      )
    ].join("\n");

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashbosrd
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Order Management</h1>
            <Button onClick={downloadExcel}>
              <Download className="w-4 h-4 mr-2" />
              Export to Excelsheet
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Employe Name</TableHead>
                  <TableHead>Food Items</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.studentName}</TableCell>
                    <TableCell>
                      <ul className="list-disc list-inside">
                        {order.foodItems.map((item, index) => (
                          <li key={index}>
                            {item.name} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>₹{order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
