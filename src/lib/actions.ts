import { activeSection } from './stores';

/** Svelte-Action: fügt die Klasse `in` hinzu, sobald das Element sichtbar ist. */
export function reveal(node: HTMLElement, options: { threshold?: number; once?: boolean } = {}) {
  const { threshold = 0.15, once = true } = options;

  if (typeof IntersectionObserver === 'undefined') {
    node.classList.add('in');
    return { destroy() {} };
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          node.classList.add('in');
          if (once) io.unobserve(node);
        } else if (!once) {
          node.classList.remove('in');
        }
      }
    },
    { threshold }
  );
  io.observe(node);

  return {
    destroy() {
      io.disconnect();
    }
  };
}

/**
 * Svelte-Action: markiert die zugehörige Sektion als aktiv im Nav.
 *
 * Wir definieren ein schmales horizontales Tracking-Band ~30 % vom oberen
 * Viewport-Rand. Nur die Sektion, die dieses Band gerade schneidet, wird als
 * aktiv markiert — damit kann es nie mehrere "aktive" Sektionen gleichzeitig
 * geben (z.B. wenn beim Scrollen zu Referenzen das Team unten in den Viewport
 * rutscht).
 */
export function trackSection(node: HTMLElement, id: string) {
  if (typeof IntersectionObserver === 'undefined') return { destroy() {} };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.set(id);
        }
      }
    },
    {
      // Band von 28% bis 38% vom oberen Rand des Viewports (knapp unter der Nav).
      rootMargin: '-28% 0px -62% 0px',
      threshold: 0
    }
  );
  io.observe(node);

  return {
    destroy() {
      io.disconnect();
    }
  };
}

/** Svelte-Action: animiert eine Zahl von 0 auf den Zielwert, sobald sichtbar. */
export function countUp(node: HTMLElement, target: number) {
  const duration = 1400;
  let started = false;
  const format = (n: number) => {
    if (target % 1 === 0) return Math.round(n).toLocaleString('de-DE');
    return n.toFixed(1).replace('.', ',');
  };

  const run = () => {
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      node.textContent = format(eased * target);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (typeof IntersectionObserver === 'undefined') {
    node.textContent = format(target);
    return { destroy() {} };
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      }
    },
    { threshold: 0.4 }
  );
  io.observe(node);
  node.textContent = '0';

  return {
    destroy() {
      io.disconnect();
    }
  };
}
