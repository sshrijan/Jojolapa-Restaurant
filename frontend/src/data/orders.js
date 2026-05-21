// src/data/orders.js
export const orders = [
  {
    id: '#1001',
    customer: 'Shrijan Shrestha',
    email: 'shrijan@example.com',
    phone: '+977 9841234567',
    table: { number: 'T01', capacity: 4 },
    date: '2024-01-15',
    time: '10:30 AM',
    status: 'Completed',
    paymentMethod: 'Cash',
    note: 'Extra spicy please',
    items: [
      { name: 'Chicken Biryani', quantity: 2, price: 1250, total: 2500 },
      { name: 'Momo', quantity: 6, price: 180, total: 1080 },
      { name: 'Coke', quantity: 1, price: 150, total: 150 }
    ],
    subtotal: 3730,
    tax: 373,
    total: 4103.5
  },
  {
    id: '#1002',
    customer: 'Abhishek Shakya',
    email: 'abhishek@example.com',
    phone: '+977 9841234568',
    table: { number: 'T02', capacity: 2 },
    date: '2024-01-15',
    time: '11:15 AM',
    status: 'Processing',
    paymentMethod: 'Card',
    note: '',
    items: [
      { name: 'Pizza Margherita', quantity: 1, price: 850, total: 850 },
      { name: 'Garlic Bread', quantity: 1, price: 220, total: 220 }
    ],
    subtotal: 1070,
    tax: 107,
    total: 1177
  },
  {
    id: '#1003',
    customer: 'Pranil Barahi',
    email: 'pranil@example.com',
    phone: '+977 9841234569',
    table: { number: 'T03', capacity: 6 },
    date: '2024-01-15',
    time: '11:45 AM',
    status: 'Pending',
    paymentMethod: 'Cash',
    note: 'Table near window',
    items: [
      { name: 'Buff Chowmein', quantity: 2, price: 650, total: 1300 },
      { name: 'Spring Roll', quantity: 4, price: 180, total: 720 },
      { name: 'Lassi', quantity: 2, price: 180, total: 360 }
    ],
    subtotal: 2380,
    tax: 238,
    total: 2618
  },
  {
    id: '#1004',
    customer: 'Sachin Mali',
    email: 'sachin@example.com',
    phone: '+977 9841234570',
    table: { number: 'T01', capacity: 4 },
    date: '2024-01-14',
    time: '12:00 PM',
    status: 'Completed',
    paymentMethod: 'Cash',
    note: '',
    items: [
      { name: 'Dal Bhat', quantity: 1, price: 890, total: 890 }
    ],
    subtotal: 890,
    tax: 89,
    total: 979
  },
  {
    id: '#1005',
    customer: 'Sasin Maharjan',
    email: 'sasin@example.com',
    phone: '+977 9841234571',
    table: { number: 'T04', capacity: 4 },
    date: '2024-01-14',
    time: '01:30 PM',
    status: 'Cancelled',
    paymentMethod: 'Card',
    note: 'Customer cancelled order',
    items: [
      { name: 'Fried Rice', quantity: 2, price: 650, total: 1300 }
    ],
    subtotal: 1300,
    tax: 130,
    total: 1430
  }
];