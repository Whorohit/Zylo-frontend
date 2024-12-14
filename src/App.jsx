```jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuthStore } from './store/useAuthStore';
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

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { user: auth0User, isAuthenticated: isAuth0Authenticated } = useAuth0();
  const setAuth0User = useAuthStore((state) => state.setAuth0User);

  useEffect(() => {
    if (isAuth0Authenticated && auth0User) {
      setAuth0User(auth0User);
    }
  }, [isAuth0Authenticated, auth0User, setAuth0User]);

  return (
    <Router>
      <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-900 text-white' 
          : 'bg-sky-50 text-gray-900'
      }`}>
        <Navbar />
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
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <Admin />
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
```