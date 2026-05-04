import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Utensils, 
  Package, 
  ShoppingCart, 
  Tags, 
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Grid3x3
} from 'lucide-react';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/menu', icon: Utensils, label: 'Menu' },
    { path: '/dashboard/categories', icon: Tags, label: 'Categories' },
    { path: '/dashboard/tables', icon: Grid3x3, label: 'Tables' },
    { path: '/dashboard/orders', icon: ShoppingCart, label: 'Orders' },
    { path: '/dashboard/inventory', icon: Package, label: 'Inventory' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  // Desktop Sidebar Content
  const DesktopSidebarContent = () => (
    <>
      <div className="flex items-center justify-between p-4 border-b border-amber-700">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🍽️</span>
          {sidebarOpen && <span className="font-bold text-lg">Jojolapa Kitchen</span>}
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1 hover:bg-amber-700 rounded-lg transition-colors"
        >
          {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-amber-700 transition-colors group"
              >
                <item.icon size={20} />
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
                {!sidebarOpen && (
                  <div className="absolute left-14 hidden group-hover:block bg-gray-900 text-white px-2 py-1 rounded text-sm whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-amber-700">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-amber-700 transition-colors w-full"
        >
          <LogOut size={20} />
          {sidebarOpen && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </>
  );

  // Mobile Sidebar Content
  const MobileSidebarContent = () => (
    <>
      <div className="flex items-center justify-between p-4 border-b border-amber-700">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🍽️</span>
          <span className="font-bold text-lg">Jojolapa</span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="p-1 hover:bg-amber-700 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-amber-700 transition-colors group"
              >
                <item.icon size={20} />
                <span className="text-sm">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-amber-700">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-amber-700 transition-colors w-full"
        >
          <LogOut size={20} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      <div 
        className={`fixed top-0 left-0 z-50 h-full w-72 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full bg-gradient-to-b from-amber-900 to-amber-800 text-white overflow-y-auto shadow-xl">
          <MobileSidebarContent />
        </div>
      </div>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-gradient-to-b from-amber-900 to-amber-800 text-white ${sidebarOpen ? 'w-64' : 'w-20'} hidden md:block`}>
        <div className="h-full overflow-y-auto">
          <DesktopSidebarContent />
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg md:text-2xl font-semibold text-gray-800">Welcome back, Admin!</h1>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;