const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange,
  required = false,
  className = ''
}) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all ${className}`}
      />
    </div>
  );
};

export default Input;