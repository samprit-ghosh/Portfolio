import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import { ToastProvider } from './components/Toast';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ToastProvider>
          <div className="min-h-screen bg-dark text-white">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </div>
        </ToastProvider>
      </Router>
    </Provider>
  );
}

export default App;
