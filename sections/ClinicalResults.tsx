import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ClinicalResults = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const results = [
    {
      image: '/images/cam1.jpg',
      caption: 'Ridge Preservation',
      description: 'Successful ridge preservation procedure using BioRezens bone graft material.',
    },
    {
      image: '/images/cam2.jpg',
      caption: 'Socket Grafting',
      description: 'Socket grafting case with excellent bone regeneration outcomes.',
    },
    {
      image: '/images/cam3.jpg',
      caption: 'Implant Placement',
      description: 'Final implant placement after successful bone regeneration.',
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: '4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.result-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: '10vh', opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
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

  return (
    <section
      ref={sectionRef}
      id="results"
      className="relative w-full py-20 lg:py-28 bg-[#F6F8FC] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#3B5BFF]/10 text-[#3B5BFF] text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              Case Studies
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#111827]">
              Clinical Outcomes
            </h2>
          </div>
          <button className="flex items-center gap-2 text-[#3B5BFF] font-medium hover:underline">
            View case library
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Results Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {results.map((result, index) => (
            <div
              key={index}
              className="result-card group relative rounded-3xl overflow-hidden shadow-[0_10px_25px_rgba(17,24,39,0.08)] cursor-pointer"
              onClick={() => setSelectedImage(result.image)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={result.image}
                  alt={result.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Caption Pill */}
              <div className="absolute bottom-4 left-4">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-[#111827] text-sm font-medium rounded-full shadow-sm">
                  {result.caption}
                </span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#3B5BFF]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-center px-6">{result.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-semibold text-[#3B5BFF]">500+</p>
              <p className="text-sm text-[#5A6478] mt-1">Successful Cases</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-[#3B5BFF]">98%</p>
              <p className="text-sm text-[#5A6478] mt-1">Success Rate</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-[#3B5BFF]">50+</p>
              <p className="text-sm text-[#5A6478] mt-1">Partner Clinics</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-[#3B5BFF]">4.9</p>
              <p className="text-sm text-[#5A6478] mt-1">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={20} className="text-white" />
          </button>
          <img
            src={selectedImage}
            alt="Clinical result"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default ClinicalResults;
