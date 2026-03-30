import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { GraduationCap, Award, Calendar } from 'lucide-react';

const education = [
  {
    degree: 'Bachelor of Science (B.Sc)',
    field: 'Computer Science',
    institution: 'Jiwaji University',
    location: 'Gwalior, India',
    period: '2022 - 2025',
    achievements: [
      'Focused on Web Development and Programming',
      'Built multiple real-world projects using React and JavaScript',
      'Strong foundation in frontend and backend basics'
    ],
  },
  {
    degree: 'Higher Secondary (12th)',
    field: 'Mathematics Stream',
    institution: 'Silver bells Senior Secondary School',
    location: 'Gwalior, India',
    period: '2021 - 2022',
    achievements: [
      'Developed interest in Computer Science',
      'Started learning programming basics',
    ],
  }
];

export function EducationSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      id="education"
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
            Background
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Education Journey
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className={`relative mb-12 md:mb-20 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'
                }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 top-8 w-4 h-4 bg-green-400 rounded-full -translate-x-1/2 border-4 border-black hidden md:block z-10" />

              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 transition-all ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                  }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400/20 to-green-600/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-green-400" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl text-white mb-1">{edu.degree}</h3>
                    <div className="text-green-400 mb-2">{edu.field}</div>
                    <div className="text-white/60 text-sm mb-1">
                      {edu.institution}
                    </div>
                    <div className="flex items-center gap-4 text-white/40 text-sm">
                      <span>{edu.location}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {edu.period}
                      </span>
                    </div>
                  </div>
                </div>

                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
                      <Award className="w-4 h-4" />
                      <span>Achievements</span>
                    </div>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-white/70 text-sm flex items-start gap-2"
                        >
                          <span className="text-green-400 mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl text-white mb-8 text-center">
            Additional Certifications
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              'HTML5 & CSS3',
              'JavaScript',
              'React.js',
              'Bootstrap / Tailwind CSS',
              'API Integration',
              'Git & GitHub',
              'Responsive Web Design',
              'Basic Backend (JavaScript/Node.js)',
              'MySQL Basics'
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 text-center hover:bg-white/10 transition-all"
              >
                <div className="text-white text-sm">{cert}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
