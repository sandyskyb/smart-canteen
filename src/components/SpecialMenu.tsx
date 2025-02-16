
import { useState } from "react";
import { ChefHat, Edit2, X, Check, Plus } from "lucide-react";
import { FoodCard } from "./FoodCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";

interface FoodItem {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  preparationTime: string;
  isSpecial: boolean;
}

const initialSpecialItems: FoodItem[] = [
  {
    title: "Parota",
    description: "Crispy maidha parota two peaces",
    price: 60,
    imageUrl: "/parota.jpg",
    preparationTime: "15 mins",
    isSpecial: true,
  },
  {
    title: "Paneer Butter Masala",
    description: "Cottage cheese cubes in rich tomato gravy",
    price: 120,
    imageUrl: "/paneer.jpg",
    preparationTime: "20 mins",
    isSpecial: true,
  },
  {
    title: "Veg Biryani",
    description: "Fragrant rice dish with mixed vegetables and aromatic spices",
    price: 80,
    imageUrl: "/vegbriyani.jpg",
    preparationTime: "25 mins",
    isSpecial: true,
  },
  {
    title: "Chicken Biryani",
    description: "Fragrant rice dish with Chicken and aromatic spices",
    price: 150,
    imageUrl: "/chicken briyani.avif",
    preparationTime: "25 mins",
    isSpecial: true,
  }
];

export function SpecialMenu() {
  const [specialItems, setSpecialItems] = useState<FoodItem[]>(initialSpecialItems);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const userRole = localStorage.getItem("userRole");
  const isAdmin = userRole === "admin";

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditingItem({ ...specialItems[index] });
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingItem({
      title: "",
      description: "",
      price: 0,
      imageUrl: "/placeholder.svg",
      preparationTime: "",
      isSpecial: true,
    });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditingItem(null);
    setIsAddingNew(false);
  };

  const handleSave = (index: number | null) => {
    if (editingItem) {
      const newItems = [...specialItems];
      if (index !== null) {
        newItems[index] = editingItem;
      } else {
        newItems.push(editingItem);
      }
      setSpecialItems(newItems);
      setEditingIndex(null);
      setEditingItem(null);
      setIsAddingNew(false);
      toast({
        title: index !== null ? "Changes saved" : "New item added",
        description: index !== null
          ? "The food item has been updated successfully."
          : "The new food item has been added successfully.",
      });
    }
  };

  const handleInputChange = (field: keyof FoodItem, value: string | number) => {
    if (editingItem) {
      setEditingItem({
        ...editingItem,
        [field]: value,
      });
    }
  };

  return (
    <section className="py-8 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ChefHat className="w-6 h-6 text-sage-500" />
          <h2 className="text-2xl font-semibold">Today's Specials</h2>
        </div>
        {isAdmin && !isAddingNew && !editingIndex && (
          <Button onClick={handleAddNew} variant="default" className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Food Item
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isAddingNew && (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={editingItem?.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={editingItem?.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price (₹)</label>
                <Input
                  type="number"
                  value={editingItem?.price}
                  onChange={(e) => handleInputChange("price", Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Preparation Time</label>
                <Input
                  value={editingItem?.preparationTime}
                  onChange={(e) => handleInputChange("preparationTime", e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleSave(null)}
                  className="flex-1"
                  variant="default"
                >
                  <Check className="w-4 h-4 mr-2" /> Save
                </Button>
                <Button
                  onClick={handleCancel}
                  className="flex-1"
                  variant="outline"
                >
                  <X className="w-4 h-4 mr-2" /> Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
        {specialItems.map((item, index) => (
          <div key={index} className="relative">
            {editingIndex === index ? (
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <Input
                      value={editingItem?.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Textarea
                      value={editingItem?.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Price (₹)</label>
                    <Input
                      type="number"
                      value={editingItem?.price}
                      onChange={(e) => handleInputChange("price", Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Preparation Time</label>
                    <Input
                      value={editingItem?.preparationTime}
                      onChange={(e) => handleInputChange("preparationTime", e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleSave(index)}
                      className="flex-1"
                      variant="default"
                    >
                      <Check className="w-4 h-4 mr-2" /> Save
                    </Button>
                    <Button
                      onClick={handleCancel}
                      className="flex-1"
                      variant="outline"
                    >
                      <X className="w-4 h-4 mr-2" /> Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10 bg-white rounded-full shadow-md"
                    onClick={() => handleEdit(index)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                )}
                <FoodCard {...item} />
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
