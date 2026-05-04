import { useState } from 'react';
import { Plus, Edit, Trash2, Search, Users, Grid3x3 } from 'lucide-react';
import Modal from '../../components/Modal';

const TablePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [formData, setFormData] = useState({
    tableNumber: '',
    capacity: '',
    branchId: '',
    status: 'Available'
  });

  const [tables, setTables] = useState([
    { id: 1, tableNumber: 'T01', capacity: 4, branchId: '1', status: 'Available', currentOrder: null },
    { id: 2, tableNumber: 'T02', capacity: 2, branchId: '1', status: 'Occupied', currentOrder: '#1001' },
    { id: 3, tableNumber: 'T03', capacity: 6, branchId: '1', status: 'Available', currentOrder: null },
    { id: 4, tableNumber: 'T04', capacity: 4, branchId: '1', status: 'Reserved', currentOrder: null },
    { id: 5, tableNumber: 'T05', capacity: 8, branchId: '1', status: 'Available', currentOrder: null },
  ]);

  const branches = [
    { id: '1', name: 'Main Branch' },
    { id: '2', name: 'Downtown Branch' },
  ];

  const filteredTables = tables.filter(table =>
    table.tableNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    const colors = {
      Available: 'bg-green-100 text-green-700',
      Occupied: 'bg-red-100 text-red-700',
      Reserved: 'bg-yellow-100 text-yellow-700',
      Maintenance: 'bg-gray-100 text-gray-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const handleSaveTable = () => {
    if (editingTable) {
      setTables(tables.map(table =>
        table.id === editingTable.id ? { 
          ...table, 
          tableNumber: formData.tableNumber,
          capacity: parseInt(formData.capacity),
          branchId: formData.branchId,
          status: formData.status
        } : table
      ));
    } else {
      setTables([...tables, {
        id: Date.now(),
        tableNumber: formData.tableNumber,
        capacity: parseInt(formData.capacity),
        branchId: formData.branchId,
        status: formData.status,
        currentOrder: null
      }]);
    }
    setModalOpen(false);
    setFormData({ tableNumber: '', capacity: '', branchId: '', status: 'Available' });
    setEditingTable(null);
  };

  const handleDelete = () => {
    setTables(tables.filter(table => table.id !== selectedTable?.id));
    setDeleteModalOpen(false);
    setSelectedTable(null);
  };

  const updateTableStatus = (tableId, newStatus) => {
    setTables(tables.map(table =>
      table.id === tableId ? { ...table, status: newStatus } : table
    ));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Tables</h2>
          <p className="text-gray-600 text-sm mt-1">Manage restaurant tables and seating</p>
        </div>
        <button
          onClick={() => {
            setEditingTable(null);
            setFormData({ tableNumber: '', capacity: '', branchId: '', status: 'Available' });
            setModalOpen(true);
          }}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          Add Table
        </button>
      </div>

      <div className="max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search tables..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
          />
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTables.map((table) => (
          <div key={table.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white">
                    <Grid3x3 size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Table {table.tableNumber}</h3>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setEditingTable(table);
                      setFormData({
                        tableNumber: table.tableNumber,
                        capacity: table.capacity,
                        branchId: table.branchId,
                        status: table.status
                      });
                      setModalOpen(true);
                    }}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTable(table);
                      setDeleteModalOpen(true);
                    }}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users size={16} />
                  <span>Capacity: {table.capacity} people</span>
                </div>
                <div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(table.status)}`}>
                    {table.status}
                  </span>
                </div>
                {table.currentOrder && (
                  <p className="text-xs text-gray-500">Order: {table.currentOrder}</p>
                )}
              </div>

              {/* Status Quick Actions */}
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                {table.status !== 'Available' && (
                  <button
                    onClick={() => updateTableStatus(table.id, 'Available')}
                    className="flex-1 text-xs bg-green-50 text-green-600 hover:bg-green-100 px-2 py-1 rounded transition-colors"
                  >
                    Free Table
                  </button>
                )}
                {table.status === 'Available' && (
                  <button
                    onClick={() => updateTableStatus(table.id, 'Occupied')}
                    className="flex-1 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-2 py-1 rounded transition-colors"
                  >
                    Occupy
                  </button>
                )}
                <button
                  onClick={() => updateTableStatus(table.id, 'Reserved')}
                  className="flex-1 text-xs bg-yellow-50 text-yellow-600 hover:bg-yellow-100 px-2 py-1 rounded transition-colors"
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingTable ? "Edit Table" : "Add New Table"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Table Number *</label>
            <input
              type="text"
              value={formData.tableNumber}
              onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              placeholder="e.g., T01, Table 1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacity *</label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              placeholder="Number of seats"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Branch *</label>
            <select
              value={formData.branchId}
              onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              required
            >
              <option value="">Select branch</option>
              {branches.map(branch => (
                <option key={branch.id} value={branch.id}>{branch.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
            >
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Reserved">Reserved</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button onClick={handleSaveTable} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg transition-colors">
              {editingTable ? "Update" : "Save"}
            </button>
            <button onClick={() => setModalOpen(false)} className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 rounded-lg transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Table" size="sm">
        <div>
          <p className="text-gray-700 mb-4">Are you sure you want to delete Table {selectedTable?.tableNumber}?</p>
          <div className="flex gap-3">
            <button onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors">
              Delete
            </button>
            <button onClick={() => setDeleteModalOpen(false)} className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 rounded-lg transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TablePage;