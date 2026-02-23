import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ZoomIn } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const productImages = [
  '/images/cam1.jpg',
  '/images/cam2.jpg',
  '/images/cam3.jpg',
  '/images/cam4.jpg',
  '/images/cam5.jpg',
  '/images/cam6.jpg',
  '/images/cam7.jpg',
  '/images/cam8.jpg',
];

const photoImages = [
  '/images/b1.jpg',
  '/images/b2.jpg',
  '/images/b3.jpg',
  '/images/b4.jpg',
  '/images/b5.jpg',
  '/images/bg.jpg',
  '/images/bg1.jpg',
  '/images/bg2.jpg',
];

const eventImages = [
  '/images/ex1.jpg',
  '/images/ex2.jpg',
  '/images/ex3.jpg',
  '/images/mission.jpg',
  '/images/camp1.jpg',
  '/images/team0.jpg',
  '/images/sirji.jpg',
  '/images/robin.jpg',
];

const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'product' | 'photo' | 'event'>('product');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getImages = () => {
    switch (activeTab) {
      case 'product':
        return productImages;
      case 'photo':
        return photoImages;
      case 'event':
        return eventImages;
      default:
        return productImages;
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.gallery-item');
      if (items) {
        gsap.fromTo(
          items,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
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
  }, [activeTab]);

  return (
    <section ref={sectionRef} id="gallery" className="relative w-full py-20 lg:py-28 bg-[#F6F8FC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#3B5BFF]/10 text-[#3B5BFF] text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
            Our Gallery
          </span>
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#111827] mb-4">
            Step into a World of Healthy Smiles
          </h2>
          <p className="text-lg text-[#5A6478] max-w-2xl mx-auto">
            Explore our gallery showcasing dental artistry, training workshops, and community outreach programs.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {[
            { id: 'product', label: 'Product Gallery' },
            { id: 'photo', label: 'Photo Gallery' },
            { id: 'event', label: 'Event Gallery' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#3B5BFF] text-white'
                  : 'bg-white text-[#5A6478] hover:bg-[#E8EDF5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {getImages().map((image, index) => (
            <div
              key={`${activeTab}-${index}`}
              className="gallery-item group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <ZoomIn size={24} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} className="text-white" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
