import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { Mail, Lock, ArrowRight, Loader2, User } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock User
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: email
    };
    const mockToken = 'mock_jwt_token_' + Date.now();

    // MERGE LOGIC
    const userCartKey = `cart_${mockUser.id}`;
    const userStoredCart = JSON.parse(localStorage.getItem(userCartKey) || '[]');
    
    const mergedMap = new Map();
    userStoredCart.forEach(item => mergedMap.set(item.id, { ...item }));
    
    cartItems.forEach(guestItem => {
      if (mergedMap.has(guestItem.id)) {
        const existing = mergedMap.get(guestItem.id);
        existing.quantity += guestItem.quantity;
      } else {
        mergedMap.set(guestItem.id, { ...guestItem });
      }
    });
    
    const finalCart = Array.from(mergedMap.values());
    localStorage.setItem(userCartKey, JSON.stringify(finalCart));
    localStorage.removeItem('cart');

    login(mockUser, mockToken);
    
    setIsLoading(false);

    const from = location.state?.from?.pathname || '/';
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100/50 overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="px-8 pt-10 pb-6 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
              <User size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Xoş gəldiniz!</h2>
            <p className="text-gray-500">
              Davam etmək üçün hesabınıza daxil olun
            </p>
          </div>
          
          {/* Form */}
          <div className="px-8 pb-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-4">
                {/* Email Input */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                    Email ünvanı
                  </label>
                  <div className="relative transition-all duration-300 focus-within:scale-[1.01]">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                      <Mail size={20} />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none placeholder:text-gray-400 font-medium"
                      placeholder="nümunə@email.com"
                    />
                  </div>
                </div>
                
                {/* Password Input */}
                <div className="group">
                  <div className="flex justify-between items-center mb-1.5 ml-1">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                      Şifrə
                    </label>
                    <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                      Şifrəni unutmusunuz?
                    </Link>
                  </div>
                  <div className="relative transition-all duration-300 focus-within:scale-[1.01]">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                      <Lock size={20} />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none placeholder:text-gray-400 font-medium"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-500/30 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin mr-2" />
                    Giriş edilir...
                  </>
                ) : (
                  <>
                    Daxil ol
                    <ArrowRight size={20} className="ml-2" />
                  </>
                )}
              </button>

              {/* Register Link */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Hesabınız yoxdur?{' '}
                  <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all">
                    Qeydiyyatdan keçin
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        
        {/* Footer info */}
        <p className="text-center text-xs text-gray-400 mt-8">
          &copy; {new Date().getFullYear()} Brendoo. Bütün hüquqlar qorunur.
        </p>
      </div>
    </div>
  );
}

export default Login;
