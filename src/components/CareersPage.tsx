import React, { useState } from 'react';
import {
  Briefcase,
  GraduationCap,
  TrendingUp,
  Users,
  Lightbulb,
  Rocket,
  Building2,
  CheckCircle2,
  Mail,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Layers,
  BookOpen,
  Target,
  Send,
  X,
  Globe,
  ShoppingCart,
  Headphones,
  Cpu,
  BarChart3
} from 'lucide-react';
import type { PageView } from '../types';

interface CareersPageProps {
  setActivePage: (page: PageView) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ setActivePage: _setActivePage }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'vacancy' | 'internship' | 'university' | 'general'>('general');
  const [vacanciesOpen, setVacanciesOpen] = useState(false);
  
  // Application Form state
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantRole, setApplicantRole] = useState('');
  const [applicantUniversity, setApplicantUniversity] = useState('');
  const [applicantMessage, setApplicantMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const resetForm = () => {
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    setApplicantRole('');
    setApplicantUniversity('');
    setApplicantMessage('');
    setFormSubmitted(false);
  };

  const openApplicationModal = (type: 'vacancy' | 'internship' | 'university' | 'general', defaultRole: string = '') => {
    setModalType(type);
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    setApplicantRole(defaultRole || '');
    setApplicantUniversity('');
    setApplicantMessage('');
    setFormSubmitted(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    resetForm();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let subject = 'Career Application - Regenerate Global';
    if (modalType === 'internship') subject = 'Internship / Placement Application - Regenerate Global';
    if (modalType === 'university') subject = 'University Placement Enquiry - Regenerate Global';
    if (modalType === 'vacancy' && applicantRole) subject = `Job Application: ${applicantRole} - Regenerate Global`;

    const body = `Full Name: ${applicantName}
Email: ${applicantEmail}
Phone: ${applicantPhone}
${applicantUniversity ? `University / Institution: ${applicantUniversity}\n` : ''}${applicantRole ? `Role / Function Interest: ${applicantRole}\n` : ''}
Message / Introduction:
${applicantMessage}`;

    const mailtoUrl = `mailto:Sales@regenerateglobal.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    setFormSubmitted(true);
  };

  const whyWorkItems = [
    {
      icon: <Rocket className="w-5 h-5 text-[#00A3E0]" />,
      title: 'Growing Business',
      description: 'Be part of a dynamic company operating across multiple areas of the technology and consumer electronics industry.',
      bgImage: '/careers/growing-business.jpg'
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-[#00A3E0]" />,
      title: 'Career Development',
      description: 'Take on meaningful responsibilities, develop your skills and build your career as the business grows.',
      bgImage: '/careers/career-development.jpg'
    },
    {
      icon: <Users className="w-5 h-5 text-[#00A3E0]" />,
      title: 'Collaborative Environment',
      description: 'Work alongside teams across sales, purchasing, operations, finance, marketing, technology and logistics.',
      bgImage: '/careers/collaborative-environment.jpg'
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-[#00A3E0]" />,
      title: 'Real Responsibility',
      description: 'We believe in giving people the opportunity to contribute to real business projects and make a difference.',
      bgImage: '/careers/real-responsibility.jpg'
    }
  ];

  const careerFunctions = [
    { name: 'Sales & Business Development', icon: <TrendingUp size={20} className="text-[#00A3E0]" /> },
    { name: 'E-commerce & Marketplace Management', icon: <ShoppingCart size={20} className="text-[#00A3E0]" /> },
    { name: 'Marketing & Digital Marketing', icon: <Globe size={20} className="text-[#00A3E0]" /> },
    { name: 'Procurement & Wholesale', icon: <Building2 size={20} className="text-[#00A3E0]" /> },
    { name: 'Operations & Logistics', icon: <Layers size={20} className="text-[#00A3E0]" /> },
    { name: 'Finance & Administration', icon: <BarChart3 size={20} className="text-[#00A3E0]" /> },
    { name: 'IT & Technology', icon: <Cpu size={20} className="text-[#00A3E0]" /> },
    { name: 'Customer Service', icon: <Headphones size={20} className="text-[#00A3E0]" /> },
    { name: 'Management & Commercial Operations', icon: <Target size={20} className="text-[#00A3E0]" /> }
  ];

  const candidateQualities = [
    'Ambitious and motivated',
    'Professional and reliable',
    'Positive and proactive',
    'Willing to learn',
    'Strong communicators',
    'Commercially aware',
    'Good problem-solvers',
    'Comfortable working in a fast-moving environment'
  ];

  const sampleVacancies = [
    {
      title: 'Sales & Business Development Specialist',
      department: 'Sales & Commercial',
      location: 'UK / Hybrid',
      type: 'Full-time',
      desc: 'Drive client acquisition, identify B2B trading opportunities, and expand international wholesale partnerships across technology and consumer electronics.'
    },
    {
      title: 'E-commerce & Marketplace Executive',
      department: 'E-commerce & Marketing',
      location: 'UK / On-site & Hybrid',
      type: 'Full-time',
      desc: 'Manage listing optimization, marketplace inventory performance, and digital storefront growth across global B2B and retail channels.'
    },
    {
      title: 'Operations & Supply Chain Assistant',
      department: 'Operations & Logistics',
      location: 'UK HQ',
      type: 'Full-time',
      desc: 'Coordinate warehouse intake, inventory grading logistics, dispatch scheduling, and international cargo tracking.'
    },
    {
      title: 'University Placement & Commercial Intern',
      department: 'Rotational / Placement',
      location: 'UK HQ / Hybrid',
      type: 'Placement / Internship',
      desc: 'Gain hands-on practical experience across sales, digital marketing, data analysis, and commercial wholesale operations.'
    }
  ];

  const universitiesList = [
    {
      name: 'University of East London (UEL)',
      abbr: 'UEL',
      logo: '/University of East London (UEL).png',
      scaleClass: 'scale-[1.35] sm:scale-[1.45] group-hover:scale-[1.55]'
    },
    {
      name: 'University of Hertfordshire',
      abbr: 'UH',
      logo: '/University of Hertfordshire.png',
      scaleClass: 'scale-[1.35] sm:scale-[1.45] group-hover:scale-[1.55]'
    },
    {
      name: 'Glasgow Caledonian University (GCU)',
      abbr: 'GCU',
      logo: '/Glasgow Caledonian University (GCU).png',
      scaleClass: 'scale-[1.35] sm:scale-[1.45] group-hover:scale-[1.55]'
    },
    {
      name: 'University of Roehampton',
      abbr: 'Roehampton',
      logo: '/University of Roehampton.png',
      scaleClass: 'scale-[0.95] sm:scale-[1.0] group-hover:scale-[1.1]'
    },
    {
      name: 'Greenwich University',
      abbr: 'Greenwich',
      logo: '/Greenwich University.png',
      scaleClass: 'scale-[1.35] sm:scale-[1.45] group-hover:scale-[1.55]'
    },
    {
      name: 'Other UK Universities & Educational Institutions',
      abbr: 'UK Wide',
      logo: null,
      scaleClass: ''
    }
  ];

  const placementGainAreas = [
    'Business Development',
    'Sales & Account Management',
    'Marketing & Digital Marketing',
    'E-commerce',
    'Online Marketplaces',
    'Procurement & Wholesale',
    'Operations & Supply Chain',
    'Finance & Administration',
    'Data & Business Analysis',
    'Technology & Consumer Electronics',
    'Customer Service',
    'Business Strategy'
  ];

  const studentDevelopmentPoints = [
    {
      title: 'Professional Communication',
      desc: 'Build confidence communicating with colleagues, customers and business partners.'
    },
    {
      title: 'Commercial Awareness',
      desc: 'Understand how sales, purchasing, operations and commercial decisions work in a real business.'
    },
    {
      title: 'Teamwork',
      desc: 'Work collaboratively with colleagues across different departments.'
    },
    {
      title: 'Problem Solving',
      desc: 'Develop the ability to identify challenges and find practical solutions.'
    },
    {
      title: 'Professional Confidence',
      desc: 'Gain experience of working in a professional environment and prepare for future employment.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#171717] font-sans antialiased">
      {/* ------------------------------------------------------------------------- */}
      {/* HERO SECTION - CAREERS AT REGENERATE GLOBAL                              */}
      {/* ------------------------------------------------------------------------- */}
      <section className="pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 bg-[#041626] text-white relative overflow-hidden min-h-[calc(100vh-96px)] flex flex-col justify-center">
        {/* Subtle decorative background glow elements */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00A3E0]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00A3E0]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#00A3E0]/40 text-[#00A3E0] text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm backdrop-blur-md">
            <Briefcase size={14} className="text-[#00A3E0]" /> Careers at Regenerate Global Limited
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto">
            Build Your Career. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#00A3E0] via-[#38BDF8] to-[#00A3E0] bg-clip-text text-transparent">
              Grow With Us.
            </span>
          </h1>

          {/* Lead Text */}
          <p className="text-base sm:text-lg md:text-xl text-white/85 leading-relaxed mb-10 max-w-3xl mx-auto font-normal">
            At Regenerate Global, we are building a growing business across technology, consumer electronics, wholesale, e-commerce and global trade. We are looking for talented, ambitious and motivated people who want to make an impact, develop their skills and grow with the business. Whether you are an experienced professional, a recent graduate or looking for your next career opportunity, we would love to hear from you.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <button
              onClick={() => {
                setVacanciesOpen(true);
                const el = document.getElementById('vacancies-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-xl bg-[#00A3E0] text-white font-semibold text-sm hover:bg-[#0084C7] transition-all duration-200 shadow-xl shadow-[#00A3E0]/25 flex items-center gap-2 cursor-pointer group"
            >
              Explore Current Vacancies <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('internships-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-xl bg-white/10 text-white border border-white/20 font-semibold text-sm hover:bg-white/20 transition-all duration-200 flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <GraduationCap size={18} className="text-[#00A3E0]" /> Internships &amp; Placements
            </button>
          </div>

          {/* Highlight Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-white/10 max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-md text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#00A3E0] mb-1">9+</div>
              <div className="text-xs text-white/70 font-medium">Functional Areas</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-md text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#00A3E0] mb-1">5+</div>
              <div className="text-xs text-white/70 font-medium">UK Uni Partnerships</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-md text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#00A3E0] mb-1">100%</div>
              <div className="text-xs text-white/70 font-medium">Practical Experience</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-md text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#00A3E0] mb-1">Global</div>
              <div className="text-xs text-white/70 font-medium">Technology &amp; Trade</div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------- */}
      {/* SECTION 2: WHY WORK WITH US?                                              */}
      {/* ------------------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A3E0]/10 border border-[#00A3E0]/30 text-[#0084C7] text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles size={14} /> Our Culture &amp; Values
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171717]">
              Why Work With Us?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {whyWorkItems.map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-3xl overflow-hidden border border-[#00A3E0]/30 shadow-xl group hover:border-[#00A3E0] hover:shadow-2xl transition-all duration-300 min-h-[340px] flex flex-col justify-end p-6 sm:p-8 bg-[#041626]"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-75"
                  style={{ backgroundImage: `url('${item.bgImage}')` }}
                />
                {/* Dark Gradient Overlay for Maximum Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#041626] via-[#041626]/80 to-[#041626]/30 group-hover:via-[#041626]/70 transition-colors duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#00A3E0]/40 flex items-center justify-center mb-4 shadow-sm backdrop-blur-md group-hover:bg-[#00A3E0] group-hover:text-white transition-all duration-300">
                    {React.cloneElement(item.icon, { className: "w-5 h-5 text-[#00A3E0] group-hover:text-white transition-colors" })}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00A3E0] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------- */}
      {/* SECTION 3: CAREER OPPORTUNITIES (FUNCTIONS)                              */}
      {/* ------------------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 bg-[#F7F6F3] border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#041626] text-white text-xs font-semibold tracking-wider uppercase mb-3">
              <Layers size={14} className="text-[#00A3E0]" /> Functional Areas
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171717] mb-4">
              Career Opportunities
            </h2>
            <p className="text-base text-[#5F5B55] leading-relaxed">
              We recruit across a variety of functions, including:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {careerFunctions.map((fn, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-xs hover:border-[#00A3E0] hover:shadow-md transition-all duration-200 flex items-center justify-between group cursor-pointer"
                onClick={() => openApplicationModal('vacancy', fn.name)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#00A3E0]/10 flex items-center justify-center shrink-0">
                    {fn.icon}
                  </div>
                  <span className="font-semibold text-sm text-[#171717] group-hover:text-[#0084C7] transition-colors">
                    {fn.name}
                  </span>
                </div>
                <ChevronRight size={18} className="text-gray-400 group-hover:text-[#00A3E0] group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------- */}
      {/* SECTION 4: WHO ARE WE LOOKING FOR?                                       */}
      {/* ------------------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A3E0]/10 text-[#0084C7] text-xs font-semibold tracking-wider uppercase mb-4">
                <Target size={14} /> Ideal Candidates
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171717] mb-6">
                Who Are We Looking For?
              </h2>
              <p className="text-base text-[#5F5B55] leading-relaxed mb-6">
                We value individuals who take initiative, adapt to market opportunities, and thrive in a collaborative environment.
              </p>
              
              <div className="bg-[#041626] text-white p-6 rounded-2xl border border-[#00A3E0]/30 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A3E0]/20 rounded-full blur-2xl pointer-events-none" />
                <h4 className="text-sm font-semibold text-[#00A3E0] uppercase tracking-wider mb-2">Our Belief</h4>
                <p className="text-sm sm:text-base leading-relaxed text-white/90 italic">
                  &ldquo;Experience is important for some positions, but we also recognise the value of potential, attitude and willingness to develop.&rdquo;
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#F7F6F3] rounded-2xl p-6 sm:p-8 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
                  We Value People Who Are:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {candidateQualities.map((quality, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-2xs">
                      <CheckCircle2 size={18} className="text-[#00A3E0] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-[#171717]">{quality}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------- */}
      {/* SECTION 5: CURRENT VACANCIES & DIRECT CV SUBMISSION                      */}
      {/* ------------------------------------------------------------------------- */}
      <section id="vacancies-section" className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 bg-[#041626] text-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#00A3E0]/40 text-[#00A3E0] text-xs font-semibold tracking-wider uppercase mb-3">
              <Briefcase size={14} /> Open Roles
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Current Vacancies
            </h2>
            <p className="text-base text-white/80 leading-relaxed">
              Explore our latest job opportunities and find a position that matches your experience and career ambitions.
            </p>
          </div>

          {/* Toggle or View Vacancies Container */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-sm text-white/60">Featured Opportunities</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#00A3E0]/20 text-[#00A3E0] text-xs font-bold">
                  {sampleVacancies.length} Active
                </span>
              </div>
              <button
                onClick={() => setVacanciesOpen(!vacanciesOpen)}
                className="text-sm text-[#00A3E0] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                {vacanciesOpen ? 'Hide Vacancy Details' : '[View Current Vacancies]'}
              </button>
            </div>

            {vacanciesOpen && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300 mb-8">
                {sampleVacancies.map((vac, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 border border-white/10 hover:border-[#00A3E0]/60 p-6 rounded-2xl transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-[#00A3E0]/15 text-[#00A3E0] text-xs font-semibold">
                          {vac.department}
                        </span>
                        <span className="text-xs text-white/50">{vac.type}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{vac.title}</h3>
                      <p className="text-xs text-white/60 mb-4">{vac.location}</p>
                      <p className="text-sm text-white/80 leading-relaxed mb-6">{vac.desc}</p>
                    </div>
                    <button
                      onClick={() => openApplicationModal('vacancy', vac.title)}
                      className="w-full py-2.5 rounded-xl bg-[#00A3E0] text-white text-xs font-semibold hover:bg-[#0084C7] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Apply For This Position <ArrowRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {!vacanciesOpen && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center max-w-xl mx-auto">
                <p className="text-white/80 text-sm mb-4">
                  Click below to browse open positions across sales, e-commerce, logistics and commercial placement roles.
                </p>
                <button
                  onClick={() => setVacanciesOpen(true)}
                  className="px-6 py-3 rounded-xl bg-[#00A3E0] text-white font-semibold text-sm hover:bg-[#0084C7] transition-colors shadow-lg cursor-pointer"
                >
                  [View Current Vacancies]
                </button>
              </div>
            )}
          </div>

          {/* Don't See the Right Role Card */}
          <div className="bg-gradient-to-r from-white/10 to-white/5 border border-white/15 rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 backdrop-blur-md">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold text-white mb-3">Don&apos;t See the Right Role?</h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-4">
                We are always interested in hearing from talented people. Send us your CV and tell us how you could contribute to Regenerate Global.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="mailto:Sales@regenerateglobal.com?subject=CV%20Submission%20-%20Regenerate%20Global"
                  className="inline-flex items-center gap-2 text-[#00A3E0] hover:underline font-semibold text-sm"
                >
                  <Mail size={16} /> Sales@regenerateglobal.com
                </a>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <a
                href="mailto:Sales@regenerateglobal.com?subject=CV%20Submission%20-%20Regenerate%20Global"
                className="px-6 py-3.5 rounded-xl bg-[#00A3E0] text-white font-semibold text-sm hover:bg-[#0084C7] transition-colors text-center cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Mail size={16} /> Direct Email (App)
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=Sales@regenerateglobal.com&su=CV%20Submission%20-%20Regenerate%20Global"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-white/10 text-white border border-white/20 font-semibold text-sm hover:bg-white/20 transition-colors text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <Globe size={16} className="text-[#00A3E0]" /> Open in Gmail (Web)
              </a>
            </div>
          </div>

          {/* Tagline Banner */}
          <div className="mt-12 text-center max-w-2xl mx-auto pt-8 border-t border-white/10">
            <p className="text-xs uppercase tracking-widest text-[#00A3E0] font-semibold mb-2">Start Your Next Chapter</p>
            <p className="text-lg sm:text-xl text-white font-medium italic mb-2">
              &ldquo;At Regenerate Global, your career is more than a job.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#00A3E0] tracking-wider uppercase">
              <span>Learn</span> &bull; <span>Contribute</span> &bull; <span>Develop</span> &bull; <span>Grow</span>
            </div>
            <p className="text-xs text-white/50 mt-2">Your next opportunity could start here.</p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------- */}
      {/* SECTION 6: INTERNSHIPS & UNIVERSITY PLACEMENTS                           */}
      {/* ------------------------------------------------------------------------- */}
      <section id="internships-section" className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A3E0]/10 border border-[#00A3E0]/30 text-[#0084C7] text-xs font-semibold tracking-wider uppercase mb-4">
              <GraduationCap size={16} /> University Partnerships &amp; Early Careers
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171717] mb-4">
              Internships &amp; University Placements
            </h2>
            <p className="text-xl font-semibold text-[#0084C7] mb-6">
              Gain Experience. Build Skills. Start Your Career.
            </p>
            <p className="text-base text-[#5F5B55] leading-relaxed">
              At Regenerate Global, we believe that practical workplace experience is an important part of preparing students for their future careers. We provide internship and industry placement opportunities that allow students to apply their academic knowledge in a real business environment while developing valuable professional and commercial skills.
            </p>
          </div>

          {/* University Experience Grid */}
          <div className="bg-[#F7F6F3] rounded-3xl p-8 sm:p-12 border border-gray-200 mb-16">
            <div className="max-w-3xl mb-8">
              <h3 className="text-2xl font-bold text-[#171717] mb-3">
                University &amp; Placement Experience
              </h3>
              <p className="text-sm sm:text-base text-[#5F5B55] leading-relaxed">
                We have provided internship and placement opportunities to candidates from universities and educational institutions across the UK, including:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-8">
              {universitiesList.map((uni, idx) => (
                <div
                  key={idx}
                  className="bg-white p-2.5 sm:p-3.5 rounded-2xl border border-gray-200/90 shadow-2xs hover:border-[#00A3E0] hover:shadow-md transition-all duration-300 flex items-center justify-center h-28 sm:h-32 group overflow-hidden"
                  title={uni.name}
                >
                  {uni.logo ? (
                    <img
                      src={uni.logo}
                      alt={uni.name}
                      className={`w-full h-full object-contain ${uni.scaleClass || 'scale-100'} transition-transform duration-300`}
                    />
                  ) : (
                    <div className="text-center px-2">
                      <span className="text-xs font-bold text-[#041626] group-hover:text-[#0084C7] transition-colors leading-tight block">
                        + Other UK Universities
                      </span>
                      <span className="text-[10px] text-[#5F5B55] block mt-1">
                        &amp; Educational Institutions
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="text-sm text-[#5F5B55] leading-relaxed italic bg-white/70 p-4 rounded-xl border border-gray-200/60">
              We work with students and university placement teams to support opportunities that complement academic studies and provide meaningful exposure to the workplace.
            </p>
          </div>

          {/* What Can You Gain? (12 Areas) */}
          <div className="mb-16">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#041626] text-[#00A3E0] text-xs font-semibold uppercase mb-3">
                <BookOpen size={12} /> Skill Domains
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#171717] mb-3">
                What Can You Gain?
              </h3>
              <p className="text-sm sm:text-base text-[#5F5B55] leading-relaxed">
                Our placements can provide practical experience across areas such as:
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {placementGainAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-gray-200 text-sm font-semibold text-[#171717] hover:border-[#00A3E0] hover:bg-white transition-all shadow-2xs flex items-center gap-2"
                >
                  <CheckCircle2 size={16} className="text-[#00A3E0]" />
                  {area}
                </div>
              ))}
            </div>
          </div>

          {/* More Than Just Work Experience */}
          <div className="bg-[#041626] text-white rounded-3xl p-8 sm:p-12 border border-[#00A3E0]/30 shadow-xl mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00A3E0]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mb-10 relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                More Than Just Work Experience
              </h3>
              <p className="text-base text-white/80 leading-relaxed mb-4">
                Our aim is to give students the opportunity to work on real business activities and projects, develop professional skills and understand how a growing UK business operates.
              </p>
              <p className="text-[#00A3E0] font-semibold text-sm uppercase tracking-wider">
                During a placement, students can develop:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {studentDevelopmentPoints.map((pt, idx) => (
                <div key={idx} className="bg-white/10 border border-white/15 rounded-2xl p-6 backdrop-blur-md">
                  <div className="w-8 h-8 rounded-lg bg-[#00A3E0] text-white flex items-center justify-center mb-4 font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{pt.title}</h4>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">{pt.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 relative z-10">
              <h4 className="text-sm uppercase tracking-wider text-[#00A3E0] font-semibold mb-2">Supporting Future Talent</h4>
              <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
                We are proud to support students at the beginning of their professional journey. Our internship and placement opportunities are designed to help bridge the gap between academic learning and real-world experience.
              </p>
            </div>
          </div>

          {/* For Universities & For Students Dual CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* For Universities Card */}
            <div className="bg-[#F7F6F3] rounded-3xl p-8 border border-gray-200 flex flex-col justify-between hover:border-[#00A3E0] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#041626] text-[#00A3E0] flex items-center justify-center mb-6 shadow-sm">
                  <Building2 size={24} />
                </div>
                <h3 className="text-2xl font-bold text-[#171717] mb-3">For Universities</h3>
                <p className="text-sm text-[#5F5B55] leading-relaxed mb-6">
                  We welcome opportunities to work with universities, colleges and placement teams looking to connect their students with genuine industry experience.
                </p>
              </div>
              <button
                onClick={() => openApplicationModal('university', 'University & Placement Partnership')}
                className="w-full py-3.5 rounded-xl bg-[#041626] text-white text-sm font-semibold hover:bg-[#0084C7] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                [University &amp; Placement Enquiries] <ArrowRight size={16} />
              </button>
            </div>

            {/* For Students Card */}
            <div className="bg-[#F7F6F3] rounded-3xl p-8 border border-gray-200 flex flex-col justify-between hover:border-[#00A3E0] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#00A3E0] text-white flex items-center justify-center mb-6 shadow-md">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-2xl font-bold text-[#171717] mb-3">For Students</h3>
                <p className="text-sm text-[#5F5B55] leading-relaxed mb-6">
                  If you are looking for an internship or university placement and would like to gain experience within a growing technology and wholesale business, we would like to hear from you.
                </p>
              </div>
              <button
                onClick={() => openApplicationModal('internship', 'University Placement Application')}
                className="w-full py-3.5 rounded-xl bg-[#00A3E0] text-white text-sm font-semibold hover:bg-[#0084C7] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                [Apply for an Internship / Placement] <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Final Section Banner */}
          <div className="bg-[#F0F9FF] border border-[#00A3E0]/30 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#171717] mb-3">
              Start Building Your Future
            </h3>
            <p className="text-base text-[#5F5B55] max-w-2xl mx-auto leading-relaxed mb-6">
              Your university experience gives you the knowledge. We help you turn that knowledge into practical experience.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#041626] text-[#00A3E0] font-bold text-sm tracking-wider uppercase mb-4">
              Learn &bull; Apply &bull; Develop &bull; Grow
            </div>
            <p className="text-sm font-semibold text-[#0084C7]">
              Regenerate Global &mdash; Investing in Future Talent.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------- */}
      {/* INTERACTIVE APPLICATION MODAL                                            */}
      {/* ------------------------------------------------------------------------- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative my-8">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-[#171717] hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3E0]/10 text-[#0084C7] text-xs font-semibold mb-2">
                {modalType === 'internship' && <GraduationCap size={14} />}
                {modalType === 'university' && <Building2 size={14} />}
                {modalType === 'vacancy' && <Briefcase size={14} />}
                {modalType === 'general' && <Mail size={14} />}
                {modalType === 'internship' && 'Student Internship Application'}
                {modalType === 'university' && 'University Placement Partnership'}
                {modalType === 'vacancy' && 'Job Role Application'}
                {modalType === 'general' && 'General / CV Submission'}
              </div>
              <h3 className="text-2xl font-bold text-[#171717]">
                Connect With Regenerate Global
              </h3>
              <p className="text-xs text-[#5F5B55] mt-1">
                Fill in your details below to launch your email client with direct transmission to <strong className="text-[#0084C7]">Sales@regenerateglobal.com</strong>.
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-[#F0F9FF] border border-[#00A3E0]/40 rounded-2xl p-6 text-center py-8">
                <CheckCircle2 size={48} className="text-[#00A3E0] mx-auto mb-4" />
                <h4 className="text-lg font-bold text-[#171717] mb-2">Email Client Opened!</h4>
                <p className="text-xs text-[#5F5B55] leading-relaxed mb-6">
                  Your application email has been prepared for <strong>Sales@regenerateglobal.com</strong>. If your email application did not open automatically, please send your CV directly via email.
                </p>
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 rounded-xl bg-[#041626] text-white text-xs font-semibold hover:bg-[#0084C7] transition-colors"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#171717] uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#171717] uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#171717] uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+44 7000 000000"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0]"
                    />
                  </div>
                </div>

                {(modalType === 'internship' || modalType === 'university') && (
                  <div>
                    <label className="block text-xs font-semibold text-[#171717] uppercase tracking-wider mb-1">
                      University / Educational Institution
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. University of East London, GCU, Hertfordshire, etc."
                      value={applicantUniversity}
                      onChange={(e) => setApplicantUniversity(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#171717] uppercase tracking-wider mb-1">
                    Role / Area of Interest
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sales, E-commerce, Marketing, Logistics..."
                    value={applicantRole}
                    onChange={(e) => setApplicantRole(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#171717] uppercase tracking-wider mb-1">
                    Message / Introduction
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly tell us about your background, experience, or placement enquiry..."
                    value={applicantMessage}
                    onChange={(e) => setApplicantMessage(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#00A3E0] text-white text-xs font-semibold hover:bg-[#0084C7] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Send size={14} /> Send via Email
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
