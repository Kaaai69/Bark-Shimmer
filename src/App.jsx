import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Scissors, Sparkles, Calendar, Camera, Shield, Droplet, Heart, Clock, 
  User, Phone, CheckCircle, ChevronRight, MapPin, Menu, X, Award, 
  FileText, ExternalLink, ArrowRight, Crown, Play, Eye, Info, ShieldCheck
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Mock Unsplash images for Moss/Organic Tech Preset A
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=2560", // Super sharp premium dog photo
  texture: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&q=80&w=1920", // Dark organic moss
  before: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=1600", // Messy golden retriever (high resolution)
  after: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=1600", // Clean happy golden retriever (high resolution)
  master1: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
  master2: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
  master3: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
  spa1: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800",
  spa2: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800",
};

// Data models
const SERVICE_CATEGORIES = [
  { id: 'toy', name: 'Малые породы (до 10 кг)', description: 'Мальтипу, шпицы, йорки, пудели, чихуахуа' },
  { id: 'medium', name: 'Средние породы (10–25 кг)', description: 'Корги, кокер-спаниели, бигли, пудели' },
  { id: 'giant', name: 'Крупные породы (от 25 кг)', description: 'Золотистые ретриверы, самоеды, лабрадоры' }
];

const SERVICES = {
  toy: [
    { name: "Органический Комплекс Шпиц", price: "4 200 ₽", duration: "120 мин", desc: "Деликатное вычесывание, озоновая ванна с экстрактом зеленого чая, породная стрижка ножницами." },
    { name: "Скульптурный Силуэт Мальтипу", price: "4 800 ₽", duration: "150 мин", desc: "Мытье бессульфатным шампунем, питательная маска из водорослей, азиатский стиль мордочки." },
    { name: "Гигиенический Экспресс-Уход", price: "2 500 ₽", duration: "60 мин", desc: "Стрижка когтей, чистка ушей растительной пудрой, окантовка лап и интимной зоны." }
  ],
  medium: [
    { name: "Королевский Спа-Комплекс Корги", price: "5 500 ₽", duration: "120 мин", desc: "Глубокий экспресс-линька, гидромассаж с ромашкой, шлифовка когтей, чистка зубов гелем." },
    { name: "Породный Силуэт Спаниеля", price: "5 900 ₽", duration: "150 мин", desc: "Стрижка по породным линиям, тримминг спины, увлажняющее обертывание с маслом жожоба." },
    { name: "Детокс & Восстановление", price: "3 800 ₽", duration: "90 мин", desc: "Очищающая глиняная маска для кожи, ванна с нано-пузырьками кислорода, выдув шерсти." }
  ],
  giant: [
    { name: "Гранд Детокс Ретривер", price: "7 500 ₽", duration: "180 мин", desc: "Удаление отмершего подшерстка, ванна с экстрактом крапивы, маска против ломкости шерсти." },
    { name: "Самоед Шоу-Груминг", price: "8 900 ₽", duration: "210 мин", desc: "Трехфазное отбеливание шерсти, глубокое кондиционирование, придание формы, обработка лап." },
    { name: "Гигиенический Макси-Уход", price: "4 500 ₽", duration: "90 мин", desc: "Стрижка когтей гриндером, гигиена ушей и глаз, вычесывание колтунов, парфюмирование." }
  ]
};

const MASTERS = [
  {
    name: "Елена Воронова",
    role: "Топ-стилист / Эксперт по азиатскому стилю",
    experience: "Опыт: 8 лет",
    specialty: "Сложное моделирование мальтипу, пуделей и выставочный груминг декоративных пород.",
    image: IMAGES.master1
  },
  {
    name: "Михаил Котов",
    role: "Мастер-триммингист / Терапевт",
    experience: "Опыт: 6 лет",
    specialty: "Жесткошерстные породы, профессиональный тримминг, дерматологический спа-уход.",
    image: IMAGES.master2
  },
  {
    name: "Анна Савина",
    role: "Специалист по крупным породам",
    experience: "Опыт: 5 лет",
    specialty: "Экспресс-линька ретриверов, уход за самоедами и хаски, бесконфликтный зоопсихологический подход.",
    image: IMAGES.master3
  }
];

const ADDITIONAL_CARE = [
  { name: "Озонотерапия с фито-маслами", price: "+1 200 ₽", desc: "Ванна с мелкими озоновыми пузырьками стимулирует рост шерсти и снимает кожный зуд." },
  { name: "Ультразвуковая гигиена зубов", price: "+2 000 ₽", desc: "Удаление зубного камня без наркоза и стресса с помощью профессионального скалера." },
  { name: "Глиняная детокс-маска", price: "+900 ₽", desc: "Маска на основе зеленой глины глубоко очищает поры и питает волосяные луковицы." },
  { name: "Коллагеновое обертывание", price: "+1 500 ₽", desc: "Восстанавливает структуру поврежденного волоса, придает шелковистость и глянцевый блеск." }
];

export default function App() {
  const containerRef = useRef(null);
  const navbarRef = useRef(null);

  // States
  const [activeCategory, setActiveCategory] = useState('toy');
  const [sliderVal, setSliderVal] = useState(50);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Feature Card 1 (Diagnostic Shuffler) State
  const [shufflerCards, setShufflerCards] = useState([
    { id: 1, title: "Мальтипу & Пудели", desc: "Азиатский стиль и идеальный плюшевый контур", detail: "Шампунь восстанавливающий + Маска Bamboo Extract" },
    { id: 2, title: "Шпицы & Померанцы", desc: "Правильный силуэт без повреждения остевого волоса", detail: "Антистатическое кондиционирование + Бережный выдув" },
    { id: 3, title: "Йорки & Ши-тцу", desc: "Зеркальный блеск шерсти и аккуратная гигиена лап", detail: "Шелковое обертывание + Лазерный гриндер когтей" }
  ]);

  // Feature Card 2 (Telemetry Typewriter) State
  const [typewriterText, setTypewriterText] = useState("");
  const typewriterLines = [
    "> Анализ структуры шерсти: гипоаллергенный тест пройден...",
    "> Выбор фитотерапии: экстракт зеленого чая + масло арганы.",
    "> Параметры озона: температура воды 37.2°C, концентрация O3 в норме.",
    "> Стресс-индекс питомца: минимальный (частота дыхания стабильная).",
    "> Выполнено: Очищение 100% | Восстановление 100% | Стиль 100%."
  ];
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  // Feature Card 3 (Scheduler Demo) State
  const [schedulerDay, setSchedulerDay] = useState(2); // Ср
  const [schedulerStep, setSchedulerStep] = useState('idle'); // idle -> moving -> click -> success
  
  // Real Booking Widget States
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    breedType: 'toy',
    service: '',
    servicePrice: '',
    groomer: '',
    date: '',
    timeSlot: '',
    clientName: '',
    petName: '',
    phone: ''
  });

  // Booking options
  const bookingDates = [
    { day: "Пн", date: "6 июля" },
    { day: "Вт", date: "7 июля" },
    { day: "Ср", date: "8 июля" },
    { day: "Чт", date: "9 июля" },
    { day: "Пт", date: "10 июля" },
    { day: "Сб", date: "11 июля" }
  ];

  const bookingTimes = ["10:00", "12:30", "15:00", "17:30", "20:00"];

  // Telemetry Typewriter Effect
  useEffect(() => {
    let currentLine = typewriterLines[lineIdx];
    if (charIdx < currentLine.length) {
      const timeout = setTimeout(() => {
        setTypewriterText(prev => prev + currentLine[charIdx]);
        setCharIdx(charIdx + 1);
      }, 45);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTypewriterText("");
        setCharIdx(0);
        setLineIdx((lineIdx + 1) % typewriterLines.length);
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [charIdx, lineIdx]);

  // Shuffler interval logic
  useEffect(() => {
    const interval = setInterval(() => {
      setShuffledCards(prev => {
        const copy = [...prev];
        const last = copy.shift();
        copy.push(last);
        return copy;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scheduler Visual Loop
  useEffect(() => {
    const cycle = setInterval(() => {
      setSchedulerStep('moving');
      setTimeout(() => {
        setSchedulerStep('click');
        const nextDay = Math.floor(Math.random() * 7);
        setSchedulerDay(nextDay);
        setTimeout(() => {
          setSchedulerStep('success');
          setTimeout(() => {
            setSchedulerStep('idle');
          }, 1500);
        }, 300);
      }, 1500);
    }, 4500);

    return () => clearInterval(cycle);
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar scroll behavior
      ScrollTrigger.create({
        start: "top -80px",
        onEnter: () => {
          gsap.to(navbarRef.current, {
            backgroundColor: "rgba(242, 240, 233, 0.8)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(46, 64, 54, 0.1)",
            paddingTop: "8px",
            paddingBottom: "8px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
            duration: 0.4,
            ease: "power2.out"
          });
        },
        onLeaveBack: () => {
          gsap.to(navbarRef.current, {
            backgroundColor: "rgba(242, 240, 233, 0)",
            backdropFilter: "blur(0px)",
            borderColor: "rgba(46, 64, 54, 0)",
            paddingTop: "20px",
            paddingBottom: "20px",
            boxShadow: "none",
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });

      // Hero Section Staggered Entrance Animations
      const tl = gsap.timeline();
      tl.from(".hero-title-part1", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(".hero-title-part2", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      }, "-=0.5")
      .from(".hero-sub", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.6")
      .from(".hero-cta-btn", {
        scale: 0.95,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.5)"
      }, "-=0.4");

      // Features Cards Scroll Reveal
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 85%",
          toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out"
      });

      // Manifesto Scroll Trigger Text Split
      gsap.from(".manifesto-text-block", {
        scrollTrigger: {
          trigger: ".philosophy-section",
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });

      // Protocol Sticky Stacking Cards - Desktop Only Optimization using a unified GSAP Timeline
      let mm = gsap.matchMedia();
      const cards = gsap.utils.toArray('.stacking-card');

      mm.add("(min-width: 1024px)", () => {
        if (cards.length > 0) {
          // Initialize: first card is in place, rest are shifted down off-screen
          gsap.set(cards.slice(1), { yPercent: 100 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".protocol-section",
              start: "top top",
              end: `+=${(cards.length - 1) * 100}%`,
              pin: true,
              scrub: true,
            }
          });

          cards.forEach((card, index) => {
            if (index < cards.length - 1) {
              const nextCard = cards[index + 1];
              tl.to(nextCard, {
                yPercent: 0,
                ease: "none",
                duration: 1
              }, index)
              .to(card, {
                scale: 0.94,
                opacity: 0.5,
                filter: "blur(6px)",
                ease: "none",
                duration: 1
              }, index);
            }
          });
        }
      });

      mm.add("(max-width: 1023px)", () => {
        // Mobile: reset styling to ensure standard natural scrolling
        cards.forEach((card) => {
          gsap.set(card, { clearProps: "all" });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleBookCTA = () => {
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectService = (name, price) => {
    setBookingData(prev => ({ ...prev, service: name, servicePrice: price }));
    setBookingStep(2);
  };

  const handleSelectGroomer = (name) => {
    setBookingData(prev => ({ ...prev, groomer: name }));
    setBookingStep(3);
  };

  const handleSelectDate = (date) => {
    setBookingData(prev => ({ ...prev, date }));
  };

  const handleSelectTime = (timeSlot) => {
    setBookingData(prev => ({ ...prev, timeSlot }));
    setBookingStep(4);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.clientName || !bookingData.phone || !bookingData.petName) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
    setBookingStep(5);
  };

  const handleResetBooking = () => {
    setBookingData({
      breedType: 'toy',
      service: '',
      servicePrice: '',
      groomer: '',
      date: '',
      timeSlot: '',
      clientName: '',
      petName: '',
      phone: ''
    });
    setBookingStep(1);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-x-hidden selection:bg-accent/20 selection:text-primary">
      
      {/* Floating Island Navbar */}
      <nav 
        ref={navbarRef}
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[92%] md:w-[85%] max-w-7xl z-50 py-4 md:py-5 px-6 md:px-8 rounded-full border border-transparent flex justify-between items-center transition-all duration-300"
        style={{ transform: "translateX(-50%)" }}
      >
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-cream overflow-hidden transition-transform duration-300 group-hover:rotate-12">
            <Scissors size={14} />
          </div>
          <span className="font-heading font-extrabold text-sm md:text-base tracking-tight text-primary">
            BARK & SHIMMER
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-primary">
          <a href="#services" className="hover:text-accent transition-colors duration-200 hover:-translate-y-[1px] transform">Услуги & Прайс</a>
          <a href="#beforeafter" className="hover:text-accent transition-colors duration-200 hover:-translate-y-[1px] transform">Результаты</a>
          <a href="#masters" className="hover:text-accent transition-colors duration-200 hover:-translate-y-[1px] transform">Мастера</a>
          <a href="#protocol" className="hover:text-accent transition-colors duration-200 hover:-translate-y-[1px] transform">Протокол ухода</a>
          <a href="#loyalty" className="hover:text-accent transition-colors duration-200 hover:-translate-y-[1px] transform">Клуб</a>
        </div>

        {/* CTA Button */}
        <button 
          onClick={handleBookCTA}
          className="hidden md:block relative overflow-hidden bg-primary text-cream font-sans text-xs md:text-sm font-semibold py-2.5 px-5 rounded-full group cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
        >
          <span className="relative z-10">Записаться на сеанс</span>
          <span className="absolute inset-0 bg-accent translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0" />
        </button>

        {/* Mobile Menu Icon */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-primary hover:text-accent transition-colors duration-200 p-1"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-cream/95 backdrop-blur-xl flex flex-col justify-center items-center gap-8 md:hidden">
          <a 
            href="#services" 
            onClick={() => setMobileMenuOpen(false)}
            className="font-heading font-bold text-xl text-primary hover:text-accent transition-colors"
          >
            Услуги & Прайс
          </a>
          <a 
            href="#beforeafter" 
            onClick={() => setMobileMenuOpen(false)}
            className="font-heading font-bold text-xl text-primary hover:text-accent transition-colors"
          >
            Результаты
          </a>
          <a 
            href="#masters" 
            onClick={() => setMobileMenuOpen(false)}
            className="font-heading font-bold text-xl text-primary hover:text-accent transition-colors"
          >
            Мастера
          </a>
          <a 
            href="#protocol" 
            onClick={() => setMobileMenuOpen(false)}
            className="font-heading font-bold text-xl text-primary hover:text-accent transition-colors"
          >
            Протокол ухода
          </a>
          <a 
            href="#loyalty" 
            onClick={() => setMobileMenuOpen(false)}
            className="font-heading font-bold text-xl text-primary hover:text-accent transition-colors"
          >
            Клуб
          </a>
          <button 
            onClick={() => { setMobileMenuOpen(false); handleBookCTA(); }}
            className="bg-accent text-cream font-sans text-md font-bold py-3 px-6 rounded-full shadow-lg"
          >
            Записаться
          </button>
        </div>
      )}

      {/* Hero Section */}
      <header id="hero" className="relative h-screen w-full overflow-hidden flex items-end">
        {/* Background Image & Gradient Overlays */}
        <div className="absolute inset-0 bg-[#1A1A1A] z-0">
          <img 
            src={IMAGES.hero} 
            alt="Bark & Shimmer Premium Dog Grooming" 
            className="w-full h-full object-cover object-center opacity-45 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-charcoal/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-transparent to-transparent" />
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-12 md:pb-24 flex flex-col justify-end h-full">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 bg-cream/10 backdrop-blur-md border border-cream/20 text-cream px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-data mb-4 md:mb-6">
              <Sparkles size={12} className="text-accent" /> БОТАНИЧЕСКИЙ СПА ДЛЯ ПИТОМЦЕВ
            </span>
            
            <h1 className="leading-tight text-cream mb-4 md:mb-6 select-none flex flex-col break-words">
              <span className="hero-title-part1 font-heading font-black text-2xl sm:text-4xl md:text-6xl lg:text-7xl tracking-tighter">
                Органический уход — это
              </span>
              <span className="hero-title-part2 font-drama italic text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-accent leading-none mt-1">
                Совершенство.
              </span>
            </h1>
            
            <p className="hero-sub font-sans text-cream/80 text-sm sm:text-base md:text-xl max-w-xl mb-6 md:mb-8 leading-relaxed font-light">
              Премиальная забота о здоровье шерсти и кожи вашего питомца в атмосфере абсолютного психологического комфорта. Без стресса, без агрессивной химии.
            </p>
            
            <div className="hero-cta-btn flex flex-wrap gap-3 items-center">
              <button 
                onClick={handleBookCTA}
                className="relative overflow-hidden bg-accent text-cream font-sans font-bold py-3.5 px-6 md:px-8 rounded-full flex items-center gap-2.5 text-xs md:text-sm group transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Записаться на сеанс <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-primary translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0" />
              </button>
              
              <a 
                href="#services"
                className="border border-cream/20 hover:border-cream/50 text-cream bg-cream/5 font-sans font-medium py-3.5 px-6 md:px-8 rounded-full text-xs md:text-sm transition-all duration-300 flex items-center gap-1.5"
              >
                Изучить меню услуг
              </a>
            </div>
          </div>
        </div>

        {/* Minimal Scroll Indicator */}
        <div className="absolute right-12 bottom-12 hidden lg:flex flex-col items-center gap-3 text-cream/40 text-xs tracking-widest font-data">
          <span className="rotate-90 origin-right translate-x-[30px]">SCROLL DOWN</span>
          <div className="w-[1px] h-12 bg-cream/20 relative overflow-hidden mt-4">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-pulse-slow" />
          </div>
        </div>
      </header>

      {/* Features Section - Interactive UIs */}
      <section className="features-section py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto bg-cream">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <span className="text-accent font-data text-xs md:text-sm uppercase tracking-wider block mb-2">// ТРИ СТОЛПА НАШЕЙ РАБОТЫ</span>
          <h2 className="font-heading font-extrabold text-2xl md:text-5xl text-primary leading-tight">
            Инновационная забота, воплощенная в цифрах и процессах
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Card 1: Diagnostic Shuffler */}
          <div className="feature-card bg-[#EBE8DF] border border-primary/5 rounded-[2rem] p-6 md:p-8 shadow-sm flex flex-col justify-between min-h-fit md:min-h-[460px] relative overflow-hidden">
            <div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 md:mb-6">
                <Scissors size={20} />
              </div>
              <h3 className="font-heading font-bold text-xl md:text-2xl text-primary mb-2">
                1. Породный стайлинг
              </h3>
              <p className="font-sans text-primary/70 text-xs md:text-sm mb-6 leading-relaxed">
                Индивидуальное моделирование по выставочным канонам и авторским техникам в зависимости от типа шерсти.
              </p>
            </div>

            {/* Shuffler UI Simulator */}
            <div className="relative h-44 w-full flex items-center justify-center mt-4">
              {shufflerCards.map((card, idx) => {
                let zIndex = 30 - idx;
                let opacity = 1 - idx * 0.15;
                let scale = 1 - idx * 0.08;
                let yOffset = idx * 14;

                return (
                  <div
                    key={card.id}
                    className="absolute w-full bg-cream border border-primary/10 rounded-[1.5rem] p-4 shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{
                      transform: `translateY(${yOffset}px) scale(${scale})`,
                      zIndex: zIndex,
                      opacity: opacity,
                    }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] uppercase font-data text-accent tracking-widest">// СТАНДАРТ ПОРОДЫ</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                    </div>
                    <h4 className="font-heading font-bold text-xs md:text-sm text-primary">{card.title}</h4>
                    <p className="font-sans text-[11px] text-primary/60 mt-1">{card.desc}</p>
                    <div className="mt-2 pt-2 border-t border-primary/5 flex items-center justify-between text-[8px] font-data text-primary/45">
                      <span>{card.detail}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 2: Telemetry Typewriter */}
          <div className="feature-card bg-[#EBE8DF] border border-primary/5 rounded-[2rem] p-6 md:p-8 shadow-sm flex flex-col justify-between min-h-fit md:min-h-[460px]">
            <div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 md:mb-6">
                <Heart size={20} />
              </div>
              <h3 className="font-heading font-bold text-xl md:text-2xl text-primary mb-2">
                2. Спа-терапия кожи
              </h3>
              <p className="font-sans text-primary/70 text-xs md:text-sm mb-6 leading-relaxed">
                Глубокий оздоровительный спа-протокол на основе натуральной дерматокосметики и озонового насыщения клеток.
              </p>
            </div>

            {/* Telemetry Monospace Console */}
            <div className="bg-[#1e2320] border border-primary/20 rounded-[1.5rem] p-4 md:p-5 h-44 flex flex-col justify-between font-data text-xs text-[#a3bfae] overflow-hidden">
              <div className="flex items-center justify-between border-b border-cream/10 pb-2 mb-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="font-bold text-[9px] md:text-[10px] text-cream tracking-wide uppercase">СПА-ТЕРАПИЯ // LIVE FEED</span>
                </span>
                <span className="text-[9px] md:text-[10px] opacity-50">37.2°C</span>
              </div>
              
              <div className="flex-1 flex flex-col gap-1.5 justify-start text-[10px] md:text-[11px] leading-tight select-none">
                <p className="min-h-12">{typewriterText}</p>
                <div className="text-[8px] md:text-[9px] opacity-40 mt-auto border-t border-cream/5 pt-1.5 flex justify-between">
                  <span>АКТИВНАЯ ФОРМУЛА: BOTANICAL SPA V2</span>
                  <span>pH: 6.5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Cursor Protocol Scheduler */}
          <div className="feature-card bg-[#EBE8DF] border border-primary/5 rounded-[2rem] p-6 md:p-8 shadow-sm flex flex-col justify-between min-h-fit md:min-h-[460px]">
            <div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 md:mb-6">
                <Shield size={20} />
              </div>
              <h3 className="font-heading font-bold text-xl md:text-2xl text-primary mb-2">
                3. Стресс-фри мониторинг
              </h3>
              <p className="font-sans text-primary/70 text-xs md:text-sm mb-6 leading-relaxed">
                100% психологический комфорт с зоопсихологами и прямая видеотрансляция процесса для спокойствия владельца.
              </p>
            </div>

            {/* Scheduler Simulator Component */}
            <div className="bg-cream border border-primary/10 rounded-[1.5rem] p-4 md:p-5 h-44 flex flex-col justify-between relative overflow-hidden select-none">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-data text-primary/60 tracking-wider">ГРУМИНГ-РАСПИСАНИЕ</span>
                <span className="text-[9px] font-bold text-accent uppercase font-data bg-accent/10 px-2 py-0.5 rounded">
                  {schedulerStep === 'success' ? "ЗАПИСАНО" : "СВОБОДНО"}
                </span>
              </div>

              {/* Day Grid */}
              <div className="grid grid-cols-7 gap-1 text-center font-sans text-[10px] md:text-xs">
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, idx) => {
                  const isActive = schedulerDay === idx && schedulerStep !== 'idle';
                  return (
                    <div 
                      key={day} 
                      className={`p-1.5 md:p-2 rounded-lg transition-colors duration-300 flex flex-col gap-0.5 items-center justify-center border ${
                        isActive 
                          ? 'bg-accent text-cream border-accent' 
                          : 'bg-primary/5 text-primary/75 border-transparent'
                      }`}
                    >
                      <span className="text-[8px] md:text-[9px] block opacity-60 font-semibold">{day}</span>
                      <span className="w-1 h-1 rounded-full bg-current" />
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center text-[8px] md:text-[10px] font-data text-primary/50 mt-2 border-t border-primary/5 pt-2">
                <span>ВРЕМЯ: 15:00</span>
                <span>МАСТЕР: ЕЛЕНА</span>
              </div>

              {/* Virtual SVG Cursor Simulator Overlay */}
              <div 
                className="absolute w-3.5 h-3.5 text-accent transition-all duration-1000 pointer-events-none"
                style={{
                  top: schedulerStep === 'idle' ? '90%' : schedulerStep === 'moving' ? '45%' : '45%',
                  left: schedulerStep === 'idle' ? '90%' : schedulerStep === 'moving' ? `${(schedulerDay * 12) + 12}%` : `${(schedulerDay * 12) + 12}%`,
                  opacity: schedulerStep === 'idle' ? 0 : 1,
                  transform: schedulerStep === 'click' ? 'scale(0.8)' : 'scale(1)'
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M4.5 3v15.25l4.5-4.5 3.25 7 2.25-1-3.25-7H16L4.5 3z" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Services Menu & Price List */}
      <section id="services" className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-accent font-data text-xs md:text-sm uppercase tracking-wider block mb-2">// УСЛУГИ ПО ПОРОДАМ</span>
            <h2 className="font-heading font-extrabold text-2xl md:text-5xl text-primary">
              Программы ухода
            </h2>
            <p className="font-sans text-primary/70 mt-3 md:mt-4 text-xs md:text-base leading-relaxed">
              Выверенный до минут спа-протокол, составленный с учетом анатомии питомца, типа его кожи, шерсти и психоэмоционального типа.
            </p>
          </div>

          {/* Navigation Pill Filters */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#EBE8DF] border border-primary/5 rounded-full self-start">
            {SERVICE_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`py-2.5 px-4 md:py-3 md:px-6 rounded-full font-sans text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id 
                    ? 'bg-primary text-cream shadow-md' 
                    : 'text-primary/70 hover:text-primary'
                }`}
              >
                {cat.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Current Active Category Description */}
        <div className="mb-8 p-4 md:p-6 bg-[#EBE8DF]/40 border-l-4 border-accent rounded-r-xl md:rounded-r-2xl">
          <p className="font-sans font-semibold text-xs md:text-base text-primary">{SERVICE_CATEGORIES.find(c => c.id === activeCategory)?.name}</p>
          <p className="font-sans text-[10px] md:text-xs text-primary/60 mt-1">{SERVICE_CATEGORIES.find(c => c.id === activeCategory)?.description}</p>
        </div>

        {/* Services List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {SERVICES[activeCategory].map((svc, idx) => (
            <div 
              key={idx}
              className="bg-cream border border-primary/10 rounded-[1.8rem] md:rounded-[2rem] p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:border-accent/40 group hover:shadow-md"
            >
              <div>
                <div className="flex justify-between items-start mb-4 md:mb-6">
                  <span className="text-accent font-data text-[10px] md:text-xs uppercase bg-accent/10 px-2.5 py-1 rounded-full">
                    {svc.duration}
                  </span>
                  <span className="font-heading font-black text-lg md:text-xl text-primary">
                    {svc.price}
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-lg md:text-xl text-primary mb-3 group-hover:text-accent transition-colors">
                  {svc.name}
                </h3>
                <p className="font-sans text-primary/70 text-xs md:text-sm leading-relaxed mb-6 md:mb-8">
                  {svc.desc}
                </p>
              </div>

              <button 
                onClick={() => {
                  setBookingData(prev => ({ 
                    ...prev, 
                    breedType: activeCategory, 
                    service: svc.name, 
                    servicePrice: svc.price 
                  }));
                  setBookingStep(2);
                  handleBookCTA();
                }}
                className="w-full py-3.5 bg-primary/5 hover:bg-accent text-primary hover:text-cream rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 group cursor-pointer"
              >
                Выбрать комплекс <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Additional Care Wellness Addons */}
        <div className="mt-12 md:mt-16 bg-[#2E4036] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 text-cream">
          <div className="max-w-xl mb-8 md:mb-12">
            <span className="text-accent font-data text-xs uppercase tracking-widest block mb-2">// МАКСИМАЛЬНЫЙ ЭФФЕКТ</span>
            <h3 className="font-heading font-extrabold text-xl md:text-3xl">
              Рекомендованный дополнительный уход
            </h3>
            <p className="font-sans text-cream/70 text-xs md:text-sm mt-2 md:mt-3">
              Добавьте к базовому комплексу специализированные спа-процедуры для профилактики кожных заболеваний и укрепления луковиц.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {ADDITIONAL_CARE.map((addon, index) => (
              <div 
                key={index}
                className="bg-charcoal/20 border border-cream/10 rounded-[1.5rem] md:rounded-[1.8rem] p-5 md:p-6 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between min-h-48 md:h-56"
              >
                <div>
                  <div className="flex justify-between items-center mb-3 md:mb-4 gap-2">
                    <span className="font-heading font-extrabold text-sm text-cream truncate">{addon.name}</span>
                    <span className="font-data font-bold text-accent text-xs md:text-sm shrink-0">{addon.price}</span>
                  </div>
                  <p className="font-sans text-cream/65 text-[11px] md:text-xs leading-relaxed line-clamp-3">
                    {addon.desc}
                  </p>
                </div>
                
                <button 
                  onClick={() => {
                    setBookingData(prev => ({
                      ...prev,
                      service: prev.service ? `${prev.service} + ${addon.name}` : addon.name,
                      servicePrice: prev.servicePrice ? `${prev.servicePrice} & ${addon.price}` : addon.price
                    }));
                    handleBookCTA();
                  }}
                  className="w-full text-center text-accent text-xs font-bold mt-4 uppercase hover:text-cream transition-colors flex items-center justify-center gap-1"
                >
                  <Sparkles size={12} /> Добавить в запись
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Draggable Slider Gallery */}
      <section id="beforeafter" className="py-16 md:py-24 bg-[#EBE8DF]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 md:gap-16 px-6">
          <div className="w-full lg:w-1/2">
            <span className="text-accent font-data text-xs md:text-sm uppercase tracking-wider block mb-2">// ТРАНСФОРМАЦИЯ</span>
            <h2 className="font-heading font-extrabold text-2xl md:text-5xl text-primary mb-4 md:mb-6 leading-tight">
              Безупречный результат, подтвержденный фактами
            </h2>
            <p className="font-sans text-primary/70 text-sm md:text-lg mb-6 md:mb-8 leading-relaxed font-light">
              Мы гордимся тем, как меняется не только внешний вид питомца, но и его самочувствие. Мягкая блестящая шерсть без колтунов, чистые здоровые уши и искренняя радость в глазах.
            </p>
            <div className="flex flex-col gap-3 font-sans text-xs md:text-sm text-primary/80">
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-accent/15 flex items-center justify-center text-accent shrink-0">
                  <CheckCircle size={12} />
                </div>
                <span>Глубокий разбор подшерстка без выщипывания здорового волоса</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-accent/15 flex items-center justify-center text-accent shrink-0">
                  <CheckCircle size={12} />
                </div>
                <span>Бережная сушка бесшумными компрессорами для снижения стресса</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-accent/15 flex items-center justify-center text-accent shrink-0">
                  <CheckCircle size={12} />
                </div>
                <span>Косметика премиум-класса с натуральными экстрактами (Италия)</span>
              </div>
            </div>
          </div>

          {/* Interactive Split Slider Container - Pixel-Perfect Clip Path Alignment */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-[500px] aspect-[4/3] sm:aspect-square rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-primary/10 shadow-lg select-none">
              
              {/* After (Bottom Layer) */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={IMAGES.after} 
                  alt="После ухода" 
                  className="w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute right-4 bottom-4 bg-[#2E4036] text-cream px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  ПОСЛЕ
                </div>
              </div>

              {/* Before (Top Layer, Clipped Width via clipPath for perfect align) - No transition classes for instant tracking */}
              <div 
                className="absolute inset-0 w-full h-full"
                style={{ clipPath: `inset(0 ${100 - sliderVal}% 0 0)` }}
              >
                <img 
                  src={IMAGES.before} 
                  alt="До ухода" 
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute left-4 bottom-4 bg-charcoal text-cream px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider z-20">
                  ДО
                </div>
              </div>

              {/* Invisible input range covering the area for perfect dragging */}
              <input 
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => setSliderVal(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              />

              {/* Slider Separator Line */}
              <div 
                className="absolute top-0 bottom-0 w-[2.5px] bg-accent z-20 pointer-events-none"
                style={{ left: `${sliderVal}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-accent border-4 border-cream shadow-md flex items-center justify-center text-cream">
                  <Camera size={14} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Master Groomers Section */}
      <section id="masters" className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20 max-w-2xl mx-auto">
          <span className="text-accent font-data text-xs md:text-sm uppercase tracking-wider block mb-2">// КОМАНДА ЭКСПЕРТОВ</span>
          <h2 className="font-heading font-extrabold text-2xl md:text-5xl text-primary mb-4 md:mb-6">
            Мастера скульптурного силуэта
          </h2>
          <p className="font-sans text-primary/70 text-xs md:text-base leading-relaxed">
            Наши грумеры — сертифицированные специалисты с фундаментальными знаниями зоопсихологии и анатомии шерсти. Мы регулярно повышаем квалификацию у мировых экспертов.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {MASTERS.map((master, idx) => (
            <div 
              key={idx}
              className="bg-cream border border-primary/10 rounded-[2rem] overflow-hidden group hover:border-accent/40 transition-all duration-300 hover:shadow-md"
            >
              <div className="h-64 sm:h-80 overflow-hidden relative">
                <img 
                  src={master.image} 
                  alt={master.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-cream text-[10px] font-data flex items-center gap-1.5 uppercase tracking-wide">
                    <Award size={12} className="text-accent" /> Дипломы европейской ассоциации
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <span className="text-[9px] md:text-[10px] font-data text-accent uppercase tracking-widest block mb-1">
                  {master.experience}
                </span>
                <h3 className="font-heading font-bold text-lg md:text-xl text-primary mb-1 md:mb-2">
                  {master.name}
                </h3>
                <p className="text-primary font-sans text-xs md:text-sm font-semibold mb-3 md:mb-4 opacity-75">
                  {master.role}
                </p>
                <p className="font-sans text-primary/60 text-xs leading-relaxed">
                  {master.specialty}
                </p>

                <button 
                  onClick={() => {
                    setBookingData(prev => ({ ...prev, groomer: master.name }));
                    setBookingStep(3);
                    handleBookCTA();
                  }}
                  className="w-full mt-5 md:mt-6 py-2.5 md:py-3 border border-primary/20 hover:border-accent hover:text-accent rounded-full font-sans text-xs font-bold uppercase transition-colors duration-300 cursor-pointer"
                >
                  Выбрать мастера
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Block (The Manifesto) */}
      <section className="philosophy-section relative py-20 md:py-32 bg-[#2E4036] overflow-hidden text-cream">
        {/* Parallax Texture Overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.06] mix-blend-luminosity">
          <img 
            src={IMAGES.texture} 
            alt="Organic Moss Texture" 
            className="w-full h-full object-cover object-center scale-110"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <span className="text-accent font-data text-xs uppercase tracking-widest block mb-4 md:mb-6">// НАШ МАНИФЕСТ</span>
          
          <div className="manifesto-text-block mb-8 md:mb-12">
            <p className="font-sans text-cream/40 text-[10px] md:text-xs tracking-widest uppercase mb-3">
              ОБЩЕПРИНЯТЫЙ ПОДХОД
            </p>
            <h3 className="font-heading font-light text-lg sm:text-2xl md:text-4xl text-cream/70 leading-relaxed max-w-3xl">
              Большинство салонов фокусируются на: <span className="underline decoration-accent/50 text-cream">скорости обслуживания</span>, конвейерной загрузке и жесткой фиксации животных для экономии времени.
            </h3>
          </div>

          <div className="w-12 h-[1px] bg-accent/30 my-2" />

          <div className="manifesto-text-block mt-6 md:mt-8">
            <p className="font-sans text-accent text-xs md:text-sm tracking-widest uppercase mb-3 font-bold">
              ФИЛОСОФИЯ BARK & SHIMMER
            </p>
            <h3 className="font-heading font-bold text-2xl sm:text-4xl md:text-6xl text-cream leading-tight break-words">
              Мы фокусируемся на: <span className="font-drama italic text-accent font-normal block md:inline text-3xl sm:text-5xl md:text-7xl mt-1">Органическом комфорте</span> и индивидуальной психологии каждого питомца.
            </h3>
          </div>
        </div>
      </section>

      {/* Protocol Block (Sticky Stacking Archive) */}
      <section id="protocol" className="protocol-section bg-cream relative lg:h-screen lg:w-full lg:overflow-hidden">
        
        {/* Card 1: Diagnostic Step */}
        <div className="stacking-card relative lg:absolute lg:inset-0 min-h-fit lg:min-h-screen w-full bg-[#EBE8DF] flex items-center py-16 md:py-20 lg:py-0 px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="font-data text-[10px] md:text-xs uppercase text-accent tracking-widest block mb-2">// ШАГ 01 // СЕНСОРНЫЙ АНАЛИЗ</span>
              <h3 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl text-primary mb-4 md:mb-6">
                Дерматологическая диагностика
              </h3>
              <p className="font-sans text-primary/75 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 font-light">
                Перед купанием каждый мастер проводит осмотр шерсти и замер pH-баланса кожи. Это исключает аллергию и позволяет подобрать идеальную формулу ухода: от восстанавливающей маски до деликатного очищения.
              </p>
              <div className="font-data text-[10px] md:text-xs text-primary/50 flex flex-col gap-1.5">
                <span>[X] pH-метр калиброван</span>
                <span>[X] Анализ плотности подшерстка</span>
                <span>[X] Проверка на чувствительность кожи</span>
              </div>
            </div>

            {/* Canvas/SVG Animation Simulation: Rotating motif */}
            <div className="flex justify-center mt-6 lg:mt-0">
              <div className="relative w-56 h-56 md:w-80 md:h-80 flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-primary/5 rounded-full animate-[spin_30s_linear_infinite]" />
                <div className="absolute inset-4 border border-dashed border-accent/20 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-8 border-2 border-primary/10 rounded-full animate-[spin_10s_linear_reverse_infinite]" />
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-cream border border-primary/10 flex items-center justify-center shadow-lg relative overflow-hidden">
                  <div className="text-center">
                    <span className="font-data text-2xl md:text-3xl font-black text-primary block">6.5</span>
                    <span className="font-sans text-[9px] md:text-[10px] text-accent font-bold uppercase tracking-wider block mt-1">ОПТИМАЛЬНЫЙ PH</span>
                  </div>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 items-center">
                    <div className="w-1 h-2 bg-accent/60 rounded-full animate-bounce" />
                    <div className="w-1 h-4 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1 h-2 bg-accent/60 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Detox Step */}
        <div className="stacking-card relative lg:absolute lg:inset-0 min-h-fit lg:min-h-screen w-full bg-[#E3E0D6] flex items-center py-16 md:py-20 lg:py-0 px-6 md:px-12 z-20">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="font-data text-[10px] md:text-xs uppercase text-accent tracking-widest block mb-2">// ШАГ 02 // БИО-ОЧИЩЕНИЕ</span>
              <h3 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl text-primary mb-4 md:mb-6">
                Озоновое гидромассажное очищение
              </h3>
              <p className="font-sans text-primary/75 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 font-light">
                Насыщенная нано-пузырьками кислорода теплая ванна глубоко проникает в поры. Аминокислоты и натуральные экстракты итальянской косметики удаляют загрязнения, расслабляя мышцы и суставы собаки.
              </p>
              <div className="font-data text-[10px] md:text-xs text-primary/50 flex flex-col gap-1.5">
                <span>[X] Трехфазное бережное мытье</span>
                <span>[X] Озонотерапия с массажем лап</span>
                <span>[X] Кондиционирование фитоэкстрактами</span>
              </div>
            </div>

            {/* Canvas/SVG Animation Simulation: Laser scan line */}
            <div className="flex justify-center mt-6 lg:mt-0">
              <div className="w-56 h-56 md:w-80 md:h-80 bg-cream rounded-3xl border border-primary/10 shadow-lg relative overflow-hidden p-5 flex flex-col justify-between">
                <div className="flex justify-between items-center text-[9px] md:text-[10px] font-data text-primary/60 border-b border-primary/5 pb-1.5">
                  <span>ОЧИЩЕНИЕ ПОР</span>
                  <span>АКТИВНО: 100%</span>
                </div>
                
                <div className="relative flex-1 my-3 grid grid-cols-6 grid-rows-6 gap-2">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-primary/20 mx-auto my-auto" />
                  ))}
                  <div className="absolute left-0 right-0 h-1 bg-accent/80 shadow-[0_0_10px_#CC5833] animate-laser pointer-events-none" />
                </div>

                <div className="text-[8px] md:text-[9px] font-data text-accent flex items-center justify-between">
                  <span>НАСЫЩЕНИЕ КИСЛОРОДОМ</span>
                  <span>ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Sculpting Step */}
        <div className="stacking-card relative lg:absolute lg:inset-0 min-h-fit lg:min-h-screen w-full bg-[#DBD7CB] flex items-center py-16 md:py-20 lg:py-0 px-6 md:px-12 z-30">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="font-data text-[10px] md:text-xs uppercase text-accent tracking-widest block mb-2">// ШАГ 03 // СКУЛЬПТУРА И ОБЪЕМ</span>
              <h3 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl text-primary mb-4 md:mb-6">
                Выверенный силуэт
              </h3>
              <p className="font-sans text-primary/75 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 font-light">
                Финальная стрижка выполняется профессиональными ножницами по естественным линиям движения питомца. Мы не используем машинку для бритья там, где это вредит структуре подшерстка, создавая плавные силуэты.
              </p>
              <div className="font-data text-[10px] md:text-xs text-primary/50 flex flex-col gap-1.5">
                <span>[X] Стрижка ножницами по породе</span>
                <span>[X] Укладка воздухом низкой температуры</span>
                <span>[X] Парфюмированный финиш</span>
              </div>
            </div>

            {/* Canvas/SVG Animation Simulation: Pulsing EKG wave */}
            <div className="flex justify-center mt-6 lg:mt-0">
              <div className="w-56 h-56 md:w-80 md:h-80 bg-[#1e2320] rounded-3xl border border-primary/20 shadow-lg relative overflow-hidden p-5 flex flex-col justify-between">
                <div className="flex justify-between items-center text-[9px] md:text-[10px] font-data text-[#a3bfae] border-b border-cream/10 pb-1.5">
                  <span>РЕСПИРАТОРНЫЙ ИНДЕКС</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> NORMAL</span>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <svg className="w-full h-20 text-accent" viewBox="0 0 200 100" fill="none">
                    <path 
                      d="M0 50 L50 50 L60 30 L70 70 L80 10 L90 90 L100 50 L200 50" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeDasharray="400"
                      strokeDashoffset="0"
                      style={{
                        animation: "dash 2s linear infinite"
                      }}
                    />
                  </svg>
                </div>

                <div className="text-[8px] md:text-[9px] font-data text-[#a3bfae]/50 flex justify-between">
                  <span>СТРЕСС-ФРИ ПРИНЦИП</span>
                  <span>ЧСС: СТАБИЛЬНЫЙ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Loyalty Program (Premium Club) */}
      <section id="loyalty" className="py-16 md:py-24 px-6 md:px-12 bg-cream border-t border-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
            <span className="text-accent font-data text-xs md:text-sm uppercase tracking-wider block mb-2">// КЛУБ ПРИВИЛЕГИЙ</span>
            <h2 className="font-heading font-extrabold text-2xl md:text-5xl text-primary mb-4 md:mb-6">
              Программа лояльности
            </h2>
            <p className="font-sans text-primary/70 text-xs md:text-base leading-relaxed">
              Станьте участником закрытого клуба Bark & Shimmer. Накапливайте кэшбек, пользуйтесь приоритетной записью и получайте комплименты от салона при каждом визите.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            
            {/* Card 1: Essential */}
            <div className="bg-[#EBE8DF]/50 border border-primary/10 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between min-h-[380px] md:h-[420px]">
              <div>
                <span className="text-[10px] font-data text-primary/50 tracking-widest block mb-1">КЛАССИКА</span>
                <h3 className="font-heading font-bold text-xl md:text-2xl text-primary mb-3">Essential</h3>
                <div className="text-3xl md:text-4xl font-heading font-black text-primary mb-5">10% <span className="text-xs font-sans font-normal text-primary/60">кэшбек баллами</span></div>
                
                <ul className="font-sans text-xs text-primary/75 flex flex-col gap-2.5">
                  <li className="flex items-center gap-2">✓ Начисление баллов с первой услуги</li>
                  <li className="flex items-center gap-2">✓ Доступ к онлайн-истории ухода питомца</li>
                  <li className="flex items-center gap-2">✓ Консультации нутрициолога со скидкой 10%</li>
                </ul>
              </div>

              <button 
                onClick={handleBookCTA}
                className="w-full mt-6 py-3.5 border border-primary/20 hover:border-accent hover:text-accent rounded-full text-xs font-bold uppercase transition-all duration-300"
              >
                Вступить в клуб
              </button>
            </div>

            {/* Card 2: Performance (Gold Pop) */}
            <div className="bg-primary text-cream border border-accent/20 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between min-h-[380px] md:h-[420px] relative shadow-lg lg:transform lg:-translate-y-4">
              <div className="absolute top-6 right-6 text-accent">
                <Crown size={20} />
              </div>
              
              <div>
                <span className="text-[10px] font-data text-accent tracking-widest block mb-1 font-bold">// ПОПУЛЯРНО</span>
                <h3 className="font-heading font-bold text-xl md:text-2xl text-cream mb-3">Performance</h3>
                <div className="text-3xl md:text-4xl font-heading font-black text-accent mb-5">15% <span className="text-xs font-sans font-normal text-cream/60">кэшбек баллами</span></div>
                
                <ul className="font-sans text-xs text-cream/80 flex flex-col gap-2.5">
                  <li className="flex items-center gap-2">✓ Все привилегии уровня Essential</li>
                  <li className="flex items-center gap-2">✓ Приоритетная запись в праздничные дни</li>
                  <li className="flex items-center gap-2">✓ Бесплатная озонотерапия при каждом 4-м визите</li>
                </ul>
              </div>

              <button 
                onClick={handleBookCTA}
                className="w-full mt-6 py-3.5 bg-accent hover:bg-cream text-cream hover:text-primary rounded-full text-xs font-bold uppercase transition-all duration-300"
              >
                Оформить подписку
              </button>
            </div>

            {/* Card 3: Elite */}
            <div className="bg-[#EBE8DF]/50 border border-primary/10 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between min-h-[380px] md:h-[420px]">
              <div>
                <span className="text-[10px] font-data text-primary/50 tracking-widest block mb-1">МАКСИМУМ</span>
                <h3 className="font-heading font-bold text-xl md:text-2xl text-primary mb-3">Elite</h3>
                <div className="text-3xl md:text-4xl font-heading font-black text-primary mb-5">20% <span className="text-xs font-sans font-normal text-primary/60">кэшбек баллами</span></div>
                
                <ul className="font-sans text-xs text-primary/75 flex flex-col gap-2.5">
                  <li className="flex items-center gap-2">✓ Все привилегии уровня Performance</li>
                  <li className="flex items-center gap-2">✓ Индивидуальный уходовый набор с собой</li>
                  <li className="flex items-center gap-2">✓ Бесплатный трансфер питомца в салон и обратно</li>
                </ul>
              </div>

              <button 
                onClick={handleBookCTA}
                className="w-full mt-6 py-3.5 border border-primary/20 hover:border-accent hover:text-accent rounded-full text-xs font-bold uppercase transition-all duration-300"
              >
                Стать VIP-клиентом
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Booking Widget / Booking Calendar Flow */}
      <section id="booking" className="py-16 md:py-24 px-6 md:px-12 bg-[#2E4036] text-cream">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-accent font-data text-xs uppercase tracking-widest block mb-2">// ОНЛАЙН-РЕЗЕРВИРОВАНИЕ</span>
            <h2 className="font-heading font-extrabold text-2xl md:text-5xl">
              Запись на спа-сеанс
            </h2>
            <p className="font-sans text-cream/70 text-xs md:text-sm mt-2 md:mt-3">
              Заполните пошаговую форму. Система автоматически сформирует цифровой посадочный талон для вашего любимца.
            </p>
          </div>

          <div className="bg-charcoal/30 border border-cream/10 rounded-[2rem] md:rounded-[3rem] p-5 md:p-12 shadow-2xl relative overflow-hidden">
            
            {/* Step Indicators */}
            <div className="flex justify-between items-center mb-8 md:mb-12 border-b border-cream/10 pb-4 md:pb-6 text-[10px] md:text-sm font-data">
              <span className={`pb-1.5 border-b-2 transition-all ${bookingStep >= 1 ? 'border-accent text-accent font-bold' : 'border-transparent text-cream/40'}`}>01. УСЛУГА</span>
              <span className={`pb-1.5 border-b-2 transition-all ${bookingStep >= 2 ? 'border-accent text-accent font-bold' : 'border-transparent text-cream/40'}`}>02. МАСТЕР</span>
              <span className={`pb-1.5 border-b-2 transition-all ${bookingStep >= 3 ? 'border-accent text-accent font-bold' : 'border-transparent text-cream/40'}`}>03. ДАТА</span>
              <span className={`pb-1.5 border-b-2 transition-all ${bookingStep >= 4 ? 'border-accent text-accent font-bold' : 'border-transparent text-cream/40'}`}>04. ДАННЫЕ</span>
              <span className={`pb-1.5 border-b-2 transition-all ${bookingStep >= 5 ? 'border-accent text-accent font-bold' : 'border-transparent text-cream/40'}`}>05. БИЛЕТ</span>
            </div>

            {/* STEP 1: Service Selection */}
            {bookingStep === 1 && (
              <div>
                <h3 className="font-heading font-bold text-base md:text-xl mb-4 md:mb-6">Выберите размер питомца и услугу:</h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {SERVICE_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setBookingData(prev => ({ ...prev, breedType: cat.id }))}
                      className={`py-2 px-4 rounded-full text-xs font-semibold font-sans transition-all cursor-pointer ${
                        bookingData.breedType === cat.id ? 'bg-accent text-cream' : 'bg-cream/10 text-cream/70 hover:bg-cream/20'
                      }`}
                    >
                      {cat.name.split(' ')[0]}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SERVICES[bookingData.breedType].map((svc, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleSelectService(svc.name, svc.price)}
                      className={`p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border cursor-pointer transition-all flex flex-col justify-between hover:border-accent/50 ${
                        bookingData.service === svc.name ? 'border-accent bg-accent/15 shadow-md' : 'border-cream/10 bg-cream/5'
                      }`}
                    >
                      <div>
                        <h4 className="font-heading font-bold text-sm md:text-base mb-1">{svc.name}</h4>
                        <p className="font-sans text-[11px] md:text-xs text-cream/60 line-clamp-2 leading-relaxed">{svc.desc}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-cream/5 flex justify-between items-center text-xs font-data">
                        <span>{svc.duration}</span>
                        <span className="font-bold text-accent">{svc.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Groomer Selection */}
            {bookingStep === 2 && (
              <div>
                <h3 className="font-heading font-bold text-base md:text-xl mb-4 md:mb-6">Выберите мастера груминга:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                  {MASTERS.map((m, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectGroomer(m.name)}
                      className={`rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border cursor-pointer transition-all flex flex-col justify-between pb-4 md:pb-6 hover:border-accent/50 ${
                        bookingData.groomer === m.name ? 'border-accent bg-accent/15' : 'border-cream/10 bg-cream/5'
                      }`}
                    >
                      <img src={m.image} alt={m.name} className="h-36 md:h-44 w-full object-cover mb-3" />
                      <div className="px-4 md:px-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-heading font-bold text-sm md:text-base">{m.name}</h4>
                          <p className="font-sans text-[10px] md:text-xs text-accent mt-0.5 mb-1.5">{m.role.split('/')[0]}</p>
                        </div>
                        <p className="font-sans text-[10px] md:text-[11px] text-cream/60 leading-relaxed">{m.experience}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-between gap-4">
                  <button onClick={() => setBookingStep(1)} className="text-[10px] md:text-xs uppercase font-data font-bold border border-cream/20 hover:border-cream py-3 px-5 rounded-full">Назад</button>
                  <button onClick={() => bookingData.groomer && setBookingStep(3)} disabled={!bookingData.groomer} className="bg-accent hover:bg-cream hover:text-primary disabled:opacity-50 text-cream font-sans text-[10px] md:text-xs font-bold uppercase tracking-wider py-3 px-5 rounded-full">Далее</button>
                </div>
              </div>
            )}

            {/* STEP 3: Date & Time Picker */}
            {bookingStep === 3 && (
              <div>
                <h3 className="font-heading font-bold text-base md:text-xl mb-4 md:mb-6">Выберите дату и удобное время:</h3>
                
                {/* Date slots */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mb-6 md:mb-8">
                  {bookingDates.map((d, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectDate(d.date)}
                      className={`p-3 md:p-4 rounded-xl md:rounded-2xl border text-center cursor-pointer transition-all ${
                        bookingData.date === d.date ? 'border-accent bg-accent text-cream' : 'border-cream/10 bg-cream/5 hover:bg-cream/10'
                      }`}
                    >
                      <span className="block font-data text-[9px] opacity-60 uppercase">{d.day}</span>
                      <span className="block font-sans text-xs md:text-sm font-bold mt-0.5">{d.date.split(' ')[0]}</span>
                      <span className="block font-sans text-[8px] md:text-[9px] opacity-80">{d.date.split(' ')[1]}</span>
                    </div>
                  ))}
                </div>

                {/* Time slots */}
                <h4 className="font-sans text-[11px] md:text-xs uppercase font-bold text-cream/70 tracking-wider mb-3 md:mb-4">Доступные слоты:</h4>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {bookingTimes.map((t, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectTime(t)}
                      className={`py-2.5 px-4 md:py-3.5 md:px-6 rounded-xl border text-[10px] md:text-xs font-semibold font-data transition-all cursor-pointer ${
                        bookingData.timeSlot === t ? 'border-accent bg-accent/20 text-accent font-bold' : 'border-cream/10 bg-cream/5 hover:bg-cream/10'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex justify-between">
                  <button onClick={() => setBookingStep(2)} className="text-[10px] md:text-xs uppercase font-data font-bold border border-cream/20 hover:border-cream py-3 px-5 rounded-full">Назад</button>
                </div>
              </div>
            )}

            {/* STEP 4: Client Info Form */}
            {bookingStep === 4 && (
              <form onSubmit={handleFinalSubmit} className="space-y-4 md:space-y-6 max-w-md mx-auto">
                <h3 className="font-heading font-bold text-base md:text-xl text-center mb-4 md:mb-6">Введите ваши контактные данные:</h3>
                
                <div>
                  <label className="block text-[10px] md:text-xs uppercase font-data text-cream/60 mb-1.5 md:mb-2">Ваше Имя</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" size={16} />
                    <input 
                      type="text" 
                      required
                      placeholder="Александр" 
                      value={bookingData.clientName}
                      onChange={(e) => setBookingData(prev => ({ ...prev, clientName: e.target.value }))}
                      className="w-full bg-cream/5 border border-cream/10 rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-cream font-sans text-xs md:text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] md:text-xs uppercase font-data text-cream/60 mb-1.5 md:mb-2">Кличка любимца & Порода</label>
                  <div className="relative">
                    <Scissors className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" size={16} />
                    <input 
                      type="text" 
                      required
                      placeholder="Арчи, шпиц" 
                      value={bookingData.petName}
                      onChange={(e) => setBookingData(prev => ({ ...prev, petName: e.target.value }))}
                      className="w-full bg-cream/5 border border-cream/10 rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-cream font-sans text-xs md:text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] md:text-xs uppercase font-data text-cream/60 mb-1.5 md:mb-2">Номер телефона</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" size={16} />
                    <input 
                      type="tel" 
                      required
                      placeholder="+7 (999) 000-00-00" 
                      value={bookingData.phone}
                      onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-cream/5 border border-cream/10 rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-4 text-cream font-sans text-xs md:text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-between pt-2">
                  <button type="button" onClick={() => setBookingStep(3)} className="text-[10px] md:text-xs uppercase font-data font-bold border border-cream/20 hover:border-cream py-3 px-5 rounded-full">Назад</button>
                  <button type="submit" className="bg-accent hover:bg-cream hover:text-primary text-cream font-sans text-[10px] md:text-xs font-bold uppercase tracking-wider py-3 px-5 rounded-full flex items-center gap-1.5">Подтвердить запись <CheckCircle size={14} /></button>
                </div>
              </form>
            )}

            {/* STEP 5: Success Boarding Pass Ticket */}
            {bookingStep === 5 && (
              <div className="max-w-md mx-auto text-center space-y-6">
                
                {/* Boarding Pass Layout */}
                <div className="bg-cream text-primary rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-2xl border-4 border-dashed border-accent relative overflow-hidden select-none">
                  
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#2E4036] z-10" />
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#2E4036] z-10" />

                  <div className="flex justify-between items-center border-b border-primary/10 pb-4 mb-4">
                    <span className="font-heading font-black text-xs md:text-sm tracking-widest text-accent">BARK & SHIMMER</span>
                    <span className="font-data text-[9px] md:text-[10px] opacity-75">BOARDING PASS</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-left font-sans text-xs mb-6 break-words">
                    <div>
                      <span className="block text-[8px] md:text-[9px] uppercase font-data text-primary/50">// ПИТОМЕЦ</span>
                      <span className="font-bold text-xs md:text-sm text-primary">{bookingData.petName}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] md:text-[9px] uppercase font-data text-primary/50">// ВЛАДЕЛЕЦ</span>
                      <span className="font-bold text-xs md:text-sm text-primary">{bookingData.clientName}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-[8px] md:text-[9px] uppercase font-data text-primary/50">// УСЛУГА</span>
                      <span className="font-bold text-xs md:text-sm text-primary block w-full leading-snug">{bookingData.service}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] md:text-[9px] uppercase font-data text-primary/50">// СТОИМОСТЬ</span>
                      <span className="font-bold text-xs md:text-sm text-accent">{bookingData.servicePrice}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] md:text-[9px] uppercase font-data text-primary/50">// МАСТЕР</span>
                      <span className="font-bold text-xs md:text-sm text-primary">{bookingData.groomer}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-[8px] md:text-[9px] uppercase font-data text-primary/50">// ВРЕМЯ ЗАПИСИ</span>
                      <span className="font-bold text-xs md:text-sm text-primary">{bookingData.date}, {bookingData.timeSlot}</span>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-primary/20 pt-4 flex flex-col items-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/5 border border-primary/10 rounded-lg p-2 flex items-center justify-center mb-2">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
                        <rect x="10" y="10" width="20" height="20" fill="currentColor" />
                        <rect x="70" y="10" width="20" height="20" fill="currentColor" />
                        <rect x="10" y="70" width="20" height="20" fill="currentColor" />
                        <rect x="40" y="40" width="20" height="20" fill="currentColor" />
                        <rect x="40" y="10" width="10" height="20" fill="currentColor" />
                        <rect x="10" y="40" width="20" height="10" fill="currentColor" />
                        <rect x="70" y="40" width="10" height="30" fill="currentColor" />
                        <rect x="40" y="70" width="20" height="20" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="font-data text-[8px] md:text-[9px] opacity-50 uppercase tracking-widest">КОД ПОДТВЕРЖДЕНИЯ СКОПИРОВАН</span>
                  </div>

                </div>

                <div className="flex items-center justify-center gap-1.5 text-[10px] md:text-xs font-data text-accent">
                  <ShieldCheck size={14} /> <span>ЗАПИСЬ УСПЕШНО ЗАРЕГИСТРИРОВАНА В БАЗЕ</span>
                </div>

                <button 
                  onClick={handleResetBooking}
                  className="bg-cream text-primary font-sans text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-full hover:bg-accent hover:text-cream transition-all"
                >
                  Записать еще одного питомца
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-cream rounded-t-[3rem] md:rounded-t-[4rem] pt-16 md:pt-20 pb-8 px-6 md:px-12 border-t border-cream/5 z-20 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          
          <div className="md:col-span-2 space-y-4 md:space-y-6">
            <h3 className="font-heading font-extrabold text-xl md:text-2xl text-cream tracking-tight">BARK & SHIMMER</h3>
            <p className="font-sans text-cream/65 text-xs md:text-sm leading-relaxed max-w-md">
              Органический ботанический уход для питомцев премиум-класса. Скульптурная стрижка по выставочным канонам в психологически комфортных условиях.
            </p>
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-data text-[10px] md:text-xs text-cream/70 uppercase">
                Все системы активны // Камеры онлайн
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-data text-[10px] md:text-xs uppercase font-bold text-accent mb-4 md:mb-6 tracking-widest">// НАВИГАЦИЯ</h4>
            <ul className="space-y-2 md:space-y-3 font-sans text-xs md:text-sm text-cream/60">
              <li><a href="#services" className="hover:text-cream transition-colors">Услуги & Стоимость</a></li>
              <li><a href="#beforeafter" className="hover:text-cream transition-colors">Портфолио до/после</a></li>
              <li><a href="#masters" className="hover:text-cream transition-colors">Наши топ-мастера</a></li>
              <li><a href="#protocol" className="hover:text-cream transition-colors">Протокол ухода</a></li>
              <li><a href="#loyalty" className="hover:text-cream transition-colors">Клуб лояльности</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-data text-[10px] md:text-xs uppercase font-bold text-accent mb-4 md:mb-6 tracking-widest">// КОНТАКТЫ</h4>
            <ul className="space-y-2 md:space-y-3 font-sans text-xs md:text-sm text-cream/60">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
                <span>г. Москва, ул. Большая Дмитровка, д. 12</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-accent" />
                <span>+7 (495) 000-88-88</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={14} className="text-accent" />
                <span>Ежедневно с 10:00 до 22:00</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 md:pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-data text-cream/40">
          <span>&copy; {new Date().getFullYear()} Bark & Shimmer. Все права защищены.</span>
          <div className="flex gap-4 md:gap-6">
            <a href="#" className="hover:text-cream transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-cream transition-colors">Согласие на обработку ПД</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
