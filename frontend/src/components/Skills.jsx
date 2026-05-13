import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Skills = () => {
    const { items: skills } = useSelector((state) => state.skills);

    const getBarColor = (pct) => {
        if (pct >= 85) return 'linear-gradient(90deg, #f97316, #fbbf24)';
        if (pct >= 65) return 'linear-gradient(90deg, #06b6d4, #6366f1)';
        return 'linear-gradient(90deg, #6366f1, #ec4899)';
    };

    return (
        <section id="skills" className="py-28 relative overflow-hidden" style={{ background: '#080c10' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)' }} />

            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 md:mb-20">
                    <div className="section-pill mx-auto w-fit">Expertise</div>
                    <h2 className="text-3xl md:text-5xl font-black">Skills & <span className="gradient-text">Technologies</span></h2>
                    <p className="mt-4 max-w-xl mx-auto text-sm md:text-base" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        Expertise across the full development lifecycle, specializing in modern web ecosystems.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" style={{ perspective: '1200px' }}>
                    {skills.map((skill, i) => (
                        <motion.div
                            key={skill._id || i}
                            initial={{ opacity: 0, rotateY: 40, y: 30 }}
                            whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
                            transition={{ duration: 0.75, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                            whileHover={{ scale: 1.04, rotateX: 3 }}
                            className="glass rounded-2xl p-7 group relative overflow-hidden"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Corner accent */}
                            <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                                style={{ background: 'rgba(249,115,22,0.08)' }} />

                            <div className="flex justify-between items-start mb-5">
                                <div className="flex items-center gap-4">
                                    {skill.image && (
                                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/5 p-1 border border-white/10">
                                            <img src={skill.image} alt={skill.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                                        </div>
                                    )}
                                    <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                                </div>
                                <span className="text-3xl font-black tabular-nums" style={{ color: skill.percentage >= 85 ? '#f97316' : '#06b6d4' }}>
                                    {skill.percentage}
                                    <span className="text-lg font-bold" style={{ color: 'rgba(255,255,255,0.3)' }}>%</span>
                                </span>
                            </div>

                            {/* Track */}
                            <div className="h-2.5 rounded-full overflow-hidden relative" style={{ background: 'rgba(255,255,255,0.06)' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.percentage}%` }}
                                    transition={{ duration: 1.4, delay: i * 0.07 + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    className="h-full rounded-full relative overflow-hidden"
                                    style={{ background: getBarColor(skill.percentage) }}
                                >
                                    <div className="absolute inset-0 animate-shimmer"
                                        style={{
                                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                                            backgroundSize: '200% auto',
                                        }} />
                                </motion.div>
                            </div>

                            {/* Level label */}
                            <div className="mt-3 flex justify-between text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                                <span>Beginner</span>
                                <span style={{ color: skill.percentage >= 85 ? 'rgba(249,115,22,0.7)' : 'rgba(6,182,212,0.7)' }}>
                                    {skill.percentage >= 85 ? 'Expert' : skill.percentage >= 65 ? 'Advanced' : 'Intermediate'}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
