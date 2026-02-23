import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Dr. Rajesh Bansal',
    role: 'Founder Director (MDS, PhD)',
    image: '/images/t1.jpg',
    social: { facebook: '#', twitter: '#', linkedin: '#' },
  },
  {
    name: 'Prof. D. D. N. Singh',
    role: 'M.Sc, PhD',
    image: '/images/t6.jpg',
    social: { facebook: '#', twitter: '#', linkedin: '#' },
  },
  {
    name: 'Prof. Vakil Singh',
    role: 'M.Sc, PhD',
    image: '/images/t7.jpg',
    social: { facebook: '#', twitter: '#', linkedin: '#' },
  },
  {
    name: 'Prof. Monika Bansal',
    role: 'MDS, PhD (Periodontist)',
    image: '/images/t8.jpg',
    social: { facebook: '#', twitter: '#', linkedin: '#' },
  },
  {
    name: 'Mr. Dinesh Kumar',
    role: 'Founder and Charter Accountant',
    image: '/images/t2.jpg',
    social: { facebook: '#', twitter: '#', linkedin: '#' },
  },
  {
    name: 'Mr. P. Vishwakarma',
    role: 'CNC Operator',
    image: '/images/t3.jpg',
    social: { facebook: '#', twitter: '#', linkedin: '#' },
  },
  {
    name: 'Mr. Anshu Pandey',
    role: 'Assistant and CNC Operator',
    image: '/images/t4.jpg',
    social: { facebook: '#', twitter: '#', linkedin: '#' },
  },
  {
    name: 'Dr. Robin Kr. Chaube',
    role: 'Dental Officer',
    image: '/images/robin.jpg',
    social: { facebook: '#', twitter: '#', linkedin: '#' },
  },
  {
    name: 'Dr. Sourav Kr. Vishwakarma',
    role: 'Graft R&D Officer',
    image: '/images/sourav.jpg',
    social: { facebook: '#', twitter: '#', linkedin: '#' },
  },
];

const FullTeam = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.team-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="team" className="relative w-full py-20 lg:py-28 bg-[#F6F8FC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#3B5BFF]/10 text-[#3B5BFF] text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
            Our Team
          </span>
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#111827] mb-4">
            Executive Team & Advisors
          </h2>
          <p className="text-lg text-[#5A6478] max-w-2xl mx-auto">
            Meet the dedicated professionals behind Kindway BIOREZENS who are committed to advancing dental care through innovation and excellence.
          </p>
        </div>

        {/* Team Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay with Social Icons */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex gap-2">
                    <a
                      href={member.social.facebook}
                      className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                    >
                      <Facebook size={14} className="text-white" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                    >
                      <Twitter size={14} className="text-white" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                    >
                      <Linkedin size={14} className="text-white" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 text-center">
                <h3 className="font-semibold text-[#111827] text-sm mb-1">
                  {member.name}
                </h3>
                <p className="text-xs text-[#5A6478]">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#3B5BFF] to-[#2a48e0] rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Want to Join Our Team?
            </h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              We're always looking for talented individuals who are passionate about advancing dental healthcare.
            </p>
            <button className="px-8 py-4 bg-white text-[#3B5BFF] rounded-xl font-semibold hover:bg-white/90 transition-colors">
              View Careers
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullTeam;
