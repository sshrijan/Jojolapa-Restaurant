import { Link, useLocation } from 'react-router-dom';

const DashboardLayout = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: "📊" },
    { name: "Menu", path: "/menu", icon: "🍝" },
    { name: "Categories", path: "/categories", icon: "📂" },
    { name: "Orders", path: "/orders", icon: "📋" },
    { name: "Inventory", path: "/inventory", icon: "📦" },
  ];

  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      {/* Sidebar */}
      <div className="w-72 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl">
            🍽️
          </div>
          <h1 className="text-2xl font-bold">Bella Vista</h1>
        </div>

        <nav className="space-y-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl text-lg transition-all ${
                location.pathname === item.path 
                  ? 'bg-amber-500 text-black font-medium' 
                  : 'hover:bg-zinc-800'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;