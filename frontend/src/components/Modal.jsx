const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-lg shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b dark:border-zinc-700">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-3xl text-zinc-400 hover:text-zinc-600">×</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;