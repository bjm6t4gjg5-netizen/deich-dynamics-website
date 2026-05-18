import { writable } from 'svelte/store';

/** Normalisierte Mauskoordinaten 0..1 (x,y) – einmal global, alle Komponenten lesen daraus. */
export const pointer = writable<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

/** Scroll-Position in Pixel + relativer Wert 0..1 für Parallax. */
export const scrollY = writable<number>(0);

/** Aktive Sektion (für Nav-Highlight). */
export const activeSection = writable<string>('hero');

let listenersAttached = false;
export function initInteractionListeners(): void {
  if (listenersAttached || typeof window === 'undefined') return;
  listenersAttached = true;

  window.addEventListener(
    'pointermove',
    (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      pointer.set({ x, y });
    },
    { passive: true }
  );

  let raf = 0;
  window.addEventListener(
    'scroll',
    () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        scrollY.set(window.scrollY);
        raf = 0;
      });
    },
    { passive: true }
  );
}
