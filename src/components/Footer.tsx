import React from 'react';
import { Layers, Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contacto" className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-8 h-8 rounded bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400">
                <Layers className="w-4 h-4" />
              </div>
              <span>
                AlumVidrio<span className="text-sky-400">Pro</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Especialistas en carpintería de aluminio de alta gama, templados de seguridad, canceles
              de baño y fachadas de cristal arquitectónico con cálculo paramétrico exacto.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantía estructural por escrito</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-sm font-semibold text-white uppercase tracking-wider">
              Navegación
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#proyectos" className="hover:text-white transition-colors">
                  Galería de Proyectos
                </a>
              </li>
              <li>
                <a href="#comparador" className="hover:text-white transition-colors">
                  Comparador Cuprum · Indalum · Eurovent
                </a>
              </li>
              <li>
                <a href="#cotizador" className="hover:text-white transition-colors">
                  Cotizador & Fórmulas de Taller
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Estándares de Ingeniería
                </a>
              </li>
            </ul>
          </div>

          {/* Supported Systems */}
          <div className="space-y-3">
            <div className="text-sm font-semibold text-white uppercase tracking-wider">
              Sistemas de Taller
            </div>
            <ul className="space-y-1.5 text-slate-400 font-mono text-[11px]">
              <li>• Ventana 3 Hojas Telescópica 3"</li>
              <li>• Ventanal OXXO Monumental c/ Mosquitero</li>
              <li>• Ventana Corrediza 2" y 3" Residencial</li>
              <li>• Puerta Batiente 2" y Puerta Ligera</li>
              <li>• Canceles de Baño Semilujo Templado</li>
              <li>• Muros Cortina y Ventana Fija 1 1/2"</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <div className="text-sm font-semibold text-white uppercase tracking-wider">
              Contacto y Taller
            </div>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>+52 (55) 7890 1234 / WhatsApp de Cotizaciones</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>contacto@alumvidriopro.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Taller de Extrusión y Habilitado · Parque Industrial Norte</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Lunes a Viernes: 8:00 AM - 6:30 PM | Sáb: 9:00 AM - 2:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} AlumVidrio Pro. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>Tolerancia milimétrica en taller</span>
            <span>·</span>
            <span>Perfiles certificados AAMA / Qualicoat</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
