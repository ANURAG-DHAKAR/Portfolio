import { motion } from 'motion/react';
import { useInView } from '../hooks/useInView';
import { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import type { Project } from '../data/projects';

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 py-25 relative"
    >
      {/* Semi-transparent backdrop for readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="text-white/40 text-sm tracking-[0.3em] mb-4 uppercase">
            Portfolio
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            A selection of projects showcasing problem-solving through design
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs tracking-wider">
                    {project.category}
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ExternalLink className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl text-white mb-2 group-hover:text-green-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center  mt-22 p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-gray-900 to-black border  border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Image */}
            <div className="aspect-[21/9] relative overflow-hidden">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <X style={{ color: 'black' }}  className="w-5 h-5 z-50" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="text-green-400 text-sm tracking-wider mb-2 uppercase">
                {selectedProject.category}
              </div>
              <h2 className="text-3xl md:text-4xl text-white mb-6">
                {selectedProject.title}
              </h2>

              {/* Case Study Sections */}
              <div className="space-y-8">
                {/* Buttons */}
                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-sm tracking-wider uppercase transition-all flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>

                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-white/30 hover:border-white text-white text-sm tracking-wider uppercase transition-all flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View On GitHub
                  </a>
                </div>
                <div>
                  <h3 className="text-xl text-white mb-3 flex items-center gap-2">
                    <span className="w-8 h-px bg-green-400" />
                    Problem
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {selectedProject.problem}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-white mb-3 flex items-center gap-2">
                    <span className="w-8 h-px bg-green-400" />
                    Research
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {selectedProject.research}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-white mb-3 flex items-center gap-2">
                    <span className="w-8 h-px bg-green-400" />
                    Solution
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-white mb-3 flex items-center gap-2">
                    <span className="w-8 h-px bg-green-400" />
                    Impact
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {selectedProject.impact}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}