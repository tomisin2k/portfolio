import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredCta, setHoveredCta] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => document.body.style.overflow = 'unset';
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    zIndex: 1000,
  };

  const logoStyle = {
    fontSize: '30px',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '2px',
    fontFamily: '"Orbitron", monospace',
    position: 'relative',
    textShadow: '0 0 10px rgba(0, 255, 136, 0.3), 0 0 20px rgba(0, 255, 136, 0.2)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-2px',
      left: '-4px',
      right: '-4px',
      bottom: '-2px',
      background: 'linear-gradient(45deg, transparent, rgba(0, 255, 136, 0.1), transparent)',
      borderRadius: '4px',
      zIndex: -1,
      opacity: 0,
      transition: 'opacity 0.3s ease',
    }
  };

  const logoHoverStyle = {
    transform: 'scale(1.05)',
    textShadow: '0 0 15px rgba(0, 255, 136, 0.5), 0 0 30px rgba(0, 255, 136, 0.3)',
  };

  const desktopMenuStyle = {
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    gap: '48px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const linkStyle = {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '14px',
    fontWeight: '400',
    textDecoration: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    fontFamily: '"Orbitron", monospace',
    position: 'relative',
    padding: '8px 0',
    overflow: 'hidden',
  };

  const linkHoverStyle = {
    color: '#00ff88',
    transform: 'translateY(-2px)',
    textShadow: '0 0 8px rgba(0, 255, 136, 0.6)',
  };

  const ctaStyle = {
    backgroundColor: '#00ff88',
    color: '#000000',
    padding: '12px 24px',
    fontSize: '13px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: '"Orbitron", monospace',
    position: 'relative',
    overflow: 'hidden',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 15px rgba(0, 255, 136, 0.2)',
  };

  const ctaHoverStyle = {
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: '0 8px 25px rgba(0, 255, 136, 0.4), 0 0 20px rgba(0, 255, 136, 0.3)',
    backgroundColor: '#ffffff',
    color: '#000000',
  };

  const hamburgerStyle = {
    display: isMobile ? 'block' : 'none',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 1001,
  };

  const hamburgerLineStyle = (index) => ({
    position: 'absolute',
    left: 0,
    width: '24px',
    height: '2px',
    backgroundColor: '#ffffff',
    borderRadius: '1px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    top: index === 0 ? '6px' : index === 1 ? '11px' : '16px',
    transform: isMenuOpen ? 
      (index === 0 ? 'rotate(45deg) translate(5px, 5px)' :
       index === 1 ? 'scaleX(0)' :
       'rotate(-45deg) translate(7px, -6px)') : 'none',
    opacity: isMenuOpen && index === 1 ? 0 : 1,
  });

  const mobileMenuStyle = {
    position: 'fixed',
    top: '72px',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'blur(20px)',
    display: isMobile && isMenuOpen ? 'flex' : 'none',
    flexDirection: 'column',
    padding: '40px 24px',
    zIndex: 999,
    animation: isMenuOpen ? 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'slideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const mobileMenuItemStyle = {
    padding: '20px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const mobileLinkStyle = {
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: '400',
    textDecoration: 'none',
    fontFamily: '"Orbitron", monospace',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const mobileCtaStyle = {
    backgroundColor: 'transparent',
    color: '#00ff88',
    padding: '16px 0',
    fontSize: '18px',
    fontWeight: '500',
    border: '2px solid #00ff88',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '32px',
    fontFamily: '"Orbitron", monospace',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  };

  const mobileCtaHoverStyle = {
    backgroundColor: '#00ff88',
    color: '#000000',
    boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
  };

  const keyframes = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideOut {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(-20px);
      }
    }

    @keyframes floatDance {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      25% { transform: translateY(-2px) rotate(0.5deg); }
      50% { transform: translateY(-1px) rotate(0deg); }
      75% { transform: translateY(-3px) rotate(-0.5deg); }
    }

    @keyframes glowPulse {
      0%, 100% { box-shadow: 0 4px 15px rgba(0, 255, 136, 0.2); }
      50% { box-shadow: 0 4px 20px rgba(0, 255, 136, 0.4), 0 0 15px rgba(0, 255, 136, 0.2); }
    }

    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(200%); }
    }

    .nav-item-dance {
      animation: floatDance 6s ease-in-out infinite;
    }

    .nav-item-dance:nth-child(1) { animation-delay: 0s; }
    .nav-item-dance:nth-child(2) { animation-delay: 0.5s; }
    .nav-item-dance:nth-child(3) { animation-delay: 1s; }

    .cta-glow {
      animation: glowPulse 2s ease-in-out infinite;
    }

    .cta-shimmer::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      animation: shimmer 2s infinite;
    }

    .underline-effect::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #00ff88, #ffffff);
      transition: width 0.3s ease;
    }

    .underline-effect:hover::after {
      width: 100%;
    }
  `;

  const [logoHovered, setLogoHovered] = useState(false);

  return (
    <>
      <style>{keyframes}</style>
      <nav style={navStyle}>
        <div 
          style={{
            ...logoStyle,
            ...(logoHovered ? logoHoverStyle : {})
          }}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          TOMISIN2K
        </div>
        
        {/* Desktop Menu */}
        <ul style={desktopMenuStyle}>
          <li 
            className="nav-item-dance underline-effect"
            style={{
              ...linkStyle,
              ...(hoveredLink === 'testimonial' ? linkHoverStyle : {})
            }}
            onMouseEnter={() => setHoveredLink('testimonial')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Testimonial
          </li>
          <li 
            className="nav-item-dance underline-effect"
            style={{
              ...linkStyle,
              ...(hoveredLink === 'work' ? linkHoverStyle : {})
            }}
            onMouseEnter={() => setHoveredLink('work')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            My Work
          </li>
          <li 
            className="nav-item-dance underline-effect"
            style={{
              ...linkStyle,
              ...(hoveredLink === 'blog' ? linkHoverStyle : {})
            }}
            onMouseEnter={() => setHoveredLink('blog')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Blog
          </li>
          <li>
            <button 
              className={`cta-glow ${hoveredCta ? 'cta-shimmer' : ''}`}
              style={{
                ...ctaStyle,
                ...(hoveredCta && !isMobile ? ctaHoverStyle : {})
              }}
              onMouseEnter={() => setHoveredCta(true)}
              onMouseLeave={() => setHoveredCta(false)}
            >
              Work With Me
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div style={hamburgerStyle} onClick={toggleMenu}>
          <span style={hamburgerLineStyle(0)}></span>
          <span style={hamburgerLineStyle(1)}></span>
          <span style={hamburgerLineStyle(2)}></span>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={mobileMenuStyle}>
        <div style={mobileMenuItemStyle}>
          <div style={mobileLinkStyle} onClick={closeMenu}>
            Testimonial
          </div>
        </div>
        <div style={mobileMenuItemStyle}>
          <div style={mobileLinkStyle} onClick={closeMenu}>
            My Work
          </div>
        </div>
        <div style={mobileMenuItemStyle}>
          <div style={mobileLinkStyle} onClick={closeMenu}>
            Blog
          </div>
        </div>
        <button 
          style={{
            ...mobileCtaStyle,
            ...(hoveredCta && isMobile ? mobileCtaHoverStyle : {})
          }}
          onMouseEnter={() => setHoveredCta(true)}
          onMouseLeave={() => setHoveredCta(false)}
          onClick={closeMenu}
        >
          Work With Me
        </button>
      </div>
    </>
  );
};

export default Navbar;