import { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Modal from '../../components/Modal';
import Card from '../../components/Card';

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
  {
    id: 1,
    name: 'Classic Cheeseburger',
    category: 'Main Course',
    price: 12.99,
    status: 'Available',
    description: 'Beef patty with cheddar cheese, lettuce, tomato, and special sauce',
    image: 'https://source.unsplash.com/300x200/?burger'
  },
  {
    id: 2,
    name: 'Caesar Salad',
    category: 'Salads',
    price: 8.99,
    status: 'Available',
    description: 'Romaine lettuce, parmesan cheese, croutons with Caesar dressing',
    image: 'https://source.unsplash.com/300x200/?salad'
  },
  {
    id: 3,
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: 14.99,
    status: 'Available',
    description: 'Fresh mozzarella, tomato sauce, basil, and olive oil',
    image: 'https://source.unsplash.com/300x200/?pizza'
  },
  {
    id: 4,
    name: 'Spaghetti Carbonara',
    category: 'Pasta & Risotto',
    price: 13.99,
    status: 'Available',
    description: 'Creamy pasta with eggs, pancetta, and parmesan cheese',
    image: 'https://source.unsplash.com/300x200/?pasta'
  },
  {
    id: 5,
    name: 'Grilled Salmon',
    category: 'Seafood',
    price: 18.99,
    status: 'Available',
    description: 'Fresh salmon with lemon butter sauce and steamed vegetables',
    image: 'https://source.unsplash.com/300x200/?salmon'
  },
  {
    id: 6,
    name: 'Chicken Wings',
    category: 'Appetizers',
    price: 9.99,
    status: 'Available',
    description: 'Crispy chicken wings with buffalo or BBQ sauce',
    image: 'https://source.unsplash.com/300x200/?chicken-wings'
  },
  {
    id: 7,
    name: 'French Onion Soup',
    category: 'Soups',
    price: 6.99,
    status: 'Out of Stock',
    description: 'Rich beef broth with caramelized onions and melted cheese',
    image: 'https://source.unsplash.com/300x200/?soup'
  },
  {
    id: 8,
    name: 'New York Cheesecake',
    category: 'Desserts',
    price: 7.99,
    status: 'Available',
    description: 'Creamy cheesecake with berry compote',
    image: 'https://source.unsplash.com/300x200/?cheesecake'
  },
  {
    id: 9,
    name: 'Iced Caramel Latte',
    category: 'Beverages',
    price: 4.99,
    status: 'Available',
    description: 'Espresso with caramel syrup and milk over ice',
    image: 'https://source.unsplash.com/300x200/?coffee'
  },
  {
    id: 10,
    name: 'Avocado Toast',
    category: 'Breakfast',
    price: 8.99,
    status: 'Available',
    description: 'Sourdough toast with avocado, poached egg, and chili flakes',
    image: 'https://source.unsplash.com/300x200/?avocado-toast'
  },
  {
    id: 11,
    name: 'Chicken Tikka Masala',
    category: 'Main Course',
    price: 15.99,
    status: 'Available',
    description: 'Grilled chicken in creamy tomato curry sauce with rice',
    image: 'https://source.unsplash.com/300x200/?curry'
  },
  {
    id: 12,
    name: 'Vegetable Spring Rolls',
    category: 'Appetizers',
    price: 7.99,
    status: 'Available',
    description: 'Crispy rolls with mixed vegetables and sweet chili dip',
    image: 'https://source.unsplash.com/300x200/?spring-roll'
  }
]);

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (editingItem) {
      setMenuItems(menuItems.map(item =>
        item.id === editingItem.id
          ? { ...item, ...formData, price: parseInt(formData.price) }
          : item
      ));
    } else {
      setMenuItems([
        ...menuItems,
        {
          id: Date.now(),
          ...formData,
          price: parseInt(formData.price),
          image: 'https://source.unsplash.com/300x200/?food'
        }
      ]);
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
      {/* Header */}
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
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add Item
        </button>
      </div>

      {/* Search */}
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

      {/* 🔥 CARD GRID (REPLACED TABLE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredItems.map((item) => (
          <Card key={item.id} className="p-4">

            {/* Image */}
            <div className="w-full h-40 mb-3 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500">
                {item.category}
              </p>

              <p className="text-md font-bold text-gray-900">
                Rs. {item.price.toLocaleString()}
              </p>

              <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                item.status === 'Available'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {item.status}
              </span>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setEditingItem(item);
                  setFormData(item);
                  setModalOpen(true);
                }}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Edit size={16} />
              </button>

              <button
                onClick={() => {
                  setSelectedItem(item);
                  setDeleteModalOpen(true);
                }}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={16} />
              </button>
            </div>

          </Card>
        ))}
      </div>

     <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? "Edit Menu Item" : "Add Menu Item"}
      >
        <div className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              placeholder="Enter item name"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
            >
              <option value="">Select category</option>
              <option value="Appetizers">Appetizers</option>
              <option value="Salads">Salads</option>
              <option value="Soups">Soups</option>
              <option value="Main Course">Main Course</option>
              <option value="Seafood">Seafood</option>
              <option value="Pasta & Risotto">Pasta & Risotto</option>
              <option value="Grills & BBQ">Grills & BBQ</option>
              <option value="Sandwiches & Wraps">Sandwiches & Wraps</option>
              <option value="Pizza">Pizza</option>
              <option value="Rice & Noodles">Rice & Noodles</option>
              <option value="Desserts">Desserts</option>
              <option value="Beverages">Beverages</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Healthy & Vegan">Healthy & Vegan</option>
              <option value="Kids Menu">Kids Menu</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (Rp)
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              placeholder="Enter price"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              placeholder="Enter description"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
            >
              <option value="Available">Available</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg"
            >
              {editingItem ? "Update" : "Save"}
            </button>

            <button
              onClick={() => setModalOpen(false)}
              className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>

        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Menu Item" size="sm">
        <p className="mb-4">Delete "{selectedItem?.name}"?</p>
        <div className="flex gap-3">
          <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded-lg">
            Delete
          </button>
          <button onClick={() => setDeleteModalOpen(false)} className="flex-1 border py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MenuList;