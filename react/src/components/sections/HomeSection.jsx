import SectionHeader from '../ui/SectionHeader';
import { BODY_TEXT, PANEL_PADDED, SECTION_STACK } from '../ui/layoutTokens';
import { useMemo } from 'react';

const exploreCards = [
  {
    title: 'Sensors',
    body: 'Explore LIDAR, ultrasonic, IMU, and camera sensors for robot perception and navigation systems.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" strokeWidth="1.6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    ),
  },
  {
    title: 'Controllers',
    body: 'PID loops, state machines, and motion planning controllers for precise robot control.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 9h6M9 15h6" />
      </svg>
    ),
  },
  {
    title: 'Actuators',
    body: 'Servo motors, stepper motors, and pneumatic systems for robot movement and manipulation.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 2v20M8 6l4-4 4 4M8 18l4 4 4-4" />
      </svg>
    ),
  },
  {
    title: 'Python Environment',
    body: 'Integrated Python runtime with robotics libraries: numpy, opencv, pyserial, and more.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

const aboutCards = [
  {
    title: 'Features',
    body: 'Offline-first desktop environment with code editor, simulation tools, and guided learning modules.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    title: 'Mission',
    body: 'Empower students and professionals to learn robotics through hands-on coding and simulation.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Technology Stack',
    body: 'Built with Electron, React, Monaco Editor, and Tailwind CSS for cross-platform desktop experience.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

const reviewCards = [
  {
    title: 'Student Testimonials',
    body: '"The modular practice labs helped me prototype rover logic faster." — Amara R.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: 'Success Stories',
    body: '"Real-time feedback with the built-in console kept my debugging loop tight." — Luis M.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Learner Highlights',
    body: '"The offline-first approach meant I could code anywhere, anytime without internet." — Sarah K.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

const defaultCards = [
  {
    title: 'Quick Launch',
    body: 'Jump straight into your recent project, resume a simulation, or open the code lab.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Recent Activity',
    body: 'Monitor executions and module progress for offline review and iteration.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Learning Paths',
    body: 'Continue curated tutorials tailored for beginner, intermediate, and expert roboticists.',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
];

function HomeSection({ icon, content, eyebrow }) {
  const cardsToDisplay = useMemo(() => {
    switch (eyebrow) {
      case 'Explore':
        return exploreCards;
      case 'About':
        return aboutCards;
      case 'Review':
        return reviewCards;
      default:
        return defaultCards;
    }
  }, [eyebrow]);

  const renderExploreContent = () => (
    <>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Robotics Ecosystem Overview</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 flex-shrink-0">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Sensor Integration</p>
                <p className="mt-1 text-xs text-slate-400">LIDAR, Ultrasonic, IMU, Camera systems for comprehensive robot perception</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 flex-shrink-0">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Motion Planning</p>
                <p className="mt-1 text-xs text-slate-400">Path planning algorithms and obstacle avoidance for autonomous navigation</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 flex-shrink-0">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Simulation Stack</p>
                <p className="mt-1 text-xs text-slate-400">Offline simulation environments for testing before hardware deployment</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <h3 className="text-lg font-semibold text-emerald-200 mb-4">Python Environment</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-emerald-200/80">Python Version</span>
              <span className="text-sm font-semibold text-emerald-300">3.11+</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-emerald-200/80">Status</span>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">Ready</span>
            </div>
            <div className="pt-3 border-t border-emerald-500/20">
              <p className="text-xs text-emerald-300/70 mb-2">Available Libraries</p>
              <div className="flex flex-wrap gap-2">
                {['numpy', 'opencv', 'pyserial', 'scipy', 'matplotlib', 'pandas'].map((lib) => (
                  <span key={lib} className="rounded-md bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">
                    {lib}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white mb-4">Robotics Components</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cardsToDisplay.map((card) => (
            <article key={card.title} className={`${PANEL_PADDED} group transition hover:border-emerald-500/40 hover:shadow-emerald-800/20 hover:shadow-xl`}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 transition group-hover:bg-emerald-500/20">
                {card.icon}
              </div>
              <h4 className="text-base font-semibold text-white">{card.title}</h4>
              <p className={`mt-2 ${BODY_TEXT}`}>{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );

  const renderAboutContent = () => (
    <>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">About Robot Studio</h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            Robot Studio is a comprehensive desktop application designed to empower students and professionals in the field of robotics. 
            Our platform provides an offline-first learning environment that combines coding tools, simulation capabilities, and guided 
            modules to create an immersive educational experience.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            Built with modern technologies and a focus on accessibility, Robot Studio bridges the gap between theoretical knowledge 
            and practical implementation, enabling users to learn, experiment, and innovate in robotics programming.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <svg className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-slate-300">Offline-first architecture for uninterrupted learning</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-slate-300">Integrated code editor with syntax highlighting</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-slate-300">Comprehensive robotics modules and tutorials</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-slate-300">Cross-platform support (Windows, Mac, Linux)</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-slate-300">Real-time execution and debugging tools</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white mb-4">Technology Stack</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cardsToDisplay.map((card) => (
            <article key={card.title} className={`${PANEL_PADDED} group transition hover:border-emerald-500/40 hover:shadow-emerald-800/20 hover:shadow-xl`}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 transition group-hover:bg-emerald-500/20">
                {card.icon}
              </div>
              <h4 className="text-base font-semibold text-white">{card.title}</h4>
              <p className={`mt-2 ${BODY_TEXT}`}>{card.body}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
        <h3 className="text-lg font-semibold text-emerald-200 mb-3">Version Information</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-emerald-300/70 uppercase tracking-wide">Version</p>
            <p className="mt-1 text-sm font-semibold text-emerald-200">1.0.0</p>
          </div>
          <div>
            <p className="text-xs text-emerald-300/70 uppercase tracking-wide">Platform</p>
            <p className="mt-1 text-sm font-semibold text-emerald-200">Desktop</p>
          </div>
          <div>
            <p className="text-xs text-emerald-300/70 uppercase tracking-wide">License</p>
            <p className="mt-1 text-sm font-semibold text-emerald-200">Educational</p>
          </div>
        </div>
      </div>
    </>
  );

  const renderReviewContent = () => (
    <>
      <div className="mt-8 space-y-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300 flex-shrink-0">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-base font-semibold text-white">Amara R.</h4>
                <div className="flex text-emerald-400">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i} className="text-sm">{star}</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-300 italic mb-2">
                "The modular practice labs helped me prototype rover logic faster. The offline-first approach meant I could code 
                anywhere without worrying about internet connectivity. Highly recommend for robotics students!"
              </p>
              <p className="text-xs text-slate-400">Robotics Engineering Student • Verified User</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300 flex-shrink-0">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-base font-semibold text-white">Luis M.</h4>
                <div className="flex text-emerald-400">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i} className="text-sm">{star}</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-300 italic mb-2">
                "Real-time feedback with the built-in console kept my debugging loop tight. The code editor is professional-grade 
                and the simulation tools are exactly what I needed for my robotics projects."
              </p>
              <p className="text-xs text-slate-400">Mechanical Engineering Student • Verified User</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300 flex-shrink-0">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-base font-semibold text-white">Sarah K.</h4>
                <div className="flex text-emerald-400">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i} className="text-sm">{star}</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-300 italic mb-2">
                "The offline-first approach meant I could code anywhere, anytime without internet. The tutorials are well-structured 
                and the modules cover everything from basics to advanced robotics concepts."
              </p>
              <p className="text-xs text-slate-400">Computer Science Student • Verified User</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-emerald-200">Overall Rating</h3>
          <div className="text-right">
            <p className="text-3xl font-bold text-emerald-300">4.9</p>
            <div className="flex text-emerald-400 mt-1">
              {'★★★★★'.split('').map((star, i) => (
                <span key={i} className="text-lg">{star}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 pt-4 border-t border-emerald-500/20">
          <div>
            <p className="text-xs text-emerald-300/70 uppercase tracking-wide">Total Reviews</p>
            <p className="mt-1 text-sm font-semibold text-emerald-200">2,847</p>
          </div>
          <div>
            <p className="text-xs text-emerald-300/70 uppercase tracking-wide">Active Users</p>
            <p className="mt-1 text-sm font-semibold text-emerald-200">15,632</p>
          </div>
          <div>
            <p className="text-xs text-emerald-300/70 uppercase tracking-wide">Success Rate</p>
            <p className="mt-1 text-sm font-semibold text-emerald-200">94%</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white mb-4">Key Highlights</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cardsToDisplay.map((card) => (
            <article key={card.title} className={`${PANEL_PADDED} group transition hover:border-emerald-500/40 hover:shadow-emerald-800/20 hover:shadow-xl`}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 transition group-hover:bg-emerald-500/20">
                {card.icon}
              </div>
              <h4 className="text-base font-semibold text-white">{card.title}</h4>
              <p className={`mt-2 ${BODY_TEXT}`}>{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );

  const renderDefaultContent = () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
      {cardsToDisplay.map((card) => (
        <article key={card.title} className={`${PANEL_PADDED} group transition hover:border-emerald-500/40 hover:shadow-emerald-800/20 hover:shadow-xl`}>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 transition group-hover:bg-emerald-500/20">
            {card.icon}
          </div>
            <h3 className="text-lg font-semibold text-white">{card.title}</h3>
            <p className={`mt-2 ${BODY_TEXT}`}>{card.body}</p>
          </article>
        ))}
      </div>
  );

  const renderTabContent = () => {
    switch (eyebrow) {
      case 'Explore':
        return renderExploreContent();
      case 'About':
        return renderAboutContent();
      case 'Review':
        return renderReviewContent();
      default:
        return renderDefaultContent();
    }
  };

  return (
    <section className={`${SECTION_STACK} animate-fade-in`} key={eyebrow}>
      <SectionHeader icon={icon} eyebrow={eyebrow} title={content?.title || 'Home'} />
      <p className="max-w-3xl text-base text-slate-300">{content?.body || ''}</p>
      {renderTabContent()}
    </section>
  );
}

export default HomeSection;

