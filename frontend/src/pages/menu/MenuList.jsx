import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';

const MenuList = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const menuItems = [
    {
      id: 1,
      name: "Truffle Margherita Pizza",
      price: 890,
      category: "Pizza",
      image: "https://images.unsplash.com/photo-1604068549290-dea8e4f2a5a5?w=600",
      description: "Fresh basil, mozzarella & truffle oil",
      isAvailable: true,
    },
    {
      id: 2,
      name: "Butter Chicken",
      price: 650,
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae784?w=600",
      description: "Tender chicken in rich tomato gravy",
      isAvailable: true,
    },
    {
      id: 3,
      name: "Avocado Smash Toast",
      price: 420,
      category: "Breakfast",
      image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c50f?w=600",
      description: "Sourdough with poached eggs",
      isAvailable: false,
    },
    {
      id: 4,
      name: "Chocolate Lava Cake",
      price: 320,
      category: "Dessert",
      image: "https://images.unsplash.com/photo-1606313561348-6d6e4c2f5f2f?w=600",
      description: "Warm cake with molten center",
      isAvailable: true,
    },
  ];

  const categories = ['All', 'Pizza', 'Main Course', 'Breakfast', 'Dessert'];

  const filteredItems = menuItems.filter(item => 
    (activeCategory === 'All' || item.category === activeCategory) &&
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 bg-zinc-950 min-h-screen text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Our Menu</h1>
          <p className="text-zinc-400 mt-1">Manage your restaurant's offerings</p>
        </div>

        <Button 
          variant="primary" 
          size="lg"
          onClick={() => alert('Open Create Menu Modal')}
        >
          + Add New Item
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search menu items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />

        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 whitespace-nowrap rounded-2xl font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-black'
                  : 'bg-zinc-900 hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900 rounded-3xl overflow-hidden group hover:scale-105 transition-all duration-300 border border-zinc-800 hover:border-amber-500/30"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                  item.isAvailable 
                    ? 'bg-emerald-500 text-black' 
                    : 'bg-red-500 text-white'
                }`}>
                  {item.isAvailable ? 'Available' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-xl leading-tight">{item.name}</h3>
                <p className="text-amber-400 font-bold text-xl">₹{item.price}</p>
              </div>

              <p className="text-zinc-400 text-sm mt-2 line-clamp-2">
                {item.description}
              </p>

              <div className="flex gap-3 mt-6">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                >
                  Edit
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="flex-1"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;