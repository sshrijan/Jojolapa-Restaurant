import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Search, Plus, Minus, ShoppingCart } from 'lucide-react';
import Modal from '../../components/Modal'; // Adjust the import path as needed

const OrderList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [orders, setOrders] = useState([
    { id: '#1001', customer: 'Shrijan Shrestha', table: 'T01', items: 3, total: 45.50, status: 'Completed', time: '10:30 AM', date: '2024-01-15', orderItems: [] },
    { id: '#1002', customer: 'Abhishek Shakya', table: 'T02', items: 2, total: 28.00, status: 'Processing', time: '11:15 AM', date: '2024-01-15', orderItems: [] },
    { id: '#1003', customer: 'Pranil Barahi', table: 'T03', items: 4, total: 67.25, status: 'Pending', time: '11:45 AM', date: '2024-01-15', orderItems: [] },
    { id: '#1004', customer: 'Sachin Mali', table: 'T01', items: 1, total: 12.50, status: 'Completed', time: '12:00 PM', date: '2024-01-14', orderItems: [] },
    { id: '#1005', customer: 'Sasin Maharjan', table: 'T04', items: 2, total: 34.00, status: 'Cancelled', time: '01:30 PM', date: '2024-01-14', orderItems: [] },
  ]);

  const [showOrderForm, setShowOrderForm] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    tableNumber: '',
    items: [],
    status: 'Pending'
  });

  // Menu items data
  const menuItems = [
    { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: 12.99 },
    { id: 2, name: 'Pepperoni Pizza', category: 'Pizza', price: 14.99 },
    { id: 3, name: 'Caesar Salad', category: 'Salad', price: 8.99 },
    { id: 4, name: 'Chicken Burger', category: 'Burger', price: 10.99 },
    { id: 5, name: 'French Fries', category: 'Sides', price: 4.99 },
    { id: 6, name: 'Coca Cola', category: 'Beverages', price: 2.99 },
    { id: 7, name: 'Iced Tea', category: 'Beverages', price: 3.49 },
    { id: 8, name: 'Chocolate Cake', category: 'Dessert', price: 6.99 },
    { id: 9, name: 'Pasta Alfredo', category: 'Pasta', price: 13.99 },
    { id: 10, name: 'Garlic Bread', category: 'Sides', price: 4.49 },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  const getStatusColor = (status) => {
    const colors = {
      Completed: 'bg-green-100 text-green-700',
      Processing: 'bg-blue-100 text-blue-700',
      Pending: 'bg-yellow-100 text-yellow-700',
      Cancelled: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const addItemToOrder = (menuItem) => {
    const existingItem = newOrder.items.find(item => item.id === menuItem.id);
    if (existingItem) {
      setNewOrder({
        ...newOrder,
        items: newOrder.items.map(item =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      });
    } else {
      setNewOrder({
        ...newOrder,
        items: [...newOrder.items, { ...menuItem, quantity: 1 }]
      });
    }
  };

  const removeItemFromOrder = (itemId) => {
    const existingItem = newOrder.items.find(item => item.id === itemId);
    if (existingItem.quantity > 1) {
      setNewOrder({
        ...newOrder,
        items: newOrder.items.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      });
    } else {
      setNewOrder({
        ...newOrder,
        items: newOrder.items.filter(item => item.id !== itemId)
      });
    }
  };

  const calculateTotal = () => {
    return newOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    
    if (!newOrder.customerName || !newOrder.tableNumber || newOrder.items.length === 0) {
      alert('Please fill all fields and add at least one item');
      return;
    }

    const newOrderObj = {
      id: `#${Math.floor(Math.random() * 9000 + 1000)}`,
      customer: newOrder.customerName,
      table: newOrder.tableNumber,
      items: newOrder.items.reduce((sum, item) => sum + item.quantity, 0),
      total: calculateTotal(),
      status: newOrder.status,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString().split('T')[0],
      orderItems: newOrder.items
    };

    setOrders([newOrderObj, ...orders]);
    setShowOrderForm(false);
    setNewOrder({
      customerName: '',
      tableNumber: '',
      items: [],
      status: 'Pending'
    });
    
    alert('Order placed successfully!');
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.table.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || order.status.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  // Available tables (you can customize this)
  const availableTables = ['T01', 'T02', 'T03', 'T04', 'T05', 'T06', 'T07', 'T08', 'T09', 'T10'];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
          <p className="text-gray-600 text-sm mt-1">Manage and track customer orders</p>
        </div>
        <button
          onClick={() => setShowOrderForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
        >
          <Plus size={18} />
          New Order
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by order ID, customer, or table..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            />
          </div>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Table</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-5 py-3 text-sm font-medium text-amber-600">{order.table}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{order.items}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-gray-900">Rs. {order.total.toFixed(2)}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                   </td>
                  <td className="px-5 py-3 text-sm text-gray-500">{order.date}</td>
                  <td className="px-5 py-3">
                    <Link to={`/dashboard/orders/${order.id.slice(1)}`}>
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                    </Link>
                   </td>
                 </tr>
              ))}
            </tbody>
           </table>
        </div>
      </div>

      {/* Add Order Modal - Using reusable Modal component */}
      <Modal
        isOpen={showOrderForm}
        onClose={() => setShowOrderForm(false)}
        title={
          <div className="flex items-center gap-2">
            <ShoppingCart size={24} className="text-amber-500" />
            <span>New Order</span>
          </div>
        }
        size="xl"
      >
        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Order Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={newOrder.customerName}
                  onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                  placeholder="Enter customer name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Table Number *
                </label>
                <select
                  required
                  value={newOrder.tableNumber}
                  onChange={(e) => setNewOrder({...newOrder, tableNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                >
                  <option value="">Select table</option>
                  {availableTables.map(table => (
                    <option key={table} value={table}>{table}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Status
                </label>
                <select
                  value={newOrder.status}
                  onChange={(e) => setNewOrder({...newOrder, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Order Summary */}
              {newOrder.items.length > 0 && (
                <div className="mt-6 border-t pt-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Order Summary</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {newOrder.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-500 ml-2">x{item.quantity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                          <button
                            type="button"
                            onClick={() => removeItemFromOrder(item.id)}
                            className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-amber-600">Rs. {calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Menu Items */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Menu Items *
              </label>
              
              {/* Category Filter */}
              <div className="flex gap-2 mb-3 overflow-x-auto pb-2 custom-scrollbar">
                {categories.map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                {menuItems
                  .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
                  .map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">Rs. {item.price.toFixed(2)}</p>
                        <p className="text-xs text-gray-400">{item.category}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => addItemToOrder(item)}
                        className="px-3 py-1 bg-amber-500 text-white rounded-lg hover:bg-amber-600 text-sm font-medium transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowOrderForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium"
            >
              Place Order
            </button>
          </div>
        </form>
      </Modal>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default OrderList;