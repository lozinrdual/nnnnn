export function HeroCTASection() {
  return (
    <div className="w-full bg-white py-5 sm:py-20 md:py-5 relative z-10">
      <style>{`
        .cta-buttoon {
          position: relative;
          background: transparent;
          color: black;
          padding: 12px 3px;
          z-index: 1;
        }

        .cta-buttoon:hover {
          color: black;
        }

        .cta-text-wrapper {
          position: relative;
          z-index: 2;
          display: inline-flex;
          gap: 0.5rem;
          align-items: center;
        }

        .cta-arrow {
          display: inline-block;
          width: 1.2em;
          height: 1.2em;
          opacity: 0;
          transform: translateX(-8px);
          transition: all 0.4s cubic-bezier(0.33, 0, 0.2, 1);
        }

        .cta-buttoon:hover .cta-arrow {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      <div className="max-w-full mx-auto px-3 md:px-5 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {/* Left Section - Text Only */}
          <div>
            <p className="text-[14px] sm:text-[16px] md:text-[18px] font-medium text-black leading-tight">
              Clarity over creativity.
              <br />
              We help brands make confident decisions.
            </p>
          </div>

          {/* Middle Spacer - Hidden on mobile */}
          <div className="hidden md:block"></div>

          {/* Right Section - Text + CTA */}
          <div className="flex flex-col justify-between gap-4 sm:gap-6 md:gap-4">
            <p className="text-[14px] sm:text-[16px] md:text-[18px] font-medium text-black leading-tight">
              Your brand has a story. We make sure it's seen,
              <br />
              felt and remembered. We design logos, build brands and create moments that turn attention into action.
            </p>
            <a href="#" className="cta-buttoon relative inline-block text-[14px] sm:text-[16px] md:text-[18px] font-medium py-3">
              <span className="cta-text-wrapper">
                Learn More
                <svg className="cta-arrow"
                  width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12H6.5M20 12L14 6M20 12L14 18M20 12H9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
