import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FlaskConical, Award, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const InnovationStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Text block animation
      gsap.fromTo(
        textRef.current,
        { y: '6vh', opacity: 0 },
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

      // Stat cards animation
      const cards = cardsRef.current?.querySelectorAll('.stat-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: '8vh', opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
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

  const stats = [
    {
      icon: FlaskConical,
      value: '10+',
      label: 'Years R&D',
      description: 'Continuous innovation in biomaterials',
    },
    {
      icon: Award,
      value: 'ISO',
      label: 'Certified',
      description: 'International quality standards',
    },
    {
      icon: Globe,
      value: 'Pan-India',
      label: 'Training Network',
      description: 'Across 20+ cities',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-28 bg-[#F6F8FC] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Text Block */}
        <div ref={textRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#3B5BFF]/10 text-[#3B5BFF] text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
            Our Story
          </span>

          <h2 className="text-3xl lg:text-4xl font-semibold text-[#111827] mb-6">
            Research-led. Quality-first.
          </h2>

          <p className="text-lg text-[#5A6478] leading-relaxed max-w-2xl mx-auto">
            We develop biomaterials with clinicians, for clinicians—tested across diverse patient profiles. Our commitment to excellence drives every product we create.
          </p>
        </div>

        {/* Stat Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card bg-white rounded-3xl p-8 text-center shadow-[0_10px_25px_rgba(17,24,39,0.08)] hover:shadow-[0_18px_45px_rgba(17,24,39,0.1)] transition-shadow"
            >
              <div className="w-14 h-14 bg-[#3B5BFF]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <stat.icon size={28} className="text-[#3B5BFF]" />
              </div>
              <p className="text-4xl font-semibold text-[#111827] mb-1">{stat.value}</p>
              <p className="text-lg font-medium text-[#3B5BFF] mb-2">{stat.label}</p>
              <p className="text-sm text-[#5A6478]">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h4 className="font-semibold text-[#111827] mb-3">Our Mission</h4>
            <p className="text-[#5A6478] text-sm leading-relaxed">
              To make quality dental care accessible to all through innovative biomaterials and comprehensive training programs that empower dental professionals.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h4 className="font-semibold text-[#111827] mb-3">Our Vision</h4>
            <p className="text-[#5A6478] text-sm leading-relaxed">
              To become India's leading dental biotechnology company, recognized globally for product excellence and educational impact in implant dentistry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationStory;
