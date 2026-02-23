import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Shield, Globe, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Users,
    title: 'Training and Education',
    description: 'We offer training, workshops, and educational resources to empower dental professionals with the latest techniques and best practices.',
    link: '#training',
    color: 'bg-blue-500',
  },
  {
    icon: Shield,
    title: 'Dental Camp',
    description: 'We understand the challenges you face, and we are here to offer solutions and support to the dental problems.',
    link: '#mobile-clinic',
    color: 'bg-green-500',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'We proudly serve dental practitioners around the world, ensuring that our products and services are accessible to all.',
    link: '#contact',
    color: 'bg-purple-500',
  },
];

const HomeServices = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
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
    <section ref={sectionRef} className="relative w-full py-16 bg-[#F6F8FC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-8 -mt-32 relative z-10"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(17,24,39,0.1)] hover:shadow-[0_20px_60px_rgba(17,24,39,0.15)] transition-all duration-300 hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6`}
              >
                <service.icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#111827] mb-4">
                {service.title}
              </h3>
              <p className="text-[#5A6478] leading-relaxed mb-6">
                {service.description}
              </p>
              <button
                onClick={() => scrollToSection(service.link)}
                className="flex items-center gap-2 text-[#3B5BFF] font-medium hover:gap-3 transition-all"
              >
                Learn More
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeServices;
