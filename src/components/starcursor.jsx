/**
 * StarCursor
 * ----------
 * Drop-in custom cursor component. Replaces the default OS cursor with an
 * animated star (or circle) that follows the mouse and grows on hover.
 *
 * Usage:
 *   import StarCursor from './components/StarCursor'
 *   // Render once, near the root of your app:
 *   <StarCursor />
 *
 * Props:
 *   mode       'star' | 'circle' | 'off'   default: 'star'
 *   color      CSS color string             default: '#c6ff00'
 *   size       number (px, normal state)    default: 18
 *   hoverSize  number (px, hover state)     default: 56
 *   hoverSelectors  CSS selector string for elements that trigger the hover
 *                   state. default: 'a, button'
 */

import { useState, useEffect } from 'react'

const STYLES = (color, size, hoverSize) => `
  .sc-cursor {
    position: fixed;
    top: 0; left: 0;
    width: ${size}px; height: ${size}px;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    mix-blend-mode: difference;
    transition: width 220ms cubic-bezier(0.22,1,0.36,1),
                height 220ms cubic-bezier(0.22,1,0.36,1);
    will-change: transform;
  }
  .sc-cursor svg {
    width: 100%; height: 100%;
    fill: ${color};
    animation: sc-pulse 2.4s cubic-bezier(0.22,1,0.36,1) infinite;
  }
  .sc-cursor.is-hover {
    width: ${hoverSize}px;
    height: ${hoverSize}px;
  }
  .sc-cursor.is-hover svg { fill: #ffffff; }
  @keyframes sc-pulse {
    0%, 100% { transform: scale(1) rotate(0deg); }
    50%       { transform: scale(1.18) rotate(45deg); }
  }
`

export default function StarCursor({
  mode = 'star',
  color = '#c6ff00',
  size = 18,
  hoverSize = 56,
  hoverSelectors = 'a, button',
}) {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [hover, setHover] = useState(false)

  useEffect(() => {
    if (mode === 'off') return
    const move = e => {
      setPos({ x: e.clientX, y: e.clientY })
      setHover(!!e.target.closest(hoverSelectors))
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mode, hoverSelectors])

  useEffect(() => {
    document.body.style.cursor = mode === 'off' ? '' : 'none'
    return () => { document.body.style.cursor = '' }
  }, [mode])

  if (mode === 'off') return null

  return (
    <>
      <style>{STYLES(color, size, hoverSize)}</style>
      <div
        className={`sc-cursor${hover ? ' is-hover' : ''}`}
        style={{ transform: `translate(${pos.x}px,${pos.y}px) translate(-50%,-50%)` }}
        aria-hidden="true"
      >
        {mode === 'star'
          ? <svg viewBox="0 0 100 100"><path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" /></svg>
          : <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" /></svg>
        }
      </div>
    </>
  )
}
