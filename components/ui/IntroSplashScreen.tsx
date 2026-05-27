"use client";

import { useEffect, useState } from "react";

export default function IntroSplashScreen() {
  const [visible, setVisible] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    // Only play the splash animation once per session to prevent UX annoyance
    const hasVisited = sessionStorage.getItem("mimish-splash-visited");
    if (hasVisited) {
      return;
    }

    setVisible(true);

    // Phase 1: Trigger scale down / fade out after 1.5 seconds
    const timerAnimate = setTimeout(() => {
      setAnimateOut(true);
    }, 1500);

    // Phase 2: Unmount splash screen after 2.3 seconds
    const timerUnmount = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("mimish-splash-visited", "true");
    }, 2300);

    return () => {
      clearTimeout(timerAnimate);
      clearTimeout(timerUnmount);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-sand-50 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
        animateOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div
        className={`flex flex-col items-center transition-all duration-1000 ease-out transform ${
          animateOut ? "scale-90 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <span className="text-[10px] font-sans tracking-widest text-moss-600 uppercase mb-2">
          Welcome to
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-widest text-sand-900 uppercase">
          MimiSh
        </h1>
        <span className="text-xs font-sans tracking-widest text-moss-600 uppercase mt-1">
          Crafts
        </span>
        
        {/* Subtle line decoration that draws in */}
        <div 
          className={`h-px bg-sand-300 mt-6 transition-all duration-1000 ease-out ${
            animateOut ? "w-0" : "w-24"
          }`} 
        />
      </div>
    </div>
  );
}
