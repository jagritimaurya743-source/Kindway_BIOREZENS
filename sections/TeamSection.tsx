import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DiamondDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M30 5L55 30L30 55L5 30L30 5Z"
      stroke="#3B5BFF"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const TeamSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      // Phase 1 (0-30%): Entrance
      scrollTl.fromTo(
        curveRef.current,
        { y: '-12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        cardRef.current,
        { y: '18vh', opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        contentRef.current,
        { x: '8vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Phase 3 (70-100%): Exit
      scrollTl.fromTo(
        cardRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        curveRef.current,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const team = [
    {
      name: 'Dr. Rajesh Bansal',
      role: 'Chief Scientific Officer',
      image: '/images/sirji.jpg',
      bio: 'Professor at IMS-BHU with 20+ years in prosthodontics.',
    },
    {
      name: 'Dr. Robin Singh',
      role: 'Head of Training',
      image: '/images/robin.jpg',
      bio: 'Leading our hands-on workshop programs across India.',
    },
    {
      name: 'Dr. Sourav Kumar',
      role: 'Clinical Director',
      image: '/images/sourav.jpg',
      bio: 'Expert in implantology and bone regeneration.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#E8EDF5] overflow-hidden z-40"
    >
      {/* Curve Divider */}
      <div ref={curveRef} className="absolute top-0 left-0 w-full h-20 overflow-hidden">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80V40C240 80 480 0 720 0C960 0 1200 80 1440 40V80H0Z"
            fill="#E8EDF5"
          />
        </svg>
      </div>

      {/* Main Card */}
      <div
        ref={cardRef}
        className="absolute left-[6vw] top-[16vh] w-[88vw] h-[68vh] bg-white rounded-[34px] shadow-[0_18px_45px_rgba(17,24,39,0.1)] overflow-hidden"
      >
        <div className="grid lg:grid-cols-2 h-full">
          {/* Image Section */}
          <div className="relative h-full hidden lg:block">
            <img
              src="/images/team0.jpg"
              alt="Team collaboration"
              className="w-full h-full object-cover rounded-l-[34px]"
            />
            <DiamondDoodle className="absolute right-[10%] top-[15%] w-[4vw] opacity-70" />
          </div>

          {/* Content Section */}
          <div
            ref={contentRef}
            className="p-8 lg:p-12 flex flex-col justify-center overflow-y-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-[#3B5BFF]/10 text-[#3B5BFF] text-xs font-semibold uppercase tracking-wider rounded-full mb-6 w-fit">
              Our Team
            </span>

            <h2 className="text-3xl lg:text-4xl font-semibold text-[#111827] mb-4">
              Led by Clinicians. Driven by Science.
            </h2>

            <p className="text-[#5A6478] leading-relaxed mb-8">
              Our team combines surgical experience with materials research to build products that truly perform. Meet the experts behind Kindway BIOREZENS.
            </p>

            {/* Team Members */}
            <div className="space-y-4 mb-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-[#F6F8FC] rounded-2xl"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-[#111827]">{member.name}</p>
                    <p className="text-sm text-[#3B5BFF]">{member.role}</p>
                    <p className="text-xs text-[#5A6478]">{member.bio}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-[#E8EDF5] transition-colors">
                      <Linkedin size={14} className="text-[#5A6478]" />
                    </button>
                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-[#E8EDF5] transition-colors">
                      <Mail size={14} className="text-[#5A6478]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-2 text-[#3B5BFF] font-medium hover:underline">
              Meet the full team
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
