import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = ['Home', 'About', 'Services', 'Skills', 'Projects', 'Contact'];
    const isHome = location.pathname === '/';

    const handleScrollTo = (id) => {
        setIsOpen(false);
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="fixed w-full z-50 transition-all duration-500"
            style={{
                background: scrolled ? 'rgba(8,12,16,0.85)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(249,115,22,0.08)' : 'none',
                boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
            }}
        >
            <div className="max-w-7xl mx-auto px-6 py-3 md:py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-lg md:text-2xl font-black tracking-tight">
                    <span className="gradient-text">Samprit</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)' }}>.</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {isHome && navLinks.map((link) => (
                        <button
                            key={link}
                            onClick={() => handleScrollTo(link)}
                            className="text-base font-semibold tracking-wide transition-all duration-300 relative group"
                            style={{ color: 'rgba(255,255,255,0.55)' }}
                            onMouseEnter={e => e.target.style.color = '#f97316'}
                            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                        >
                            {link}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ background: 'linear-gradient(to right, #f97316, #06b6d4)' }} />
                        </button>
                    ))}
                    {!isHome && <Link to="/" style={{ color: 'rgba(255,255,255,0.55)' }} className="text-base font-semibold">← Back Home</Link>}

                    {isAuthenticated ? (
                        <div className="flex items-center gap-3">
                            <Link to="/admin" className="btn-primary py-2 px-5 text-base flex items-center gap-2">
                                <LayoutDashboard size={15} /> Dashboard
                            </Link>
                            <button onClick={() => dispatch(logout())} className="p-2 rounded-lg transition-all" style={{ color: 'rgba(255,255,255,0.4)' }}
                                onMouseEnter={e => e.target.style.color = '#ef4444'}
                                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/admin/login" className="text-sm tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>Admin</Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 rounded-lg"
                    style={{ color: '#f97316' }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden"
                        style={{ background: 'rgba(8,12,16,0.95)', borderBottom: '1px solid rgba(249,115,22,0.1)' }}
                    >
                        <div className="px-6 py-6 flex flex-col gap-5">
                            {isHome && navLinks.map(link => (
                                <button key={link} onClick={() => handleScrollTo(link)}
                                    className="text-left font-semibold text-lg"
                                    style={{ color: 'rgba(255,255,255,0.7)' }}
                                >
                                    {link}
                                </button>
                            ))}
                            {isAuthenticated && (
                                <>
                                    <Link to="/admin" onClick={() => setIsOpen(false)} className="font-bold text-lg" style={{ color: '#f97316' }}>Dashboard</Link>
                                    <button onClick={() => { dispatch(logout()); setIsOpen(false); }} className="text-left font-bold text-lg" style={{ color: '#ef4444' }}>Logout</button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
