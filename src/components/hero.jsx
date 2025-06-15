import React from 'react';
import { Send, MessageCircle, Mail, X } from 'lucide-react';

const Hero = () => {
  const heroStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 72px)', // Account for 72px navbar height
    marginTop: '72px', // Push content below fixed navbar
    padding: '40px 40px 60px 40px',
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

  const ctaButtonStyle = {
    backgroundColor: 'transparent',
    color: '#00ff88',
    padding: '18px 36px',
    fontSize: '18px',
    fontWeight: '700',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    border: '2px solid #00ff88',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    boxShadow: '0 0 30px rgba(0, 255, 136, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '"Orbitron", monospace',
  };

  const ctaButtonHoverStyle = {
    backgroundColor: '#00ff88',
    color: '#000000',
    transform: 'translateY(-3px)',
    boxShadow: '0 10px 40px rgba(0, 255, 136, 0.4)',
  };

  // Modal Styles
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
    animation: 'fadeIn 0.3s ease-out',
  };

  const modalStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    border: '2px solid #00ff88',
    borderRadius: '12px',
    padding: '40px',
    maxWidth: '500px',
    width: '90%',
    position: 'relative',
    boxShadow: '0 0 60px rgba(0, 255, 136, 0.3)',
    animation: 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const modalTitleStyle = {
    fontSize: 'clamp(24px, 4vw, 32px)',
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: '2px',
    marginBottom: '40px',
    textTransform: 'uppercase',
    textAlign: 'center',
    background: 'linear-gradient(45deg, #ffffff, #00ff88)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontFamily: '"Orbitron", monospace',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'transparent',
    border: '1px solid #00ff88',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#00ff88',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: '"Orbitron", monospace',
  };

  const closeButtonHoverStyle = {
    backgroundColor: '#00ff88',
    color: '#000000',
    transform: 'scale(1.1)',
  };

  const iconsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    flexWrap: 'wrap',
  };

  const iconButtonStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    background: 'transparent',
    border: '2px solid rgba(0, 255, 136, 0.3)',
    borderRadius: '12px',
    padding: '24px 20px',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    color: '#00ff88',
    textDecoration: 'none',
    minWidth: '100px',
    fontFamily: '"Orbitron", monospace',
  };

  const iconButtonHoverStyle = {
    borderColor: '#00ff88',
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(0, 255, 136, 0.2)',
  };

  const iconStyle = {
    width: '32px',
    height: '32px',
    strokeWidth: '2px',
  };

  const iconLabelStyle = {
    fontSize: '12px',
    fontWeight: '500',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontFamily: '"Orbitron", monospace',
  };

  const keyframesStyle = `
    @keyframes scrollUp {
      0% {
        transform: translateY(100%);
      }
      100% {
        transform: translateY(-100%);
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-50px) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `;

  const [ctaHovered, setCtaHovered] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [closeHovered, setCloseHovered] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalCloseHovered, setModalCloseHovered] = React.useState(false);
  const [hoveredIcon, setHoveredIcon] = React.useState(null);

  // Handle modal open/close
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle body scroll when modal is open
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => document.body.style.overflow = 'unset';
  }, [isModalOpen]);

  // Handle ESC key to close modal
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const scrollingContainerStyle = {
    width: '100%',
    maxWidth: '800px',
    height: isExpanded ? 'auto' : '200px',
    minHeight: isExpanded ? '300px' : '200px',
    border: '2px solid #333333',
    borderRadius: '8px',
    backgroundColor: isExpanded ? 'rgba(0, 255, 136, 0.08)' : 'rgba(0, 255, 136, 0.05)',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: '40px',
    boxShadow: isExpanded ? '0 0 50px rgba(0, 255, 136, 0.2)' : '0 0 30px rgba(0, 255, 136, 0.1)',
    cursor: isExpanded ? 'default' : 'pointer',
    transition: 'all 0.5s ease',
  };

  const scrollingTextStyle = {
    fontSize: '18px',
    fontWeight: '400',
    color: '#cccccc',
    letterSpacing: '1px',
    lineHeight: '1.8',
    padding: isExpanded ? '30px' : '20px',
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
        <h1 style={headlineStyle}>
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
          
          <div style={clickHintStyle}>
            Click to read
          </div>
        </div>
        
        <button 
          style={{
            ...ctaButtonStyle,
            ...(ctaHovered ? ctaButtonHoverStyle : {})
          }}
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          onClick={openModal}
        >
          Let's Build Your Empire
        </button>
      </section>

      {/* Connect Modal */}
      {isModalOpen && (
        <div 
          style={modalOverlayStyle}
          onClick={closeModal}
        >
          <div 
            style={modalStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                ...closeButtonStyle,
                ...(modalCloseHovered ? closeButtonHoverStyle : {})
              }}
              onClick={closeModal}
              onMouseEnter={() => setModalCloseHovered(true)}
              onMouseLeave={() => setModalCloseHovered(false)}
            >
              <X size={20} />
            </button>
            
            <h2 style={modalTitleStyle}>
              CONNECT WITH US IN SECONDS
            </h2>
            
            <div style={iconsContainerStyle}>
              <a
                href="https://t.me/tomisin2k"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...iconButtonStyle,
                  ...(hoveredIcon === 'telegram' ? iconButtonHoverStyle : {})
                }}
                onMouseEnter={() => setHoveredIcon('telegram')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <Send style={iconStyle} />
                <span style={iconLabelStyle}>Telegram</span>
              </a>
              
              <a
                href="https://wa.me/your-whatsapp-number"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...iconButtonStyle,
                  ...(hoveredIcon === 'whatsapp' ? iconButtonHoverStyle : {})
                }}
                onMouseEnter={() => setHoveredIcon('whatsapp')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <MessageCircle style={iconStyle} />
                <span style={iconLabelStyle}>WhatsApp</span>
              </a>
              
              <a
                href="mailto:your-email@example.com"
                style={{
                  ...iconButtonStyle,
                  ...(hoveredIcon === 'gmail' ? iconButtonHoverStyle : {})
                }}
                onMouseEnter={() => setHoveredIcon('gmail')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <Mail style={iconStyle} />
                <span style={iconLabelStyle}>Gmail</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;