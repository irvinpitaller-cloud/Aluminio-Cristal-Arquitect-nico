import React from 'react';
import { Wrench, CheckCircle, ShieldCheck, Cpu, Ruler, Truck } from 'lucide-react';

export const EngineeringSection: React.FC = () => {
  const pilares = [
    {
      icon: Ruler,
      titulo: 'Corte Milimétrico Computarizado',
      descripcion:
        'Tronzadoras de doble cabezal con lector digital que garantizan tolerancia de corte inferior a 0.5 mm, asegurando escuadras perfectas de 45° y 90° sin filtraciones.',
    },
    {
      icon: ShieldCheck,
      titulo: 'Sellado Hermético Perimetral',
      descripcion:
        'Instalación de felpas con membrana de polipropileno (Fin-Seal), viniles de caucho EPDM resistentes al ozono y silicón estructural DOW Corning 795.',
    },
    {
      icon: Cpu,
      titulo: 'Herrajes de Alto Desempeño',
      descripcion:
        'Carretillas con rodamientos sellados de agujas en acero inoxidable con capacidad de carga de hasta 250 kg por hoja para un desplazamiento suave y silencioso.',
    },
    {
      icon: Truck,
      titulo: 'Montaje Certificado en Obra',
      descripcion:
        'Cuadrillas especializadas con equipo de ventosas neumáticas de vacío y nivelación láser de precisión para vanos monumentales y fachadas.',
    },
  ];

  return (
    <section id="servicios" className="py-20 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 tracking-wider uppercase mb-2">
            <Wrench className="w-4 h-4" /> Estándares de Fabricación
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Ingeniería de Taller y Control de Calidad
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            El aluminio y cristal de primera línea solo alcanzan su máximo desempeño cuando el
            despiece técnico, los ensambles mecánicos y el sellado son ejecutados con rigor milimétrico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pilares.map((pilar, idx) => {
            const Icon = pilar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{pilar.titulo}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{pilar.descripcion}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical FAQ Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-lg font-bold text-white">¿Requieres asesoría técnica para un proyecto especial?</div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Nuestros ingenieros revisan planos arquitectónicos en AutoCAD y calculan presiones
              de viento según la altura y ubicación geográfica de la obra.
            </p>
          </div>
          <a
            href="https://wa.me/?text=Hola%2C%20solicito%20asesor%C3%ADa%20t%C3%A9cnica%20para%20un%20proyecto%20de%20canceler%C3%ADa%20arquitect%C3%B3nica."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 text-xs sm:text-sm font-semibold bg-sky-400 hover:bg-sky-300 text-slate-950 rounded-lg whitespace-nowrap transition-colors"
          >
            Hablar con un Ingeniero
          </a>
        </div>
      </div>
    </section>
  );
};
