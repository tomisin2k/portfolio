import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize, Play, Pause, Volume2, Headphones } from 'lucide-react';
import Button from './Button';

import testimonial1 from '../assets/testimonial1.jpg';
import testimonial2 from '../assets/testimonial2.jpg';
import testimonial3 from '../assets/testimonial3.jpg';
import testimonial4 from '../assets/testimonial4.jpg';

const Testimonial = () => {
  const testimonials = [
    { id: 1, image: testimonial1 },
    { id: 2, image: testimonial2 },
    { id: 3, image: testimonial3 },
    { id: 4, image: testimonial4 }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [isHoveringAudio, setIsHoveringAudio] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setAudioProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setAudioDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setAudioProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextTestimonial();
    }

    if (touchStart - touchEnd < -50) {
      prevTestimonial();
    }
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    const newTime = (newProgress / 100) * audio.duration;
    
    audio.currentTime = newTime;
    setAudioProgress(newProgress);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getVisibleTestimonials = () => {
    if (isMobile) {
      return [testimonials[currentIndex]];
    }
    
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  const handleCTAClick = () => {
    console.log('CTA clicked - ready to work together!');
  };

  const sectionStyle = {
    padding: '60px 20px',
    backgroundColor: '#000000',
    position: 'relative',
    overflow: 'hidden',
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    position: 'relative',
  };

  const titleStyle = {
    fontSize: 'clamp(24px, 8vw, 56px)',
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: '2px',
    lineHeight: '1.2',
    marginBottom: '20px',
    textTransform: 'uppercase',
    textAlign: 'center',
    background: 'linear-gradient(45deg, #ffffff, #00ff88)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontFamily: '"Orbitron", monospace',
  };

  const subtitleStyle = {
    fontSize: 'clamp(14px, 2vw, 18px)',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: '40px',
    letterSpacing: '1px',
    fontFamily: '"Orbitron", monospace',
    maxWidth: '600px',
    margin: '0 auto 40px auto',
    lineHeight: '1.6',
  };

  const voiceTestimonialContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '40px',
    position: 'relative',
  };

  const voiceCardStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    border: `2px solid ${isPlaying ? '#00ff88' : 'rgba(0, 255, 136, 0.3)'}`,
    borderRadius: '16px',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    maxWidth: '500px',
    width: 'calc(100% - 40px)',
    margin: '0 20px',
    transform: isHoveringAudio ? 'translateY(-8px)' : 'translateY(0)',
    boxShadow: isPlaying 
      ? '0 20px 40px rgba(0, 255, 136, 0.25), 0 0 50px rgba(0, 255, 136, 0.15)'
      : isHoveringAudio 
        ? '0 15px 30px rgba(0, 255, 136, 0.15), 0 0 30px rgba(0, 255, 136, 0.1)'
        : '0 8px 16px rgba(0, 0, 0, 0.3)',
    background: isPlaying 
      ? 'linear-gradient(135deg, rgba(0, 255, 136, 0.05), rgba(0, 0, 0, 0.9))'
      : 'rgba(0, 0, 0, 0.8)',
  };

  const voiceCardHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    gap: '12px',
  };

  const voiceLabelStyle = {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '700',
    fontFamily: '"Orbitron", monospace',
    letterSpacing: '1.5px',
    textAlign: 'center',
    textTransform: 'uppercase',
  };

  const clientNameStyle = {
    color: '#00ff88',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: '"Orbitron", monospace',
    letterSpacing: '1px',
    textAlign: 'center',
    marginBottom: '20px',
    opacity: 0.8,
  };

  const audioControlsStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  };

  const playButtonStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: isPlaying ? '#00ff88' : 'rgba(0, 255, 136, 0.9)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: isPlaying 
      ? '0 0 30px rgba(0, 255, 136, 0.6), inset 0 0 20px rgba(0, 0, 0, 0.2)' 
      : '0 0 15px rgba(0, 255, 136, 0.4), inset 0 0 10px rgba(0, 0, 0, 0.1)',
    transform: isPlaying ? 'scale(1.05)' : 'scale(1)',
    position: 'relative',
  };

  const progressContainerStyle = {
    width: '250px',
    height: '6px',
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    borderRadius: '3px',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  };

  const progressBarStyle = {
    height: '100%',
    backgroundColor: '#00ff88',
    borderRadius: '3px',
    width: `${audioProgress}%`,
    transition: 'width 0.1s ease',
    boxShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
    position: 'relative',
  };

  const timeDisplayStyle = {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '12px',
    fontFamily: '"Orbitron", monospace',
    letterSpacing: '0.5px',
  };

  const ctaSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '60px',
    textAlign: 'center',
    gap: '20px',
  };

  const ctaTitleStyle = {
    fontSize: 'clamp(20px, 6vw, 42px)',
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: '1.5px',
    lineHeight: '1.3',
    background: 'linear-gradient(45deg, #ffffff, #00ff88)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontFamily: '"Orbitron", monospace',
    textTransform: 'uppercase',
    marginBottom: '10px',
  };

  const ctaSubtitleStyle = {
    fontSize: 'clamp(16px, 2.5vw, 20px)',
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: '0.5px',
    fontFamily: '"Orbitron", monospace',
    maxWidth: '600px',
    lineHeight: '1.5',
  };

  const backgroundElementsStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    opacity: isPlaying ? 0.6 : 0.3,
    transition: 'opacity 0.5s ease',
  };

  const floatingIconStyle = (delay, size = 16, position) => ({
    position: 'absolute',
    color: 'rgba(0, 255, 136, 0.3)',
    animation: `floatSlow 8s ease-in-out infinite ${delay}s`,
    fontSize: `${size}px`,
    ...position,
  });

  const cardsContainerStyle = {
    display: isMobile ? 'flex' : 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: '30px',
    overflowX: isMobile ? 'auto' : 'visible',
    scrollSnapType: isMobile ? 'x mandatory' : 'none',
    padding: isMobile ? '0 20px 20px' : '0',
    scrollBehavior: 'smooth',
    WebkitOverflowScrolling: 'touch',
  };

  const cardStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    border: '2px solid rgba(0, 255, 136, 0.2)',
    borderRadius: '16px',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    minWidth: isMobile ? 'calc(100% - 40px)' : 'auto',
    scrollSnapAlign: isMobile ? 'center' : 'none',
    flexShrink: 0,
    marginRight: isMobile ? '30px' : '0',
  };

  const cardHoverStyle = {
    borderColor: '#00ff88',
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 255, 136, 0.2), 0 0 50px rgba(0, 255, 136, 0.1)',
    backgroundColor: 'rgba(0, 255, 136, 0.05)',
  };

  const imageContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '300px',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '20px',
    border: '2px solid rgba(0, 255, 136, 0.3)',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    backgroundColor: '#000',
  };

  const expandButtonStyle = {
    position: 'absolute',
    bottom: '15px',
    right: '15px',
    backgroundColor: 'rgba(0, 255, 136, 0.9)',
    color: '#000000',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: 'none',
    zIndex: 10,
  };

  const expandButtonHoverStyle = {
    backgroundColor: '#ffffff',
    transform: 'scale(1.1)',
    boxShadow: '0 0 20px rgba(0, 255, 136, 0.8)',
  };

  const navButtonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 255, 136, 0.9)',
    color: '#000000',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: 'none',
    zIndex: 20,
  };

  const navButtonHoverStyle = {
    backgroundColor: '#ffffff',
    transform: 'translateY(-50%) scale(1.1)',
    boxShadow: '0 0 20px rgba(0, 255, 136, 0.8)',
  };

  const prevButtonStyle = {
    ...navButtonStyle,
    left: '10px',
  };

  const nextButtonStyle = {
    ...navButtonStyle,
    right: '10px',
  };

  const dotsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginTop: '30px',
  };

  const dotStyle = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 255, 136, 0.3)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const activeDotStyle = {
    backgroundColor: '#00ff88',
    transform: 'scale(1.2)',
    boxShadow: '0 0 10px rgba(0, 255, 136, 0.8)',
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
    animation: 'fadeIn 0.3s ease-out',
  };

  const modalContentStyle = {
    position: 'relative',
    maxWidth: '90%',
    maxHeight: '90%',
  };

  const modalImageStyle = {
    maxWidth: '100%',
    maxHeight: '90vh',
    objectFit: 'contain',
    border: '2px solid #00ff88',
    borderRadius: '10px',
    boxShadow: '0 0 50px rgba(0, 255, 136, 0.3)',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '-50px',
    right: '0',
    backgroundColor: 'rgba(0, 255, 136, 0.9)',
    color: '#000000',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: 'none',
  };

  const closeButtonHoverStyle = {
    backgroundColor: '#ffffff',
    transform: 'scale(1.1)',
    boxShadow: '0 0 20px rgba(0, 255, 136, 0.8)',
  };

  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      25% { transform: translateY(-8px) rotate(5deg); }
      50% { transform: translateY(-15px) rotate(0deg); }
      75% { transform: translateY(-8px) rotate(-5deg); }
    }
    
    @keyframes floatSlow {
      0%, 100% { 
        transform: translateY(0) rotate(0deg);
        opacity: 0.3;
      }
      25% { 
        transform: translateY(-5px) rotate(2deg);
        opacity: 0.5;
      }
      50% { 
        transform: translateY(-8px) rotate(0deg);
        opacity: 0.7;
      }
      75% { 
        transform: translateY(-5px) rotate(-2deg);
        opacity: 0.5;
      }
    }
    
    .testimonial-card {
      animation: float 6s ease-in-out infinite;
    }
    
    .testimonial-card:nth-child(1) { animation-delay: 0s; }
    .testimonial-card:nth-child(2) { animation-delay: 0.5s; }
    .testimonial-card:nth-child(3) { animation-delay: 1s; }
    
    @media (max-width: 768px) {
      .testimonial-card {
        animation: none;
      }
      
      .testimonial-title {
        font-size: clamp(24px, 8vw, 32px) !important;
      }
      
      .testimonial-subtitle {
        padding: 0 20px !important;
        margin-bottom: 40px !important;
      }
      
      .progress-container {
        width: 200px !important;
      }
      
      .play-button {
        width: 50px !important;
        height: 50px !important;
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <section style={sectionStyle} id="testimonials">
        <div style={containerStyle}>
          <h2 style={titleStyle} className="testimonial-title">
            CLIENT TESTIMONIALS
          </h2>
          <p style={subtitleStyle} className="testimonial-subtitle">
            Don't just take my word for it. Here's what my clients have to say about working with me.
          </p>

          <div style={voiceTestimonialContainerStyle}>
            <div 
              style={voiceCardStyle}
              onClick={toggleAudio}
              onMouseEnter={() => setIsHoveringAudio(true)}
              onMouseLeave={() => setIsHoveringAudio(false)}
            >
              <div style={backgroundElementsStyle}>
                <Volume2 style={floatingIconStyle(0, 14, {top: '15%', left: '10%'})} />
                <Headphones style={floatingIconStyle(2, 16, {top: '20%', right: '12%'})} />
                <Volume2 style={floatingIconStyle(4, 12, {bottom: '25%', left: '15%'})} />
                <Headphones style={floatingIconStyle(1, 10, {bottom: '15%', right: '20%'})} />
              </div>

              <div style={voiceCardHeaderStyle}>
                <Volume2 size={20} color="#00ff88" />
                <div style={voiceLabelStyle}>Voice Testimonial</div>
                <Volume2 size={20} color="#00ff88" />
              </div>
              
              <div style={clientNameStyle}>ABDULLAH - CLIENT</div>
              
              <div style={audioControlsStyle}>
                <button style={playButtonStyle} className="play-button">
                  {isPlaying ? <Pause size={24} color="#000" /> : <Play size={24} color="#000" />}
                </button>

                <div style={progressContainerStyle} className="progress-container" onClick={handleProgressClick}>
                  <div style={progressBarStyle}></div>
                </div>

                <div style={timeDisplayStyle}>
                  {formatTime(audioRef.current?.currentTime || 0)} / {formatTime(audioDuration)}
                </div>
              </div>
            </div>
          </div>

          <audio
            ref={audioRef}
            preload="metadata"
          >
            <source src="/src/assets/abdulah-voice.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          <div 
            style={cardsContainerStyle}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {getVisibleTestimonials().map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="testimonial-card"
                style={{
                  ...cardStyle,
                  ...cardHoverStyle
                }}
              >
                <div style={imageContainerStyle}>
                  <img
                    src={testimonial.image}
                    alt={`Testimonial ${testimonial.id}`}
                    style={imageStyle}
                  />
                  <button
                    style={{
                      ...expandButtonStyle,
                      ...expandButtonHoverStyle
                    }}
                    onClick={() => setExpandedImage(testimonial.image)}
                  >
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {!isMobile && (
            <>
              <button
                style={{
                  ...prevButtonStyle,
                  ...navButtonHoverStyle
                }}
                onClick={prevTestimonial}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                style={{
                  ...nextButtonStyle,
                  ...navButtonHoverStyle
                }}
                onClick={nextTestimonial}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <div style={dotsContainerStyle}>
            {testimonials.map((_, index) => (
              <div
                key={index}
                style={{
                  ...dotStyle,
                  ...(index === currentIndex ? activeDotStyle : {})
                }}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          <div style={ctaSectionStyle}>
            <h3 style={ctaTitleStyle}>
              Ready to Create Something Amazing?
            </h3>
            <p style={ctaSubtitleStyle}>
              Join these satisfied clients and let's bring your vision to life. 
              Get started with a free consultation today.
            </p>
            <Button onClick={handleCTAClick}>
              Let's Work Together
            </Button>
          </div>
        </div>

        {expandedImage && (
          <div 
            style={modalOverlayStyle}
            onClick={() => setExpandedImage(null)}
          >
            <div 
              style={modalContentStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={expandedImage}
                alt="Expanded testimonial"
                style={modalImageStyle}
              />
              <button
                style={{
                  ...closeButtonStyle,
                  ...closeButtonHoverStyle
                }}
                onClick={() => setExpandedImage(null)}
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Testimonial;