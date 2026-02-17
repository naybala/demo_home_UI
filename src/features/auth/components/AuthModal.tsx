"use client";

import React, { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      {/* Main Container */}
      <div className="relative w-full max-w-7xl h-[650px] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden shadow-[#2D4356]/20">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-[110] p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors text-gray-500 dark:text-gray-400"
        >
          <i className="pi pi-times text-lg"></i>
        </button>

        {/* --- Form Containers (The "Back" layer) --- */}
        <div className="flex h-full w-full">
          {/* Sign In Panal (Right Side relative to overlay) */}
          <div className="hidden md:flex flex-1 flex-col items-center justify-center p-12 transition-all">
            <h2 className="text-4xl font-black text-gray-800 dark:text-white mb-8">
              Sign in
            </h2>
            <div className="w-full max-w-sm space-y-4">
              <div className="relative">
                <i className="pi pi-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-blue-500 rounded-2xl outline-none text-gray-800 dark:text-white"
                />
              </div>
              <div className="relative">
                <i className="pi pi-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-blue-500 rounded-2xl outline-none text-gray-800 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <i
                    className={`pi ${showPassword ? "pi-eye-slash" : "pi-eye"}`}
                  ></i>
                </button>
              </div>
              <button className="w-full py-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 uppercase tracking-wider text-sm">
                Sign In
              </button>
            </div>
            <i
              className="pi pi-google mt-10 cursor-pointer"
              style={{ fontSize: "2rem" }}
            ></i>
          </div>

          {/* Sign Up Panel (Left Side relative to overlay) */}
          <div className="hidden md:flex flex-1 flex-col items-center justify-center p-12 transition-all">
            <h2 className="text-4xl font-black text-gray-800 dark:text-white mb-8">
              Sign up
            </h2>
            <div className="w-full max-w-sm space-y-3">
              <div className="relative">
                <i className="pi pi-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-blue-500 rounded-2xl outline-none text-gray-800 dark:text-white"
                />
              </div>
              <div className="relative">
                <i className="pi pi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-blue-500 rounded-2xl outline-none text-gray-800 dark:text-white"
                />
              </div>
              <div className="relative">
                <i className="pi pi-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-blue-500 rounded-2xl outline-none text-gray-800 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <i
                    className={`pi ${showPassword ? "pi-eye-slash" : "pi-eye"}`}
                  ></i>
                </button>
              </div>
              <div className="relative">
                <i className="pi pi-shield absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-blue-500 rounded-2xl outline-none text-gray-800 dark:text-white"
                />
              </div>
              <button className="w-full py-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 uppercase tracking-wider text-sm mt-2">
                Sign Up
              </button>
            </div>
          </div>

          {/* Mobile Layout (Toggle Content) */}
          <div className="flex md:hidden flex-1 flex-col items-center justify-center p-8">
            <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-6 animate-in fade-in transition-all">
              {isSignUp ? "Sign up" : "Sign in"}
            </h2>
            <div className="w-full max-w-sm space-y-3">
              <div className="relative">
                <i className="pi pi-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder={isSignUp ? "Full Name" : "Username"}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 rounded-2xl outline-none text-gray-800 dark:text-white"
                />
              </div>
              {isSignUp && (
                <div className="relative animate-in fade-in">
                  <i className="pi pi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 rounded-2xl outline-none text-gray-800 dark:text-white"
                  />
                </div>
              )}
              <div className="relative">
                <i className="pi pi-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-gray-900 rounded-2xl outline-none text-gray-800 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <i
                    className={`pi ${showPassword ? "pi-eye-slash" : "pi-eye"}`}
                  ></i>
                </button>
              </div>
              {isSignUp && (
                <div className="relative animate-in fade-in">
                  <i className="pi pi-shield absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 rounded-2xl outline-none text-gray-800 dark:text-white"
                  />
                </div>
              )}
              <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl">
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="w-full text-blue-500 font-bold text-sm"
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        </div>

        {/* --- Sliding Overlay (Desktop Only) --- */}
        <div
          className={`hidden md:flex absolute top-0 left-0 w-1/2 h-full z-40 transition-all duration-700 ease-in-out ${isSignUp ? "translate-x-0" : "translate-x-full"}`}
          style={{
            clipPath: "inset(0 0 0 0)",
          }}
        >
          <div className="relative w-full h-full bg-gradient-to-br from-primary to-primary text-white flex flex-col items-center justify-center p-12 text-center">
            {/* Sliding Content Container */}
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {/* Overlay Content: Sign Up State (Visible when Slider is on LEFT) */}
              <div
                className={`absolute transition-all duration-700 transform ${isSignUp ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-[-100%] scale-90 pointer-events-none"}`}
              >
                <h2 className="text-3xl font-bold mb-4">One of us?</h2>
                <p className="mb-10 text-blue-50 opacity-90 max-w-xs text-sm">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  onClick={() => setIsSignUp(false)}
                  className="px-12 py-3 border-2 border-white rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all active:scale-95 uppercase tracking-wider text-sm"
                >
                  Sign In
                </button>
                <div className="mt-12 opacity-80">
                  <i className="pi pi-users text-[100px] text-blue-200/40"></i>
                </div>
              </div>

              {/* Overlay Content: Sign In State (Visible when Slider is on RIGHT) */}
              <div
                className={`absolute transition-all duration-700 transform ${!isSignUp ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-[100%] scale-90 pointer-events-none"}`}
              >
                <h2 className="text-3xl font-bold mb-4">New here?</h2>
                <p className="mb-10 text-blue-50 opacity-90 max-w-xs text-sm">
                  Enter your personal details and start journey with us
                </p>
                <button
                  onClick={() => setIsSignUp(true)}
                  className="px-12 py-3 border-2 border-white rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all active:scale-95 uppercase tracking-wider text-sm"
                >
                  Sign Up
                </button>
                <div className="mt-12 opacity-80">
                  <i className="pi pi-send text-[100px] text-blue-200/40 rotate-12"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
