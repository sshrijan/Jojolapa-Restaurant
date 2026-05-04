import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Transparent backdrop - changed from bg-black bg-opacity-50 */}
        <div className="fixed inset-0" onClick={onClose} />
        
        <div className={`relative bg-white rounded-2xl shadow-xl w-full ${sizes[size]} transform transition-all`}>
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;