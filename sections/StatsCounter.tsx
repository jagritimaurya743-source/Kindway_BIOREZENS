import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: 1500,
    suffix: '+',
    label: 'Workshops/Trainings',
    description: 'Workshop and Training Organized',
  },
  {
    value: 1160,
    suffix: '+',
    label: 'Students',
    description: 'Students enrolled in Workshop/Training/Courses',
  },
  {
    value: 1145,
    suffix: '+',
    label: 'Medical Camps',
    description: 'Medical camps organized',
  },
];

const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
};

const StatItem = ({ stat, isVisible }: { stat: typeof stats[0]; isVisible: boolean }) => {
  const count = useCountUp(stat.value, 2500, isVisible);

  return (
    <div className="text-center">
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-5xl md:text-6xl font-bold text-white">{count}</span>
        <span className="text-3xl md:text-4xl font-bold text-white/80">{stat.suffix}</span>
      </div>
      <h3 className="text-xl font-semibold text-white mt-4">{stat.label}</h3>
      <p className="text-white/70 mt-2">{stat.description}</p>
    </div>
  );
};

const StatsCounter = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => setIsVisible(true),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 bg-gradient-to-r from-[#3B5BFF] to-[#2a48e0]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
