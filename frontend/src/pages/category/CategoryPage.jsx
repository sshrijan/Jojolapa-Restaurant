import Button from '../../components/Button';

const CategoryPage = () => {
  const categories = [
    { name: "Pizza", count: 12, color: "from-red-500 to-orange-500" },
    { name: "Main Course", count: 18, color: "from-emerald-500 to-teal-500" },
    { name: "Breakfast", count: 8, color: "from-amber-500 to-yellow-500" },
    { name: "Dessert", count: 15, color: "from-purple-500 to-pink-500" },
    { name: "Beverage", count: 10, color: "from-blue-500 to-cyan-500" },
  ];

  return (
    <div className="p-8 bg-zinc-950 min-h-screen text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Categories</h1>
        <Button variant="primary" size="lg">+ New Category</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="bg-zinc-900 rounded-3xl p-8 hover:scale-105 transition-all group"
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} mb-6 flex items-center justify-center text-4xl`}>
              🍽️
            </div>
            <h3 className="text-2xl font-semibold">{cat.name}</h3>
            <p className="text-zinc-400 mt-1">{cat.count} items</p>

            <div className="mt-8 flex gap-3">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="secondary" size="sm">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;