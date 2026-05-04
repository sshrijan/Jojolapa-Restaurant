// components/Input.jsx
const Input = ({ label, className = "", ...props }) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700 block">
          {label}
        </label>
      )}
      <input
        className={`w-full px-5 py-3.5 
          bg-white 
          border border-gray-300 
          rounded-2xl 
          focus:outline-none 
          focus:border-amber-500 
          focus:ring-2 
          focus:ring-amber-200 
          transition-all
          text-gray-900
          placeholder:text-gray-400
          ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;