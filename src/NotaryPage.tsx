import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Scale, ShieldCheck, Clock, FileText, Building2, Users, MapPin, Phone, ChevronRight } from 'lucide-react';

// --- INTERFEJSY PROPSÓW OZNACZONE JAKO READ-ONLY (Spełnia regułę SonarQube S6759) ---
interface NotaryPageProps {
  readonly isDark: boolean;
  readonly onBack: () => void;
}

interface NotaryNavbarProps {
  readonly onBack: () => void;
}

interface ServiceItem {
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly desc: string;
}

interface ValueItem {
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly desc: string;
}

// --- ANIMACJE (Zabezpieczone przez 'as const' dla uciszenia błędu ts(2322)) ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
} as const;

const pageTransition = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.6 } },
  exit: { opacity: 0, filter: 'blur(10px)', transition: { duration: 0.4 } }
} as const;

// --- STRUKTURY DANYCH ---
const valuesData: readonly ValueItem[] = [
  { icon: <ShieldCheck className="w-8 h-8" />, title: "Pewność Obrotu", desc: "Dbamy o to, aby każda czynność była całkowicie zgodna z literą prawa, chroniąc Twoje interesy majątkowe." },
  { icon: <Scale className="w-8 h-8" />, title: "Bezstronność", desc: "Jako osoba zaufania publicznego, notariusz dba o równe zabezpieczenie praw wszystkich stron umowy." },
  { icon: <Clock className="w-8 h-8" />, title: "Sprawność", desc: "Szanujemy Twój czas. Zapewniamy terminowe przygotowanie projektów aktów oraz sprawny przebieg czynności." }
];

const servicesData: readonly ServiceItem[] = [
  { icon: <Building2 />, title: "Prawo Spółek", desc: "Umowy spółek, protokoły zgromadzeń wspólników, przekształcenia i fuzje." },
  { icon: <MapPin />, title: "Nieruchomości", desc: "Umowy sprzedaży, darowizny, ustanawianie służebności i hipotek." },
  { icon: <FileText />, title: "Sprawy Spadkowe", desc: "Akty poświadczenia dziedziczenia, testamenty, odrzucenie spadku." },
  { icon: <Users />, title: "Sprawy Rodzinne", desc: "Majątkowe umowy małżeńskie (intercyzy), podziały majątku." },
  { icon: <ShieldCheck />, title: "Pełnomocnictwa", desc: "Sporządzanie pełnomocnictw ogólnych i szczególnych w formie aktu notarialnego." },
  { icon: <Scale />, title: "Poświadczenia", desc: "Poświadczanie własnoręczności podpisu, zgodności kopii z oryginałem dokumentu." }
];

// --- SUBKOMPONENTY ---

function NotaryNavbar({ onBack }: NotaryNavbarProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="group flex items-center justify-center w-10 h-10 border border-slate-200 dark:border-slate-700 hover:border-amber-600 dark:hover:border-amber-500 transition-colors"
            title="Wróć do portfolio"
            type="button"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-amber-600 transition-colors" />
          </button>
          <div className="flex flex-col">
            <span className="font-serif text-xl tracking-wide font-medium text-slate-900 dark:text-white uppercase leading-none">
              Jan Kowalski
            </span>
            <span className="text-xs tracking-[0.2em] text-amber-600 dark:text-amber-500 uppercase mt-1">
              Kancelaria Notarialna
            </span>
          </div>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase text-slate-600 dark:text-slate-400">
          <a href="#kancelaria" className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors">Kancelaria</a>
          <a href="#uslugi" className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors">Usługi</a>
          <a href="#kontakt" className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors">Kontakt</a>
        </div>
      </div>
    </nav>
  );
}

// --- KOMPONENT GŁÓWNY ---
export default function NotaryPage({ isDark, onBack }: NotaryPageProps) {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={isDark ? "dark" : ""}>
      <motion.div 
        className="min-h-screen bg-[#F8F9FA] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-amber-600/30 transition-colors duration-300"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        <NotaryNavbar onBack={onBack} />

        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden min-h-[90vh] flex items-center">
          <div className="absolute top-0 option-bg right-0 w-1/3 h-full bg-slate-900 dark:bg-slate-900 z-0 hidden lg:block" />
          <div className="absolute top-0 right-[33%] w-[1px] h-full bg-amber-600/20 z-0 hidden lg:block" />

          <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              className="w-full lg:w-3/5"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <div className="h-[1px] w-12 bg-amber-600" />
                <span className="text-amber-600 font-medium tracking-widest uppercase text-sm">Gwarancja Bezpieczeństwa</span>
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-serif font-medium leading-[1.1] mb-8 text-slate-900 dark:text-white">
                Zabezpieczamy to, <br />
                <span className="italic text-slate-500 dark:text-slate-400">co najważniejsze.</span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed max-w-xl">
                Profesjonalna obsługa prawna osób fizycznych, przedsiębiorców oraz spółek prawa handlowego. Zapewniamy zgodność z prawem i najwyższe standardy poufności.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6">
                <a href="#kontakt" className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium tracking-wide hover:bg-amber-600 dark:hover:bg-amber-500 transition-colors text-center">
                  Umów spotkanie
                </a>
                <a href="#uslugi" className="px-8 py-4 border border-slate-300 dark:border-slate-700 font-medium tracking-wide hover:border-slate-900 dark:hover:border-white transition-colors text-center flex items-center justify-center gap-2">
                  Poznaj usługi <ChevronRight className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>

            <motion.div 
              className="w-full lg:w-2/5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-2xl">
                <motion.img 
                  style={{ y: yParallax }}
                  src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Pióro i dokumenty prawne" 
                  className="absolute top-[-10%] left-0 w-full h-[120%] object-cover"
                />
                <div className="absolute inset-0 border border-white/30 z-10 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* WARTOŚCI */}
        <section id="kancelaria" className="py-24 bg-slate-900 text-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {valuesData.map((item) => (
                <motion.div key={item.title} variants={fadeUp} className="flex flex-col">
                  <div className="text-amber-500 mb-6">{item.icon}</div>
                  <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                  <div className="h-[1px] w-full bg-slate-800 mt-8" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* USŁUGI */}
        <section id="uslugi" className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div>
                <span className="text-amber-600 font-medium tracking-widest uppercase text-sm mb-4 block">Zakres Czynności</span>
                <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white">W czym możemy <br />Ci pomóc?</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
                Kancelaria oferuje pełen wachlarz czynności notarialnych, doradzając stronom najbardziej optymalne i bezpieczne rozwiązania prawne.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {servicesData.map((item) => (
                <motion.div 
                  key={item.title} 
                  variants={fadeUp} 
                  className="group p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-600 dark:hover:border-amber-500 transition-colors cursor-default"
                >
                  <div className="w-12 h-12 bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-900 dark:text-white mb-6 group-hover:text-amber-600 group-hover:bg-amber-50 dark:group-hover:bg-amber-900/20 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-serif font-medium mb-3 text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* PROCES / FAQ */}
        <section className="py-24 bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl font-serif mb-6 text-slate-900 dark:text-white">Jak przygotować się do wizyty?</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
                Przed planowaną czynnością notarialną zachęcamy do kontaktu telefonicznego lub mailowego. Prawnicy kancelarii wskażą wykaz niezbędnych dokumentów, przeanalizują stan prawny i bezpłatnie poinformują o całkowitych kosztach czynności.
              </p>
              <a href="#kontakt" className="inline-flex items-center justify-center gap-2 text-amber-600 font-medium tracking-wide hover:text-amber-700 transition-colors uppercase text-sm border-b border-amber-600 pb-1">
                Skontaktuj się z nami <ArrowLeft className="w-4 h-4 rotate-180" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* KONTAKT */}
        <section id="kontakt" className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 className="text-4xl font-serif mb-8 text-slate-900 dark:text-white">Informacje kontaktowe</h2>
                <div className="h-[1px] w-24 bg-amber-600 mb-10" />
                
                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <MapPin className="w-6 h-6 text-amber-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white text-lg tracking-wide">Siedziba Kancelarii</h4>
                      <p className="text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                        ul. Nowy Świat 15 lok. 2<br />
                        00-029 Warszawa<br />
                        (Parter, wejście od ulicy)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <Phone className="w-6 h-6 text-amber-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white text-lg tracking-wide">Kontakt bezpośredni</h4>
                      <div className="flex flex-col gap-1 mt-2">
                        <a href="tel:221234567" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 transition-colors">Tel: +48 22 123 45 67</a>
                        <a href="mailto:kancelaria@notariusz-kowalski.pl" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 transition-colors">Mail: kancelaria@notariusz-kowalski.pl</a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <Clock className="w-6 h-6 text-amber-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white text-lg tracking-wide">Godziny urzędowania</h4>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-slate-600 dark:text-slate-400 mt-2">
                        <span>Poniedziałek - Piątek</span> <span>09:00 - 17:00</span>
                        <span>Sobota</span> <span>Po wcześniejszym umówieniu</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="relative aspect-square lg:aspect-auto bg-slate-200 dark:bg-slate-800"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Wnętrze eleganckiego biura" 
                  className="w-full h-full object-cover grayscale-[20%]"
                />
                <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />
                <div className="absolute -inset-4 border border-slate-300 dark:border-slate-700 -z-10 translate-x-8 translate-y-8 hidden md:block" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="py-12 bg-slate-950 text-slate-400 text-sm">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="font-serif text-lg text-white">Jan Kowalski</span>
              <span>Kancelaria Notarialna</span>
            </div>
            <div className="text-center md:text-right">
              <p>© {new Date().getFullYear()} Wszelkie prawa zastrzeżone.</p>
              <p className="mt-1">Projekt na potrzeby portfolio.</p>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}