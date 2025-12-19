import SectionHeader from '../ui/SectionHeader';
import { SECTION_STACK } from '../ui/layoutTokens';

function ControlRobotSection({ icon, hasStarted = false, onStart }) {
  if (!hasStarted) {
    return (
      <section className={SECTION_STACK}>
        <SectionHeader icon={icon} title="Control-Based Robot" eyebrow="Control Strategies" />
        
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-8">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-semibold text-white mb-4">Control-Based Robot Configuration</h3>
            <p className="text-base text-slate-300 mb-6 leading-relaxed">
              Configure PID loops, state machines, and safety interlocks tailored to your robotic platform. 
              Use this workspace to design and document control schemes before deploying them in the lab.
            </p>

            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Control System Features</h4>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h5 className="text-sm font-semibold text-white">PID Control Loops</h5>
                  </div>
                  <p className="text-sm text-slate-300">
                    Configure proportional, integral, and derivative gains for precise motion control and stability.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h5 className="text-sm font-semibold text-white">State Machines</h5>
                  </div>
                  <p className="text-sm text-slate-300">
                    Design finite state machines for complex robot behaviors and mode transitions.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h5 className="text-sm font-semibold text-white">Safety Interlocks</h5>
                  </div>
                  <p className="text-sm text-slate-300">
                    Configure emergency stops, limit switches, and safety protocols for lab deployment.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h5 className="text-sm font-semibold text-white">Platform Configuration</h5>
                  </div>
                  <p className="text-sm text-slate-300">
                    Customize control parameters for your specific robotic platform and hardware setup.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">How to Use Control-Based Robot</h4>
              <div className="space-y-4">
                <div className="flex gap-4 rounded-xl border border-slate-800/80 bg-slate-950/60 p-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-sm flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-white mb-1">Define Control Parameters</h5>
                    <p className="text-sm text-slate-300">
                      Set up PID gains, control frequencies, and actuator limits for your robot platform.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl border border-slate-800/80 bg-slate-950/60 p-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-sm flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-white mb-1">Design State Machine</h5>
                    <p className="text-sm text-slate-300">
                      Create state transitions and behaviors for different robot operating modes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl border border-slate-800/80 bg-slate-950/60 p-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-sm flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-white mb-1">Configure Safety Systems</h5>
                    <p className="text-sm text-slate-300">
                      Set up emergency stops, boundary limits, and safety interlocks for safe operation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-xl border border-slate-800/80 bg-slate-950/60 p-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-sm flex-shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-white mb-1">Test & Deploy</h5>
                    <p className="text-sm text-slate-300">
                      Validate your control scheme in simulation, then deploy to physical hardware.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onStart) {
                  onStart();
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-emerald-950 shadow-lg shadow-emerald-800/40 transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Jump Into Control Mode
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={SECTION_STACK}>
      <SectionHeader icon={icon} title="Control-Based Robot" eyebrow="Control Strategies" />
      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <p className="text-base text-slate-300">
          Configure PID loops, state machines, and safety interlocks tailored to your robotic platform. 
          Use this space to document control schemes before deploying them in the lab.
        </p>
        <div className="mt-6 text-sm text-slate-400">
          Control configuration interface will be available here.
        </div>
      </div>
    </section>
  );
}

export default ControlRobotSection;
