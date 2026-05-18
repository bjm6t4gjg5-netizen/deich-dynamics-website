<script lang="ts">
  const year = new Date().getFullYear();
</script>

<footer class="footer">
  <svg class="waves" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0,40 C220,10 420,70 720,40 C1020,10 1220,70 1440,40 L1440,80 L0,80 Z" fill="#1d3f36" />
  </svg>

  <div class="container inner">
    <div class="brand">
      <strong>Deich Dynamics Solutions</strong>
      <span>FinTech &amp; Buchhaltungs-Engineering · St. Peter-Ording</span>
      <span class="founder">Inhabergeführt von Leon Schulte</span>
    </div>

    <nav aria-label="Footer-Navigation">
      <a href="#about">Über uns</a>
      <a href="#services">Leistungen</a>
      <a href="#faq">FAQ</a>
      <a href="#contact">Kontakt</a>
    </nav>

    <div class="legal">
      <span>© {year} Deich Dynamics Solutions</span>
      <span>·</span>
      <a href="mailto:leon@deich-dynamics.com">leon@deich-dynamics.com</a>
      <span>·</span>
      <a href="./impressum.html">Impressum</a>
      <span>·</span>
      <a href="./datenschutz.html">Datenschutz</a>
    </div>
  </div>
</footer>

<style>
  .footer {
    position: relative;
    background: var(--color-deep);
    color: #d6e0d0;
    padding: 5rem 0 2rem;
    margin-top: 2rem;
  }

  .waves {
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    width: 100%;
    height: 80px;
    transform: translateY(-100%);
  }

  .inner {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr;
    gap: 2rem;
    align-items: center;
  }

  @media (max-width: 760px) {
    .inner {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  .brand {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .brand strong {
    font-family: var(--font-display);
    font-size: 1.1rem;
    color: #fff;
  }
  .brand span {
    color: #b5c4b0;
    font-size: 0.88rem;
  }
  .brand .founder {
    color: #97aa97;
    font-size: 0.82rem;
    margin-top: 0.2rem;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
  nav a {
    color: #d6e0d0;
    font-size: 0.92rem;
  }
  nav a:hover {
    color: var(--color-sun);
  }

  .legal {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    color: #97aa97;
    font-size: 0.82rem;
  }
  .legal a {
    color: #d6e0d0;
  }
  .legal a:hover {
    color: var(--color-sun);
  }

  @media (max-width: 760px) {
    .legal {
      justify-content: center;
    }
  }
</style>
