import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CircleDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="35" stroke="#3B5BFF" strokeWidth="2" strokeDasharray="8 4" fill="none" />
  </svg>
);

const ZigzagDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 20L15 5L25 35L35 10L45 30L55 15"
      stroke="#111827"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const ProductOverview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const doodlesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Card animation
      gsap.fromTo(
        cardRef.current,
        { y: '10vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 1,
          },
        }
      );

      // Doodles animation
      const doodles = doodlesRef.current?.querySelectorAll('.doodle');
      if (doodles) {
        gsap.fromTo(
          doodles,
          { scale: 0.85, opacity: 0, rotation: -8 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
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
      id="products"
      className="relative w-full py-20 lg:py-28 bg-[#F6F8FC] overflow-hidden"
    >
      {/* Doodles */}
      <div ref={doodlesRef} className="absolute inset-0 pointer-events-none">
        <CircleDoodle className="doodle absolute right-[5%] top-[10%] w-[8vw] opacity-60" />
        <ZigzagDoodle className="doodle absolute left-[8%] bottom-[15%] w-[6vw] opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Product Card */}
        <div
          ref={cardRef}
          className="bg-white rounded-[34px] shadow-[0_18px_45px_rgba(17,24,39,0.1)] overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-64 lg:h-auto">
              <img
                src="/images/course1.jpg"
                alt="BioRezens Collagen Membrane"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-[#3B5BFF] text-sm font-semibold rounded-full">
                  Featured Product
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h2 className="text-3xl lg:text-4xl font-semibold text-[#111827] mb-4">
                BioRezens Collagen Membrane
              </h2>

              <p className="text-lg text-[#5A6478] leading-relaxed mb-6">
                A resorbable barrier for guided bone regeneration—predictable handling, excellent wound stability, and optimal healing outcomes.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Easy placement and adaptation',
                  'Controlled resorption rate',
                  'Strong tensile strength',
                  'Biocompatible and safe',
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#3B5BFF]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-[#3B5BFF]" />
                    </div>
                    <span className="text-[#5A6478]">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollToSection('#product-detail')}
                className="btn-primary flex items-center gap-2 w-fit"
              >
                See Specifications
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductOverview;
