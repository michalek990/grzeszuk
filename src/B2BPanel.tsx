import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowLeft, Calculator, HelpCircle, Calendar, ShieldCheck, DollarSign, TrendingUp } from "lucide-react";

// --- INTERFEJSY PROPSÓW (Readonly pod SonarQube S6759) ---
interface B2BPanelProps {
  readonly isDark: boolean;
  readonly onBack: () => void;
}

interface StepItem {
  readonly title: string;
  readonly duration: string;
  readonly desc: string;
}

interface GuideItem {
  readonly phase: string;
  readonly goal: string;
  readonly questions: readonly string[];
}

// --- DANE I ETAPY ---
const projectSteps: readonly StepItem[] = [
  { title: "1. Warsztaty & Brief UX", duration: "Dni 1-3", desc: "Analiza konkurencji, rozpisanie struktury bazy danych i celów konwersji." },
  { title: "2. Architektura i Kodowanie", duration: "Dni 4-10", desc: "Budowa responsywnego interfejsu (React + TypeScript) z dbałością o SEO i RODO." },
  { title: "3. Optymalizacja i Testy", duration: "Dni 11-13", desc: "Kompresja multimediów, audyt wydajnościowy Core Web Vitals i testy bezpieczeństwa." },
  { title: "4. Wdrożenie produkcyjne", duration: "Dzień 14", desc: "Podpięcie domeny, konfiguracja certyfikatów SSL na serwerze i przekazanie dokumentacji." }
];

const meetingGuide: readonly GuideItem[] = [
  {
    phase: "Faza 1: Badanie potrzeb (Wywiad)",
    goal: "Pozwól mówić klientowi. Zrozum, gdzie uciekają mu pieniądze.",
    questions: [
      "Jak aktualnie klienci dowiadują się o Państwa usługach/lokalu?",
      "Co jest teraz największym problemem? Brak telefonów, czy marnowanie czasu na powtarzalne pytania?",
      "Jakie cele biznesowe ma zrealizować nowa platforma cyfrowa?"
    ]
  },
  {
    phase: "Faza 2: Prezentacja rozwiązań (Język Korzyści)",
    goal: "Nie mów o technologii. Mów o tym, jak technologia automatyzuje pracę.",
    questions: [
      "Szybkość ładowania zabezpiecza przed ucieczką klientów z telefonów komórkowych.",
      "Formularz rezerwacyjny i automatyczne filtry odciążą obsługę o około 70%.",
      "Struktura meta tagów SEO sprawi, że klienci łatwiej znajdą firmę w Google."
    ]
  }
];

// --- ANIMACJE (as const pod błędy ts(2322)) ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function B2BPanel({ isDark, onBack }: B2BPanelProps) {
  // Stany kalkulatora finansowego
  const [avgTicket, setAvgTicket] = useState<number>(150);
  const [lostCustomers, setLostCustomers] = useState<number>(15);
  const [showGuide, setShowGuide] = useState<boolean>(false);

  // Matematyka ROI
  const monthlyLoss = avgTicket * lostCustomers;
  const yearlyPotential = monthlyLoss * 12;

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 font-sans transition-colors duration-300 pt-28 pb-16 px-6">
        
        {/* TOP BAR */}
        <nav className="fixed top-0 left-0 w-full h-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 px-6 flex items-center">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-sm font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              type="button"
            >
              <ArrowLeft className="w-4 h-4" /> Wróć do portfolio
            </button>
            <div className="font-bold text-sm tracking-widest uppercase text-slate-400">
              Panel Konsultacji Technologicznych B2B
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* KOLUMNA LEWA + ŚRODKOWA: KALKULATOR I HARMONOGRAM */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* INTERAKTYWNY KALKULATOR ROI */}
            <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl border border-slate-100 dark:border-slate-800/60">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Kalkulator Strat i Potencjału ROI</h2>
                  <p className="text-sm text-slate-500">Przeanalizujmy twarde parametry finansowe na żywo.</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Suwak 1 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <label htmlFor="range-ticket">Średnia wartość jednego klienta (LTV):</label>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">{avgTicket} zł</span>
                  </div>
                  <input 
                    id="range-ticket"
                    type="range" 
                    min={30} 
                    max={1000} 
                    step={10}
                    value={avgTicket}
                    onChange={(e) => setAvgTicket(Number(e.target.value))}
                    className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Suwak 2 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <label htmlFor="range-customers">Szacowana liczba traconych klientów miesięcznie (brak strony/błędy):</label>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">{lostCustomers} osób</span>
                  </div>
                  <input 
                    id="range-customers"
                    type="range" 
                    min={5} 
                    max={100} 
                    step={1}
                    value={lostCustomers}
                    onChange={(e) => setLostCustomers(Number(e.target.value))}
                    className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Wyniki finansowe */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/40">
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Miesięczny ubytek przychodu</span>
                    <span className="text-2xl font-bold text-red-500 flex items-center gap-1">
                      <DollarSign className="w-5 h-5" /> {monthlyLoss} zł
                    </span>
                  </div>
                  <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-5 rounded-2xl border border-indigo-100/40 dark:border-indigo-900/30">
                    <span className="block text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">Roczny odzyskany potencjał (ROI)</span>
                    <span className="text-2xl font-bold text-emerald-500 dark:text-emerald-400 flex items-center gap-1">
                      <TrendingUp className="w-5 h-5" /> {yearlyPotential} zł
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* HARMONOGRAM INŻYNIERYJNY */}
            <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl border border-slate-100 dark:border-slate-800/60">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Plan Wdrożenia i Kamienie Milowe</h2>
                  <p className="text-sm text-slate-500">Przejrzysty proces. Klient dokładnie wie, za co płaci.</p>
                </div>
              </div>

              <div className="relative border-l border-indigo-100 dark:border-indigo-900 pl-6 ml-4 space-y-8">
                {projectSteps.map((step) => (
                  <div key={step.title} className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white dark:border-slate-900" />
                    <div className="flex items-center justify-between gap-4 mb-2 flex-wrap">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{step.title}</h3>
                      <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full uppercase tracking-wider">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* PANEL BOCZNY: ŚCIĄGAWKA DLA CIEBIE */}
          <div className="space-y-6">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="w-full py-4 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-all flex items-center justify-center gap-2"
              type="button"
            >
              <HelpCircle className="w-4 h-4" /> 
              {showGuide ? "Ukryj Asystenta Rozmowy" : "Otwórz Asystenta Rozmowy"}
            </button>

            <AnimatePresence>
              {showGuide && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={fadeInUp}
                  className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-amber-200 dark:border-amber-900/50 shadow-xl bg-amber-50/20 dark:bg-amber-950/5"
                >
                  <div className="flex items-center gap-2 mb-4 border-b border-amber-200/40 pb-3">
                    <ShieldCheck className="w-5 h-5 text-amber-600" />
                    <h3 className="font-serif italic font-bold text-amber-700 dark:text-amber-500">Ściągawka Negocjacyjna</h3>
                  </div>

                  <div className="space-y-6 text-sm">
                    {meetingGuide.map((guide) => (
                      <div key={guide.phase} className="space-y-2">
                        <h4 className="font-bold text-slate-900 dark:text-white">{guide.phase}</h4>
                        <p className="text-xs italic text-slate-500 mb-2">{guide.goal}</p>
                        <ul className="space-y-2.5 bg-white dark:bg-slate-950 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                          {guide.questions.map((q) => (
                            <li key={q.slice(0, 15)} className="flex items-start gap-2 text-slate-700 dark:text-slate-300 leading-relaxed">
                              <span className="text-indigo-500 font-bold">•</span>
                              <span>{q}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </main>
      </div>
    </div>
  );
}