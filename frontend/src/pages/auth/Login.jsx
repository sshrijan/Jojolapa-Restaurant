import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Eye, EyeOff } from 'lucide-react';   // Make sure to install lucide-react

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.email && formData.password) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    } else {
      setError("Please fill all fields");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center text-7xl shadow-xl shadow-amber-500/30 mb-6">
            🍽️
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Jojolapa Kitchen</h1>
          <p className="text-gray-600 mt-2">Restaurant Management System</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200 p-10">
          <h2 className="text-3xl font-semibold text-center mb-8">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="admin@jojolapa.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-5 py-3.5 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              className="w-full py-4 text-lg"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-amber-600 font-medium hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;