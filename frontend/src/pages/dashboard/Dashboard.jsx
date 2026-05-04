import { ShoppingCart, Utensils, Package, DollarSign, TrendingUp, Users } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Orders', value: '156', icon: ShoppingCart, color: 'bg-orange-500', change: '+12%' },
    { label: 'Revenue', value: '$3,240', icon: DollarSign, color: 'bg-green-500', change: '+8%' },
    { label: 'Menu Items', value: '48', icon: Utensils, color: 'bg-amber-500', change: '+3' },
    { label: 'Customers', value: '892', icon: Users, color: 'bg-blue-500', change: '+15%' },
  ];

  const recentOrders = [
    { id: '#1001', customer: 'John Doe', total: '$45.50', status: 'Completed', time: '10:30 AM' },
    { id: '#1002', customer: 'Jane Smith', total: '$28.00', status: 'Processing', time: '11:15 AM' },
    { id: '#1003', customer: 'Mike Johnson', total: '$67.25', status: 'Pending', time: '11:45 AM' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Completed: 'bg-green-100 text-green-700',
      Processing: 'bg-blue-100 text-blue-700',
      Pending: 'bg-yellow-100 text-yellow-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-600 text-sm mt-1">Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`${stat.color} p-2 rounded-lg text-white`}>
                <stat.icon size={20} />
              </div>
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-gray-900">{order.total}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-500">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;