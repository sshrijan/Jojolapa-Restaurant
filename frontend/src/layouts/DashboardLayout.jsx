import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      {/* Sidebar */}
      <div className="w-72 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-xl font-bold">
            🍽️
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Bella Vista</h1>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { name: "Dashboard", icon: "📊" },
            { name: "Menu", icon: "🍝" },
            { name: "Categories", icon: "📂" },
            { name: "Orders", icon: "📋" },
            { name: "Inventory", icon: "📦" },
          ].map((item) => (
            <a
              key={item.name}
              href="#"
              className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-zinc-800 transition-all text-lg"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </a>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-700 rounded-full"></div>
            <div>
              <p className="font-medium">Admin User</p>
              <p className="text-xs text-zinc-500">Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;