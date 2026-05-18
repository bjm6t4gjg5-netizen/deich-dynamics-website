<script lang="ts">
  // Schlanker Layout-Wrapper für Impressum/Datenschutz.
  // Kein animierter Hero, kein Cursor-Glow — bewusst ruhig und lesefreundlich.
  export let title: string;
</script>

<svelte:head>
  <title>{title} — Deich Dynamics Solutions</title>
</svelte:head>

<header class="legal-nav">
  <div class="inner container">
    <a class="brand" href="./" aria-label="Zur Startseite">
      <svg class="mark" width="32" height="32" viewBox="0 0 200 200" aria-hidden="true">
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
    </a>

    <a class="back" href="./">← Zur Startseite</a>
  </div>
</header>

<main class="legal-main">
  <div class="container">
    <slot />
  </div>
</main>

<footer class="legal-footer">
  <div class="container">
    <span>© {new Date().getFullYear()} Deich Dynamics Solutions</span>
    <span class="sep">·</span>
    <a href="./impressum.html">Impressum</a>
    <span class="sep">·</span>
    <a href="./datenschutz.html">Datenschutz</a>
    <span class="sep">·</span>
    <a href="mailto:leon@deich-dynamics.com">leon@deich-dynamics.com</a>
  </div>
</footer>

<style>
  .legal-nav {
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-line);
    padding-block: 1rem;
  }
  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    color: var(--color-deep);
    text-decoration: none;
  }
  .brand-text {
    display: flex;
    flex-direction: column;
    line-height: 1.05;
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
  .back {
    font-size: 0.92rem;
    color: var(--color-text-muted);
    text-decoration: none;
    padding: 0.5rem 0.85rem;
    border-radius: 999px;
    transition: color var(--t-fast) var(--ease), background var(--t-fast) var(--ease);
  }
  .back:hover {
    color: var(--color-deep);
    background: rgba(29, 63, 54, 0.08);
  }

  .legal-main {
    padding-block: clamp(2.5rem, 5vw, 4rem);
    min-height: 60vh;
  }

  .legal-footer {
    background: var(--color-deep);
    color: #b5c4b0;
    padding-block: 1.5rem;
    font-size: 0.85rem;
  }
  .legal-footer .container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
  }
  .legal-footer a {
    color: #d6e0d0;
    text-decoration: none;
  }
  .legal-footer a:hover {
    color: var(--color-sun);
  }
  .legal-footer .sep {
    color: #5a7666;
  }

  @media (max-width: 520px) {
    .brand-text em {
      display: none;
    }
  }
</style>
