import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectGallery } from './components/ProjectGallery';
import { BrandComparator } from './components/BrandComparator';
import { QuoteConfigurator, QuotedItem } from './components/QuoteConfigurator';
import { DispatchModal } from './components/DispatchModal';
import { EngineeringSection } from './components/EngineeringSection';
import { Footer } from './components/Footer';
import { History, Clock, Trash2, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [quotedItems, setQuotedItems] = useState<QuotedItem[]>([]);
  const [isDispatchOpen, setIsDispatchOpen] = useState<boolean>(false);
  const [selectedBrandForQuote, setSelectedBrandForQuote] = useState<string>('Cuprum');
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [historyQuotes, setHistoryQuotes] = useState<any[]>([]);

  // Cargar historial local
  useEffect(() => {
    try {
      const saved = localStorage.getItem('alumvidrio_cotizaciones');
      if (saved) {
        setHistoryQuotes(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Error leyendo historial:', e);
    }
  }, [isDispatchOpen]);

  const handleOpenCotizador = () => {
    const el = document.getElementById('cotizador');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectBrandForQuote = (brand: string) => {
    setSelectedBrandForQuote(brand);
    handleOpenCotizador();
  };

  const handleOpenDispatch = () => {
    setIsDispatchOpen(true);
  };

  const handleRestoreQuote = (items: QuotedItem[]) => {
    setQuotedItems(items);
    setShowHistory(false);
    handleOpenCotizador();
  };

  const handleClearHistory = () => {
    localStorage.removeItem('alumvidrio_cotizaciones');
    setHistoryQuotes([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenCotizador={handleOpenCotizador}
        itemsCount={quotedItems.length}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Showcase with high impact architectural visual */}
        <Hero onStartQuote={handleOpenCotizador} />

        {/* 2. Gallery of Completed Projects with high-res photos */}
        <ProjectGallery />

        {/* 3. Multibrand Comparison Matrix (Cuprum, Indalum, Eurovent, Saint-Gobain) */}
        <BrandComparator onSelectBrandForQuote={handleSelectBrandForQuote} />

        {/* 4. Interactive Configurator & Workshop Cutting List Engine */}
        <QuoteConfigurator
          onOpenDispatch={handleOpenDispatch}
          quotedItems={quotedItems}
          setQuotedItems={setQuotedItems}
          defaultBrand={selectedBrandForQuote}
        />

        {/* 5. Workshop Engineering, Fabrication Tolerances & Standards */}
        <EngineeringSection />
      </main>

      {/* Persistent Floating Bottom Bar if user has items in quote */}
      {quotedItems.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-xl mx-auto p-3.5 bg-slate-900/95 border border-sky-500/40 rounded-xl shadow-2xl backdrop-blur-md flex items-center justify-between text-xs animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <div>
              <span className="font-bold text-white">{quotedItems.length} pieza(s) cotizada(s)</span>
              <span className="text-slate-400 ml-2 font-mono">
                Total: ${quotedItems.reduce((acc, i) => acc + i.precioTotal, 0).toLocaleString()} MXN
              </span>
            </div>
          </div>
          <button
            onClick={handleOpenDispatch}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-colors cursor-pointer"
          >
            Finalizar Cotización
          </button>
        </div>
      )}

      {/* Floating Button to view Past Quotes History in localStorage */}
      {historyQuotes.length > 0 && !quotedItems.length && (
        <div className="fixed bottom-4 right-4 z-30">
          <button
            onClick={() => setShowHistory(true)}
            className="px-3.5 py-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300 font-medium shadow-lg backdrop-blur-md flex items-center gap-2 cursor-pointer transition-colors"
          >
            <History className="w-3.5 h-3.5 text-sky-400" />
            <span>Ver Cotizaciones Guardadas ({historyQuotes.length})</span>
          </button>
        </div>
      )}

      {/* History Drawer Modal */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-sm font-bold">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>Historial de Cotizaciones Recientes</span>
              </div>
              <button
                onClick={() => setShowHistory(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                Cerrar
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
              {historyQuotes.map((hist, idx) => (
                <div
                  key={hist.id || idx}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="font-semibold text-white">
                      {hist.cliente} · {new Date(hist.fecha).toLocaleDateString()}
                    </div>
                    <div className="text-slate-400 font-mono">
                      {hist.items?.length || 0} pieza(s) · Total: ${hist.total?.toLocaleString()} MXN
                    </div>
                    {hist.ciudad && <div className="text-slate-500">{hist.ciudad}</div>}
                  </div>
                  <button
                    onClick={() => handleRestoreQuote(hist.items || [])}
                    className="px-2.5 py-1.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 rounded border border-sky-500/30 text-xs font-semibold transition-colors"
                  >
                    Cargar
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
              <button
                onClick={handleClearHistory}
                className="text-red-400 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Vaciar historial
              </button>
              <button
                onClick={() => setShowHistory(false)}
                className="px-3 py-1.5 bg-slate-800 text-white rounded text-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lead Capture and Direct Dispatch Modal (WhatsApp / Mail / Print) */}
      <DispatchModal
        isOpen={isDispatchOpen}
        onClose={() => setIsDispatchOpen(false)}
        quotedItems={quotedItems}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
