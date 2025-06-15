import React, { useEffect, useRef, useState } from 'react';

const WorkSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% visible
        rootMargin: '-50px 0px', // Start animation slightly before fully visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  const sectionStyle = {
    padding: '60px 24px 80px 24px', // Reduced top padding for mobile
    backgroundColor: '#000000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const headlineStyle = {
    fontSize: 'clamp(28px, 4.5vw, 56px)',
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: '2px',
    lineHeight: '1.3',
    textAlign: 'center',
    textTransform: 'uppercase',
    background: 'linear-gradient(45deg, #ffffff, #00ff88)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontFamily: '"Orbitron", monospace',
    maxWidth: '1000px',
    position: 'relative',
  };

  const keyframesStyle = `
    @keyframes subtleGlow {
      0%, 100% { 
        text-shadow: 0 0 20px rgba(0, 255, 136, 0.1);
      }
      50% { 
        text-shadow: 0 0 30px rgba(0, 255, 136, 0.2), 0 0 40px rgba(0, 255, 136, 0.1);
      }
    }

    .work-headline {
      animation: ${isVisible ? 'subtleGlow 4s ease-in-out infinite' : 'none'};
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @media (min-width: 768px) {
      .work-section {
        padding: 80px 40px !important;
      }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <section ref={sectionRef} className="work-section" style={sectionStyle}>
        <h2 className="work-headline" style={headlineStyle}>
          DIGITAL CONCEPTS & CREATIONS —<br />
          SHOWCASING THE CRAFT BEHIND THE CODE
        </h2>
      </section>
    </>
  );
};

export default WorkSection;