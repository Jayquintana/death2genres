import React from 'react';
import { Mail, Instagram } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="min-h-screen py-20 px-4 bg-gradient-to-b from-grunge-dark to-black relative flex items-center">
      <div className="max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-center mb-8">
          <Mail className="w-6 h-6 text-grunge-red mr-2" />
          <h2 className="text-4xl font-metal text-grunge-red">Get in Touch</h2>
        </div>
        <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm border border-grunge-red/20">
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <a
                href="mailto:elcapitan@death2genres.com,grungeloved@death2genres.com"
                className="flex items-center gap-3 text-xl hover:text-grunge-red transition-colors duration-300 bg-grunge-red/10 px-6 py-3 rounded-lg hover:bg-grunge-red/20"
              >
                <Mail className="w-6 h-6" />
                Send Email
              </a>
            </div>
            <a
              href="https://www.instagram.com/death2genres/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-xl hover:text-grunge-red transition-colors duration-300"
            >
              <Instagram className="w-6 h-6" />
              @death2genres
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;