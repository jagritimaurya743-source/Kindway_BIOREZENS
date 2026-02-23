import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Heart, Users, Stethoscope, Truck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ServicesCamp = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const images = galleryRef.current?.querySelectorAll('.camp-image');
      if (images) {
        gsap.fromTo(
          images,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: galleryRef.current,
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
    <section ref={sectionRef} id="services" className="relative w-full py-20 lg:py-28 bg-[#F6F8FC]">
      {/* Outreach Dental Camp Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <span className="inline-block px-4 py-1.5 bg-[#3B5BFF]/10 text-[#3B5BFF] text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
              Kindway Biorezen
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#111827] mb-6">
              Outreach Dental Camp
            </h2>
            <p className="text-lg text-[#5A6478] leading-relaxed mb-8">
              These are outreach services provided to the poor, weak, marginalized and those residing in remote areas. We have fully equipped mobile dental clinic for this purpose.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Truck, label: 'Mobile Clinic' },
                { icon: Stethoscope, label: 'Free Checkups' },
                { icon: Heart, label: 'Quality Care' },
                { icon: Users, label: 'Community Focus' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm"
                >
                  <div className="w-10 h-10 bg-[#3B5BFF]/10 rounded-lg flex items-center justify-center">
                    <feature.icon size={20} className="text-[#3B5BFF]" />
                  </div>
                  <span className="font-medium text-[#111827]">{feature.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-primary flex items-center gap-2"
            >
              Read More
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src="/images/bg3.jpg"
                alt="Outreach Dental Camp"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-6 max-w-[200px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Heart size={20} className="text-green-600" />
                </div>
                <span className="text-2xl font-bold text-[#111827]">5,000+</span>
              </div>
              <p className="text-sm text-[#5A6478]">Patients Treated</p>
            </div>
          </div>
        </div>
      </div>

      {/* Free Dental Camp Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20">
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/images/camp1.jpg"
                alt="Free Dental Camp"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <span className="inline-block px-4 py-1.5 bg-[#3B5BFF]/10 text-[#3B5BFF] text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
                Kindway BioRezens
              </span>
              <h2 className="text-2xl lg:text-3xl font-semibold text-[#111827] mb-6">
                Free Dental Camp Organized by Kindway Biorezens
              </h2>
              <p className="text-[#5A6478] leading-relaxed mb-6">
                Team of Doctors: Prof. Rajesh Bansal, Prof. Monika Bansal, Dr. Robin Chaube, Dr. Smriti Singh, Dr. Omkar, Dr. Ritesh, Dr. Saurabh, Anshu Pandey, Pushpraj Vishwakarma, Himanshu
              </p>
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-primary flex items-center gap-2"
              >
                Contact Us
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Workshop Gallery */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-semibold text-[#111827] mb-2">
            Workshop Gallery
          </h3>
          <p className="text-[#5A6478]">Glimpses from our training sessions and workshops</p>
        </div>

        <div ref={galleryRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            '/images/cam1.jpg',
            '/images/cam2.jpg',
            '/images/cam3.jpg',
            '/images/cam4.jpg',
            '/images/cam5.jpg',
            '/images/cam6.jpg',
            '/images/cam7.jpg',
            '/images/cam8.jpg',
          ].map((image, index) => (
            <div
              key={index}
              className="camp-image aspect-square rounded-2xl overflow-hidden"
            >
              <img
                src={image}
                alt={`Workshop ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCamp;
