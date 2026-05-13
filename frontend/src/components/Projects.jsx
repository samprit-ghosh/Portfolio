import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
    const { items: projects } = useSelector((state) => state.projects);
    console.log('Projects in component:', projects);

    return (
        <section id="projects" className="py-28 relative overflow-hidden" style={{ background: '#0f1620' }}>
            <div className="absolute inset-0 grid-overlay opacity-20" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)' }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 md:mb-20">
                    <div className="section-pill mx-auto w-fit">Portfolio</div>
                    <h2 className="text-3xl md:text-5xl font-black">Featured <span className="gradient-text">Projects</span></h2>
                    <p className="mt-4 max-w-xl mx-auto text-sm md:text-base" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        Real-world products I've designed, built, and shipped — from concept to production.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10" style={{ perspective: '1200px' }}>
                    {projects.map((project, i) => (
                        <motion.div
                            key={project._id || i}
                            initial={{ opacity: 0, rotateX: 30, y: 60, scale: 0.95 }}
                            whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: i * 0.09, ease: [0.215, 0.61, 0.355, 1] }}
                            whileHover={{ y: -10, rotateY: 3, scale: 1.02 }}
                            className="group relative rounded-2xl overflow-hidden"
                            style={{ transformStyle: 'preserve-3d', background: '#131d2a', border: '1px solid rgba(255,255,255,0.05)' }}
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden aspect-video bg-white/5 flex items-center justify-center">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        referrerPolicy="no-referrer"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="text-gray-700 flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center">
                                            <span className="text-xs font-bold">NO IMG</span>
                                        </div>
                                    </div>
                                )}
                                {/* Gradient overlay always visible at bottom */}
                                <div className="absolute inset-0"
                                    style={{ background: 'linear-gradient(to top, #131d2a 0%, transparent 60%)' }} />

                                {/* Hover reveal */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400"
                                    style={{ background: 'rgba(8,12,16,0.75)', backdropFilter: 'blur(4px)' }}>
                                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                                        className="btn-primary flex items-center gap-2 py-3 px-6 text-sm">
                                        Live Demo <ExternalLink size={15} />
                                    </a>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    {project.category && (
                                        <span className="shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold"
                                            style={{ background: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.2)' }}>
                                            {project.category}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm line-clamp-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                                    {project.description}
                                </p>
                            </div>

                            {/* Bottom orange line */}
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: 'linear-gradient(to right, #f97316, #06b6d4)' }} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
