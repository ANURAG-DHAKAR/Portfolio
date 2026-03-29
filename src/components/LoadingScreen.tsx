import { motion } from 'motion/react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl text-white mb-2">
            <span className="font-light">ANURAG</span>
            <span className="font-semibold ml-2">DHAKAR</span>
          </h1>
          <p className="text-white/40 text-sm tracking-[0.3em] uppercase">
            Loading Portfolio 
          </p>
        </motion.div>

        {/* Loading animation */}
        <div className="flex gap-2 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '200px' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="h-px bg-white/20 mx-auto mt-8"
        />
      </div>
    </div>
  );
}
