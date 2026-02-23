import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Download, Calendar, Clock, Users } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const ScribbleDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 30C20 10 40 50 60 20C70 5 85 40 95 25"
      stroke="#111827"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const SmileyDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="25" stroke="#3B5BFF" strokeWidth="2" fill="none" />
    <circle cx="22" cy="24" r="3" fill="#3B5BFF" />
    <circle cx="38" cy="24" r="3" fill="#3B5BFF" />
    <path
      d="M18 36C22 44 38 44 42 36"
      stroke="#3B5BFF"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const TrainingPrograms = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const doodlesRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('');

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

      const doodles = doodlesRef.current?.querySelectorAll('.doodle');
      if (doodles) {
        scrollTl.fromTo(
          doodles,
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.02, ease: 'none' },
          0.1
        );
      }

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

  const courses = [
    {
      name: '3-Day Training',
      price: '₹1,000',
      features: ['Lecture sessions', 'Live demonstration on patient', 'Study materials', 'Certificate'],
      icon: Clock,
    },
    {
      name: '1-Week Training',
      price: '₹15,000',
      features: ['1 Demonstration', '1 Hands-on Patient', 'Complete kit provided', 'Certificate'],
      icon: Calendar,
      popular: true,
    },
    {
      name: '1-Month Advanced',
      price: '₹50,000',
      features: ['4 Demonstrations', '4 Hands-on Patients', '1 Overdenture Case', 'Advanced certification'],
      icon: Users,
    },
  ];

  const handleRegister = (courseName: string) => {
    setSelectedCourse(courseName);
    setIsDialogOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      id="training"
      className="relative w-full h-screen bg-[#E8EDF5] overflow-hidden z-20"
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
              src="/images/bg.jpg"
              alt="Training workshop"
              className="w-full h-full object-cover rounded-l-[34px]"
            />
            {/* Doodles */}
            <div ref={doodlesRef} className="absolute inset-0 pointer-events-none">
              <ScribbleDoodle className="doodle absolute left-[10%] top-[15%] w-[8vw] opacity-70" />
              <SmileyDoodle className="doodle absolute right-[15%] bottom-[20%] w-[6vw] opacity-70" />
            </div>
            {/* Overlay Badge */}
            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl">
              <p className="text-2xl font-semibold text-[#111827]">WDI-2024</p>
              <p className="text-sm text-[#5A6478]">Workshop on Implantology</p>
            </div>
          </div>

          {/* Content Section */}
          <div
            ref={contentRef}
            className="p-8 lg:p-12 flex flex-col justify-center overflow-y-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-[#3B5BFF]/10 text-[#3B5BFF] text-xs font-semibold uppercase tracking-wider rounded-full mb-4 w-fit">
              Training Programs
            </span>

            <h2 className="text-3xl lg:text-4xl font-semibold text-[#111827] mb-4">
              Hands-on Implant Training
            </h2>

            <p className="text-[#5A6478] leading-relaxed mb-6">
              From diagnosis to restoration—courses built for real-world practice. Learn from experts with hands-on patient demonstrations.
            </p>

            {/* Course Cards */}
            <div className="space-y-3 mb-6">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    course.popular
                      ? 'border-[#3B5BFF] bg-[#3B5BFF]/5'
                      : 'border-gray-100 hover:border-[#3B5BFF]/30'
                  }`}
                  onClick={() => handleRegister(course.name)}
                >
                  {course.popular && (
                    <span className="absolute -top-2 right-4 px-3 py-1 bg-[#3B5BFF] text-white text-xs font-semibold rounded-full">
                      Most Popular
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#3B5BFF]/10 rounded-xl flex items-center justify-center">
                        <course.icon size={18} className="text-[#3B5BFF]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#111827]">{course.name}</p>
                        <p className="text-xs text-[#5A6478]">{course.features[0]}</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-[#3B5BFF]">{course.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleRegister('General Inquiry')}
                className="btn-primary flex items-center gap-2"
              >
                View Upcoming Workshops
                <ArrowRight size={18} />
              </button>
              <button className="flex items-center gap-2 px-5 py-3 bg-[#F6F8FC] text-[#5A6478] rounded-xl hover:bg-[#E8EDF5] transition-colors">
                <Download size={18} />
                Download Syllabus
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Register for {selectedCourse}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">Full Name</label>
              <input type="text" placeholder="Dr. John Doe" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">Email</label>
              <input type="email" placeholder="doctor@clinic.com" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">Phone</label>
              <input type="tel" placeholder="+91 98765 43210" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">Clinic Name</label>
              <input type="text" placeholder="Your Dental Clinic" className="w-full" />
            </div>
            <button
              onClick={() => {
                setIsDialogOpen(false);
                alert('Registration submitted! We will contact you soon.');
              }}
              className="btn-primary w-full"
            >
              Complete Registration
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TrainingPrograms;
