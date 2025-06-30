import React from 'react';
import Button from './Button.jsx';

const Hero = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [closeHovered, setCloseHovered] = React.useState(false);

  const heroStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 72px)',
    marginTop: '72px',
    padding: '20px', // Reduced padding for mobile
    textAlign: 'center',
    backgroundColor: '#000000',
  };

  const headlineStyle = {
    fontSize: 'clamp(32px, 5vw, 64px)',
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: '3px',
    lineHeight: '1.2',
    marginBottom: '40px',
    textTransform: 'uppercase',
    background: 'linear-gradient(45deg, #ffffff, #00ff88)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontFamily: '"Orbitron", monospace',
  };

  const keyframesStyle = `
    @keyframes scrollUp {
      0% { transform: translateY(100%); }
      100% { transform: translateY(-100%); }
    }

    @media (max-width: 768px) {
      .hero-headline {
        font-size: clamp(24px, 8vw, 32px) !important;
        margin-bottom: 20px !important;
      }
    }
  `;

  const scrollingContainerStyle = {
    width: '100%',
    maxWidth: '800px',
    height: isExpanded ? 'auto' : '150px',
    minHeight: isExpanded ? '250px' : '150px',
    border: '2px solid #333333',
    borderRadius: '8px',
    backgroundColor: isExpanded ? 'rgba(0, 255, 136, 0.08)' : 'rgba(0, 255, 136, 0.05)',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: '20px',
    boxShadow: isExpanded ? '0 0 50px rgba(0, 255, 136, 0.2)' : '0 0 30px rgba(0, 255, 136, 0.1)',
    cursor: isExpanded ? 'default' : 'pointer',
    transition: 'all 0.5s ease',
  };

  const scrollingTextStyle = {
    fontSize: '16px', // Reduced for mobile
    fontWeight: '400',
    color: '#cccccc',
    letterSpacing: '1px',
    lineHeight: '1.6', // Adjusted line height
    padding: isExpanded ? '20px' : '15px', // Reduced padding
    textAlign: 'center',
    animation: isExpanded ? 'none' : 'scrollUp 15s linear infinite',
    whiteSpace: 'pre-line',
    transform: isExpanded ? 'translateY(0)' : undefined,
    transition: 'all 0.5s ease',
    fontFamily: '"Orbitron", monospace',
  };

  const closeButtonScrollStyle = {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'rgba(0, 255, 136, 0.2)',
    border: '1px solid #00ff88',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#00ff88',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    opacity: isExpanded ? 1 : 0,
    visibility: isExpanded ? 'visible' : 'hidden',
    fontFamily: '"Orbitron", monospace',
  };

  const closeButtonScrollHoverStyle = {
    backgroundColor: '#00ff88',
    color: '#000000',
    transform: 'scale(1.1)',
  };

  const clickHintStyle = {
    position: 'absolute',
    bottom: '10px',
    right: '15px',
    fontSize: '12px',
    color: '#666',
    fontWeight: '300',
    opacity: isExpanded ? 0 : 0.7,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
    fontFamily: '"Orbitron", monospace',
  };

  return (
    <>
      <style>{keyframesStyle}</style>
      <section style={heroStyle}>
        <h1 style={headlineStyle} className="hero-headline">
          HELLO BADASS, I AM TOMISIN2k,<br />
          YOUR DIGITAL BUSINESS PARTNER
        </h1>

        <div
          style={scrollingContainerStyle}
          onClick={() => !isExpanded && setIsExpanded(true)}
        >
          <div style={scrollingTextStyle}>
            I don't just write code—I architect digital solutions that transform your business vision into profitable reality.

            While others build websites, I build business ecosystems.

            Through strategic partnerships and cutting-edge development, I help ambitious entrepreneurs and companies scale their digital presence, optimize their operations, and unlock revenue streams they never knew existed.

            Your success isn't just my goal—it's my commitment.

            Ready to transform your digital vision into reality?
          </div>

          <button
            style={{
              ...closeButtonScrollStyle,
              ...(closeHovered ? closeButtonScrollHoverStyle : {})
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
            }}
            onMouseEnter={() => setCloseHovered(true)}
            onMouseLeave={() => setCloseHovered(false)}
          >
            ×
          </button>

          <div style={clickHintStyle}>Click to read</div>
        </div>

        <Button />
      </section>
    </>
  );
};

export default Hero;
