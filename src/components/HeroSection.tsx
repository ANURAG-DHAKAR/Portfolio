import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section id="home" className="h-screen flex items-center justify-center relative px-6">
      {/* Premium Cinematic Particles */}
<div className="absolute inset-0 -z-10 overflow-hidden">
  {[...Array(40)].map((_, i) => (
    <motion.span
      key={i}
      className="absolute rounded-full bg-gradient-to-br from-white via-blue-200 to-transparent"
      style={{
        width: Math.random() * 3 + 1 + 'px', // Varying sizes
        height: Math.random() * 3 + 1 + 'px',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        filter: 'blur(1px)', // Soft glow effect
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
      }}
      animate={{
        y: [0, Math.random() * -150 - 50], // Random upward float
        x: [0, (Math.random() - 0.5) * 50], // Slight horizontal drift
        opacity: [0, 0.8, 0], // Smooth fade in and out
        scale: [0, 1.5, 0], // Pulse effect
      }}
      transition={{
        duration: 5 + Math.random() * 7, // Varied speeds
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 10,
      }}
    />
  ))}
</div>
      <div className="max-w-7xl mx-auto text-center relative z-20">
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/60 text-sm md:text-base tracking-[0.3em] mb-6 uppercase"
        >
          Full Stack Developer & Problem Solver
        </motion.div>

        {/* Main Heading with 3D Text Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative mb-8"
        >
          <h1
            className="text-6xl md:text-8xl lg:text-9xl text-white uppercase tracking-tight relative z-10"
            style={{
              textShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 60px rgba(168,213,186,0.3)',
            }}
          >
            ANURAG
          </h1>
          <h1
            className="text-6xl md:text-8xl lg:text-9xl text-white uppercase tracking-tight mt-2 relative z-10"
            style={{
              textShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 60px rgba(168,213,186,0.3)',
            }}
          >
            DHAKAR
          </h1>

          {/* 3D depth effect */}
          <div
            className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl uppercase tracking-tight text-emerald-400/10 pointer-events-none"
            style={{
              transform: 'translate(4px, 4px)',
            }}
          >
            <div>ANURAG</div>
            <div className="mt-2">DHAKAR</div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-40  leading-relaxed"
        >
          Crafting scalable web applications with modern technologies like React, JavaScript, and APIs.
          Building fast, responsive, and user-focused digital experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-black text-sm tracking-wider hover:bg-white/90 transition-colors"
          >
            VIEW PROJECTS
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-white/30 text-white text-sm tracking-wider hover:bg-white/10 transition-colors"
          >
            GET IN TOUCH
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-35 left-0 right-0 flex justify-center gap-12 md:gap-24"
        >
          {[
            { number: '10+', label: 'Projects' },
            { number: '1+', label: 'Years Exp.' },
            { number: '5+', label: 'Happy Clients' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl text-white mb-1">{stat.number}</div>
              <div className="text-xs md:text-sm text-white/50 tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-32 left-12 w-16 h-16 border-l-2 border-t-2 border-white/20" />
      <div className="absolute top-32 right-12 w-16 h-16 border-r-2 border-t-2 border-white/20" />
    </section>
  );
}
