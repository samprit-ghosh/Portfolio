import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Award, FileText, ExternalLink } from 'lucide-react';

const Certificates = () => {
    const { items: certificates } = useSelector((state) => state.certificates);

    if (!certificates || certificates.length === 0) return null;

    return (
        <section id="certificates" className="py-28 relative overflow-hidden" style={{ background: '#080c10' }}>
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="section-pill mx-auto w-fit">Achievements</div>
                    <h2 className="text-3xl md:text-5xl font-black">Professional <span className="gradient-text">Certificates</span></h2>
                    <p className="mt-4 max-w-xl mx-auto text-sm md:text-base text-white/50">
                        Formal recognitions and certifications I've earned throughout my career.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificates.map((cert, i) => (
                        <motion.div
                            key={cert._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="glass rounded-3xl p-6 group border border-white/5 hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                                    <Award size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors truncate">
                                        {cert.name}
                                    </h3>
                                    <p className="text-xs text-white/40 font-medium mb-4 flex items-center gap-1.5">
                                        <FileText size={12} className="text-secondary" />
                                        {cert.issuer || 'Verified Credential'} • {cert.date || 'Valid'}
                                    </p>
                                    
                                    <a 
                                        href={cert.pdfUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-white transition-colors"
                                    >
                                        View Certificate <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>
                            
                            {/* Decorative corner */}
                            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certificates;
