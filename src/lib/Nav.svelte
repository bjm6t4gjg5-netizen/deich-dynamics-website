<script lang="ts">
  import { onMount } from 'svelte';
  import { activeSection, scrollY } from './stores';

  // Approach/References/Team sind vorübergehend versteckt (siehe App.svelte) — daher hier auch aus dem Menü raus.
  const links = [
    { id: 'about', label: 'Über uns' },
    { id: 'insights', label: 'Einblicke' },
    { id: 'services', label: 'Leistungen' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Kontakt' }
  ];

  let mobileOpen = false;

  $: scrolled = $scrollY > 24;

  function goTo(id: string) {
    mobileOpen = false;
    // Eagerly setzen, damit der Underline-Indikator sofort wandert.
    // Der IntersectionObserver in trackSection bestätigt das anschließend,
    // sobald der Smooth-Scroll am Ziel ankommt.
    activeSection.set(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onMount(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') mobileOpen = false;
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
</script>

<header class="nav" class:scrolled>
  <div class="inner container">
    <button class="brand" on:click={() => goTo('hero')} aria-label="Zum Seitenanfang">
      <svg class="mark" width="36" height="36" viewBox="0 0 200 200" aria-hidden="true">
        <g fill="currentColor">
          <path d="M 121 21 A 82 82 0 0 1 93 181" fill="none" stroke="currentColor" stroke-width="14"/>
          <path d="M 79 179 A 82 82 0 0 1 107 18" fill="none" stroke="currentColor" stroke-width="14"/>
          <rect x="107" y="0"  width="14" height="118"/>
          <rect x="79"  y="82" width="14" height="118"/>
        </g>
      </svg>
      <span class="brand-text">
        <strong>Deich Dynamics</strong>
        <em>Solutions</em>
      </span>
    </button>

    <nav class="links" class:open={mobileOpen} aria-label="Hauptnavigation">
      {#each links as link}
        <button
          class="link"
          class:active={$activeSection === link.id}
          on:click={() => goTo(link.id)}
        >
          {link.label}
        </button>
      {/each}
      <button class="btn" on:click={() => goTo('contact')}>
        Gespräch buchen
        <span class="arrow" aria-hidden="true">→</span>
      </button>
    </nav>

    <button
      class="burger"
      aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
      aria-expanded={mobileOpen}
      on:click={() => (mobileOpen = !mobileOpen)}
    >
      <span class:open={mobileOpen}></span>
      <span class:open={mobileOpen}></span>
      <span class:open={mobileOpen}></span>
    </button>
  </div>
</header>

<style>
  .nav {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 50;
    transition: background 320ms var(--ease), backdrop-filter 320ms var(--ease),
      box-shadow 320ms var(--ease), padding 320ms var(--ease);
    padding-block: 1.1rem;
  }

  .nav.scrolled {
    background: rgba(220, 207, 180, 0.82);
    backdrop-filter: saturate(140%) blur(14px);
    -webkit-backdrop-filter: saturate(140%) blur(14px);
    box-shadow: 0 1px 0 var(--color-line), 0 8px 30px rgba(29, 63, 54, 0.06);
    padding-block: 0.7rem;
  }

  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    background: none;
    border: none;
    padding: 0;
    color: var(--color-deep);
  }

  .brand-text {
    display: flex;
    flex-direction: column;
    line-height: 1.05;
    text-align: left;
  }
  .brand-text strong {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.05rem;
    letter-spacing: -0.01em;
  }
  .brand-text em {
    font-style: normal;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--color-tide);
  }

  .links {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .link {
    background: none;
    border: none;
    padding: 0.5rem 0.7rem;
    font-size: 0.92rem;
    color: var(--color-text-muted);
    border-radius: 999px;
    position: relative;
    transition: color var(--t-fast) var(--ease), background var(--t-fast) var(--ease);
    white-space: nowrap;
  }
  .link:hover {
    color: var(--color-deep);
    background: rgba(29, 63, 54, 0.08);
  }
  .link.active {
    color: var(--color-deep);
  }
  .link.active::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0.15rem;
    transform: translateX(-50%);
    width: 18px;
    height: 2px;
    border-radius: 2px;
    background: var(--color-deep);
  }

  .links .btn {
    margin-left: 0.5rem;
  }

  .burger {
    display: none;
    background: none;
    border: none;
    width: 38px;
    height: 38px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
  .burger span {
    display: block;
    width: 22px;
    height: 2px;
    border-radius: 2px;
    background: var(--color-deep);
    transition: transform 240ms var(--ease), opacity 240ms var(--ease);
  }
  .burger span.open:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .burger span.open:nth-child(2) {
    opacity: 0;
  }
  .burger span.open:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  @media (max-width: 400px) {
    .brand-text em {
      display: none;
    }
    .brand-text strong {
      font-size: 0.98rem;
    }
  }

  @media (max-width: 1020px) {
    .burger {
      display: flex;
    }
    .links {
      position: fixed;
      inset: 64px 1rem auto 1rem;
      flex-direction: column;
      align-items: stretch;
      gap: 0.25rem;
      padding: 1rem;
      background: var(--color-surface);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      transform: translateY(-12px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 220ms var(--ease), transform 220ms var(--ease);
    }
    .links.open {
      opacity: 1;
      transform: none;
      pointer-events: auto;
    }
    .link {
      text-align: left;
      padding: 0.75rem 1rem;
    }
    .links .btn {
      justify-content: center;
      margin: 0.4rem 0 0;
    }
  }
</style>
