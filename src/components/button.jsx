import React from 'react';
import { Send, MessageCircle, Mail, X } from 'lucide-react';

const Button = () => {
  const [ctaHovered, setCtaHovered] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalCloseHovered, setModalCloseHovered] = React.useState(false);
  const [hoveredIcon, setHoveredIcon] = React.useState(null);

  const ctaButtonStyle = {
    backgroundColor: 'transparent',
    color: '#00ff88',
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '700',
    letterSpacing: '1px',
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
    padding: '30px 20px',
    maxWidth: '500px',
    width: 'calc(100% - 40px)',
    position: 'relative',
    boxShadow: '0 0 60px rgba(0, 255, 136, 0.3)',
    animation: 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const modalTitleStyle = {
    fontSize: 'clamp(20px, 6vw, 32px)',
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: '2px',
    marginBottom: '30px',
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
    gap: '20px',
    flexWrap: 'wrap',
  };

  const iconButtonStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    background: 'transparent',
    border: '2px solid rgba(0, 255, 136, 0.3)',
    borderRadius: '12px',
    padding: '16px 12px',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    color: '#00ff88',
    textDecoration: 'none',
    minWidth: '80px',
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
    fontSize: '10px',
    fontWeight: '500',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontFamily: '"Orbitron", monospace',
  };

  const keyframesStyle = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
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
    
    @media (max-width: 768px) {
      .modal-title {
        font-size: clamp(20px, 6vw, 28px) !important;
        margin-bottom: 30px !important;
      }
      
      .icon-label {
        font-size: 10px !important;
      }
    }
  `;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => document.body.style.overflow = 'unset';
  }, [isModalOpen]);

  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <style>{keyframesStyle}</style>
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
            
            <h2 style={modalTitleStyle} className="modal-title">
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
                <span style={iconLabelStyle} className="icon-label">Telegram</span>
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
                <span style={iconLabelStyle} className="icon-label">WhatsApp</span>
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
                <span style={iconLabelStyle} className="icon-label">Gmail</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Button;