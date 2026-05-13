import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Palette, Zap, Globe, Shield, Rocket } from 'lucide-react';

const services = [
    { icon: Laptop, title: "Web Development", desc: "Scalable full-stack apps built with React, Node.js, and modern cloud architecture.", color: '#f97316' },
    { icon: Palette, title: "UI/UX Design", desc: "Pixel-perfect interfaces that delight users and maximize engagement.", color: '#06b6d4' },
    { icon: Zap, title: "Performance Tuning", desc: "Speed optimization, code splitting, SEO, and Core Web Vitals excellence.", color: '#fbbf24' },
    { icon: Globe, title: "Cloud Deployment", desc: "CI/CD pipelines, containerization, and deployments on Vercel, Render & AWS.", color: '#f97316' },
    { icon: Shield, title: "Secure Architecture", desc: "JWT auth, rate limiting, input validation, and OWASP best practices.", color: '#06b6d4' },
    { icon: Rocket, title: "Agile Delivery", desc: "Rapid iteration cycles delivering production-ready features on tight deadlines.", color: '#fbbf24' },
];

const Services = () => {
    return (
        <section id="services" className="py-28 relative overflow-hidden" style={{ background: '#0f1620' }}>
            <div className="absolute inset-0 grid-overlay opacity-30" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)' }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 md:mb-20">
                    <div className="section-pill mx-auto w-fit">What I Do</div>
                    <h2 className="text-3xl md:text-5xl font-black">Core <span className="gradient-text">Services</span></h2>
                    <p className="mt-4 max-w-xl mx-auto text-sm md:text-base" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        End-to-end solutions that drive real business outcomes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1200px' }}>
                    {services.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, rotateY: -25, x: -30 }}
                            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                            transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
                            whileHover={{ y: -8, rotateX: 4, scale: 1.02 }}
                            className="group relative glass rounded-2xl p-8 overflow-hidden"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Colored top border */}
                            <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-all duration-300"
                                style={{ background: `linear-gradient(to right, ${s.color}, transparent)`, opacity: 0.6 }} />
                            {/* Hover glow */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                                style={{ background: s.color }} />

                            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                                style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
                                <s.icon size={26} style={{ color: s.color }} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">{s.title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
