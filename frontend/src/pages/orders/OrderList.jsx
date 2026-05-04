import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Search } from 'lucide-react';

const OrderList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const orders = [
    { id: '#1001', customer: 'Shrijan Shrestha', table: 'T01', items: 3, total: 45.50, status: 'Completed', time: '10:30 AM', date: '2024-01-15' },
    { id: '#1002', customer: 'Abhishek Shakya', table: 'T02', items: 2, total: 28.00, status: 'Processing', time: '11:15 AM', date: '2024-01-15' },
    { id: '#1003', customer: 'Pranil Barahi', table: 'T03', items: 4, total: 67.25, status: 'Pending', time: '11:45 AM', date: '2024-01-15' },
    { id: '#1004', customer: 'Sachin Mali', table: 'T01', items: 1, total: 12.50, status: 'Completed', time: '12:00 PM', date: '2024-01-14' },
    { id: '#1005', customer: 'Sasin Maharjan', table: 'T04', items: 2, total: 34.00, status: 'Cancelled', time: '01:30 PM', date: '2024-01-14' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Completed: 'bg-green-100 text-green-700',
      Processing: 'bg-blue-100 text-blue-700',
      Pending: 'bg-yellow-100 text-yellow-700',
      Cancelled: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.table.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || order.status.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
        <p className="text-gray-600 text-sm mt-1">Manage and track customer orders</p>
      </div>

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
                  <td className="px-5 py-3 text-sm font-semibold text-gray-900">${order.total.toFixed(2)}</td>
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
    </div>
  );
};

export default OrderList;