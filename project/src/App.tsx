import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import StockDetail from './pages/StockDetail';
import Watchlist from './pages/Watchlist';
import Portfolio from './pages/Portfolio';
import Alerts from './pages/Alerts';
import Forum from './pages/Forum';
import Settings from './pages/Settings';
import ApiTest from './components/Test/ApiTest';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/api-test" element={<ApiTest />} />
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/stock/:symbol" element={<StockDetail />} />
                  <Route path="/watchlist" element={<Watchlist />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/alerts" element={<Alerts />} />
                  <Route path="/forum" element={<Forum />} />
                  <Route path="/settings" element={<Settings />} />
                  {/* Add more routes here as we build them */}
                </Routes>
              </Layout>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;