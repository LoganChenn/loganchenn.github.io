import { useState, useRef, useEffect } from 'react';
import {
  Mail,
  MapPin,
  Linkedin,
  Github,
  Download,
  Code,
  Users,
  X,
  Menu
} from 'lucide-react';
// custome hook for intersection observer
const useIntersectionObserver = (
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLDivElement | null>, boolean] => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return (): void => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [hasAnimated, options.threshold, options.rootMargin, options.root]);

  return [elementRef, isVisible];
};

export default function Portfolio() {
  // create refs for each section
  // and use the custom hook to observe their visibility
  const [aboutRef, isAboutVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [skillsRef, isSkillVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [heroRef, isHeroVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [ExpRef, isExpVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [conRef, isConVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const skills = {
    technical: ['HTML/CSS',
      'JavaScript', 'TypeScript',
      'React', 'VUE', 'SQL',
      'Git', 'Python', 'Java', 'Linux',
      'REST APIs', 'Node.js', 'MongoDB'],
    soft: ['Problem Solving', 'Team Collaboration',
      'Communication', 'Adaptability',
      'Time Management', 'Critical Thinking']
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // const projects = [
  //   {
  //     id: 1,
  //     title: 'Personal Finance Tracker',
  //     tech: 'React, Local Storage',
  //     description: 'A web app to track personal expenses and income with visual charts.',
  //     details: 'Built to solve my own budgeting needs. Features include expense categorization, monthly reports, and savings goals tracking. Learned React hooks and data visualization.',
  //     link: '#',
  //     status: 'Completed'
  //   }
  // ];

  const experience = [
    {
      title: 'Front-end Developer ',
      company: 'Aura Explorer',
      period: ' Mar 2024 - Sep 2024',
      description: '',
      achievements: ['Built multi-model AI chat interface connecting 5+ leading AI models using Vue.js.',
        'Implemented real-time model switching and typewriter effects to enhance user engagement and interactivity']
    },
    {
      title: 'Front-end Developer',
      company: 'Wuhan BILL-JC Technology Co. Ltd',
      period: 'June 2022 - Aug 2023',
      description: '',
      achievements: ['Developed and enhanced major features of Ceastor, a large-scale distributed storage system using React, Redux, Less, and Arco Design.',
        'Implemented file upload functionality with breakpoint resume, significantly improving user experience.',
        'Collaborated with cross-functional teams including designers and QA to ensure stable system performance, intuitive UI design, and timely delivery',
        'Collaborated with cross-functional teams in Agile environment to deliver complex features including real-time data visualization and storage monitoring dashboards',
        'Refactored cluster creation system, optimizing creation logic and streamlining user workflows while improving visual design.']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50 w-full">
        <nav className="mx-auto px-4 sm:px-6 py-3">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-600">LC</h1>
            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-6 mr-10">
              <a href="#about" className="text-gray-500
              hover:text-blue-600
                transition-colors"
              >About</a>
              <a href="#skills" className="text-gray-500
               hover:text-blue-600
                transition-colors"
              >Skills</a>
              {/* <a href="#projects" className="text-gray-500 hover:text-blue-600 transition-colors">Projects</a> */}
              <a href="#experience" className="text-gray-500
               hover:text-blue-600
               transition-colors"
              >Experience</a>
              <a href="#contact"
                className="text-gray-500
                hover:text-blue-600
                transition-colors"
              >Contact</a>
            </div>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3 pt-4">
                <a href="#about" className="
                text-gray-500 
                hover:text-blue-600 
                transition-colors 
                py-2 px-2"
                  onClick={closeMenu}>About</a>
                <a href="#skills" className="
                text-gray-500
                hover:text-blue-600
                  transition-colors 
                  py-2 px-2"
                  onClick={closeMenu}>Skills</a>
                <a href="#experience" className="
                text-gray-500
                hover:text-blue-600 
                 transition-colors 
                 py-2 px-2"
                  onClick={closeMenu}>Experience</a>
                <a href="#contact" className="
                text-gray-500
                hover:text-blue-600 
                 transition-colors 
                 py-2 px-2"
                  onClick={closeMenu}>Contact</a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="
      w-full
      bg-gradient-to-br 
      from-purple-50 
      to-grey-50"
      >
        <div className={`
        w-full py-10 px-4
        sm:px-6 sm:py-14
        lg:px-60 lg:py-18
        transition-all duration-1000 
        ${isHeroVisible
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95'
          }`}>
          <p className='mb-4 sm:mb-6 lg:mb-8 text-gray-500'>Hello! My name is</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 sm:mb-6">
            <span className="text-blue-600">Logan Chen</span>
          </h1>
          <h1 className="text-lg sm:text-xl lg:text-5xl font-semibold text-gray-500 mb-4 sm:mb-8">
            Experienced and driven full stack developer
          </h1>
          <p className="text-base sm:text-lg lg:text-2xl text-gray-500 mb-8 sm:mb-12 max-w-2xl">
            Skilled in building and maintaining robust frontend and backend systems with clean, efficient code. Known for strong problem-solving ability, clear communication, and a hands-on approach to delivering scalable, production-ready solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="
              relative overflow-hidden
              bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500
              bg-[length:200%_100%] bg-left
              hover:bg-right hover:animate-[wave_2s_ease-in-out_infinite]
            text-white px-6 sm:px-8 py-3
              rounded-xl transition-all duration-800
              transform hover:scale-110 hover:shadow-lg
              flex items-center justify-center gap-2
              text-sm sm:text-base font-semibold
              border-0 shadow-md
            ">
              <Download size={18} />
              Download CV
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-16 bg-grey-50">
        <div className={`
        max-w-6xl mx-auto 
        px-6 transition-all 
        lg:px-40
        duration-1000 ${isAboutVisible
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95'}
            `}>
          <h2 className="
          text-2xl sm:text-3xl text-gray-700 
          px-4 font-bold text-left 
          mb-12 flex items-center 
          sm:px-6 lg:px-16 xl:pl-40
          gap-4">
            About Me
            <span className="h-0.25 w-80 bg-gray-500"></span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center md:pl-6 ml-6 md:ml-0">
            <div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Hello! I'm Logan(Longkang) Chen,
                and I enjoy creating web applications and solving problems through code.
                I first started building websites in 2019. Back then,
                I was so curious how websites were built and thought it would be cool to build my own web application,
                so I started learning.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                I was fortunate to land my role as a front-end developer at Fengyue Technology Co. Ltd,
                where I contribute to real-world projects and discovered my passion for user-centered solutions.
                My experience continued at BILL-JC Technology Co. Ltd  working on large-scale distributed systems.
                Through those projects, I've learned that the best technology solves genuine problems.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Then I completed my Master's at University College Cork,
                where I had the opportunity to collaborate with ESB on a sustainability rewards platform.
                This project combined my technical skills in React and full-stack development with real community impact.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Always excited to connect and discuss new ideas!
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="text-blue-600" size={20} />
                  <span className="text-gray-600">Ireland</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center md:justify-start">
              <div className='
              w-48 h-48 sm:w-56
              sm:h-56 lg:w-64
              lg:h-64 bg-[url(assets/photo.jpg)]
              bg-cover bg-center 
              rounded-lg shadow-md'
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16" ref={skillsRef}>
        <div className={`max-w-6xl mx-auto px-6 transition-all duration-1000 ${isSkillVisible
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-95'
          }`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 text-left mb-12 flex items-center gap-4">
            Skills & Technologies
            <span className="h-0.25 w-80 bg-gray-500"></span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <Code className="text-blue-600" size={24} />
                <h3 className="text-xl font-semibold">Technical Skills</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.technical.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <Users className="text-purple-600" size={24} />
                <h3 className="text-xl font-semibold">Soft Skills</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.soft.map((skill, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 px-3 py-2 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16" ref={ExpRef}>
        <div className={`
        max-w-6xl mx-auto px-4 sm:px-6 md:px-50
        transition-all duration-1000 
        ${isExpVisible
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95'
          }
        `}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-12 flex items-center gap-4">
            Experience
            <span className="h-0.25 w-80 bg-gray-500"></span>
          </h2>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <div key={index} className="p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{job.title}</h3>
                    <h3 className="text-lg sm:text-xl text-gray-800">{job.company}</h3>
                  </div>
                  <span className="text-gray-500 text-sm sm:text-base font-medium mt-2 md:mt-0">{job.period}</span>
                </div>
                <p className="text-gray-600 mb-4 text-xs sm:text-sm lg:text-base">{job.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Achievements:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="text-gray-600">{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={conRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className={`}
        max-w-4xl mx-auto px-6
        text-center
        transition-all duration-1000
        ${isConVisible
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95'}
        `}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Let's Connect</h2>
          <p className="
          text-sm sm:text-base 
          lg:text-lg text-gray-500
          max-w-2xl mx-auto mb-6 sm:mb-8
          ">
            I'm actively seeking opportunities. Let's discuss how I can contribute to your team!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="mailto:longkangchen@outlook.com"
              className="
                relative overflow-hidden
                flex items-center justify-center gap-3
                text-sm sm:text-base font-semibold
                bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500
                bg-[length:200%_100%] bg-left
                hover:bg-right hover:animate-[wave_2s_ease-in-out_infinite]
              !text-white truncate
                w-full max-w-sm sm:w-auto
                px-4 sm:px-6 py-3 rounded-xl
                shadow-md hover:shadow-lg transition-all duration-800
                transform hover:scale-105
              ">
              <Mail size={20} />
              longkangchen@outlook.com
            </a>
          </div>
          <div className="flex gap-4 justify-center mt-8">
            <a href="https://www.linkedin.com/in/longchen0/" className="p-3 rounded-full">
              <Linkedin size={24} />
            </a>
            <a href="https://github.com/LoganChenn" className="p-3 rounded-full">
              <Github size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>&copy; 2025 Logan Chen. Built with React & Tailwind CSS and Love.</p>
        </div>
      </footer>
    </div>
  );
}