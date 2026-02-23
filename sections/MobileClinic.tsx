import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Stethoscope, Scissors, MessageSquare, Users, Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const HeartDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M30 55C30 55 5 40 5 22.5C5 14 12 8 20 8C25 8 30 12 30 12C30 12 35 8 40 8C48 8 55 14 55 22.5C55 40 30 55 30 55Z"
      stroke="#3B5BFF"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const WaveDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 20C15 5 25 35 40 20C55 5 65 35 75 20"
      stroke="#111827"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const MobileClinic = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(
        imageRef.current,
        { y: '8vh', opacity: 0 },
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

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { x: '6vw', opacity: 0 },
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

      // Pills stagger animation
      const pills = pillsRef.current?.querySelectorAll('.pill-item');
      if (pills) {
        gsap.fromTo(
          pills,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
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

  const services = [
    { icon: Stethoscope, label: 'Screenings' },
    { icon: Scissors, label: 'Extractions' },
    { icon: MessageSquare, label: 'Implant Counseling' },
    { icon: Users, label: 'Oral Health Camps' },
  ];

  return (
    <section
      ref={sectionRef}
      id="mobile-clinic"
      className="relative w-full py-20 lg:py-28 bg-[#F6F8FC] overflow-hidden"
    >
      {/* Doodles */}
      <HeartDoodle className="absolute right-[8%] top-[15%] w-[6vw] opacity-60" />
      <WaveDoodle className="absolute left-[5%] bottom-[20%] w-[8vw] opacity-60" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-[34px] overflow-hidden shadow-[0_18px_45px_rgba(17,24,39,0.1)]">
              <img
                src="/images/mission.jpg"
                alt="Mobile dental clinic"
                className="w-full h-auto object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-lg p-6 max-w-[200px]">
              <p className="text-3xl font-semibold text-[#3B5BFF]">50+</p>
              <p className="text-sm text-[#5A6478]">Camps Conducted</p>
              <div className="mt-3 flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-[#E8EDF5] border-2 border-white flex items-center justify-center"
                  >
                    <Users size={12} className="text-[#5A6478]" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <span className="inline-block px-4 py-1.5 bg-[#3B5BFF]/10 text-[#3B5BFF] text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
              Community Care
            </span>

            <h2 className="text-3xl lg:text-4xl font-semibold text-[#111827] mb-6">
              Mobile Dental Clinic
            </h2>

            <p className="text-lg text-[#5A6478] leading-relaxed mb-8">
              Screenings, extractions, and implant counseling—delivered where patients need it most. Our mobile unit brings quality dental care to underserved communities.
            </p>

            {/* Service Pills */}
            <div ref={pillsRef} className="flex flex-wrap gap-3 mb-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="pill-item flex items-center gap-2 px-4 py-2.5 bg-white rounded-full shadow-sm"
                >
                  <service.icon size={16} className="text-[#3B5BFF]" />
                  <span className="text-sm font-medium text-[#111827]">{service.label}</span>
                </div>
              ))}
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {[
                'Fully equipped mobile unit',
                'Experienced dental professionals',
                'Free screenings for communities',
                'Flexible scheduling options',
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-[#5A6478]">
                  <div className="w-5 h-5 bg-[#3B5BFF]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-[#3B5BFF]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setIsDialogOpen(true)}
              className="btn-primary flex items-center gap-2"
            >
              Book the Mobile Unit
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Book Mobile Dental Clinic</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">Organization Name</label>
              <input type="text" placeholder="Your Organization" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">Contact Person</label>
              <input type="text" placeholder="Full Name" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">Phone</label>
              <input type="tel" placeholder="+91 98765 43210" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">Preferred Date</label>
              <input type="date" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">Location</label>
              <input type="text" placeholder="City, State" className="w-full" />
            </div>
            <button
              onClick={() => {
                setIsDialogOpen(false);
                alert('Booking request submitted! Our team will contact you within 24 hours.');
              }}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Calendar size={18} />
              Submit Booking Request
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MobileClinic;
