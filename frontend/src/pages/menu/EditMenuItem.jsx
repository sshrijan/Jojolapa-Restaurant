import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';

const EditMenuItem = () => {
  const [formData, setFormData] = useState({
    name: "Truffle Margherita Pizza",
    price: "890",
    category: "Pizza",
    description: "Fresh basil, mozzarella & truffle oil",
    image: "https://images.unsplash.com/photo-1604068549290-dea8e4f2a5a5"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Menu Item Updated Successfully!");
  };

  return (
    <div className="p-8 bg-zinc-950 min-h-screen text-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Edit Menu Item</h1>

        <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-3xl p-8 space-y-6">
          <Input
            label="Dish Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price (₹)"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-2xl"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option>Pizza</option>
                <option>Main Course</option>
                <option>Breakfast</option>
                <option>Dessert</option>
              </select>
            </div>
          </div>

          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <Input
            label="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />

          <div className="flex gap-4 pt-6">
            <Button variant="outline" className="flex-1" type="button">
              Cancel
            </Button>
            <Button variant="primary" className="flex-1" type="submit">
              Update Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenuItem;