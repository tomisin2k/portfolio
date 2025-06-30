import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Monitor, Smartphone, ExternalLink, Send, MessageCircle, Mail, X } from 'lucide-react';
import Button from './Button';

const WorkSection = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [loadedVideos, setLoadedVideos] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCloseHovered, setModalCloseHovered] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const videoRefs = useRef({});

  const projects = [
    {
      id: 1,
      title: "Memecoin Trading Academy",
      description: "An elite gateway to advanced memecoin trading strategies, providing exclusive access to cutting-edge market analysis and trading techniques.",
      type: "desktop",
      videoSrc: "/src/assets/portfolio1.MP4",
      tech: ["React", "TradingView", "Web3", "Solana"],
      category: "Trading Platform",
      color: "#ff6b35"
    },
    {
      id: 2,
      title: "Lead Generation Analytics",
      description: "Sophisticated lead generation and analytics platform designed to capture, analyze, and convert prospect data into actionable business insights.",
      type: "desktop",
      videoSrc: "/src/assets/portfolio2.MP4",
      tech: ["Next.js", "Analytics API", "PostgreSQL", "Chart.js"],
      category: "Analytics Platform",
      color: "#4ecdc4"
    },
    {
      id: 3,
      title: "E-Commerce Fashion Store",
      description: "Modern e-commerce clothing store with seamless user experience, advanced filtering, and integrated payment processing.",
      type: "desktop",
      videoSrc: "/src/assets/portfolio3.MOV",
      tech: ["React", "Stripe", "MongoDB", "Node.js"],
      category: "E-Commerce",
      color: "#45b7d1"
    },
    {
      id: 4,
      title: "SaaS-Style Personal Brand",
      description: "Professional personal brand website designed with SaaS aesthetics, featuring modern UI/UX and compelling brand storytelling.",
      type: "desktop",
      videoSrc: "/src/assets/portfolio4.MOV",
      tech: ["React", "Framer Motion", "Tailwind", "Vercel"],
      category: "Brand Website",
      color: "#96ceb4"
    },
    {
      id: 5,
      title: "Crypto Trading Bot",
      description: "Intelligent Telegram bot for crypto trading assistance, providing real-time market analysis and automated trading signals.",
      type: "mobile",
      videoSrc: "/src/assets/portfolio5.MOV",
      tech: ["Python", "Telegram API", "CoinGecko", "ML"],
      category: "Trading Bot",
      color: "#feca57"
    }
  ];

  const handleVideoLoad = (projectId) => {
    setLoadedVideos(prev => new Set([...prev, projectId]));
  };

  const handleVideoToggle = (projectId) => {
    const video = videoRefs.current[projectId];
    if (!video) return;

    if (playingVideo === projectId) {
      video.pause();
      setPlayingVideo(null);
    } else {
      Object.values(videoRefs.current).forEach(v => {
        if (v && v !== video) v.pause();
      });
      
      video.play().catch(error => {
        console.error('Error playing video:', error);
        video.load();
      });
      setPlayingVideo(projectId);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => document.body.style.overflow = 'unset';
  }, [isModalOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    return () => {
      Object.values(videoRefs.current).forEach(video => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });
    };
  }, []);

  const sectionStyle = {
    padding: '60px 20px',
    backgroundColor: '#000000',
    minHeight: '100vh',
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
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

  const desktopGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  };

  const mobileContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '40px',
    marginBottom: '40px',
  };

  const sectionHeaderStyle = {
    fontSize: 'clamp(20px, 3vw, 28px)',
    fontWeight: '700',
    color: '#00ff88',
    letterSpacing: '2px',
    textAlign: 'center',
    marginBottom: '30px',
    textTransform: 'uppercase',
    fontFamily: '"Orbitron", monospace',
  };

  const projectCardStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    border: '2px solid rgba(0, 255, 136, 0.2)',
    borderRadius: '16px',
    padding: '16px',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
  };

  const projectCardHoverStyle = {
    borderColor: '#00ff88',
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 255, 136, 0.2), 0 0 50px rgba(0, 255, 136, 0.1)',
    backgroundColor: 'rgba(0, 255, 136, 0.05)',
  };

  const mobileCardStyle = {
    ...projectCardStyle,
    maxWidth: '400px',
    width: '100%',
  };

  const videoContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '200px',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: '16px',
    overflow: 'hidden',
    marginBottom: '16px',
    border: '2px solid rgba(0, 255, 136, 0.3)',
  };

  const mobileVideoContainerStyle = {
    ...videoContainerStyle,
    height: '350px',
    width: '180px',
    margin: '0 auto 16px auto',
    borderRadius: '25px',
  };

  const videoStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '14px',
  };

  const videoOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    borderRadius: '14px',
  };

  const playButtonStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 255, 136, 0.9)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: '#000000',
    position: 'relative',
  };

  const playButtonHoverStyle = {
    backgroundColor: '#00ff88',
    transform: 'scale(1.1)',
    boxShadow: '0 0 30px rgba(0, 255, 136, 0.6)',
  };

  const deviceBadgeStyle = {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: 'rgba(0, 255, 136, 0.9)',
    color: '#000000',
    padding: '6px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: '"Orbitron", monospace',
    letterSpacing: '0.5px',
    zIndex: 10,
  };

  const projectTitleStyle = {
    fontSize: 'clamp(18px, 2.5vw, 24px)',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '12px',
    fontFamily: '"Orbitron", monospace',
    letterSpacing: '1px',
  };

  const projectCategoryStyle = {
    fontSize: '12px',
    color: '#00ff88',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: '"Orbitron", monospace',
  };

  const projectDescriptionStyle = {
    fontSize: 'clamp(12px, 1.5vw, 14px)',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: '1.6',
    marginBottom: '16px',
    fontFamily: '"Orbitron", monospace',
  };

  const techStackStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '16px',
  };

  const techTagStyle = {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    color: '#00ff88',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '10px',
    fontWeight: '500',
    border: '1px solid rgba(0, 255, 136, 0.3)',
    fontFamily: '"Orbitron", monospace',
  };

  const viewProjectStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#00ff88',
    fontSize: '11px',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: '"Orbitron", monospace',
    opacity: 0.8,
    transition: 'opacity 0.3s ease',
  };

  const loadingSpinnerStyle = {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(0, 255, 136, 0.3)',
    borderTop: '3px solid #00ff88',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
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

  const ctaContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 0',
    marginTop: '30px',
  };

  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
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
      .desktop-grid {
        grid-template-columns: 1fr;
        gap: 30px;
      }
      
      .project-card {
        margin: 0 10px;
      }
      
      .section-title {
        font-size: clamp(24px, 8vw, 32px) !important;
        margin-bottom: 40px !important;
      }
      
      .section-subtitle {
        margin-bottom: 40px !important;
        padding: 0 20px;
      }
    }
  `;

  const desktopProjects = projects.filter(project => project.type === 'desktop');
  const mobileProjects = projects.filter(project => project.type === 'mobile');

  return (
    <>
      <style>{keyframes}</style>
      <section style={sectionStyle} id="work">
        <div style={containerStyle}>
          <h2 style={titleStyle} className="section-title">
            DIGITAL CONCEPTS &<br />
            CREATIONS —<br />
            SHOWCASING THE CRAFT<br />
            BEHIND THE CODE
          </h2>
          <p style={subtitleStyle} className="section-subtitle">
            Every project represents a unique solution crafted with precision, innovation, and an unwavering commitment to excellence.
          </p>

          <div style={sectionHeaderStyle}>
            Desktop Applications
          </div>
          
          <div style={desktopGridStyle} className="desktop-grid">
            {desktopProjects.map((project) => (
              <div
                key={project.id}
                className="project-card"
                style={{
                  ...projectCardStyle,
                  ...(hoveredProject === project.id ? projectCardHoverStyle : {})
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div style={videoContainerStyle}>
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[project.id] = el;
                    }}
                    style={videoStyle}
                    src={project.videoSrc}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onLoadedData={() => handleVideoLoad(project.id)}
                    onError={(e) => {
                      console.error('Video error:', e);
                      console.log('Failed to load:', project.videoSrc);
                    }}
                  >
                    <source src={project.videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {playingVideo !== project.id && (
                    <div
                      style={videoOverlayStyle}
                      onClick={() => handleVideoToggle(project.id)}
                    >
                      {loadedVideos.has(project.id) ? (
                        <button
                          style={{
                            ...playButtonStyle,
                            ...(hoveredProject === project.id ? playButtonHoverStyle : {})
                          }}
                        >
                          <Play size={24} />
                        </button>
                      ) : (
                        <div style={loadingSpinnerStyle}></div>
                      )}
                    </div>
                  )}
                  
                  <div style={deviceBadgeStyle}>
                    <Monitor size={14} />
                    Desktop
                  </div>
                </div>

                <div style={projectCategoryStyle}>
                  {project.category}
                </div>
                <h3 style={projectTitleStyle}>
                  {project.title}
                </h3>
                <p style={projectDescriptionStyle}>
                  {project.description}
                </p>
                <div style={techStackStyle}>
                  {project.tech.map((tech, index) => (
                    <span key={index} style={techTagStyle}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div style={viewProjectStyle}>
                  <ExternalLink size={12} />
                  View Project Details
                </div>
              </div>
            ))}
          </div>

          <div style={sectionHeaderStyle}>
            Mobile Applications
          </div>
          
          <div style={mobileContainerStyle}>
            {mobileProjects.map((project) => (
              <div
                key={project.id}
                style={{
                  ...mobileCardStyle,
                  ...(hoveredProject === project.id ? projectCardHoverStyle : {})
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div style={mobileVideoContainerStyle}>
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[project.id] = el;
                    }}
                    style={videoStyle}
                    src={project.videoSrc}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onLoadedData={() => handleVideoLoad(project.id)}
                    onError={(e) => {
                      console.error('Video error:', e);
                      console.log('Failed to load:', project.videoSrc);
                    }}
                  >
                    <source src={project.videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {playingVideo !== project.id && (
                    <div
                      style={videoOverlayStyle}
                      onClick={() => handleVideoToggle(project.id)}
                    >
                      {loadedVideos.has(project.id) ? (
                        <button
                          style={{
                            ...playButtonStyle,
                            ...(hoveredProject === project.id ? playButtonHoverStyle : {})
                          }}
                        >
                          <Play size={24} />
                        </button>
                      ) : (
                        <div style={loadingSpinnerStyle}></div>
                      )}
                    </div>
                  )}
                  
                  <div style={deviceBadgeStyle}>
                    <Smartphone size={14} />
                    Mobile
                  </div>
                </div>

                <div style={projectCategoryStyle}>
                  {project.category}
                </div>
                <h3 style={projectTitleStyle}>
                  {project.title}
                </h3>
                <p style={projectDescriptionStyle}>
                  {project.description}
                </p>
                <div style={techStackStyle}>
                  {project.tech.map((tech, index) => (
                    <span key={index} style={techTagStyle}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div style={viewProjectStyle}>
                  <ExternalLink size={12} />
                  View Project Details
                </div>
              </div>
            ))}
          </div>

          <div style={ctaContainerStyle}>
            <Button onClick={openModal}>
              Let's Build Your Empire
            </Button>
          </div>
        </div>

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
      </section>
    </>
  );
};

export default WorkSection;