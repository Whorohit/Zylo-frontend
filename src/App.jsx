import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { Home } from './pages/Home';
import { Create } from './pages/Create';
import { Dashboard } from './pages/Dashboard';
import { Purchase } from './pages/Purchase';
import { Checkout } from './pages/Checkout';
import { Explore } from './pages/Explore';
import { Admin } from './pages/Admin';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssets } from './store/etherslice';
import ToastNotifications from './components/ToastNotifications';
import { logout, setauthdata } from './store/authslice';

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  // const { user: auth0User, isAuthenticated: isAuth0Authenticated } = useAuth0();
  const { isAuthenticated, token } = useSelector((state) => state.auth);

 const dispatch=useDispatch();
  // const setAuth0User = useAuthStore((state) => state.setAuth0User);

 
   const apiUrl = import.meta.env.VITE_API_URL;
  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/user/protected`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
      });

      const data = await response.json();

      if (data.success) {
        // console.log("✅ User Info:", data.user);

        // Dispatch user data to Redux store
        dispatch(setauthdata({ user: data.user, walletAddress: data.user.walletAddress || "" }));
      } else {
        console.error("🚨 Failed to fetch user info:", data.message);

        // If token is invalid or expired, log user out
        dispatch(logout());
      }
    } catch (error) {
      console.error("❌ Error fetching user info:", error);
      dispatch(logout());
    }
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchUserInfo(); // Fetch user info from backend after auth
    }
  }, [isAuthenticated, token]);
  return (
    <Router>
      <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-900 text-white' 
          : 'bg-sky-50 text-gray-900'
      }`}>
        <Navbar />
        <ToastNotifications/>
        <div className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/create" element={
              <ProtectedRoute>
                <Create />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/nft/:id" element={<Purchase />} />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;