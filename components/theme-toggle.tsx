"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  const handleThemeToggle = () => {
    if (isAnimating) return

    setIsAnimating(true)

    // Create full-screen sweep animation from bottom to top
    const sweep = document.createElement("div")
    sweep.className = `theme-sweep ${isDark ? "sweep-to-light" : "sweep-to-dark"}`
    console.log("[v0] Theme toggle initiated, current theme:", isDark ? "dark" : "light")
    document.body.appendChild(sweep)

    // Trigger animation
    setTimeout(() => {
      sweep.classList.add("theme-sweep-active")
      console.log("[v0] Animation started")
    }, 10)

    // Theme switches when animation is half-way through
    setTimeout(() => {
      console.log("[v0] Switching theme to:", isDark ? "light" : "dark")
      setTheme(isDark ? "light" : "dark")
    }, 300)

    // Cleanup after animation completes
    setTimeout(() => {
      sweep.remove()
      setIsAnimating(false)
      console.log("[v0] Animation completed")
    }, 600)
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleThemeToggle}
      disabled={isAnimating}
      className="fixed bottom-5 right-5 z-50 group"
      style={{ zIndex: 10000 }}
      aria-label="Toggle theme"
    >
      {/* Main toggle circle */}
      <div
        className={`relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${
          isDark ? "bg-white/20" : "bg-black/20"
        }`}
      >
        {/* Inner animated content */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Sun icon - rotates when dark */}
          <div
            className={`absolute transition-all duration-500 ${
              isDark ? "rotate-180 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          >
            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line
                x1="4.22"
                y1="4.22"
                x2="5.64"
                y2="5.64"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="18.36"
                y1="18.36"
                x2="19.78"
                y2="19.78"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line
                x1="4.22"
                y1="19.78"
                x2="5.64"
                y2="18.36"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="18.36"
                y1="5.64"
                x2="19.78"
                y2="4.22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Moon icon - rotates when light */}
          <div
            className={`absolute transition-all duration-500 ${
              isDark ? "rotate-0 scale-100 opacity-100" : "rotate-180 scale-0 opacity-0"
            }`}
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </div>
        </div>

        {/* Pulse animation on hover */}
        <div className="absolute inset-0 rounded-full animate-pulse opacity-0 group-hover:opacity-20 transition-opacity" />
      </div>
    </button>
  )
}
