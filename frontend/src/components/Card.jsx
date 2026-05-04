const Card = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;