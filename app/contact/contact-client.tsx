"use client"

import { WorkHeader } from "@/components/work-header"
import { ContactForm } from "@/components/contact-form"
import { FaqSection } from "@/components/faq-section"

export default function ContactClient() {
  return (
    <main className="relative min-h-screen bg-background transition-colors duration-300">
      <WorkHeader
        title="Contact Us"
        showFilters={false}
      />
      <div className="relative z-10 bg-background">
        <ContactForm />
        <FaqSection />
      </div>
    </main>
  )
}
