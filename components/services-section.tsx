"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ServiceCards } from "./service-cards"

export function ServicesSection() {
  const servicesRef = useRef<HTMLHeadingElement>(null)
  const [isTextVisible, setIsTextVisible] = useState(false)

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      @keyframes borderLeftToRight {
        from {
          width: 0;
        }
        to {
          width: 100%;
        }
      }
      .cta-border-animate::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 2px;
        width: 0;
        background-color: white;
        animation: borderLeftToRight 0.6s ease-out forwards;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTextVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (servicesRef.current) {
      observer.observe(servicesRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="w-full bg-background py-0 md:py-20 lg:py-0 px-3 md:px-5 lg:px-8">
      <style>{`
        @keyframes slideDownText {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .text-reveal {
          opacity: 0;
          animation: slideDownText 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>

      <div className="max-w-full mx-auto">
        <div className="space-y-0 md:space-y-2 overflow-hidden -mt-2 md:mt-0" ref={servicesRef}>
          <h2 className="text-5xl lg:text-[128px] font-medium text-chart-5 mb-0 leading-none tracking-tighter">
            <span className="block text-reveal" style={{ animationDelay: isTextVisible ? "0.1s" : "0s" }}>
              Service
            </span>
            <span className="block text-reveal" style={{ animationDelay: isTextVisible ? "0.2s" : "0s" }}>
              We Provide
            </span>
          </h2>
        </div>

        <div
          className="mt-6 md:mt-12 lg:mt-10 text-reveal"
          style={{ animationDelay: isTextVisible ? "0.35s" : "0s" }}
        >
          <Link
            href="/services"
            className="group relative inline-flex w-full max-w-md items-center border-t border-black justify-between gap-4 hover:bg-black/10 px-0 py-3 text-foreground tracking-tighter font-medium text-lg transition-all duration-300 "
          >
            <span>Learn More</span>
            <svg
  className="w-6.5 h-6.5 text-foreground transition-transform duration-500 group-hover:-rotate-[30deg]"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
>
  <path
    d="M4 12H6.5M20 12L14 6M20 12L14 18M20 12H9.5"
    stroke="#1C274C"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
            <span className="cta-border-animate absolute inset-0" />
          </Link>
        </div>

        <ServiceCards />
      </div>
    </section>
  )
}
