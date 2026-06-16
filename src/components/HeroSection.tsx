import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center">

  {/* Background Image */}
  <div
    className="absolute inset-0 bg-center bg-cover"
    style={{
      backgroundImage:
        "url('/Images/myhero.png')", // apni image path
    }}
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/15" />

  {/* Green Glow */}
  <div className="absolute inset-0">
    <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/20 blur-[180px]" />
  </div>

  {/* Floating Dots */}
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(80)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-green-400"
        style={{
          width: Math.random() * 3 + 1,
          height: Math.random() * 3 + 1,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          boxShadow: "0 0 10px #22c55e",
        }}
        animate={{
          y: [0, -100],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 4 + Math.random() * 6,
          repeat: Infinity,
          delay: Math.random() * 5,
        }}
      />
    ))}
  </div>

  {/* Content */}
  <div className="relative z-20 text-center max-w-5xl px-6">

    {/* <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-green-400 uppercase tracking-[0.4em] mb-6"
    >
      Full Stack Developer
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-4xl font-bold text-white"
      style={{
        textShadow:
          "0 0 20px rgba(34,197,94,.4),0 0 60px rgba(34,197,94,.2)",
      }}
    >
     WHERE STRATEGY 
    </motion.h1>

    <motion.h1
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-7xl md:text-9xl font-bold text-white mb-8"
      style={{
        textShadow:
          "0 0 20px rgba(34,197,94,.4),0 0 60px rgba(34,197,94,.2)",
      }}
    >
      MEETS CODE
    </motion.h1>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-green-500/30 bg-black/30 backdrop-blur-md"
    >
      <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
      <span className="text-green-200">
        Available For Freelance Work
      </span>
    </motion.div>

    <p className="text-gray-300 max-w-2xl mx-auto mt-8 text-lg leading-relaxed">
      Creating scalable web applications, modern user
      experiences and digital products that combine
      creativity with technology.
    </p> */}

    {/* <div className="flex justify-center gap-4 mt-10">
      <button className="px-8 py-4 bg-green-500 text-black font-semibold">
        View Projects
      </button>

      <button className="px-8 py-4 border border-green-500/40 text-white">
        Contact Me
      </button>
    </div> */}
  </div>
</section>
  );
}