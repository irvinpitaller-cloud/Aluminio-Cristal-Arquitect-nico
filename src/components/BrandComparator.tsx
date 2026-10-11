import React, { useState } from 'react';
import { COMPARADOR_MARCAS, OPCIONES_CRISTAL, BrandComparison } from '../data/aluminumData';
import { Shield, Sparkles, Wind, VolumeX, CheckCircle, ArrowRight, Gauge, Cpu } from 'lucide-react';

interface BrandComparatorProps {
  onSelectBrandForQuote: (brand: string) => void;
}

export const BrandComparator: React.FC<BrandComparatorProps> = ({ onSelectBrandForQuote }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('Eurovent');
  const [activeTab, setActiveTab] = useState<'perfiles' | 'vidrios'>('perfiles');

  const currentBrandData = COMPARADOR_MARCAS.find((b) => b.marca === selectedBrand) || COMPARADOR_MARCAS[2];

  return (
    <section id="comparador" className="py-20 bg-slate-950 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 tracking-wider uppercase mb-2">
            <Cpu className="w-4 h-4" /> Matriz Comparativa Multimarca
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Especificaciones Técnicas por Fabricante
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Compara objetivamente espesores de pared, resistencia estructural al viento,
            atenuación acústica y aislamiento térmico entre los principales fabricantes.
          </p>

          {/* Toggle between Perfiles and Cristales */}
          <div className="mt-6 inline-flex p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setActiveTab('perfiles')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'perfiles'
                  ? 'bg-sky-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Perfilería de Aluminio (Cuprum, Indalum, Eurovent)
            </button>
            <button
              onClick={() => setActiveTab('vidrios')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'vidrios'
                  ? 'bg-sky-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tecnología de Vidrio (Saint-Gobain / Vitro)
            </button>
          </div>
        </div>

        {activeTab === 'perfiles' ? (
          <div>
            {/* Brand Selector Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {COMPARADOR_MARCAS.map((b) => (
                <button
                  key={b.marca}
                  onClick={() => setSelectedBrand(b.marca)}
                  className={`text-left p-5 rounded-xl border transition-all cursor-pointer ${
                    selectedBrand === b.marca
                      ? 'bg-slate-900 border-sky-500 ring-1 ring-sky-500/50 shadow-lg shadow-sky-500/5'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-bold text-white">{b.marca}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        b.nivelPrecio === 'Premium' || b.nivelPrecio === 'Ultra-Lujo'
                          ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                          : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                      }`}
                    >
                      {b.nivelPrecio}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono mb-3">{b.linea}</div>
                  <div className="text-[11px] text-slate-500 line-clamp-2">{b.idealPara}</div>
                </button>
              ))}
            </div>

            {/* Detailed Brand Spotlight Bento Card */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Brand description and features */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-white">{currentBrandData.marca}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-xs text-slate-400 font-mono">{currentBrandData.fabricante}</span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {currentBrandData.descripcion}
                  </p>

                  <div className="pt-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Aplicación Recomendada:
                    </div>
                    <div className="text-sm text-sky-300 font-medium bg-sky-950/40 border border-sky-800/50 rounded-lg p-3">
                      {currentBrandData.idealPara}
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Certificaciones y Normativas:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentBrandData.certificaciones.map((cert) => (
                        <span
                          key={cert}
                          className="px-2.5 py-1 text-xs rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => onSelectBrandForQuote(currentBrandData.marca)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-md transition-colors"
                    >
                      <span>Cotizar con {currentBrandData.marca}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Key Technical Gauges */}
                <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                      <Gauge className="w-4 h-4 text-sky-400" />
                      <span>Espesor de Pared</span>
                    </div>
                    <div className="text-2xl font-bold text-white font-mono">
                      {currentBrandData.espesorParedMm > 0 ? `${currentBrandData.espesorParedMm} mm` : 'Variable'}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Grosor de perfil estructural</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                      <VolumeX className="w-4 h-4 text-indigo-400" />
                      <span>Aislamiento Acústico</span>
                    </div>
                    <div className="text-2xl font-bold text-indigo-300 font-mono">
                      {currentBrandData.aislamientoAcusticoDb} dB
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Atenuación de ruido exterior</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                      <Wind className="w-4 h-4 text-emerald-400" />
                      <span>Resistencia a Vientos</span>
                    </div>
                    <div className="text-2xl font-bold text-emerald-300 font-mono">
                      {currentBrandData.resistenciaVientoKmh} km/h
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Carga de presión de ráfagas</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                      <Shield className="w-4 h-4 text-amber-400" />
                      <span>Garantía de Fábrica</span>
                    </div>
                    <div className="text-2xl font-bold text-amber-300 font-mono">
                      {currentBrandData.garantiaAnos} Años
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">En extrusión y acabados</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Matrix Comparison Table */}
            <div className="mt-10 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-mono text-[11px] tracking-wider uppercase">
                    <th className="py-3 px-4">Marca / Línea</th>
                    <th className="py-3 px-4">Espesor Pared</th>
                    <th className="py-3 px-4">Atenuación Acústica</th>
                    <th className="py-3 px-4">Eficiencia Térmica</th>
                    <th className="py-3 px-4">Capacidad Vidrio</th>
                    <th className="py-3 px-4">Carga de Viento</th>
                    <th className="py-3 px-4">Rango Precio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {COMPARADOR_MARCAS.map((b) => (
                    <tr
                      key={b.marca}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        selectedBrand === b.marca ? 'bg-sky-950/20' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-semibold text-white">
                        <div className="flex items-center gap-1.5">
                          {b.marca}
                          {selectedBrand === b.marca && (
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 font-mono">{b.linea}</div>
                      </td>
                      <td className="py-3 px-4 font-mono">
                        {b.espesorParedMm > 0 ? `${b.espesorParedMm} mm` : 'Especial'}
                      </td>
                      <td className="py-3 px-4 font-mono text-indigo-300">{b.aislamientoAcusticoDb} dB</td>
                      <td className="py-3 px-4 text-xs">{b.eficienciaTermica}</td>
                      <td className="py-3 px-4 font-mono text-xs">{b.capacidadCristalMm}</td>
                      <td className="py-3 px-4 font-mono text-emerald-300">{b.resistenciaVientoKmh} km/h</td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-sky-400">{b.nivelPrecio}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Glass Technology Comparison */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OPCIONES_CRISTAL.map((vidrio) => (
              <div
                key={vidrio.id}
                className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="text-sky-400 font-semibold">{vidrio.fabricante}</span>
                    <span className="font-mono">{vidrio.espesor}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{vidrio.nombre}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{vidrio.descripcion}</p>

                  <div className="space-y-2 border-t border-slate-800 pt-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Aislamiento acústico:</span>
                      <span className="font-mono text-indigo-300 font-medium">{vidrio.aislamientoAcustico}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Control solar:</span>
                      <span className="text-slate-300 font-medium">{vidrio.controlSolar}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Seguridad ante impacto:</span>
                      <span className="text-emerald-400 font-medium">{vidrio.seguridad}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Tipo: {vidrio.tipo}</span>
                  <button
                    onClick={() => onSelectBrandForQuote('Saint-Gobain')}
                    className="text-sky-400 hover:text-sky-300 font-semibold inline-flex items-center gap-1"
                  >
                    Seleccionar <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
