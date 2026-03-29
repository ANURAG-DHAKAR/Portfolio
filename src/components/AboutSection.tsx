import { motion } from 'motion/react';
import { useInView } from '../hooks/useInView';

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 py-20 relative"
    >
      {/* Semi-transparent backdrop for readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left - Image/Visual */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-square bg-gradient-to-br from-green-900/20 to-green-600/20 backdrop-blur-sm border border-white/10 relative overflow-hidden">
            {/* Placeholder for image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/Images/Anupic.jpeg"   // 👉 apni image ka path
                  alt="Profile"
                  className="w-120 h-120 object-cover rounded-full border-4 border-white/20 shadow-xl"
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-white/30" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-white/30" />
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -bottom-6 -right-6 bg-white text-black px-6 py-4 shadow-2xl"
          >
            <div className="text-2xl">1+</div>
            <div className="text-xs tracking-wider">YEARS EXP</div>
          </motion.div>
        </motion.div>

        {/* Right - Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-white/40 text-4xl tracking-[0.3em] mb-4 uppercase">
            About Me
          </div>

          <h2 className="text-4xl md:text-5xl text-white mb-6">
            {/* Transforming Ideas */}
          </h2>

          <div className="space-y-4 text-white/70 leading-relaxed">
            <p className="text-white/70 leading-relaxed">
              Hi! I'm <span className="font-semibold italic">ANURAG DHAKAR</span>, a passionate
              Front-End Developer dedicated to creating dynamic and interactive web experiences.
              I love learning modern web technologies and I'm currently diving deep into
              JavaScript and React to build responsive and user-friendly websites.

              <br /><br />

              I completed my Computer Science studies at Inderprasth College and Jiwaji University, Gwalior.
              I enjoy tackling challenges, experimenting with new ideas, and continuously improving my coding skills.

              <br /><br />

              When I'm not coding, I explore tech trends, contribute to small projects, and enhance my portfolio
              with creative web solutions.
            </p>
          </div>

          {/* Key points */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            {[
              { title: 'User-Centered', desc: 'Design thinking' },
              { title: 'Innovative', desc: 'Creative solutions' },
              { title: 'Collaborative', desc: 'Team player' },
              { title: 'Detail-Oriented', desc: 'Pixel perfect' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="border-l-2 border-white/20 pl-4"
              >
                <div className="text-white mb-1">{item.title}</div>
                <div className="text-white/50 text-sm">{item.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-4 border border-white/30 text-white text-sm tracking-wider hover:bg-white/10 transition-colors"
          >
            DOWNLOAD CV
          </motion.button> */}
        </motion.div>
      </div>
    </section>
  );
}