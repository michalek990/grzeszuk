import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Utensils, MapPin, Clock, Phone, Star, ChefHat, CalendarCheck, Quote } from 'lucide-react';

// --- TYPY I INTERFEJSY ---
interface MenuItem {
  readonly name: string;
  readonly desc: string;
  readonly price: string;
}

interface MenuData {
  readonly przystawki: readonly MenuItem[];
  readonly dania_glowne: readonly MenuItem[];
  readonly desery: readonly MenuItem[];
}

interface ReviewItem {
  readonly text: string;
  readonly author: string;
  readonly rating: number;
}

interface RestaurantPageProps {
  readonly isDark: boolean;
  readonly onBack: () => void;
}

interface RestaurantNavbarProps {
  readonly onBack: () => void;
}

// --- DANE ---
const menuData: MenuData = {
  przystawki: [
    { name: "Tatar z polędwicy wołowej", desc: "Piklowana kurka, szalotka, żółtko przepiórcze, domowe pieczywo", price: "46 zł" },
    { name: "Krem z pieczonych pomidorów", desc: "Oliwa bazyliowa, puder z czarnych oliwek, grzanka", price: "28 zł" },
    { name: "Carpaccio z buraka", desc: "Kozi ser, prażone orzechy włoskie, dresing malinowy", price: "34 zł" }
  ],
  dania_glowne: [
    { name: "Stek z antrykotu sezonowanego", desc: "Frytki truflowe, grillowane szparagi, sos pieprzowy", price: "120 zł" },
    { name: "Okoń morski z pieca", desc: "Puree z kalafiora, blanszowany pak choi, sos beurre blanc", price: "75 zł" },
    { name: "Ręcznie lepione ravioli", desc: "Nadzienie z ricotty i szpinaku, palone masło, szałwia, parmezan", price: "52 zł" }
  ],
  desery: [
    { name: "Fondant czekoladowy", desc: "Płynne wnętrze, lody waniliowe z Madagaskaru", price: "32 zł" },
    { name: "Tarta cytrynowa", desc: "Opalana beza włoska, coulis malinowe", price: "29 zł" }
  ]
};

const reviewsData: readonly ReviewItem[] = [
  { text: "Najlepszy stek jaki jadłem w tym mieście. Obsługa na absolutnie najwyższym poziomie. Na pewno wrócimy!", author: "Michał K.", rating: 5 },
  { text: "Fantastyczny klimat, idealne miejsce na rocznicę. Tatar z polędwicy to poezja smaku.", author: "Anna P.", rating: 5 },
  { text: "Wspaniałe doświadczenie kulinarne. Krótka karta świadczy o tym, że wszystko jest tu ultrasiweże.", author: "Tomasz W.", rating: 5 }
];

// --- ANIMACJE (Zabezpieczone 'as const' dla uciszenia ts(2322)) ---
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
} as const;

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
} as const;

// --- SUBKOMPONENTY ---

function RestaurantNavbar({ onBack }: RestaurantNavbarProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-900/50">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-full hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-500 transition-all"
            title="Wróć do portfolio"
            type="button"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-tight font-bold text-zinc-900 dark:text-white uppercase leading-none flex items-center gap-2">
              Ogień <span className="text-orange-600">&</span> Sól
            </span>
            <span className="text-xs tracking-[0.3em] text-zinc-500 uppercase mt-1">Bistro & Wine</span>
          </div>
        </div>
        
        <div className="hidden md:flex gap-10 text-sm font-semibold tracking-widest uppercase text-zinc-600 dark:text-zinc-400">
          <a href="#historia" className="hover:text-orange-600 transition-colors">Historia</a>
          <a href="#menu" className="hover:text-orange-600 transition-colors">Menu</a>
          <a href="#rezerwacja" className="hover:text-orange-600 transition-colors">Rezerwacja</a>
        </div>
      </div>
    </nav>
  );
}

function RestaurantHero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Wnętrze eleganckiej restauracji" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#FAFAFA] dark:to-[#0A0A0A]" />
      </div>

      <motion.div 
        className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-6">
          <div className="h-[1px] w-12 bg-orange-500" />
          <span className="text-orange-400 font-medium tracking-[0.2em] uppercase text-sm">Nowe doświadczenie smaku</span>
          <div className="h-[1px] w-12 bg-orange-500" />
        </motion.div>
        
        <motion.h1 variants={fadeUp} className="text-5xl md:text-8xl font-serif font-bold mb-8 text-white leading-tight">
          Prawdziwa <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">uczta</span> <br />dla zmysłów.
        </motion.h1>
        
        <motion.p variants={fadeUp} className="text-lg md:text-xl text-zinc-300 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
          Łączujemy lokalne, sezonowe składniki z nowoczesnymi technikami kulinarnymi. Ogień i Sól to miejsce, gdzie jedzenie staje się sztuką.
        </motion.p>
        
        <motion.div variants={fadeUp}>
          <a href="#rezerwacja" className="inline-flex items-center gap-3 px-10 py-5 bg-orange-600 hover:bg-orange-700 text-white font-bold tracking-widest uppercase text-sm transition-all active:scale-95 shadow-xl shadow-orange-900/20">
            <CalendarCheck className="w-5 h-5" /> Zarezerwuj stolik
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// --- KOMPONENT GŁÓWNY ---
export default function RestaurantPage({ isDark, onBack }: RestaurantPageProps) {
  const [activeCategory, setActiveCategory] = useState<'przystawki' | 'dania_glowne' | 'desery'>('dania_glowne');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={isDark ? "dark" : ""}>
      <motion.div 
        className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-orange-900/30 selection:text-orange-500 transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <RestaurantNavbar onBack={onBack} />
        <RestaurantHero />

        {/* O NAS (HISTORIA) */}
        <section id="historia" className="py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-24">
            <motion.div 
              className="w-full md:w-1/2 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                <img 
                  src="https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Szef kuchni przy pracy" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white dark:bg-zinc-900 p-8 shadow-2xl border border-zinc-100 dark:border-zinc-800 hidden md:block">
                <ChefHat className="w-12 h-12 text-orange-600 mb-4" />
                <p className="font-serif text-2xl font-bold">"Gotowanie to nasza pasja."</p>
              </div>
            </motion.div>

            <motion.div 
              className="w-full md:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif font-bold mb-8">
                Kulinarna podróż bez kompromisów.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                Bistro Ogień i Sól powstało z miłości do autentycznych smaków. Nie uznajemy drogi na skróty. Nasze mięsa sezonujemy na miejscu, chleb wypiekamy o świcie, a warzywa dostarczają nam zaprzyjaźnieni rolnicy z regionu.
              </motion.p>
              <motion.p variants={fadeUp} className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
                Wierzymy, że sercem każdej restauracji jest gościnność. Dbamy o to, aby każda wizyta u nas była niezapomnianym doświadczeniem – od pierwszego uśmiechu kelnera, po ostatni kęs deseru.
              </motion.p>
              
              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-8 border-t border-zinc-200 dark:border-zinc-800 pt-10">
                <div>
                  <span className="block text-4xl font-serif font-bold text-orange-600 mb-2">10+</span>
                  <span className="text-sm font-bold uppercase tracking-wider text-zinc-500">Lokalnych dostawców</span>
                </div>
                <div>
                  <span className="block text-4xl font-serif font-bold text-orange-600 mb-2">98%</span>
                  <span className="text-sm font-bold uppercase tracking-wider text-zinc-500">Pozytywnych opinii</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* MENU */}
        <section id="menu" className="py-24 md:py-32 bg-white dark:bg-[#111111] border-y border-zinc-200 dark:border-zinc-900">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <Utensils className="w-10 h-10 text-orange-600 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Nasze Menu</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Wyselekcjonowane dania, które zmieniają się wraz z porami roku.</p>
            </div>

            {/* Zakładki */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {[
                { id: 'przystawki', label: 'Przystawki' },
                { id: 'dania_glowne', label: 'Dania Główne' },
                { id: 'desery', label: 'Desery' }
              ].map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id as 'przystawki' | 'dania_glowne' | 'desery')}
                  className={`px-8 py-3 text-sm font-bold tracking-widest uppercase transition-all ${
                    activeCategory === category.id 
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' 
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Lista dań */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-10"
                >
                  {menuData[activeCategory].map((item) => (
                    // Bezpieczny tekstowy unikalny klucz S6479
                    <div key={item.name} className="flex flex-col md:flex-row justify-between gap-4 md:items-end border-b border-zinc-200 dark:border-zinc-800 pb-6 group">
                      <div className="max-w-xl">
                        <h3 className="text-2xl font-serif font-bold mb-2 group-hover:text-orange-600 transition-colors">{item.name}</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                      </div>
                      <div className="text-2xl font-serif font-bold text-orange-600 shrink-0">
                        {item.price}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="text-center mt-16">
              <button type="button" className="text-sm font-bold tracking-widest uppercase border-b-2 border-orange-600 pb-1 hover:text-orange-600 transition-colors">
                Pobierz pełne menu (PDF)
              </button>
            </div>
          </div>
        </section>

        {/* OPINIE */}
        <section className="py-24 px-6 bg-zinc-900 text-white">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {reviewsData.map((review) => (
                <motion.div key={review.author} variants={fadeUp} className="bg-zinc-800/50 p-8 border border-zinc-700/50 relative">
                  <Quote className="absolute top-6 right-6 w-12 h-12 text-zinc-700 opacity-50" />
                  <div className="flex gap-1 text-orange-500 mb-6">
                    {/* Generowanie gwiazdek bez indeksu tablicy */}
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={`star-${review.author}-${i}`} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-lg italic text-zinc-300 mb-6">"{review.text}"</p>
                  <span className="font-bold tracking-wider uppercase text-sm text-orange-400">- {review.author}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* REZERWACJA & KONTAKT */}
        <section id="rezerwacja" className="py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-[#111111] shadow-2xl border border-zinc-200 dark:border-zinc-900 flex flex-col lg:flex-row">
              
              {/* Formularz skojarzony z id i htmlFor S6853 */}
              <div className="w-full lg:w-1/2 p-10 md:p-16">
                <h2 className="text-4xl font-serif font-bold mb-8">Zarezerwuj stolik</h2>
                <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="res-name" className="text-xs font-bold uppercase tracking-wider text-zinc-500">Imię i Nazwisko</label>
                      <input id="res-name" type="text" className="w-full bg-zinc-100 dark:bg-zinc-900 border-none px-4 py-4 focus:ring-2 focus:ring-orange-600 outline-none" placeholder="Jan Kowalski" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="res-phone" className="text-xs font-bold uppercase tracking-wider text-zinc-500">Telefon</label>
                      <input id="res-phone" type="tel" className="w-full bg-zinc-100 dark:bg-zinc-900 border-none px-4 py-4 focus:ring-2 focus:ring-orange-600 outline-none" placeholder="+48 000 000 000" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="res-date" className="text-xs font-bold uppercase tracking-wider text-zinc-500">Data i Godzina</label>
                      <input id="res-date" type="datetime-local" className="w-full bg-zinc-100 dark:bg-zinc-900 border-none px-4 py-4 focus:ring-2 focus:ring-orange-600 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="res-guests" className="text-xs font-bold uppercase tracking-wider text-zinc-500">Liczba osób</label>
                      <select id="res-guests" className="w-full bg-zinc-100 dark:bg-zinc-900 border-none px-4 py-4 focus:ring-2 focus:ring-orange-600 outline-none">
                        <option>2 osoby</option>
                        <option>3 osoby</option>
                        <option>4 osoby</option>
                        <option>5+ osób (wymaga potwierdzenia)</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="w-full py-5 bg-orange-600 hover:bg-orange-700 text-white font-bold tracking-widest uppercase text-sm transition-colors mt-4">
                    Potwierdź rezerwację
                  </button>
                </form>
              </div>

              {/* Info */}
              <div className="w-full lg:w-1/2 bg-zinc-900 text-white p-10 md:p-16 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl" />
                
                <h3 className="text-2xl font-serif font-bold mb-10">Informacje dla Gości</h3>
                
                <div className="space-y-8 relative z-10">
                  <div className="flex gap-6 items-start">
                    <MapPin className="w-6 h-6 text-orange-500 shrink-0" />
                    <div>
                      <h4 className="font-bold tracking-wider uppercase text-sm mb-2 text-zinc-400">Lokalizacja</h4>
                      <p className="text-lg">ul. Gastronomiczna 42<br />00-111 Warszawa</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-6 items-start">
                    <Clock className="w-6 h-6 text-orange-500 shrink-0" />
                    <div>
                      <h4 className="font-bold tracking-wider uppercase text-sm mb-2 text-zinc-400">Godziny otwarcia</h4>
                      <ul className="text-lg space-y-1">
                        <li>Pon - Czw: 13:00 - 22:00</li>
                        <li>Pt - Sob: 13:00 - 23:30</li>
                        <li>Niedziela: 12:00 - 21:00</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start">
                    <Phone className="w-6 h-6 text-orange-500 shrink-0" />
                    <div>
                      <h4 className="font-bold tracking-wider uppercase text-sm mb-2 text-zinc-400">Kontakt</h4>
                      <p className="text-lg">+48 500 600 700<br />rezerwacje@ogienisol.pl</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 text-center text-zinc-500 dark:text-zinc-600 text-sm border-t border-zinc-200 dark:border-zinc-900">
          Bistro Ogień i Sól © {new Date().getFullYear()}. Projekt wizualny do portfolio.
        </footer>
      </motion.div>
    </div>
  );
}