import SignupForm from "@/components/auth/SignupForm";

export default function Signup() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 h-16 bg-[#0b1326] border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 transition-colors active:scale-95 duration-200 rounded-full text-primary">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="text-2xl font-extrabold tracking-tighter text-primary font-sans">LUMINA</span>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center p-6 pt-24 pb-12 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full"></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-secondary/10 blur-[100px] rounded-full"></div>
        </div>
        
        <div className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="hidden md:flex flex-col gap-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold font-sans text-on-surface leading-tight">Master your ritual, elevate your life.</h1>
              <p className="text-lg text-on-surface-variant max-w-md">Join a community of high-achievers focused on mental clarity and incremental growth through purposeful habit tracking.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-6 rounded-xl space-y-2">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                <h3 className="font-bold text-on-surface">Momentum</h3>
                <p className="text-sm text-on-surface-variant">Visual streaks that drive consistency.</p>
              </div>
              <div className="glass-panel p-6 rounded-xl space-y-2">
                <span className="material-symbols-outlined text-tertiary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <h3 className="font-bold text-on-surface">Ritualistic</h3>
                <p className="text-sm text-on-surface-variant">Premium interface for daily focus.</p>
              </div>
            </div>
          </div>
          
          <SignupForm />
        </div>
      </main>
      <footer className="mt-auto py-8 px-6 text-center text-on-surface-variant/40 text-xs font-bold uppercase tracking-[0.2em]">
        Lumina System © 2024 • Designed for Clarity
      </footer>
    </div>
  );
}