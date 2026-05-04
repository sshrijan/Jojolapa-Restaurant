import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, CheckCircle, MapPin } from 'lucide-react';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = {
    id: `#${id}`,
    customer: 'John Doe',
    email: 'john@example.com',
    phone: '+62 812 3456 7890',
    table: { number: 'T01', capacity: 4 },
    date: '2024-01-15',
    time: '10:30 AM',
    status: 'Processing',
    items: [
      { name: 'Nasi Goreng', quantity: 2, price: 25000, total: 50000 },
      { name: 'Mie Ayam', quantity: 1, price: 22000, total: 22000 },
      { name: 'Es Teh Manis', quantity: 2, price: 8000, total: 16000 },
    ],
    subtotal: 88000,
    tax: 8800,
    total: 96800,
    paymentMethod: 'Cash',
    note: 'Extra spicy for Nasi Goreng'
  };

  const updateStatus = (newStatus) => {
    console.log('Updating status to:', newStatus);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
          <ArrowLeft size={20} />
          Back
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
          <Printer size={18} />
          Print
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Order {order.id}</h2>
              <p className="text-gray-500 text-sm mt-1">Placed on {order.date} at {order.time}</p>
            </div>
            <div className="flex gap-2">
              <select
                value={order.status}
                onChange={(e) => updateStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              {order.status !== 'Completed' && (
                <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <CheckCircle size={18} />
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Customer Information</h3>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-500">Name:</span> {order.customer}</p>
                <p><span className="text-gray-500">Email:</span> {order.email}</p>
                <p><span className="text-gray-500">Phone:</span> {order.phone}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Table Information</h3>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-400" />
                  <p><span className="text-gray-500">Table Number:</span> <span className="font-medium text-amber-600">{order.table.number}</span></p>
                </div>
                <p><span className="text-gray-500">Capacity:</span> {order.table.capacity} people</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Order Information</h3>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-500">Payment Method:</span> {order.paymentMethod}</p>
                <p><span className="text-gray-500">Status:</span> 
                  <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700`}>
                    {order.status}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-gray-800 mb-3">Order Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full mb-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Item</th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">Quantity</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Price</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-gray-800">{item.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-600 text-center">{item.quantity}</td>
                    <td className="px-4 py-2 text-sm text-gray-600 text-right">Rp {item.price.toLocaleString()}</td>
                    <td className="px-4 py-2 text-sm font-semibold text-gray-800 text-right">Rp {item.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-gray-200">
                <tr>
                  <td colSpan="3" className="px-4 py-2 text-sm text-gray-600 text-right">Subtotal:</td>
                  <td className="px-4 py-2 text-sm text-gray-800 text-right">Rp {order.subtotal.toLocaleString()}</td>
                </tr>
                <tr>
                  <td colSpan="3" className="px-4 py-2 text-sm text-gray-600 text-right">Tax (10%):</td>
                  <td className="px-4 py-2 text-sm text-gray-800 text-right">Rp {order.tax.toLocaleString()}</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td colSpan="3" className="px-4 py-2 text-base font-bold text-gray-800 text-right">Total:</td>
                  <td className="px-4 py-2 text-base font-bold text-amber-600 text-right">Rp {order.total.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {order.note && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-1">Order Notes</h4>
              <p className="text-sm text-gray-600">{order.note}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;