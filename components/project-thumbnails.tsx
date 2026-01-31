"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface Project {
  id: string
  title: string
  category: string
  industry: string
  image: string
  slug: string
  tags?: string[]
  year?: string
  services?: string
  bgColor?: string
  textColor?: string
}

const projects: Project[] = [
  {
    id: "1",
    title: "Lozinr",
    category: "Design Agency",
    industry: "DESIGN",
    image: "https://j918kna7hvf0qlsi.public.blob.vercel-storage.com/Frame%202.jpg",
    slug: "lozinr",
    tags: ["Agency", "Branding", "Creative"],
    year: "2025",
    services: "Brand Identity",
    bgColor: "bg-[#FF3C00]",
    textColor: "text-white",
  },
  {
    id: "1",
    title: "Lozinr",
    category: "Design Agency",
    industry: "DESIGN",
    image: "https://j918kna7hvf0qlsi.public.blob.vercel-storage.com/Frame%202.jpg",
    slug: "lozinr",
    tags: ["Agency", "Branding", "Creative"],
    year: "2025",
    services: "Brand Identity",
    bgColor: "bg-[#FF3C00]",
    textColor: "text-white",
  },
  
]

export function ProjectThumbnails() {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const projectId = entry.target.getAttribute("data-project-id")
          if (projectId) {
            setVisibleCards((prev) => new Set([...prev, projectId]))
          }
        }
      })
    }, observerOptions)

    Object.values(cardRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-background text-secondary">
      <style>{`
        @keyframes slideUpBounce {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          50% {
            opacity: 1;
          }
          65% {
            transform: translateY(-3px);
          }
          75% {
            transform: translateY(1px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .arrow-icon {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 9999px;
          background: white;
          color: black;
          margin-top: -8px;
          transform: rotate(-30deg);
        }

        @media (min-width: 768px) {
          .arrow-icon {
            width: 3.5rem;
            height: 3.5rem;
          }
        }

        .arrow-svg {
          width: 1.75rem;
          height: 1.75rem;
          transition: transform 0.5s cubic-bezier(0.33, 0, 0.2, 1);
        }

        @media (min-width: 768px) {
          .arrow-svg {
            width: 2.5rem;
            height: 2.5rem;
          }
        }

        .project-card {
          opacity: 1;
          transform: translateY(0px);
          will-change: transform, opacity;
        }

        .project-card:hover .arrow-svg {
          transform: rotate(30deg);
        }
      `}</style>

      {/* Unified Layout - Single column with sticky overlay effect for all devices */}
      {projects.map((project, index) => {
        const isVisible = visibleCards.has(project.id)
        return (
          <div 
            key={project.id}
            className="sticky top-0 bg-transparent pb-50 min-h-screen flex flex-col w-screen"
            style={{ zIndex: index }}
            ref={(el) => { if (el) cardRefs.current[project.id] = el }} 
            data-project-id={project.id}
          >
            <Link href={`/gallery/${project.slug}`} className="w-full flex-1 flex flex-col">
              <div 
                className={`project-card cursor-pointer w-full flex flex-col h-full ${isVisible ? "in-view" : ""}`} 
                style={{ 
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Image Container - 9:16 ratio on mobile, full screen on desktop */}
                <div className="relative w-full h-[590px] overflow-hidden bg-gray-200">
                  <Image
                    src={project.image || "/placeholder.jpg"}
                    alt={project.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>

                {/* Title Section */}
                <div className={`${project.bgColor} ${project.textColor} p-2 sm:p-8 md:p-3 px-3 md:px-5 lg:px-8 w-full`}>
                  {/* Top Row: Year, Category, Services */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-15 sm:mb-23 text-[12px] md:text-[14px] lg:text-[16px] font-medium tracking-tight uppercase">
                    <div className="text-left">{project.year}</div>
                    <div className="hidden md:block text-center">{project.category}</div>
                    <div className="text-right col-span-1">{project.services}</div>
                  </div>

                  {/* Bottom Row: Title and Arrow */}
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[40px] sm:text-[60px] lg:text-[96px] font-medium leading-tight tracking-tighter uppercase">
                      {project.title}
                    </h3>
                    <div className="arrow-icon flex-shrink-0">
                      <svg className="arrow-svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12H6.5M20 12L14 6M20 12L14 18M20 12H9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )
      })}
    </section>
  )
}
