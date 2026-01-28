"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

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

const allProjects: Project[] = [
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
    id: "2",
    title: "Luvena",
    category: "Logo & Branding",
    industry: "FOOD & BEVERAGE",
    image: "https://bq45eawil9xlp5ci.public.blob.vercel-storage.com/Luvena01.jpg",
    slug: "luvena",
    tags: ["Pizza", "Food", "Packaging"],
    year: "2025",
    services: "Logo Design",
    bgColor: "bg-[#e72224]",
    textColor: "text-white",
  },
  {
    id: "3",
    title: "Rijq",
    category: "Food & Bakery",
    industry: "BAKERY",
    image: "https://q4bkxvdmgiqmmhbe.public.blob.vercel-storage.com/Frame%201.jpg",
    slug: "rijq",
    tags: ["Food", "Bakery", "Branding"],
    year: "2025",
    services: "Packaging Design",
    bgColor: "bg-[#550541]",
    textColor: "text-white",
  },
  {
    id: "4",
    title: "Cnyf",
    category: "Crypto",
    industry: "CRYPTO",
    image: "https://guxjkdyjeyrscewv.public.blob.vercel-storage.com/Frame%208.jpg",
    slug: "cnyf",
    tags: ["Crypto", "Wallet", "Money"],
    year: "2025",
    services: "UI/UX Design",
    bgColor: "bg-[#4100ce]",
    textColor: "text-white",
  },
]

interface WorkThumbnailsProps {
  filteredProjects: Project[]
}

export function WorkThumbnails({ filteredProjects }: WorkThumbnailsProps) {
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
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-5 lg:px-8">
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
          transform: rotate(-30deg)
        }

        .arrow-svg {
          width: 1.5rem;
          height: 1.5rem;
          transition: transform 0.5s cubic-bezier(0.33, 0, 0.2, 1);
        }

        .project-card {
          opacity: 0;
          transform: translateY(40px);
          will-change: transform, opacity;
        }

        .project-card.in-view {
          animation: slideUpBounce 0.9s cubic-bezier(0.23, 0.95, 0.35, 0.85) forwards;
          opacity: 1;
          transform: translateY(0);
        }

        .project-card:hover .arrow-svg {
          transform: rotate(30deg);
        }
      `}</style>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 max-w-full mx-auto overflow-hidden">
        {filteredProjects.map((project, index) => {
          const isVisible = visibleCards.has(project.id)
          return (
            <Link key={project.id} href={`/gallery/${project.slug}`} ref={(el) => { if (el) cardRefs.current[project.id] = el }} data-project-id={project.id}>
              <div className={`project-card cursor-pointer ${isVisible ? "in-view" : ""}`} style={{ animationDelay: `${index * 0.1}s` }}>
                {/* Image Container */}
                <div className="w-full aspect-video overflow-hidden bg-gray-200">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title Section */}
                <div className={`${project.bgColor} ${project.textColor} p-2 sm:p-8 md:p-3`}>
                  {/* Top Row: Year, Category, Services */}
                  <div className="grid grid-cols-3 gap-4 mb-15 sm:mb-23 text-[12px] sm:text-[14px] md:text-[14px] font-medium tracking-tight">
                    <div className="text-left">{project.year}</div>
                    <div className="text-center">{project.category}</div>
                    <div className="text-right">{project.services}</div>
                  </div>

                  {/* Bottom Row: Title and Arrow */}
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[40px] sm:text-[60px] lg:text-[80px] font-medium leading-tight tracking-tighter uppercase">
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
          )
        })}
      </div>
    </section>
  )
}

export { allProjects }
