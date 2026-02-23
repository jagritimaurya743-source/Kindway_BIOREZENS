import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Elevating Dental Excellence',
    description: 'At Kindway Biorezens, we are dedicated to the advancement of dental healthcare. We take pride in our mission to empower dental professionals with innovative solutions, cutting-edge products, and unwavering support.',
    image: '/images/b1.jpg',
  },
  {
    id: 2,
    title: 'Why Choose Kindway',
    description: "We're not just a company but committed to advancing dental care through innovation, quality, and precision.",
    image: '/images/b2.jpg',
  },
  {
    id: 3,
    title: 'Pioneering Products',
    description: 'We offer a curated selection of dental products and medical devices that are at the forefront of dental technology.',
    image: '/images/b3.jpg',
  },
  {
    id: 4,
    title: 'Training and Education',
    description: 'At Kindway Biorezens, we believe in continuous learning. We offer training, workshops, and educational resources to empower dental professionals with the latest techniques and best practices.',
    image: '/images/bg.jpg',
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#F6F8FC]">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => scrollToSection('#products')}
                    className="px-8 py-4 bg-white text-[#111827] rounded-xl font-semibold hover:bg-white/90 transition-colors"
                  >
                    Discover Now
                  </button>
                  <button
                    onClick={() => scrollToSection('#about')}
                    className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
      >
        <ChevronLeft size={24} className="text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
      >
        <ChevronRight size={24} className="text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
