import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Moon,
  Sun,
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  ShieldAlert,
  Menu,
  X,
} from "lucide-react";

// IMPORT ZDJĘCIA Z FOLDERU ASSETS (Upewnij się, że skompresowałeś ten plik!)
import jaImage from "./assets/ja.png";

// IMPORTUJEMY WSZYSTKIE PODSTRONY
import FloristPage from "./FloristPage";
import NotaryPage from "./NotaryPage";
import RestaurantPage from "./RestaurantPage";

// --- TYPY I DANE ---
interface Project {
  readonly id: "mej" | "notary" | "restaurant";
  readonly title: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly metric: string;
  readonly hasSubpage?: boolean;
}

const projectsData: readonly Project[] = [
  {
    id: "mej",
    title: "Strona wizytówka dla Kwiaciarni MEJ",
    description:
      "Zaprojektowanie nowoczesnej, ciepłej strony wizerunkowej dla lokalnej kwiaciarni w Radzyniu Podlaskim. Celem było ułatwienie klientom znalezienia danych kontaktowych oraz wyeksponowanie piękna kompozycji.",
    imageUrl:
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    metric: "3-krotny wzrost zapytań o bukiety w sezonie",
    hasSubpage: true,
  },
  {
    id: "notary",
    title: "Wizerunkowa strona wizytówka dla kancelarii",
    description:
      "Stworzenie ekskluzywnej wizytówki online dla biznesu wymagającego najwyższego poziomu profesjonalizmu. Wdrożenie intuicyjnego kalendarza rezerwacji online skróciło czas.",
    imageUrl:
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    metric: "95% konsultacji rezerwowanych automatycznie",
    hasSubpage: true,
  },
  {
    id: "restaurant",
    title: "Platforma rezerwacyjna dla Bistro premium",
    description:
      "Zaprojektowanie angażującej wizualnie strony dla restauracji fine-diningowej. Głównym celem było wdrożenie czytelnego systemu rezerwacji stolików i odciążenie obsługi telefonicznej.",
    imageUrl:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    metric: "Spadek rezerwacji telefonicznych na rzecz online o 70%",
    hasSubpage: true,
  },
];

// --- ANIMACJE INTERFEJSU (Wydajne przyspieszenie sprzętowe GPU) ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
  },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
} as const;

const pageTransition = {
  initial: { opacity: 0, scale: 0.99 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.99,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
} as const;

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<
    "portfolio" | "mej" | "notary" | "restaurant"
  >("portfolio");

  const [showCookieBanner, setShowCookieBanner] = useState(() => {
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("cookie-consent-grzeszuk");
      return !consent;
    }
    return false;
  });

  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    document.title = "Michał Grzeszuk | Ekspert Frontend i UI/UX dla Biznesu B2B";

    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    updateMetaTag(
      "description",
      "Projektuję i wdrażam wysoce zoptymalizowane systemy, aplikacje dedykowane oraz zaawansowane strony wizytówkowe nastawione na mierzalny zysk i konwersję Twojej firmy."
    );
    updateMetaTag("og:title", "Michał Grzeszuk | Ekspert Frontend i UI/UX dla Biznesu B2B", true);
    updateMetaTag("og:description", "Stabilna architektura cyfrowa i interfejsy zorientowane na zysk Twojej firmy.", true);
    updateMetaTag("og:type", "website", true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent-grzeszuk", "accepted");
    setShowCookieBanner(false);
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const navbarOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const renderView = () => {
    if (currentView === "mej") {
      return <FloristPage key="florist" isDark={isDark} onBack={() => setCurrentView("portfolio")} />;
    }
    if (currentView === "notary") {
      return <NotaryPage key="notary" isDark={isDark} onBack={() => setCurrentView("portfolio")} />;
    }
    if (currentView === "restaurant") {
      return <RestaurantPage key="restaurant" isDark={isDark} onBack={() => setCurrentView("portfolio")} />;
    }

    return (
      <motion.div
        key="portfolio"
        className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-500 font-sans selection:bg-indigo-200 dark:selection:bg-indigo-900 relative"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        {/* Zoptymalizowana siatka w tle – usunięty ciężki CSS @keyframes animation */}
        <div className="absolute inset-0 moving-grid-bg pointer-events-none z-0 opacity-70" />

        {/* --- NAVBAR --- */}
        <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div
              className="font-bold text-xl tracking-tight cursor-pointer z-50"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Grzeszuk<span className="text-indigo-600 dark:text-indigo-400">.com</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 font-medium">
              <a href="#o-mnie" onClick={(e) => handleScroll(e, "o-mnie")} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">O mnie</a>
              <a href="#projekty" onClick={(e) => handleScroll(e, "projekty")} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Projekty</a>
              <a href="#kontakt" onClick={(e) => handleScroll(e, "kontakt")} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Kontakt</a>
            </div>

            <div className="flex items-center gap-4 z-50">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle dark mode"
                type="button"
              >
                {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors md:hidden"
                aria-label="Toggle mobile menu"
                type="button"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-20 left-0 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6 font-medium text-lg shadow-xl rounded-b-[2rem] md:hidden"
              >
                <a href="#o-mnie" onClick={(e) => handleScroll(e, "o-mnie")} className="py-2 px-4 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-xl transition-colors">O mnie</a>
                <a href="#projekty" onClick={(e) => handleScroll(e, "projekty")} className="py-2 px-4 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-xl transition-colors">Projekty</a>
                <a href="#kontakt" onClick={(e) => handleScroll(e, "kontakt")} className="py-2 px-4 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-xl transition-colors text-indigo-600 dark:text-indigo-400">Kontakt</a>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* --- HERO SECTION --- */}
        <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden z-10">
          {/* Kulki tła zoptymalizowane pod kątem GPU (używają x i y zamiast top/left) */}
          <motion.div
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/40 dark:bg-indigo-900/15 rounded-full blur-3xl -z-10"
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-100/40 dark:bg-sky-900/15 rounded-full blur-3xl -z-10"
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8">
              Buduję systemy, które <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">skalują Twój biznes.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Twój biznes potrzebuje czegoś więcej niż ładnej wizytówki. Projektuję strony, które budują zaufanie, rozwiązują problemy i zauważalnie zwiększają sprzedaż.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#kontakt" onClick={(e) => handleScroll(e, "kontakt")} className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium text-lg hover:shadow-xl hover:shadow-indigo-500/20 transition-all active:scale-95">
                Porozmawiajmy o projekcie
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#projekty" onClick={(e) => handleScroll(e, "projekty")} className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full font-medium text-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95 text-center shadow-sm">
                Zobacz wyniki prac
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* --- O MNIE --- */}
        <section id="o-mnie" className="py-24 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm z-10 relative border-y border-slate-200/30 dark:border-slate-800/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
              <motion.div
                className="w-full md:w-1/3 flex justify-center relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
              >
                <div className="relative z-10 rounded-[2.5rem] rounded-tl-[4.5rem] rounded-br-[4.5rem] overflow-hidden shadow-2xl shadow-indigo-100/50 dark:shadow-none aspect-square w-64 md:w-full max-w-[320px] bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-900">
                  <img src={jaImage} alt="Michał Grzeszuk" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -inset-3 bg-gradient-to-tr from-indigo-100 to-sky-50 dark:from-indigo-900/30 dark:to-sky-900/20 rounded-[2.5rem] rounded-tl-[4.5rem] rounded-br-[4.5rem] -z-10 rotate-3 max-w-[340px] w-full" />
              </motion.div>

              <motion.div
                className="w-full md:w-2/3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Partnerstwo oparte na architekturze zaufania.</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Wierzę, że technologia ma przede wszystkim realizować cele biznesowe: eliminować opóźnienia, chronić procesy i automatyzować obsługę klientów. Nie wdrażam rozwiązań tylko dlatego, że są modne – dobieram je na podstawie twardych badań wydajnościowych.
                </p>
                <ul className="space-y-4 mt-8">
                  {[
                    "Zaawansowana optymalizacja czasu odpowiedzi i szybkości działania",
                    "Architektura zorientowana na maksymalizację konwersji",
                    "Niezawodne systemy odporne na gwałtowny wzrost ruchu",
                  ].map((item) => (
                    <li key={item.slice(0, 20)} className="flex items-center gap-3 text-slate-800 dark:text-slate-200 font-medium">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/5 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- PROJEKTY --- */}
        <section id="projekty" className="py-24 z-10 relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Rozwiązania poparte wynikami.</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Zobacz systemy wdrożone z myślą o stabilności struktury i realnym zwrocie z inwestycji dla partnerów.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {projectsData.map((project) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                  className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/30 dark:shadow-black/30 border border-slate-100 dark:border-slate-800/80 hover:-translate-y-3 hover:shadow-2xl hover:shadow-indigo-500/5 dark:hover:shadow-none transition-all duration-300 flex flex-col h-full group"
                >
                  <div className="w-full aspect-video rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-6 relative">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow">{project.description}</p>

                  <div className="flex flex-col gap-4 mt-auto">
                    <div className="bg-indigo-50/60 dark:bg-indigo-900/10 rounded-2xl p-4 border border-indigo-100/70 dark:border-indigo-800/30">
                      <span className="block text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                        Kluczowy wynik biznesowy
                      </span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{project.metric}</span>
                    </div>

                    {project.hasSubpage && (
                      <button
                        onClick={() => setCurrentView(project.id)}
                        className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-full font-medium transition-all shadow-md active:scale-95"
                        type="button"
                      >
                        Zobacz system na żywo
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- KONTAKT --- */}
        <section id="kontakt" className="py-24 z-10 relative bg-indigo-50/30 dark:bg-slate-900/20 backdrop-blur-sm border-t border-slate-200/40 dark:border-slate-800/40">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="bg-white dark:bg-slate-950 rounded-[3rem] shadow-2xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800/80 overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-2/5 bg-slate-900 dark:bg-slate-900 p-12 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-[-20%] right-[-20%] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-3xl -z-0" />
                  <div className="relative z-10">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">Zoptymalizujmy Twój biznes.</h3>
                    <p className="text-slate-400 mb-12 text-base md:text-lg leading-relaxed">
                      Opowiedz mi o wymaganiach systemowych, wyzwaniach z wydajnością lub celach wizerunkowych Twojej firmy. Znajdziemy rozwiązanie oparte na twardych parametrach operacyjnych.
                    </p>
                    <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center backdrop-blur-sm border border-white/10">
                          <Mail className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Napisz e-mail</p>
                          <a href="mailto:michal.grzeszuk@gmail.com" className="text-base md:text-lg font-medium hover:text-indigo-400 transition-colors">michal.grzeszuk@gmail.com</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center backdrop-blur-sm border border-white/10">
                          <Phone className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Zadzwoń bezpośrednio</p>
                          <a href="tel:+48577980820" className="text-base md:text-lg font-medium hover:text-indigo-400 transition-colors">+48 577 980 820</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-3/5 p-12 lg:p-16">
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="contact-name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Imię i nazwisko / Firma</label>
                        <input id="contact-name" type="text" placeholder="Jan Kowalski" className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Adres e-mail</label>
                        <input id="contact-email" type="email" placeholder="jan@twojafirma.pl" className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-message" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Opisz krótko swoje potrzeby systemowe i cele biznesowe</label>
                      <textarea id="contact-message" rows={5} placeholder="W czym możemy pomóc? Bezpieczna witryna wizerunkowa, zaawansowana platforma rezerwacji, audyt wydajnościowy..." className="w-full px-5 py-4 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600"></textarea>
                    </div>
                    <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold text-base transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98] mt-4">
                      Wyślij zapytanie inżynieryjne
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="py-8 border-t border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-950/50 text-slate-500 dark:text-slate-400 text-center z-10 relative backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">© {new Date().getFullYear()} Grzeszuk.com. Wszelkie prawa zastrzeżone.</p>

            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/in/mgrzeszuk/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="https://github.com/michalek990/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="GitHub">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="https://wa.me/48577980820" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-green-500 transition-colors" aria-label="WhatsApp">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.729-1.458L0 24zm6.59-4.846c1.665.989 3.3 1.488 5.336 1.489 5.53 0 10.026-4.493 10.029-10.02.001-2.678-1.04-5.196-2.932-7.091-1.892-1.893-4.407-2.934-7.09-2.935-5.533 0-10.03 4.493-10.033 10.021-.001 2.152.569 4.253 1.649 6.113L1.816 21.845l4.831-1.267zm12.333-3.666c-.32-.16-1.892-.933-2.185-1.04-.293-.106-.507-.16-.72.16-.213.32-.826 1.04-.1.127.373-.106.746-.226.96-.333.214-.106.427-.16.64-.16.213 0 .853.106 1.066.213.213.106 1.412.693 1.546.933.134.24.134.134.027.427-.107.293-.613 1.359-.853 1.412-.24.054-.453.08-.107-.64-.346-1.52-1.333-2.319-1.84-2.586-.507-.266-.853-.213-1.2.187-.347.4-.1.134-.347.027-.24-.107-1.12-.413-2.133-1.32-.787-.702-1.317-1.569-1.472-1.835-.155-.266-.016-.41.118-.543.121-.119.267-.313.4-.469.133-.156.178-.266.267-.44.089-.175.044-.326-.022-.459-.067-.133-.507-1.221-.693-1.672-.182-.439-.365-.379-.507-.385-.13-.006-.28-.007-.43-.007-.15 0-.395.056-.602.282-.207.226-.79.772-.79 1.884 0 1.111.808 2.186.92 2.336.112.15 1.59 2.429 3.853 3.404.538.232 1.012.381 1.358.49.541.173 1.033.149 1.422.09.434-.065 1.39-.568 1.587-1.117.197-.549.197-1.02.138-1.117-.059-.097-.218-.157-.538-.317z" />
              </svg>
              </a>
              {/* Discord */}
              <a href="https://discord.gg/TWOJ-KOD" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors" aria-label="Discord">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.298 12.298 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.078.078 0 0 0 .084 .028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>

        {/* --- WIZUALNY BANER COOKIES --- */}
        <AnimatePresence>
          {showCookieBanner && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 rounded-[2rem] flex flex-col gap-4 backdrop-blur-lg bg-white/90 dark:bg-slate-900/90"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-2xl flex-shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Dbam o Twoją prywatność</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Ta strona wykorzystuje ciasteczka (cookies) do celów statystycznych i optymalizacji działania. Korzystając ze strony, zgadzasz się na ich zapis in Twojej przeglądarce.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 mt-1">
                <button
                  onClick={acceptCookies}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-full transition-colors shadow-md shadow-indigo-600/10 active:scale-95"
                  type="button"
                >
                  Akceptuję
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className={`${isDark ? "dark" : ""} scroll-smooth`}>
      <AnimatePresence mode="wait">{renderView()}</AnimatePresence>
    </div>
  );
}