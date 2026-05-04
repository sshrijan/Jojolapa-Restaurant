import { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Modal from '../../components/Modal';

const CategoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  const [categories, setCategories] = useState([
    { id: 1, name: 'Main Course', itemCount: 12 },
    { id: 2, name: 'Appetizer', itemCount: 8 },
    { id: 3, name: 'Noodles', itemCount: 6 },
    { id: 4, name: 'Soup', itemCount: 5 },
    { id: 5, name: 'Beverages', itemCount: 10 },
  ]);

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveCategory = () => {
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? { ...cat, name: categoryName } : cat
      ));
    } else {
      setCategories([...categories, { id: Date.now(), name: categoryName, itemCount: 0 }]);
    }
    setModalOpen(false);
    setCategoryName('');
    setEditingCategory(null);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
          <p className="text-gray-600 text-sm mt-1">Manage menu categories</p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            setCategoryName('');
            setModalOpen(true);
          }}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className="max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white text-xl">
                🏷️
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setEditingCategory(category);
                    setCategoryName(category.name);
                    setModalOpen(true);
                  }}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{category.itemCount} items</p>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingCategory ? "Edit Category" : "Add Category"}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            placeholder="Enter category name"
          />
          <div className="flex gap-3 mt-5">
            <button onClick={handleSaveCategory} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg">
              Save
            </button>
            <button onClick={() => setModalOpen(false)} className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 rounded-lg">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CategoryPage;