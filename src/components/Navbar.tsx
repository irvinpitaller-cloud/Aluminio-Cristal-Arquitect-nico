import React from 'react';
import { Calculator, Phone, Layers, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenCotizador: () => void;
  itemsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCotizador, itemsCount }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element, 1 line) */}
        <a href="#" className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group">
          <div className="w-9 h-9 rounded bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-slate-900 transition-colors">
            <Layers className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white leading-none">
              AlumVidrio<span className="text-sky-400">Pro</span>
            </span>
            <span className="text-[10px] tracking-wider text-slate-400 uppercase mt-0.5">
              Aluminio & Cristal Arquitectónico
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (single line, no capsules) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#proyectos"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Proyectos
          </a>
          <a
            href="#comparador"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Comparador Multimarca
          </a>
          <a
            href="#cotizador"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Cotizador & Despiece
          </a>
          <a
            href="#servicios"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Ingeniería de Taller
          </a>
          <a
            href="#contacto"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Contacto
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCotizador}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-900 bg-sky-400 hover:bg-sky-300 rounded-md transition-colors shadow-sm whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            <Calculator className="w-4 h-4" />
            <span>Cotizar Proyecto</span>
            {itemsCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-slate-900 text-sky-300 rounded text-xs font-bold tabular-nums">
                {itemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
