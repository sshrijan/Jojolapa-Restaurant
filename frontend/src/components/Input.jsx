const Input = ({ label, ...props }) => {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>}
      <input
        className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:border-amber-500 transition-all"
        {...props}
      />
    </div>
  );
};

export default Input;