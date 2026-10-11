import React from 'react';
import { TypologyDefinition, ACABADOS_ALUMINIO } from '../data/aluminumData';

interface SchematicPreviewProps {
  typology: TypologyDefinition;
  ancho: number; // en mm
  alto: number;  // en mm
  acabadoId: string;
}

export const SchematicPreview: React.FC<SchematicPreviewProps> = ({
  typology,
  ancho,
  alto,
  acabadoId,
}) => {
  const acabado = ACABADOS_ALUMINIO.find((a) => a.id === acabadoId) || ACABADOS_ALUMINIO[1];

  // SVG dimensions
  const viewWidth = 460;
  const viewHeight = 320;
  const paddingX = 40;
  const paddingY = 40;

  // Calculamos escala proporcional manteniendo el aspect ratio real del claro
  const maxContentW = viewWidth - paddingX * 2;
  const maxContentH = viewHeight - paddingY * 2;

  const aspectRatio = ancho / (alto || 1);
  let contentW = maxContentW;
  let contentH = contentW / aspectRatio;

  if (contentH > maxContentH) {
    contentH = maxContentH;
    contentW = contentH * aspectRatio;
  }

  const startX = (viewWidth - contentW) / 2;
  const startY = (viewHeight - contentH) / 2;
  const profileThickness = Math.max(6, Math.min(14, contentW * 0.04));

  // Frame and glass color palette
  const frameColor = acabado.hex;
  const frameBorderColor = acabado.id === 'blanco' ? '#94A3B8' : acabado.id === 'negro' ? '#3F3F46' : '#64748B';
  const glassColor = 'rgba(56, 189, 248, 0.16)';
  const glassBorder = 'rgba(56, 189, 248, 0.4)';

  const renderPanels = () => {
    switch (typology.svgType) {
      case 'tres_hojas': {
        const panelWidth = (contentW - profileThickness * 2) / 3;
        return (
          <>
            {[0, 1, 2].map((idx) => {
              const px = startX + profileThickness + idx * panelWidth;
              const py = startY + profileThickness;
              const pw = panelWidth;
              const ph = contentH - profileThickness * 2;
              return (
                <g key={idx}>
                  {/* Panel Frame */}
                  <rect
                    x={px + 2}
                    y={py + 2}
                    width={pw - 4}
                    height={ph - 4}
                    fill={glassColor}
                    stroke={glassBorder}
                    strokeWidth={1}
                  />
                  {/* Panel Inner Stile/Rail */}
                  <rect
                    x={px + 2}
                    y={py + 2}
                    width={pw - 4}
                    height={ph - 4}
                    fill="none"
                    stroke={frameColor}
                    strokeWidth={profileThickness * 0.75}
                  />
                  {/* Movement Arrow on sliding panels (idx 1 & 2) */}
                  {idx > 0 ? (
                    <path
                      d={`M ${px + pw / 2 - 12} ${py + ph / 2} L ${px + pw / 2 + 12} ${py + ph / 2} M ${px + pw / 2 + 6} ${py + ph / 2 - 6} L ${px + pw / 2 + 12} ${py + ph / 2} L ${px + pw / 2 + 6} ${py + ph / 2 + 6}`}
                      stroke="#38BDF8"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <text
                      x={px + pw / 2}
                      y={py + ph / 2 + 4}
                      fill="#94A3B8"
                      fontSize={10}
                      fontWeight="600"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      FIJO
                    </text>
                  )}
                </g>
              );
            })}
          </>
        );
      }
      case 'oxxo': {
        const panelWidth = (contentW - profileThickness * 2) / 4;
        return (
          <>
            {[0, 1, 2, 3].map((idx) => {
              const px = startX + profileThickness + idx * panelWidth;
              const py = startY + profileThickness;
              const pw = panelWidth;
              const ph = contentH - profileThickness * 2;
              const isFijo = idx === 0 || idx === 3;
              return (
                <g key={idx}>
                  <rect
                    x={px + 2}
                    y={py + 2}
                    width={pw - 4}
                    height={ph - 4}
                    fill={glassColor}
                    stroke={glassBorder}
                    strokeWidth={1}
                  />
                  <rect
                    x={px + 2}
                    y={py + 2}
                    width={pw - 4}
                    height={ph - 4}
                    fill="none"
                    stroke={frameColor}
                    strokeWidth={profileThickness * 0.7}
                  />
                  {isFijo ? (
                    <text
                      x={px + pw / 2}
                      y={py + ph / 2 + 4}
                      fill="#94A3B8"
                      fontSize={10}
                      fontWeight="600"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      FIJO
                    </text>
                  ) : (
                    <path
                      d={
                        idx === 1
                          ? `M ${px + pw / 2 + 8} ${py + ph / 2} L ${px + pw / 2 - 8} ${py + ph / 2} M ${px + pw / 2 - 2} ${py + ph / 2 - 5} L ${px + pw / 2 - 8} ${py + ph / 2} L ${px + pw / 2 - 2} ${py + ph / 2 + 5}`
                          : `M ${px + pw / 2 - 8} ${py + ph / 2} L ${px + pw / 2 + 8} ${py + ph / 2} M ${px + pw / 2 + 2} ${py + ph / 2 - 5} L ${px + pw / 2 + 8} ${py + ph / 2} L ${px + pw / 2 + 2} ${py + ph / 2 + 5}`
                      }
                      stroke="#38BDF8"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  )}
                </g>
              );
            })}
          </>
        );
      }
      case 'corrediza_2': {
        const panelWidth = (contentW - profileThickness * 2) / 2;
        return (
          <>
            {[0, 1].map((idx) => {
              const px = startX + profileThickness + idx * panelWidth;
              const py = startY + profileThickness;
              const pw = panelWidth;
              const ph = contentH - profileThickness * 2;
              return (
                <g key={idx}>
                  <rect
                    x={px + 2}
                    y={py + 2}
                    width={pw - 4}
                    height={ph - 4}
                    fill={glassColor}
                    stroke={glassBorder}
                    strokeWidth={1}
                  />
                  <rect
                    x={px + 2}
                    y={py + 2}
                    width={pw - 4}
                    height={ph - 4}
                    fill="none"
                    stroke={frameColor}
                    strokeWidth={profileThickness * 0.75}
                  />
                  {idx === 0 ? (
                    <text
                      x={px + pw / 2}
                      y={py + ph / 2 + 4}
                      fill="#94A3B8"
                      fontSize={11}
                      fontWeight="600"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      FIJO
                    </text>
                  ) : (
                    <path
                      d={`M ${px + pw / 2 - 10} ${py + ph / 2} L ${px + pw / 2 + 10} ${py + ph / 2} M ${px + pw / 2 + 4} ${py + ph / 2 - 5} L ${px + pw / 2 + 10} ${py + ph / 2} L ${px + pw / 2 + 4} ${py + ph / 2 + 5}`}
                      stroke="#38BDF8"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  )}
                </g>
              );
            })}
          </>
        );
      }
      case 'puerta_batiente': {
        const innerW = contentW - profileThickness * 2;
        const innerH = contentH - profileThickness * 2;
        const midY = startY + profileThickness + innerH * 0.45;
        return (
          <>
            {/* Panel Superior */}
            <rect
              x={startX + profileThickness + 4}
              y={startY + profileThickness + 4}
              width={innerW - 8}
              height={midY - (startY + profileThickness) - 6}
              fill={glassColor}
              stroke={glassBorder}
              strokeWidth={1}
            />
            {/* Travesaño intermedio */}
            <rect
              x={startX + profileThickness}
              y={midY - profileThickness / 2}
              width={innerW}
              height={profileThickness}
              fill={frameColor}
              stroke={frameBorderColor}
              strokeWidth={1}
            />
            {/* Panel Inferior */}
            <rect
              x={startX + profileThickness + 4}
              y={midY + profileThickness / 2 + 2}
              width={innerW - 8}
              height={startY + contentH - profileThickness - (midY + profileThickness / 2) - 6}
              fill={glassColor}
              stroke={glassBorder}
              strokeWidth={1}
            />
            {/* Chapa / Cerradura */}
            <rect
              x={startX + contentW - profileThickness - 8}
              y={startY + contentH * 0.5 - 12}
              width={6}
              height={24}
              rx={2}
              fill="#E2E8F0"
              stroke="#64748B"
            />
          </>
        );
      }
      case 'puerta_ligera': {
        const innerW = contentW - profileThickness * 2;
        const innerH = contentH - profileThickness * 2;
        const midY = startY + profileThickness + innerH * 0.5;
        return (
          <>
            {/* Vidrio Superior */}
            <rect
              x={startX + profileThickness + 3}
              y={startY + profileThickness + 3}
              width={innerW - 6}
              height={midY - (startY + profileThickness) - 5}
              fill={glassColor}
              stroke={glassBorder}
              strokeWidth={1}
            />
            {/* Intermedio */}
            <rect
              x={startX + profileThickness}
              y={midY - profileThickness / 2}
              width={innerW}
              height={profileThickness}
              fill={frameColor}
              stroke={frameBorderColor}
              strokeWidth={1}
            />
            {/* Duela Inferior (ranurada) */}
            <rect
              x={startX + profileThickness + 2}
              y={midY + profileThickness / 2 + 2}
              width={innerW - 4}
              height={startY + contentH - profileThickness - (midY + profileThickness / 2) - 4}
              fill={acabado.hex}
              stroke={frameBorderColor}
              strokeWidth={1}
            />
            {/* Duela grooves */}
            {[1, 2, 3, 4].map((g) => {
              const gy = midY + profileThickness / 2 + (innerH * 0.45 * g) / 5;
              return (
                <line
                  key={g}
                  x1={startX + profileThickness + 4}
                  y1={gy}
                  x2={startX + contentW - profileThickness - 4}
                  y2={gy}
                  stroke={frameBorderColor}
                  strokeWidth={1}
                />
              );
            })}
          </>
        );
      }
      case 'cancel_bano': {
        const panelWidth = (contentW - profileThickness * 2) / 2;
        return (
          <>
            {/* Hoja fija */}
            <rect
              x={startX + profileThickness + 3}
              y={startY + profileThickness + 3}
              width={panelWidth - 6}
              height={contentH - profileThickness * 2 - 6}
              fill="rgba(56, 189, 248, 0.22)"
              stroke="rgba(56, 189, 248, 0.5)"
              strokeWidth={1}
            />
            {/* Hoja corrediza con toallero/jaladera */}
            <rect
              x={startX + profileThickness + panelWidth + 3}
              y={startY + profileThickness + 3}
              width={panelWidth - 6}
              height={contentH - profileThickness * 2 - 6}
              fill="rgba(56, 189, 248, 0.22)"
              stroke="rgba(56, 189, 248, 0.5)"
              strokeWidth={1}
            />
            {/* Jaladera cancel */}
            <rect
              x={startX + profileThickness + panelWidth + 12}
              y={startY + contentH / 2 - 20}
              width={5}
              height={40}
              rx={2}
              fill="#CBD5E1"
              stroke="#64748B"
            />
          </>
        );
      }
      default: {
        // Ventana Fija
        return (
          <rect
            x={startX + profileThickness + 2}
            y={startY + profileThickness + 2}
            width={contentW - profileThickness * 2 - 4}
            height={contentH - profileThickness * 2 - 4}
            fill={glassColor}
            stroke={glassBorder}
            strokeWidth={1}
          />
        );
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-3">
      <svg
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        className="w-full h-auto max-h-[300px] drop-shadow-md select-none"
      >
        {/* Background Grid Lines (Engineering style) */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width={viewWidth} height={viewHeight} fill="#020617" rx={12} />
        <rect width={viewWidth} height={viewHeight} fill="url(#grid)" rx={12} />

        {/* Outer Perimeter Frame (Aluminio) */}
        <rect
          x={startX}
          y={startY}
          width={contentW}
          height={contentH}
          fill="none"
          stroke={frameColor}
          strokeWidth={profileThickness}
          rx={1}
        />
        <rect
          x={startX}
          y={startY}
          width={contentW}
          height={contentH}
          fill="none"
          stroke={frameBorderColor}
          strokeWidth={1}
        />

        {/* Internal Panels depending on typology */}
        {renderPanels()}

        {/* Horizontal Dimension Arrow & Text (Ancho A) */}
        <g>
          <line
            x1={startX}
            y1={startY + contentH + 18}
            x2={startX + contentW}
            y2={startY + contentH + 18}
            stroke="#38BDF8"
            strokeWidth={1.5}
          />
          <line
            x1={startX}
            y1={startY + contentH + 12}
            x2={startX}
            y2={startY + contentH + 24}
            stroke="#38BDF8"
            strokeWidth={1.5}
          />
          <line
            x1={startX + contentW}
            y1={startY + contentH + 12}
            x2={startX + contentW}
            y2={startY + contentH + 24}
            stroke="#38BDF8"
            strokeWidth={1.5}
          />
          <text
            x={startX + contentW / 2}
            y={startY + contentH + 32}
            fill="#38BDF8"
            fontSize={12}
            fontFamily="monospace"
            fontWeight="bold"
            textAnchor="middle"
          >
            A = {ancho} mm
          </text>
        </g>

        {/* Vertical Dimension Arrow & Text (Alto H) */}
        <g>
          <line
            x1={startX - 18}
            y1={startY}
            x2={startX - 18}
            y2={startY + contentH}
            stroke="#38BDF8"
            strokeWidth={1.5}
          />
          <line
            x1={startX - 24}
            y1={startY}
            x2={startX - 12}
            y2={startY}
            stroke="#38BDF8"
            strokeWidth={1.5}
          />
          <line
            x1={startX - 24}
            y1={startY + contentH}
            x2={startX - 12}
            y2={startY + contentH}
            stroke="#38BDF8"
            strokeWidth={1.5}
          />
          <text
            x={startX - 26}
            y={startY + contentH / 2}
            fill="#38BDF8"
            fontSize={12}
            fontFamily="monospace"
            fontWeight="bold"
            textAnchor="end"
            dominantBaseline="middle"
          >
            H = {alto} mm
          </text>
        </g>
      </svg>
    </div>
  );
};
