// ── Inline SVG icons (React-safe; no DOM mutation) ────────────────
import React from 'react';

function Icon({ name, size = 24 }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "arrow-left": return <svg {...p}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
    case "arrow-right": return <svg {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
    case "chevron-left": return <svg {...p}><polyline points="15 18 9 12 15 6"/></svg>;
    case "chevron-right": return <svg {...p}><polyline points="9 18 15 12 9 6"/></svg>;
    case "plus": return <svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
    case "x": return <svg {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
    case "menu": return <svg {...p}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
    default: return null;
  }
}
export default Icon;
