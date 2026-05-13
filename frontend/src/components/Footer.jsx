import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Code, Mail, User, ArrowUp, Users, MessageCircle, Camera } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const socialLinks = [
        { icon: Globe, href: "https://github.com/samprit-ghosh", label: "GitHub", gradient: "from-gray-700 to-gray-900", shadow: "rgba(255,255,255,0.1)" },
        { icon: Users, href: "#", label: "LinkedIn", gradient: "from-blue-600 to-blue-800", shadow: "rgba(37,99,235,0.3)" },
        { icon: MessageCircle, href: "#", label: "Twitter", gradient: "from-sky-400 to-sky-600", shadow: "rgba(56,189,248,0.3)" },
        { icon: Camera, href: "#", label: "Instagram", gradient: "from-pink-500 via-red-500 to-yellow-500", shadow: "rgba(236,72,153,0.3)" },
    ];

    return (
        <footer className="py-20 relative overflow-hidden bg-dark border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-12">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-black mb-3 md:mb-4">
                            SAMPRIT <span className="gradient-text">GHOSH</span>
                        </h2>
                        <p className="text-sm md:text-base text-gray-500 max-w-xs mx-auto md:mx-0">
                            Designing and building high-performance digital experiences with precision and passion.
                        </p>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-4 md:gap-5">
                        {socialLinks.map((social, index) => (
                            <motion.a 
                                key={index}
                                href={social.href} target="_blank" rel="noopener noreferrer"
                                whileHover={{ y: -8, scale: 1.15 }}
                                className={`w-12 h-12 glass rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${social.gradient} transition-all duration-300 hover:shadow-[0_0_20px_${social.shadow}]`}
                            >
                                <social.icon size={22} />
                            </motion.a>
                        ))}
                    </div>

                    {/* Back to top */}
                    <button 
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 md:gap-3 text-xs md:text-sm font-bold text-gray-500 hover:text-white transition-colors"
                    >
                        BACK TO TOP 
                        <div className="w-8 h-8 md:w-10 md:h-10 glass rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-all">
                            <ArrowUp size={14} />
                        </div>
                    </button>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 md:mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
                    <p className="text-xs md:text-sm text-gray-600 text-center md:text-left">
                        &copy; {new Date().getFullYear()} <span className="text-gray-400">Samprit Ghosh</span>. Developed with <span className="text-primary">❤</span> and MERN Stack.
                    </p>
                    <div className="flex gap-6 md:gap-8 text-[10px] md:text-xs font-bold text-gray-700 tracking-widest uppercase">
                        <a href="#home" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="#home" className="hover:text-primary transition-colors">Terms</a>
                        <a href="/admin/login" className="hover:text-white transition-colors">Admin Login</a>
                    </div>
                </div>
            </div>

            {/* Decorative background orbs */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/5 rounded-full blur-[100px]" />
        </footer>
    );
};

export default Footer;
