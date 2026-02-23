import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Beaker, Clock, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const StarDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M30 5L35 25L55 30L35 35L30 55L25 35L5 30L25 25L30 5Z"
      stroke="#3B5BFF"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const SpiralDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M30 30C30 20 40 15 45 25C50 35 35 45 25 40C15 35 20 15 35 12C50 9 55 35 40 48C25 61 5 40 15 20"
      stroke="#111827"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const ProductDetail = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const doodlesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Left column animation
      gsap.fromTo(
        leftColRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );

      // Right column animation
      gsap.fromTo(
        rightColRef.current,
        { x: '6vw', opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );

      // Doodles animation
      const doodles = doodlesRef.current?.querySelectorAll('.doodle');
      if (doodles) {
        gsap.fromTo(
          doodles,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Beaker,
      title: 'Easy Placement',
      description: 'Adapts seamlessly to defect contours, making surgical procedures smoother and more predictable.',
    },
    {
      icon: Clock,
      title: 'Controlled Resorption',
      description: 'Matches natural healing timeline, providing optimal barrier function during bone regeneration.',
    },
    {
      icon: Shield,
      title: 'Strong Tensile Strength',
      description: 'Stays where you put it, ensuring stability throughout the healing process.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="product-detail"
      className="relative w-full py-20 lg:py-28 bg-[#F6F8FC] overflow-hidden"
    >
      {/* Doodles */}
      <div ref={doodlesRef} className="absolute inset-0 pointer-events-none">
        <StarDoodle className="doodle absolute right-[10%] top-[20%] w-[5vw] opacity-60" />
        <SpiralDoodle className="doodle absolute left-[5%] bottom-[20%] w-[6vw] opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div ref={leftColRef}>
            <span className="inline-block px-4 py-1.5 bg-[#3B5BFF]/10 text-[#3B5BFF] text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
              Product Details
            </span>

            <h2 className="text-3xl lg:text-4xl font-semibold text-[#111827] mb-6">
              Designed for Clinical Confidence
            </h2>

            <p className="text-lg text-[#5A6478] leading-relaxed mb-10">
              Our BioRezens Collagen Membrane is engineered with precision to meet the demands of modern implant dentistry. Every feature is designed to enhance your surgical outcomes.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-[#3B5BFF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon size={24} className="text-[#3B5BFF]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111827] mb-1">{feature.title}</h4>
                    <p className="text-[#5A6478] text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-primary flex items-center gap-2 mt-8">
              Request a Sample
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Right Column - Image */}
          <div ref={rightColRef} className="relative">
            <div className="relative rounded-[34px] overflow-hidden shadow-[0_18px_45px_rgba(17,24,39,0.1)]">
              <img
                src="/images/sirji.jpg"
                alt="Clinical application"
                className="w-full h-auto object-cover"
              />
              {/* Overlay Stats */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                <div className="grid grid-cols-3 gap-4 text-white">
                  <div>
                    <p className="text-2xl font-semibold">98%</p>
                    <p className="text-xs opacity-80">Success Rate</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">4-6</p>
                    <p className="text-xs opacity-80">Weeks Healing</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">ISO</p>
                    <p className="text-xs opacity-80">Certified</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-[#3B5BFF] text-white px-6 py-3 rounded-2xl shadow-lg">
              <p className="text-sm font-semibold">Made in India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
