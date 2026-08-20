'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingData } from '../data';
import { Heart, Calendar, Mail, Gift, MapPin, Copy, Play, Pause, Home } from 'lucide-react';

// ==========================================
// 1. LAYER BELAKANG
// ==========================================
const BackgroundLayer = ({ isOpened }: { isOpened: boolean }) => (
  <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden bg-[#F9F8F3] z-0">
    
    {/* Background Landscape khusus PC, Normal di HP */}
    <motion.img 
      src="/images/background.png" 
      alt="bg" 
      initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 2 }} 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full md:w-[100vh] md:h-[100vw] md:-rotate-90 object-cover mix-blend-multiply z-0" 
    />
    
    <motion.img src="/images/mountain.png" initial={{ opacity: 0 }} animate={{ opacity: isOpened ? 0.5 : 0 }} transition={{ duration: 2, delay: 0.5 }} className="absolute top-[2%] left-[45%] w-[80%] md:w-[40%] object-contain z-10" alt="Mountain 1" />
    <motion.img src="/images/mountain.png" initial={{ opacity: 0 }} animate={{ opacity: isOpened ? 0.5 : 0 }} transition={{ duration: 2, delay: 0.5 }} className="absolute top-[10%] left-[-20%] md:-left-[10%] w-[80%] md:w-[45%] object-contain -scale-x-100 z-10" alt="Mountain 3" />
    <motion.img src="/images/mountain2.png" initial={{ opacity: 0 }} animate={{ opacity: isOpened ? 0.8 : 0 }} transition={{ duration: 2, delay: 0.7 }} className="absolute top-[20%] right-[25%] md:-right-[5%] w-[100%] md:w-[55%] object-contain z-10 -rotate-[15deg]" alt="Mountain 2" />
    
    {/* Pohon: Posisi natural untuk HP, disesuaikan untuk PC */}
    <motion.img 
      src="/images/tree.png" 
      initial={{ opacity: 0, rotate: 20 }} 
      animate={{ opacity: isOpened ? 0.5 : 0, rotate: isOpened ? [20, 25, 20] : 20 }} 
      transition={{ opacity: { duration: 2, delay: 0.8 }, rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" } }} 
      className="absolute top-[25%] left-[-60%] md:left-[-15%] w-[30rem] md:w-[35rem] object-contain z-20" alt="Tree Left" 
    />
    <motion.img 
      src="/images/tree.png" 
      initial={{ opacity: 0, rotate: -25 }} 
      animate={{ opacity: isOpened ? 0.5 : 0, rotate: isOpened ? [-25, -20, -25] : -25 }} 
      transition={{ opacity: { duration: 2, delay: 0.8 }, rotate: { repeat: Infinity, duration: 4.5, ease: "easeInOut" } }} 
      className="absolute top-[20%] right-[-60%] md:right-[-15%] w-[30rem] md:w-[35rem] object-contain -scale-x-100 z-20" alt="Tree Right" 
    />
    <motion.img src="/images/tree.png" initial={{ opacity: 0, rotate: -10 }} animate={{ opacity: isOpened ? 0.5 : 0, rotate: isOpened ? [-20, -15, -20] : -20 }} transition={{ opacity: { duration: 2, delay: 0.8 }, rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" } }} className="absolute top-[75%] right-[30%] w-[14rem] md:w-[25rem] object-contain z-20" alt="Tree Bot" />
    <motion.img src="/images/cloud.png" initial={{ opacity: 0 }} animate={{ opacity: isOpened ? 1 : 0 }} transition={{ duration: 2, delay: 0.9 }} className="absolute bottom-[10%] left-[-10%] w-[80%] md:w-[50%] object-contain z-20" alt="Cloud" />
    <motion.img src="/images/rock.png" initial={{ opacity: 0 }} animate={{ opacity: isOpened ? 0.9 : 0 }} transition={{ duration: 2, delay: 1 }} className="absolute bottom-[-5%] right-[-25%] w-[40rem] md:w-[45rem] object-contain z-20" alt="Rocks" />
    
    {/* Wayang Bawah */}
    <motion.img src="/images/corner-bot-left.png" initial={{ x: "-100%", opacity: 0 }} animate={{ x: isOpened ? "0%" : "-100%", opacity: isOpened ? 1 : 0 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }} className="absolute bottom-0 left-0 w-[65vw] md:w-[30vw] max-w-lg object-left-bottom drop-shadow-lg z-30" alt="Bot Left" />
    <motion.img src="/images/corner-bot-right.png" initial={{ x: "100%", opacity: 0 }} animate={{ x: isOpened ? "0%" : "100%", opacity: isOpened ? 1 : 0 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }} className="absolute bottom-0 right-0 w-[65vw] md:w-[30vw] max-w-lg object-right-bottom drop-shadow-lg z-30" alt="Bot Right" />
  </div>
);

// ==========================================
// 2. LAYER DEPAN / BINGKAI ATAS (Dengan Deteksi iOS & PC)
// ==========================================
const ForegroundLayer = ({ isOpened }: { isOpened: boolean }) => {
  const [topOpenedPos, setTopOpenedPos] = useState("-20vh");

  useEffect(() => {
    const updatePosition = () => {
      const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isDesktop = window.innerWidth >= 768;

      if (isDesktop) {
        setTopOpenedPos("-35vh"); // Posisi tinggi khusus PC
      } else if (isIOS) {
        setTopOpenedPos("-24vh"); // Khusus iPhone
      } else {
        setTopOpenedPos("-20vh"); // Android
      }
    };
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-40">
      <motion.img 
        src="/images/top.png" 
        initial={{ x: "-50%", top: "45%", y: "-50%", scale: 1.2, opacity: 0 }} 
        animate={isOpened ? { x: "-50%", top: topOpenedPos, y: "0%", scale: 1.1, opacity: 1 } : { x: "-50%", top: "45%", y: "-50%", scale: 1.2, opacity: 1 }} 
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }} 
        className="absolute left-1/2 w-[70vw] md:w-[28rem] drop-shadow-md z-10" 
        alt="Gunungan" 
      />
      <motion.img src="/images/corner-top-left.png" initial={{ opacity: 0, x: -50, y: -50 }} animate={{ opacity: 0.9, x: 0, y: 0 }} transition={{ duration: 1.5 }} className="absolute top-0 left-0 w-36 md:w-[26rem] object-left-top drop-shadow-sm z-20" alt="Top Left" />
      <motion.img src="/images/corner-top-right.png" initial={{ opacity: 0, x: 50, y: -50 }} animate={{ opacity: 0.9, x: 0, y: 0 }} transition={{ duration: 1.5 }} className="absolute top-0 right-0 w-36 md:w-[26rem] object-right-top drop-shadow-sm z-20" alt="Top Right" />
    </div>
  );
};

const DividerElegant = () => (
  <div className="flex items-center justify-center gap-2 md:gap-4 my-5 md:my-6 opacity-60">
    <div className="h-[1px] w-10 md:w-24 bg-slate-400"></div>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-slate-500 w-4 h-4 md:w-5 md:h-5" strokeWidth="1"><path d="M12 2L15 12L22 15L15 18L12 22L9 18L2 15L9 12L12 2Z" fill="#64748b" fillOpacity="0.2"/></svg>
    <div className="h-[1px] w-10 md:w-24 bg-slate-400"></div>
  </div>
);

// ==========================================
// 3. KOMPONEN ANIMASI KHUSUS SCROLL
// ==========================================
const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "-50px" }} transition={{ duration: 0.8, delay, ease: "easeOut" }}>{children}</motion.div>
);

const ZoomIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, margin: "-50px" }} transition={{ duration: 0.8, delay, ease: "easeOut" }}>{children}</motion.div>
);

const SlideInLeft = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, margin: "-50px" }} transition={{ duration: 0.8, delay, ease: "easeOut" }}>{children}</motion.div>
);

const SlideInRight = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, margin: "-50px" }} transition={{ duration: 0.8, delay, ease: "easeOut" }}>{children}</motion.div>
);

// ==========================================
// 4. FUNGSI UTAMA UNDANGAN
// ==========================================
function WeddingContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to') || 'Tamu Spesial';
  
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToast, setShowToast] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [rsvpName, setRsvpName] = useState('');
  const [rsvpAttendance, setRsvpAttendance] = useState('');
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestWishes, setGuestWishes] = useState<{name: string, attendance: string, message: string}[]>([]);
  const [isLoadingWishes, setIsLoadingWishes] = useState(true);

  const scriptURL: string = "https://script.google.com/macros/s/AKfycbx7Dv8C-2XreSOztoTnZKhn8OMghZIIXWtTm8vUdFm1CzGxw9gRCBkOnGxGU3AoP4yz_g/exec";

  // Fungsi Cerdas Mengambil Username dari Link IG
  const getIgUsername = (url: string | undefined) => {
    if (!url || url === '#') return '@username';
    const parts = url.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1].split('?')[0]; // Hapus parameter jika ada
    return `@${lastPart}`;
  };

  useEffect(() => {
    if (!scriptURL) {
      setIsLoadingWishes(false);
      return;
    }
    fetch(scriptURL)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setGuestWishes(data);
        setIsLoadingWishes(false);
      })
      .catch(error => {
        console.error("Gagal menarik data:", error);
        setIsLoadingWishes(false);
      });
  }, []);

  useEffect(() => {
    audioRef.current = new Audio('/music/wedding.mp3');
    audioRef.current.loop = true;

    const targetDate = new Date(weddingData.date).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const openInvitation = () => {
    setIsOpened(true);
    if (audioRef.current) { 
      audioRef.current.play().catch(() => {}); 
      setIsPlaying(true); 
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowToast('Nomor rekening disalin!');
    setTimeout(() => setShowToast(''), 3000);
  };

  const submitRSVP = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    setIsSubmitting(true);

    if (scriptURL !== "") {
      try {
        await fetch(scriptURL, {
          method: 'POST',
          mode: 'no-cors', 
          body: JSON.stringify({ nama: rsvpName, kehadiran: rsvpAttendance, ucapan: rsvpMessage }),
          headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        });
      } catch (error) {
        console.error('Error!', error);
      }
    } else {
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setGuestWishes([{ name: rsvpName, attendance: rsvpAttendance, message: rsvpMessage }, ...guestWishes]);
    setRsvpName(''); setRsvpAttendance(''); setRsvpMessage('');
    setIsSubmitting(false);

    setShowToast('Ucapan berhasil terkirim!');
    setTimeout(() => setShowToast(''), 3000);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <main className="relative min-h-screen bg-[#F9F8F3] text-slate-800 font-sans selection:bg-slate-300 overflow-x-hidden">
      <BackgroundLayer isOpened={isOpened} />
      <ForegroundLayer isOpened={isOpened} />

      {/* OVERLAY COVER DEPAN */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div exit={{ opacity: 0, transition: { duration: 1.2, delay: 0.4 } }} className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-[#F9F8F3]">
            <img src="/images/background.png" alt="bg-cover" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-60 z-0 pointer-events-none" />
            <div className="absolute inset-0 max-w-[48rem] mx-auto pointer-events-none z-10">
              <motion.img src="/images/front-top.png" alt="front-top" exit={{ y: "-100vh", transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } }} className="absolute top-0 left-0 w-full object-contain object-top drop-shadow-sm" />
              <motion.img src="/images/front-bot.png" alt="front-bot" exit={{ y: "100vh", transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } }} className="absolute bottom-0 left-0 w-full object-contain object-bottom drop-shadow-sm" />
              <motion.img src="/images/main-front.png" alt="main-front" initial={{ x: "-50%", scale: 1, opacity: 1 }} animate={{ x: "-50%", scale: 1, opacity: 1 }} exit={{ x: "-50%", scale: 2.5, opacity: 0, filter: "blur(10px)", transition: { duration: 1.2, ease: "easeInOut" } }} className="absolute top-[18%] md:top-[15%] left-1/2 w-[75vw] sm:w-[60vw] md:w-[22rem] lg:w-[26rem] object-contain" />
            </div>
            <motion.div exit={{ y: 50, opacity: 0, transition: { duration: 0.8, ease: "easeIn" } }} className="absolute bottom-[8%] md:bottom-[6%] z-20 text-center px-4 md:px-6 flex flex-col items-center w-full max-w-xl mx-auto">
              <p className="tracking-[0.3em] text-[9px] md:text-xs uppercase mb-2 md:mb-3 text-slate-500 font-medium">The Wedding Of</p>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl mb-4 md:mb-6 text-slate-800 drop-shadow-sm">{weddingData.bride.nickname} <span className="font-script text-slate-400 mx-0.5 md:mx-1">&</span> {weddingData.groom.nickname}</h1>
              <div className="mb-6 md:mb-8 text-center bg-white/70 backdrop-blur-md px-6 md:px-10 py-3 md:py-4 rounded-xl border border-slate-200 shadow-md max-w-[85%] w-full">
                <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-slate-500 mb-1">Kepada Yth.</p>
                <p className="text-base md:text-lg font-serif italic text-slate-800 font-medium break-words">{guestName}</p>
              </div>
              <button onClick={openInvitation} className="group relative px-6 md:px-8 py-2.5 md:py-3 bg-slate-800 text-white rounded-full overflow-hidden transition-all shadow-lg hover:shadow-xl hover:bg-slate-700 flex items-center gap-2 md:gap-3 hover:-translate-y-1 pointer-events-auto">
                <Mail size={14} className="group-hover:scale-110 transition-transform md:w-4 md:h-4" />
                <span className="text-[10px] md:text-xs font-medium tracking-widest uppercase">Buka Undangan</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`relative z-10 ${!isOpened ? 'h-screen overflow-hidden opacity-0' : 'opacity-100 transition-opacity duration-1000 delay-500'}`}>
        
        {/* HERO SECTION - Full Screen */}
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-6 py-20">
           <FadeUp>
             <p className="font-script text-3xl md:text-5xl text-slate-600 mb-2">You're Invited</p>
             <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-6">
               <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl text-slate-800">{weddingData.bride.nickname}</h2>
               <span className="font-script text-3xl sm:text-4xl md:text-5xl text-slate-400">&</span>
               <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl text-slate-800">{weddingData.groom.nickname}</h2>
             </div>
             <DividerElegant />
             <p className="tracking-[0.15em] md:tracking-[0.2em] uppercase text-[10px] sm:text-xs md:text-sm font-medium text-slate-600 mb-8 md:mb-12">{weddingData.dateText}</p>
             
             <div className="flex gap-2 sm:gap-3 md:gap-6 justify-center items-center">
               {Object.entries(timeLeft).map(([unit, value]) => (
                 <div key={unit} className="flex flex-col items-center">
                   <div className="w-12 h-14 sm:w-14 sm:h-16 md:w-20 md:h-24 bg-white/50 backdrop-blur-md border border-slate-200 rounded-t-full rounded-b-md flex items-center justify-center shadow-md">
                     <span className="text-lg sm:text-xl md:text-3xl font-serif text-slate-700">{value}</span>
                   </div>
                   <span className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-widest mt-2 md:mt-3 text-slate-500 font-semibold">{unit}</span>
                 </div>
               ))}
             </div>
           </FadeUp>
        </section>

        {/* QUOTE SECTION - Full Screen */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-20 text-center">
          <ZoomIn>
            <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-md border border-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl flex flex-col items-center w-full">
              <Heart className="text-slate-400 mb-6 md:mb-8 w-6 h-6 md:w-8 md:h-8" strokeWidth={1} />
              <p className="text-lg sm:text-xl md:text-3xl leading-relaxed md:leading-loose text-slate-800 mb-4 md:mb-6 drop-shadow-sm" dir="rtl" style={{ fontFamily: "'Scheherazade New', 'Amiri', serif" }}>
                وَأَنكِحُوا الْأَيَامَىٰ مِنكُمْ وَالصَّالِحِينَ مِنْ عِبَادِكُمْ وَإِمَائِكُمْ ۚ إِن يَكُونُوا فُقَرَاءَ يُغْنِهِمُ اللَّهُ مِن فَضْلِهِ ۗ وَاللَّهُ وَاسِعٌ عَلِيمٌ
              </p>
              <p className="font-serif italic text-xs sm:text-sm md:text-lg leading-relaxed text-slate-600 mb-4 md:mb-6 px-2 md:px-4">"{weddingData.quote.text}"</p>
              <p className="text-[8px] sm:text-[10px] md:text-xs tracking-[0.2em] uppercase text-slate-500 font-semibold border-t border-slate-300 pt-3 md:pt-4 px-4 md:px-6">QS. An-Nur: 32</p>
            </div>
          </ZoomIn>
        </section>

        {/* COUPLE SECTION - Full Screen */}
        <section id="couple" className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-20">
          <FadeUp>
            <div className="text-center mb-6 md:mb-16">
              <h3 className="font-script text-2xl md:text-4xl text-slate-500 mb-1">The</h3>
              <h2 className="font-serif text-2xl md:text-5xl text-slate-800 uppercase tracking-widest">Bride & Groom</h2>
            </div>
          </FadeUp>
          
          <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md p-4 sm:p-6 md:p-16 border border-slate-200 shadow-xl rounded-2xl w-full">
            <div className="flex flex-col md:flex-row items-center justify-between gap-1 sm:gap-4 md:gap-10">
              <SlideInLeft delay={0.2} className="flex-1 flex flex-col items-center text-center w-full">
                <img src="/images/bride.png" alt="Bride Silhouette" className="w-20 h-20 sm:w-24 sm:h-24 md:w-40 md:h-40 object-cover rounded-full mb-2 md:mb-6 border-2 md:border-4 border-white shadow-md bg-white" />
                <h4 className="font-serif text-xl sm:text-2xl md:text-4xl font-bold mb-1 md:mb-3 text-slate-800 leading-tight">{weddingData.bride.name}</h4>
                <p className="text-[10px] sm:text-xs md:text-base text-slate-600 mb-3 md:mb-6 italic leading-relaxed">{weddingData.bride.parents}</p>
                {/* Tombol IG Otomatis */}
                <a href={weddingData.bride.instagram || "#"} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 md:gap-2 px-4 py-1.5 md:px-6 md:py-2 bg-slate-800 text-white hover:bg-slate-700 hover:scale-105 transition-all rounded-full text-[9px] md:text-xs tracking-wider shadow-md lowercase max-w-[90%] md:max-w-full overflow-hidden">
                  <svg className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> 
                  <span className="truncate">{getIgUsername(weddingData.bride.instagram)}</span>
                </a>
              </SlideInLeft>
              
              <ZoomIn delay={0.4} className="flex flex-col items-center justify-center my-1 md:my-0">
                <span className="font-script text-3xl md:text-6xl text-slate-400">&</span>
              </ZoomIn>

              <SlideInRight delay={0.6} className="flex-1 flex flex-col items-center text-center w-full">
                <img src="/images/groom.png" alt="Groom Silhouette" className="w-20 h-20 sm:w-24 sm:h-24 md:w-40 md:h-40 object-cover rounded-full mb-2 md:mb-6 border-2 md:border-4 border-white shadow-md bg-white" />
                <h4 className="font-serif text-xl sm:text-2xl md:text-4xl font-bold mb-1 md:mb-3 text-slate-800 leading-tight">{weddingData.groom.name}</h4>
                <p className="text-[10px] sm:text-xs md:text-base text-slate-600 mb-3 md:mb-6 italic leading-relaxed">{weddingData.groom.parents}</p>
                {/* Tombol IG Otomatis */}
                <a href={weddingData.groom.instagram || "#"} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 md:gap-2 px-4 py-1.5 md:px-6 md:py-2 bg-slate-800 text-white hover:bg-slate-700 hover:scale-105 transition-all rounded-full text-[9px] md:text-xs tracking-wider shadow-md lowercase max-w-[90%] md:max-w-full overflow-hidden">
                  <svg className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> 
                  <span className="truncate">{getIgUsername(weddingData.groom.instagram)}</span>
                </a>
              </SlideInRight>
            </div>
          </div>
        </section>

        {/* EVENTS SECTION - Full Screen */}
        {/* Mengubah py-20 menjadi pt-10 dan menambahkan pb-32 agar kontennya terdorong naik */}
        <section id="events" className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 pt-10 pb-28 md:pb-40">
          <FadeUp>
            <div className="text-center mb-10 md:mb-16">
              <h2 className="font-serif text-2xl md:text-5xl uppercase tracking-widest text-slate-800 mb-2 md:mb-4">Wedding Events</h2>
              <DividerElegant />
            </div>
          </FadeUp>
          
          <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-md border border-slate-200 p-6 sm:p-10 md:p-14 text-center shadow-xl rounded-xl w-full">
            {weddingData.events.map((ev, idx) => (
              <div key={idx}>
                {idx > 0 && (
                  <FadeUp delay={0.2 * idx}>
                    <div className="flex justify-center my-8 md:my-14">
                      <div className="w-16 md:w-24 h-[1px] bg-slate-300"></div>
                    </div>
                  </FadeUp>
                )}
                <FadeUp delay={0.2 * (idx + 1)}>
                  <div className="relative">
                    <h4 className="font-serif text-2xl md:text-4xl mb-2 md:mb-3 text-slate-800">{ev.title}</h4>
                    <p className="font-medium tracking-widest uppercase text-[10px] md:text-xs text-slate-500 mb-1">{ev.day}</p>
                    <p className="font-serif text-lg md:text-2xl font-medium mb-1 text-slate-700">{ev.date}</p>
                    <p className="text-xs md:text-base text-slate-600">{ev.time}</p>
                  </div>
                </FadeUp>
              </div>
            ))}
          </div>
        </section>

        {/* LOCATION SECTION - Full Screen */}
        {/* Mengubah py-20 menjadi pt-10 dan menambahkan pb-32 (padding-bottom) agar kotaknya terdorong naik */}
        <section id="location" className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 pt-10 pb-36 md:pb-40">
          <ZoomIn delay={0.2}>
            <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-md border border-slate-200 p-6 md:p-12 text-center shadow-xl rounded-xl flex flex-col items-center w-full">
              <MapPin className="text-slate-400 mb-4 md:mb-5 w-6 h-6 md:w-8 md:h-8" />
              <h3 className="font-serif text-xl md:text-3xl mb-4 md:mb-6 text-slate-800">Lokasi Acara</h3>
              <p className="font-bold text-base md:text-lg text-slate-700 mb-1 md:mb-2">{weddingData.events[0].location}</p>
              <p className="text-xs md:text-sm text-slate-600 mb-6 md:mb-8 px-2 md:px-4 leading-relaxed">{weddingData.events[0].address}</p>
              <a href={weddingData.events[0].mapUrl} target="_blank" rel="noreferrer" className="px-6 md:px-8 py-2.5 md:py-3 bg-slate-800 text-white hover:bg-slate-700 transition-all text-[9px] md:text-[10px] tracking-[0.2em] uppercase rounded-full flex items-center gap-2 shadow-lg">
                <MapPin size={12} className="md:w-3.5 md:h-3.5" /> Buka Google Maps
              </a>
            </div>
          </ZoomIn>
        </section>

        {/* RSVP SECTION - Full Screen */}
        <section id="rsvp" className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-20">
          <FadeUp>
            <div className="text-center mb-8 md:mb-12">
              <h2 className="font-serif text-2xl md:text-5xl text-slate-800 mb-2 md:mb-4">RSVP & Wishes</h2>
              <p className="text-slate-600 max-w-md mx-auto text-[10px] sm:text-xs md:text-sm px-4">Kehadiran dan doa restu Bapak/Ibu merupakan kehormatan bagi kami.</p>
            </div>
          </FadeUp>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full">
            <SlideInLeft delay={0.2}>
              <form className="space-y-4 md:space-y-5 bg-white/70 backdrop-blur-md p-5 md:p-8 border border-slate-200 shadow-xl rounded-xl w-full" onSubmit={submitRSVP}>
                <h3 className="font-serif text-lg md:text-xl text-slate-800 mb-3 md:mb-4 border-b border-slate-200 pb-2 md:pb-3">Konfirmasi Kehadiran</h3>
                <input type="text" placeholder="Nama Lengkap" value={rsvpName} onChange={(e) => setRsvpName(e.target.value)} disabled={isSubmitting} className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-transparent border-b border-slate-300 focus:outline-none focus:border-slate-800 text-slate-800 text-xs md:text-sm disabled:opacity-50" required />
                <select value={rsvpAttendance} onChange={(e) => setRsvpAttendance(e.target.value)} disabled={isSubmitting} className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-transparent border-b border-slate-300 focus:outline-none focus:border-slate-800 text-slate-800 text-xs md:text-sm disabled:opacity-50" required>
                  <option value="" disabled>Apakah Anda akan hadir?</option>
                  <option value="Hadir">Ya, Saya Akan Hadir</option>
                  <option value="Tidak">Maaf, Tidak Dapat Hadir</option>
                </select>
                <textarea rows={3} placeholder="Tuliskan ucapan dan doa..." value={rsvpMessage} onChange={(e) => setRsvpMessage(e.target.value)} disabled={isSubmitting} className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-transparent border-b border-slate-300 focus:outline-none focus:border-slate-800 text-slate-800 resize-none text-xs md:text-sm disabled:opacity-50" required></textarea>
                <button type="submit" disabled={isSubmitting} className="w-full py-2.5 md:py-3 bg-slate-800 text-white font-semibold text-[9px] md:text-[10px] tracking-[0.2em] uppercase hover:bg-slate-700 transition-colors mt-2 rounded-sm disabled:bg-slate-500">
                  {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
                </button>
              </form>
            </SlideInLeft>
            
            <SlideInRight delay={0.4}>
              <div className="h-full min-h-[300px] md:min-h-[350px] max-h-[400px] md:max-h-[450px] overflow-y-auto space-y-3 md:space-y-4 pr-2 md:pr-3 custom-scrollbar relative">
                {isLoadingWishes ? (
                  <div className="flex justify-center items-center h-full text-slate-400 text-xs md:text-sm animate-pulse">Memuat ucapan...</div>
                ) : guestWishes.length === 0 ? (
                  <div className="flex justify-center items-center h-full text-slate-400 text-xs md:text-sm italic">Belum ada ucapan.</div>
                ) : (
                  guestWishes.map((wish, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/60 backdrop-blur-sm p-4 md:p-5 border border-slate-200 shadow-md rounded-lg relative">
                      <div className="flex justify-between items-start mb-1.5 md:mb-2">
                        <span className="font-serif font-bold text-sm md:text-base text-slate-800">{wish.name}</span>
                        <span className={`text-[8px] md:text-[9px] uppercase tracking-widest px-2 py-0.5 md:py-1 rounded-full ${wish.attendance === 'Hadir' ? 'bg-slate-200 text-slate-600' : 'bg-red-100 text-red-600'}`}>
                          {wish.attendance}
                        </span>
                      </div>
                      <p className="text-[11px] md:text-sm text-slate-600 leading-relaxed italic">"{wish.message}"</p>
                    </motion.div>
                  ))
                )}
              </div>
            </SlideInRight>
          </div>
        </section>

        {/* GIFT SECTION - Full Screen */}
        <section id="gift" className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-20">
          <FadeUp>
            <div className="text-center max-w-3xl mx-auto bg-white/70 backdrop-blur-md p-6 sm:p-8 md:p-10 border border-slate-200 shadow-xl rounded-2xl w-full">
              <Gift className="mx-auto text-slate-400 mb-4 md:mb-6 w-6 h-6 md:w-8 md:h-8" strokeWidth={1} />
              <h2 className="font-serif text-2xl md:text-4xl text-slate-800 mb-3 md:mb-4">Wedding Gift</h2>
              <p className="text-slate-600 mb-8 md:mb-10 text-[11px] md:text-sm leading-relaxed px-2">
                Bagi yang ingin memberikan tanda kasih untuk kami, dapat melalui nomor rekening di bawah ini:
              </p>
              
              <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
                {weddingData.bankAccounts.map((acc, idx) => (
                  <ZoomIn key={idx} delay={0.2 * (idx + 1)} className="bg-white border border-slate-200 p-5 md:p-6 shadow-sm rounded-xl relative flex flex-col justify-between group">
                    <div>
                      <p className="font-bold tracking-widest text-slate-500 mb-1.5 md:mb-2 uppercase text-[10px] md:text-xs">{acc.bank}</p>
                      <p className="font-serif text-lg md:text-xl mb-1 md:mb-2 text-slate-800">{acc.number}</p>
                      <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400 mb-4 md:mb-6">A.N. {acc.name}</p>
                    </div>
                    <button onClick={() => copyToClipboard(acc.number)} className="flex items-center justify-center gap-2 w-full py-2 border border-slate-300 text-slate-600 text-[9px] md:text-[10px] tracking-widest uppercase hover:bg-slate-100 transition-all rounded-sm">
                      <Copy size={12} className="md:w-3.5 md:h-3.5" /> Salin Rekening
                    </button>
                  </ZoomIn>
                ))}
              </div>
            </div>
          </FadeUp>
        </section>

        {/* FOOTER DENGAN KALIMAT BARU */}
        <footer className="text-center py-16 md:py-24 relative z-10 bg-gradient-to-t from-slate-200/80 to-transparent pb-32 md:pb-20 mt-10 md:mt-20 px-6 md:px-8">
          <div className="max-w-2xl mx-auto mb-10 md:mb-12">
            
            {/* Teks Penutup (Warna dilembutkan, font dipertipis & dimiringkan) */}
            <p className="text-sm md:text-base text-slate-600 font-light italic leading-relaxed mb-10">
              "Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu."
            </p>
            
            <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest mb-2">Kami yang berbahagia,</p>
            {/* Nama Mempelai (Warna sedikit dilembutkan ke slate-700) */}
            <h2 className="font-serif text-3xl md:text-5xl text-slate-700 mt-4">{weddingData.bride.nickname} <span className="text-slate-400 font-script mx-1 md:mx-2">&</span> {weddingData.groom.nickname}</h2>
          </div>
          <p className="text-[8px] md:text-[9px] tracking-widest text-slate-400 uppercase mt-10 border-t border-slate-300/50 pt-6 max-w-xs mx-auto">Made by Grisha • {new Date().getFullYear()}</p>
        </footer>

        {/* NAVIGASI BAWAH */}
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 z-[70] flex justify-between items-center px-1 sm:px-2 py-2.5 sm:py-3 text-[7px] sm:text-[9px] uppercase tracking-widest text-slate-500 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="flex flex-col items-center gap-1 hover:text-slate-800 transition flex-1"><Home size={14} className="sm:w-4 sm:h-4" strokeWidth={1.5} /> Home</a>
          <a href="#couple" onClick={(e) => handleNavClick(e, 'couple')} className="flex flex-col items-center gap-1 hover:text-slate-800 transition flex-1"><Heart size={14} className="sm:w-4 sm:h-4" strokeWidth={1.5} /> Couple</a>
          <a href="#events" onClick={(e) => handleNavClick(e, 'events')} className="flex flex-col items-center gap-1 hover:text-slate-800 transition flex-1"><Calendar size={14} className="sm:w-4 sm:h-4" strokeWidth={1.5} /> Acara</a>
          <a href="#location" onClick={(e) => handleNavClick(e, 'location')} className="flex flex-col items-center gap-1 hover:text-slate-800 transition flex-1"><MapPin size={14} className="sm:w-4 sm:h-4" strokeWidth={1.5} /> Lokasi</a>
          <a href="#rsvp" onClick={(e) => handleNavClick(e, 'rsvp')} className="flex flex-col items-center gap-1 hover:text-slate-800 transition flex-1"><Mail size={14} className="sm:w-4 sm:h-4" strokeWidth={1.5} /> RSVP</a>
          <a href="#gift" onClick={(e) => handleNavClick(e, 'gift')} className="flex flex-col items-center gap-1 hover:text-slate-800 transition flex-1"><Gift size={14} className="sm:w-4 sm:h-4" strokeWidth={1.5} /> Gift</a>
        </nav>

        <button onClick={toggleMusic} className="fixed bottom-20 md:bottom-10 right-4 md:right-6 z-[70] w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur text-slate-700 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center hover:scale-110 transition-transform border border-slate-200">
          {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-1" />}
        </button>

        <AnimatePresence>
          {showToast && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-28 md:bottom-10 left-1/2 -translate-x-1/2 z-[70] bg-slate-800 text-white font-semibold px-4 md:px-6 py-2 md:py-3 text-[9px] md:text-[10px] tracking-widest uppercase shadow-2xl rounded-full whitespace-nowrap">
              {showToast}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}

export default function WeddingPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#F9F8F3] flex items-center justify-center text-slate-800 font-serif text-lg md:text-xl">Memuat undangan...</div>}>
      <WeddingContent />
    </Suspense>
  );
}