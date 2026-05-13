import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/slices/authSlice';
import { motion } from 'framer-motion';
import { Lock, User as UserIcon, Loader2, Eye, EyeOff } from 'lucide-react';
import { useToast } from '../components/Toast';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const { isAuthenticated, error, status } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.promise(
            dispatch(login(credentials)).unwrap(),
            {
                loading: 'Authenticating...',
                success: 'Welcome back, Admin!',
                error: (err) => `Login failed: ${err || 'Invalid credentials'}`,
            }
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-dark grid-overlay">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="glass w-full max-w-md p-10 rounded-3xl shadow-2xl relative overflow-hidden"
                style={{ perspective: "1000px" }}
            >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
                
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
                        <Lock size={32} className="text-primary" />
                    </div>
                    <h1 className="text-3xl font-black mb-2">Admin Portal</h1>
                    <p className="text-gray-500">Secure access to your portfolio</p>
                </div>



                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest">Username</label>
                        <div className="relative">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                            <input
                                type="text"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                placeholder="Enter admin username"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-primary transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="btn-primary w-full py-5 text-lg font-black flex items-center justify-center gap-3"
                    >
                        {status === 'loading' ? (
                            <Loader2 size={24} className="animate-spin" />
                        ) : 'ACCESS DASHBOARD'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
