"use client";


export default function SplashScreen() {
  return (
    <div
      className="fixed inset-0 bg-slate-900 z-50 overflow-hidden font-sans"
      data-testid="splash-screen"
    >
      {/* Minimalist Path Graphic */}
      <svg
        viewBox="0 0 375 400"
        className="absolute top-[20%] left-0 w-full h-auto text-slate-300/80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 120 C 50 145, 80 150, 110 160 C 140 170, 150 175, 175 175 C 230 175, 260 170, 290 175 C 310 180, 310 205, 330 210 C 350 215, 365 210, 375 210"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        {/* First small solid dot */}
        <circle cx="80" cy="151" r="3.5" fill="currentColor" />

        {/* Main prominent circle with dot */}
        <circle cx="175" cy="175" r="22" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="175" cy="175" r="7" fill="currentColor" />

        {/* Middle small empty circle */}
        <circle cx="270" cy="173" r="4.5" stroke="currentColor" strokeWidth="1.5" fill="#0f172a" />

        {/* Right small empty circle */}
        <circle cx="325" cy="208" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* Typography */}
      <div className="absolute bottom-32 left-10 flex flex-col items-start animate-pulse">
        <h1 className="text-5xl font-extrabold text-white tracking-tight mt-1">
          Habit Tracker
        </h1>
        <p className="text-slate-400">Build better habits, one day at a time.</p>
      </div>
    </div>
  );
}
