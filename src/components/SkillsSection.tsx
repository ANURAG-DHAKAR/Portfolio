import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const skills = [
  { name: 'HTML', level: 90, category: 'Frontend Development' },
  { name: 'CSS', level: 85, category: 'Frontend Development' },
  { name: 'JavaScript', level: 80, category: 'Frontend Development' },
  { name: 'TypeScript', level: 75, category: 'Frontend Development' },

  { name: 'React', level: 75, category: 'JavaScript Libraries' },
  { name: 'Bootstrap', level: 88, category: 'CSS Frameworks' },
  { name: 'PHP', level: 65, category: 'Backend Development' },
  { name: 'Python', level: 80, category: 'Backend Development' },

  { name: 'MongoDB', level: 70, category: 'Database' },
  { name: 'MySQL', level: 70, category: 'Database' },
  { name: 'Figma', level: 70, category: 'Design Tools' },

  { name: 'Git & GitHub', level: 95, category: 'Tools' },

  { name: 'Problem Solving', level: 90, category: 'Soft Skills' },
  { name: 'Communication', level: 85, category: 'Soft Skills' },
  { name: 'Teamwork', level: 88, category: 'Soft Skills' }
];

export function SkillsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      id="skills"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 py-20 relative"
    >
      {/* Semi-transparent backdrop for readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="text-white/40 text-sm tracking-[0.3em] mb-4 uppercase">
            Expertise
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Skills & Proficiency
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            A comprehensive skill set combining design expertise, technical knowledge,
            and collaborative abilities to deliver exceptional user experiences.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <div className="text-white mb-1">{skill.name}</div>
                  <div className="text-white/40 text-xs tracking-wider uppercase">
                    {skill.category}
                  </div>
                </div>
                <div className="text-white/60 text-sm">{skill.level}%</div>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-green-400 to-green-600"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Specializations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {[
            {
              title: 'Frontend Development',
              desc: 'Building responsive and interactive user interfaces using HTML, CSS, and JavaScript',
            },
            {
              title: 'React Development',
              desc: 'Creating dynamic single-page applications with reusable components in React',
            },
            {
              title: 'Backend Development',
              desc: 'Developing server-side logic and APIs using Java and PHP',
            },
            {
              title: 'Database Management',
              desc: 'Handling and managing data efficiently using MySQL',
            },
            {
              title: 'Problem Solving',
              desc: 'Writing optimized code and solving real-world programming challenges',
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-400/20 to-green-600/20 mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-green-400/40 rounded-full" />
              </div>
              <h3 className="text-white mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
