# AlumVidrio Pro: Plataforma de Carpintería de Aluminio, Vidrios, Comparador Multimarca y Cotizador Técnico

Plataforma web de ingeniería y carpintería de aluminio y cristal arquitectónico de alto impacto visual y funcional. Integra portafolio de proyectos, catálogo de tipologías con motor de cálculo milimétrico (basado en fórmulas de taller), matriz comparativa multimarca (Cuprum, Indalum, Eurovent y Saint-Gobain) y un configurador interactivo con cotización en tiempo real y despacho directo a WhatsApp y correo electrónico.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> **Decisiones confirmadas por el usuario:**
> - **Marcas de referencia integradas**: Cuprum, Indalum, Eurovent y Saint-Gobain (con comparador de espesores de perfil, calibres, aislamiento acústico/térmico, capacidad de acristalamiento y costo relativo).
> - **Nivel de profundidad del cotizador**: Configurador visual interactivo en tiempo real con selector de acabados, cristales y dimensiones ($A \times H$), complementado con cálculo de despiece técnico de taller desplegable y generador de mensaje profesional para WhatsApp.
> - **Gestión de solicitudes**: Despacho directo a WhatsApp y correo electrónico sin requerir panel administrativo complejo, incluyendo almacenamiento local en caché (`localStorage`) para que el usuario consulte o reutilice sus presupuestos previos.

---

### 1. Overview & Core Concept

- **Qué hace**: Presenta de forma atractiva y profesional los servicios de cancelería de aluminio y vidrio templado/duovent, exhibe proyectos ejecutados con filtros por categoría, ofrece una matriz técnica comparativa entre las marcas líderes del mercado y permite a clientes y contratistas calcular y cotizar cancelería a medida con envío directo en un clic.
- **Público objetivo**: Propietarios residenciales, arquitectos, ingenieros civiles, contratistas y talleres de cancelería que buscan precisión técnica, cotizaciones transparentes y garantía de materiales.
- **Propuesta de valor**: Transparencia técnica total. En lugar de presupuestos opacos, el sistema desglosa perfiles, cristales, consumibles y factores de rendimiento comparativo entre fabricantes, facilitando la toma de decisiones inmediata.

---

### 2. User Experience & Visual Design

#### A. Flujo de Navegación del Usuario
1. **Hero Section Arquitectónico**:
   - Título de impacto: *"Precisión en Aluminio y Cristal Arquitectónico"*.
   - Propuesta de valor clara, métricas de taller (tolerancia milimétrica, garantía estructural, aislamiento acústico) y llamada a la acción principal: *"Cotizar Proyecto a Medida"*.
2. **Galería Dinámica de Proyectos**:
   - Filtros de categoría interactivos: Residencial, Comercial, Canceles de Baño, Muros Cortina y Ventanales Telescópicos.
   - Fichas de proyecto con imágenes de alta resolución, descripción de perfiles usados, tipo de cristal y especificaciones de fabricación.
3. **Comparador Técnico Multimarca (Cuprum · Indalum · Eurovent · Saint-Gobain)**:
   - Tabla interactiva con selector de líneas y series:
     - Línea Residencial 2" y 3" (Cuprum / Indalum).
     - Línea Europea y Eurovent RPT (Rotura de Puente Térmico).
     - Acristalamiento Saint-Gobain (Planiclear, Tintex, SGG Stadip Acústico, SGG Securit Templado, SGG Cool-Lite Control Solar).
   - Indicadores de hermeticidad, espesor de pared (mm), aislamiento térmico/acústico y relación costo-beneficio.
4. **Configurador Visual y Cotizador Interactivo**:
   - Selector interactivo de tipología con previsualización esquemática:
     - Ventana 3 Hojas Telescópica (3").
     - Ventanal OXXO (4 hojas: 2 fijas, 2 corredizas + mosquitero).
     - Ventana Corrediza 3" (2 hojas + mosquitero).
     - Ventana Corrediza 2" con Mosquitero.
     - Ventana Corrediza 1 1/2" Económica / Residencial.
     - Ventana Fija 1 1/2".
     - Puerta 2" (batiente con junquillos).
     - Puerta Ligera (con duela o mitad vidrio).
     - Puerta / Cancel de Baño (marco semilujo y templado).
   - Inputs milimétricos de Ancho ($A$) y Alto ($H$).
   - Selector de acabados de aluminio: Blanco, Negro Mate, Natural Anodizado, Nogal Texturizado, Bronce.
   - Selector de cristal: Claro 6mm, Filtrasol 6mm, Tintex 6mm, Templado 6mm/9.5mm, Duovent 18mm (doble vidrio acústico).
   - Pestaña desplegable: **"Desglose y Despiece Técnico de Taller"** que calcula automáticamente el largo y cantidad de cada perfil (`riel`, `jamba`, `zoclo`, `cabezal`, `cerco`, `traslape`), cristal y metros de felpa/vinil utilizando las fórmulas exactas del catálogo del taller.
   - Resumen del presupuesto en tiempo real con opción de agregar múltiples piezas al pedido.
5. **Generador y Despacho Automatizado**:
   - Formulario ágil con Nombre, Teléfono/WhatsApp, Ciudad/Ubicación y Notas adicionales.
   - Botón directo **"Enviar Presupuesto por WhatsApp"**: abre el enlace de WhatsApp con el desglose preformateado y legible.
   - Botón alternativo **"Enviar por Correo Electrónico"** con cliente de correo preparado (`mailto:` con asunto y cuerpo formateado).
   - Modal de ficha técnica imprimible / descargable con vista limpia de cotización formal.
6. **Footer Profesional**:
   - Datos de contacto, horarios de atención, enlaces de navegación y garantías de fabricación.

#### B. Identidad Visual y Paleta de Colores
- **Dirección estética**: Arquitectura industrial sobria, limpia y contemporánea; sin sobrecargas innecesarias ni elementos superfluos.
- **Paleta de Colores (60-30-10)**:
  - **Canvas dominante (60%)**: Neutro arquitectónico pizarra claro `#F8FAFC` (con modo oscuro refinado `#0B0F17`).
  - **Superficies estructurales (30%)**: Blanco puro `#FFFFFF` y slate `#1E293B` para bordes delgados de 1px y contenedores de alta legibilidad.
  - **Acento técnico (10%)**: Azul cobalto arquitectónico `#0284C7` / `#2563EB` y acento de verificación verde esmeralda `#059669` para llamadas de acción y estados de selección.
- **Tipografía**:
  - Títulos y display: `Plus Jakarta Sans` en peso SemiBold/Bold con `tracking-tight`.
  - Lectura general: `Inter` / `system-ui` con espaciado balanceado.
  - Tablas de corte y despiece milimétrico: `font-mono tabular-nums` para alineación visual perfecta de cifras.

---

### 3. Key Product Decisions & Trade-Offs

- **Integración de Fórmulas Exactas del Documento Técnico**:
  - *Decisión*: Codificar directamente el motor matemático de despiece para las 9 tipologías especificadas en la documentación técnica del usuario (`(A-167)/3`, `(A-330)/4`, `(A-185)/2`, `(A-117)/3`, `H-95`, `H-135`, etc.).
  - *Razón*: Aporta un valor diferencial masivo tanto para el cliente final como para el maestro de obra o taller, permitiendo no solo saber el precio estimado sino el inventario exacto de perfiles y cortes.
- **Despacho Directo por WhatsApp y Mailto**:
  - *Decisión*: Formatear dinámicamente un mensaje estructurado con saltos de línea y emojis discretos que se inyecta en la URL universal de WhatsApp (`https://wa.me/?text=...`) y en el cliente de correo.
  - *Razón*: Cumple a cabalidad con la respuesta del usuario (evita la fricción de un backend de base de datos remoto cerrado y facilita una respuesta comercial inmediata en menos de 2 minutos).
- **Persistencia Local de Cotizaciones (Caché del Cliente)**:
  - *Decisión*: Guardar en `localStorage` el historial de cotizaciones generadas con identificador único, fecha y resumen.
  - *Razón*: Permite que el usuario regrese a la web y recupere cotizaciones anteriores sin perder su configuración previa.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             AlumVidrio Pro UI                               │
├─────────────────────┬───────────────────────────┬───────────────────────────┤
│    Header & Nav     │    Hero & Brand Proof     │  Galería de Proyectos     │
│   (3-zone contract) │  (Garantía y Métricas)    │ (Filtros por tipología)   │
├─────────────────────┴───────────────────────────┴───────────────────────────┤
│                Comparador Multimarca (Cuprum, Indalum, Eurovent, SGG)       │
├─────────────────────────────────────────────────────────────────────────────┤
│                    Configurador Visual & Cotizador Técnico                  │
│  ┌───────────────────────┐ ┌──────────────────────────────────────────────┐ │
│  │ Selector de Tipología │ │ Inputs de Ancho (A) y Alto (H) en mm           │ │
│  │ Acabado & Cristal     │ │ Fórmulas de Despiece Milimétrico de Taller     │ │
│  └───────────────────────┘ └──────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │ Desglose de Perfiles, Vidrios, Consumibles y Subtotales Dinámicos       │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│      Lead Capture & Generador de Despacho (WhatsApp API URL & Mailto)       │
├─────────────────────────────────────────────────────────────────────────────┤
│         Historial Local de Cotizaciones (Almacenamiento Local Browser)      │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Modelo de Datos del Motor de Despiece y Cotización

```typescript
// Tipologías y reglas de despiece técnico
interface TypologyFormula {
  id: string;
  nombre: string;
  serie: string;
  usaMosquitero: boolean;
  descripcion: string;
  imagen: string;
  componentes: {
    componenteId: string;
    nombreComponente: string;
    tipo: 'perfil' | 'cristal' | 'consumible' | 'revestimiento';
    cantidad: number;
    formulaLongitud?: string; // Evaluada dinámicamente con A y H
    formulaAltura?: string;
    unidad: 'mm' | 'm' | 'm2';
  }[];
}

// Configuración de Cotización
interface QuoteItem {
  id: string;
  tipologiaId: string;
  nombre: string;
  ancho: number; // en mm
  alto: number;  // en mm
  acabado: 'blanco' | 'negro' | 'natural' | 'nogal' | 'bronce';
  marcaPerfil: 'Cuprum' | 'Indalum' | 'Eurovent' | 'Estandar';
  tipoCristal: 'claro_6mm' | 'tintex_6mm' | 'templado_6mm' | 'duovent_18mm';
  marcaCristal: 'Saint-Gobain' | 'Vitro';
  cantidadPiezas: number;
  precioUnitarioEstimado: number;
  despieceCalculado: DespieceItem[];
}
```

---

### Verificación y Calidad de Entrega

1. **Pruebas de Cálculo de Fórmulas**: Comprobar que para dimensiones reales (ej. Ventana 3 Hojas de $1500 \times 1200$ mm) los cortes de riel, zoclo, cerco y cristales coincidan exactamente con la aritmética del taller.
2. **Pruebas de Responsive y Contraste**: Garantizar visualización óptima en pantallas de 360px (smartphone), 768px (tablet) y 1440px (escritorio).
3. **Prueba de Despacho**: Validar la generación de cadenas URL válidas para WhatsApp con codificación adecuada de caracteres especiales y acentos.
4. **Verificación de Compilación**: Ejecutar `compile_applet` tras completar la implementación para certificar cero errores de compilación TypeScript y empaquetado Vite.
