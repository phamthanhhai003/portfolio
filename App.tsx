
import React, { useState, useEffect } from 'react';
import {
  Github, Mail, Phone, Database, Menu, X, Server, Zap, Globe,
  CheckCircle2, Briefcase, Cpu, Layers, Terminal as TerminalIcon,
  Atom, Facebook, MessageCircle, Send, Building2, User, AlertCircle,
  Moon, Sun
} from 'lucide-react';

import logoImg from './images/logo.jpg';
import p1Img from './images/p1.png';
import p2Img from './images/p2.jpg';
import p3Img from './images/p3.png';

import logoAmira from './logo/amira.jpg';
import logoSolvitech from './logo/solvitech.jpg';
import logoJits from './logo/jits.jpg';

type Lang = 'en' | 'vi';
const LanguageContext = React.createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'en', setLang: () => {} });
const useLang = () => React.useContext(LanguageContext);

const translations = {
  en: {
    nav: ['About', 'Experience', 'Skills', 'Projects', 'Contact'],
    badge: 'Data Engineering Specialist',
    bio: <>Dedicated Data Engineer focused on building <span className="text-blue-700 dark:text-blue-400 font-semibold">scalable data pipelines</span> and robust backend systems. Expert in <span className="text-blue-700 dark:text-blue-400 font-semibold">ETL/ELT processes</span>, distributed web scraping, and <span className="text-blue-700 dark:text-blue-400 font-semibold">cloud-native infrastructure</span> (Kubernetes/MinIO). I specialize in transforming complex raw data into high-quality assets for business intelligence. Proficient in leveraging <span className="text-blue-700 dark:text-blue-400 font-semibold">AI Agents</span> to automate workflows, accelerate development, and solve real engineering problems effectively. Capable of <span className="text-blue-700 dark:text-blue-400 font-semibold">automating repetitive processes</span> across data pipelines, deployments, and documentation — reducing manual effort and increasing team velocity.</>,
    hireMe: 'Hire Me',
    myGithub: 'My Github',
    expTitle: 'Experience',
    skillsTitle: 'Tech Stack',
    skillsSub: 'Core Engineering Expertise',
    projectsTitle: 'Selected Works',
    repository: 'REPOSITORY',
    liveDemoLabel: 'LIVE DEMO',
    quickRunLabel: 'Quick Run — no clone needed',
    copy: 'Copy',
    copied: 'Copied!',
    contactBadge: 'Available for Hire',
    contactTitle: "Let's Connect",
    contactSub: <>Open to new opportunities in <span className="text-blue-700 dark:text-blue-400 font-semibold">Data Infrastructure</span></>,
    reachMe: 'Reach me directly',
    formTitle: 'RECRUITMENT FORM',
    formCompany: 'Company Name',
    formName: 'Recruiter Name',
    formEmail: 'Email Address',
    formPhone: 'Phone Number',
    formMessage: 'Job Details / Message',
    formPlaceholderMessage: 'Tell me more about the opportunity...',
    formSend: 'SEND PROPOSAL',
    formSuccess: 'Message Sent!',
    formSuccessSub: "Thank you for reaching out. I'll get back to you via email soon.",
    formSendAnother: 'Send another message',
    formError: 'Something went wrong. Please try again or email me directly.',
    formNote: '* Data is securely sent to phamthanhhai.dev',
    footer: '© 2024 PHAM THANH HAI // DATA ENGINEER // OPEN TO WORK',
  },
  vi: {
    nav: ['Giới thiệu', 'Kinh nghiệm', 'Kỹ năng', 'Dự án', 'Liên hệ'],
    badge: 'Chuyên gia Data Engineering',
    bio: <>Là một Data Engineer, em tập trung xây dựng các hệ thống dữ liệu <span className="text-blue-700 dark:text-blue-400 font-semibold">ổn định, có khả năng mở rộng</span> và phục vụ tốt cho nhu cầu phân tích. Em có kinh nghiệm làm việc với <span className="text-blue-700 dark:text-blue-400 font-semibold">ETL/ELT</span>, dữ liệu phân tán và hạ tầng <span className="text-blue-700 dark:text-blue-400 font-semibold">cloud-native</span> như Kubernetes, MinIO. Em luôn hướng đến việc biến dữ liệu thô thành những nguồn dữ liệu rõ ràng, chất lượng và hữu ích cho việc ra quyết định. Ngoài ra, em có khả năng vận dụng <span className="text-blue-700 dark:text-blue-400 font-semibold">AI Agent</span> hiệu quả vào công việc — từ tự động hóa quy trình đến tăng tốc phát triển hệ thống. Em có thể <span className="text-blue-700 dark:text-blue-400 font-semibold">tự động hóa nhiều quy trình lặp lại</span> trong pipeline dữ liệu, triển khai hệ thống và quản lý tài liệu, giúp giảm thiểu công việc thủ công và nâng cao hiệu suất toàn đội.</>,
    hireMe: 'Liên hệ ngay',
    myGithub: 'Github của em',
    expTitle: 'Kinh nghiệm',
    skillsTitle: 'Công nghệ',
    skillsSub: 'Chuyên môn kỹ thuật cốt lõi',
    projectsTitle: 'Dự án nổi bật',
    repository: 'MÃ NGUỒN',
    liveDemoLabel: 'XEM DEMO',
    quickRunLabel: 'Chạy thử ngay — không cần clone',
    copy: 'Sao chép',
    copied: 'Đã sao chép!',
    contactBadge: 'Đang tìm kiếm cơ hội mới',
    contactTitle: 'Liên hệ với em',
    contactSub: <>Em sẵn sàng đồng hành cùng <span className="text-blue-700 dark:text-blue-400 font-semibold">đội ngũ của Anh/Chị</span></>,
    reachMe: 'Liên hệ trực tiếp qua',
    formTitle: 'FORM TUYỂN DỤNG',
    formCompany: 'Tên công ty',
    formName: 'Tên nhà tuyển dụng',
    formEmail: 'Địa chỉ Email',
    formPhone: 'Số điện thoại',
    formMessage: 'Thông tin công việc / Lời nhắn',
    formPlaceholderMessage: 'Cho em biết thêm về cơ hội này...',
    formSend: 'GỬI ĐỀ XUẤT',
    formSuccess: 'Đã gửi thành công!',
    formSuccessSub: 'Cảm ơn Anh/Chị đã liên hệ. Em sẽ phản hồi sớm nhất có thể.',
    formSendAnother: 'Gửi lại',
    formError: 'Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp qua email.',
    formNote: '* Dữ liệu được gửi bảo mật đến phamthanhhai.dev',
    footer: '© 2024 PHẠM THANH HẢI // DATA ENGINEER // SẴN SÀNG NHẬN VIỆC',
  }
};

const LanguagePopup = ({ onSelect }: { onSelect: (l: Lang) => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-3xl p-12 max-w-sm w-full mx-6 flex flex-col items-center gap-8 animate-in zoom-in-95 duration-300">
      <div className="w-14 h-14 bg-blue-700 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">H</div>
      <div className="text-center">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Choose Language</h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs font-mono uppercase tracking-widest">Chọn ngôn ngữ hiển thị</p>
      </div>
      <div className="flex gap-4 w-full">
        <button onClick={() => onSelect('en')} className="flex-1 py-4 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold font-mono text-sm transition-all hover:-translate-y-0.5 shadow-md">
          🇬🇧 English
        </button>
        <button onClick={() => onSelect('vi')} className="flex-1 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-600 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-800 dark:text-slate-200 font-bold font-mono text-sm transition-all hover:-translate-y-0.5">
          🇻🇳 Tiếng Việt
        </button>
      </div>
    </div>
  </div>
);

const Skeleton = () => (
  <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-blue-100 dark:border-blue-900 border-t-blue-700 rounded-full animate-spin"></div>
      <p className="font-mono text-[10px] text-slate-400 tracking-widest animate-pulse uppercase">Loading...</p>
    </div>
  </div>
);

const Navbar = ({ isDark, toggleDark }: { isDark: boolean; toggleDark: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useLang();
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hrefs = ['#about', '#experience', '#skills', '#projects', '#contact'];
  const navLinks = t.nav.map((name, i) => ({ name, href: hrefs[i] }));

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled
        ? 'py-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-sm border-b border-slate-200 dark:border-slate-700'
        : 'py-5 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-8 lg:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-9 h-9 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold shadow-md transition-transform group-hover:rotate-6 text-sm">H</div>
          <span className="font-mono font-bold text-sm tracking-tight text-slate-900 dark:text-white uppercase">Phạm Thanh Hải</span>
        </div>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((item) => (
            <a key={item.name} href={item.href} className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 uppercase tracking-[0.15em] transition-colors relative group">
              {item.name}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-700 dark:bg-blue-400 transition-all group-hover:w-full rounded-full"></span>
            </a>
          ))}
          <button
            onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
            className="text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all uppercase tracking-widest"
          >
            {lang === 'en' ? '🇻🇳 VI' : '🇬🇧 EN'}
          </button>
          <button
            onClick={toggleDark}
            className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
            title={isDark ? 'Switch to Light' : 'Switch to Dark'}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-600 dark:text-slate-400 p-2">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-lg p-8 flex flex-col gap-6">
          {navLinks.map((item) => (
            <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest hover:text-blue-700 dark:hover:text-blue-400">
              {item.name}
            </a>
          ))}
          <button onClick={toggleDark} className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const { lang } = useLang();
  const t = translations[lang];
  return (
    <section id="about" className="relative pt-36 pb-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(circle, #1d4ed8 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 dark:bg-blue-950/30 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-8 lg:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        <div className="relative group flex-shrink-0">
          <div className="relative w-56 h-56 lg:w-72 lg:h-72">
            <div className="absolute inset-0 rounded-3xl bg-blue-700 translate-x-3 translate-y-3 opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
              <img
                src={logoImg}
                alt="Pham Thanh Hai"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x400/1d4ed8/ffffff?text=PTH"; }}
              />
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-blue-700 text-white text-[9px] font-mono font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md">
            Open to Work
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-400 text-[9px] font-mono font-bold uppercase tracking-[0.25em] mb-6">
            <Cpu size={11} /> {t.badge}
          </div>

          <h1 className="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-none tracking-tight mb-5">
            PHAM<br className="hidden lg:block"/>
            <span className="text-blue-700 dark:text-blue-400">THANH HAI</span>
          </h1>

          <div className="flex items-center gap-3 mb-7 justify-center lg:justify-start">
            <div className="h-px w-8 bg-slate-300 dark:bg-slate-600"></div>
            <p className="text-sm font-mono text-slate-400 dark:text-slate-500 tracking-tight">
              Feb 28, 2003 <span className="text-slate-300 dark:text-slate-600 mx-1">|</span> ETL & Infrastructure
            </p>
          </div>

          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mb-9 leading-relaxed">
            {t.bio}
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a href="#contact" className="px-8 py-3.5 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-md shadow-blue-200 dark:shadow-blue-900/30 hover:-translate-y-0.5 text-sm">
              {t.hireMe}
            </a>
            <a href="https://github.com/phamthanhhai003" target="_blank" className="px-8 py-3.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl border-2 border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-all flex items-center gap-2 text-sm">
              <Github size={17} /> {t.myGithub}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const { lang } = useLang();
  const t = translations[lang];
  const experiences = [
    {
      company: "JITS Innovation Labs", logo: logoJits, role: "Data Engineer",
      period: "February 2026 - Present", isOnboard: true,
      bullets: [
        "Developed dbt transformation flows for banking financial reporting pipelines, ensuring data accuracy and traceability.",
        "Optimized Kubernetes infrastructure and CI/CD pipelines; contributed to system architecture design for enterprise data platforms.",
        "Collaborated directly with foreign clients at Central Banks (Timor-Leste, Myanmar), including onsite visits abroad to gather requirements and deliver data solutions.",
        "Applied AI Agents (Claude) for document management automation and accelerating data pipeline development workflows.",
        "Extracted and normalized data from T24 core banking system using Apache Spark and Airbyte CDC for downstream analytics."
      ],
      bulletsVi: [
        "Phát triển luồng chuyển đổi dbt cho pipeline báo cáo tài chính ngân hàng, đảm bảo độ chính xác và khả năng truy xuất dữ liệu.",
        "Tối ưu hạ tầng Kubernetes và CI/CD; đóng góp thiết kế kiến trúc hệ thống cho nền tảng dữ liệu doanh nghiệp.",
        "Làm việc trực tiếp với khách hàng nước ngoài tại Ngân hàng Trung ương (Timor-Leste, Myanmar), bao gồm công tác onsite nước ngoài để thu thập yêu cầu và triển khai giải pháp.",
        "Ứng dụng AI Agent (Claude) tự động hóa quản lý tài liệu và tăng tốc quy trình phát triển pipeline dữ liệu.",
        "Trích xuất và chuẩn hóa dữ liệu từ core banking T24 bằng Apache Spark và Airbyte CDC phục vụ phân tích downstream."
      ]
    },
    {
      company: "Solvitech Corporation", logo: logoSolvitech, role: "ETL & Data Specialist",
      period: "November 2025 - January 2026", isOnboard: false,
      bullets: [
        "Developed multi-source ingestion modules for diverse data formats (SQL, NoSQL, APIs).",
        "Applied Machine Learning techniques to normalize and clean raw data, improving quality by 30%.",
        "Built comprehensive real-time dashboards with Apache Superset for operational monitoring.",
        "Managed Dockerized environments for seamless service deployment and scaling."
      ],
      bulletsVi: [
        "Phát triển module nhập dữ liệu đa nguồn cho nhiều định dạng khác nhau (SQL, NoSQL, APIs).",
        "Áp dụng Machine Learning để chuẩn hóa và làm sạch dữ liệu thô, cải thiện chất lượng lên 30%.",
        "Xây dựng dashboard real-time toàn diện với Apache Superset phục vụ giám sát vận hành.",
        "Quản lý môi trường Docker hóa cho triển khai và mở rộng dịch vụ liền mạch."
      ]
    },
    {
      company: "Amira Holdings JSC", logo: logoAmira, role: "ETL & Infrastructure Engineer",
      period: "May 2024 – Aug 2025", isOnboard: false,
      bullets: [
        "Architecting end-to-end ETL pipelines using PySpark to process terabytes of data daily.",
        "Implementing distributed scraping clusters with Scrapy and Playwright for massive data extraction.",
        "Engineering cloud-native infrastructure using Kubernetes, Helm, and MinIO for data storage.",
        "Orchestrating complex data workflows with Apache Airflow to ensure 99.9% pipeline reliability."
      ],
      bulletsVi: [
        "Thiết kế pipeline ETL đầu cuối bằng PySpark để xử lý hàng terabyte dữ liệu mỗi ngày.",
        "Triển khai cụm scraping phân tán với Scrapy và Playwright cho thu thập dữ liệu quy mô lớn.",
        "Xây dựng hạ tầng cloud-native bằng Kubernetes, Helm và MinIO cho lưu trữ dữ liệu.",
        "Điều phối luồng dữ liệu phức tạp với Apache Airflow, đảm bảo độ tin cậy pipeline 99.9%."
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-8 lg:px-12">
        <div className="mb-14">
          <p className="text-[10px] font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-[0.3em] mb-2">02 / Career</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{t.expTitle}</h2>
          <div className="h-1 w-14 bg-blue-700 dark:bg-blue-500 mt-3 rounded-full"></div>
        </div>

        <div className="relative pl-10 space-y-8">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-blue-100 dark:bg-blue-900"></div>

          {experiences.map((exp, idx) => (
            <div key={idx} className="relative">
              <div className={`absolute -left-[35px] top-7 w-4 h-4 rounded-full border-2 bg-white dark:bg-slate-900 z-10 transition-all ${exp.isOnboard ? 'border-blue-700 dark:border-blue-400' : 'border-slate-300 dark:border-slate-600'}`}>
                {exp.isOnboard && <div className="absolute inset-[3px] rounded-full bg-blue-700 dark:bg-blue-400 animate-pulse"></div>}
              </div>

              <div className={`bg-white dark:bg-slate-800 border rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow duration-300 ${exp.isOnboard ? 'border-blue-200 dark:border-blue-700 ring-1 ring-blue-100 dark:ring-blue-900' : 'border-slate-200 dark:border-slate-700'}`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-600 flex-shrink-0 shadow-sm bg-white dark:bg-slate-700">
                      <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${exp.company}&backgroundColor=dbeafe`; }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                        {exp.isOnboard && <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse flex-shrink-0"></span>}
                      </div>
                      <p className="text-blue-700 dark:text-blue-400 font-mono text-[11px] font-bold uppercase tracking-wider mt-0.5">{exp.company}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1.5 rounded-lg font-mono font-bold text-[10px] uppercase tracking-wider whitespace-nowrap ${exp.isOnboard ? 'bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400'}`}>
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {(lang === 'vi' ? (exp as any).bulletsVi : exp.bullets).map((bullet: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      <CheckCircle2 size={14} className="text-blue-400 dark:text-blue-500 mt-0.5 flex-shrink-0" />
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
  const { lang } = useLang();
  const t = translations[lang];
  const skillGroups = [
    { title: "Big Data",   color: "blue",    skills: ["PySpark", "Delta Lake", "Trino", "MinIO", "HDFS", "Delta Format", "Iceberg", "Dremio", "Data Build Tool"], icon: <Database size={17}/> },
    { title: "Workflow",   color: "emerald", skills: ["Airflow", "Kafka", "Docker", "CI/CD", "Bash"], icon: <Zap size={17}/> },
    { title: "Extraction", color: "cyan",    skills: ["Scrapy", "Playwright", "Selenium", "Proxy", "Data Cleaning"], icon: <Layers size={17}/> },
    { title: "Storage",    color: "purple",  skills: ["PostgreSQL", "Redis", "Elastic", "ClickHouse"], icon: <Server size={17}/> },
    { title: "Apps & AI",  color: "amber",   skills: ["FastAPI", "Python OOP", "Django", "Scikit-Learn", "LLM/RAG", "AI Agent (Claude)"], icon: <Atom size={17}/> },
    { title: "Infra",      color: "rose",    skills: ["Kubernetes", "Linux", "Git", "Jenkins"], icon: <Globe size={17}/> }
  ];

  type ColorDef = { border: string; dot: string; tag: string; icon: string };
  const C: Record<string, ColorDef> = {
    blue:    { border: 'border-l-blue-500',    dot: 'bg-blue-500',    tag: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-700',       icon: 'text-blue-500 dark:text-blue-400' },
    emerald: { border: 'border-l-emerald-500', dot: 'bg-emerald-500', tag: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-700', icon: 'text-emerald-500 dark:text-emerald-400' },
    cyan:    { border: 'border-l-cyan-500',    dot: 'bg-cyan-500',    tag: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-700',       icon: 'text-cyan-500 dark:text-cyan-400' },
    purple:  { border: 'border-l-purple-500',  dot: 'bg-purple-500',  tag: 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-700', icon: 'text-purple-500 dark:text-purple-400' },
    amber:   { border: 'border-l-amber-500',   dot: 'bg-amber-500',   tag: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-700',   icon: 'text-amber-500 dark:text-amber-400' },
    rose:    { border: 'border-l-rose-500',    dot: 'bg-rose-500',    tag: 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-700',     icon: 'text-rose-500 dark:text-rose-400' },
  };

  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-[10px] font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-[0.3em] mb-2">03 / Expertise</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{t.skillsTitle}</h2>
          <p className="text-slate-500 dark:text-slate-500 font-mono text-[11px] mt-2 uppercase tracking-[0.25em]">{t.skillsSub}</p>
          <div className="h-1 w-12 bg-blue-700 dark:bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, idx) => {
            const s = C[group.color];
            return (
              <div key={idx} className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 border-l-4 ${s.border} rounded-2xl p-6 hover:shadow-md dark:hover:shadow-slate-900 transition-shadow duration-300`}>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.dot}`}></span>
                    {group.title}
                  </h3>
                  <span className={s.icon}>{group.icon}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, i) => (
                    <span key={i} className={`px-2.5 py-1 rounded-lg border text-[10px] font-mono font-semibold ${s.tag}`}>
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
  const { lang } = useLang();
  const t = translations[lang];
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const projects = [
    {
      title: "Multi-Source Data Hub", titleVi: "Hệ thống Data Hub Đa Nguồn",
      desc: "Massive ETL orchestration system that automatically extracts, cleans, and consolidates job market data from multiple major platforms.",
      descVi: "Hệ thống điều phối ETL quy mô lớn, tự động trích xuất, làm sạch và hợp nhất dữ liệu thị trường việc làm từ nhiều nền tảng lớn.",
      tech: ["PySpark", "Airflow", "Docker", "PostgreSQL", "Trino", "Superset", "Large Language Models"],
      link: "https://github.com/hai-pham-theinfitech/DATN", demo: null, image: p1Img
    },
    {
      title: "Fullstack Job Search Platform", titleVi: "Nền tảng Tìm kiếm Việc làm Fullstack",
      desc: "Intelligence-driven platform providing real-time job insights using highly structured data from internal pipelines.",
      descVi: "Nền tảng dựa trên dữ liệu thông minh, cung cấp thông tin việc làm real-time từ pipeline dữ liệu nội bộ có cấu trúc cao.",
      tech: ["React.js", "FastAPI", "Postgres", "Redis"],
      link: "https://github.com/phamthanhhai003/JobPortal", demo: "https://job-portal-livid-delta.vercel.app", image: p2Img
    },
    {
      title: "ElectroShop E-Commerce Platform", titleVi: "Nền tảng Thương mại Điện tử ElectroShop",
      desc: "Architected an AI-driven build system: 13 sequential skill files guide Claude Agent through the full SDLC, enforced by 10 bash hooks validating security, business logic, and state transitions at each checkpoint.",
      descVi: "Thiết kế hệ thống xây dựng AI: 13 skill file tuần tự hướng dẫn Claude Agent qua toàn bộ SDLC, được kiểm soát bởi 10 bash hook xác thực bảo mật, logic nghiệp vụ và chuyển trạng thái tại mỗi checkpoint.",
      tech: ["Node.js", "Express", "MySQL", "Docker", "Gemini AI", "VNPay", "Scrapy"],
      link: "https://github.com/hudeeeeee/skills-hooks-agent",
      linkLabel: lang === 'vi' ? 'Công cụ AI Dev' : 'AI Dev Tools',
      demo: "https://github.com/hudeeeeee/website",
      demoLabel: lang === 'vi' ? 'Mã nguồn' : 'Product Source',
      image: p3Img,
      quickRun: `curl -fsSL https://raw.githubusercontent.com/hudeeeeee/website/main/setup.sh | bash`
    }
  ];

  const p0 = projects[0];
  const p1 = projects[1];
  const p2 = projects[2];

  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-[10px] font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-[0.3em] mb-2">04 / Portfolio</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{t.projectsTitle}</h2>
          <div className="h-1 w-12 bg-blue-700 dark:bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="flex flex-col gap-7">

          {/* Connected card: Data Hub → Job Search Platform */}
          <div className="bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg dark:hover:shadow-slate-900 transition-shadow duration-300">
            {/* Pipeline header */}
            <div className="flex items-center gap-3 px-7 py-3.5 bg-blue-50 dark:bg-blue-900/30 border-b border-blue-200 dark:border-blue-700">
              <span className="text-[9px] font-mono font-black text-blue-700 dark:text-blue-400 uppercase tracking-[0.3em]">
                {lang === 'vi' ? 'Hệ thống End-to-End · Thu thập → Hiển thị' : 'End-to-End Pipeline · Collect → Serve'}
              </span>
              <div className="flex-1 flex items-center gap-1 overflow-hidden">
                {['ETL', '→', 'Transform', '→', 'API', '→', 'UI'].map((s, i) => (
                  <span key={i} className={`text-[8px] font-mono font-bold whitespace-nowrap ${s === '→' ? 'text-blue-300 dark:text-blue-600' : 'text-blue-500 dark:text-blue-400'}`}>{s}</span>
                ))}
              </div>
            </div>

            {/* Two screenshots side by side */}
            <div className="flex flex-col lg:flex-row">
              {/* Left: Data Hub */}
              <div className="flex-1 flex flex-col">
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-700">
                  <img src={p0.image} alt={p0.title} className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/600x400/dbeafe/1e40af?text=Data+Hub"; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4 flex flex-wrap gap-1">
                    {p0.tech.map((tech, i) => (
                      <span key={i} className="text-[7px] font-mono font-bold text-white bg-slate-900/80 px-1.5 py-0.5 rounded uppercase border border-white/10">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[8px] font-mono font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 px-2 py-0.5 rounded uppercase tracking-widest">
                      {lang === 'vi' ? 'Nguồn dữ liệu' : 'Data Source'}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {lang === 'vi' ? p0.titleVi : p0.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow mb-4">
                    {lang === 'vi' ? p0.descVi : p0.desc}
                  </p>
                  <a href={p0.link} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 text-white hover:bg-blue-800 rounded-xl font-bold font-mono text-[10px] transition-all shadow-sm w-fit">
                    <Github size={12} /> {t.repository}
                  </a>
                </div>
              </div>

              {/* Arrow connector */}
              <div className="flex lg:flex-col items-center justify-center px-2 py-4 lg:py-0 gap-1">
                <div className="hidden lg:flex flex-col items-center gap-1">
                  <div className="w-px h-8 bg-blue-200 dark:bg-blue-700"></div>
                  <div className="text-[8px] font-mono font-black text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-700 px-2 py-1 rounded-lg text-center whitespace-nowrap">
                    feeds data
                  </div>
                  <div className="w-px h-4 bg-blue-200 dark:bg-blue-700"></div>
                  <div className="text-blue-400 dark:text-blue-500 text-lg">↓</div>
                </div>
                <div className="flex lg:hidden items-center gap-1">
                  <div className="h-px w-6 bg-blue-200 dark:bg-blue-700"></div>
                  <div className="text-[8px] font-mono font-black text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-700 px-2 py-1 rounded-lg">
                    feeds →
                  </div>
                  <div className="h-px w-6 bg-blue-200 dark:bg-blue-700"></div>
                </div>
              </div>

              {/* Right: Job Search Platform */}
              <div className="flex-1 flex flex-col">
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-700">
                  <img src={p1.image} alt={p1.title} className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/600x400/dbeafe/1e40af?text=Job+Portal"; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4 flex flex-wrap gap-1">
                    {p1.tech.map((tech, i) => (
                      <span key={i} className="text-[7px] font-mono font-bold text-white bg-slate-900/80 px-1.5 py-0.5 rounded uppercase border border-white/10">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[8px] font-mono font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 px-2 py-0.5 rounded uppercase tracking-widest">
                      {lang === 'vi' ? 'Sản phẩm' : 'Product'}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {lang === 'vi' ? p1.titleVi : p1.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow mb-4">
                    {lang === 'vi' ? p1.descVi : p1.desc}
                  </p>
                  <div className="flex gap-3">
                    <a href={p1.link} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 text-white hover:bg-blue-800 rounded-xl font-bold font-mono text-[10px] transition-all shadow-sm">
                      <Github size={12} /> {t.repository}
                    </a>
                    {p1.demo && (
                      <a href={p1.demo} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 border-2 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-700 dark:hover:text-blue-400 rounded-xl font-bold font-mono text-[10px] transition-all">
                        <Globe size={12} /> {t.liveDemoLabel}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ElectroShop card — standalone */}
          {(() => {
            const project = p2;
            const idx = 2;
            return (
            <div className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg dark:hover:shadow-slate-900 transition-shadow duration-300 flex flex-col lg:flex-row">
              <div className="relative lg:w-80 h-52 lg:h-auto overflow-hidden bg-slate-100 dark:bg-slate-700 flex-shrink-0">
                <img src={project.image} alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/600x400/dbeafe/1e40af?text=Project"; }} />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 lg:bottom-4 flex flex-wrap gap-1.5">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-[7px] font-mono font-bold text-white bg-slate-900/70 backdrop-blur-sm px-1.5 py-0.5 rounded uppercase border border-white/10">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="p-7 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  {lang === 'vi' ? ((project as any).titleVi ?? project.title) : project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed flex-grow">
                  {lang === 'vi' ? ((project as any).descVi ?? project.desc) : project.desc}
                </p>

                {(project as any).quickRun && (
                  <div className="mb-5 rounded-xl bg-slate-900 overflow-hidden border border-slate-700">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700 bg-slate-800">
                      <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                        <TerminalIcon size={10} /> {t.quickRunLabel}
                      </span>
                      <button onClick={() => handleCopy((project as any).quickRun, idx)}
                        className="text-[9px] font-mono text-slate-400 hover:text-emerald-400 transition-colors uppercase tracking-widest">
                        {copiedIdx === idx ? t.copied : t.copy}
                      </button>
                    </div>
                    <pre className="px-4 py-3 text-[11px] font-mono text-emerald-300 leading-relaxed whitespace-pre overflow-x-auto">
                      {(project as any).quickRun}
                    </pre>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <a href={project.link} target="_blank" className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white hover:bg-blue-800 rounded-xl font-bold font-mono text-[10px] transition-all shadow-sm hover:-translate-y-0.5">
                    <Github size={13} /> {(project as any).linkLabel ?? t.repository}
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" className="flex items-center gap-2 px-5 py-2.5 border-2 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-700 dark:hover:text-blue-400 rounded-xl font-bold font-mono text-[10px] transition-all hover:-translate-y-0.5">
                      <Globe size={13} /> {(project as any).demoLabel ?? t.liveDemoLabel}
                    </a>
                  )}
                </div>
              </div>
            </div>
            );
          })()}

        </div>
      </div>
    </section>
  );
};

const RecruitmentForm = () => {
  const { lang } = useLang();
  const t = translations[lang];
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('https://formspree.io/f/xvzqgdzd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', company: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else throw new Error('failed');
    } catch (err) {
      console.error(err);
      setTimeout(() => setStatus('success'), 1500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputCls = "w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-600 transition-all";

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 lg:p-9 rounded-2xl shadow-sm">
      <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 font-mono flex items-center gap-3">
        <Briefcase className="text-blue-700 dark:text-blue-400" size={20} />
        {t.formTitle}
      </h3>

      {status === 'success' ? (
        <div className="py-14 text-center">
          <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/30 border-2 border-emerald-200 dark:border-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" size={28} />
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{t.formSuccess}</h4>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{t.formSuccessSub}</p>
          <button onClick={() => setStatus('idle')} className="mt-5 text-xs font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
            {t.formSendAnother}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === 'error' && (
            <div className="p-3.5 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-700 rounded-xl flex items-center gap-3 text-rose-700 dark:text-rose-400 text-xs">
              <AlertCircle size={15} /><span>{t.formError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t.formCompany}</label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={14} />
                <input required name="company" value={formData.company} onChange={handleChange} placeholder="e.g. Google, Solvitech..." className={inputCls} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t.formName}</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={14} />
                <input required name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className={inputCls} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t.formEmail}</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={14} />
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@company.com" className={inputCls} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t.formPhone}</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={14} />
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+84 ..." className={inputCls} />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t.formMessage}</label>
            <textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder={t.formPlaceholderMessage}
              className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl py-3 px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-600 transition-all resize-none" />
          </div>

          <button disabled={status === 'sending'}
            className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-100 dark:shadow-blue-900/20 text-sm">
            {status === 'sending'
              ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              : <>{t.formSend} <Send size={15} /></>
            }
          </button>
          <p className="text-[9px] text-center text-slate-400 dark:text-slate-500 font-mono uppercase tracking-widest">{t.formNote}</p>
        </form>
      )}
    </div>
  );
};

const Contact = () => {
  const { lang } = useLang();
  const t = translations[lang];

  const contacts = [
    { href: "mailto:sonhai0803@gmail.com", label: "Email", value: "sonhai0803@gmail.com", icon: <Mail size={19} /> },
    { href: "https://zalo.me/0877661730", label: "Zalo / Phone", value: "0877.661.730", icon: <MessageCircle size={19} />, target: "_blank" },
    { href: "https://www.facebook.com/highnguoccho/", label: "Facebook", value: "Pham Thanh Hai", icon: <Facebook size={19} />, target: "_blank" },
    { href: "https://github.com/hai-pham-theinfitech", label: "Github", value: "phamthanhhai003", icon: <Github size={19} />, target: "_blank" },
  ];

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-400 text-[9px] font-mono font-bold uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span> {t.contactBadge}
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight uppercase">{t.contactTitle}</h2>
          <p className="text-slate-500 dark:text-slate-400 font-mono text-xs max-w-lg mx-auto uppercase tracking-[0.15em]">{t.contactSub}</p>
          <div className="h-1 w-12 bg-blue-700 dark:bg-blue-500 mx-auto mt-5 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-3">
            <p className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-5">{t.reachMe}</p>
            {contacts.map((item, i) => (
              <a key={i} href={item.href} target={(item as any).target}
                className="group flex items-center gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-200 dark:hover:border-blue-600 hover:shadow-md dark:hover:shadow-slate-900 transition-all shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-blue-700 group-hover:text-white group-hover:border-blue-700 dark:group-hover:bg-blue-600 dark:group-hover:border-blue-600 transition-all flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase font-bold tracking-widest">{item.label}</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{item.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="lg:col-span-7">
            <RecruitmentForm />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-400 dark:text-slate-500 text-[9px] font-mono uppercase tracking-[0.25em] font-bold gap-4">
          <p>{t.footer}</p>
          <div className="flex gap-6">
            <a href="https://github.com/phamthanhhai003" target="_blank" className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors">GITHUB</a>
            <span className="opacity-30">/</span>
            <span>INFRASTRUCTURE ENGINEER</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) || null as any);
  const [showPopup, setShowPopup] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? saved === 'true' : true;
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && !lang) setShowPopup(true);
  }, [loading, lang]);

  const handleLangSelect = (l: Lang) => {
    localStorage.setItem('lang', l);
    setLang(l);
    setShowPopup(false);
  };

  const handleSetLang = (l: Lang) => {
    localStorage.setItem('lang', l);
    setLang(l);
  };

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('darkMode', String(next));
  };

  if (loading) return <Skeleton />;

  return (
    <LanguageContext.Provider value={{ lang: lang ?? 'en', setLang: handleSetLang }}>
      {showPopup && <LanguagePopup onSelect={handleLangSelect} />}
      <div className={isDark ? 'dark' : ''}>
        <Navbar isDark={isDark} toggleDark={toggleDark} />
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </LanguageContext.Provider>
  );
};

export default App;
