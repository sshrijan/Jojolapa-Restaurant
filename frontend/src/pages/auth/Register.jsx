import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      alert("Account created successfully! Please login.");
      navigate('/login');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center text-7xl shadow-xl shadow-amber-500/30 mb-6">
            🍽️
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Jojolapa Kitchen</h1>
          <p className="text-gray-600 mt-2">Create New Account</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200 p-10">
          <h2 className="text-3xl font-semibold text-center mb-8">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full Name"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="admin@jojolapa.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                  required
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

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-amber-600 font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;