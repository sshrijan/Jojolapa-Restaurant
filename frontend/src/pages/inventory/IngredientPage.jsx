import { useState } from 'react';
import { Plus, Edit, Trash2, Search, AlertCircle } from 'lucide-react';
import Modal from '../../components/Modal';

const IngredientPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', stock: '', unit: '', minStock: '' });

  const [ingredients, setIngredients] = useState([
    { id: 1, name: 'Rice', stock: 50, unit: 'kg', minStock: 10, status: 'In Stock' },
    { id: 2, name: 'Chicken', stock: 25, unit: 'kg', minStock: 8, status: 'In Stock' },
    { id: 3, name: 'Eggs', stock: 120, unit: 'pcs', minStock: 50, status: 'In Stock' },
    { id: 4, name: 'Oil', stock: 5, unit: 'liters', minStock: 10, status: 'Low Stock' },
    { id: 5, name: 'Flour', stock: 8, unit: 'kg', minStock: 5, status: 'In Stock' },
  ]);

  const filteredIngredients = ingredients.filter(ing =>
    ing.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (editingItem) {
      setIngredients(ingredients.map(ing => 
        ing.id === editingItem.id ? { 
          ...ing, 
          name: formData.name, 
          stock: parseInt(formData.stock), 
          unit: formData.unit,
          minStock: parseInt(formData.minStock),
          status: parseInt(formData.stock) <= parseInt(formData.minStock) ? 'Low Stock' : 'In Stock'
        } : ing
      ));
    } else {
      setIngredients([...ingredients, { 
        id: Date.now(), 
        ...formData, 
        stock: parseInt(formData.stock),
        minStock: parseInt(formData.minStock),
        status: parseInt(formData.stock) <= parseInt(formData.minStock) ? 'Low Stock' : 'In Stock'
      }]);
    }
    setModalOpen(false);
    setFormData({ name: '', stock: '', unit: '', minStock: '' });
    setEditingItem(null);
  };

  const handleDelete = () => {
    if (selectedItem) {
      setIngredients(ingredients.filter(ing => ing.id !== selectedItem.id));
      setDeleteModalOpen(false);
      setSelectedItem(null);
    }
  };

  const getStockStatusColor = (status) => {
    return status === 'Low Stock' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Inventory</h2>
          <p className="text-gray-600 text-sm mt-1">Manage ingredients and stock levels</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setFormData({ name: '', stock: '', unit: '', minStock: '' });
            setModalOpen(true);
          }}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          Add Ingredient
        </button>
      </div>

      <div className="max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search ingredients..."
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
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ingredient</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Min Stock</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredIngredients.map((ingredient) => (
                <tr key={ingredient.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-sm font-medium text-gray-900">{ingredient.name}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{ingredient.stock}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{ingredient.unit}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{ingredient.minStock}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      {ingredient.status === 'Low Stock' && <AlertCircle size={14} className="text-red-500" />}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStockStatusColor(ingredient.status)}`}>
                        {ingredient.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(ingredient);
                          setFormData({
                            name: ingredient.name,
                            stock: ingredient.stock,
                            unit: ingredient.unit,
                            minStock: ingredient.minStock
                          });
                          setModalOpen(true);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(ingredient);
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

      {/* Add/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? "Edit Ingredient" : "Add Ingredient"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ingredient Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              placeholder="Enter ingredient name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              placeholder="Enter stock quantity"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
            <select
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
            >
              <option value="">Select unit</option>
              <option value="kg">Kilogram (kg)</option>
              <option value="g">Gram (g)</option>
              <option value="liters">Liters</option>
              <option value="pcs">Pieces (pcs)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Stock Alert</label>
            <input
              type="number"
              value={formData.minStock}
              onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              placeholder="Enter minimum stock level"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSave} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg">
              Save
            </button>
            <button onClick={() => setModalOpen(false)} className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 rounded-lg">
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Ingredient" size="sm">
        <p className="mb-4">Delete "{selectedItem?.name}"?</p>
        <div className="flex gap-3">
          <button onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors">
            Delete
          </button>
          <button onClick={() => setDeleteModalOpen(false)} className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 rounded-lg transition-colors">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default IngredientPage;