import React, { useState } from 'react';
import { QuotedItem } from './QuoteConfigurator';
import { X, Send, Mail, Printer, CheckCircle2, FileText, Phone, User, MapPin } from 'lucide-react';

interface DispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotedItems: QuotedItem[];
}

export const DispatchModal: React.FC<DispatchModalProps> = ({
  isOpen,
  onClose,
  quotedItems,
}) => {
  const [nombre, setNombre] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [correo, setCorreo] = useState<string>('');
  const [ciudad, setCiudad] = useState<string>('');
  const [notas, setNotas] = useState<string>('');
  const [enviado, setEnviado] = useState<boolean>(false);

  if (!isOpen) return null;

  const grandTotal = quotedItems.reduce((acc, item) => acc + item.precioTotal, 0);
  const totalPiezas = quotedItems.reduce((acc, item) => acc + item.cantidad, 0);

  // Formateador del mensaje para WhatsApp y Correo
  const generarTextoCotizacion = () => {
    const fecha = new Date().toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    let msg = `🏗️ *COTIZACIÓN DE CANCELERÍA - ALUMVIDRIO PRO*\n`;
    msg += `📅 *Fecha:* ${fecha}\n`;
    msg += `👤 *Cliente:* ${nombre || 'Particular'}\n`;
    if (telefono) msg += `📱 *Teléfono:* ${telefono}\n`;
    if (ciudad) msg += `📍 *Ubicación:* ${ciudad}\n`;
    msg += `\n📋 *DESGLOSE DE PIEZAS (${totalPiezas} pzas en total):*\n`;

    quotedItems.forEach((item, idx) => {
      msg += `\n${idx + 1}. *${item.nombreTipologia}*\n`;
      msg += `   • Medidas: ${item.ancho} mm (Ancho) × ${item.alto} mm (Alto)\n`;
      msg += `   • Cantidad: ${item.cantidad} pieza(s)\n`;
      msg += `   • Perfil: ${item.marcaPerfil} | Acabado: ${item.nombreAcabado}\n`;
      msg += `   • Vidrio: ${item.nombreCristal}\n`;
      msg += `   • Subtotal: $${item.precioTotal.toLocaleString()} MXN\n`;
    });

    msg += `\n💰 *TOTAL ESTIMADO:* $${grandTotal.toLocaleString()} MXN (IVA y mano de obra incluidos)\n`;

    if (notas) {
      msg += `\n📝 *Notas adicionales:* ${notas}\n`;
    }

    msg += `\n_Cotización generada a través de AlumVidrio Pro con cálculo milimétrico de taller._`;
    return msg;
  };

  const handleSendWhatsApp = () => {
    const texto = encodeURIComponent(generarTextoCotizacion());
    // Guardar en localStorage como historial de cotizaciones
    guardarEnHistorial();
    // Número default de atención o enlace libre wa.me
    const url = `https://wa.me/?text=${texto}`;
    window.open(url, '_blank');
    setEnviado(true);
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Presupuesto de Cancelería - ${nombre || 'Cliente'}`);
    const body = encodeURIComponent(generarTextoCotizacion());
    guardarEnHistorial();
    const mailto = `mailto:contacto@alumvidriopro.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    setEnviado(true);
  };

  const guardarEnHistorial = () => {
    try {
      const historialPrevio = JSON.parse(localStorage.getItem('alumvidrio_cotizaciones') || '[]');
      const nuevaCotizacion = {
        id: Date.now(),
        fecha: new Date().toISOString(),
        cliente: nombre || 'Cliente Anónimo',
        telefono,
        ciudad,
        items: quotedItems,
        total: grandTotal,
      };
      localStorage.setItem(
        'alumvidrio_cotizaciones',
        JSON.stringify([nuevaCotizacion, ...historialPrevio].slice(0, 10))
      );
    } catch (e) {
      console.warn('No se pudo guardar en almacenamiento local:', e);
    }
  };

  const handlePrint = () => {
    guardarEnHistorial();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full shadow-2xl max-h-[92vh] flex flex-col text-white overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-none">
                Generar y Enviar Presupuesto
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {totalPiezas} piezas cotizadas · Total: ${grandTotal.toLocaleString()} MXN
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Contact Details Form */}
          <div className="space-y-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Datos de Contacto para la Orden Técnica:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Nombre Completo *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Ing. Carlos Morales"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Teléfono / WhatsApp *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    placeholder="Ej. 55 1234 5678"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    placeholder="carlos@ejemplo.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Ciudad / Municipio</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Ej. CDMX / Naucalpan"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Notas especiales de instalación o acabados
              </label>
              <textarea
                rows={2}
                placeholder="Indica si requieres sellado con silicón estructural, desmonte de herrería previa o segundo piso..."
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Quick items list preview */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="font-semibold text-slate-300">Piezas a incluir en el envío:</div>
            <div className="divide-y divide-slate-800/80 max-h-36 overflow-y-auto">
              {quotedItems.map((item, idx) => (
                <div key={item.id} className="py-1.5 flex justify-between text-slate-400">
                  <span>
                    {idx + 1}. {item.nombreTipologia} ({item.ancho}×{item.alto}mm, {item.cantidad}pz)
                  </span>
                  <span className="font-mono text-slate-200">${item.precioTotal.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-white">
              <span>Total Estimado:</span>
              <span className="font-mono text-emerald-400">${grandTotal.toLocaleString()} MXN</span>
            </div>
          </div>

          {enviado && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-600/50 rounded-lg flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Cotización despachada exitosamente y guardada en tu historial.</span>
            </div>
          )}

          {/* Action Dispatch Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleSendWhatsApp}
              className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Cotización por WhatsApp Ahora</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleSendEmail}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>Enviar por Correo</span>
              </button>

              <button
                onClick={handlePrint}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Imprimir / Guardar PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
