import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Phone, Flower2, Heart, Gift, Camera, X } from 'lucide-react';

// --- TYPY I INTERFEJSY ---
interface GalleryItem {
  readonly id: string;
  readonly category: 'okolicznosciowe' | 'slubne' | 'dekoracje';
  readonly title: string;
  readonly url: string;
}

interface OfferItem {
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly desc: string;
}

// Oznaczenie właściwości jako Readonly dla spełnienia reguły SonarQube S6759
interface FloristPageProps {
  readonly isDark: boolean;
  readonly onBack: () => void;
}

interface FloristNavbarProps {
  readonly onBack: () => void;
}

// --- DANE ---
const galleryData: readonly GalleryItem[] = [
  { id: 'gal-1', category: 'okolicznosciowe', title: 'Bukiet Pastelowy Premium', url: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'gal-2', category: 'slubne', title: 'Klasyczny Bukiet Ślubny', url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'gal-3', category: 'dekoracje', title: 'Kompozycja Stołowa Eucalyptus', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'gal-4', category: 'okolicznosciowe', title: 'Romantyczne Czerwone Róże', url: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'gal-5', category: 'slubne', title: 'Aranżacja Kościoła Boho', url: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'gal-6', category: 'dekoracje', title: 'Zielone Detale dla Biura', url: 'https://images.unsplash.com/photo-1517256064527-09c53b2d0c6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

const offerData: readonly OfferItem[] = [
  { icon: <Gift className="w-8 h-8" />, title: "Bukiety okolicznościowe", desc: "Na urodziny, rocznice i ważne momenty. Świeże kwiaty idealnie dopasowane do okazji." },
  { icon: <Heart className="w-8 h-8" />, title: "Florystyka ślubna", desc: "Bukiety ślubne, dekoracje sal i aut. Tworzymy niezapomnianą oprawę Waszego dnia." },
  { icon: <Camera className="w-8 h-8" />, title: "Wystrój wnętrz", desc: "Kompozycje do biur, restauracji i hoteli. Zielone detale, które ożywią każdą przestrzeń." }
];

// --- ANIMACJE ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const pageTransition: Variants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.3 } }
};

// --- SUBKOMPONENTY ---

function FloristNavbar({ onBack }: FloristNavbarProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-rose-100/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Wróć do portfolio"
            type="button"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
          <div className="font-serif italic font-bold text-xl text-rose-600 dark:text-rose-400 flex items-center gap-2">
            <Flower2 className="w-6 h-6" />
            Kwiaciarnia MEJ
          </div>
        </div>
        <div className="hidden md:flex gap-8 font-medium">
          <a href="#o-nas" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">O nas</a>
          <a href="#oferta" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">Oferta</a>
          <a href="#galeria" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">Galeria</a>
          <a href="#kontakt-mej" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">Kontakt</a>
        </div>
      </div>
    </nav>
  );
}

function FloristHero() {
  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-rose-200/40 dark:bg-rose-900/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-orange-100/40 dark:bg-orange-900/20 rounded-full blur-3xl -z-10" />

      <motion.div 
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="w-full md:w-1/2 z-10">
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Kwiaty, które wyrażają <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">więcej niż słowa.</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-lg">
            Wyjątkowe bukiety i kompozycje kwiatowe w sercu Radzynia Podlaskiego. Tworzymy z pasją dla Twoich najważniejszych chwil.
          </motion.p>
          <div className="flex gap-4">
            <a href="tel:512316377" className="flex items-center justify-center gap-2 px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-medium text-lg shadow-lg shadow-rose-500/20 transition-all active:scale-95 w-full sm:w-auto">
              <Phone className="w-5 h-5" />
              Zadzwoń i zamów
            </a>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 relative">
          <div className="aspect-[4/5] rounded-[3rem] rounded-tr-[6rem] rounded-br-[6rem] overflow-hidden shadow-2xl shadow-rose-100 dark:shadow-none bg-slate-100 dark:bg-slate-800 z-10 relative border-4 border-white dark:border-slate-800">
            <img src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Piękny bukiet kwiatów" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -inset-4 bg-gradient-to-tr from-rose-100 to-orange-50 dark:from-rose-900/30 dark:to-orange-900/20 rounded-[3rem] rounded-tr-[6rem] rounded-br-[6rem] -z-10 rotate-6" />
        </div>
      </motion.div>
    </section>
  );
}

// --- KOMPONENT GŁÓWNY ---
export default function FloristPage({ isDark, onBack }: FloristPageProps) {
  const [filter, setFilter] = useState<string>('wszystkie');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredGallery = filter === 'wszystkie' 
    ? galleryData 
    : galleryData.filter(item => item.category === filter);

  return (
    <div className={isDark ? "dark" : ""}>
      <motion.div 
        className="min-h-screen bg-[#FFFBFB] dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans selection:bg-rose-200 dark:selection:bg-rose-900 transition-colors duration-300"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        <FloristNavbar onBack={onBack} />
        <FloristHero />

        {/* O NAS */}
        <section id="o-nas" className="py-24 bg-white/50 dark:bg-slate-900/50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Heart className="w-12 h-12 text-rose-400 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-6">Stworzone z miłości do piękna</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Kwiaciarnia MEJ Ewa Jawoszek to miejsce, w którym tradycja spotyka się z nowoczesnym podejściem do florystyki. 
                Dbamy o to, aby każdy kwiat był świeży, a każda kompozycja unikalna. Niezależnie od tego, czy szukasz drobnego upominku, czy majestatycznej oprawy uroczystości – jesteśmy tu, by doradzić i zrealizować Twoją wizję.
              </p>
            </motion.div>
          </div>
        </section>

        {/* OFERTA */}
        <section id="oferta" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-16 text-center">Nasza oferta</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {offerData.map((item) => (
                <motion.div 
                  key={item.title} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={fadeInUp} 
                  className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl shadow-rose-50 dark:shadow-none border border-rose-50 dark:border-slate-800 hover:-translate-y-2 transition-transform"
                >
                  <div className="w-16 h-16 bg-rose-50 dark:bg-rose-900/30 text-rose-500 rounded-full flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* GALERIA */}
        <section id="galeria" className="py-24 bg-white/50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-4xl font-bold mb-4">Galeria naszych kompozycji</h2>
              <p className="text-slate-600 dark:text-slate-400">Inspiracje stworzone w naszej pracowni. Kliknij zdjęcie, aby je powiększyć.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { id: 'wszystkie', label: 'Wszystkie' },
                { id: 'okolicznosciowe', label: 'Okolicznościowe' },
                { id: 'slubne', label: 'Ślubne' },
                { id: 'dekoracje', label: 'Decorations' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setFilter(btn.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    filter === btn.id
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-rose-50/50 dark:hover:bg-rose-950/20'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <AnimatePresence mode="popLayout">
                {filteredGallery.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    variants={fadeInUp}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white dark:bg-slate-900 p-4 rounded-[2rem] shadow-md border border-slate-100 dark:border-slate-800/60 cursor-pointer overflow-hidden"
                    onClick={() => setSelectedImage(item.url)}
                  >
                    <div className="aspect-square rounded-2xl overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                      <img 
                        src={item.url} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-white/90 text-slate-900 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm shadow-md">
                          Powiększ
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mt-4 px-1 text-slate-800 dark:text-slate-200 transition-colors group-hover:text-rose-500">
                      {item.title}
                    </h3>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* LIGHTBOX */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
              onClick={() => setSelectedImage(null)}
            >
              <button 
                type="button"
                className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors border border-white/10"
                onClick={() => setSelectedImage(null)}
                aria-label="Zamknij podgląd"
              >
                <X className="w-6 h-6" />
              </button>
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="max-w-4xl max-h-[85vh] rounded-[2rem] overflow-hidden bg-white dark:bg-slate-900 border border-white/10 p-2 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={selectedImage} alt="Podgląd kompozycji" className="w-full h-auto max-h-[80vh] object-contain rounded-xl" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* KONTAKT & MAPA */}
        <section id="kontakt-mej" className="py-24 bg-rose-50/50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white dark:bg-slate-950 rounded-[3rem] shadow-2xl shadow-rose-100/50 dark:shadow-none border border-rose-100 dark:border-slate-800 overflow-hidden flex flex-col lg:flex-row">
              
              <div className="w-full lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden bg-white dark:bg-slate-950 z-10">
                <h2 className="text-4xl font-bold mb-10 text-slate-900 dark:text-white">Odwiedź nas</h2>
                
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="mt-1 w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-rose-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">Adres</h4>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Plac Wolności 3<br />
                        21-300 Radzyń Podlaski<br />
                        Woj. Lubelskie
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mt-1 w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-rose-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">Telefon</h4>
                      <a href="tel:512316377" className="text-rose-500 hover:text-rose-600 font-bold text-lg transition-colors">
                        512 316 377
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mt-1 w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-rose-500" />
                    </div>
                    <div className="w-full">
                      <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Godziny otwarcia</h4>
                      <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                        <li className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                          <span>Poniedziałek - Piątek</span> <span className="font-medium text-slate-900 dark:text-slate-200">09:00 - 17:00</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                          <span>Sobota</span> <span className="font-medium text-slate-900 dark:text-slate-200">09:00 - 14:00</span>
                        </li>
                        <li className="flex justify-between text-rose-400">
                          <span>Niedziela</span> <span className="font-medium">Zamknięte</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 bg-slate-100 dark:bg-slate-900 relative min-h-[400px]">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Lokalizacja Kwiaciarni na mapie" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent dark:from-slate-950 opacity-50" />
                <div className="absolute bottom-8 right-8 bg-white dark:bg-slate-800 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100 dark:border-slate-700">
                  <MapPin className="w-6 h-6 text-rose-500" />
                  <span className="font-medium">Plac Wolności 3, Radzyń Podlaski</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm border-t border-rose-100/50 dark:border-slate-800">
          Kwiaciarnia MEJ Ewa Jawoszek © {new Date().getFullYear()}
        </footer>
      </motion.div>
    </div>
  );
}