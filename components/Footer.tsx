import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { name: 'Dental Implants', href: '#products' },
      { name: 'Bone Grafts', href: '#products' },
      { name: 'Collagen Membranes', href: '#products' },
      { name: 'Surgical Kits', href: '#products' },
    ],
    training: [
      { name: '3-Day Training', href: '#training' },
      { name: '1-Week Workshop', href: '#training' },
      { name: '1-Month Advanced', href: '#training' },
      { name: 'Download Syllabus', href: '#training' },
    ],
    support: [
      { name: 'Contact Us', href: '#contact' },
      { name: 'FAQs', href: '#faq' },
      { name: 'Mobile Clinic', href: '#mobile-clinic' },
      { name: 'Partner With Us', href: '#contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Refund Policy', href: '#' },
    ],
  };

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#F6F8FC] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#3B5BFF] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-semibold text-[#111827]">Kindway</span>
            </div>
            <p className="text-[#5A6478] mb-6 max-w-sm">
              Smile-forward biomaterials for modern dentistry. Reliable grafts and membranes designed for everyday implant success.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:hello@kindwaybio.com"
                className="flex items-center gap-3 text-[#5A6478] hover:text-[#3B5BFF] transition-colors"
              >
                <Mail size={18} />
                <span>hello@kindwaybio.com</span>
              </a>
              <a
                href="tel:+919151161267"
                className="flex items-center gap-3 text-[#5A6478] hover:text-[#3B5BFF] transition-colors"
              >
                <Phone size={18} />
                <span>+91 91511 61267</span>
              </a>
              <div className="flex items-center gap-3 text-[#5A6478]">
                <MapPin size={18} />
                <span>Varanasi, Uttar Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-[#111827] mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-[#5A6478] hover:text-[#3B5BFF] transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Training */}
          <div>
            <h4 className="font-semibold text-[#111827] mb-4">Training</h4>
            <ul className="space-y-3">
              {footerLinks.training.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-[#5A6478] hover:text-[#3B5BFF] transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-[#111827] mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-[#5A6478] hover:text-[#3B5BFF] transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-[#111827] mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-[#5A6478] hover:text-[#3B5BFF] transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#5A6478] text-sm">
              © {currentYear} Kindway BIOREZENS. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow text-[#5A6478] hover:text-[#3B5BFF]"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow text-[#5A6478] hover:text-[#3B5BFF]"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow text-[#5A6478] hover:text-[#3B5BFF]"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow text-[#5A6478] hover:text-[#3B5BFF]"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
