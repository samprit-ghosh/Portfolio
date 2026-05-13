import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers, Globe, Award } from 'lucide-react';

const stats = [
    { icon: Code2,  value: '20+', label: 'Projects Built' },
    { icon: Layers, value: '2+',  label: 'Years Experience' },
    { icon: Globe,  value: '10+', label: 'Live Deployments' },
    { icon: Award,  value: '5+',  label: 'Tech Stacks' },
];

const About = () => {
    return (
        <section id="about" className="py-28 relative overflow-hidden" style={{ background: '#080c10' }}>
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)' }} />

            <div className="max-w-7xl mx-auto px-6">
                {/* Heading */}
                <div className="text-center mb-16 md:mb-20">
                    <div className="section-pill mx-auto w-fit">About Me</div>
                    <h2 className="text-3xl md:text-5xl font-black">The Developer <span className="gradient-text">Behind the Code</span></h2>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
                    {/* Image side */}
                    <motion.div
                        initial={{ opacity: 0, x: -60, rotateY: 20 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="w-full lg:w-2/5 flex justify-center"
                        style={{ perspective: '800px' }}
                    >
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            {/* Orange ring */}
                            <div className="absolute inset-0 rounded-2xl rotate-6"
                                style={{ background: 'linear-gradient(135deg, #f97316, #06b6d4)', padding: '2px' }}>
                                <div className="w-full h-full rounded-2xl" style={{ background: '#080c10' }} />
                            </div>
                            {/* Photo */}
                            <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border-2"
                                style={{ borderColor: 'rgba(249,115,22,0.3)' }}>
                                <img src="images/my photo.jpg" alt="Samprit Ghosh"
                                    className="w-full h-full object-cover" />
                                {/* Overlay shimmer */}
                                <div className="absolute inset-0"
                                    style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.1) 0%, transparent 50%, rgba(6,182,212,0.1) 100%)' }} />
                            </div>
                            {/* Float badge */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -bottom-3 -right-3 md:-bottom-5 md:-right-5 z-20 glass px-4 py-2 md:px-5 md:py-3 rounded-xl"
                                style={{ border: '1px solid rgba(249,115,22,0.3)' }}
                            >
                                <p className="text-xl md:text-2xl font-black gradient-text">2+</p>
                                <p className="text-[10px] md:text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Years Exp.</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Text side */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        className="w-full lg:w-3/5 text-center lg:text-left"
                    >
                        <p className="text-base md:text-lg leading-relaxed mb-6 px-2 md:px-0" style={{ color: 'rgba(255,255,255,0.6)' }}>
                            I'm a <strong className="text-white">Full Stack Developer</strong> with 2+ years of hands-on experience building everything from e-commerce platforms to AI-powered web apps. I thrive at the intersection of engineering and design — crafting products that are as fast as they are beautiful.
                        </p>
                        <p className="text-lg leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>
                            My stack spans <span style={{ color: '#f97316' }} className="font-semibold">React</span>, <span style={{ color: '#f97316' }} className="font-semibold">Node.js</span>, <span style={{ color: '#06b6d4' }} className="font-semibold">Python/Flask</span>, <span style={{ color: '#06b6d4' }} className="font-semibold">MongoDB</span>, and more. I've built and deployed 20+ live projects across domains — healthcare, hospitality, e-commerce, and beyond.
                        </p>

                        {/* Stats grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                            {stats.map(({ icon: Icon, value, label }, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="glass rounded-xl p-4 text-center"
                                    style={{ border: '1px solid rgba(249,115,22,0.15)' }}
                                >
                                    <Icon size={20} className="mx-auto mb-2" style={{ color: '#f97316' }} />
                                    <p className="text-2xl font-black gradient-text">{value}</p>
                                    <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <a href="images/Samprit Ghosh .pdf" download className="btn-primary">Download CV</a>
                            <a href="#contact" className="btn-secondary">Hire Me →</a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
