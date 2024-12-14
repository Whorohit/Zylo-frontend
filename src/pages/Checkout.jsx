import React from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { useCartStore } from '../store/useCartStore';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, CreditCard, Shield, AlertCircle } from 'lucide-react';

export const Checkout = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { items, totalItems, removeFromCart, clearCart } = useCartStore();
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.price, 0);
  const fees = total * 0.025; // 2.5% platform fee

  const handleCheckout = () => {
    // Handle payment processing here
    clearCart();
    navigate('/dashboard');
  };

  if (items.length === 0) {
    return (
      <div className={`min-h-screen py-12 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-sky-50 via-sky-100 to-sky-50'
      }`}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingCart className={`w-16 h-16 mx-auto mb-4 ${
            isDarkMode ? 'text-gray-600' : 'text-gray-400'
          }`} />
          <h2 className={`text-2xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Your cart is empty</h2>
          <p className={`mb-6 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Add some NFTs to your cart and come back to complete your purchase.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Browse NFTs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-sky-50 via-sky-100 to-sky-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-sky-900'
          }`}>Checkout</h1>
          <p className={`text-xl ${
            isDarkMode ? 'text-gray-300' : 'text-sky-700'
          }`}>Complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Cart Items */}
          <div className="space-y-6">
            <div className={`p-6 rounded-2xl ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            } shadow-lg`}>
              <h2 className={`text-xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Cart Items ({totalItems})</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{item.name}</h3>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-sky-400' : 'text-sky-500'
                      }`}>{item.price} ETH</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        isDarkMode
                          ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                          : 'bg-red-50 text-red-500 hover:bg-red-100'
                      }`}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-2xl ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            } shadow-lg`}>
              <div className="flex items-start space-x-3">
                <Shield className={`w-5 h-5 mt-0.5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <div>
                  <h3 className={`font-medium mb-1 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Secure Transaction</h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Your payment information is encrypted and secure. We never store your credit card details.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment */}
          <div className="space-y-6">
            <div className={`p-6 rounded-2xl ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            } shadow-lg`}>
              <h2 className={`text-xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Payment Details</h2>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-xl ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}>
                  <div className="flex justify-between mb-2">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                      Subtotal
                    </span>
                    <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                      {total.toFixed(3)} ETH
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                      Platform Fee (2.5%)
                    </span>
                    <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                      {fees.toFixed(3)} ETH
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Total</span>
                    <span className={`font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {(total + fees).toFixed(3)} ETH
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <CreditCard className={`w-5 h-5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <span className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Payment Method</span>
                  </div>
                  <div className="space-y-4">
                    <div className={`flex items-center p-3 rounded-lg border-2 ${
                      isDarkMode 
                        ? 'border-sky-500 bg-sky-500/10' 
                        : 'border-sky-500 bg-sky-50'
                    }`}>
                      <input
                        type="radio"
                        id="crypto"
                        name="payment"
                        checked
                        readOnly
                        className="hidden"
                      />
                      <label
                        htmlFor="crypto"
                        className={`flex-1 font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        Crypto Wallet
                      </label>
                      <span className={`text-sm ${
                        isDarkMode ? 'text-sky-400' : 'text-sky-600'
                      }`}>Connected</span>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-xl ${
                  isDarkMode ? 'bg-yellow-500/10' : 'bg-yellow-50'
                } flex items-start space-x-3`}>
                  <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <p className={`text-sm ${
                    isDarkMode ? 'text-yellow-200' : 'text-yellow-700'
                  }`}>
                    Please ensure your wallet has sufficient funds to complete this transaction.
                  </p>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  <span>Complete Purchase</span>
                  <CreditCard className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};