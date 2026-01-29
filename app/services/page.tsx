import type { Metadata } from "next"
import { ServicesDetailGrid } from "@/components/services-detail-grid"
import { WorkHeader } from "@/components/work-header"

export const metadata: Metadata = {
  title: "Services | Lozinr",
  description: "Explore our design services including logo design, brand identity, and packaging design.",
  openGraph: {
    title: "Services | Lozinr",
    description: "Explore our design services including logo design, brand identity, and packaging design.",
    url: "https://lozinr.com/services",
    type: "website",
  },
  alternates: {
    canonical: "https://lozinr.com/services",
  },
}

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <WorkHeader
        title="Services"
          showFilters={false}
      />
      <div className="relative z-10 bg-background">
        <ServicesDetailGrid />
      </div>
    </main>
  )
}
