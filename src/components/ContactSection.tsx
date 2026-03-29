import { motion } from 'motion/react';
import { useInView } from '../hooks/useInView';
import { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Send, Instagram } from 'lucide-react';

export function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! This is a demo, so the form is not actually submitted.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact"
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
            Let's Connect
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Get In Touch
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to create 
            something amazing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl text-white mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <motion.a
                  href="mailto:kiran.shetty@example.com"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
                >
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-1">
                      Email
                    </div>
                    <div>anuragdhakar447@gmail.com</div>
                  </div>
                </motion.a>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 text-white/70 group"
                >
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-1">
                      Phone
                    </div>
                    <div>+91 7303604248</div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 text-white/70 group"
                >
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-1">
                      Location
                    </div>
                    <div>Noida, Uttar Pradesh</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl text-white mb-4">Follow Me</h3>
              <div className="flex gap-4">
                {[
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/anurag-dhakar-225a7037a/', label: 'LinkedIn' },
                  { icon: Github, href: 'https://github.com/ANURAG-DHAKAR', label: 'GitHub' },
                  { icon: Mail, href: 'mailto:anuragdhakar447@gmail.com', label: 'Email' },
                  { icon: Phone, href: 'tel:+917303604248', label: 'Phone' },
                  { icon: Instagram, href: 'https://www.instagram.com/_anurag_dhakar/', label: 'Instagram' },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition-all"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 text-white/70" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white">Available for projects</span>
              </div>
              <p className="text-white/60 text-sm">
                Currently accepting new freelance and contract opportunities
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/70 text-sm mb-2 tracking-wider uppercase">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="Name"
                  required
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2 tracking-wider uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="abc@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2 tracking-wider uppercase">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                  rows={6}
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-white text-black hover:bg-white/90 transition-colors flex items-center justify-center gap-2 tracking-wider"
              >
                <Send className="w-4 h-4" />
                SEND MESSAGE
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 pt-8 border-t border-white/10 text-center"
        >
          <p className="text-white/40 text-sm">
            © 2024 Anurag Dhakar. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}