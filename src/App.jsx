import React, { useState, useEffect } from 'react';
import DecryptedText from './components/ReactBits/DecryptedText';
import SpotlightCard from './components/ReactBits/SpotlightCard';
import ShinyText from './components/ReactBits/ShinyText';
import Aurora from './components/ReactBits/Aurora';
import GhostCursor from './components/ReactBits/GhostCursor';
import GlassSurface from './components/ReactBits/GlassSurface';

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Smoothly increment progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 10);

    // Force set loading to false after a timeout
    const timer = setTimeout(() => {
      setLoading(false);
      setProgress(100);
    }, 1500);

    const handleLoad = () => {
      setProgress(100);
      setTimeout(() => setLoading(false), 300);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="paper-grain relative">
      <GhostCursor 
        color="#B19EEF" 
        trailLength={30} 
        bloomStrength={0.2} 
        className="fixed inset-0 z-0 opacity-50 pointer-events-none"
      />
      {/* Cinematic Loader */}
      {loading && (
        <div id="loader" className={`fixed inset-0 bg-brand-ink z-[10000] flex flex-col items-center justify-center text-white transition-opacity duration-800 ${progress === 100 ? 'opacity-0 invisible' : 'opacity-100'}`}>
          <div className="flex flex-col items-center text-white">
            <div className="font-display text-8xl md:text-[12rem] leading-none mb-4 opacity-10 select-none pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              HB
            </div>
            <span className="font-display text-4xl tracking-widest mb-2 relative z-10">HB STUDIOS</span>
            <div className="w-[150px] h-[1px] bg-white/10 mt-5 relative overflow-hidden z-10">
              <div 
                className="absolute left-0 top-0 h-full bg-brand-red transition-all duration-300" 
                style={{ width: `${progress}%`, backgroundColor: 'var(--brand-red)' }}
              ></div>
            </div>
            <div className="mt-4 font-mono text-sm relative z-10">
              <span>{Math.floor(progress)}</span>%
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div 
        id="mobile-menu" 
        className={`fixed inset-0 bg-brand-ink z-[100] flex flex-col items-center justify-center transition-transform duration-600 ease-[cubic-bezier(0.85,0,0.15,1)] ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-8 right-8 text-white/50 font-mono text-[10px] uppercase tracking-widest"
        >
          Close [X]
        </button>
        <div className="flex flex-col items-center space-y-8">
          <a href="/" className="font-display text-5xl text-white hover:text-brand-red transition-colors">Home</a>
          <a href="/portfolio" className="font-display text-5xl text-white hover:text-brand-red transition-colors">Portfolio</a>
          <a href="/services" className="font-display text-5xl text-white hover:text-brand-red transition-colors">Services</a>
          <a href="/packages" className="font-display text-5xl text-white hover:text-brand-red transition-colors">Packages</a>
          <a href="/about" className="font-display text-5xl text-white hover:text-brand-red transition-colors">About</a>
          <a href="/audit" className="bg-brand-red text-white px-8 py-4 font-mono text-[10px] uppercase tracking-widest mt-8">Free Audit</a>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center bg-transparent mix-blend-difference text-white">
        <div className="flex-1">
          <a href="/" className="font-display text-2xl tracking-tighter">HB STUDIOS UK</a>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-1 justify-center space-x-10 font-mono text-[10px] uppercase tracking-widest">
          <a href="/" className="nav-link relative">Home<sup className="text-[0.6rem] text-brand-red ml-0.5 font-mono">01</sup></a>
          <a href="/portfolio" className="nav-link relative">Portfolio<sup className="text-[0.6rem] text-brand-red ml-0.5 font-mono">02</sup></a>
          <a href="/services" className="nav-link relative">Services<sup className="text-[0.6rem] text-brand-red ml-0.5 font-mono">03</sup></a>
          <a href="/packages" className="nav-link relative">Packages<sup className="text-[0.6rem] text-brand-red ml-0.5 font-mono">04</sup></a>
          <a href="/about" className="nav-link relative">About<sup className="text-[0.6rem] text-brand-red ml-0.5 font-mono">05</sup></a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden font-mono text-[10px] uppercase tracking-widest"
        >
          Menu [=]
        </button>

        <div className="hidden lg:flex flex-1 justify-end">
          <a href="/audit" className="bg-brand-red text-white px-6 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-red transition-all duration-300">
            Free Website Audit
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="min-h-screen grid grid-cols-1 lg:grid-cols-[45%_55%] relative">
        <div className="bg-brand-paper flex flex-col justify-center px-8 md:px-20 pt-32 pb-20">
          <div className="reveal active">
            <div className="font-mono text-xs text-brand-red mb-6 tracking-widest uppercase">
              VOL.01 // PART"26 // COVENTRY, UK
            </div>
            <h1 className="font-display text-7xl md:text-9xl leading-[0.85] mb-8 uppercase">
              <DecryptedText 
                text="Modern" 
                animateOn="view" 
                revealDirection="start"
                speed={100}
                maxIterations={15}
                className="inline-block"
              /> <br /> 
              <span className="italic font-serif normal-case text-brand-red">
                <DecryptedText 
                  text="Websites" 
                  animateOn="view" 
                  revealDirection="start"
                  speed={120}
                  maxIterations={20}
                  className="inline-block"
                />
              </span> <br /> 
              <DecryptedText 
                text="That Grow" 
                animateOn="view" 
                revealDirection="start"
                speed={140}
                maxIterations={25}
                className="inline-block"
              />
            </h1>
            <p className="font-sans text-lg md:text-xl max-w-md leading-relaxed mb-10 opacity-80">
              Your website is your first employee. We build cinematic, high-performance digital platforms hand-coded for impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/audit" className="border-2 border-brand-ink px-10 py-5 font-mono text-xs uppercase tracking-widest hover:bg-brand-ink hover:text-white transition-all text-center group">
                <ShinyText text="Start Your Project" speed={3} className="group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-brand-ink relative overflow-hidden hidden lg:block">
          <div className="absolute inset-0">
            <Aurora
              colorStops={['#B19EEF', '#1a1a1a', '#B19EEF']}
              amplitude={1.2}
              speed={0.5}
            />
          </div>
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200" alt="Smoke Abstract" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-12 right-12 text-right z-10">
            <div className="font-mono text-[10px] text-white/40 mb-2 uppercase tracking-tighter">ESTABLISHED 2026 // HB_STU_UK</div>
            <div className="font-display text-4xl text-white/80 tracking-widest">CRAFTING DIGITAL EXCELLENCE</div>
          </div>
          <div className="absolute top-12 right-12 font-mono text-[8px] text-white/30 rotate-90 origin-right">
            |||| || | ||||| | ||| 52.4068° N, 1.5197° W
          </div>
        </div>
      </header>

      {/* Marquee Ticker */}
      <div className="bg-brand-red py-4 border-y border-brand-ink/10 overflow-hidden">
        <div className="marquee font-display text-2xl md:text-4xl text-white uppercase tracking-widest overflow-hidden flex whitespace-nowrap">
          <div className="flex animate-[scroll_30s_linear_infinite]">
            <span className="mx-8">Hand-Coded Performance</span>
            <span className="mx-8">•</span>
            <span className="mx-8">No Templates</span>
            <span className="mx-8">•</span>
            <span className="mx-8">Bespoke Design</span>
            <span className="mx-8">•</span>
            <span className="mx-8">Cloudflare Powered</span>
            {/* Duplicate for infinite effect */}
            <span className="mx-8">Hand-Coded Performance</span>
            <span className="mx-8">•</span>
            <span className="mx-8">No Templates</span>
            <span className="mx-8">•</span>
            <span className="mx-8">Bespoke Design</span>
            <span className="mx-8">•</span>
            <span className="mx-8">Cloudflare Powered</span>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <section className="py-32 px-6 md:px-20 bg-brand-paper">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl reveal">
              <span className="font-mono text-xs text-brand-red uppercase tracking-widest mb-4 block">01 / Services</span>
              <h2 className="font-display text-6xl md:text-8xl uppercase leading-none">
                Studio-Quality <br /> <span className="italic font-serif normal-case">Execution</span>
              </h2>
            </div>
            <div className="reveal">
              <a href="/services" className="font-mono text-xs uppercase tracking-widest border-b-2 border-brand-red pb-1">View All Services</a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '01.', title: 'Website Redesign', desc: 'Transform outdated sites into modern, high-converting platforms with improved speed and UX.' },
              { num: '02.', title: 'New Websites', desc: 'Custom, hand-coded websites from scratch. SEO-friendly and built for growth.' },
              { num: '03.', title: 'Mobile Optimisation', desc: 'Responsive design that works flawlessly on every device with fast mobile performance.' },
              { num: '04.', title: 'Free Website Audit', desc: 'A 15-minute performance and design assessment with no obligation recommendations.' }
            ].map((service, idx) => (
              <SpotlightCard 
                key={idx} 
                className="reveal bg-white/50 backdrop-blur-sm p-8 border border-brand-ink/5 group hover:border-brand-red/20 transition-colors"
                spotlightColor="rgba(177, 158, 239, 0.08)"
              >
                <div className="font-mono text-brand-red text-sm mb-6">{service.num}</div>
                <h3 className="font-display text-3xl mb-4 uppercase group-hover:text-brand-red transition-colors">{service.title}</h3>
                <p className="font-sans text-sm opacity-70 leading-relaxed">{service.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="bg-brand-ink text-white py-32 px-6 md:px-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal">
            <span className="font-mono text-xs text-brand-red uppercase tracking-widest mb-4 block">02 / Why HB Studios</span>
            <h2 className="font-display text-6xl md:text-8xl uppercase leading-none mb-12">
              The <span className="italic font-serif normal-case text-brand-red">Alternative</span> <br /> To Slow Agencies
            </h2>
            <div className="space-y-10">
              <div className="flex gap-6">
                <span className="font-mono text-xs text-brand-red pt-2">/01</span>
                <div>
                  <h4 className="font-display text-2xl uppercase mb-2">Results-Driven</h4>
                  <p className="font-sans text-sm text-white/60">Every design decision has a purpose: converting visitors into loyal customers.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="font-mono text-xs text-brand-red pt-2">/02</span>
                <div>
                  <h4 className="font-display text-2xl uppercase mb-2">Fast & Reliable</h4>
                  <p className="font-sans text-sm text-white/60">Hand-coded HTML/CSS means no bloated builders. Your site loads instantly.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative reveal h-full">
            <GlassSurface 
              className="aspect-square border border-white/10"
              borderRadius={24}
              backgroundOpacity={0.05}
              opacity={0.1}
              blur={15}
              brightness={10}
            >
              <div className="p-12 h-full flex flex-col justify-between">
                <div className="font-mono text-[10px] text-brand-red uppercase mb-8 tracking-widest">Client Feedback</div>
                <div className="space-y-6">
                  <p className="font-sans text-white/80 text-lg leading-relaxed italic">
                    "The whole experience was fast, personalised, and exceeded our expectations."
                  </p>
                  <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">— TruBamboo</p>
                </div>
                <div className="font-mono text-[8px] text-white/30">TECH_STACK // CLOUDFLARE_PAGES</div>
              </div>
            </GlassSurface>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-paper pt-32 pb-12 px-6 md:px-20 border-t border-brand-ink/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2">
              <h3 className="font-display text-4xl mb-6 uppercase">HB STUDIOS UK</h3>
              <p className="font-sans text-sm opacity-60 max-w-sm mb-8">Modern websites that grow your business. Based in Coventry, UK. Hand-coded from scratch since 2026.</p>
              <div className="font-mono text-xs uppercase tracking-widest text-brand-red">
                Coventry, United Kingdom
              </div>
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] mb-8 opacity-40">Quick Links</h4>
              <ul className="font-mono text-[11px] uppercase space-y-4 tracking-widest">
                <li><a href="/portfolio" className="hover:text-brand-red">Portfolio</a></li>
                <li><a href="/services" className="hover:text-brand-red">Services</a></li>
                <li><a href="/packages" className="hover:text-brand-red">Packages</a></li>
                <li><a href="/about" className="hover:text-brand-red">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] mb-8 opacity-40">Connect</h4>
              <ul className="font-mono text-[11px] uppercase space-y-4 tracking-widest">
                <li><a href="https://www.linkedin.com/in/hriday-nijhawan-4344aa39b/" className="hover:text-brand-red" target="_blank" rel="noreferrer">Hriday LinkedIn</a></li>
                <li><a href="https://www.linkedin.com/in/daniel-bains-296a1b3ab/" className="hover:text-brand-red" target="_blank" rel="noreferrer">Daniel LinkedIn</a></li>
                <li><a href="/audit" className="hover:text-brand-red">Get in Touch</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-brand-ink/5 pt-12 font-mono text-[9px] uppercase tracking-widest opacity-40">
            <span>© 2026 HB Studios UK. All rights reserved.</span>
            <span className="mt-4 md:mt-0">Hand-coded in Coventry</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default App;
