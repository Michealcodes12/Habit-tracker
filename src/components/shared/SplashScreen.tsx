"use client";

export default function SplashScreen() {
  return (
    <div
      className="fixed inset-0 bg-background z-50 overflow-hidden flex flex-col items-center justify-center text-on-surface"
      data-testid="splash-screen"
      style={{
        backgroundImage: 'radial-gradient(at 0% 0%, rgba(5, 102, 217, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(87, 241, 219, 0.1) 0px, transparent 50%)'
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20">
        <div className="absolute top-[10%] left-[10%] w-1 h-1 bg-primary rounded-full blur-[1px]"></div>
        <div className="absolute top-[20%] right-[15%] w-1 h-1 bg-secondary rounded-full blur-[1px]"></div>
        <div className="absolute bottom-[30%] left-[20%] w-1 h-1 bg-tertiary rounded-full blur-[1px]"></div>
        <div className="absolute top-[60%] right-[5%] w-1 h-1 bg-primary rounded-full blur-[1px]"></div>
      </div>

      {/* Main Content Canvas */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-md w-full animate-pulse duration-1000">
        {/* Brand Identity */}
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tighter text-primary font-sans">
            HABIT-TRACKER
          </h1>
          <p className="text-lg text-on-surface-variant font-medium tracking-tight">
            Your path to mastery starts here
          </p>
        </div>
      </main>
    </div>
  );
}
