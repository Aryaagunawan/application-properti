import React, { useState, useEffect } from 'react';
import {
  Home, MapPin, Search, Menu, X, ShieldCheck, Gem, Headset,
  Facebook, Instagram, Twitter, Mail, Phone, BedDouble, Bath,
  Maximize, CalendarCheck, Heart, MessagesSquare, CheckCircle,
  Star, Quote, FileText, Key, ChevronDown, ArrowRight
} from 'lucide-react';

// Import types
import type { Property, FilterState, ToastState } from './types';

// Import data
import { HERO_SLIDES, NAV_LINKS, TESTIMONIALS, FAQS, PROPERTIES } from './data/mockData';

// Import components
import FaqAccordionItem from './components/FaqAccordionItem';

// Import hooks
import { useScrollReveal } from './hooks/useScrollReveal';
import { useScrollNavbar } from './hooks/useScrollNavbar';
import { useActiveSection } from './hooks/useActiveSection';

// Import utils
import { scrollToTop, scrollToSection } from './utils/scrollUtils';

// --- MAIN COMPONENT ---
export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const [filters, setFilters] = useState<FilterState>({ location: '', type: '' });
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', bgClass: 'bg-green-500' });

  // Custom hooks
  const isScrolled = useScrollNavbar();
  const activeSection = useActiveSection();
  useScrollReveal([visibleCount, filters]);

  // Auto Slider Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Filter Logic
  const filteredProperties = PROPERTIES.filter(p => {
    const matchLoc = filters.location === "" || p.location === filters.location;
    const matchType = filters.type === "" || p.type === filters.type;
    return matchLoc && matchType;
  });

  const displayedProperties = filteredProperties.slice(0, visibleCount);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(6);
  }, [filters]);

  // Enhanced Smooth Scroll Actions
  const scrollToSectionHandler = (id: string) => {
    setIsMobileMenuOpen(false);
    scrollToSection(id);
  };

  const openModal = (prop: Property) => {
    setSelectedProperty(prop);
    setModalImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProperty(null);
    document.body.style.overflow = 'auto';
  };

  const showToastMsg = (msg: string, bgClass: string = 'bg-emerald-600') => {
    setToast({ show: true, message: msg, bgClass });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const submitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setShowContactModal(false);
    document.body.style.overflow = 'auto';
    showToastMsg("Terima kasih! Spesialis kami akan membalas pesan Anda maksimal 1x24 jam.", "bg-emerald-500");
  };

  const scheduleSurvey = () => {
    closeModal();
    setShowContactModal(true);
  };

  const saveToFavorites = () => {
    showToastMsg("Properti luar biasa ini berhasil disimpan ke Favorit Anda!", "bg-orange-500");
  };

  return (
    <div className="font-sans bg-[#f8fafc] text-slate-800 antialiased selection:bg-orange-500 selection:text-white min-h-screen overflow-x-hidden">
      {/* Global & Aesthetic Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        html { 
          /* Removed native smooth scroll here to rely entirely on JS for anchor links to prevent conflict and choppiness */
          scroll-behavior: auto; 
        } 
        
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; border: 2px solid #f1f5f9; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        
        /* Advanced Glassmorphism */
        .glass-nav-scrolled { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.8); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03); }
        .glass-nav-top { background: linear-gradient(to bottom, rgba(15, 23, 42, 0.5), transparent); }
        .glass-panel { background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); }
        .glass-card { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: 0 10px 40px -10px rgba(0,0,0,0.05); }
        
        /* Smooth Diffused Shadows */
        .shadow-soft { box-shadow: 0 20px 40px -15px rgba(0,0,0,0.05); }
        .shadow-glow { box-shadow: 0 0 30px -5px rgba(249, 115, 22, 0.3); }
        
        /* Nav Link Animation */
        .nav-link { position: relative; padding-bottom: 4px; }
        .nav-link::after {
          content: ''; position: absolute; width: 0; height: 2px;
          bottom: 0; left: 50%; transform: translateX(-50%);
          background-color: #f97316; transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          border-radius: 2px;
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        
        /* Text Gradients */
        .text-gradient { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        
        /* Reveal Animations (The core of smooth elegant feeling) */
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); /* Buttery smooth easing */
          will-change: opacity, transform;
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
        /* Staggered delays for grids */
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }
        .delay-400 { transition-delay: 400ms; }
        
        /* Marquee Infinite Scroll Animation */
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: scroll 45s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }

        /* Subtle Orbs Animation */
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-float { animation: float 15s ease-in-out infinite; }
        .animate-float-delayed { animation: float 18s ease-in-out infinite 2s; }
      `}</style>

      {/* Toast Notification */}
      <div className={`fixed top-24 right-5 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 border border-white/20 transition-all duration-500 transform backdrop-blur-md ${toast.show ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95 pointer-events-none'} ${toast.bgClass}`}>
        <CheckCircle className="w-5 h-5" />
        <span className="font-medium tracking-wide text-sm">{toast.message}</span>
      </div>

      {/* Aesthetic Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'glass-nav-scrolled py-3' : 'glass-nav-top py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={scrollToTop}>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white shadow-glow transform group-hover:scale-105 transition-all duration-500 ease-out">
                <Home className="w-5 h-5" />
              </div>
              <span className={`font-extrabold text-2xl tracking-tight transition-colors duration-500 ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                Home<span className="text-orange-500">Property</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-9 items-center">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <button
                    key={link.label}
                    onClick={() => scrollToSectionHandler(link.href)}
                    className={`nav-link font-medium text-sm tracking-wide transition-colors duration-300 ${isActive ? (isScrolled ? 'text-orange-500 active' : 'text-white active') : (isScrolled ? 'text-slate-600 hover:text-orange-500' : 'text-slate-300 hover:text-white')}`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className={`w-px h-5 transition-colors duration-500 ${isScrolled ? 'bg-slate-200' : 'bg-white/20'}`}></div>
              <button onClick={() => setShowContactModal(true)} className={`px-8 py-3 rounded-full font-bold text-sm tracking-wide transition-all duration-500 ease-out shadow-lg flex items-center gap-2 transform hover:-translate-y-0.5 ${isScrolled ? 'bg-slate-900 text-white hover:bg-orange-500 hover:shadow-orange-500/30' : 'bg-white text-slate-900 hover:bg-orange-500 hover:text-white'}`}>
                Hubungi Spesialis
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`focus:outline-none transition-all duration-300 p-2 rounded-xl backdrop-blur-md ${isScrolled ? 'text-slate-800 bg-slate-100/50' : 'text-white bg-white/10'}`}>
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`lg:hidden absolute top-full left-0 w-full px-4 pt-2 pb-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform origin-top ${isMobileMenuOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'}`}>
          <div className="glass-card rounded-3xl p-4 shadow-2xl border border-white/80">
            <div className="space-y-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <button
                    key={link.label}
                    onClick={() => scrollToSectionHandler(link.href)}
                    className={`block w-full text-left px-5 py-3.5 text-sm font-semibold rounded-2xl transition-all ${isActive ? 'text-orange-600 bg-orange-50/80' : 'text-slate-600 hover:text-orange-600 hover:bg-slate-50'}`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className="pt-3 pb-1">
                <button onClick={() => { setIsMobileMenuOpen(false); setShowContactModal(true); }} className="w-full px-5 py-4 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:to-orange-500 rounded-2xl transition-all shadow-glow">
                  Hubungi Agen Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="beranda" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
        {/* Cinematic Image Slider */}
        {HERO_SLIDES.map((slide, index) => (
          <div key={index}
            className={`absolute inset-0 transition-all duration-[2000ms] ease-out ${currentSlideIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
            style={{ backgroundImage: `url('${slide}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80"></div>
          </div>
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full glass-panel text-white font-medium tracking-widest text-xs mb-8 uppercase shadow-glow reveal">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Koleksi Hunian Premium 2026
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white mb-8 leading-[1.1] tracking-tight drop-shadow-xl reveal delay-100">
              Titik Awal <br /><span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-500">Cerita Terindah Anda</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-14 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md reveal delay-200">
              Lebih dari sekadar susunan bata dan semen. Kami menghadirkan ruang di mana harmoni, estetika, dan kehangatan keluarga menyatu sempurna.
            </p>

            {/* Premium Glass Search Box */}
            <div className="glass-panel p-2.5 rounded-[2rem] flex flex-col md:flex-row gap-2 max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-500 reveal delay-300">
              <div className="flex-1 flex items-center bg-white/95 backdrop-blur-md rounded-[1.5rem] px-6 py-4 transition-all focus-within:ring-2 focus-within:ring-orange-500/50 group shadow-sm">
                <MapPin className="text-slate-400 group-focus-within:text-orange-500 transition-colors w-5 h-5 mr-3" />
                <select value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} className="w-full bg-transparent border-none outline-none text-slate-700 font-semibold cursor-pointer text-sm">
                  <option value="">Semua Lokasi</option>
                  <option value="Bandar Lampung">Bandar Lampung</option>
                  <option value="Jakarta">Jakarta</option>
                  <option value="Bali">Bali</option>
                  <option value="Bandung">Bandung</option>
                  <option value="Surabaya">Surabaya</option>
                </select>
              </div>
              <div className="flex-1 flex items-center bg-white/95 backdrop-blur-md rounded-[1.5rem] px-6 py-4 transition-all focus-within:ring-2 focus-within:ring-orange-500/50 group shadow-sm">
                <Home className="text-slate-400 group-focus-within:text-orange-500 transition-colors w-5 h-5 mr-3" />
                <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })} className="w-full bg-transparent border-none outline-none text-slate-700 font-semibold cursor-pointer text-sm">
                  <option value="">Semua Tipe</option>
                  <option value="Rumah Komersil">Rumah Komersil</option>
                  <option value="Rumah Subsidi">Rumah Subsidi</option>
                  <option value="Apartemen">Apartemen</option>
                  <option value="Villa">Villa</option>
                </select>
              </div>
              <button onClick={() => scrollToSectionHandler('#properti')} className="bg-gradient-to-r from-orange-500 to-orange-600 hover:to-orange-500 text-white px-10 py-4 rounded-[1.5rem] font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-glow hover:shadow-orange-500/40 active:scale-95">
                <Search className="w-4 h-4" />
                Temukan
              </button>
            </div>
          </div>
        </div>

        {/* Elegant Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2.5 z-10 reveal delay-400">
          {HERO_SLIDES.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlideIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${currentSlideIndex === index ? 'bg-orange-500 w-10' : 'bg-white/40 hover:bg-white/70 w-3'}`}>
            </button>
          ))}
        </div>
      </section>

      {/* Properties Section */}
      <section id="properti" className="py-32 relative">
        {/* Background Blur Orbs */}
        <div className="absolute top-40 left-0 w-96 h-96 bg-orange-200/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-float pointer-events-none"></div>
        <div className="absolute bottom-40 right-0 w-[30rem] h-[30rem] bg-amber-100/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-float-delayed pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 reveal">
            <div className="max-w-2xl">
              <span className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-3 block">Koleksi Eksklusif</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">Kurasi Properti <br /><span className="text-slate-400 font-light">Terbaik Kami</span></h2>
            </div>
            <div className="w-full md:w-auto">
              <p className="text-slate-500 text-base font-light leading-relaxed max-w-md">Jelajahi mahakarya hunian yang dirancang dengan dedikasi tinggi untuk kenyamanan dan prestise Anda.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {displayedProperties.map((prop, idx) => (
              <div key={prop.id} onClick={() => openModal(prop)}
                // Menambahkan reveal class dengan delay dinamis berdasarkan index agar tampil berurutan
                className={`reveal delay-${(idx % 3) * 100} group bg-white/70 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-soft hover:shadow-2xl hover:shadow-orange-500/10 border border-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer flex flex-col transform hover:-translate-y-3`}>

                <div className="relative overflow-hidden h-72 p-2">
                  <div className="w-full h-full relative rounded-[1.5rem] overflow-hidden">
                    <div className={`absolute top-4 left-4 glass-card px-4 py-1.5 rounded-xl text-xs font-bold tracking-wide z-10 ${prop.type === 'Rumah Subsidi' ? 'text-emerald-600' : 'text-orange-600'}`}>
                      {prop.type}
                    </div>

                    <img src={prop.image} alt={prop.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="w-full flex justify-between items-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <span className="text-white font-medium text-sm">Lihat Detail</span>
                        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-8 pb-8 pt-4 flex-1 flex flex-col bg-gradient-to-b from-transparent to-white/50">
                  <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    {prop.location}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition-colors duration-300 leading-tight">{prop.title}</h3>
                  <p className="text-2xl font-extrabold text-gradient mb-8 mt-auto">{prop.price}</p>

                  <div className="flex items-center justify-between pt-5 border-t border-slate-200/60 text-slate-500 text-sm font-medium">
                    <div className="flex items-center gap-2" title="Kamar Tidur">
                      <BedDouble className="w-4 h-4 text-slate-400" /> {prop.beds}
                    </div>
                    <div className="flex items-center gap-2" title="Kamar Mandi">
                      <Bath className="w-4 h-4 text-slate-400" /> {prop.baths}
                    </div>
                    <div className="flex items-center gap-2" title="Luas (m²)">
                      <Maximize className="w-4 h-4 text-slate-400" /> {prop.area} m²
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < filteredProperties.length && (
            <div className="mt-16 flex justify-center reveal delay-200">
              <button
                onClick={() => setVisibleCount(prev => prev + 3)}
                className="glass-card px-8 py-4 rounded-full font-bold text-orange-600 tracking-wide transition-all duration-300 flex items-center justify-center gap-3 shadow-soft hover:shadow-glow hover:-translate-y-1 group border border-orange-200/50 hover:bg-white active:scale-95"
              >
                Muat Lebih Banyak
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          )}

          {filteredProperties.length === 0 && (
            <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-[3rem] border border-white shadow-soft mt-8 reveal">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Properti tidak ditemukan</h3>
              <p className="text-slate-500 mb-8 font-light">Maaf, kami tidak menemukan properti yang sesuai dengan filter Anda saat ini.</p>
              <button onClick={() => setFilters({ location: '', type: '' })} className="text-orange-600 font-bold text-sm tracking-wide hover:text-orange-700 bg-orange-50 px-8 py-3 rounded-full transition-colors">
                Reset Pencarian
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Layanan Kami - Aesthetic Cards */}
      <section id="layanan" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 reveal">
            <span className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-3 block">Layanan Komprehensif</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Lebih Dari Sekadar <br /><span className="text-slate-400 font-light">Menjual Rumah</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FileText, title: "Konsultasi KPR", desc: "Kemitraan strategis dengan bank nasional terkemuka menjamin proses KPR Anda berjalan lancar dengan suku bunga eksklusif.", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
              { icon: Key, title: "Jaminan Legalitas", desc: "Ketenangan pikiran Anda adalah prioritas. Seluruh properti bersertifikat SHM dan terverifikasi bebas dari segala sengketa hukum.", img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
              { icon: Headset, title: "Purna Jual Premium", desc: "Dedikasi kami tidak berakhir saat serah terima. Nikmati garansi bangunan dan layanan pendampingan ekstensif pasca pembelian.", img: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
            ].map((srv, idx) => (
              <div key={idx} className={`reveal delay-${idx * 100} group rounded-[2.5rem] overflow-hidden bg-slate-50 relative flex flex-col justify-end min-h-[400px]`}>
                <img src={srv.img} alt={srv.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] grayscale-[30%] group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>

                <div className="relative z-10 p-10 flex flex-col h-full justify-end transform transition-transform duration-500 ease-out">
                  <div className="w-14 h-14 glass-panel rounded-2xl flex items-center justify-center text-white mb-6 shadow-glow transform group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                    <srv.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{srv.title}</h3>
                  <p className="text-slate-300 font-light leading-relaxed text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] h-0 group-hover:h-auto">
                    {srv.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tentang Kami - Magazine Layout */}
      <section id="keunggulan" className="py-32 bg-[#f8fafc] relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-200/20 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-200/20 blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">

            <div className="lg:w-1/2 flex gap-5">
              <div className="w-1/2 flex flex-col gap-5 mt-16 reveal">
                <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Rumah Nyaman" className="rounded-[2.5rem] shadow-soft object-cover h-72 w-full transform hover:-translate-y-2 transition duration-700 ease-out" />
                <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Interior Hangat" className="rounded-[2.5rem] shadow-soft object-cover h-56 w-full transform hover:-translate-y-2 transition duration-700 ease-out delay-100" />
              </div>
              <div className="w-1/2 flex flex-col gap-5 reveal delay-200">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Keluarga Bahagia" className="rounded-[2.5rem] shadow-soft object-cover h-[22rem] w-full transform hover:-translate-y-2 transition duration-700 ease-out" />
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-[2.5rem] p-8 text-white shadow-glow transform hover:-translate-y-2 transition duration-700 ease-out flex flex-col justify-center items-center text-center h-48 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                  <h4 className="text-5xl font-extrabold mb-2 tracking-tighter">10<span className="text-orange-200">+</span></h4>
                  <p className="text-xs font-semibold uppercase tracking-widest opacity-90 leading-relaxed">Tahun Kepercayaan</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="reveal">
                <span className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-3 block">Filosofi Kami</span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">Membangun Cerita, <br /><span className="text-slate-400 font-light">Bukan Sekadar Fisik.</span></h2>
                <p className="text-slate-500 mb-12 text-lg font-light leading-relaxed">Di Home Property, kami memahami bahwa rumah adalah tempat lahirnya kenangan terindah. Kami mendedikasikan diri untuk merancang ruang yang tidak hanya memanjakan mata, tapi juga merengkuh hangatnya keluarga Anda setiap hari.</p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="reveal delay-100 group glass-card p-6 rounded-3xl border border-white hover:border-orange-200 transition-all duration-500 ease-out flex gap-5 items-start shadow-sm hover:shadow-md">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-orange-500 group-hover:bg-orange-50 transition-colors duration-300 flex-shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1 text-lg group-hover:text-orange-500 transition-colors">Integritas Tanpa Kompromi</h3>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">Kejujuran dalam spesifikasi material dan transparansi biaya tanpa *hidden fee*.</p>
                  </div>
                </div>
                <div className="reveal delay-200 group glass-card p-6 rounded-3xl border border-white hover:border-orange-200 transition-all duration-500 ease-out flex gap-5 items-start shadow-sm hover:shadow-md">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-orange-500 group-hover:bg-orange-50 transition-colors duration-300 flex-shrink-0">
                    <Gem className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1 text-lg group-hover:text-orange-500 transition-colors">Standar Estetika Tinggi</h3>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">Setiap sudut dirancang oleh arsitek berpengalaman dengan memperhatikan pencahayaan & sirkulasi.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials - Elegant Marquee */}
      <section id="testimoni" className="py-32 bg-white overflow-hidden border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center reveal">
            <span className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-3 block">Kisah Nyata</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Suara Penghuni Kami</h2>
          </div>
        </div>

        <div className="relative w-full max-w-[100vw] py-10 reveal delay-200">
          <div className="absolute top-0 left-0 w-24 md:w-64 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-24 md:w-64 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="flex animate-marquee w-max">
            {/* Set 1 */}
            <div className="flex gap-8 px-4">
              {TESTIMONIALS.map((t, idx) => (
                <div key={`set1-${idx}`} className="w-[360px] md:w-[480px] flex-shrink-0 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-soft hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative whitespace-normal group">
                  <Quote className="absolute top-10 right-10 w-16 h-16 text-slate-50 opacity-50 group-hover:text-orange-50 transition-colors duration-500" />
                  <div className="flex gap-1 mb-8 relative z-10">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />)}
                  </div>
                  <p className="text-slate-600 font-light italic mb-10 relative z-10 leading-relaxed text-lg">"{t.quote}"</p>
                  <div className="flex items-center gap-5 border-t border-slate-50 pt-6">
                    <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover shadow-md" />
                    <div>
                      <h4 className="font-bold text-slate-900 tracking-wide">{t.name}</h4>
                      <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Set 2 (Duplikasi Seamless) */}
            <div className="flex gap-8 px-4">
              {TESTIMONIALS.map((t, idx) => (
                <div key={`set2-${idx}`} className="w-[360px] md:w-[480px] flex-shrink-0 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-soft hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative whitespace-normal group">
                  <Quote className="absolute top-10 right-10 w-16 h-16 text-slate-50 opacity-50 group-hover:text-orange-50 transition-colors duration-500" />
                  <div className="flex gap-1 mb-8 relative z-10">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />)}
                  </div>
                  <p className="text-slate-600 font-light italic mb-10 relative z-10 leading-relaxed text-lg">"{t.quote}"</p>
                  <div className="flex items-center gap-5 border-t border-slate-50 pt-6">
                    <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover shadow-md" />
                    <div>
                      <h4 className="font-bold text-slate-900 tracking-wide">{t.name}</h4>
                      <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Clean Accordion */}
      <section id="faq" className="py-32 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Pertanyaan Umum</h2>
            <p className="text-slate-500 text-lg font-light">Segala informasi transparan yang perlu Anda ketahui sebelum melangkah lebih jauh bersama kami.</p>
          </div>

          <div className="glass-card p-6 md:p-10 rounded-[2.5rem] reveal delay-200">
            {FAQS.map((faq, index) => (
              <FaqAccordionItem
                key={index}
                faq={faq}
                isOpen={activeFaqIndex === index}
                onClick={() => setActiveFaqIndex(activeFaqIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Premium Dark */}
      <footer className="bg-slate-950 text-slate-300 py-24 border-t-4 border-orange-500 relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-12 reveal">
            <div className="md:col-span-12 lg:col-span-5">
              <div className="flex items-center gap-3 mb-8 cursor-pointer group" onClick={scrollToTop}>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform duration-300 ease-out">
                  <Home className="w-6 h-6" />
                </div>
                <span className="font-extrabold text-3xl tracking-tight text-white">Home<span className="text-orange-500">Property</span></span>
              </div>
              <p className="text-slate-400 mb-10 font-light leading-relaxed max-w-md text-lg">Mewujudkan hunian impian dengan sentuhan personal, dedikasi tinggi, dan estetika yang tak lekang oleh waktu.</p>
              <div className="flex space-x-5">
                {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 hover:-translate-y-1 shadow-soft">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-6 lg:col-span-3 lg:pl-12 reveal delay-100">
              <h4 className="text-lg font-bold mb-8 text-white tracking-wide">Pencarian Cepat</h4>
              <ul className="space-y-4">
                {['Properti Bandar Lampung', 'Apartemen Jakarta', 'Villa Eksklusif Bali', 'Info Rumah Subsidi'].map((item, idx) => (
                  <li key={idx}>
                    <button onClick={() => { setFilters({ ...filters, location: idx === 0 ? 'Bandar Lampung' : idx === 1 ? 'Jakarta' : idx === 2 ? 'Bali' : '', type: idx === 3 ? 'Rumah Subsidi' : '' }); scrollToSectionHandler('#properti'); }}
                      className="text-slate-400 hover:text-orange-400 transition-colors font-light text-left flex items-center gap-2 group">
                      <ChevronDown className="w-4 h-4 -rotate-90 text-slate-700 group-hover:text-orange-500 transition-colors" />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-6 lg:col-span-4 reveal delay-200">
              <h4 className="text-lg font-bold mb-8 text-white tracking-wide">Hubungi Kami</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 text-orange-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="font-light mt-1 text-slate-400 leading-relaxed">Jl. Sudirman, Kota Jakarta Pusat</span>
                </li>
                <li className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 text-orange-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="font-light text-slate-400">+62 816 2345 6253</span>
                </li>
                <li className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 text-orange-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-light text-slate-400">hub@homeproperty.co.id</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800/50 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 font-light text-sm reveal delay-300">
            <p>&copy; 2026 Home Property. All rights reserved.</p>
            <p>Dirancang dengan hati untuk keluarga Anda.</p>
          </div>
        </div>
      </footer>

      {/* Premium Property Detail Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pt-4 pb-20 text-center sm:p-0">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity duration-500" onClick={closeModal}></div>

          <div className="relative bg-white rounded-[2.5rem] text-left overflow-hidden shadow-2xl transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:my-8 sm:max-w-5xl w-full flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[90vh] overflow-y-auto z-10 animate-fade-in-up border border-white/20 scale-100 opacity-100">
            <button onClick={closeModal} className="absolute top-6 right-6 z-20 w-12 h-12 glass-panel rounded-full flex items-center justify-center text-slate-800 hover:bg-white hover:text-red-500 transition-all duration-300 shadow-lg hover:scale-110 active:scale-95">
              <X className="w-6 h-6" />
            </button>

            {/* Modal Image Slider */}
            <div className="w-full md:w-1/2 flex flex-col bg-[#f8fafc] border-r border-slate-100">
              <div className="relative h-72 md:h-[28rem] w-full flex-shrink-0">
                <img src={selectedProperty.images[modalImageIndex]} alt="Property Detail" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out" />
                <div className={`absolute top-6 left-6 glass-card px-5 py-2 rounded-xl text-sm font-bold shadow-lg tracking-wide ${selectedProperty.type === 'Rumah Subsidi' ? 'text-emerald-600' : 'text-orange-600'}`}>
                  {selectedProperty.type}
                </div>
              </div>

              <div className="flex gap-4 p-6 overflow-x-auto h-full items-center custom-scrollbar">
                {selectedProperty.images.map((img, idx) => (
                  <div key={idx}
                    onClick={() => setModalImageIndex(idx)}
                    className={`relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border-2 ${modalImageIndex === idx ? 'border-orange-500 shadow-md scale-105 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}>
                    <img src={img} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Content */}
            <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 gap-2">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  {selectedProperty.location}
                </div>
                <h3 className="text-4xl font-extrabold text-slate-900 mb-3 leading-tight tracking-tight">{selectedProperty.title}</h3>
                <div className="text-3xl font-extrabold text-gradient mb-10">{selectedProperty.price}</div>

                <div className="flex gap-4 py-6 border-y border-slate-100 mb-8 bg-slate-50/50 rounded-2xl px-2">
                  <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 border-r border-slate-200/50 last:border-0">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm">
                      <BedDouble className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-xl">{selectedProperty.beds}</p>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">K. Tidur</p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 border-r border-slate-200/50 last:border-0">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm">
                      <Bath className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-xl">{selectedProperty.baths}</p>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">K. Mandi</p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 border-r border-slate-200/50 last:border-0">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm">
                      <Maximize className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-xl">{selectedProperty.area}</p>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">Luas m²</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-bold text-slate-900 mb-4 text-lg">Catatan Arsitek</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    {selectedProperty.desc}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button onClick={scheduleSurvey} className="flex-1 bg-slate-900 hover:bg-orange-500 text-white py-4 rounded-2xl font-bold tracking-wide transition-all duration-300 shadow-soft flex justify-center items-center gap-2 hover:-translate-y-1 active:scale-95">
                  <CalendarCheck className="w-5 h-5" />
                  Jadwalkan Survei
                </button>
                <button onClick={saveToFavorites} className="w-16 h-16 border-2 border-slate-100 text-slate-400 hover:border-orange-500 hover:text-orange-500 rounded-2xl flex items-center justify-center transition-all duration-300 bg-white hover:-translate-y-1 active:scale-95 shadow-sm hover:shadow-md">
                  <Heart className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 text-center">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity duration-500" onClick={() => setShowContactModal(false)}></div>
          <div className="relative bg-white rounded-[2.5rem] text-left overflow-hidden shadow-2xl transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] max-w-lg w-full p-12 z-10 animate-fade-in-up border border-white/20 scale-100 opacity-100">
            <button onClick={() => setShowContactModal(false)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-8 shadow-sm">
              <MessagesSquare className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Sapa Kami!</h3>
            <p className="text-slate-500 mb-10 font-light text-base leading-relaxed">Konsultan properti eksklusif kami siap membantu Anda menemukan hunian idaman tanpa tekanan.</p>

            <form onSubmit={submitContact}>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Nama Lengkap</label>
                  <input type="text" required className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all font-medium text-slate-800" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">No. WhatsApp</label>
                  <input type="tel" required className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all font-medium text-slate-800" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Pesan & Kebutuhan</label>
                  <textarea rows={3} required className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all font-medium text-slate-800 resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:to-orange-500 text-white py-4 rounded-2xl font-bold tracking-wide transition-all duration-300 shadow-glow flex justify-center items-center gap-2 mt-4 transform hover:-translate-y-1 active:scale-95">
                  Kirim Pesan Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}