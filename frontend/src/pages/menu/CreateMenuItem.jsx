import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../components/Modal';

const CreateMenuItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const [formData, setFormData] = useState({
    name: isEditing ? 'Nasi Goreng' : '',
    category: isEditing ? 'Main Course' : '',
    price: isEditing ? '25000' : '',
    description: isEditing ? 'Fried rice with eggs and vegetables' : '',
    status: isEditing ? 'Available' : 'Available'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isEditing ? 'Updating item:' : 'Creating item:', formData);
    // Use replace instead of navigate to prevent going back to the form
    navigate('/dashboard/menu', { replace: true });
  };

  const handleClose = () => {
    // Use replace instead of navigate to prevent going back to the form
    navigate('/dashboard/menu', { replace: true });
  };

  return (
    <Modal 
      isOpen={true} 
      onClose={handleClose} 
      title={isEditing ? "Edit Menu Item" : "Create New Menu Item"}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            required
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
            required
          >
            <option value="">Select category</option>
            <option value="Main Course">Main Course</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Noodles">Noodles</option>
            <option value="Soup">Soup</option>
            <option value="Beverages">Beverages</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rp) *</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            rows="3"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
          >
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg transition-colors">
            {isEditing ? "Update Item" : "Create Item"}
          </button>
          <button type="button" onClick={handleClose} className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 rounded-lg transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateMenuItem;