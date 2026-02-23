import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CircleDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="35" stroke="#3B5BFF" strokeWidth="2" strokeDasharray="6 4" fill="none" />
  </svg>
);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    clinic: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Form animation
      gsap.fromTo(
        formRef.current,
        { y: '10vh', opacity: 0 },
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

      // Info animation
      gsap.fromTo(
        infoRef.current,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', clinic: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@kindwaybio.com',
      href: 'mailto:hello@kindwaybio.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 91511 61267',
      href: 'tel:+919151161267',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Varanasi, Uttar Pradesh, India',
      href: '#',
    },
    {
      icon: Clock,
      label: 'Working Hours',
      value: 'Mon - Sat: 9AM - 6PM',
      href: '#',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-20 lg:py-28 bg-[#F6F8FC] overflow-hidden"
    >
      {/* Doodle */}
      <CircleDoodle className="absolute right-[5%] top-[10%] w-[8vw] opacity-50" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#3B5BFF]/10 text-[#3B5BFF] text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
            Get in Touch
          </span>
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#111827] mb-4">
            Ready to Upgrade Your Implant Workflow?
          </h2>
          <p className="text-lg text-[#5A6478] max-w-2xl mx-auto">
            Ask for samples, schedule training, or book the mobile clinic. We're here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div ref={formRef} className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 shadow-[0_18px_45px_rgba(17,24,39,0.08)]">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#111827] mb-2">Message Sent!</h3>
                  <p className="text-[#5A6478]">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. John Doe"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="doctor@clinic.com"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Clinic/Hospital Name
                    </label>
                    <input
                      type="text"
                      value={formData.clinic}
                      onChange={(e) => setFormData({ ...formData, clinic: e.target.value })}
                      placeholder="Your Dental Clinic"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      rows={4}
                      required
                      className="w-full resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2">
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-[#3B5BFF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon size={22} className="text-[#3B5BFF]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#5A6478]">{info.label}</p>
                    <p className="font-medium text-[#111827]">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="mt-6 rounded-2xl overflow-hidden shadow-sm h-48 bg-[#E8EDF5] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115408.23982810197!2d82.9210684!3d25.3176452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db76febcf7d%3A0x6811a7e0a42b5c2e!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kindway Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
