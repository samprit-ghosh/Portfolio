import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, X } from 'lucide-react';

const ToastContext = createContext(null);

let toastId = 0;

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const addToast = useCallback((message, type = 'success', duration = 4000) => {
        const id = ++toastId;
        setToasts(prev => [...prev, { id, message, type }]);
        if (type !== 'loading') {
            setTimeout(() => removeToast(id), duration);
        }
        return id;
    }, [removeToast]);

    const toast = useCallback({
        success: (msg) => addToast(msg, 'success'),
        error: (msg) => addToast(msg, 'error'),
        loading: (msg) => addToast(msg, 'loading'),
    }, [addToast]);

    // Allow updating a toast (e.g., loading -> success)
    const updateToast = useCallback((id, message, type) => {
        setToasts(prev => prev.map(t => t.id === id ? { ...t, message, type } : t));
        if (type !== 'loading') {
            setTimeout(() => removeToast(id), 4000);
        }
    }, [removeToast]);

    const promise = useCallback(async (promiseFn, messages) => {
        const id = addToast(messages.loading || 'Loading...', 'loading');
        try {
            const result = await promiseFn;
            updateToast(id, messages.success || 'Success!', 'success');
            return result;
        } catch (err) {
            const errorMsg = typeof messages.error === 'function' 
                ? messages.error(err) 
                : (messages.error || 'Something went wrong');
            updateToast(id, errorMsg, 'error');
            throw err;
        }
    }, [addToast, updateToast]);

    const value = {
        success: (msg) => addToast(msg, 'success'),
        error: (msg) => addToast(msg, 'error'),
        loading: (msg) => addToast(msg, 'loading'),
        promise,
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
                <AnimatePresence>
                    {toasts.map((t) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, x: 100, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100, scale: 0.9 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl ${
                                t.type === 'success' 
                                    ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                                    : t.type === 'error' 
                                    ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                                    : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                            }`}
                        >
                            {t.type === 'success' && <CheckCircle2 size={20} className="shrink-0" />}
                            {t.type === 'error' && <XCircle size={20} className="shrink-0" />}
                            {t.type === 'loading' && <Loader2 size={20} className="shrink-0 animate-spin" />}
                            <span className="text-sm font-semibold text-white flex-1">{t.message}</span>
                            {t.type !== 'loading' && (
                                <button 
                                    onClick={() => removeToast(t.id)} 
                                    className="text-gray-500 hover:text-white transition-colors shrink-0"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
