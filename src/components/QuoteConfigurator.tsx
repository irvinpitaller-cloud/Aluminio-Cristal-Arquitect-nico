import React, { useState, useMemo } from 'react';
import {
  TIPOLOGIAS_CATALOGO,
  COMPARADOR_MARCAS,
  OPCIONES_CRISTAL,
  ACABADOS_ALUMINIO,
  TypologyDefinition,
  evaluarFormula,
} from '../data/aluminumData';
import { SchematicPreview } from './SchematicPreview';
import {
  Calculator,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Ruler,
  Check,
  Send,
  Layers,
  Copy,
  Info,
} from 'lucide-react';

export interface QuotedItem {
  id: string;
  tipologiaId: string;
  nombreTipologia: string;
  ancho: number;
  alto: number;
  marcaPerfil: string;
  tipoCristalId: string;
  nombreCristal: string;
  acabadoId: string;
  nombreAcabado: string;
  cantidad: number;
  precioUnitario: number;
  precioTotal: number;
  despiece: {
    nombre: string;
    tipo: string;
    cantidad: number;
    longitudMm: number;
    alturaMm?: number;
    unidad: string;
    formula: string;
  }[];
}

interface QuoteConfiguratorProps {
  onOpenDispatch: (items: QuotedItem[]) => void;
  quotedItems: QuotedItem[];
  setQuotedItems: React.Dispatch<React.SetStateAction<QuotedItem[]>>;
  defaultBrand?: string;
}

export const QuoteConfigurator: React.FC<QuoteConfiguratorProps> = ({
  onOpenDispatch,
  quotedItems,
  setQuotedItems,
  defaultBrand,
}) => {
  // Current item being configured
  const [selectedTypologyId, setSelectedTypologyId] = useState<string>(
    TIPOLOGIAS_CATALOGO[0].id
  );
  const currentTypology =
    TIPOLOGIAS_CATALOGO.find((t) => t.id === selectedTypologyId) ||
    TIPOLOGIAS_CATALOGO[0];

  const [ancho, setAncho] = useState<number>(currentTypology.anchoDefault);
  const [alto, setAlto] = useState<number>(currentTypology.altoDefault);
  const [marca, setMarca] = useState<string>(defaultBrand || 'Cuprum');
  const [cristalId, setCristalId] = useState<string>('templado_6mm');
  const [acabadoId, setAcabadoId] = useState<string>('negro');
  const [cantidad, setCantidad] = useState<number>(1);
  const [showDespiece, setShowDespiece] = useState<boolean>(false);
  const [copiedCutList, setCopiedCutList] = useState<boolean>(false);

  // When typology changes, reset dimensions to reasonable defaults
  const handleSelectTypology = (t: TypologyDefinition) => {
    setSelectedTypologyId(t.id);
    setAncho(t.anchoDefault);
    setAlto(t.altoDefault);
  };

  const selectedCristal =
    OPCIONES_CRISTAL.find((c) => c.id === cristalId) || OPCIONES_CRISTAL[0];
  const selectedAcabado =
    ACABADOS_ALUMINIO.find((a) => a.id === acabadoId) || ACABADOS_ALUMINIO[1];
  const selectedBrandData =
    COMPARADOR_MARCAS.find((b) => b.marca === marca) || COMPARADOR_MARCAS[0];

  // Calculate despiece milimétrico exacto para la pieza actual
  const despieceActual = useMemo(() => {
    return currentTypology.componentes.map((c) => {
      const len = evaluarFormula(c.formulaLongitud, ancho, alto);
      const h = c.formulaAltura ? evaluarFormula(c.formulaAltura, ancho, alto) : undefined;
      return {
        componenteId: c.componenteId,
        nombre: c.nombre,
        tipo: c.tipo,
        cantidad: c.cantidad,
        longitudMm: len,
        alturaMm: h,
        unidad: c.unidad,
        formula: c.formulaAltura
          ? `${c.formulaLongitud} × ${c.formulaAltura}`
          : c.formulaLongitud || 'Fijo',
      };
    });
  }, [currentTypology, ancho, alto]);

  // Pricing calculation
  const unitPrice = useMemo(() => {
    const areaM2 = (ancho / 1000) * (alto / 1000);
    const basePrice = areaM2 * currentTypology.precioBaseM2;
    const withBrand = basePrice * selectedBrandData.precioIndice;
    const withGlass = withBrand * selectedCristal.precioFactor;
    const withFinish = withGlass * (1 + selectedAcabado.recargo);
    return Math.round(withFinish);
  }, [ancho, alto, currentTypology, selectedBrandData, selectedCristal, selectedAcabado]);

  const totalPrice = unitPrice * cantidad;

  // Add configured item to quotes list
  const handleAddItem = () => {
    const newItem: QuotedItem = {
      id: `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      tipologiaId: currentTypology.id,
      nombreTipologia: currentTypology.nombre,
      ancho,
      alto,
      marcaPerfil: marca,
      tipoCristalId: cristalId,
      nombreCristal: selectedCristal.nombre,
      acabadoId,
      nombreAcabado: selectedAcabado.nombre,
      cantidad,
      precioUnitario: unitPrice,
      precioTotal: totalPrice,
      despiece: despieceActual,
    };

    setQuotedItems((prev) => [...prev, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setQuotedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCopyCutList = () => {
    const text = `CORTES DE TALLER: ${currentTypology.nombre} (${ancho}mm × ${alto}mm)
--------------------------------------------------
` + despieceActual.map((d) => `• ${d.nombre} (${d.cantidad} pza) : ${d.longitudMm}${d.alturaMm ? ` x ${d.alturaMm}` : ''} ${d.unidad} [${d.formula}]`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedCutList(true);
    setTimeout(() => setCopiedCutList(false), 2000);
  };

  const grandTotal = useMemo(() => {
    return quotedItems.reduce((acc, item) => acc + item.precioTotal, 0);
  }, [quotedItems]);

  return (
    <section id="cotizador" className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 tracking-wider uppercase mb-2">
            <Calculator className="w-4 h-4" /> Configurador Interactivo
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Cotizador Técnico & Despiece Milimétrico
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Selecciona la tipología, ingresa medidas exactas y obtén en tiempo real el desglose
            de perfiles cortados, m² de vidrio y presupuesto estimado.
          </p>
        </div>

        {/* Typology Carousel / Filter Pills */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            1. Selecciona el Sistema o Tipología:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {TIPOLOGIAS_CATALOGO.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelectTypology(t)}
                className={`p-3 rounded-lg text-left transition-all border cursor-pointer ${
                  selectedTypologyId === t.id
                    ? 'bg-sky-500/10 border-sky-400 text-white ring-1 ring-sky-400/30'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div className="text-xs font-bold truncate">{t.nombre}</div>
                <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between font-mono">
                  <span>Serie: {t.serie}</span>
                  {t.usaMosquitero && <span className="text-sky-400">c/ Mosq</span>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main 2-Column Workstation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Vector Schematic & Cut Sheet Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 shadow-xl">
              <div className="flex items-center justify-between px-2 mb-2 text-xs">
                <span className="font-semibold text-slate-300">Esquema Proporcional</span>
                <span className="font-mono text-slate-500">
                  {ancho} × {alto} mm
                </span>
              </div>

              {/* Schematic SVG component */}
              <div className="rounded-xl overflow-hidden border border-slate-900 bg-black/40">
                <SchematicPreview
                  typology={currentTypology}
                  ancho={ancho}
                  alto={alto}
                  acabadoId={acabadoId}
                />
              </div>

              {/* Typology Info */}
              <p className="text-xs text-slate-400 mt-3 px-2 leading-relaxed">
                {currentTypology.descripcion}
              </p>
            </div>

            {/* Expandable Technical Cut List / Despiece de Taller */}
            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
              <button
                onClick={() => setShowDespiece(!showDespiece)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-900/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Ruler className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Despiece Técnico de Taller ({despieceActual.length} componentes)
                  </span>
                </div>
                {showDespiece ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {showDespiece && (
                <div className="p-4 border-t border-slate-800/80 space-y-3 animate-in fade-in duration-150">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">
                      Cortes calculados en base a fórmulas paramétricas exactas
                    </span>
                    <button
                      onClick={handleCopyCutList}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-sky-300 rounded border border-slate-700 transition-colors"
                    >
                      {copiedCutList ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCutList ? 'Copiado' : 'Copiar lista'}</span>
                    </button>
                  </div>

                  <div className="max-h-60 overflow-y-auto rounded-lg border border-slate-800 bg-slate-900/60 text-xs">
                    <table className="w-full text-left font-mono">
                      <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase sticky top-0">
                        <tr className="border-b border-slate-800">
                          <th className="py-2 px-3">Pieza</th>
                          <th className="py-2 px-3 text-center">Cant</th>
                          <th className="py-2 px-3">Fórmula</th>
                          <th className="py-2 px-3 text-right">Medida</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300 text-[11px]">
                        {despieceActual.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/30">
                            <td className="py-2 px-3 font-medium">
                              <div>{item.nombre}</div>
                              <span className="text-[10px] text-slate-500">{item.tipo}</span>
                            </td>
                            <td className="py-2 px-3 text-center text-white">{item.cantidad}</td>
                            <td className="py-2 px-3 text-slate-400 text-[10px]">{item.formula}</td>
                            <td className="py-2 px-3 text-right font-bold text-sky-400">
                              {item.longitudMm}
                              {item.alturaMm ? ` × ${item.alturaMm}` : ''}{' '}
                              <span className="text-[10px] text-slate-500 font-normal">{item.unidad}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Parameters, Dimensions, Finish, Glass, Cart */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 sm:p-8 space-y-6">
              {/* 2. Dimensions input */}
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  2. Dimensiones del Vano (en milímetros):
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Ancho A */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-medium text-slate-300">Ancho (A)</label>
                      <span className="font-mono text-sm font-bold text-sky-400">
                        {ancho} mm <span className="text-xs text-slate-500 font-normal">({(ancho / 1000).toFixed(2)} m)</span>
                      </span>
                    </div>
                    <input
                      type="range"
                      min={currentTypology.anchoMin}
                      max={currentTypology.anchoMax}
                      step={10}
                      value={ancho}
                      onChange={(e) => setAncho(Number(e.target.value))}
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                      <span>Mín: {currentTypology.anchoMin}mm</span>
                      <span>Máx: {currentTypology.anchoMax}mm</span>
                    </div>
                  </div>

                  {/* Alto H */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-medium text-slate-300">Alto (H)</label>
                      <span className="font-mono text-sm font-bold text-sky-400">
                        {alto} mm <span className="text-xs text-slate-500 font-normal">({(alto / 1000).toFixed(2)} m)</span>
                      </span>
                    </div>
                    <input
                      type="range"
                      min={currentTypology.altoMin}
                      max={currentTypology.altoMax}
                      step={10}
                      value={alto}
                      onChange={(e) => setAlto(Number(e.target.value))}
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                      <span>Mín: {currentTypology.altoMin}mm</span>
                      <span>Máx: {currentTypology.altoMax}mm</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Perfilería & Acabado */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Brand */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    3. Marca de Perfil:
                  </label>
                  <select
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                  >
                    <option value="Cuprum">Cuprum (Línea Residencial)</option>
                    <option value="Indalum">Indalum (Línea Clásica)</option>
                    <option value="Eurovent">Eurovent (Serie 70 c/ RPT Premium)</option>
                  </select>
                </div>

                {/* Acabado Swatches */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    4. Acabado del Aluminio:
                  </label>
                  <div className="flex items-center gap-2">
                    {ACABADOS_ALUMINIO.map((acab) => (
                      <button
                        key={acab.id}
                        type="button"
                        onClick={() => setAcabadoId(acab.id)}
                        title={acab.nombre}
                        className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer flex items-center justify-center ${
                          acabadoId === acab.id
                            ? 'border-sky-400 scale-110 shadow-sm'
                            : 'border-slate-700 hover:border-slate-500'
                        }`}
                        style={{ backgroundColor: acab.hex }}
                      >
                        {acabadoId === acab.id && (
                          <Check
                            className={`w-3.5 h-3.5 ${
                              acab.id === 'blanco' || acab.id === 'natural'
                                ? 'text-slate-900'
                                : 'text-white'
                            }`}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="text-xs text-slate-400 mt-1.5 font-medium">
                    {selectedAcabado.nombre}
                  </div>
                </div>
              </div>

              {/* 5. Glass Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  5. Tipo de Vidrio Arquitectónico:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {OPCIONES_CRISTAL.map((vidrio) => (
                    <button
                      key={vidrio.id}
                      type="button"
                      onClick={() => setCristalId(vidrio.id)}
                      className={`p-3 rounded-lg text-left border transition-all cursor-pointer ${
                        cristalId === vidrio.id
                          ? 'bg-sky-500/10 border-sky-400 ring-1 ring-sky-400/40'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-white">
                        <span>{vidrio.nombre}</span>
                        <span className="font-mono text-[10px] text-sky-400">{vidrio.espesor}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                        {vidrio.tipo} · {vidrio.aislamientoAcustico}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Price Calculation Box */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-medium">Cantidad:</span>
                  <div className="flex items-center border border-slate-800 rounded-lg bg-slate-900">
                    <button
                      type="button"
                      onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                      className="px-3 py-1 text-slate-400 hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-sm font-bold font-mono text-white">
                      {cantidad}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCantidad((c) => c + 1)}
                      className="px-3 py-1 text-slate-400 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-slate-400">Presupuesto Estimado:</div>
                  <div className="text-2xl font-black text-sky-400 font-mono">
                    ${totalPrice.toLocaleString()} MXN
                  </div>
                  <div className="text-[10px] text-slate-500">
                    ${unitPrice.toLocaleString()} c/u (IVA y mano de obra incluidos)
                  </div>
                </div>
              </div>

              {/* Add to list CTA button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="w-full py-3.5 px-4 bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-sky-500/10"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar esta Pieza a la Cotización</span>
                </button>
              </div>
            </div>

            {/* Quoted Items List / Cart */}
            {quotedItems.length > 0 && (
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-sky-400" />
                    <span>Resumen del Proyecto ({quotedItems.length} piezas)</span>
                  </h3>
                  <button
                    onClick={() => setQuotedItems([])}
                    className="text-[11px] text-red-400 hover:underline"
                  >
                    Vaciar lista
                  </button>
                </div>

                <div className="divide-y divide-slate-800/80">
                  {quotedItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className="py-3 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-semibold text-white">
                          {idx + 1}. {item.nombreTipologia}
                        </div>
                        <div className="text-slate-400 font-mono text-[11px]">
                          {item.ancho} × {item.alto} mm · {item.cantidad} pza(s)
                        </div>
                        <div className="text-slate-500 text-[11px]">
                          {item.marcaPerfil} · {item.nombreAcabado} · {item.nombreCristal}
                        </div>
                      </div>

                      <div className="text-right shrink-0 flex items-center gap-3">
                        <div className="font-mono font-bold text-sky-400 text-sm">
                          ${item.precioTotal.toLocaleString()}
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-slate-500 hover:text-red-400 transition-colors p-1"
                          title="Eliminar pieza"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Grand Total & Final Dispatch Button */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-slate-400">Total Global Presupuestado:</div>
                    <div className="text-2xl font-black text-white font-mono">
                      ${grandTotal.toLocaleString()} MXN
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenDispatch(quotedItems)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10"
                  >
                    <Send className="w-4 h-4" />
                    <span>Generar Cotización (WhatsApp / Correo)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
