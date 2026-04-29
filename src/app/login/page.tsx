import LoginForm from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 h-16 bg-[#0b1326] border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 transition-colors active:scale-95 duration-200">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <span className="text-2xl font-extrabold tracking-tighter text-primary font-sans">LUMINA</span>
        </div>
      </header>
      <main className="grow flex items-center justify-center px-4 pt-20 pb-12 relative overflow-hidden">
        {/* Visual Background Element */}
        <div className="fixed top-0 right-0 -z-10 w-full h-full overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-secondary/10 blur-[100px] rounded-full"></div>
        </div>
        <LoginForm />
      </main>
    </div>
  );
}