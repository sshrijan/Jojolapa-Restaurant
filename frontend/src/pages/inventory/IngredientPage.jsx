import { useState } from 'react';
import Button from '../../components/Button';

const IngredientPage = () => {
  const [ingredients] = useState([
    { name: "Mozzarella Cheese", stock: 12, unit: "kg", status: "Good" },
    { name: "Chicken", stock: 8, unit: "kg", status: "Low" },
    { name: "Tomato Sauce", stock: 25, unit: "litre", status: "Good" },
    { name: "Fresh Basil", stock: 3, unit: "bunch", status: "Critical" },
    { name: "Flour", stock: 45, unit: "kg", status: "Good" },
  ]);

  return (
    <div className="p-8 bg-zinc-950 min-h-screen text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Inventory</h1>
        <Button variant="primary">+ Add Ingredient</Button>
      </div>

      <div className="bg-zinc-900 rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left p-6">Ingredient</th>
              <th className="text-left p-6">Stock</th>
              <th className="text-left p-6">Unit</th>
              <th className="text-left p-6">Status</th>
              <th className="p-6"></th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((item, i) => (
              <tr key={i} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                <td className="p-6 font-medium">{item.name}</td>
                <td className="p-6">{item.stock}</td>
                <td className="p-6 text-zinc-400">{item.unit}</td>
                <td className="p-6">
                  <span className={`px-5 py-1 rounded-full text-sm font-medium ${
                    item.status === "Good" ? "bg-emerald-500 text-black" :
                    item.status === "Low" ? "bg-yellow-500 text-black" : "bg-red-500 text-white"
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-6">
                  <Button variant="outline" size="sm">Update Stock</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngredientPage;