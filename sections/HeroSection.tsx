import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// SVG Doodle Components
const ScribbleDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 30C20 10 40 50 60 20C70 5 85 40 95 25"
      stroke="#111827"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const SmileyDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="35" stroke="#111827" strokeWidth="2.5" fill="none" />
    <circle cx="28" cy="32" r="4" fill="#111827" />
    <circle cx="52" cy="32" r="4" fill="#111827" />
    <path
      d="M25 48C30 58 50 58 55 48"
      stroke="#111827"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const StarburstDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M30 5L35 20L50 15L40 28L55 35L38 38L42 55L30 43L18 55L22 38L5 35L20 28L10 15L25 20L30 5Z"
      stroke="#111827"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const UnderlineDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 15C30 5 60 18 115 8"
      stroke="#3B5BFF"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const doodlesRef = useRef<HTMLDivElement>(null);

  // Load animation (on mount)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Card entrance
      tl.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.8 }
      );

      // Image slide in
      tl.fromTo(
        imageRef.current,
        { x: '-8%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.7 },
        '-=0.5'
      );

      // Content stagger
      const contentElements = contentRef.current?.querySelectorAll('.animate-item');
      if (contentElements) {
        tl.fromTo(
          contentElements,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.12 },
          '-=0.4'
        );
      }

      // Doodles pop in
      const doodles = doodlesRef.current?.querySelectorAll('.doodle');
      if (doodles) {
        tl.fromTo(
          doodles,
          { scale: 0.85, opacity: 0, rotation: -8 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.5, stagger: 0.1 },
          '-=0.3'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          pinSpacing: true,
        },
      });

      // Phase 1 (0-30%): Hold settle state - NO animations here
      // Phase 2 (30-70%): Hold settle state

      // Phase 3 (70-100%): Exit animation
      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        contentRef.current,
        { x: 0, opacity: 1 },
        { x: '6vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      const doodles = doodlesRef.current?.querySelectorAll('.doodle');
      if (doodles) {
        scrollTl.fromTo(
          doodles,
          { y: 0, opacity: 1 },
          { y: '-6vh', opacity: 0, ease: 'power2.in' },
          0.75
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#F6F8FC] flex items-center justify-center overflow-hidden z-10"
    >
      {/* Hero Card */}
      <div
        ref={cardRef}
        className="relative w-[88vw] h-[80vh] bg-white rounded-[34px] shadow-[0_18px_45px_rgba(17,24,39,0.1)] overflow-hidden"
      >
        {/* Image Section */}
        <div
          ref={imageRef}
          className="absolute left-0 top-0 w-[62%] h-full"
        >
          <img
            src="/images/b1.jpg"
            alt="Dental training workshop"
            className="w-full h-full object-cover rounded-l-[34px]"
          />
          {/* Doodles Overlay */}
          <div ref={doodlesRef} className="absolute inset-0 pointer-events-none">
            <ScribbleDoodle className="doodle absolute left-[15%] top-[18%] w-[10vw] opacity-80" />
            <StarburstDoodle className="doodle absolute left-[55%] top-[12%] w-[7vw] opacity-80" />
            <SmileyDoodle className="doodle absolute left-[40%] top-[55%] w-[9vw] opacity-80" />
            <UnderlineDoodle className="doodle absolute left-[25%] top-[70%] w-[12vw] opacity-80" />
          </div>
        </div>

        {/* Content Section */}
        <div
          ref={contentRef}
          className="absolute right-0 top-0 w-[38%] h-full flex flex-col justify-center px-[3.5vw] py-[6vh]"
        >
          <div className="animate-item">
            <span className="inline-block px-4 py-1.5 bg-[#3B5BFF]/10 text-[#3B5BFF] text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
              Welcome to Kindway
            </span>
          </div>

          <h1 className="animate-item text-4xl lg:text-5xl xl:text-6xl font-semibold text-[#111827] leading-[1.05] mb-6">
            Smile-forward{' '}
            <span className="relative inline-block">
              biomaterials
              <UnderlineDoodle className="absolute -bottom-2 left-0 w-full h-4" />
            </span>
          </h1>

          <p className="animate-item text-lg text-[#5A6478] leading-relaxed mb-8">
            Reliable grafts and membranes designed for everyday implant success. Transform your dental practice with our cutting-edge solutions.
          </p>

          <div className="animate-item flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('#products')}
              className="btn-primary flex items-center justify-center gap-2 w-fit"
            >
              Explore Products
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => scrollToSection('#training')}
              className="flex items-center gap-2 text-[#5A6478] hover:text-[#3B5BFF] transition-colors w-fit"
            >
              <Calendar size={18} />
              <span className="font-medium">View training calendar</span>
            </button>
          </div>

          {/* Stats */}
          <div className="animate-item grid grid-cols-2 gap-6 mt-10 pt-8 border-t border-gray-100">
            <div>
              <p className="text-3xl font-semibold text-[#111827]">1000+</p>
              <p className="text-sm text-[#5A6478]">Dentists Trained</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-[#111827]">10+</p>
              <p className="text-sm text-[#5A6478]">Years of R&D</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
