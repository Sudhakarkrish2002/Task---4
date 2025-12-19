import { useEffect, useMemo, useRef, useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import WelcomeScreen from './components/sections/WelcomeScreen';
import HomeSection from './components/sections/HomeSection';
import CodeLabSection from './components/sections/CodeLabSection';
import ModulesSection from './components/sections/ModulesSection';
import InfoSection from './components/sections/InfoSection';
import ProjectDetailSection from './components/sections/ProjectDetailSection';
import InstallLibrarySection from './components/sections/InstallLibrarySection';
import SupportDeskSection from './components/sections/SupportDeskSection';
import ControlRobotSection from './components/sections/ControlRobotSection';
import InstallLibraryModal from './components/modals/InstallLibraryModal';
import GenerateTokenModal from './components/modals/GenerateTokenModal';
import Toast from './components/ui/Toast';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { usePlatform } from './hooks/usePlatform';
import { ROUTES } from './constants/routes';

const sidebarItems = [
  'Home',
  'Code Lab',
  'Modules',
  'Control-Based Robot',
  'Tutorials',
  'Share Your Feedback',
  'Support Desk',
];

// Navigation order for previous/next functionality
const navigationOrder = [
  ROUTES.HOME,
  ROUTES.CODE_LAB,
  ROUTES.MODULES,
  ROUTES.CONTROL_ROBOT,
  ROUTES.TUTORIALS,
  ROUTES.FEEDBACK,
  ROUTES.SUPPORT_DESK,
];

const topNavCopy = {
  Explore: {
    title: 'Discover the Robotics Ecosystem',
    body: 'Survey the rapidly evolving robotics landscape. Access curated knowledge on sensors, controllers, actuators, and offline simulation stacks that pair perfectly with Robot Studio.',
  },
  About: {
    title: 'Inside Robot Studio',
    body: 'Crafted for students and professionals alike, Robot Studio unifies coding tools, simulation, and learning modules into an offline-first desktop experience.',
  },
  Review: {
    title: 'Learner Highlights',
    body: '“The modular practice labs helped me prototype rover logic faster.” — Amara R.  “Real-time feedback with the built-in console kept my debugging loop tight.” — Luis M.',
  },
};

const moduleCards = [
  {
    title: 'Autonomous Rover Planner',
    description: 'Program waypoint navigation with obstacle awareness using Python controllers.',
    fullDescription: 'This project focuses on developing an autonomous rover capable of navigating complex terrains using waypoint-based path planning. You will implement adaptive navigation logic that responds to real-time sensor feedback from LIDAR, ultrasonic sensors, and IMU data. The system will include obstacle avoidance layers for resilient mobility, mission-state management for exploration and data logging routines, and comprehensive calibration procedures for wheel encoders and terrain-specific traction adjustments. The final deliverable includes a validation matrix comparing simulated paths against expected ground truth data.',
    imageAlt: 'Autonomous rover planner setup illustration.',
    detail: [
      'Plan rover routes using adaptive waypoint logic that responds to sensor feedback in real time.',
      'Design obstacle avoidance layers that blend LIDAR, ultrasonic, and IMU data for resilient mobility.',
      'Prototype mission-state logic to handle exploration, data logging, and return-to-base routines.',
      'Document calibration checkpoints for wheel encoders and terrain-specific traction adjustments.',
      'Prepare a validation matrix that compares simulated paths against expected ground truth data.',
    ],
  },
  {
    title: 'Robotic Arm Pick & Place',
    description: 'Calibrate IK routines and evaluate gripper precision in a sandbox environment.',
    fullDescription: 'Master the fundamentals of robotic manipulation by building a pick-and-place system with precise inverse kinematics control. This project guides you through aligning coordinate frames between camera input, workbench origin, and end-effector mounts. You will implement IK solvers with joint constraint awareness and fallback strategies, prototype grasp planning states that adapt to varied object geometries, and benchmark cycle-time metrics for production throughput. Safety is paramount, with comprehensive documentation of interlock conditions and e-stop triggers for lab deployment readiness.',
    imageAlt: 'Robotic arm pick and place workbench.',
    detail: [
      'Align coordinate frames between camera input, workbench origin, and end-effector mounts.',
      'Implement inverse kinematics solvers with joint constraint awareness and fallback strategies.',
      'Prototype grasp planning states that adapt to varied object geometries and grip tolerances.',
      'Plot cycle-time metrics to benchmark throughput across simulated production runs.',
      'Capture safety interlock conditions and e-stop triggers for lab deployment readiness.',
    ],
  },
  {
    title: 'Vision Guided Sorting',
    description: 'Integrate computer-vision pipelines to classify and route packages autonomously.',
    fullDescription: 'Integrate cutting-edge computer vision techniques to create an autonomous sorting system capable of classifying and routing packages with high accuracy. You will assemble a data ingestion pipeline that normalizes camera feeds for consistent inference, train or load lightweight classifiers optimized for offline execution on embedded GPUs, and coordinate conveyor actuation timing with detection confidence windows. The system includes robust fallback handling for ambiguous classifications, comprehensive logging for retraining candidates, and detailed sensor maintenance schedules to ensure lenses and lighting remain calibration-ready for optimal performance.',
    imageAlt: 'Vision guided sorting prototype.',
    detail: [
      'Assemble a data ingestion pipeline that normalizes camera feeds for consistent inference.',
      'Train or load lightweight classifiers optimized for offline execution on embedded GPUs.',
      'Coordinate conveyor actuation timing with detection confidence windows for accurate routing.',
      'Design fallback handling for ambiguous classifications and log retraining candidates.',
      'Draft sensor maintenance schedules ensuring lenses and lighting remain calibration ready.',
    ],
  },
  {
    title: 'Humanoid Balance Coach',
    description: 'Tune PID loops and momentum compensation strategies for bipedal robots.',
    fullDescription: 'Dive deep into the complex world of bipedal locomotion by developing a humanoid balance control system. This advanced project covers instrumenting IMU data streams to feed balancing controllers with low-latency telemetry, modeling center-of-mass dynamics under varied payloads and stance configurations, and scripting adaptive gain scheduling routines to maintain stability during gait transitions. You will simulate push-recovery scenarios, annotate joint torque envelopes for analysis, and compile comprehensive deployment notes highlighting actuator temperature thresholds and cooldown cycles essential for safe operation.',
    imageAlt: 'Humanoid balance training in lab.',
    detail: [
      'Instrument IMU data streams to feed balancing controllers with low latency telemetry.',
      'Model center-of-mass dynamics under varied payloads and stance configurations.',
      'Script adaptive gain scheduling routines to maintain stability during gait transitions.',
      'Simulate push-recovery scenarios and annotate joint torque envelopes for analysis.',
      'Compile deployment notes highlighting actuator temperature thresholds and cooldown cycles.',
    ],
  },
];

const libraryInventory = [
  {
    name: 'numpy',
    summary: 'Core scientific computing utilities for numerical analysis.',
  },
  {
    name: 'pandas',
    summary: 'Data analysis toolkit with high-performance data structures.',
  },
  {
    name: 'matplotlib',
    summary: 'Comprehensive 2D plotting library for producing publication-quality figures.',
  },
  {
    name: 'scipy',
    summary: 'Algorithms for scientific and technical computing, built on top of NumPy.',
  },
  {
    name: 'opencv',
    summary: 'Computer vision toolkit for image acquisition and processing.',
  },
  {
    name: 'pyserial',
    summary: 'Serial communication utilities, perfect for microcontroller interfaces.',
  },
];

const EDITOR_VIEWS = [ROUTES.CODE_LAB];

const pageIcon = (
  <svg className="h-10 w-10 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.95 6.95-2.12-2.12M8.17 8.17 6.05 6.05m12.9 0-2.12 2.12M8.17 15.83l-2.12 2.12"
    />
    <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
  </svg>
);

function App() {
  const [view, setView] = useState(ROUTES.WELCOME);
  const [topTab, setTopTab] = useState('Explore');
  const [selectedProject, setSelectedProject] = useState(moduleCards[0]);
  const [moduleSearch, setModuleSearch] = useState('');
  const [libraryList, setLibraryList] = useState(libraryInventory);
  const [libraryStatus, setLibraryStatus] = useState(() =>
    libraryInventory.reduce((acc, library) => {
      acc[library.name] = 'pending';
      return acc;
    }, {}),
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [customLibrary, setCustomLibrary] = useState('');
  const [consoleLogs, setConsoleLogs] = useState(['Ready to install packages.']);
  const [isInstalling, setIsInstalling] = useState(false);
  const [currentInstall, setCurrentInstall] = useState(null);
  const [installMessage, setInstallMessage] = useState(null);
  const [internetStatus, setInternetStatus] = useState({
    connection: 'Connected',
    lastChecked: new Date(),
  });
  const [isInstallLibraryModalOpen, setIsInstallLibraryModalOpen] = useState(false);
  const [isGenerateTokenModalOpen, setIsGenerateTokenModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [networkName, setNetworkName] = useState('');
  const [networkPassword, setNetworkPassword] = useState('');
  const [generatedToken, setGeneratedToken] = useState('');
  const [isTokenCopied, setIsTokenCopied] = useState(false);
  const [toast, setToast] = useState(null);
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  
  const defaultCodeLabCode = [
    "from robot_core import Rover",
    "from sensors import Lidar, IMU",
    "",
    "rover = Rover(name=\"Explorer\")",
    "lidar = Lidar(port=\"/dev/ttyUSB0\")",
    "",
    "def bootstrap():",
    "    rover.attach_sensor(lidar)",
    "    rover.attach_sensor(IMU())",
    "    rover.calibrate()",
    "",
    "if __name__ == \"__main__\":",
    "    bootstrap()",
    "    rover.run_autonomy()",
  ].join('\n');

  const [codeLabCode, setCodeLabCode] = useState(defaultCodeLabCode);
  const [codeLabConsole, setCodeLabConsole] = useState(['Ready to execute code.']);
  const [codeLabStatus, setCodeLabStatus] = useState('Idle');
  const [codeLabFiles, setCodeLabFiles] = useState([{ name: 'code.py', content: defaultCodeLabCode, active: true }]);
  const [hasStartedCoding, setHasStartedCoding] = useState(false);
  const [isCodeLabFullScreen, setIsCodeLabFullScreen] = useState(false);
  const [hasStartedControlRobot, setHasStartedControlRobot] = useState(false);
  
  const previousNonEditorViewRef = useRef(ROUTES.WELCOME);
  const { modifierKey, platform } = usePlatform();
  const requiredLibraries = useMemo(
    () =>
      libraryInventory.filter((library) =>
        ['numpy', 'opencv', 'pyserial'].includes(library.name),
      ),
    [],
  );

  const content = useMemo(() => topNavCopy[topTab], [topTab]);
  const filteredModules = useMemo(
    () =>
      moduleCards.filter((module) => {
        const query = moduleSearch.trim().toLowerCase();
        if (!query) {
          return true;
        }

        return (
          module.title.toLowerCase().includes(query) ||
          module.description.toLowerCase().includes(query)
        );
      }),
    [moduleSearch],
  );
  const filteredLibraries = useMemo(
    () =>
      libraryList.filter((library) =>
        library.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
      ),
    [libraryList, searchQuery],
  );

  const openProjectDetail = (project) => {
    setSelectedProject(project);
    setView(ROUTES.PROJECT_DETAIL);
  };

  const openCodeLab = () => {
    setView(ROUTES.CODE_LAB);
    setHasStartedCoding(false);
    setToast({ message: 'Code Lab opened', type: 'success' });
  };

  const handleEnterFullScreen = () => {
    setIsCodeLabFullScreen(true);
    setHasStartedCoding(true);
  };

  const handleExitFullScreen = () => {
    setIsCodeLabFullScreen(false);
  };

  const handleStartControlRobot = () => {
    setHasStartedControlRobot(true);
  };

  // Navigation helpers
  const getCurrentNavigationIndex = () => {
    return navigationOrder.indexOf(view);
  };

  const handleNavigatePrevious = () => {
    const currentIndex = getCurrentNavigationIndex();
    if (currentIndex > 0) {
      const previousView = navigationOrder[currentIndex - 1];
      handleViewChange(previousView);
    }
  };

  const handleNavigateNext = () => {
    const currentIndex = getCurrentNavigationIndex();
    if (currentIndex < navigationOrder.length - 1) {
      const nextView = navigationOrder[currentIndex + 1];
      handleViewChange(nextView);
    }
  };

  // Compute navigation state based on current view
  const currentNavIndex = navigationOrder.indexOf(view);
  const canNavigatePrevious = currentNavIndex > 0;
  const canNavigateNext = currentNavIndex < navigationOrder.length - 1 && currentNavIndex !== -1;

  const handleCreateNewFile = () => {
    // Save current file content before creating new
    setCodeLabFiles((prev) =>
      prev.map((f) => (f.active ? { ...f, content: codeLabCode } : f))
    );

    const newFileName = `code_${Date.now()}.py`;
    const newFile = { name: newFileName, content: '', active: true };
    setCodeLabFiles((prev) => prev.map((f) => ({ ...f, active: false })).concat(newFile));
    setCodeLabCode('');
    setToast({ message: `New file ${newFileName} created`, type: 'success' });
  };

  const handleCodeLabRun = () => {
    if (codeLabStatus === 'Running') {
      return;
    }

    setCodeLabStatus('Running');
    const timestamp = new Date().toLocaleTimeString();
    setCodeLabConsole((prev) => [`[${timestamp}] ▶️ Executing code...`, ...prev].slice(0, 50));

    // Simulate code execution
    setTimeout(() => {
      const completedAt = new Date().toLocaleTimeString();
      setCodeLabStatus('Idle');
      setCodeLabConsole((prev) => [
        `[${completedAt}] ✅ Code executed successfully.`,
        `[${completedAt}] Output: Rover "Explorer" initialized with sensors.`,
        ...prev,
      ].slice(0, 50));
      setToast({ message: 'Code executed successfully!', type: 'success' });
    }, 1500);
  };

  const handleCodeLabClearConsole = () => {
    setCodeLabConsole(['Console cleared. Ready to execute code.']);
  };

  const handleCodeLabDeleteFile = (fileName) => {
    // Don't delete if it's the only file
    if (codeLabFiles.length <= 1) {
      setToast({ message: 'Cannot delete the last file. At least one file must remain.', type: 'warning' });
      return;
    }

    const fileToDelete = codeLabFiles.find((f) => f.name === fileName);
    if (!fileToDelete) return;

    // If deleting the active file, switch to another file
    if (fileToDelete.active) {
      const otherFile = codeLabFiles.find((f) => f.name !== fileName);
      if (otherFile) {
        setCodeLabCode(otherFile.content);
        setCodeLabFiles((prev) =>
          prev
            .filter((f) => f.name !== fileName)
            .map((f) => ({ ...f, active: f.name === otherFile.name }))
        );
      }
    } else {
      // Just remove the file
      setCodeLabFiles((prev) => prev.filter((f) => f.name !== fileName));
    }

    setToast({ message: `File ${fileName} deleted`, type: 'success' });
  };

  const handleCodeLabRenameFile = (oldFileName, newFileName) => {
    // Check if new name is empty
    if (!newFileName || !newFileName.trim()) {
      setToast({ message: 'File name cannot be empty', type: 'warning' });
      return;
    }

    // Check if new name already exists
    const fileExists = codeLabFiles.some((f) => f.name === newFileName && f.name !== oldFileName);
    if (fileExists) {
      setToast({ message: `File "${newFileName}" already exists`, type: 'warning' });
      return;
    }

    // Rename the file
    setCodeLabFiles((prev) =>
      prev.map((f) => (f.name === oldFileName ? { ...f, name: newFileName } : f))
    );

    setToast({ message: `File renamed from "${oldFileName}" to "${newFileName}"`, type: 'success' });
  };

  const appendLog = (line) => {
    const timestamp = new Date().toLocaleTimeString();
    setConsoleLogs((prev) => [...prev, `[${timestamp}] ${line}`]);
  };



  const handleClearInstallConsole = () => {
    setConsoleLogs(['Console cleared.']);
    setInstallMessage(null);
  };

  useEffect(() => {
    if (!EDITOR_VIEWS.includes(view)) {
      previousNonEditorViewRef.current = view;
    }
  }, [view]);

  const openInstallLibraryModal = () => {
    setIsGenerateTokenModalOpen(false);
    setIsInstallLibraryModalOpen(true);
  };

  const openGenerateTokenModal = () => {
    setIsInstallLibraryModalOpen(false);
    setIsGenerateTokenModalOpen(true);
  };


  // Keyboard shortcuts
  useKeyboardShortcuts({
    'Control+n': () => {
      if (view === ROUTES.CODE_LAB) {
        handleCreateNewFile();
      }
    },
    'Meta+n': () => {
      if (view === ROUTES.CODE_LAB) {
        handleCreateNewFile();
      }
    },
    'Control+r': () => {
      if (view === ROUTES.CODE_LAB) {
        handleCodeLabRun();
      }
    },
    'Meta+r': () => {
      if (view === ROUTES.CODE_LAB) {
        handleCodeLabRun();
      }
    },
    'f5': () => {
      if (view === ROUTES.CODE_LAB) {
        handleCodeLabRun();
      }
    },
    'Escape': () => {
      if (isInstallLibraryModalOpen) {
        setIsInstallLibraryModalOpen(false);
      }
      if (isGenerateTokenModalOpen) {
        setIsGenerateTokenModalOpen(false);
      }
      if (isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    },
  }, view !== ROUTES.WELCOME);


  const handleViewChange = (nextView) => {
    setView(nextView);
    setIsSidebarOpen(false);
    // When switching to Home, maintain current tab or default to Explore
    if (nextView === ROUTES.HOME && !topTab) {
      setTopTab('Explore');
    }
    // Reset Code Lab intro when navigating to Code Lab
    if (nextView === ROUTES.CODE_LAB) {
      setHasStartedCoding(false);
      setIsCodeLabFullScreen(false);
    }
    // Reset Control Robot intro when navigating to Control Robot
    if (nextView === ROUTES.CONTROL_ROBOT) {
      setHasStartedControlRobot(false);
    }
  };

  const handleTopNavTabChange = (tab) => {
    setTopTab(tab);
    // If not on Home view, switch to Home to show tab content
    if (view !== ROUTES.HOME) {
      setView(ROUTES.HOME);
    }
  };

  const renderSection = () => {
    switch (view) {
      case ROUTES.HOME:
        return <HomeSection icon={pageIcon} content={content} eyebrow={topTab} />;
      case ROUTES.CODE_LAB:
        return (
          <CodeLabSection
            icon={pageIcon}
            code={codeLabCode}
            onCodeChange={setCodeLabCode}
            onRun={handleCodeLabRun}
            onOpenEditor={openCodeLab}
            onOpenInstallLibrary={openInstallLibraryModal}
            onOpenGenerateToken={openGenerateTokenModal}
            onCreateNewFile={handleCreateNewFile}
            consoleLines={codeLabConsole}
            status={codeLabStatus}
            onClearConsole={handleCodeLabClearConsole}
            files={codeLabFiles}
            onFileChange={(fileName) => {
              // Save current file content before switching
              setCodeLabFiles((prev) =>
                prev.map((f) => (f.active ? { ...f, content: codeLabCode } : f))
              );
              
              // Switch to new file
              setCodeLabFiles((prev) =>
                prev.map((f) => ({
                  ...f,
                  active: f.name === fileName,
                }))
              );
              
              // Load new file content
              const file = codeLabFiles.find((f) => f.name === fileName);
              if (file) {
                setCodeLabCode(file.content || '');
              }
            }}
            onDeleteFile={handleCodeLabDeleteFile}
            onRenameFile={handleCodeLabRenameFile}
            hasStartedCoding={hasStartedCoding}
            isFullScreen={isCodeLabFullScreen}
            onEnterFullScreen={handleEnterFullScreen}
            onExitFullScreen={handleExitFullScreen}
          />
        );
      case ROUTES.MODULES:
        return (
          <ModulesSection
            icon={pageIcon}
            modules={filteredModules}
            onSelectModule={openProjectDetail}
            searchValue={moduleSearch}
            onSearchChange={setModuleSearch}
          />
        );
      case ROUTES.CONTROL_ROBOT:
        return (
          <ControlRobotSection
            icon={pageIcon}
            hasStarted={hasStartedControlRobot}
            onStart={handleStartControlRobot}
          />
        );
      case ROUTES.TUTORIALS:
        return (
          <InfoSection icon={pageIcon} title='Tutorial Library' eyebrow='Guided Lessons'>
            <ul className='space-y-3 text-slate-300'>
              <li className='rounded-xl border border-slate-800/80 bg-slate-950/60 p-4'>
                Getting started with Robot Studio navigation and workspace configuration.
              </li>
              <li className='rounded-xl border border-slate-800/80 bg-slate-950/60 p-4'>
                Building your first control loop using Python and offline simulation.
              </li>
              <li className='rounded-xl border border-slate-800/80 bg-slate-950/60 p-4'>
                Integrating ROS topics for advanced robotics workflows.
              </li>
            </ul>
          </InfoSection>
        );
      case ROUTES.FEEDBACK:
        return (
          <InfoSection
            icon={pageIcon}
            title='Share Your Feedback'
            eyebrow='Improve Robot Studio'
            description='Let us know which features empower your robotics journey and where we can enhance the practice experience.'
          >
            {feedbackSubmitted ? (
              <div className='rounded-2xl border border-emerald-500/40 bg-emerald-500/15 p-8 text-center'>
                <div className='mb-4 text-4xl'>✅</div>
                <h3 className='mb-2 text-lg font-semibold text-emerald-200'>Thank You!</h3>
                <p className='text-sm text-emerald-300/80'>
                  Your feedback has been submitted successfully. We appreciate your input!
                </p>
                <button
                  type='button'
                  onClick={() => {
                    setFeedbackSubmitted(false);
                    setFeedbackName('');
                    setFeedbackEmail('');
                    setFeedbackMessage('');
                  }}
                  className='mt-6 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-6 py-2 text-sm font-semibold uppercase tracking-wide text-emerald-200 transition hover:bg-emerald-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400'
                >
                  Submit Another Feedback
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!feedbackMessage.trim()) {
                    setToast({ message: 'Please enter your feedback message', type: 'warning' });
                    return;
                  }
                  const feedback = {
                    name: feedbackName.trim() || 'Anonymous',
                    email: feedbackEmail.trim() || '',
                    message: feedbackMessage.trim(),
                    timestamp: new Date().toISOString(),
                  };
                  try {
                    const existingFeedback = JSON.parse(localStorage.getItem('robotStudioFeedback') || '[]');
                    existingFeedback.push(feedback);
                    localStorage.setItem('robotStudioFeedback', JSON.stringify(existingFeedback));
                    setFeedbackSubmitted(true);
                    setToast({ message: 'Feedback submitted successfully!', type: 'success' });
                  } catch (error) {
                    setToast({ message: 'Failed to save feedback. Please try again.', type: 'error' });
                  }
                }}
                className='space-y-6 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-6'
              >
                <div>
                  <label className='mb-2 block text-xs uppercase tracking-wide text-slate-400' htmlFor='feedback-name'>
                    Name (Optional)
                  </label>
                  <input
                    id='feedback-name'
                    type='text'
                    value={feedbackName}
                    onChange={(e) => setFeedbackName(e.target.value)}
                    placeholder='Your name'
                    className='w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/30'
                  />
                </div>
                <div>
                  <label className='mb-2 block text-xs uppercase tracking-wide text-slate-400' htmlFor='feedback-email'>
                    Email (Optional)
                  </label>
                  <input
                    id='feedback-email'
                    type='email'
                    value={feedbackEmail}
                    onChange={(e) => setFeedbackEmail(e.target.value)}
                    placeholder='your.email@example.com'
                    className='w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/30'
                  />
                </div>
                <div>
                  <label className='mb-2 block text-xs uppercase tracking-wide text-slate-400' htmlFor='feedback-message'>
                    Your Feedback <span className='text-rose-400'>*</span>
                  </label>
                  <textarea
                    id='feedback-message'
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    placeholder='Tell us what you think about Robot Studio, what features you love, or what we can improve...'
                    rows={6}
                    required
                    className='w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/30 resize-none'
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <p className='text-xs text-slate-500'>
                    Your feedback is stored locally and helps us improve Robot Studio.
                  </p>
                  <button
                    type='submit'
                    className='rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-emerald-950 shadow-lg shadow-emerald-800/40 transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400'
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            )}
          </InfoSection>
        );
      case ROUTES.PROJECT_DETAIL:
        return (
          <ProjectDetailSection icon={pageIcon} project={selectedProject} onStartCoding={openCodeLab} />
        );
      case ROUTES.SUPPORT_DESK:
        return <SupportDeskSection icon={pageIcon} />;
      default:
        return null;
    }
  };

  const handleInstallLibrary = (library) => {
    const { name } = library;
    const status = libraryStatus[name];

    if (status === 'installed') {
      setInstallMessage({ type: 'info', text: `🔵 ${name} already installed!` });
      setToast({ message: `${name} is already installed`, type: 'info' });
      appendLog(`${name} already installed.`);
      return;
    }

    if (isInstalling) {
      appendLog(`Install in progress: ${currentInstall}. Please wait...`);
      setInstallMessage({ type: 'info', text: `🔵 Finish installing ${currentInstall} first.` });
      setToast({ message: `Please wait for ${currentInstall} installation to complete`, type: 'warning' });
      return;
    }

    if (internetStatus.connection === 'Disconnected') {
      setInstallMessage({ type: 'error', text: '🔴 Installation failed!' });
      setToast({ message: 'Installation failed! Check your internet connection.', type: 'error' });
      appendLog(`Failed to install ${name}: No internet connection.`);
      return;
    }

    setCurrentInstall(name);
    setIsInstalling(true);
    appendLog(`Installing ${name}...`);
    setInstallMessage({ type: 'info', text: `🔵 Installing ${name}...` });
    setLibraryStatus((prev) => ({
      ...prev,
      [name]: 'installing',
    }));

    setTimeout(() => {
      const shouldFail = Math.random() < 0.1;
      
      if (shouldFail) {
        setLibraryStatus((prev) => ({
          ...prev,
          [name]: 'pending',
        }));
        setIsInstalling(false);
        setCurrentInstall(null);
        setInstallMessage({ type: 'error', text: '🔴 Installation failed!' });
        setToast({ message: `Failed to install ${name}`, type: 'error' });
        appendLog(`Failed to install ${name}. Please try again.`);
      } else {
        setLibraryStatus((prev) => ({
          ...prev,
          [name]: 'installed',
        }));
        setIsInstalling(false);
        setCurrentInstall(null);
        setInstallMessage({ type: 'success', text: `🟢 ${name} installed successfully!` });
        setToast({ message: `${name} installed successfully!`, type: 'success' });
        appendLog(`${name} installed successfully!`);
      }
    }, 1600);
  };

  const handleInstallCustomLibrary = () => {
    const normalized = customLibrary.trim().toLowerCase();
    if (!normalized) {
      setInstallMessage({ type: 'error', text: '🔴 Please enter a library name.' });
      return;
    }

    let nextLibrary = libraryList.find((library) => library.name === normalized);
    if (!nextLibrary) {
      nextLibrary = {
        name: normalized,
        summary: 'Custom library installation request.',
      };
      setLibraryList((prev) => [...prev, nextLibrary]);
    }
    setCustomLibrary('');
    handleInstallLibrary(nextLibrary);
  };

  const handleGenerateToken = () => {
    const base = `${networkName || 'robot-net'}:${networkPassword || 'offline'}`;
    const encoded = btoa(base)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/g, '');
    setGeneratedToken(`rst-${encoded}`);
    setIsTokenCopied(false);
  };

  const handleCopyToken = async () => {
    if (!generatedToken) return;
    try {
      await navigator.clipboard.writeText(generatedToken);
      setIsTokenCopied(true);
    } catch {
      setIsTokenCopied(false);
    }
  };

  useEffect(() => {
    const checkInternetConnection = () => {
      const connectionStatus = navigator.onLine ? 'Connected' : 'Disconnected';
      setInternetStatus({
        connection: connectionStatus,
        lastChecked: new Date(),
      });
    };

    const handleOnline = () => {
      setInternetStatus({
        connection: 'Connected',
        lastChecked: new Date(),
      });
    };

    const handleOffline = () => {
      setInternetStatus({
        connection: 'Disconnected',
        lastChecked: new Date(),
      });
    };

    checkInternetConnection();
    const interval = setInterval(checkInternetConnection, 5000);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (view !== ROUTES.CODE_LAB) {
      setIsInstallLibraryModalOpen(false);
      setIsGenerateTokenModalOpen(false);
    }
  }, [view]);

  useEffect(() => {
    setLibraryStatus((prev) => {
      const next = { ...prev };
      let changed = false;

      libraryList.forEach(({ name }) => {
        if (!next[name]) {
          next[name] = 'pending';
          changed = true;
        }
      });

      return changed ? next : prev;
    });
  }, [libraryList]);

  if (view === ROUTES.WELCOME) {
    return <WelcomeScreen icon={pageIcon} onStart={() => setView(ROUTES.HOME)} />;
  }

  const platformClass = platform === 'mac' ? 'mac-style' : platform === 'windows' ? 'windows-style' : platform === 'linux' ? 'linux-style' : '';

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 ${platformClass}`}>
      {!isCodeLabFullScreen && (
        <TopNav 
          activeTab={topTab} 
          onSelect={handleTopNavTabChange} 
          onMenuToggle={() => setIsSidebarOpen((prev) => !prev)}
          currentView={view}
          onNavigatePrevious={handleNavigatePrevious}
          onNavigateNext={handleNavigateNext}
          canNavigatePrevious={canNavigatePrevious}
          canNavigateNext={canNavigateNext}
        />
      )}
      <div className={`mx-auto flex w-full ${isCodeLabFullScreen ? 'gap-0 px-0' : 'max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8'}`}>
        {!isCodeLabFullScreen && (
          <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
            <Sidebar
              items={sidebarItems}
              activeItem={view}
              onSelect={handleViewChange}
              className="sticky top-24"
              heading="Workspace"
            />
          </div>
        )}

        <main className={`${isCodeLabFullScreen ? 'w-full' : 'flex-1 min-w-0'} space-y-8`} key={`${view}-${topTab}`}>
          {renderSection()}
        </main>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="relative h-full w-72 max-w-xs bg-slate-950/95 shadow-2xl shadow-slate-950/60">
            <button
              type="button"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-800/80 text-slate-400 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
              aria-label="Close sidebar"
              onClick={() => setIsSidebarOpen(false)}
            >
              ×
            </button>
            <Sidebar
              items={sidebarItems}
              activeItem={view}
              onSelect={handleViewChange}
              heading="Workspace"
              className="h-full overflow-y-auto border-none bg-transparent pb-6 pt-10 shadow-none"
            />
                          </div>
                          <button
                            type="button"
            className="flex-1 bg-slate-950/60"
            aria-label="Close sidebar overlay"
            onClick={() => setIsSidebarOpen(false)}
          />
                    </div>
                  )}


      {isInstallLibraryModalOpen && (
        <InstallLibraryModal
          requiredLibraries={requiredLibraries}
          libraryStatus={libraryStatus}
          onInstallLibrary={handleInstallLibrary}
          isInstalling={isInstalling}
          currentInstall={currentInstall}
          installMessage={installMessage}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filteredLibraries={filteredLibraries}
          customLibrary={customLibrary}
          onCustomLibraryChange={setCustomLibrary}
          onInstallCustomLibrary={handleInstallCustomLibrary}
          consoleLogs={consoleLogs}
          internetStatus={internetStatus}
          onClearConsole={handleClearInstallConsole}
          onClose={() => setIsInstallLibraryModalOpen(false)}
        />
      )}

      {isGenerateTokenModalOpen && (
        <GenerateTokenModal
          networkName={networkName}
          onNetworkNameChange={setNetworkName}
          networkPassword={networkPassword}
          onNetworkPasswordChange={setNetworkPassword}
          onGenerateToken={handleGenerateToken}
          generatedToken={generatedToken}
          onCopyToken={handleCopyToken}
          isTokenCopied={isTokenCopied}
          onClose={() => setIsGenerateTokenModalOpen(false)}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
