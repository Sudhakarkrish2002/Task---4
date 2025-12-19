import { useState } from 'react';
import SectionHeader from '../ui/SectionHeader';
import { SECTION_STACK, PANEL_PADDED } from '../ui/layoutTokens';

const faqItems = [
  {
    question: 'How do I get started with Robot Studio?',
    answer: 'Start by exploring the Welcome screen, then navigate to the Modules section to choose a learning path. The Code Lab is your workspace for writing and executing Python code. We recommend beginning with the "Getting Started" tutorial in the Tutorials section.',
  },
  {
    question: 'Does Robot Studio work offline?',
    answer: 'Yes! Robot Studio is designed as an offline-first application. You can code, run simulations, and access all learning modules without an internet connection. Internet is only required when installing new Python libraries.',
  },
  {
    question: 'How do I install Python libraries?',
    answer: 'Navigate to the Code Lab and click "Install Library" in the toolbar, or use the Utilities modal. You can search for libraries, install pre-configured ones, or add custom libraries. Make sure you have an active internet connection for library installation.',
  },
  {
    question: 'What Python version does Robot Studio use?',
    answer: 'Robot Studio requires Python 3.11 or higher. The application includes an integrated Python runtime environment, so you don\'t need to install Python separately on your system.',
  },
  {
    question: 'Can I connect Robot Studio to physical robots?',
    answer: 'Robot Studio is primarily designed for learning and simulation. For physical robot connections, you can use the pyserial library to communicate with microcontrollers and robotic hardware via USB or serial ports.',
  },
  {
    question: 'How do I save my code projects?',
    answer: 'Your code is automatically saved in the Code Lab. You can create multiple files using the File menu or Ctrl/Cmd+N shortcut. All files are stored locally on your device.',
  },
  {
    question: 'What if my code execution fails?',
    answer: 'Check the Output Console for error messages. Common issues include syntax errors, missing library imports, or incorrect sensor port configurations. Review the error message and consult the relevant module documentation.',
  },
  {
    question: 'How do I generate a network token?',
    answer: 'Click "Generate Token" in the Code Lab toolbar or Utilities modal. Enter your network name and password, then click "Generate Token". Copy the generated token for use in robot connectivity scenarios.',
  },
];

const quickLinks = [
  {
    title: 'Getting Started Guide',
    description: 'Learn the basics of Robot Studio navigation and workspace setup',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: 'Code Lab Documentation',
    description: 'Master the code editor, file management, and execution features',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: 'Module Tutorials',
    description: 'Step-by-step guides for each robotics project module',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M5 4h9l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 4v5h7" />
      </svg>
    ),
  },
  {
    title: 'Troubleshooting',
    description: 'Common issues and solutions for Robot Studio problems',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

const troubleshootingItems = [
  {
    issue: 'Application won\'t start',
    solution: 'Ensure your system meets the minimum requirements (macOS 10.15+, Windows 10+, or Linux with Electron support). Try restarting the application or reinstalling if the problem persists.',
  },
  {
    issue: 'Code execution not working',
    solution: 'Check that your Python code has no syntax errors. Verify that required libraries are installed. Review the console output for specific error messages.',
  },
  {
    issue: 'Library installation fails',
    solution: 'Ensure you have an active internet connection. Check your firewall settings. Try installing libraries one at a time. Verify the library name is correct.',
  },
  {
    issue: 'Editor is slow or unresponsive',
    solution: 'Close unnecessary files in the Code Lab. Clear the console output. Restart the application if performance issues persist. Check your system resources.',
  },
  {
    issue: 'Files not saving',
    solution: 'Files are auto-saved in Robot Studio. If you\'re experiencing issues, manually save by switching between files. Check your disk space and file permissions.',
  },
];

function SupportDeskSection({ icon }) {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <section className={SECTION_STACK}>
      <SectionHeader icon={icon} title="Support Desk" eyebrow="Help & Support" />
      <p className="max-w-3xl text-base text-slate-300">
        Find answers to common questions, access documentation, and get help with Robot Studio. Our support resources are designed to help you succeed in your robotics learning journey.
      </p>

      {/* Quick Help Links */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Help</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => (
            <article
              key={link.title}
              className={`${PANEL_PADDED} group transition hover:border-emerald-500/40 hover:shadow-emerald-800/20 hover:shadow-xl cursor-pointer`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 transition group-hover:bg-emerald-500/20">
                {link.icon}
              </div>
              <h4 className="text-base font-semibold text-white">{link.title}</h4>
              <p className="mt-2 text-sm text-slate-400">{link.description}</p>
            </article>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {faqItems.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-800/80 bg-slate-900/70 overflow-hidden transition hover:border-emerald-500/40"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
              >
                <span className="text-sm font-semibold text-white pr-4">{faq.question}</span>
                <svg
                  className={`h-5 w-5 text-slate-400 flex-shrink-0 transition-transform ${
                    expandedFaq === index ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedFaq === index && (
                <div className="px-6 pb-4">
                  <p className="text-sm text-slate-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Troubleshooting Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Troubleshooting</h3>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="space-y-4">
            {troubleshootingItems.map((item, index) => (
              <div key={index} className="pb-4 border-b border-slate-800/60 last:border-0 last:pb-0">
                <h4 className="text-sm font-semibold text-emerald-300 mb-2">{item.issue}</h4>
                <p className="text-sm text-slate-300">{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact & Resources */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Contact Support</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 flex-shrink-0">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Email Support</p>
                <p className="mt-1 text-sm text-slate-400">support@robotstudio.app</p>
                <p className="mt-1 text-xs text-slate-500">Response within 24-48 hours</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 flex-shrink-0">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Community Forum</p>
                <p className="mt-1 text-sm text-slate-400">forum.robotstudio.app</p>
                <p className="mt-1 text-xs text-slate-500">Connect with other users</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 flex-shrink-0">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Response Time</p>
                <p className="mt-1 text-sm text-slate-400">24-48 hours for email</p>
                <p className="mt-1 text-xs text-slate-500">Community forum: Real-time</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Resources & Documentation</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 flex-shrink-0">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">User Manual</p>
                <p className="mt-1 text-sm text-slate-400">docs.robotstudio.app</p>
                <p className="mt-1 text-xs text-slate-500">Comprehensive documentation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 flex-shrink-0">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Video Tutorials</p>
                <p className="mt-1 text-sm text-slate-400">youtube.com/robotstudio</p>
                <p className="mt-1 text-xs text-slate-500">Step-by-step video guides</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 flex-shrink-0">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">API Reference</p>
                <p className="mt-1 text-sm text-slate-400">api.robotstudio.app</p>
                <p className="mt-1 text-xs text-slate-500">Developer documentation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 flex-shrink-0">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Release Notes</p>
                <p className="mt-1 text-sm text-slate-400">Check for updates</p>
                <p className="mt-1 text-xs text-slate-500">Version 1.0.0 (Current)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
        <h3 className="text-lg font-semibold text-emerald-200 mb-4">System Information</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-emerald-300/70 uppercase tracking-wide mb-1">Application Version</p>
            <p className="text-sm font-semibold text-emerald-200">1.0.0</p>
          </div>
          <div>
            <p className="text-xs text-emerald-300/70 uppercase tracking-wide mb-1">Platform</p>
            <p className="text-sm font-semibold text-emerald-200">Desktop</p>
          </div>
          <div>
            <p className="text-xs text-emerald-300/70 uppercase tracking-wide mb-1">Python Version</p>
            <p className="text-sm font-semibold text-emerald-200">3.11+</p>
          </div>
          <div>
            <p className="text-xs text-emerald-300/70 uppercase tracking-wide mb-1">Status</p>
            <p className="text-sm font-semibold text-emerald-200">Operational</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SupportDeskSection;
