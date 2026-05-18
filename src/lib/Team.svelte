<script lang="ts">
  import { reveal, trackSection } from './actions';

  const team = [
    {
      initials: 'LS',
      name: 'Leon Schulte',
      role: 'Gründer & Solution Architect',
      bio: 'Gründer von Deich Dynamics Solutions. Software-Engineer mit Schwerpunkt Finance- &amp; Operations-Systeme. Übersetzt Buchhaltungs-Realität in saubere, maßgeschneiderte Software — direkt erreichbar, Mo–Fr.',
      contact: 'leon@deich-dynamics.com',
      hue: 'cool',
      featured: true
    },
    {
      initials: '+',
      name: 'Lead Developer',
      role: 'Position offen',
      bio: 'Verstärkung gesucht — Full-Stack mit Freude an APIs, Datenmodellen und sauberer Architektur.',
      hue: 'warm',
      featured: false
    },
    {
      initials: '+',
      name: 'Fachberatung Buchhaltung',
      role: 'Partner-Netzwerk',
      bio: 'Erfahrene Steuerfachleute auf Projektbasis — übersetzen zwischen DATEV-Logik und Entwicklerteam.',
      hue: 'sand',
      featured: false
    },
    {
      initials: '+',
      name: 'UX & Customer Success',
      role: 'Partner-Netzwerk',
      bio: 'Sorgt dafür, dass die Software für Menschen gebaut wird — nicht für Buchhaltungs-Roboter.',
      hue: 'sea',
      featured: false
    }
  ];
</script>

<section id="team" use:trackSection={'team'} class="team">
  <div class="container">
    <header class="head" use:reveal>
      <span class="eyebrow">Team</span>
      <h2>Klein, fokussiert, an der Küste.</h2>
      <p>Inhabergeführt mit einem Partner-Netzwerk, das mit dem Projekt mitwächst. Sie kennen Ihre direkten Ansprechpartner ab dem ersten Gespräch.</p>
    </header>

    <div class="grid">
      {#each team as p, i}
        <article class="member" class:featured={p.featured} use:reveal data-delay={(i % 4) + 1}>
          <div class="avatar hue-{p.hue}">
            <span>{p.initials}</span>
          </div>
          <h3>{p.name}</h3>
          <span class="role">{p.role}</span>
          <p>{@html p.bio}</p>
          {#if p.contact}
            <a class="contact-line" href="mailto:{p.contact}">{p.contact}</a>
          {/if}
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .team {
    background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-2) 100%);
  }

  .head {
    max-width: 640px;
    margin-bottom: 2.5rem;
  }
  .head p {
    color: var(--color-text-muted);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.2rem;
  }

  .member {
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    border-radius: var(--radius);
    padding: 1.6rem 1.4rem 1.4rem;
    text-align: left;
    transition: transform var(--t-med) var(--ease), box-shadow var(--t-med) var(--ease);
  }
  .member:hover {
    transform: translateY(-5px) rotate(-0.4deg);
    box-shadow: var(--shadow);
  }

  /* Gründer-Karte hervorgehoben */
  .member.featured {
    background: var(--color-deep);
    color: var(--color-surface);
    border-color: var(--color-deep);
  }
  .member.featured h3 {
    color: var(--color-cloud);
  }
  .member.featured .role {
    color: var(--color-foam);
  }
  .member.featured p {
    color: rgba(255, 255, 255, 0.78);
  }
  .member.featured .avatar {
    background: var(--color-cloud);
    color: var(--color-deep);
    transform: rotate(0deg);
    border-radius: 50%;
  }
  .member.featured:hover .avatar {
    transform: rotate(-6deg);
    border-radius: 18px;
  }

  .avatar {
    width: 64px;
    height: 64px;
    border-radius: 18px;
    display: grid;
    place-items: center;
    margin-bottom: 1rem;
    font-family: var(--font-display);
    font-weight: 600;
    color: #fff;
    letter-spacing: 0.04em;
    transform: rotate(-6deg);
    transition: transform var(--t-med) var(--ease), border-radius var(--t-med) var(--ease);
  }
  .member:hover .avatar {
    transform: rotate(0deg);
    border-radius: 50%;
  }

  /* Vier monochrome Tonalitäten – einheitlich Deichgrün/Sand */
  .hue-cool { background: linear-gradient(135deg, #1d3f36, #5a7666); }   /* deep → moss */
  .hue-warm { background: linear-gradient(135deg, #2a544a, #7a8a72); }   /* deep-2 → marram */
  .hue-sand { background: linear-gradient(135deg, #5a7666, #b8a98a); }   /* moss → sand-tief */
  .hue-sea  { background: linear-gradient(135deg, #1d3f36, #3d6b7a); }   /* deep → muted sea */

  h3 {
    margin-bottom: 0.1rem;
  }

  .role {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.05em;
    color: var(--color-tide);
    margin-bottom: 0.8rem;
  }

  p {
    color: var(--color-text-muted);
    font-size: 0.95rem;
    margin: 0;
  }

  .contact-line {
    display: inline-block;
    margin-top: 0.9rem;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--color-tide);
    text-decoration: underline;
    text-decoration-color: var(--color-line);
    text-underline-offset: 3px;
  }
  .contact-line:hover {
    text-decoration-color: var(--color-tide);
  }
  .member.featured .contact-line {
    color: var(--color-foam);
    text-decoration-color: rgba(255, 255, 255, 0.3);
  }
  .member.featured .contact-line:hover {
    color: var(--color-cloud);
    text-decoration-color: var(--color-foam);
  }
</style>
