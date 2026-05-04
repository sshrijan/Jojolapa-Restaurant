import { useParams } from 'react-router-dom';
import Button from '../../components/Button';

const OrderDetails = () => {
  const { id } = useParams();

  // Mock data
  const order = {
    id: id || "ORD-7842",
    table: "T05",
    customer: "Rahul Sharma",
    phone: "+91 98765 43210",
    status: "Preparing",
    time: "10 minutes ago",
    total: 1850,
    items: [
      { name: "Truffle Margherita Pizza", qty: 1, price: 890 },
      { name: "Butter Chicken", qty: 1, price: 650 },
      { name: "Coke", qty: 2, price: 80 },
    ]
  };

  return (
    <div className="p-6 md:p-10 bg-zinc-950 min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Order Details</h1>
            <p className="text-zinc-400">{order.id} • {order.time}</p>
          </div>
          <span className="px-6 py-2 bg-yellow-500 text-black rounded-2xl font-semibold">
            {order.status}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2 bg-zinc-900 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-6">Order Items</h2>
            
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between py-4 border-b border-zinc-800 last:border-0">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-zinc-400 text-sm">Qty: {item.qty}</p>
                </div>
                <p className="font-semibold">₹{item.price * item.qty}</p>
              </div>
            ))}

            <div className="flex justify-between text-xl font-bold mt-8 pt-6 border-t border-zinc-700">
              <span>Total Amount</span>
              <span>₹{order.total}</span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-zinc-900 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-6">Customer Info</h2>
            <div className="space-y-4">
              <div>
                <p className="text-zinc-400 text-sm">Name</p>
                <p className="font-medium">{order.customer}</p>
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Table</p>
                <p className="font-medium text-2xl">{order.table}</p>
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Phone</p>
                <p className="font-medium">{order.phone}</p>
              </div>
            </div>

            <div className="mt-10 space-y-3">
              <Button variant="primary" className="w-full py-4 text-lg">
                Mark as Ready
              </Button>
              <Button variant="secondary" className="w-full py-4 text-lg">
                Mark as Delivered
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;