// ===== CHRISTMAS THEME UTILITIES =====
// Performance-optimized Christmas effects

class ChristmasTheme {
  constructor() {
    this.isActive = true;
    this.performanceMode = this.detectPerformanceMode();
    this.init();
  }

  detectPerformanceMode() {
    // Detect if device can handle animations
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    return isMobile || isLowEnd || prefersReducedMotion;
  }

  init() {
    if (this.performanceMode) {
      console.log('Christmas theme: Performance mode enabled');
      this.enableStaticDecorations();
    } else {
      this.enableFullAnimations();
    }
    
    this.addEventListeners();
  }

  enableStaticDecorations() {
    // Add static Christmas elements without animations
    document.documentElement.style.setProperty('--christmas-animation-duration', '0s');
    
    // Add simple Christmas colors
    const cards = document.querySelectorAll('.card, .service-card, .store-card');
    cards.forEach(card => {
      card.style.borderLeft = '3px solid #dc2626';
    });
  }

  enableFullAnimations() {
    // Enable all Christmas animations
    this.addChristmasSparkles();
    this.enhanceButtons();
    this.addHoverEffects();
  }

  addChristmasSparkles() {
    const cards = document.querySelectorAll('.card, .service-card');
    cards.forEach(card => {
      if (!card.classList.contains('christmas-sparkle')) {
        card.classList.add('christmas-sparkle');
      }
    });
  }

  enhanceButtons() {
    const buttons = document.querySelectorAll('.bg-brand, .bg-dark');
    buttons.forEach(btn => {
      if (!btn.classList.contains('christmas-btn')) {
        btn.classList.add('christmas-btn');
      }
    });
  }

  addHoverEffects() {
    // Add Christmas glow to important elements
    const importantElements = document.querySelectorAll('.hero-section, .promo-section');
    importantElements.forEach(el => {
      el.addEventListener('mouseenter', this.addChristmasGlow);
      el.addEventListener('mouseleave', this.removeChristmasGlow);
    });
  }

  addChristmasGlow(event) {
    if (!this.performanceMode) {
      event.target.style.boxShadow = '0 0 30px rgba(220, 38, 38, 0.3)';
    }
  }

  removeChristmasGlow(event) {
    event.target.style.boxShadow = '';
  }

  addEventListeners() {
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAnimations();
      } else {
        this.resumeAnimations();
      }
    });

    // Adjust based on window size
    window.addEventListener('resize', this.debounce(() => {
      this.performanceMode = this.detectPerformanceMode();
      this.init();
    }, 250));
  }

  pauseAnimations() {
    document.documentElement.style.setProperty('--christmas-animation-play-state', 'paused');
  }

  resumeAnimations() {
    document.documentElement.style.setProperty('--christmas-animation-play-state', 'running');
  }

  // Utility function to debounce events
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Method to toggle Christmas theme
  toggle() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      document.body.classList.add('christmas-theme');
      this.init();
    } else {
      document.body.classList.remove('christmas-theme');
      this.cleanup();
    }
  }

  cleanup() {
    // Remove all Christmas classes and effects
    const elements = document.querySelectorAll('.christmas-sparkle, .christmas-btn, .christmas-glow');
    elements.forEach(el => {
      el.classList.remove('christmas-sparkle', 'christmas-btn', 'christmas-glow');
    });
  }
}

// Initialize Christmas theme when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.christmasTheme = new ChristmasTheme();
});

// Make ChristmasTheme available globally
window.ChristmasTheme = ChristmasTheme;