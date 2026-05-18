import React from 'react';
import { Mail, Github, Linkedin, MessageSquare } from 'lucide-react';

const ContactWindow = ({ isDark = false }: { isDark?: boolean }) => {
  return (
    <div className="p-8 sm:p-12 flex flex-col items-center justify-center min-h-[50vh] bg-gradient-to-br from-white/40 to-white/10 text-center">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-500 mb-6 shadow-inner">
        <MessageSquare className="w-10 h-10" />
      </div>
      <h3 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight">Let's build something!</h3>
      <p className="text-slate-600 max-w-lg text-lg mb-10 leading-relaxed">
        I'm currently looking for new opportunities. Feel free to reach out for collaborations, or just a friendly chat!
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-2xl">
        {[
          { icon: <Mail className="w-5 h-5 text-rose-500" />, label: 'Email Me', href: 'mailto:your.email@example.com' },
          { icon: <Github className="w-5 h-5 text-slate-800" />, label: 'GitHub', href: 'https://github.com/EYRON27' },
          { icon: <Linkedin className="w-5 h-5 text-blue-600" />, label: 'LinkedIn', href: 'https://linkedin.com' },
        ].map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold text-slate-700 w-full sm:w-auto"
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactWindow;
