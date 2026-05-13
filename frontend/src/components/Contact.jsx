import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, User, Send, Phone, Globe, Users, MessageCircle, Camera, Share2 } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-28 relative overflow-hidden bg-dark">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full grid-overlay opacity-20 pointer-events-none" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)' }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 md:mb-20">
                    <div className="section-pill mx-auto w-fit">Get In Touch</div>
                    <h2 className="text-3xl md:text-5xl font-black">Let's Create <span className="gradient-text">Something Great</span></h2>
                    <p className="mt-4 max-w-xl mx-auto text-sm md:text-base text-gray-500">
                        Open for collaborations, interesting projects, or just a friendly developer chat.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 md:gap-16" style={{ perspective: '1200px' }}>
                    {/* Info Side */}
                    <motion.div 
                        initial={{ opacity: 0, rotateY: -20, x: -50 }}
                        whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-2/5 space-y-6"
                    >
                        <div className="glass p-8 rounded-2xl group hover:border-primary/30 hover:bg-[#0c121d] transition-all duration-300 card-glow">
                            <div className="flex items-center gap-6">
                                <div className="p-4 rounded-xl text-white bg-gradient-to-br from-primary to-accent group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                                    <User size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">Name</h4>
                                    <p className="text-gray-400 group-hover:text-white transition-colors">Samprit Ghosh</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass p-8 rounded-2xl group hover:border-secondary/30 hover:bg-[#0c121d] transition-all duration-300 card-glow">
                            <div className="flex items-center gap-6">
                                <div className="p-4 rounded-xl text-white bg-gradient-to-br from-secondary to-secondary-dark group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">Location</h4>
                                    <p className="text-gray-400 group-hover:text-white transition-colors">Kolkata, West Bengal, India</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass p-8 rounded-2xl group hover:border-blue-400/30 hover:bg-[#0c121d] transition-all duration-300 card-glow">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
                                <div className="p-4 rounded-xl text-white bg-gradient-to-br from-purple-500 to-pink-800 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">Email</h4>
                                    <p className="text-gray-400 break-all group-hover:text-white transition-colors">sampritghosh310@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="glass p-8 rounded-2xl group hover:border-blue-500/30 hover:bg-[#0c121d] transition-all duration-300 card-glow">
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-6">
                                    <div className="p-4 rounded-xl text-white bg-gradient-to-br from-blue-600 to-cyan-500 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                                        <Share2 size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold">Social Connect</h4>
                                        <p className="text-gray-400 group-hover:text-white transition-colors">Let's connect digitally</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-4 pt-2">
                                    <motion.a 
                                        href="https://github.com/samprit-ghosh" target="_blank" rel="noopener noreferrer"
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        className="w-12 h-12 glass rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-gray-700 to-gray-900 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all"
                                    >
                                        <Globe size={22} />
                                    </motion.a>
                                    <motion.a 
                                        href="#" target="_blank" rel="noopener noreferrer"
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        className="w-12 h-12 glass rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-blue-600 to-blue-800 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all"
                                    >
                                        <Users size={22} />
                                    </motion.a>
                                    <motion.a 
                                        href="#" target="_blank" rel="noopener noreferrer"
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        className="w-12 h-12 glass rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-sky-400 to-sky-600 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all"
                                    >
                                        <MessageCircle size={22} />
                                    </motion.a>
                                    <motion.a 
                                        href="#" target="_blank" rel="noopener noreferrer"
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        className="w-12 h-12 glass rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all"
                                    >
                                        <Camera size={22} />
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div 
                        initial={{ opacity: 0, rotateY: 20, x: 50 }}
                        whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-3/5"
                    >
                        <form className="glass p-10 rounded-3xl space-y-8 relative overflow-hidden group">
                            {/* Accent line */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient" />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest">Your Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-700"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                                    <input 
                                        type="email" 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all placeholder:text-gray-700"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest">Subject</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-700"
                                    placeholder="What's this about?"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest">Your Message</label>
                                <textarea 
                                    rows="5"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-700 resize-none"
                                    placeholder="Write your message here..."
                                />
                            </div>
                            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-3 py-5 text-lg font-black group">
                                <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                                SEND
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
