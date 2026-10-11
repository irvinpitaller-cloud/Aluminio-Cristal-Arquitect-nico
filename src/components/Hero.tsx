import React from 'react';
import { ArrowRight, ShieldCheck, Ruler, Sparkles, Building2 } from 'lucide-react';
import heroImg from '../assets/images/hero_architectural_glass_1791684089442.jpg';

interface HeroProps {
  onStartQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartQuote }) => {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 tracking-wider uppercase">
              <span className="w-2 h-0.5 bg-sky-400"></span>
              Ingeniería en Aluminio & Cristal Templado
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Precisión en cada corte,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-indigo-300">
                excelencia en cada claro
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Diseño, fabricación y montaje de cancelería arquitectónica de alto rendimiento.
              Integramos perfiles multimarca <span className="text-white font-medium">Cuprum</span>,{' '}
              <span className="text-white font-medium">Indalum</span>,{' '}
              <span className="text-white font-medium">Eurovent con RPT</span> y cristales de seguridad{' '}
              <span className="text-white font-medium">Saint-Gobain</span> con cálculo milimétrico de taller.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartQuote}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-slate-900 bg-sky-400 hover:bg-sky-300 rounded-md transition-all shadow-lg shadow-sky-500/10 cursor-pointer"
              >
                <span>Configurar y Cotizar en Línea</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#comparador"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-md transition-colors"
              >
                <span>Comparar Fabricantes</span>
              </a>
            </div>

            {/* Metric Proof Strip */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-6 max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">0.5 mm</div>
                <div className="text-xs text-slate-400 mt-0.5">Tolerancia en cortes de taller</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">15 Años</div>
                <div className="text-xs text-slate-400 mt-0.5">Garantía en sistemas Eurovent</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">+1,200</div>
                <div className="text-xs text-slate-400 mt-0.5">Proyectos residenciales y torres</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 aspect-[4/3] lg:aspect-auto lg:h-[460px]">
              <img
                src={heroImg}
                alt="Cancelería de aluminio y vidrio en residencia moderna"
                className="w-full h-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>

              {/* Float badge proof */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/80 flex items-center justify-between text-xs text-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span className="font-medium text-white">Línea Eurovent Serie 100</span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">SGG Cool-Lite 22mm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
