import { useState } from 'react';
import Button from '../../components/Button';

const OrderList = () => {
  const [statusFilter, setStatusFilter] = useState('All');

  const orders = [
    { id: "ORD-7842", table: "T05", customer: "Rahul Sharma", items: 3, amount: 1850, status: "Preparing", time: "10 min ago" },
    { id: "ORD-7841", table: "T12", customer: "Priya Patel", items: 2, amount: 920, status: "Ready", time: "22 min ago" },
    { id: "ORD-7840", table: "T03", customer: "Aman Khan", items: 4, amount: 2450, status: "Delivered", time: "45 min ago" },
    { id: "ORD-7839", table: "T08", customer: "Sneha Gupta", items: 1, amount: 650, status: "Preparing", time: "1 hr ago" },
  ];

  const filteredOrders = statusFilter === 'All' 
    ? orders 
    : orders.filter(o => o.status === statusFilter);

  const getStatusColor = (status) => {
    if (status === "Preparing") return "bg-yellow-500";
    if (status === "Ready") return "bg-emerald-500";
    if (status === "Delivered") return "bg-zinc-500";
    return "bg-blue-500";
  };

  return (
    <div className="p-6 md:p-8 bg-zinc-950 min-h-screen text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Orders</h1>
        <div className="flex gap-3">
          {['All', 'Preparing', 'Ready', 'Delivered'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-5 py-2 rounded-2xl text-sm font-medium transition-all ${
                statusFilter === status ? 'bg-amber-500 text-black' : 'bg-zinc-900 hover:bg-zinc-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left p-6">Order ID</th>
              <th className="text-left p-6">Table</th>
              <th className="text-left p-6">Customer</th>
              <th className="text-left p-6">Items</th>
              <th className="text-left p-6">Amount</th>
              <th className="text-left p-6">Status</th>
              <th className="text-left p-6">Time</th>
              <th className="p-6"></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition">
                <td className="p-6 font-medium">{order.id}</td>
                <td className="p-6">{order.table}</td>
                <td className="p-6">{order.customer}</td>
                <td className="p-6">{order.items} items</td>
                <td className="p-6 font-semibold">₹{order.amount}</td>
                <td className="p-6">
                  <span className={`${getStatusColor(order.status)} text-black px-4 py-1 rounded-full text-sm font-medium`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-6 text-zinc-400">{order.time}</td>
                <td className="p-6">
                  <Button variant="outline" size="sm">View Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;