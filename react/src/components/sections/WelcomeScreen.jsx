import robotImage from '../../assets/robot.jpg';

function WelcomeScreen({ onStart, icon }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16 lg:flex-row lg:items-center lg:gap-12">
        <section className="max-w-xl lg:w-1/2">
          <div className="flex items-center gap-3 text-emerald-300">
            <span className="rounded-full bg-emerald-500/10 p-3">{icon}</span>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
              Welcome Page
            </p>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Robot Studio</h1>
          <p className="mt-6 text-lg text-slate-300">
            Welcome to Robot Studio! Dive into an interactive desktop environment crafted for learning, coding, and
            controlling robots through guided modules, hands-on tutorials, and real-time execution tools.
          </p>
          <p className="mt-4 text-slate-400">
            Explore curated learning paths, build real projects, and connect with powerful offline simulation
            capabilities. Your robotics journey starts here.
          </p>
          <button
            type="button"
            onClick={onStart}
            className="mt-10 inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-emerald-950 shadow-emerald-800/40 transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            aria-label="Start your learning journey with Robot Studio"
          >
            Start Your Learning Smart
          </button>
        </section>

        <aside className="mt-12 flex w-full justify-center lg:mt-0 lg:w-1/2">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/60 shadow-2xl shadow-slate-950/40">
            <img
              src={robotImage}
              alt="Robot Studio control rig"
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-x-6 bottom-6 rounded-full bg-slate-900/80 px-4 py-2 text-center text-xs uppercase tracking-wide text-slate-300 backdrop-blur-sm">
              Explore robotics labs with immersive tooling
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default WelcomeScreen;

