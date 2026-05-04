import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';

const CreateMenuItem = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Item:', formData);
    alert('Menu Item Created Successfully!');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Menu Item">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Dish Name"
          placeholder="e.g. Truffle Margherita Pizza"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Price (₹)"
            type="number"
            placeholder="890"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />

          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block mb-1.5">
              Category
            </label>
            <select
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:border-amber-500"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="">Select Category</option>
              <option value="Pizza">Pizza</option>
              <option value="Main Course">Main Course</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
            </select>
          </div>
        </div>

        <Input
          label="Description"
          placeholder="Short description of the dish"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <Input
          label="Image URL"
          placeholder="https://images.unsplash.com/..."
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />

        <div className="flex gap-4 pt-4">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="flex-1">
            Create Item
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateMenuItem;