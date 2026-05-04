import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Menu", path: "/dashboard/menu", icon: "🍝" },
    { name: "Categories", path: "/dashboard/categories", icon: "📂" },
    { name: "Orders", path: "/dashboard/orders", icon: "📋" },
    { name: "Inventory", path: "/dashboard/inventory", icon: "📦" },
  ];

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      navigate('/');
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col">
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
            🍽️
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Bella Vista</h1>
            <p className="text-xs text-amber-400 -mt-1">Restaurant</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl text-[17px] font-medium transition-all ${
                  isActive 
                    ? 'bg-amber-500 text-black shadow-md' 
                    : 'hover:bg-zinc-800 text-zinc-300'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="mt-auto pt-6 border-t border-zinc-800">
          <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-zinc-800/50">
            <div className="w-10 h-10 bg-gradient-to-br from-zinc-600 to-zinc-700 rounded-full flex items-center justify-center text-xl">
              👨‍💼
            </div>
            <div className="flex-1">
              <p className="font-medium">Admin User</p>
              <p className="text-xs text-zinc-500">Restaurant Manager</p>
            </div>
          </div>

          <Button
            variant="secondary"
            size="md"
            className="w-full mt-4"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-zinc-950">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;