const Dashboard = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Good Morning, Chef 👋</h1>
        <div className="text-right">
          <p className="text-sm text-zinc-400">Monday, May 4th 2026</p>
          <p className="text-emerald-400 font-medium">Restaurant Open</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Today's Orders", value: "42", change: "+12%" },
          { label: "Revenue", value: "₹48,290", change: "+8%" },
          { label: "In Kitchen", value: "8", change: "3 ready" },
          { label: "Tables Occupied", value: "17/24", change: "71%" },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-900 p-6 rounded-3xl">
            <p className="text-zinc-400">{stat.label}</p>
            <p className="text-4xl font-bold mt-2">{stat.value}</p>
            <p className="text-emerald-400 text-sm mt-2">{stat.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;