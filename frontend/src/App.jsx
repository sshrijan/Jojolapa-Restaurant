import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import DashboardLayout from './layouts/DashboardLayout';

import Dashboard from './pages/dashboard/Dashboard';
import MenuList from './pages/menu/MenuList';
import CreateMenuItem from './pages/menu/CreateMenuItem';
import EditMenuItem from './pages/menu/EditMenuItem';
import CategoryPage from './pages/category/CategoryPage';
import OrderList from './pages/orders/OrderList';
import OrderDetails from './pages/orders/OrderDetails';
import IngredientPage from './pages/inventory/IngredientPage';

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="menu" element={<MenuList />} />
        <Route path="menu/new" element={<CreateMenuItem />} />
        <Route path="menu/edit/:id" element={<EditMenuItem />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="orders/:id" element={<OrderDetails />} />
        <Route path="inventory" element={<IngredientPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;