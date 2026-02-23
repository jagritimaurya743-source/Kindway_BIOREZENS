import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

// New Sections from original HTML
import HeroSlider from './sections/HeroSlider';
import HomeServices from './sections/HomeServices';
import StatsCounter from './sections/StatsCounter';
import RecentActivities from './sections/RecentActivities';
import FullTeam from './sections/FullTeam';
import GallerySection from './sections/GallerySection';
import ServicesCamp from './sections/ServicesCamp';

// Existing Sections
import ProductOverview from './sections/ProductOverview';
import ProductDetail from './sections/ProductDetail';
import TrainingPrograms from './sections/TrainingPrograms';
import MobileClinic from './sections/MobileClinic';
import InnovationStory from './sections/InnovationStory';
import Testimonials from './sections/Testimonials';
import ClinicalResults from './sections/ClinicalResults';
import OutreachImpact from './sections/OutreachImpact';
import TeamSection from './sections/TeamSection';
import ContactSection from './sections/ContactSection';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out"
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-[#F6F8FC] min-h-screen">
      <Navbar />
      <main className="relative">
        {/* New Sections from original website */}
        <HeroSlider />
        <HomeServices />
        
        {/* About/Mission Section */}
        <section id="about" className="relative w-full py-20 lg:py-28 bg-[#F6F8FC]">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 bg-[#3B5BFF]/10 text-[#3B5BFF] text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
                  Kindway BioReZens
                </span>
                <h2 className="text-3xl lg:text-4xl font-semibold text-[#111827] mb-6">
                  Mission
                </h2>
                <p className="text-lg text-[#5A6478] leading-relaxed mb-6">
                  At Kindway Biorezenes Medical Manufacturing, we envision a future where healthcare products and technologies are not only cutting-edge but also inherently sustainable. Our commitment is to lead the medical manufacturing industry in developing and producing innovative, biorenewable solutions that contribute to a healthier planet.
                </p>
                <h2 className="text-3xl lg:text-4xl font-semibold text-[#111827] mb-6">
                  Vision
                </h2>
                <p className="text-lg text-[#5A6478] leading-relaxed">
                  At Kindway Biorezens, our vision is to be at the forefront of transformative biorenewable technologies that not only redefine industries but also contribute to a kinder and more sustainable world. We aspire to lead in creating innovative solutions that seamlessly integrate with nature, fostering a harmonious balance between human progress and environmental well-being.
                </p>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="/images/sirji.jpg"
                  alt="Kindway Mission"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="relative w-full py-20 lg:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="/images/b3.jpg"
                  alt="Why Choose Kindway"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="order-1 lg:order-2">
                <span className="inline-block px-4 py-1.5 bg-[#3B5BFF]/10 text-[#3B5BFF] text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
                  Why Choose
                </span>
                <h2 className="text-3xl lg:text-4xl font-semibold text-[#111827] mb-6">
                  Kindway Biorezens
                </h2>
                <p className="text-lg text-[#5A6478] leading-relaxed mb-6">
                  At Kindway Biorezens, we are driven by a mission to reshape the future of dentistry through innovation, accessibility, and compassionate care. As a pioneering startup in dental manufacturing and healthcare services, we design and produce advanced, reliable, and affordable dental implants, biomaterials, and devices that meet global standards of safety and performance.
                </p>
                <button
                  onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary flex items-center gap-2"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* What Sets Us Apart - Pioneering Products */}
        <section className="relative w-full py-20 lg:py-28 bg-[#F6F8FC]">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="/images/bg2.jpg"
                  alt="Pioneering Products"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div>
                <span className="inline-block px-4 py-1.5 bg-[#3B5BFF]/10 text-[#3B5BFF] text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
                  What Sets us Apart
                </span>
                <h2 className="text-3xl lg:text-4xl font-semibold text-[#111827] mb-6">
                  Pioneering Products
                </h2>
                <p className="text-lg text-[#5A6478] leading-relaxed mb-6">
                  At Kindway Biorezens, innovation is at the heart of everything we create. Our product development approach blends cutting-edge technology, scientific precision, and deep clinical insight to deliver solutions that elevate the standard of dental care.
                </p>
                <p className="text-[#5A6478] leading-relaxed mb-6">
                  We engineer and manufacture high-performance dental implants, biomaterials, and advanced chairside solutions designed to offer superior functionality, reliability, and patient comfort — all at attainable prices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Sets Us Apart - Expertise */}
        <section className="relative w-full py-20 lg:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 bg-[#3B5BFF]/10 text-[#3B5BFF] text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
                  What Sets us Apart
                </span>
                <h2 className="text-3xl lg:text-4xl font-semibold text-[#111827] mb-6">
                  Expertise
                </h2>
                <p className="text-lg text-[#5A6478] leading-relaxed mb-6">
                  Powered by a team of highly skilled and experienced dental professionals and material scientists, Kindway Biorezens brings unparalleled expertise to every solution we deliver. With deep clinical insight and hands-on industry knowledge, we understand the evolving challenges faced by modern dental practitioners.
                </p>
                <p className="text-[#5A6478] leading-relaxed">
                  Our experts are committed to guiding, supporting, and empowering clinicians with evidence-based solutions, continuous learning, and reliable technical assistance.
                </p>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="/images/ex1.jpg"
                  alt="Expertise"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Counter */}
        <StatsCounter />

        {/* Existing Product Sections */}
        <ProductOverview />
        <ProductDetail />

        {/* Services/Camp Section */}
        <ServicesCamp />

        {/* Gallery Section */}
        <GallerySection />

        {/* Training Programs */}
        <TrainingPrograms />

        {/* Mobile Clinic */}
        <MobileClinic />

        {/* Innovation Story */}
        <InnovationStory />

        {/* Testimonials */}
        <Testimonials />

        {/* Clinical Results */}
        <ClinicalResults />

        {/* Outreach Impact */}
        <OutreachImpact />

        {/* Full Team Section */}
        <FullTeam />

        {/* Recent Activities */}
        <RecentActivities />

        {/* Team Section (Original) */}
        <TeamSection />

        {/* Contact Section */}
        <ContactSection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;
