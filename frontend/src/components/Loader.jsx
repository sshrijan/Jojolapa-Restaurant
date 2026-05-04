const Loader = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizes[size]} border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin`} />
    </div>
  );
};

export default Loader;