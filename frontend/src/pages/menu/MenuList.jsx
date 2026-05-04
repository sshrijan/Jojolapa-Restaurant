import { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Modal from '../../components/Modal';

const MenuList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    status: 'Available'
  });

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Nasi Goreng', category: 'Main Course', price: 25000, status: 'Available', description: 'Fried rice with eggs' },
    { id: 2, name: 'Mie Ayam', category: 'Noodles', price: 22000, status: 'Available', description: 'Chicken noodles' },
    { id: 3, name: 'Sate Ayam', category: 'Grill', price: 35000, status: 'Available', description: 'Chicken satay' },
    { id: 4, name: 'Bakso', category: 'Soup', price: 20000, status: 'Out of Stock', description: 'Meatball soup' },
  ]);

  const filteredItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (editingItem) {
      setMenuItems(menuItems.map(item => 
        item.id === editingItem.id ? { 
          ...item, 
          name: formData.name,
          category: formData.category,
          price: parseInt(formData.price),
          description: formData.description,
          status: formData.status
        } : item
      ));
    } else {
      setMenuItems([...menuItems, { 
        id: Date.now(), 
        name: formData.name,
        category: formData.category,
        price: parseInt(formData.price),
        description: formData.description,
        status: formData.status
      }]);
    }
    setModalOpen(false);
    setFormData({ name: '', category: '', price: '', description: '', status: 'Available' });
    setEditingItem(null);
  };

  const handleDelete = () => {
    setMenuItems(menuItems.filter(item => item.id !== selectedItem?.id));
    setDeleteModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Menu Items</h2>
          <p className="text-gray-600 text-sm mt-1">Manage your restaurant menu</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setFormData({ name: '', category: '', price: '', description: '', status: 'Available' });
            setModalOpen(true);
          }}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          Add Item
        </button>
      </div>

      <div className="max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{item.category}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-gray-900">Rp {item.price.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {item.status}
                    </span>
                   </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setFormData({
                            name: item.name,
                            category: item.category,
                            price: item.price,
                            description: item.description,
                            status: item.status
                          });
                          setModalOpen(true);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedItem(item);
                          setDeleteModalOpen(true);
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal - Inline like IngredientPage */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? "Edit Menu Item" : "Add New Menu Item"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              placeholder="Enter item name"
              required
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              placeholder="Enter description"
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
            <button onClick={handleSave} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg transition-colors">
              {editingItem ? "Update" : "Save"}
            </button>
            <button onClick={() => setModalOpen(false)} className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 rounded-lg transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Menu Item" size="sm">
        <div>
          <p className="text-gray-700 mb-4">Are you sure you want to delete "{selectedItem?.name}"?</p>
          <div className="flex gap-3">
            <button onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors">
              Delete
            </button>
            <button onClick={() => setDeleteModalOpen(false)} className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 rounded-lg transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MenuList;