import { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Modal from '../../components/Modal';

const CategoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  const [categories, setCategories] = useState([
    { id: 1, name: 'Appetizers', itemCount: 12 },
    { id: 2, name: 'Salads', itemCount: 8 },
    { id: 3, name: 'Soups', itemCount: 6 },
    { id: 4, name: 'Main Course', itemCount: 15 },
    { id: 5, name: 'Seafood', itemCount: 7 },
    { id: 6, name: 'Pasta & Risotto', itemCount: 9 },
    { id: 7, name: 'Grills & BBQ', itemCount: 10 },
    { id: 8, name: 'Sandwiches & Wraps', itemCount: 8 },
    { id: 9, name: 'Pizza', itemCount: 10 },
    { id: 10, name: 'Rice & Noodles', itemCount: 8 },
    { id: 11, name: 'Desserts', itemCount: 10 },
    { id: 12, name: 'Beverages', itemCount: 12 },
    { id: 13, name: 'Breakfast', itemCount: 8 },
    { id: 14, name: 'Healthy & Vegan', itemCount: 7 },
    { id: 15, name: 'Kids Menu', itemCount: 6 },
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

  const handleDelete = () => {
    if (selectedCategory) {
      setCategories(categories.filter(cat => cat.id !== selectedCategory.id));
      setDeleteModalOpen(false);
      setSelectedCategory(null);
    }
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
                  onClick={() => {
                    setSelectedCategory(category);
                    setDeleteModalOpen(true);
                  }}
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

      {/* Add/Edit Modal */}
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

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Category" size="sm">
        <p className="mb-4">Delete "{selectedCategory?.name}"?</p>
        <p className="mb-4 text-sm text-gray-500">This will also affect menu items in this category.</p>
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

export default CategoryPage;