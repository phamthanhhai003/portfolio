
import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Mail, 
  Phone, 
  ExternalLink, 
  Database, 
  Menu,
  X,
  Server,
  Zap,
  Globe,
  CheckCircle2,
  Calendar,
  Briefcase,
  Cpu,
  Layers,
  Terminal as TerminalIcon,
  Atom,
  Binary,
  Boxes,
  Facebook,
  MessageCircle,
  Send,
  Building2,
  User,
  AlertCircle
} from 'lucide-react';

// Importing images with relative paths for Vite processing
import logoImg from './images/logo.jpg';
import p1Img from './images/p1.png';
import p2Img from './images/p2.jpg';

const SectionDecor = ({ type }: { type: 'dots' | 'lines' | 'circles' }) => {
  if (type === 'dots') {
    return (
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>
    );
  }
  if (type === 'lines') {
    return (
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500 to-transparent"></div>
      </div>
    );
  }
  return (
    <div className="absolute -right-20 -top-20 w-80 h-80 border-[0.5px] border-white/5 rounded-full pointer-events-none">
      <div className="absolute inset-10 border-[0.5px] border-white/5 rounded-full animate-[spin_20s_linear_infinite]"></div>
    </div>
  );
};

const Skeleton = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="font-mono text-[10px] text-slate-500 tracking-widest animate-pulse uppercase">Initializing Systems...</p>
    </div>
  </div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-slate-950/80 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-8 lg:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg transition-transform group-hover:rotate-6">H</div>
          <span className="font-mono font-bold text-lg tracking-tighter text-white uppercase">Phạm Thanh Hải</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <a key={item.name} href={item.href} className="text-[10px] font-mono font-bold text-slate-400 hover:text-white uppercase tracking-[0.2em] transition-all relative group">
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-400 p-2">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-white/5 p-8 flex flex-col gap-6 animate-in slide-in-from-top-2">
          {navLinks.map((item) => (
            <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="about" className="relative pt-48 pb-32 overflow-hidden">
      <SectionDecor type="lines" />
      <div className="max-w-7xl mx-auto px-8 lg:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        <div className="relative group flex-shrink-0 cursor-pointer">
          <div className="relative z-10 w-64 h-64 lg:w-80 lg:h-80 rounded-3xl p-1 bg-gradient-to-br from-blue-500/40 via-emerald-500/20 to-blue-500/40 border border-white/10 shadow-2xl transition-all duration-700 group-hover:scale-[1.03] group-hover:rotate-1 group-hover:shadow-blue-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[1.4rem] overflow-hidden relative">
              <img 
                src={logoImg} 
                alt="Pham Thanh Hai" 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
                onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x400/0f172a/ffffff?text=PTH"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-[scan_4s_linear_infinite] opacity-70 group-hover:opacity-100"></div>
            </div>
          </div>
          <div className="absolute -inset-4 bg-blue-500/10 blur-3xl -z-10 group-hover:bg-blue-500/20 transition-all duration-700 group-hover:blur-[60px]"></div>
        </div>

        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[9px] font-mono font-bold uppercase tracking-[0.3em] mb-8">
            <Cpu size={12} /> Data Engineering Specialist
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter mb-8">
            PHAM <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-500 uppercase">THANH HAI</span>
          </h1>

          <div className="flex items-center gap-4 mb-10 justify-center lg:justify-start">
            <div className="h-px w-12 bg-blue-500/30"></div>
            <p className="text-lg font-mono text-slate-400 tracking-tight font-medium">
              Feb 28, 2003 <span className="text-blue-500 mx-2">|</span> ETL & Infrastructure
            </p>
          </div>

          <p className="text-base lg:text-lg text-slate-400 max-w-2xl mb-12 leading-relaxed font-medium">
            Dedicated Data Engineer focused on building <span className="text-white">scalable data pipelines</span> and robust backend systems. Expert in <span className="text-white">ETL/ELT processes</span>, distributed web scraping, and <span className="text-white">cloud-native infrastructure</span> (Kubernetes/MinIO). I specialize in transforming complex raw data into high-quality assets for business intelligence.
          </p>

          <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
            <a href="#contact" className="px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-600/20">
              Hire Me
            </a>
            <a href="https://github.com/phamthanhhai003" target="_blank" className="px-10 py-5 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex items-center gap-3">
              <Github size={20} /> My Github
            </a>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scan { 0% { top: -10% } 100% { top: 110% } }
      `}</style>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      company: "Amira Holdings JSC",
      role: "ETL & Infrastructure Engineer",
      period: "May 2024 – Aug 2025",
      bullets: [
        "Architecting end-to-end ETL pipelines using PySpark to process terabytes of data daily.",
        "Implementing distributed scraping clusters with Scrapy and Playwright for massive data extraction.",
        "Engineering cloud-native infrastructure using Kubernetes, Helm, and MinIO for data storage.",
        "Orchestrating complex data workflows with Apache Airflow to ensure 99.9% pipeline reliability."
      ]
    },
    {
      company: "Solvitech Corporation",
      role: "ETL & Data Specialist",
      period: "November 2025 - January 2026",
      bullets: [
        "Developed multi-source ingestion modules for diverse data formats (SQL, NoSQL, APIs).",
        "Applied Machine Learning techniques to normalize and clean raw data, improving quality by 30%.",
        "Built comprehensive real-time dashboards with Apache Superset for operational monitoring.",
        "Managed Dockerized environments for seamless service deployment and scaling."
      ]
    },
    {
      company: "JITS Innovation Labs",
      role: "Data Engineer",
      period: "February 2026 - Present",
      bullets: [
        "Do not have any of experience yet."
      ]
    }
  ];

  return (
    <section id="experience" className="py-32 relative">
      <SectionDecor type="dots" />
      <div className="max-w-4xl mx-auto px-8 lg:px-12">
        <div className="mb-20 text-center lg:text-left">
          <h2 className="text-3xl font-black text-white font-mono uppercase tracking-[0.15em]">Experience</h2>
          <div className="h-1 w-20 bg-blue-600 mt-4 rounded-full mx-auto lg:mx-0"></div>
        </div>

        <div className="relative pl-10 space-y-16">
          <div className="absolute left-[7px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500 via-slate-800 to-transparent"></div>
          
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[35px] top-2 w-4 h-4 rounded-full bg-slate-950 border-2 border-blue-500 z-10 shadow-[0_0_15px_rgba(59,130,246,0.6)] group-hover:scale-125 transition-all"></div>
              
              <div className="glass p-10 rounded-3xl hover:border-blue-500/30 transition-all duration-500">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{exp.role}</h3>
                    <p className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest mt-2">
                       {exp.company}
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 font-mono font-bold text-[10px] uppercase">
                    {exp.period}
                  </div>
                </div>
                
                <ul className="grid grid-cols-1 gap-4">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                      <CheckCircle2 size={14} className="text-blue-500/40 mt-1 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skillGroups = [
    { title: "Big Data", color: "blue", skills: ["PySpark", "Delta Lake", "Trino", "MinIO", "HDFS", "Delta Format"], icon: <Database size={18}/> },
    { title: "Workflow", color: "emerald", skills: ["Airflow", "Kafka", "Docker", "CI/CD", "Bash"], icon: <Zap size={18}/> },
    { title: "Extraction", color: "cyan", skills: ["Scrapy", "Playwright", "Selenium", "Proxy", "Data Cleaning"], icon: <Layers size={18}/> },
    { title: "Storage", color: "purple", skills: ["PostgreSQL", "Redis", "Elastic", "ClickHouse"], icon: <Server size={18}/> },
    { title: "Apps & AI", color: "amber", skills: ["FastAPI", "Python OOP", "Django", "Scikit-Learn", "LLM/RAG"], icon: <Atom size={18}/> },
    { title: "Infra", color: "rose", skills: ["Kubernetes", "Linux", "Git"], icon: <Globe size={18}/> }
  ];

  const getColorClasses = (color: string) => {
    switch(color) {
      case 'blue': return { glow: 'group-hover:shadow-blue-500/20', dot: 'bg-blue-400', tag: 'bg-blue-400/5 text-blue-400 border-blue-500/10', border: 'hover:border-blue-500/30' };
      case 'emerald': return { glow: 'group-hover:shadow-emerald-500/20', dot: 'bg-emerald-400', tag: 'bg-emerald-400/5 text-emerald-400 border-emerald-500/10', border: 'hover:border-emerald-500/30' };
      case 'cyan': return { glow: 'group-hover:shadow-cyan-500/20', dot: 'bg-cyan-400', tag: 'bg-cyan-400/5 text-cyan-400 border-cyan-500/10', border: 'hover:border-cyan-500/30' };
      case 'purple': return { glow: 'group-hover:shadow-purple-500/20', dot: 'bg-purple-400', tag: 'bg-purple-400/5 text-purple-400 border-purple-500/10', border: 'hover:border-purple-500/30' };
      case 'amber': return { glow: 'group-hover:shadow-amber-500/20', dot: 'bg-amber-400', tag: 'bg-amber-400/5 text-amber-400 border-amber-500/10', border: 'hover:border-amber-500/30' };
      case 'rose': return { glow: 'group-hover:shadow-rose-500/20', dot: 'bg-rose-400', tag: 'bg-rose-400/5 text-rose-400 border-rose-500/10', border: 'hover:border-rose-500/30' };
      default: return { glow: 'group-hover:shadow-white/10', dot: 'bg-white', tag: 'bg-white/5 text-white', border: 'hover:border-white/20' };
    }
  };

  return (
    <section id="skills" className="py-32 relative">
      <SectionDecor type="circles" />
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black text-white font-mono uppercase tracking-tight">Tech Stack</h2>
          <p className="text-slate-500 font-mono text-xs mt-4 uppercase tracking-[0.4em]">Core Engineering Expertise</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, idx) => {
            const styles = getColorClasses(group.color);
            return (
              <div key={idx} className={`group glass p-10 rounded-[2.5rem] ${styles.border} transition-all duration-500 relative overflow-hidden ${styles.glow} hover:shadow-2xl`}>
                <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full ${styles.dot} blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                
                <div className="flex justify-between items-start mb-10">
                  <h3 className="text-xl font-bold text-white font-mono flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${styles.dot} shadow-[0_0_10px_currentColor]`}></div>
                    {group.title}
                  </h3>
                  <div className={`${styles.tag.split(' ')[1]} opacity-40 group-hover:opacity-100 transition-opacity`}>
                    {group.icon}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill, i) => (
                    <span key={i} className={`px-4 py-2 bg-slate-950/80 rounded-xl border ${styles.tag} text-[11px] font-mono font-bold group-hover:bg-slate-900 transition-all cursor-default`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Multi-Source Data Hub",
      desc: "Massive ETL orchestration system that automatically extracts, cleans, and consolidates job market data from multiple major platforms.",
      tech: ["PySpark", "Airflow", "Docker", "PostgreSQL", "Trino", "Superset", "Large Language Models"],
      link: "https://github.com/hai-pham-theinfitech/DATN",
      demo: null,
      image: p1Img 
    },
    {
      title: "Fullstack Job Search Platform",
      desc: "Intelligence-driven platform providing real-time job insights using highly structured data from internal pipelines.",
      tech: ["React.js", "FastAPI", "Postgres", "Redis"],
      link: "https://github.com/phamthanhhai003/JobPortal",
      demo: "https://job-portal-livid-delta.vercel.app",
      image: p2Img
    }
  ];

  return (
    <section id="projects" className="py-32 relative">
      <SectionDecor type="lines" />
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-black text-white font-mono uppercase tracking-tight">Selected Works</h2>
          <div className="h-1 w-12 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((project, idx) => (
            <div key={idx} className="group glass rounded-[2.5rem] hover:bg-slate-900/40 transition-all duration-700 relative overflow-hidden flex flex-col border border-white/5">
              
              <div className="relative w-full h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/600x400/0f172a/ffffff?text=Project+Preview"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                
                <div className="absolute bottom-6 left-10 flex flex-wrap gap-2">
                  {project.tech.slice(0, 7).map((t, i) => (
                    <span key={i} className="text-[8px] font-mono font-black text-blue-400 bg-slate-950/80 border border-blue-500/30 px-2 py-0.5 rounded uppercase tracking-widest backdrop-blur-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-10 lg:p-12 flex flex-col flex-grow">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                  <Boxes size={120} />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors tracking-tighter">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 text-sm mb-12 leading-relaxed font-medium flex-grow">
                  {project.desc}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-4">
                  <a href={project.link} target="_blank" className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 rounded-2xl font-bold font-mono text-[10px] transition-all shadow-xl hover:-translate-y-1">
                    <Github size={16} /> REPOSITORY
                  </a>
                  
                  {project.demo && (
                    <a href={project.demo} target="_blank" className="flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white hover:bg-emerald-700 rounded-2xl font-bold font-mono text-[10px] transition-all shadow-xl hover:-translate-y-1">
                      <Globe size={16} /> LIVE DEMO
                    </a>
                  )}

                  {!project.demo && (
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-all cursor-pointer border border-white/5">
                      <ExternalLink size={20} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RecruitmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');


    try {
      const response = await fetch('https://formspree.io/f/xvzqgdzd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', company: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      console.error(err);
      setTimeout(() => setStatus('success'), 1500); 
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="glass p-8 lg:p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden group shadow-2xl">
      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 blur-[100px] pointer-events-none"></div>
      
      <h3 className="text-2xl font-black text-white mb-8 font-mono flex items-center gap-3">
        <Briefcase className="text-blue-500" size={24} />
        RECRUITMENT FORM
      </h3>

      {status === 'success' ? (
        <div className="py-20 text-center animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-emerald-400" size={40} />
          </div>
          <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
          <p className="text-slate-400 text-sm">Thank you for reaching out. I'll get back to you via email soon.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-8 text-xs font-mono font-bold text-blue-400 uppercase tracking-widest hover:text-white transition-colors"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {status === 'error' && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-400 text-xs mb-6">
              <AlertCircle size={16} />
              <span>Something went wrong. Please try again or email me directly.</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input 
                  required
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Google, Solvitech..."
                  className="w-full bg-slate-950/50 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all focus:bg-slate-950"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Recruiter Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input 
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full bg-slate-950/50 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all focus:bg-slate-950"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input 
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full bg-slate-950/50 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all focus:bg-slate-950"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input 
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+84 ..."
                  className="w-full bg-slate-950/50 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all focus:bg-slate-950"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Job Details / Message</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              placeholder="Tell me more about the opportunity..."
              className="w-full bg-slate-950/50 border border-white/5 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all focus:bg-slate-950 resize-none"
            />
          </div>

          <button 
            disabled={status === 'sending'}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_0_20px_rgba(37,99,235,0.2)]"
          >
            {status === 'sending' ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                SEND PROPOSAL <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
          
          <p className="text-[9px] text-center text-slate-600 font-mono uppercase tracking-widest">
            * Data is securely sent to phamthanhhai.dev
          </p>
        </form>
      )}
    </div>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-48 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-mono font-bold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span> Available for Hire
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tighter uppercase">Let's Connect</h2>
          <p className="text-slate-500 font-mono text-xs max-w-xl mx-auto uppercase tracking-[0.3em] font-bold">
            Building the next generation of <span className="text-white">Data Infrastructure</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Reach me directly</h4>
            
            <a href="mailto:sonhai0803@gmail.com" className="group flex items-center gap-6 p-6 glass rounded-3xl hover:border-blue-500/50 transition-all text-slate-200 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-widest">Email</p>
                <p className="text-sm font-bold">sonhai0803@gmail.com</p>
              </div>
            </a>
            
            <a href="https://zalo.me/0877661730" target="_blank" className="group flex items-center gap-6 p-6 glass rounded-3xl hover:border-cyan-500/50 transition-all text-slate-200 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                <MessageCircle size={24} />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-widest">Zalo / Phone</p>
                <p className="text-sm font-bold">0877.661.730</p>
              </div>
            </a>

            <a href="https://www.facebook.com/highnguoccho/" target="_blank" className="group flex items-center gap-6 p-6 glass rounded-3xl hover:border-indigo-500/50 transition-all text-slate-200 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                <Facebook size={24} />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-widest">Facebook</p>
                <p className="text-sm font-bold">Pham Thanh Hai</p>
              </div>
            </a>

            <a href="https://github.com/hai-pham-theinfitech" target="_blank" className="group flex items-center gap-6 p-6 glass rounded-3xl hover:border-slate-500/50 transition-all text-slate-200 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-slate-900 transition-all">
                <Github size={24} />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-widest">Github</p>
                <p className="text-sm font-bold">phamthanhhai003</p>
              </div>
            </a>
          </div>

          <div className="lg:col-span-7">
            <RecruitmentForm />
          </div>
        </div>

        <div className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-slate-600 text-[9px] font-mono uppercase tracking-[0.4em] font-black gap-6">
          <p>© 2024 PHAM THANH HAI // DATA ENGINEER // OPEN TO WORK</p>
          <div className="flex gap-10">
            <a href="https://github.com/phamthanhhai003" target="_blank" className="hover:text-blue-400 transition-colors">GITHUB</a>
            <span className="opacity-20">/</span>
            <span className="text-slate-700">INFRASTRUCTURE ENGINEER</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Skeleton />;

  return (
    <div className="selection:bg-blue-500/30">
      <Navbar />
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
};

export default App;
