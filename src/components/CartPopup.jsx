import React from 'react';
import { useCartStore } from '../store/useCartStore';
import { useThemeStore } from '../store/useThemeStore';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CartPopup = ({ isOpen, onClose }) => {
  const { items, totalItems, removeFromCart, clearCart } = useCartStore();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-md h-screen ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      } shadow-2xl transform transition-transform duration-300 ease-in-out`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <ShoppingCart className={`w-6 h-6 mr-2 ${
                isDarkMode ? 'text-sky-400' : 'text-sky-500'
              }`} />
              <h2 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Your Cart ({totalItems})</h2>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-800 text-gray-400' 
                  : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <ShoppingCart className={`w-16 h-16 mb-4 ${
                isDarkMode ? 'text-gray-700' : 'text-gray-300'
              }`} />
              <p className={`text-lg font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center p-4 rounded-xl ${
                      isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{item.name}</h3>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-sky-400' : 'text-sky-500'
                      }`}>{item.price} ETH</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className={`p-2 rounded-full transition-colors ${
                        isDarkMode 
                          ? 'hover:bg-gray-700 text-gray-400' 
                          : 'hover:bg-gray-200 text-gray-500'
                      }`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className={`mt-6 pt-6 border-t ${
                isDarkMode ? 'border-gray-800' : 'border-gray-200'
              }`}>
                <div className="flex justify-between mb-4">
                  <span className={`font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Total</span>
                  <span className={`font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{total.toFixed(3)} ETH</span>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Checkout
                  </button>
                  <button
                    onClick={clearCart}
                    className={`w-full py-3 rounded-xl font-medium transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};