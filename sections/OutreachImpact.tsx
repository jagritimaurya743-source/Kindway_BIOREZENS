import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Heart, Users, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SunDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="12" stroke="#3B5BFF" strokeWidth="2" fill="none" />
    {[...Array(8)].map((_, i) => (
      <line
        key={i}
        x1="30"
        y1="6"
        x2="30"
        y2="12"
        stroke="#3B5BFF"
        strokeWidth="2"
        strokeLinecap="round"
        transform={`rotate(${i * 45} 30 30)`}
      />
    ))}
  </svg>
);

const OutreachImpact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(
        imageRef.current,
        { y: '10vh', opacity: 0 },
        {
          y: 0,
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

      // Overlay animation
      gsap.fromTo(
        overlayRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Users, value: '5,000+', label: 'Patients Treated' },
    { icon: MapPin, value: '50+', label: 'Camps Conducted' },
    { icon: Heart, value: '25+', label: 'Villages Covered' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-28 bg-[#F6F8FC] overflow-hidden"
    >
      {/* Doodle */}
      <SunDoodle className="absolute right-[10%] top-[10%] w-[5vw] opacity-60" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Large Image Card */}
        <div ref={imageRef} className="relative rounded-[34px] overflow-hidden shadow-[0_18px_45px_rgba(17,24,39,0.1)]">
          <img
            src="/images/ex1.jpg"
            alt="Community outreach"
            className="w-full h-[50vh] lg:h-[60vh] object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

          {/* Content Overlay */}
          <div
            ref={overlayRef}
            className="absolute bottom-0 left-0 p-8 lg:p-12 max-w-lg"
          >
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              Community Impact
            </span>

            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              Free Camps. Real Impact.
            </h2>

            <p className="text-white/80 leading-relaxed mb-6">
              We partner with local providers to bring care to underserved communities. Our mobile dental camps have touched thousands of lives across rural India.
            </p>

            <button className="flex items-center gap-2 bg-white text-[#111827] px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors">
              Partner With Us
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm"
            >
              <div className="w-12 h-12 bg-[#3B5BFF]/10 rounded-xl flex items-center justify-center">
                <stat.icon size={24} className="text-[#3B5BFF]" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#111827]">{stat.value}</p>
                <p className="text-sm text-[#5A6478]">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Preview */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-[#111827] mb-6">Camp Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['/images/ex2.jpg', '/images/ex3.jpg', '/images/cam4.jpg', '/images/cam5.jpg'].map((img, index) => (
              <div
                key={index}
                className="aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={img}
                  alt={`Camp ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutreachImpact;
