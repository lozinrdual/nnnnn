"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const services = [
  {
    number: "01",
    title: "Brand Strategy",
    description:
      "We define your brand’s purpose, positioning, and voice — so every decision is intentional and aligned.",
    icon: (
      <svg
        className="w-20 h-20 text-cta"
        fill="currentColor"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 9C8.55229 9 9 8.55229 9 8C9 7.44772 8.55229 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55229 7.44772 9 8 9Z" fill="#FF3C00"/>
<path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM6 6L4 11L5 12L10 10L12 5L11 4L6 6Z" fill="#FF3C00"/>
</svg>
    ),
  },
  {
    number: "02",
    title: "Brand Identity System",
    description:
      "We design a flexible identity system that stays consistent, scalable, and recognizable everywhere.",
    icon: (
      <svg
        className="w-26 h-26 text-cta"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.6309 3.96779 19.7415 5.96241 20.5284 8.55374H3.47164C4.2585 5.96241 6.36915 3.96779 9.02975 3.3437Z" fill="#FF3C00"/>
<path d="M3.20453 9.70249C2.89142 11.4471 2.93781 13.2399 3.3437 14.9703C3.9678 17.6309 5.96243 19.7415 8.55377 20.5284V9.70249H3.20453Z" fill="#FF3C00"/>
<path d="M9.70252 20.7955C11.4471 21.1086 13.2399 21.0622 14.9703 20.6563C17.7916 19.9945 19.9945 17.7916 20.6563 14.9703C21.0622 13.2399 21.1086 11.4471 20.7955 9.70249H9.70252V20.7955Z" fill="#FF3C00"/>
</svg>
    ),
  },
  {
    number: "03",
    title: "Visual Language & Direction",
    description:
      "We shape how your brand looks and feels — across layouts, visuals, and creative expression.",
    icon: (
      <svg
        className="w-20 h-20 text-cta"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.8994 22C20.1086 22 21.8994 20.2091 21.8994 18C21.8994 15.7909 20.1086 14 17.8994 14H17.6797L11.878 19.798C11.636 20.0399 11.5 20.3391 11.5 20.6813C11.5 21.3936 12.0774 22 12.7897 22H17.8994Z" fill="#FF3C00"/>
<path d="M13.2839 4.95882L12.2291 6.01357C11.7633 6.48107 11.5012 7.11381 11.5 7.7738L11.5 16.0119C11.5 17.0666 11.5 17.5939 11.8135 17.7199C12.1271 17.8459 12.492 17.4653 13.2219 16.704L19.0599 10.6144C20.5819 9.02691 20.5554 6.51391 19.0003 4.95883C17.4218 3.38026 14.8624 3.38026 13.2839 4.95882Z" fill="#FF3C00"/>
<path fillRule="evenodd" clipRule="evenodd" d="M10 6V18C10 20.2091 8.20914 22 6 22C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2C8.20914 2 10 3.79086 10 6ZM6 19C6.55228 19 7 18.5523 7 18C7 17.4477 6.55228 17 6 17C5.44772 17 5 17.4477 5 18C5 18.5523 5.44772 19 6 19Z" fill="#FF3C00"/>
</svg>
    ),
  },
  {
    number: "04",
    title: "Digital Brand Experience",
    description:
      "We translate your brand into digital experiences that feel intuitive, modern, and conversion-focused.",
    icon: (
      <svg
        className="w-20 h-20 text-cta"
        fill="#FF3C00"
        viewBox="-2 -4 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d='M1 14h18a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2zM2 0h16a2 2 0 0 1 2 2v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2a2 2 0 0 1 2-2z' /></svg>
    ),
  },
]

export function ServiceCards() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observerOptions = {
      threshold: [0.1, 0.5],
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = cardRefs.current.indexOf(entry.target as HTMLDivElement)
        if (index !== -1) {
          if (entry.isIntersecting) {
            // Card enters view - add to visible set
            setVisibleCards((prev) => new Set([...prev, index]))
          } else {
            // Card leaves view - remove from visible set to re-trigger animation
            setVisibleCards((prev) => {
              const newSet = new Set(prev)
              newSet.delete(index)
              return newSet
            })
          }
        }
      })
    }, observerOptions)

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      @keyframes slideUpFade {
        0% {
          opacity: 0;
          transform: translateY(50px);
        }
        50% {
          opacity: 0.7;
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes scaleInSoft {
        0% {
          opacity: 0;
          transform: scale(0.85) translateY(30px);
        }
        60% {
          opacity: 1;
          transform: scale(1.02);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      @keyframes rotateInRight {
        0% {
          opacity: 0;
          transform: translateX(60px) rotateY(20deg);
        }
        100% {
          opacity: 1;
          transform: translateX(0) rotateY(0deg);
        }
      }

      @keyframes borderLeftToRight {
        from {
          width: 0;
        }
        to {
          width: 100%;
        }
      }

      .service-card {
        opacity: 0;
        transform: translateY(50px);
      }

      .service-card.card-visible {
        animation: slideUpFade 0.8s cubic-bezier(0.23, 0.95, 0.35, 0.85) forwards;
      }

      .service-card.card-visible:nth-child(2n) {
        animation: scaleInSoft 0.8s cubic-bezier(0.34, 1.26, 0.64, 1) forwards;
      }

      .cta-link-border::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 2px;
        width: 0;
        background-color: currentColor;
        animation: borderLeftToRight 0.4s ease-out forwards;
      }

      /* Light theme hover styles */
      .service-card:hover {
        --tw-bg-opacity: 1;
      }

      .service-card:hover .service-card-inner {
        background-color: rgb(0 0 0);
      }

      .service-card:hover h3,
      .service-card:hover p {
        color: rgb(255 255 255);
      }

      .service-card:hover .icon-badge {
        background-color: rgb(255 255 255 / 0.1);
      }

      .service-card:hover .icon-badge svg {
        color: rgb(255 255 255);
      }

      .service-card:hover .cta-link {
        color: rgb(255 255 255);
      }

      .service-card:hover .cta-link svg {
        color: rgb(255 255 255);
      }

      .service-card:hover .cta-link:hover {
        background-color: rgb(255 255 255 / 0.1);
      }

      /* Dark theme hover styles */
      .dark .service-card:hover .service-card-inner {
        background-color: rgb(255 255 255);
      }

      .dark .service-card:hover h3,
      .dark .service-card:hover p {
        color: rgb(0 0 0);
      }

      .dark .service-card:hover .icon-badge {
        background-color: rgb(0 0 0 / 0.1);
      }

      .dark .service-card:hover .icon-badge svg {
        color: rgb(0 0 0);
      }

      .dark .service-card:hover .cta-link {
        color: rgb(0 0 0);
      }

      .dark .service-card:hover .cta-link svg {
        color: rgb(0 0 0);
        stroke: rgb(0 0 0);
      }

      .dark .service-card:hover .cta-link:hover {
        background-color: rgb(0 0 0 / 0.1);
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative mt-12 md:mt-16 pb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el
            }}
            className={`service-card ${visibleCards.has(index) ? "card-visible" : ""}`}
            style={{
              animationDelay: `${index * 0.12}s`,
            }}
          >
            <div className="service-card-inner h-full bg-black/1 border border-border/50 rounded-3xl p-8 md:p-9 flex flex-col hover:border-border/80 transition-all duration-300">
              {/* Service Number */}
              

              {/* Icon Badge */}
              <div className="mb-8 inline-flex w-fit">
                <div className="icon-badge w-25 h-25 rounded-full bg-cta/10 flex items-center justify-center transition-all duration-300">
                  {service.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-lg lg:text-[30px] font-regular text-forground leading-[1.2] mb-4 tracking-tighter transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base lg:text-[16px] text-foreground/50 leading-normal flex-grow transition-colors duration-300">
                {service.description}
              </p>

              {/* CTA Link with Border Animation */}
              <Link
                href="/services"
                className="cta-link group relative mt-6 inline-flex items-center gap-2 bg-transparent text-foreground px-4 py-2 transition-all duration-700 hover:bg-foreground/15"
              >
                <span className="font-medium text-sm">Learn More</span>
                <svg
                  className="w-4 h-4 text-foreground group-hover:-rotate-[30deg] transition-transform duration-300"
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
                <span className="cta-link-border absolute inset-0" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
