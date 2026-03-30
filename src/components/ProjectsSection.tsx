import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'FoodHuB',
    category: 'Full Stack Web App',
    description: 'Online food ordering platform built with React',
    problem: 'Users struggle to find a simple and fast interface for browsing and ordering food online.',
    solution: 'Developed a responsive React-based platform with dynamic food listings, cart system, and smooth UI/UX.',
    impact: 'Improved user experience with faster navigation and real-time updates, making ordering seamless.',
    image: './Images/Foodhub.png',
    live: 'https://foodhub-f.onrender.com/',
    github: 'https://github.com/ANURAG-DHAKAR/FoodHub'
  },
  {
    id: 2,
    title: 'Luminark Elevator',
    category: 'Business Website',
    description: 'Corporate website for elevator company',
    problem: 'Company lacked a modern digital presence to showcase services and attract clients.',
    solution: 'Built a professional React website with service pages, contact integration, and responsive design.',
    impact: 'Enhanced brand visibility and improved client engagement.',
    image: './Images/Luminark.png',
    live: 'https://luminark.dhakadpureveda.in/',
    github: 'https://github.com/SANDEEP-DHAKAR/Luminark_Elevator'
  },
  {
    id: 3,
    title: 'St. J.P. School',
    category: 'Full Stack Website',
    description: 'School management and information platform',
    problem: 'Schools need a centralized platform for managing and displaying information.',
    solution: 'Created a full stack website with dynamic content, announcements, and structured UI.',
    impact: 'Improved communication between school and parents/students.',
    image: './Images/stjpschool.png',
    live: 'https://www.stjpschool.in/',
    github: 'https://github.com/grit-eit/stjpschool'
  },
  {
    id: 4,
    title: 'Mont Fort School',
    category: 'Full Stack Website',
    description: 'Modern school website with structured UI',
    problem: 'Traditional school websites are outdated and hard to navigate.',
    solution: 'Developed a responsive React-based website with clean UI and structured navigation.',
    impact: 'Improved user engagement and accessibility.',
    image: './Images/montfort.png',
    live: 'https://montfortschool.co.in/',
    github: 'https://github.com/grit-eit/montfortschool'
  },
  {
    id: 5,
    title: 'Dhakad Pureveda',
    category: 'Business Website',
    description: 'Ayurvedic product business website',
    problem: 'Local business lacked online visibility and digital sales presence.',
    solution: 'Built a static website with API integration and product showcase.',
    impact: 'Helped business establish online identity and reach more customers.',
    image: './Images/dhakadpureveda.png',
    live: 'https://dhakadpureveda.in/',
    github: 'https://github.com/ANURAG-DHAKAR/My-Portfolio'
  },
  {
    id: 6,
    title: 'Eduinnotech Templates',
    category: 'Frontend Collection',
    description: 'Collection of reusable website templates',
    problem: 'Developers often need ready-to-use templates for faster development.',
    solution: 'Created multiple responsive templates using HTML, CSS, and JavaScript.',
    impact: 'Reduced development time and improved productivity.',
    image: './Images/edu-tem.png',
    live: 'https://eduinnotech.com/templates/',
    github: 'https://github.com/ANURAG-DHAKAR/Edutemplate-collection-Websites'
  },
  {
    id: 7,
    title: 'Birthday Wishes',
    category: 'Frontend Project',
    description: 'Interactive birthday greeting web app',
    problem: 'Traditional birthday wishes lack personalization and creativity.',
    solution: 'Developed an animated greeting app using JavaScript.',
    impact: 'Enhanced user engagement with interactive UI.',
    image: './Images/Birthdaywishes.png',
    live: 'https://anurag-dhakar.github.io/BirthdayWishes/',
    github: 'https://github.com/ANURAG-DHAKAR/BirthdayWishes'
  },
  {
    id: 8,
    title: 'E-Commerce App',
    category: 'Web App',
    description: 'Basic e-commerce platform using Fake API',
    problem: 'Learning e-commerce systems requires hands-on implementation.',
    solution: 'Built a product listing and cart system using Fake API.',
    impact: 'Improved understanding of API integration and frontend logic.',
    image: './Images/e-com.png',
    live: 'https://anurag-dhakar.github.io/E-Commerce-Website',
    github: 'https://github.com/ANURAG-DHAKAR/E-Commerce-Website'
  },
  {
    id: 9,
    title: 'Analog Clock',
    category: 'JavaScript Project',
    description: 'Real-time analog clock',
    problem: 'Understanding real-time JavaScript behavior can be challenging.',
    solution: 'Created a clock using JS timing functions.',
    impact: 'Strengthened core JavaScript concepts.',
    image: './Images/clock.png',
    live: 'https://anurag-dhakar.github.io/CLOCKbyJS/',
    github: 'https://github.com/ANURAG-DHAKAR/CLOCKbyJS'
  },
  {
    id: 10,
    title: 'Live Weather Cast',
    category: 'API Project',
    description: 'Weather forecasting web app',
    problem: 'Users need real-time weather updates in a simple interface.',
    solution: 'Built a weather app using API integration and Bootstrap UI.',
    impact: 'Provided real-time data with clean UI.',
    image: './Images/weather.png',
    live: 'https://anurag-dhakar.github.io/Weather-Cast/',
    github: 'https://github.com/ANURAG-DHAKAR/Weather-Cast'
  }
];

export function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section
      id="projects"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 py-20 relative"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-gray-900 to-black border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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
                <X className="w-5 h-5 text-white" />
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
