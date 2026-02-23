import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, User, ArrowRight, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const activities = [
  {
    id: 1,
    date: 'Dec 22, 2024',
    author: 'Kindway Biorezens',
    title: 'Dental Implant Training/Workshop - Only for Dentist',
    description:
      'Join our exclusive Dental Implant Training/Workshop, tailored solely for Dentists. Elevate your expertise with hands-on learning, expert guidance, and cutting-edge techniques. Gain invaluable skills to excel in implant dentistry, enhancing patient care and practice success.',
    image: '/images/b1.jpg',
    fullContent: `
      <h3>Course Overview</h3>
      <p>This comprehensive workshop covers everything from basic implantology to advanced surgical techniques. Participants will receive hands-on training with live demonstrations.</p>
      <h3>What You'll Learn</h3>
      <ul>
        <li>Implant placement fundamentals</li>
        <li>Bone grafting techniques</li>
        <li>Soft tissue management</li>
        <li>Prosthetic considerations</li>
        <li>Case planning and execution</li>
      </ul>
      <h3>Schedule</h3>
      <p>Day 1-2: Theory and Case Discussion<br/>Day 3: Hands-on Workshop<br/>Day 4-5: Live Patient Demonstrations</p>
    `,
  },
  {
    id: 2,
    date: 'Jan 16-22, 2024',
    author: 'Kindway Biorezens',
    title: 'Tissue Augmentation Training/Workshop/Course',
    description:
      'Enroll in our Tissue Augmentation Training/Workshop/Course designed for dental professionals. Explore advanced techniques, hands-on practice, and expert insights in tissue augmentation. Elevate your skills, enhance patient outcomes, and advance your career.',
    image: '/images/b3.jpg',
    fullContent: `
      <h3>Advanced Tissue Management</h3>
      <p>Master the art of soft tissue augmentation with our intensive 7-day program designed for experienced practitioners.</p>
      <h3>Curriculum Highlights</h3>
      <ul>
        <li>Connective tissue grafts</li>
        <li>Free gingival grafts</li>
        <li>Pedicle flaps</li>
        <li>Pinhole surgical technique</li>
        <li>PRF applications</li>
      </ul>
    `,
  },
  {
    id: 3,
    date: 'Dec 22, 2024',
    author: 'Kindway Biorezens',
    title: 'Outreach Programs - Camps for General Public',
    description:
      'Join us for informative sessions, screenings, and interactive activities focused on oral health education. Empower yourself with valuable knowledge and resources to maintain a healthy smile.',
    image: '/images/b5.jpg',
    fullContent: `
      <h3>Community Outreach Initiative</h3>
      <p>Our mobile dental camps bring quality dental care to underserved communities across rural India.</p>
      <h3>Services Provided</h3>
      <ul>
        <li>Free dental screenings</li>
        <li>Oral health education</li>
        <li>Basic treatments</li>
        <li>Referral services</li>
        <li>Dental hygiene kits distribution</li>
      </ul>
      <h3>Impact</h3>
      <p>Over 5,000 patients treated across 50+ camps in 25+ villages.</p>
    `,
  },
];

const RecentActivities = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedActivity, setSelectedActivity] = useState<typeof activities[0] | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.activity-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
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
    <section ref={sectionRef} className="relative w-full py-20 lg:py-28 bg-[#F6F8FC]">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#3B5BFF]/10 text-[#3B5BFF] text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
            Kindway
          </span>
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#111827]">
            Recent Activities
          </h2>
        </div>

        {/* Activity Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="activity-card bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(17,24,39,0.08)] hover:shadow-[0_20px_60px_rgba(17,24,39,0.12)] transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-[#5A6478] mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {activity.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={14} />
                    {activity.author}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[#111827] mb-3 line-clamp-2">
                  {activity.title}
                </h3>

                {/* Description */}
                <p className="text-[#5A6478] text-sm leading-relaxed mb-4 line-clamp-3">
                  {activity.description}
                </p>

                {/* Read More */}
                <button
                  onClick={() => setSelectedActivity(activity)}
                  className="flex items-center gap-2 text-[#3B5BFF] font-medium text-sm hover:gap-3 transition-all"
                >
                  Read More
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedActivity && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedActivity(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative h-64">
              <img
                src={selectedActivity.image}
                alt={selectedActivity.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedActivity(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-[#5A6478] mb-4">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {selectedActivity.date}
                </span>
                <span className="flex items-center gap-1">
                  <User size={14} />
                  {selectedActivity.author}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-semibold text-[#111827] mb-4">
                {selectedActivity.title}
              </h2>

              {/* Full Content */}
              <div
                className="prose prose-blue max-w-none text-[#5A6478] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedActivity.fullContent }}
              />

              {/* CTA */}
              <button
                onClick={() => setSelectedActivity(null)}
                className="btn-primary mt-8"
              >
                Register for This Event
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecentActivities;
