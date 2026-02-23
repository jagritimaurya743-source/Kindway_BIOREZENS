import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FlowerDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="8" fill="#3B5BFF" />
    <circle cx="30" cy="12" r="8" stroke="#3B5BFF" strokeWidth="2" fill="none" />
    <circle cx="48" cy="30" r="8" stroke="#3B5BFF" strokeWidth="2" fill="none" />
    <circle cx="30" cy="48" r="8" stroke="#3B5BFF" strokeWidth="2" fill="none" />
    <circle cx="12" cy="30" r="8" stroke="#3B5BFF" strokeWidth="2" fill="none" />
  </svg>
);

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "The training changed how I plan cases. The membrane handles beautifully—my team trusts it for every implant procedure.",
      name: "Dr. Rajesh Bansal",
      title: "Professor, IMS-BHU",
      image: "/images/sirji.jpg",
      rating: 5,
    },
    {
      quote: "Kindway's mobile clinic helped us reach over 200 patients in rural areas. Their team's dedication to community care is truly inspiring.",
      name: "Dr. Robin Singh",
      title: "Dental Surgeon",
      image: "/images/robin.jpg",
      rating: 5,
    },
    {
      quote: "The 1-week workshop was transformative. Hands-on training with real patients gave me the confidence to perform implants independently.",
      name: "Dr. Sourav Kumar",
      title: "Prosthodontist",
      image: "/images/sourav.jpg",
      rating: 5,
    },
  ];

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

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#E8EDF5] overflow-hidden z-30"
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
              src="/images/b3.jpg"
              alt="Workshop training"
              className="w-full h-full object-cover rounded-l-[34px]"
            />
            <FlowerDoodle className="absolute right-[10%] top-[15%] w-[5vw] opacity-70" />
          </div>

          {/* Content Section */}
          <div
            ref={contentRef}
            className="p-8 lg:p-12 flex flex-col justify-center"
          >
            <span className="inline-block px-4 py-1.5 bg-[#3B5BFF]/10 text-[#3B5BFF] text-xs font-semibold uppercase tracking-wider rounded-full mb-6 w-fit">
              Testimonials
            </span>

            {/* Quote Icon */}
            <Quote size={40} className="text-[#3B5BFF]/20 mb-4" />

            {/* Quote Text */}
            <blockquote className="text-xl lg:text-2xl text-[#111827] leading-relaxed mb-8 transition-all duration-500">
              "{current.quote}"
            </blockquote>

            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 mb-8">
              <img
                src={current.image}
                alt={current.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-[#111827]">{current.name}</p>
                <p className="text-sm text-[#5A6478]">{current.title}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 bg-[#F6F8FC] rounded-full flex items-center justify-center hover:bg-[#E8EDF5] transition-colors"
              >
                <ChevronLeft size={18} className="text-[#111827]" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 bg-[#F6F8FC] rounded-full flex items-center justify-center hover:bg-[#E8EDF5] transition-colors"
              >
                <ChevronRight size={18} className="text-[#111827]" />
              </button>
              <span className="text-sm text-[#5A6478] ml-2">
                {currentIndex + 1} / {testimonials.length}
              </span>
            </div>

            {/* CTA */}
            <button className="flex items-center gap-2 text-[#3B5BFF] font-medium mt-8 hover:underline">
              Read more stories
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
