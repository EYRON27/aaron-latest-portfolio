import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, ChevronRight, Minus, Maximize2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

const knowledgeBase: Record<string, string[]> = {
  // Greetings
  hello: [
    "Hey there! I'm Aaron's portfolio assistant. Ask me anything about his skills, projects, education, or contact info. You can also click the suggested topics below!"
  ],
  hi: [
    "Hi! Welcome to Aaron's portfolio. Feel free to ask me about his skills, projects, experience, certifications, or how to get in touch."
  ],
  hey: [
    "Hey! Nice to meet you. I can tell you about Aaron's skills, projects, education, certificates, and more. What would you like to know?"
  ],

  // About
  about: [
    "Aaron M. Cañada is a Front-End Developer & UI/UX Designer from Quezon City, Philippines. He's passionate about crafting fast, accessible, and visually compelling web experiences.",
    "He's currently pursuing a Bachelor of Science in Information Technology at Quezon City University (2023 - Present). He loves trying out new tech, building side projects, and creating digital experiences that matter.",
    "Fun facts: Born on September 27, 2004, Filipino, and his interests include Sports and Frontend Development."
  ],
  who: [
    "Aaron M. Cañada — an IT student and aspiring Full-Stack Developer based in Quezon City, Philippines. He specializes in front-end development and UI/UX design, with 9+ projects built and 11+ certifications earned."
  ],
  aaron: [
    "Aaron M. Cañada is a web development student who loves learning new technologies and building responsive, accessible, and efficient websites. He's currently studying Information Technology at Quezon City University and is available for opportunities!"
  ],

  // Skills
  skills: [
    "Here are Aaron's technical skills:",
    "Frontend: HTML, React, TypeScript, Tailwind CSS",
    "Backend: JavaScript, Node.js, Express, PHP, C#, ASP.NET Core",
    "Databases: MySQL, MSSQL (SQL Server)",
    "Tools: Git, Figma, Vite",
    "Soft Skills: Communication, Work Under Pressure, Teamwork",
    "He's currently deepening his expertise in React, TypeScript, and modern web development practices."
  ],
  frontend: [
    "Aaron's frontend skills include: HTML, React, TypeScript, Tailwind CSS, CSS, and JavaScript. He's particularly passionate about creating visually stunning and accessible web experiences."
  ],
  backend: [
    "For backend development, Aaron works with: JavaScript, Node.js, Express, PHP, C#, and ASP.NET Core. He's experienced in building full-stack applications with REST APIs."
  ],
  database: [
    "Aaron has experience with MySQL and MSSQL (SQL Server) for database management. He's used them in projects like MoneyFlow Tracker and MySuperSystem2025."
  ],
  tools: [
    "Aaron uses Git for version control, Figma for UI/UX design, and Vite as his preferred build tool for React projects."
  ],
  react: [
    "React is one of Aaron's core technologies. He uses it extensively with TypeScript and Tailwind CSS to build modern, component-based web applications. Most of his projects — including this portfolio — are built with React."
  ],
  typescript: [
    "Aaron uses TypeScript across most of his projects for type-safe, maintainable code. Combined with React, it's his go-to stack for frontend development."
  ],

  // Projects
  projects: [
    "Aaron has built 9+ projects. Here are his featured ones:",
    "1. Schatzies Events — Professional event planning website (React, TypeScript, Tailwind CSS, Vite). Live at schatziesevents.com",
    "2. Algorithm Portfolio — Interactive algorithm showcase with macOS-inspired UI (React, TypeScript, Tailwind CSS, Vite)",
    "3. MoneyFlow Tracker — Personal finance app for income/expense tracking (PHP, HTML, CSS, MySQL)",
    "4. OneForAll — All-in-one password manager, task tracker, and finance tool (React, TypeScript, Node.js, Tailwind CSS)",
    "5. MySuperSystem2025 — Full-stack ASP.NET Core MVC app with expense tracking and password manager (C#, ASP.NET Core, SQL Server)",
    "6. RL Phil Construction — Professional construction company website (React, TypeScript, Tailwind CSS)"
  ],
  schatzies: [
    "Schatzies Events is a professional event planning website Aaron built as the Front-End Developer. It showcases services, portfolio, and client testimonials with a modern, responsive design. Built with React, TypeScript, Tailwind CSS, and Vite. Live at: schatziesevents.com"
  ],
  algorithm: [
    "The Algorithm Portfolio is a comprehensive compilation showcasing algorithm implementations and problem-solving approaches. It features a macOS-inspired UI with interactive demonstrations, code examples, and a dynamic theme switcher. Built with React, TypeScript, Tailwind CSS, and Vite."
  ],
  moneyflow: [
    "MoneyFlow Tracker is a personal finance web app that helps users monitor income and expenses. It provides daily, weekly, and monthly insights for better budget management. Built with PHP, HTML, CSS, MySQL, and JavaScript."
  ],
  oneforall: [
    "OneForAll is a comprehensive all-in-one app that combines a password manager, task tracker, and money flow tracker in one place. Built with React, TypeScript, Node.js, and Tailwind CSS. Try it at: all-for-one-theta.vercel.app"
  ],
  supersystem: [
    "MySuperSystem2025 is a full-stack ASP.NET Core MVC application featuring expense tracking, task management, and a secure password manager. Built with Clean Architecture using C#, ASP.NET Core MVC, Entity Framework Core, and SQL Server."
  ],
  construction: [
    "RL Phil Construction is a responsive static website designed to represent a professional construction company brand, emphasizing clarity, trust, and usability. Built with React, TypeScript, and Tailwind CSS. Live at: rl-phil-construction.vercel.app"
  ],

  // Education
  education: [
    "Aaron's educational background:",
    "Primary: Manuel Luis Quezon Elementary School (2010-2016)",
    "Secondary: Commonwealth High School (2017-2023) — Graduated with consistent honors, maintaining a 93 average",
    "Tertiary: Quezon City University (2023-Present) — Bachelor of Science in Information Technology",
    "He's currently focused on web development, modern frameworks, and actively building personal projects."
  ],
  school: [
    "Aaron is currently studying at Quezon City University, pursuing a Bachelor of Science in Information Technology (2023-Present). He previously graduated with honors from Commonwealth High School with a 93 average."
  ],
  university: [
    "Aaron attends Quezon City University where he's pursuing a BS in Information Technology. He's learning modern web technologies like React, PHP, and MySQL while actively building personal projects."
  ],

  // Certificates
  certificates: [
    "Aaron holds 11+ Google certifications:",
    "Google UX Design Specialization (7-Course Series) — Covers end-to-end UX/UI design, Figma prototyping, and research",
    "Google IT Support Professional Certificate — Certified in technical troubleshooting and system operations",
    "Google Project Management (Foundations & Initiation) — Mastery of project lifecycles, stakeholders, and organizational management",
    "Plus 8 more individual course certificates in UX Design, wireframing, prototyping, and research."
  ],
  certifications: [
    "Aaron has completed 11+ certifications from Google, covering:",
    "UX Design (full 7-course specialization), IT Support Fundamentals, Project Management (Foundations & Initiation), UI prototyping in Figma, UX Research, Wireframing, and High-Fidelity Design."
  ],
  google: [
    "All of Aaron's certifications are from Google via Coursera. They cover three main areas: UX/UI Design (7-course specialization), IT Support (technical troubleshooting), and Project Management (foundations & initiation)."
  ],
  ux: [
    "Aaron holds the full Google UX Design Specialization — a 7-course series covering end-to-end UX/UI design, Figma prototyping, user research, wireframing, and high-fidelity design. He earned individual certificates for each course."
  ],

  // Contact
  contact: [
    "Want to reach Aaron? Here's how:",
    "Email: canada.aaron.mulat@gmail.com",
    "Phone: 0958 304 9146",
    "GitHub: github.com/EYRON27",
    "LinkedIn: Aaron Cañada",
    "Location: San Pedro St. Commonwealth, Quezon City, Philippines",
    "He's currently available for new opportunities!"
  ],
  email: [
    "Aaron's email is: canada.aaron.mulat@gmail.com — Feel free to reach out for collaborations, internships, or project inquiries!"
  ],
  phone: [
    "Aaron's phone number is: 0958 304 9146"
  ],
  location: [
    "Aaron is based in San Pedro St. Commonwealth, Quezon City, Philippines."
  ],
  github: [
    "Aaron's GitHub is: github.com/EYRON27 — Check out his repositories for source code of his projects!"
  ],
  linkedin: [
    "You can connect with Aaron on LinkedIn by searching for 'Aaron Cañada' or visiting his profile directly."
  ],
  hire: [
    "Aaron is currently available for new opportunities! He's open to internships, freelance work, and full-time positions. Reach him at canada.aaron.mulat@gmail.com or call 0958 304 9146."
  ],
  available: [
    "Yes! Aaron is currently available and looking for new opportunities. Whether it's an internship, project, or full-time role — his inbox is open at canada.aaron.mulat@gmail.com"
  ],

  // Personal Info
  age: [
    "Aaron was born on September 27, 2004. He's currently 20 years old, based in Quezon City, Philippines."
  ],
  birthday: [
    "Aaron's birthday is September 27, 2004."
  ],
  hobby: [
    "Aaron's interests include Sports and Frontend Development. When he's not coding, he enjoys trying out new tech and building side projects."
  ],
  interest: [
    "Aaron is interested in Sports and Frontend Development. He's passionate about creating visually stunning web experiences and is always eager to learn new tools and frameworks."
  ],
};

// Suggested quick-ask topics
const suggestedTopics = [
  { label: 'Skills', keyword: 'skills' },
  { label: 'Projects', keyword: 'projects' },
  { label: 'Education', keyword: 'education' },
  { label: 'Certificates', keyword: 'certificates' },
  { label: 'Contact', keyword: 'contact' },
  { label: 'About Aaron', keyword: 'about' },
];

function findAnswer(input: string): string[] {
  const lower = input.toLowerCase().trim();

  // Direct keyword match
  for (const key of Object.keys(knowledgeBase)) {
    if (lower === key || lower.includes(key)) {
      return knowledgeBase[key];
    }
  }

  // Fuzzy / partial matches
  const fuzzyMap: Record<string, string> = {
    'what do you know': 'hello',
    'help': 'hello',
    'introduce': 'about',
    'yourself': 'about',
    'tech stack': 'skills',
    'technologies': 'skills',
    'work': 'projects',
    'portfolio': 'projects',
    'built': 'projects',
    'degree': 'education',
    'study': 'education',
    'studying': 'education',
    'college': 'university',
    'cert': 'certificates',
    'qualification': 'certificates',
    'reach': 'contact',
    'connect': 'contact',
    'message': 'contact',
    'number': 'phone',
    'call': 'phone',
    'address': 'location',
    'where': 'location',
    'born': 'age',
    'old': 'age',
    'hobbies': 'hobby',
    'fun': 'hobby',
    'job': 'hire',
    'opportunity': 'available',
    'freelance': 'hire',
    'internship': 'hire',
  };

  for (const [partial, key] of Object.entries(fuzzyMap)) {
    if (lower.includes(partial)) {
      return knowledgeBase[key];
    }
  }

  return [
    "I'm not sure about that one! Try asking about: skills, projects, education, certificates, contact, or about Aaron."
  ];
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hi! I'm Aaron's portfolio assistant. Ask me anything about his skills, projects, education, or how to contact him!",
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMessage: Message = {
      id: Date.now(),
      text: msg,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const answers = findAnswer(msg);
      const botMessages: Message[] = answers.map((ans, i) => ({
        id: Date.now() + i + 1,
        text: ans,
        sender: 'bot' as const,
      }));
      setMessages((prev) => [...prev, ...botMessages]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 group bg-amber-500 hover:bg-amber-600 hover:scale-110 hover:shadow-xl"
        aria-label="Toggle chatbot"
      >
        <MessageSquare className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
        {/* Notification pulse */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-neutral-950 animate-pulse"></span>
        )}
      </button>

      {/* Chat Window — to the LEFT of the button */}
      <div
        className={`fixed bottom-6 right-24 z-[9998] w-[360px] max-w-[calc(100vw-100px)] transition-all duration-300 ease-out ${
          isOpen && !isMinimized
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col h-[520px]">
          
          {/* Header */}
          <div className="bg-neutral-900 dark:bg-neutral-800 px-5 py-4 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-amber-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-sm tracking-wide">Aarvieve Bot</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-neutral-400 text-[11px] font-medium">Always online</span>
              </div>
            </div>
            {/* Minimize button */}
            <button
              onClick={() => setIsMinimized(true)}
              className="text-neutral-500 hover:text-white transition-colors p-1"
              aria-label="Minimize chat"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-500 hover:text-white transition-colors p-1"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50 dark:bg-neutral-950 chatbot-scroll">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mb-0.5">
                    <Bot className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 text-[13px] leading-relaxed font-medium rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-white rounded-br-md'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 rounded-bl-md shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center shrink-0 mb-0.5">
                    <User className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-300" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Topics */}
          {messages.length <= 1 && (
            <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-800/50 shrink-0">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Quick Ask</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestedTopics.map((topic) => (
                  <button
                    key={topic.keyword}
                    onClick={() => handleSend(topic.keyword)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  >
                    {topic.label}
                    <ChevronRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects..."
                className="flex-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm font-medium rounded-full px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-500/50 border border-neutral-200 dark:border-neutral-700 placeholder:text-neutral-400 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 disabled:opacity-30 disabled:hover:bg-amber-500 flex items-center justify-center transition-all duration-200 shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Minimized Bar — appears to the left of button */}
      <div
        className={`fixed bottom-6 right-24 z-[9998] transition-all duration-300 ease-out ${
          isOpen && isMinimized
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        <div
          className="flex items-center gap-3 bg-neutral-900 dark:bg-neutral-800 rounded-2xl shadow-xl border border-neutral-700 px-4 py-3 cursor-pointer hover:bg-neutral-800 transition-colors"
          onClick={() => setIsMinimized(false)}
        >
          <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5 text-amber-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm">Aarvieve Bot</p>
            <p className="text-amber-500 text-[11px] font-medium">Minimized — tap to expand</p>
          </div>
          <button
            className="text-neutral-400 hover:text-white transition-colors p-1 shrink-0"
            onClick={(e) => { e.stopPropagation(); setIsMinimized(false); }}
            aria-label="Expand chat"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            className="text-neutral-400 hover:text-white transition-colors p-1 shrink-0"
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); setIsMinimized(false); }}
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <style>{`
        .chatbot-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .chatbot-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .chatbot-scroll::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};

export default Chatbot;
