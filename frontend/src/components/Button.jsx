const Button = ({ children, variant = "primary", size = "md", className = "", ...props }) => {
  const base = "font-semibold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/30",
    secondary: "bg-zinc-800 hover:bg-zinc-700 text-white",
    outline: "border border-amber-500 text-amber-500 hover:bg-amber-500/10",
    ghost: "hover:bg-zinc-100 dark:hover:bg-zinc-800"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;