import React, { useState } from 'react';
import { PROYECTOS_SHOWCASE, ProjectShowcase } from '../data/aluminumData';
import { Eye, MapPin, X, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const ProjectGallery: React.FC = () => {
  const [categoriaActiva, setCategoriaActiva] = useState<string>('Todos');
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<ProjectShowcase | null>(null);

  const categorias = ['Todos', 'Residencial', 'Fachadas', 'Canceles de Baño'];

  const proyectosFiltrados =
    categoriaActiva === 'Todos'
      ? PROYECTOS_SHOWCASE
      : PROYECTOS_SHOWCASE.filter((p) => p.categoria === categoriaActiva);

  return (
    <section id="proyectos" className="py-20 bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold text-sky-400 tracking-wider uppercase mb-2">
              Galería de Obras Ejecutadas
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Calidad y Precisión Arquitectónica
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Cada proyecto refleja ingeniería de precisión, ensambles en inglete y sellado
              hermético con materiales certificados.
            </p>
          </div>

          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-lg border border-slate-700/80 overflow-x-auto self-start md:self-auto">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaActiva(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  categoriaActiva === cat
                    ? 'bg-sky-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {proyectosFiltrados.map((proyecto) => (
            <div
              key={proyecto.id}
              onClick={() => setProyectoSeleccionado(proyecto)}
              className="group rounded-xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image Container with hover zoom */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={proyecto.imagenUrl}
                  alt={proyecto.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/90 text-sky-400 p-2 rounded-full border border-slate-700">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                {/* Location text bottom overlay */}
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>{proyecto.ubicacion}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <span className="text-sky-400 font-semibold">{proyecto.categoria}</span>
                    <span aria-hidden="true">·</span>
                    <span>{proyecto.marcaAluminio}</span>
                    <span aria-hidden="true">·</span>
                    <span>{proyecto.marcaVidrio}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                    {proyecto.titulo}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {proyecto.descripcion}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-slate-400">{proyecto.tipologia}</span>
                  <span className="text-sky-400 font-semibold inline-flex items-center gap-1 group-hover:underline">
                    Ver ficha técnica <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {proyectoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl max-h-[90vh] flex flex-col text-white">
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] w-full bg-slate-950 shrink-0">
              <img
                src={proyectoSeleccionado.imagenUrl}
                alt={proyectoSeleccionado.titulo}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setProyectoSeleccionado(null)}
                className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-white p-2 rounded-full border border-slate-700 transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <span className="text-sky-400 font-semibold">{proyectoSeleccionado.categoria}</span>
                  <span aria-hidden="true">·</span>
                  <span>{proyectoSeleccionado.ubicacion}</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {proyectoSeleccionado.titulo}
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {proyectoSeleccionado.descripcion}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div>
                  <div className="text-slate-500">Sistema / Tipología</div>
                  <div className="font-semibold text-slate-200 mt-0.5">{proyectoSeleccionado.tipologia}</div>
                </div>
                <div>
                  <div className="text-slate-500">Perfil de Aluminio</div>
                  <div className="font-semibold text-slate-200 mt-0.5">{proyectoSeleccionado.marcaAluminio}</div>
                </div>
                <div>
                  <div className="text-slate-500">Vidrio Arquitectónico</div>
                  <div className="font-semibold text-slate-200 mt-0.5">{proyectoSeleccionado.marcaVidrio}</div>
                </div>
                <div>
                  <div className="text-slate-500">Acabado Superficial</div>
                  <div className="font-semibold text-slate-200 mt-0.5">{proyectoSeleccionado.acabado}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-slate-500">Control de Calidad</div>
                  <div className="font-semibold text-emerald-400 mt-0.5">Certificación de estanqueidad y corte ±0.5mm</div>
                </div>
              </div>

              {/* Engineering Highlights */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Puntos Clave de Instalación
                </h4>
                <ul className="space-y-2">
                  {proyectoSeleccionado.caracteristicas.map((car, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{car}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Action */}
              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  onClick={() => setProyectoSeleccionado(null)}
                  className="px-5 py-2.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
