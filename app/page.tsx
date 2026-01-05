// app/page.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import CaseDossier from './components/CaseDossiert';

type TimelineItem = {
  id: string;
  time: string;
  title: string;
  subtitle?: string;
  description?: string;
  color?: string; // accent color
};

const sampleData: TimelineItem[] = [
  {
    id: 't1',
    time: '2042-03-05',
    title: 'First Quantum Link',
    subtitle: 'Low-Earth Node Live',
    description:
      'Decentralized quantum link established between orbital nodes — latency under 1ms for AI agents.',
    color: '#7cf6ff',
  },
  {
    id: 't2',
    time: '2043-07-20',
    title: 'NeuroMesh Beta',
    subtitle: 'Brain-compute fabric',
    description:
      'Human-machine interface standard released; hobbyist-safe SDKs enable thought-assisted design tools.',
    color: '#b28bff',
  },
  {
    id: 't3',
    time: '2045-11-11',
    title: 'City Lights — HoloNet',
    subtitle: 'Ambient holographic overlays',
    description:
      'Public-facing AR holograms layered across cityscapes with programmable privacy zones and gestures.',
    color: '#67ff9a',
  },
  {
    id: 't4',
    time: '2048-03-30',
    title: 'Utopia Launch',
    subtitle: 'Pilot community goes live',
    description: 'Community-first infrastructure focusing on shared resources and transparent governance.',
    color: '#ff9b6b',
  },
  {
    id: 't5',
    time: '2025-08-09',
    title: 'Hostage of StreetBLUES',
    subtitle: 'PPls tarned as saviors killing us',
    description:'myndndndkdndkykdnfkx fndndndkdkdkdkykykykykynynyny kxkckgnfnfdkslylxkcjvjgjgb fnfkdkykykxkgnfnd lyoxkgnfdlylxkckgnfkcixoodlernt nckciyodlelrntngkcoxldne nggkcidlenrngkfkfnfnffn fnfnfnfnfn',
    color: 'red',
  }
];

export default function Page() {
  const [items] = useState<TimelineItem[]>(sampleData);
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const holoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x - 14}px, ${y - 14}px, 0)`;
      }
      if (holoRef.current) {
        // subtle parallax
        holoRef.current.style.backgroundPosition = `${50 + (x / window.innerWidth - 0.5) * 6}% ${
          50 + (y / window.innerHeight - 0.5) * 6
        }%`;
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <main className="page">
      <div className="holo-bg" ref={holoRef} aria-hidden />
      <div className="container">
        <header className="header">
          <h1 className="title">Holo Timeline</h1>
          <p className="subtitle">Interactive, futuristic timeline — hover items to explore.</p>
        </header>

        <section className="timeline" role="list">
          <div className="line" aria-hidden />
          {items.map((it, idx) => {
            const isActive = active === it.id;
            return (
              <article
                key={it.id}
                role="listitem"
                className={`item ${isActive ? 'active' : ''}`}
                style={{ '--accent': it.color } as React.CSSProperties}
                onMouseEnter={() => setActive(it.id)}
                onFocus={() => setActive(it.id)}
                onMouseLeave={() => setActive(null)}
                tabIndex={0}
              >
                <div className="node-blob" aria-hidden>
                  <svg viewBox="0 0 40 40" className="node-glow" focusable="false">
                    <defs>
                      <filter id={`f-${it.id}`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feColorMatrix
                          in="blur"
                          type="matrix"
                          values="0 0 0 0 0
                                  0 0 0 0 0
                                  0 0 0 0 0
                                  0 0 0 0.8"
                        />
                      </filter>
                    </defs>
                    <circle cx="20" cy="20" r="8" fill="var(--accent)" filter={`url(#f-${it.id})`} />
                  </svg>
                </div>

                <div className="card">
                  <div className="meta">
                    <time className="time">{it.time}</time>
                    <h3 className="item-title">{it.title}</h3>
                    {it.subtitle && <div className="subtitle-item">{it.subtitle}</div>}
                  </div>
                  <div className="desc">
                    <p>{it.description}</p>
                  </div>

                  <div className="controls">
                    <button
                      className="ghost"
                      onClick={() => alert(`Open details for: ${it.title}`)}
                      aria-label={`Open ${it.title}`}
                    >
                      Open
                    </button>
                    <button
                      className="ghost"
                      onClick={() => navigator.clipboard?.writeText(`${it.title} — ${it.time}`)}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <footer className="footer">
          <small>Tip: hover or keyboard-focus timeline nodes. Colors & data in <code>sampleData</code>.</small>
        </footer>
      </div>

      {/* custom cursor / holo dot */}
      <div className="cursor" ref={cursorRef} aria-hidden />

      <style jsx>{`
        :root {
          --bg: rgba(6, 7, 15, 1);
          --glass: rgba(255, 255, 255, 0.04);
          --glass-2: rgba(255, 255, 255, 0.02);
          --text: #e9f7ff;
        }

        .page {
          min-height: 100vh;
          background: radial-gradient(1200px 800px at 10% 20%, rgba(100, 120, 255, 0.06), transparent),
            radial-gradient(800px 600px at 90% 80%, rgba(100, 255, 200, 0.03), transparent),
            var(--bg);
          color: var(--text);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
            Arial;
          overflow: hidden;
          position: relative;
        }

        .holo-bg {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 20% 30%, rgba(124, 246, 255, 0.04) 0%, transparent 20%),
            linear-gradient(135deg, rgba(120, 80, 255, 0.03), rgba(80, 200, 160, 0.02));
          background-size: 120% 120%;
          mix-blend-mode: screen;
          filter: saturate(110%);
          z-index: 0;
          transition: background-position 0.2s linear;
        }

        .container {
          max-width: 1100px;
          margin: 48px auto;
          padding: 40px;
          position: relative;
          z-index: 2;
        }

        .header {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 28px;
        }

        .title {
          margin: 0;
          font-size: 28px;
          letter-spacing: 0.6px;
          text-shadow: 0 6px 30px rgba(100, 150, 255, 0.06), 0 1px 0 rgba(255, 255, 255, 0.02);
        }

        .subtitle {
          margin: 6px 0 0 0;
          color: rgba(230, 245, 255, 0.8);
          opacity: 0.9;
        }

        .timeline {
          margin-top: 18px;
          position: relative;
          padding: 30px 20px;
        }

        .line {
          position: absolute;
          left: 56px;
          top: 0;
          bottom: 0;
          width: 2px;
          margin-left: -1px;
          background-image: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
          box-shadow: 0 0 30px rgba(120, 200, 255, 0.03);
          border-radius: 2px;
        }

        .item {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 20px;
          align-items: start;
          margin: 18px 0;
          transition: transform 240ms cubic-bezier(.2,.9,.25,1), opacity 180ms;
          transform-origin: left center;
          outline: none;
        }

        .item:focus {
          transform: translateX(-6px) scale(1.01);
        }

        .node-blob {
          position: relative;
          width: 120px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .node-glow {
          width: 42px;
          height: 42px;
          display: block;
        }

        .card {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border-radius: 12px;
          padding: 14px;
          border: 1px solid rgba(255,255,255,0.04);
          box-shadow: 0 6px 40px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02);
          transition: box-shadow 240ms, transform 240ms;
          backdrop-filter: blur(8px) saturate(110%);
        }

        .item:hover .card,
        .item:focus .card,
        .item.active .card {
          transform: translateY(-6px);
          box-shadow: 0 18px 60px rgba(60, 120, 255, 0.08);
        }

        .meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .time {
          color: rgba(180, 225, 255, 0.7);
          font-size: 12px;
          letter-spacing: 0.6px;
        }

        .item-title {
          margin: 0;
          font-size: 16px;
          color: var(--text);
        }

        .subtitle-item {
          color: rgba(210, 230, 255, 0.7);
          font-size: 13px;
        }

        .desc {
          margin-top: 10px;
          color: rgba(210, 230, 255, 0.75);
          font-size: 14px;
        }

        .controls {
          margin-top: 12px;
          display: flex;
          gap: 8px;
        }

        .ghost {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.06);
          padding: 6px 10px;
          border-radius: 8px;
          color: rgba(220,240,255,0.9);
          cursor: pointer;
          font-size: 13px;
          transition: transform 120ms, box-shadow 120ms;
          backdrop-filter: blur(6px);
        }

        .ghost:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(90, 150, 255, 0.06);
        }

        .item .node-glow circle {
          transition: r 220ms, filter 220ms, opacity 220ms;
        }

        .item:hover .node-glow circle,
        .item:focus .node-glow circle,
        .item.active .node-glow circle {
          r: 12;
          opacity: 1;
          filter: drop-shadow(0 0 18px var(--accent));
        }

        /* accent outline */
        .item::before {
          content: '';
          position: absolute;
          left: 36px;
          width: 14px;
          height: 14px;
          transform: translateY(-6px);
          border-radius: 4px;
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
        }

        .item.active .card {
          border: 1px solid color-mix(in srgb, var(--accent) 70%, rgba(255,255,255,0.06));
        }

        /* small screens */
        @media (max-width: 720px) {
          .container {
            padding: 20px;
          }
          .item {
            grid-template-columns: 56px 1fr;
          }
          .node-blob {
            width: 56px;
            height: 56px;
          }
          .line {
            left: 36px;
          }
        }

        .footer {
          margin-top: 28px;
          color: rgba(200, 220, 255, 0.6);
        }

        /* custom cursor */
        .cursor {
          pointer-events: none;
          position: fixed;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          transform: translate3d(-9999px, -9999px, 0);
          z-index: 9999;
          mix-blend-mode: screen;
          background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.2) 10%, transparent 40%),
            radial-gradient(circle at 65% 70%, var(--cursor-color, rgba(124,246,255,0.7)), transparent 40%);
          filter: blur(6px);
          transition: transform 80ms linear;
        }

        /* subtle entrance animation */
        .container {
          animation: floatIn 700ms cubic-bezier(.2,.9,.25,1);
        }

        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

      `}</style>

      <CaseDossier />

    </main>
  );

}

