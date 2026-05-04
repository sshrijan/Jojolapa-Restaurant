// pages/auth/Login.jsx

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-6 rounded shadow w-full max-w-sm">
        
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3 rounded"
        />

        <button className="w-full bg-black text-white p-2 rounded">
          Login
        </button>

      </div>
    </div>
  );
};

export default Login;