/**
 * Base de datos técnica y fórmulas de carpintería de aluminio y vidrio
 * Contiene especificaciones milimétricas de taller, catálogo multimarca y proyectos.
 */

export interface ComponentFormula {
  componenteId: string;
  nombre: string;
  tipo: 'perfil' | 'cristal' | 'consumible' | 'revestimiento';
  familia: 'aluminio' | 'vidrio' | 'vinil' | 'felpa' | 'madera' | 'tela';
  contexto?: string;
  cantidad: number;
  formulaLongitud?: string;
  formulaAltura?: string;
  unidad: 'mm' | 'm' | 'm2' | 'pza';
  nota?: string;
}

export interface TypologyDefinition {
  id: string;
  nombre: string;
  serie: string;
  categoria: 'ventanas' | 'puertas' | 'canceles';
  usaMosquitero: boolean;
  descripcion: string;
  anchoMin: number;
  anchoMax: number;
  altoMin: number;
  altoMax: number;
  anchoDefault: number;
  altoDefault: number;
  precioBaseM2: number;
  svgType: 'tres_hojas' | 'oxxo' | 'corrediza_2' | 'puerta_batiente' | 'puerta_ligera' | 'cancel_bano' | 'fija';
  componentes: ComponentFormula[];
}

export interface BrandComparison {
  marca: string;
  linea: string;
  fabricante: string;
  espesorParedMm: number;
  aislamientoAcusticoDb: number;
  eficienciaTermica: string;
  resistenciaVientoKmh: number;
  capacidadCristalMm: string;
  garantiaAnos: number;
  nivelPrecio: 'Económico' | 'Intermedio' | 'Premium' | 'Ultra-Lujo';
  precioIndice: number; // Multiplicador base (1.0 = standard)
  descripcion: string;
  certificaciones: string[];
  idealPara: string;
}

export interface GlassOption {
  id: string;
  nombre: string;
  fabricante: 'Saint-Gobain' | 'Vitro' | 'Genérico';
  espesor: string;
  tipo: 'Claro' | 'Tintex' | 'Filtrasol' | 'Templado' | 'Laminado Acústico' | 'Doble Vidrio (Duovent)';
  aislamientoAcustico: string;
  controlSolar: string;
  seguridad: 'Estándar' | 'Media' | 'Alta (Impacto)' | 'Máxima Seguridad';
  precioFactor: number;
  descripcion: string;
}

export interface ProjectShowcase {
  id: string;
  titulo: string;
  categoria: 'Residencial' | 'Comercial' | 'Canceles de Baño' | 'Fachadas';
  ubicacion: string;
  tipologia: string;
  marcaAluminio: string;
  marcaVidrio: string;
  acabado: string;
  descripcion: string;
  caracteristicas: string[];
  imagenUrl: string;
}

// -----------------------------------------------------------------------------------
// EVALUADOR SEGURO DE FÓRMULAS DE TALLER (Matemática milimétrica para ancho A y alto H)
// -----------------------------------------------------------------------------------
export function evaluarFormula(formulaStr: string | undefined, A: number, H: number): number {
  if (!formulaStr) return 0;
  try {
    // Normalizar la cadena
    let expr = formulaStr.trim();
    // Reemplazar A y H por sus valores numéricos exactos
    // Asegurarse de no reemplazar caracteres de nombres como 'A' dentro de palabras
    expr = expr.replace(/\bA\b/g, `(${A})`);
    expr = expr.replace(/\bH\b/g, `(${H})`);

    // Validación de seguridad para permitir únicamente operadores aritméticos y números
    if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
      console.warn('Expresión inválida rechazada por seguridad:', expr);
      return 0;
    }

    // Evaluación matemática segura
    // eslint-disable-next-line no-new-func
    const fn = new Function(`return (${expr});`);
    const res = fn();
    if (typeof res !== 'number' || isNaN(res) || !isFinite(res)) {
      return 0;
    }
    return Math.round(res * 10) / 10;
  } catch (err) {
    console.error('Error evaluando fórmula:', formulaStr, err);
    return 0;
  }
}

// -----------------------------------------------------------------------------------
// CATÁLOGO DE LAS 9 TIPOLOGÍAS SEGÚN FÓRMULAS EXACTAS DEL DOCUMENTO TÉCNICO
// -----------------------------------------------------------------------------------
export const TIPOLOGIAS_CATALOGO: TypologyDefinition[] = [
  {
    id: 'ventana_3_hojas_telescopica',
    nombre: 'Ventana 3 Hojas Telescópica 3"',
    serie: '3_hojas',
    categoria: 'ventanas',
    usaMosquitero: false,
    descripcion: 'Sistema de tres hojas corredizas telescópicas en serie 3", que permite una apertura de 2/3 del claro total para máxima ventilación.',
    anchoMin: 1200,
    anchoMax: 4500,
    altoMin: 800,
    altoMax: 2600,
    anchoDefault: 2400,
    altoDefault: 1500,
    precioBaseM2: 2450,
    svgType: 'tres_hojas',
    componentes: [
      { componenteId: 'riel_3', nombre: 'Riel 3 Vías', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A', unidad: 'mm' },
      { componenteId: 'jamba_3_cabezal', nombre: 'Jamba Cabezal 3"', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A', unidad: 'mm' },
      { componenteId: 'adaptador_paloma', nombre: 'Adaptador Paloma', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A - 65', unidad: 'mm' },
      { componenteId: 'jamba_3_vertical', nombre: 'Jamba Vertical 3"', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'H - 26', unidad: 'mm' },
      { componenteId: 'zoclo_3', nombre: 'Zoclo 3"', tipo: 'perfil', familia: 'aluminio', cantidad: 3, formulaLongitud: '(A - 167) / 3', unidad: 'mm' },
      { componenteId: 'cabezal_3', nombre: 'Cabezal 3"', tipo: 'perfil', familia: 'aluminio', cantidad: 3, formulaLongitud: '(A - 167) / 3', unidad: 'mm' },
      { componenteId: 'cerco_chapa_3_fijo', nombre: 'Cerco Chapa 3" Fijo', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'H', unidad: 'mm' },
      { componenteId: 'cerco_chapa_3_corredizo', nombre: 'Cerco Chapa 3" Corredizo', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'H - 40', unidad: 'mm' },
      { componenteId: 'traslape_3_fijo', nombre: 'Traslape 3" Fijo', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'H', unidad: 'mm' },
      { componenteId: 'traslape_3_corredizo', nombre: 'Traslape 3" Corredizo', tipo: 'perfil', familia: 'aluminio', cantidad: 3, formulaLongitud: 'H - 40', unidad: 'mm' },
      { componenteId: 'cristal_fijo', nombre: 'Cristal Hoja Fija', tipo: 'cristal', familia: 'vidrio', cantidad: 1, formulaLongitud: '(A - 117) / 3', formulaAltura: 'H - 95', unidad: 'mm' },
      { componenteId: 'cristal_corredizo', nombre: 'Cristal Hojas Corredizas', tipo: 'cristal', familia: 'vidrio', cantidad: 2, formulaLongitud: '(A - 117) / 3', formulaAltura: 'H - 135', unidad: 'mm' },
      { componenteId: 'felpa', nombre: 'Felpa Perimetral', tipo: 'consumible', familia: 'felpa', cantidad: 1, formulaLongitud: '((A * 5) + (H * 8)) / 1000', unidad: 'm' },
      { componenteId: 'vinil', nombre: 'Vinil de Empaque', tipo: 'consumible', familia: 'vinil', cantidad: 1, formulaLongitud: '((A * 2) + (H * 9)) / 1000', unidad: 'm' },
    ],
  },
  {
    id: 'ventanal_oxxo',
    nombre: 'Ventanal OXXO (4 Hojas + Mosquitero)',
    serie: 'oxxo',
    categoria: 'ventanas',
    usaMosquitero: true,
    descripcion: 'Diseño monumental de 4 hojas (dos fijas laterales y dos corredizas centrales) con mosquitero corredizo integrado.',
    anchoMin: 2000,
    anchoMax: 5500,
    altoMin: 1200,
    altoMax: 2700,
    anchoDefault: 3200,
    altoDefault: 2100,
    precioBaseM2: 2650,
    svgType: 'oxxo',
    componentes: [
      { componenteId: 'riel_3', nombre: 'Riel 3 Vías Oxxo', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A', unidad: 'mm' },
      { componenteId: 'jamba_3_mosquitero', nombre: 'Jamba Mosquitero 3"', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A', unidad: 'mm' },
      { componenteId: 'adaptador_mosquitero', nombre: 'Adaptador Mosquitero', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A', unidad: 'mm' },
      { componenteId: 'jamba_3_vertical', nombre: 'Jamba Vertical 3"', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'H - 26', unidad: 'mm' },
      { componenteId: 'zoclo_3', nombre: 'Zoclo 3" (4 pzas)', tipo: 'perfil', familia: 'aluminio', cantidad: 4, formulaLongitud: '(A - 330) / 4', unidad: 'mm' },
      { componenteId: 'cabezal_3', nombre: 'Cabezal 3" (4 pzas)', tipo: 'perfil', familia: 'aluminio', cantidad: 4, formulaLongitud: '(A - 330) / 4', unidad: 'mm' },
      { componenteId: 'cerco_chapa_3_fijo', nombre: 'Cerco Chapa Fijo', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'H - 30', unidad: 'mm' },
      { componenteId: 'cerco_chapa_3_corredizo', nombre: 'Cerco Chapa Corredizo', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'H - 40', unidad: 'mm' },
      { componenteId: 'traslape_3_fijo', nombre: 'Traslape Fijo', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'H - 30', unidad: 'mm' },
      { componenteId: 'traslape_3_corredizo', nombre: 'Traslape Corredizo', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'H - 40', unidad: 'mm' },
      { componenteId: 'vertical_mosquitero', nombre: 'Vertical Mosquitero', tipo: 'perfil', familia: 'aluminio', cantidad: 4, formulaLongitud: 'H - 20', unidad: 'mm' },
      { componenteId: 'horizontal_mosquitero', nombre: 'Horizontal Mosquitero', tipo: 'perfil', familia: 'aluminio', cantidad: 4, formulaLongitud: '(A - 10) / 4', unidad: 'mm' },
      { componenteId: 'adaptador_oxxo', nombre: 'Adaptador Central Oxxo', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'H - 50', unidad: 'mm' },
      { componenteId: 'cristal_fijo', nombre: 'Cristales Fijos (2 pzas)', tipo: 'cristal', familia: 'vidrio', cantidad: 2, formulaLongitud: '(A - 265) / 4', formulaAltura: 'H - 125', unidad: 'mm' },
      { componenteId: 'cristal_corredizo', nombre: 'Cristales Corredizos (2 pzas)', tipo: 'cristal', familia: 'vidrio', cantidad: 2, formulaLongitud: '(A - 265) / 4', formulaAltura: 'H - 135', unidad: 'mm' },
      { componenteId: 'felpa', nombre: 'Felpa para Oxxo', tipo: 'consumible', familia: 'felpa', cantidad: 1, formulaLongitud: '((A * 5) + (H * 10)) / 1000', unidad: 'm' },
      { componenteId: 'vinil_11_peine', nombre: 'Vinil 11 Peine', tipo: 'consumible', familia: 'vinil', cantidad: 1, formulaLongitud: '((A * 2) + (H * 8)) / 1000', unidad: 'm' },
    ],
  },
  {
    id: 'ventana_corrediza_3',
    nombre: 'Ventana Corrediza 3" (2 Hojas con Mosquitero)',
    serie: '3_pulgadas',
    categoria: 'ventanas',
    usaMosquitero: true,
    descripcion: 'La ventana residencial clásica de dos hojas (una fija y una móvil corrediza) con mosquitero corredizo en canal independiente.',
    anchoMin: 800,
    anchoMax: 3000,
    altoMin: 600,
    altoMax: 2400,
    anchoDefault: 1600,
    altoDefault: 1200,
    precioBaseM2: 2150,
    svgType: 'corrediza_2',
    componentes: [
      { componenteId: 'riel_3', nombre: 'Riel Doble 3"', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A', unidad: 'mm' },
      { componenteId: 'jamba_3_mosquitero', nombre: 'Jamba Mosquitero Superior', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A', unidad: 'mm' },
      { componenteId: 'adaptador_mosquitero', nombre: 'Adaptador Mosquitero', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A', unidad: 'mm' },
      { componenteId: 'jamba_3_vertical', nombre: 'Jamba Vertical 3"', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'H - 26', unidad: 'mm' },
      { componenteId: 'zoclo_3', nombre: 'Zoclo 3"', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: '(A - 185) / 2', unidad: 'mm' },
      { componenteId: 'cabezal_3', nombre: 'Cabezal 3"', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: '(A - 185) / 2', unidad: 'mm' },
      { componenteId: 'cerco_chapa_3_fijo', nombre: 'Cerco Chapa Fijo', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'H - 30', unidad: 'mm' },
      { componenteId: 'cerco_chapa_3_corredizo', nombre: 'Cerco Chapa Corredizo', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'H - 40', unidad: 'mm' },
      { componenteId: 'traslape_3_fijo', nombre: 'Traslape Fijo', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'H - 30', unidad: 'mm' },
      { componenteId: 'traslape_3_corredizo', nombre: 'Traslape Corredizo', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'H - 40', unidad: 'mm' },
      { componenteId: 'vertical_mosquitero', nombre: 'Vertical Mosquitero', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'H - 20', unidad: 'mm' },
      { componenteId: 'horizontal_mosquitero', nombre: 'Horizontal Mosquitero', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: '(A - 25) / 2', unidad: 'mm' },
      { componenteId: 'cristal_fijo', nombre: 'Cristal Hoja Fija', tipo: 'cristal', familia: 'vidrio', cantidad: 1, formulaLongitud: '(A - 151) / 2', formulaAltura: 'H - 125', unidad: 'mm' },
      { componenteId: 'cristal_corredizo', nombre: 'Cristal Hoja Corrediza', tipo: 'cristal', familia: 'vidrio', cantidad: 1, formulaLongitud: '(A - 151) / 2', formulaAltura: 'H - 135', unidad: 'mm' },
      { componenteId: 'felpa', nombre: 'Felpa', tipo: 'consumible', familia: 'felpa', cantidad: 1, formulaLongitud: '((A * 4) + (H * 8)) / 1000', unidad: 'm' },
      { componenteId: 'vinil_peine', nombre: 'Vinil Peine', tipo: 'consumible', familia: 'vinil', cantidad: 1, formulaLongitud: '((A * 2) + (H * 4)) / 1000', unidad: 'm' },
    ],
  },
  {
    id: 'ventana_corrediza_2_mosquitero',
    nombre: 'Ventana 2" Corrediza con Mosquitero',
    serie: '2_pulgadas_con_mosquitero',
    categoria: 'ventanas',
    usaMosquitero: true,
    descripcion: 'Opción residencial estándar de 2 pulgadas, muy versátil, resistente y con mosquitero corredizo en felpa de sellado.',
    anchoMin: 700,
    anchoMax: 2600,
    altoMin: 600,
    altoMax: 2200,
    anchoDefault: 1400,
    altoDefault: 1200,
    precioBaseM2: 1850,
    svgType: 'corrediza_2',
    componentes: [
      { componenteId: 'jamba_2_mosquitero', nombre: 'Jamba Mosquitero 2"', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A', unidad: 'mm' },
      { componenteId: 'riel_2', nombre: 'Riel 2"', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A', unidad: 'mm' },
      { componenteId: 'adaptador_mosquitero_2', nombre: 'Adaptador Mosquitero 2"', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A', unidad: 'mm' },
      { componenteId: 'jamba_2_vertical', nombre: 'Jamba Vertical 2"', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'H - 26', unidad: 'mm' },
      { componenteId: 'cerco_chapa_2_fijo', nombre: 'Cerco Chapa Fijo 2"', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'H - 30', unidad: 'mm' },
      { componenteId: 'traslape_2_fijo', nombre: 'Traslape Fijo 2"', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'H - 30', unidad: 'mm' },
      { componenteId: 'cerco_chapa_2_corredizo', nombre: 'Cerco Chapa Corredizo 2"', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'H - 40', unidad: 'mm' },
      { componenteId: 'traslape_2_corredizo', nombre: 'Traslape Corredizo 2"', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'H - 40', unidad: 'mm' },
      { componenteId: 'zoclo_2', nombre: 'Zoclo 2"', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: '(A - 165) / 2', unidad: 'mm' },
      { componenteId: 'cabezal_2', nombre: 'Cabezal 2"', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: '(A - 165) / 2', unidad: 'mm' },
      { componenteId: 'horizontal_mosquitero_2', nombre: 'Horizontal Mosquitero', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: '(A - 15) / 2', unidad: 'mm' },
      { componenteId: 'vertical_mosquitero_2', nombre: 'Vertical Mosquitero', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'H - 20', unidad: 'mm' },
      { componenteId: 'cristal_fijo', nombre: 'Cristal Fijo 2"', tipo: 'cristal', familia: 'vidrio', cantidad: 1, formulaLongitud: '(A - 135) / 2', formulaAltura: 'H - 125', unidad: 'mm' },
      { componenteId: 'cristal_corredizo', nombre: 'Cristal Corredizo 2"', tipo: 'cristal', familia: 'vidrio', cantidad: 1, formulaLongitud: '(A - 135) / 2', formulaAltura: 'H - 135', unidad: 'mm' },
      { componenteId: 'felpa', nombre: 'Felpa', tipo: 'consumible', familia: 'felpa', cantidad: 1, formulaLongitud: '((A * 4) + (H * 7)) / 1000', unidad: 'm' },
      { componenteId: 'vinil_empaque', nombre: 'Vinil Empaque', tipo: 'consumible', familia: 'vinil', cantidad: 1, formulaLongitud: '((A * 2) + (H * 4)) / 1000', unidad: 'm' },
      { componenteId: 'vinil_cola_rata', nombre: 'Vinil Cola de Rata', tipo: 'consumible', familia: 'vinil', cantidad: 1, formulaLongitud: '((H * 2) + A) / 1000', unidad: 'm' },
      { componenteId: 'tela_mosquitero', nombre: 'Tela Mosquitero', tipo: 'consumible', familia: 'tela', cantidad: 1, formulaLongitud: '(A * 0.5 * H) / 1000000', unidad: 'm2' },
    ],
  },
  {
    id: 'ventana_corrediza_1_12',
    nombre: 'Ventana Corrediza 1 1/2" (Económica)',
    serie: '1_12_pulgadas',
    categoria: 'ventanas',
    usaMosquitero: false,
    descripcion: 'Línea compacta y ligera para vanos medianos a pequeños, patios de servicio o proyectos de bajo costo con excelente funcionalidad.',
    anchoMin: 500,
    anchoMax: 2000,
    altoMin: 400,
    altoMax: 1800,
    anchoDefault: 1200,
    altoDefault: 1000,
    precioBaseM2: 1450,
    svgType: 'corrediza_2',
    componentes: [
      { componenteId: 'riel_1_12', nombre: 'Riel 1 1/2"', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A', unidad: 'mm' },
      { componenteId: 'jamba_1_12_cabezal', nombre: 'Jamba Cabezal 1 1/2"', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A', unidad: 'mm' },
      { componenteId: 'jamba_1_12_vertical', nombre: 'Jamba Vertical 1 1/2"', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'H - 20', unidad: 'mm' },
      { componenteId: 'traslape_1_12_fijo', nombre: 'Traslape Fijo', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'H - 10', unidad: 'mm' },
      { componenteId: 'traslape_1_12_corredizo', nombre: 'Traslape Corredizo', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A - 39', unidad: 'mm' },
      { componenteId: 'cerco_ventana_1_12_corredizo', nombre: 'Cerco Corredizo', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A - 39', unidad: 'mm' },
      { componenteId: 'cabezal_1_12', nombre: 'Cabezal 1 1/2"', tipo: 'perfil', familia: 'aluminio', cantidad: 3, formulaLongitud: '(A - 100) / 2', unidad: 'mm' },
      { componenteId: 'cristal_fijo', nombre: 'Cristal Fijo', tipo: 'cristal', familia: 'vidrio', cantidad: 1, formulaLongitud: '(A - 70) / 2', formulaAltura: 'H - 45', unidad: 'mm' },
      { componenteId: 'cristal_corredizo', nombre: 'Cristal Corredizo', tipo: 'cristal', familia: 'vidrio', cantidad: 1, formulaLongitud: '(A - 70) / 2', formulaAltura: 'H - 75', unidad: 'mm' },
      { componenteId: 'vinil_empaque', nombre: 'Vinil Empaque', tipo: 'consumible', familia: 'vinil', cantidad: 1, formulaLongitud: '((A * 2) + (H * 4)) / 1000', unidad: 'm' },
      { componenteId: 'felpa', nombre: 'Felpa', tipo: 'consumible', familia: 'felpa', cantidad: 1, formulaLongitud: '((A * 2) + (H * 4)) / 1000', unidad: 'm' },
    ],
  },
  {
    id: 'ventana_fija_1_12',
    nombre: 'Ventana Fija 1 1/2"',
    serie: '1_12_pulgadas',
    categoria: 'ventanas',
    usaMosquitero: false,
    descripcion: 'Muro de cristal fijo con marco de bolsa escalonada de 1 1/2 pulgadas y junquillo de presión para iluminación natural sin apertura.',
    anchoMin: 400,
    anchoMax: 2400,
    altoMin: 400,
    altoMax: 2400,
    anchoDefault: 1200,
    altoDefault: 1200,
    precioBaseM2: 1250,
    svgType: 'fija',
    componentes: [
      { componenteId: 'bolsa_1_12_cabezal', nombre: 'Bolsa Cabezal 1 1/2"', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A', unidad: 'mm' },
      { componenteId: 'escalonado_1_12', nombre: 'Escalonado 1 1/2"', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A', unidad: 'mm' },
      { componenteId: 'bolsa_1_12_vertical', nombre: 'Bolsa Vertical 1 1/2"', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'H - 40', unidad: 'mm' },
      { componenteId: 'junquillo_1_12', nombre: 'Junquillo 1 1/2"', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A - 62', unidad: 'mm' },
      { componenteId: 'cristal_fijo', nombre: 'Cristal Fijo Integral', tipo: 'cristal', familia: 'vidrio', cantidad: 1, formulaLongitud: 'A - 48', formulaAltura: 'H - 42', unidad: 'mm' },
      { componenteId: 'vinil', nombre: 'Vinil Empaque Fijo', tipo: 'consumible', familia: 'vinil', cantidad: 1, formulaLongitud: '(2 * (A + H)) / 1000', unidad: 'm' },
    ],
  },
  {
    id: 'puerta_2',
    nombre: 'Puerta 2" (Batiente con Junquillos)',
    serie: '2_pulgadas',
    categoria: 'puertas',
    usaMosquitero: false,
    descripcion: 'Puerta batiente perimetral de 2" con marco de bolsa lisa y batiente, cerco de chapa 1 3/4", zoclo, intermedio y junquillos para cristal dividido.',
    anchoMin: 700,
    anchoMax: 1300,
    altoMin: 1800,
    altoMax: 2600,
    anchoDefault: 900,
    altoDefault: 2150,
    precioBaseM2: 2950,
    svgType: 'puerta_batiente',
    componentes: [
      { componenteId: 'bolsa_lisa_2_cabezal', nombre: 'Bolsa Lisa Cabezal 2"', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A', unidad: 'mm' },
      { componenteId: 'batiente_34_cabezal', nombre: 'Batiente 3/4" Cabezal', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A - 64', unidad: 'mm' },
      { componenteId: 'bolsa_lisa_2_vertical', nombre: 'Bolsa Lisa Vertical 2"', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'H - 32', unidad: 'mm' },
      { componenteId: 'batiente_34_vertical', nombre: 'Batiente 3/4" Vertical', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'H - 32', unidad: 'mm' },
      { componenteId: 'cerco_chapa_1_34', nombre: 'Cerco Chapa 1 3/4"', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'H - 47', unidad: 'mm' },
      { componenteId: 'zoclo_1_34', nombre: 'Zoclo 1 3/4"', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A - 181', unidad: 'mm' },
      { componenteId: 'intermedio_1_34', nombre: 'Intermedio 1 3/4"', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A - 181', unidad: 'mm' },
      { componenteId: 'cabezal_1_34', nombre: 'Cabezal 1 3/4"', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A - 181', unidad: 'mm' },
      { componenteId: 'junquillo_horizontal', nombre: 'Junquillo Horizontal (8 pzas)', tipo: 'perfil', familia: 'aluminio', cantidad: 8, formulaLongitud: 'A - 181', unidad: 'mm' },
      { componenteId: 'junquillo_vertical', nombre: 'Junquillo Vertical (8 pzas)', tipo: 'perfil', familia: 'aluminio', cantidad: 8, formulaLongitud: '(H - 245) / 2', unidad: 'mm' },
      { componenteId: 'cristal_puerta', nombre: 'Cristales de Puerta (2 pzas)', tipo: 'cristal', familia: 'vidrio', cantidad: 2, formulaLongitud: 'A - 191', formulaAltura: '(H - 205) / 2', unidad: 'mm' },
      { componenteId: 'felpa', nombre: 'Felpa de Sellado', tipo: 'consumible', familia: 'felpa', cantidad: 1, formulaLongitud: '(H * 5) / 1000', unidad: 'm' },
      { componenteId: 'vinil_peine', nombre: 'Vinil Peine', tipo: 'consumible', familia: 'vinil', cantidad: 1, formulaLongitud: '((A * 4) + (H * 2)) / 1000', unidad: 'm' },
    ],
  },
  {
    id: 'puerta_ligera',
    nombre: 'Puerta Ligera (Duela o Vidrio)',
    serie: 'ligera',
    categoria: 'puertas',
    usaMosquitero: false,
    descripcion: 'Puerta de acceso de alta demanda con opción de duela de aluminio en la parte inferior y vidrio en la parte superior.',
    anchoMin: 650,
    anchoMax: 1100,
    altoMin: 1800,
    altoMax: 2400,
    anchoDefault: 850,
    altoDefault: 2100,
    precioBaseM2: 2500,
    svgType: 'puerta_ligera',
    componentes: [
      { componenteId: 'batiente_1_12_cabezal', nombre: 'Batiente 1 1/2" Cabezal', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A - 25', unidad: 'mm' },
      { componenteId: 'batiente_1_12_vertical', nombre: 'Batiente 1 1/2" Vertical', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'H', unidad: 'mm' },
      { componenteId: 'cerco_chapa_3', nombre: 'Cerco Chapa 3"', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'H - 27', unidad: 'mm' },
      { componenteId: 'zoclo_3', nombre: 'Zoclo 3"', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'A - 139', unidad: 'mm' },
      { componenteId: 'intermedio_3', nombre: 'Intermedio 3"', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A - 139', unidad: 'mm' },
      { componenteId: 'panel_duela_mitad', nombre: 'Panel Duela (Mitad Inferior)', tipo: 'revestimiento', familia: 'madera', cantidad: 1, formulaLongitud: 'A - 121', formulaAltura: '(H - 180) / 2', unidad: 'mm' },
      { componenteId: 'vidrio_mitad', nombre: 'Vidrio (Mitad Superior)', tipo: 'cristal', familia: 'vidrio', cantidad: 1, formulaLongitud: 'A - 121', formulaAltura: '(H - 180) / 2', unidad: 'mm' },
      { componenteId: 'vinil', nombre: 'Vinil Empaque', tipo: 'consumible', familia: 'vinil', cantidad: 1, formulaLongitud: '((H * 2) + (A * 4)) / 1000', unidad: 'm' },
    ],
  },
  {
    id: 'puerta_bano',
    nombre: 'Puerta de Baño / Cancel Templado',
    serie: 'bano',
    categoria: 'canceles',
    usaMosquitero: false,
    descripcion: 'Cancel de baño de aluminio semilujo para panel de cristal templado de seguridad con sellado antihumedad y deslizamiento suave.',
    anchoMin: 600,
    anchoMax: 1800,
    altoMin: 1600,
    altoMax: 2200,
    anchoDefault: 1200,
    altoDefault: 1850,
    precioBaseM2: 3200,
    svgType: 'cancel_bano',
    componentes: [
      { componenteId: 'silla_bano_cabezal', nombre: 'Silla Baño Cabezal', tipo: 'perfil', familia: 'aluminio', cantidad: 1, formulaLongitud: 'A - 30', unidad: 'mm' },
      { componenteId: 'silla_bano_vertical', nombre: 'Silla Baño Vertical', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'H', unidad: 'mm' },
      { componenteId: 'marco_semilujo_horizontal', nombre: 'Marco Semilujo Horizontal', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'A - 42', unidad: 'mm' },
      { componenteId: 'marco_semilujo_vertical', nombre: 'Marco Semilujo Vertical', tipo: 'perfil', familia: 'aluminio', cantidad: 2, formulaLongitud: 'H - 30', unidad: 'mm' },
      { componenteId: 'panel_templado', nombre: 'Panel Cristal Templado 6mm', tipo: 'cristal', familia: 'vidrio', cantidad: 1, formulaLongitud: 'A - 112', formulaAltura: 'H - 100', unidad: 'mm' },
      { componenteId: 'vinil', nombre: 'Vinil Empaque Hermético', tipo: 'consumible', familia: 'vinil', cantidad: 1, formulaLongitud: '(2 * (A + H)) / 1000', unidad: 'm' },
    ],
  },
];

// -----------------------------------------------------------------------------------
// MATRIZ COMPARATIVA MULTIMARCA (Cuprum, Indalum, Eurovent, Saint-Gobain)
// -----------------------------------------------------------------------------------
export const COMPARADOR_MARCAS: BrandComparison[] = [
  {
    marca: 'Cuprum',
    linea: 'Línea Panorama 3" & Residencial 2"',
    fabricante: 'Grupo Cuprum México',
    espesorParedMm: 1.45,
    aislamientoAcusticoDb: 28,
    eficienciaTermica: 'Media (U = 3.6 W/m²K)',
    resistenciaVientoKmh: 140,
    capacidadCristalMm: '6mm a 9.5mm',
    garantiaAnos: 5,
    nivelPrecio: 'Intermedio',
    precioIndice: 1.0,
    descripcion: 'Líder nacional en extrusión de aluminio arquitectónico. Máxima disponibilidad de perfiles, accesorios estandarizados y acabados homogéneos.',
    certificaciones: ['ISO 9001', 'AAMA 2603', 'NOM-018-STPS'],
    idealPara: 'Vivienda unifamiliar, desarrollos habitacionales medios y residenciales.',
  },
  {
    marca: 'Indalum',
    linea: 'Línea Clásica & Comercial Pesada',
    fabricante: 'Indalum S.A. de C.V.',
    espesorParedMm: 1.55,
    aislamientoAcusticoDb: 30,
    eficienciaTermica: 'Media-Alta (U = 3.4 W/m²K)',
    resistenciaVientoKmh: 155,
    capacidadCristalMm: '6mm a 12mm',
    garantiaAnos: 7,
    nivelPrecio: 'Intermedio',
    precioIndice: 1.08,
    descripcion: 'Reconocido por la rigidez estructural de sus aleaciones 6063-T5. Perfiles más robustos contra flexión y viento en vanos altos.',
    certificaciones: ['ISO 9001', 'Qualicoat', 'ASTM B221'],
    idealPara: 'Residencias de gran altura, locales comerciales y oficinas.',
  },
  {
    marca: 'Eurovent',
    linea: 'Eurovent Serie 70/100 con RPT',
    fabricante: 'Eurovent Architectural Systems',
    espesorParedMm: 1.95,
    aislamientoAcusticoDb: 42,
    eficienciaTermica: 'Excelente (U = 1.8 W/m²K con RPT)',
    resistenciaVientoKmh: 210,
    capacidadCristalMm: 'Hasta 32mm (Doble/Triple vidriado)',
    garantiaAnos: 15,
    nivelPrecio: 'Premium',
    precioIndice: 1.45,
    descripcion: 'Ingeniería europea con Rotura de Puente Térmico (poliamida 24mm), felpas con aleta de polipropileno y sellos EPDM de compresión total.',
    certificaciones: ['CE Mark', 'Qualanod', 'Qualicoat Seaside', 'EN 14351-1'],
    idealPara: 'Residencial de lujo, zonas de clima extremo o alto ruido vehicular.',
  },
  {
    marca: 'Saint-Gobain',
    linea: 'SGG Planiclear · Stadip · Cool-Lite',
    fabricante: 'Saint-Gobain Glass',
    espesorParedMm: 0, // N/A (fabricante de vidrio)
    aislamientoAcusticoDb: 39,
    eficienciaTermica: 'Máxima (Control Solar + Aislamiento)',
    resistenciaVientoKmh: 240,
    capacidadCristalMm: 'Monolítico 6-12mm / Duovent hasta 36mm',
    garantiaAnos: 10,
    nivelPrecio: 'Ultra-Lujo',
    precioIndice: 1.35,
    descripcion: 'Referente mundial en vidrio para arquitectura. Ofrece filtros de radiación infrarroja, reducción de calor hasta un 68% y seguridad anti-rotura.',
    certificaciones: ['Cradle to Cradle', 'ISO 14001', 'ANSI Z97.1', 'NOM-146-SCFI'],
    idealPara: 'Grandes ventanales expuestos al sol poniente, fachadas y canceles acústicos.',
  },
];

// -----------------------------------------------------------------------------------
// OPCIONES DE VIDRIO ARQUITECTÓNICO
// -----------------------------------------------------------------------------------
export const OPCIONES_CRISTAL: GlassOption[] = [
  {
    id: 'claro_6mm',
    nombre: 'Cristal Claro Recocido 6mm',
    fabricante: 'Genérico',
    espesor: '6 mm',
    tipo: 'Claro',
    aislamientoAcustico: '26 dB',
    controlSolar: 'Bajo (Pasa 82% luz solar)',
    seguridad: 'Estándar',
    precioFactor: 1.0,
    descripcion: 'Vidrio flotado transparente de 6mm con excelente planimetría óptica. Adecuado para ventanas convencionales de tamaño mediano.',
  },
  {
    id: 'tintex_6mm',
    nombre: 'SGG Parsol Tintex Verde 6mm',
    fabricante: 'Saint-Gobain',
    espesor: '6 mm',
    tipo: 'Tintex',
    aislamientoAcustico: '28 dB',
    controlSolar: 'Medio (Reduce 35% de calor solar)',
    seguridad: 'Estándar',
    precioFactor: 1.18,
    descripcion: 'Tinte verde translúcido que disminuye el deslumbramiento y mejora el confort visual y térmico al interior.',
  },
  {
    id: 'filtrasol_6mm',
    nombre: 'Filtrasol Gris Humo 6mm',
    fabricante: 'Vitro',
    espesor: '6 mm',
    tipo: 'Filtrasol',
    aislamientoAcustico: '28 dB',
    controlSolar: 'Medio-Alto (Reduce 44% de calor solar)',
    seguridad: 'Estándar',
    precioFactor: 1.2,
    descripcion: 'Tono ahumado contemporáneo de alta privacidad desde el exterior con filtrado de luz solar directa.',
  },
  {
    id: 'templado_6mm',
    nombre: 'SGG Securit Templado de Seguridad 6mm',
    fabricante: 'Saint-Gobain',
    espesor: '6 mm',
    tipo: 'Templado',
    aislamientoAcustico: '31 dB',
    controlSolar: 'Bajo a Medio',
    seguridad: 'Alta (Impacto)',
    precioFactor: 1.45,
    descripcion: 'Tratamiento térmico a 650°C. 5 veces más resistente al impacto que el vidrio común; si se quiebra, se fragmenta en granos inocuos.',
  },
  {
    id: 'stadip_acustico',
    nombre: 'SGG Stadip Silence Laminado Acústico 6+6mm',
    fabricante: 'Saint-Gobain',
    espesor: '12.8 mm',
    tipo: 'Laminado Acústico',
    aislamientoAcustico: '39 dB',
    controlSolar: 'Medio con filtro UV 99%',
    seguridad: 'Máxima Seguridad',
    precioFactor: 1.85,
    descripcion: 'Dos cristales unidos por película de polivinil butiral acústico (PVB). Absorbe ondas sonoras de tráfico y no se desploma al romperse.',
  },
  {
    id: 'duovent_18mm',
    nombre: 'Doble Vidriado Hermético Duovent 18mm',
    fabricante: 'Saint-Gobain',
    espesor: '18 mm (6+6+6 aire seco)',
    tipo: 'Doble Vidrio (Duovent)',
    aislamientoAcustico: '41 dB',
    controlSolar: 'Excelente (Capa baja emisividad)',
    seguridad: 'Alta (Impacto)',
    precioFactor: 2.1,
    descripcion: 'Cámara de aire deshidratada sellada perimetralmente con butilo y silicón estructural. Aislamiento térmico y acústico insuperable.',
  },
];

// -----------------------------------------------------------------------------------
// ACABADOS DE ALUMINIO
// -----------------------------------------------------------------------------------
export const ACABADOS_ALUMINIO = [
  { id: 'blanco', nombre: 'Blanco Electrostático', hex: '#FFFFFF', border: '#E2E8F0', recargo: 0 },
  { id: 'negro', nombre: 'Negro Mate Anodizado', hex: '#18181B', border: '#27272A', recargo: 0.05 },
  { id: 'natural', nombre: 'Natural Satinado 15µm', hex: '#CBD5E1', border: '#94A3B8', recargo: 0.03 },
  { id: 'nogal', nombre: 'Nogal Textura Madera', hex: '#78350F', border: '#92400E', recargo: 0.18 },
  { id: 'bronce', nombre: 'Bronce Colonial Anodizado', hex: '#451A03', border: '#78350F', recargo: 0.08 },
];

// -----------------------------------------------------------------------------------
// GALERÍA DE PROYECTOS REALIZADOS
// -----------------------------------------------------------------------------------
export const PROYECTOS_SHOWCASE: ProjectShowcase[] = [
  {
    id: 'proj_1',
    titulo: 'Residencia Cantilever Hills',
    categoria: 'Residencial',
    ubicacion: 'Cumbres de Santa Fe, CDMX',
    tipologia: 'Ventanales Telescópicos 3 Hojas (3.60m x 2.60m)',
    marcaAluminio: 'Eurovent Serie 100',
    marcaVidrio: 'Saint-Gobain SGG Cool-Lite',
    acabado: 'Negro Mate Anodizado',
    descripcion: 'Integración paisajística total mediante ventanales corredizos empotrados a nivel de piso con sellado acústico perimetral y vidriado de control solar.',
    caracteristicas: ['Apertura telescópica del 66%', 'Doble vidrio hermético 22mm', 'Rodamientos tándem de acero inoxidable', 'Aislamiento 38 dB'],
    imagenUrl: '/src/assets/images/hero_architectural_glass_1791684089442.jpg',
  },
  {
    id: 'proj_2',
    titulo: 'Terraza Garden Living',
    categoria: 'Residencial',
    ubicacion: 'San Pedro Garza García, NL',
    tipologia: 'Ventana 3 Hojas Telescópica y Cancelería Corrediza',
    marcaAluminio: 'Cuprum Panorama 3"',
    marcaVidrio: 'Saint-Gobain SGG Planiclear 6mm Templado',
    acabado: 'Negro Mate',
    descripcion: 'Apertura panorámica hacia el jardín central con cerco de chapa reforzado y traslapes herméticos con doble felpa de polipropileno.',
    caracteristicas: ['Tolerancia milimétrica de corte', 'Mosquiteros corredizos en canal oculto', 'Seguro embutido de alta seguridad'],
    imagenUrl: '/src/assets/images/project_residential_sliding_1791684099495.jpg',
  },
  {
    id: 'proj_3',
    titulo: 'Torre Corporativa Aethelred',
    categoria: 'Fachadas',
    ubicacion: 'Distrito Financiero, Guadalajara, JAL',
    tipologia: 'Muro Cortina de Vidrio Estructural y Ventanas Fijas',
    marcaAluminio: 'Indalum Línea Comercial Pesada',
    marcaVidrio: 'Saint-Gobain SGG Stadip Silence 12.8mm',
    acabado: 'Gris Europa / Natural Satinado',
    descripcion: 'Fachada acristalada con atenuación sonora certificada para arteria vial primaria. Reducción de 42 dB y confort lumínico interior sin deslumbramiento.',
    caracteristicas: ['Estructura resistente a vientos de 180 km/h', 'Vidrio laminado con PVB acústico', 'Sellos con silicón Dow Corning 795'],
    imagenUrl: '/src/assets/images/project_commercial_facade_1791684110027.jpg',
  },
  {
    id: 'proj_4',
    titulo: 'Penthouse Spa Baño Principal',
    categoria: 'Canceles de Baño',
    ubicacion: 'Polanco V Sección, CDMX',
    tipologia: 'Cancel de Baño Templado Serie Semilujo',
    marcaAluminio: 'Cuprum Perfiles Sanitarios',
    marcaVidrio: 'Saint-Gobain SGG Securit 9.5mm Templado',
    acabado: 'Natural Satinado & Negro',
    descripcion: 'Diseño minimalista sin perfilería inferior para acceso a ras de piso con herrajes de acero y perfiles perimetrales de aluminio anticorrosión.',
    caracteristicas: ['Tratamiento antimanchas de agua', 'Herrajes sólidos con cierre magnético', 'Sellos transparentes antiescurrimiento'],
    imagenUrl: '/src/assets/images/project_bath_enclosure_1791684119149.jpg',
  },
];
