import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Torus, MeshDistortMaterial, Float, Sparkles, Stars, PerspectiveCamera } from '@react-three/drei';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

function AnimatedTorus() {
    const meshRef = useRef();
    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
        }
    });
    return (
        <Float speed={3} rotationIntensity={0.6} floatIntensity={1.5}>
            <Torus ref={meshRef} args={[1.8, 0.5, 120, 240]}>
                <MeshDistortMaterial
                    color="#f97316"
                    emissive="#ea580c"
                    emissiveIntensity={0.4}
                    distort={0.5}
                    speed={2.5}
                    roughness={0.05}
                    metalness={0.95}
                />
            </Torus>
        </Float>
    );
}

const TitleWord = ({ word, index }) => {
    const letters = Array.from(word);
    return (
        <span className="inline-block whitespace-nowrap mr-4 last:mr-0">
            {letters.map((letter, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.5 + index * 0.2 + i * 0.05,
                        ease: [0.2, 0.65, 0.3, 0.9]
                    }}
                    className={`inline-block ${index === 1 ? 'gradient-text' : ''}`}
                >
                    {letter}
                </motion.span>
            ))}
        </span>
    );
};

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax and scroll effects
    // Parallax and scroll effects with Spring for smoothness
    const springConfig = { damping: 25, stiffness: 100, restDelta: 0.001 };
    
    const yRaw = useTransform(scrollYProgress, [0, 1], [0, 250]);
    const opacityRaw = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scaleRaw = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

    const y = useSpring(yRaw, springConfig);
    const opacity = useSpring(opacityRaw, springConfig);
    const scale = useSpring(scaleRaw, springConfig);

    // Mouse tracking for subtle tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
    const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();
        mouseX.set((clientX - left) / width - 0.5);
        mouseY.set((clientY - top) / height - 0.5);
    };

    return (
        <section 
            id="home" 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative h-[125vh] md:h-screen flex items-start md:items-center justify-center overflow-hidden grid-overlay" 
            style={{ background: '#080c10' }}
        >
            {/* 3D Canvas Background */}
            <div className="absolute inset-0 z-0">
                <Canvas shadows dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.4} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#f97316" castShadow />
                        <pointLight position={[-10, -10, -10]} intensity={1} color="#06b6d4" />
                        
                        <AnimatedTorus />
                        
                        <Sparkles count={80} scale={10} size={1.5} speed={0.4} color="#f97316" opacity={0.3} />
                        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                        
                        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Cinematic Glows */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full opacity-30 blur-[120px]" style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }} />
                <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px]" style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }} />
            </div>

            {/* Content */}
            <motion.div 
                style={{ 
                    y, 
                    opacity, 
                    scale,
                    rotateX: tiltX,
                    rotateY: tiltY,
                    transformStyle: 'preserve-3d'
                }}
                className="relative z-10 text-center px-6 max-w-7xl mx-auto w-full pt-20 md:pt-0"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="group mx-auto mb-8 w-fit"
                    style={{ transform: 'translateZ(50px)' }}
                >
                    <div className="section-pill flex items-center gap-3 px-5 py-2.5 glass border-primary/20 hover:border-primary/40 transition-colors duration-300">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white/80 group-hover:text-white transition-colors">
                            AVAILABLE FOR NEW PROJECTS
                        </span>
                    </div>
                </motion.div>

                {/* Name */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex items-center justify-center gap-4 mb-4"
                    style={{ transform: 'translateZ(30px)' }}
                >
                    <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-primary/50" />
                    <h2 className="text-[10px] md:text-lg text-primary font-bold tracking-[0.4em] uppercase">
                        Samprit Ghosh
                    </h2>
                    <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-primary/50" />
                </motion.div>

                {/* Title */}
                <h1 
                    className="text-[2.75rem] sm:text-5xl md:text-7xl lg:text-[8rem] font-black leading-[0.95] tracking-tighter mb-8 md:mb-10 flex flex-wrap justify-center items-center" 
                    style={{ perspective: '1000px', transform: 'translateZ(80px)' }}
                >
                    <TitleWord word="Full" index={0} />
                    <TitleWord word="Stack" index={1} />
                    <TitleWord word="Developer" index={2} />
                </h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="text-sm md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-12 md:mb-16 text-white/50 px-4 font-light"
                    style={{ transform: 'translateZ(40px)' }}
                >
                    Crafting <span className="text-white font-medium">high-performance</span> digital experiences with 
                    <span className="text-white font-medium"> precision</span> and <span className="text-white font-medium">purpose</span>. 
                    Specializing in robust full-stack architectures and pixel-perfect interfaces.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    style={{ transform: 'translateZ(60px)' }}
                >
                    <a href="#projects" className="btn-primary min-w-[200px] flex items-center justify-center group">
                        Explore My Work
                        <motion.span 
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="ml-2"
                        >
                            →
                        </motion.span>
                    </a>
                    <a href="#contact" className="btn-secondary min-w-[200px] glass">
                        Let's Talk
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            >
                <div className="w-[24px] h-[40px] md:w-[30px] md:h-[50px] rounded-full border-2 border-white/10 flex justify-center p-1.5 md:p-2">
                    <motion.div 
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary"
                    />
                </div>
                <span className="text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-white/30 font-bold">Scroll Down</span>
            </motion.div>

            {/* Side Indicators (Desktop Only) */}
            <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 items-center text-white/20">
                <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                <span className="rotate-90 text-[10px] tracking-[0.5em] uppercase whitespace-nowrap">Introduction</span>
                <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </div>
        </section>
    );
};

export default Hero;
