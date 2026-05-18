<script lang="ts">
  import { reveal, trackSection } from './actions';

  const industries = [
    'Maritimer Handel',
    'Tourismus & Hospitality',
    'eCommerce-Mittelstand',
    'Beratung & Agenturen',
    'Familienbetriebe',
    'Handwerk & Bau',
    'Vereine & Verbände'
  ];

  const quotes = [
    {
      text: 'Endlich ein CRM, das zu uns passt — und nicht andersherum. Wir haben unsere Pipeline-Übersicht von Excel auf das Deich-CRM umgestellt und dabei drei Tools eingespart.',
      author: 'Geschäftsführerin',
      role: 'Maritimer Handelsbetrieb · Husum',
      avatar: 'M'
    },
    {
      text: 'Was uns überzeugt hat: kein Lizenz-Roulette, kein „das geht erst im Enterprise-Plan". Wir bekommen genau die Funktionen, die wir brauchen — und die wachsen mit uns.',
      author: 'CFO',
      role: 'eCommerce Mittelstand · Hamburg',
      avatar: 'F'
    },
    {
      text: 'Die Migration aus unserer alten Standard­software lief erstaunlich entspannt. Saubere Übergabe, klares Training, danach lief alles. Vor allem: keine Daten verloren.',
      author: 'Leiter Finanzen',
      role: 'Tourismus-Gruppe · Nordfriesland',
      avatar: 'T'
    },
    {
      text: 'Wir hatten vorher drei Excel-Tabellen, zwei Outlook-Postfächer und ein Mahnwesen im Kopf. Jetzt ein System — und der Forderungs­bestand ist um 38&nbsp;% gesunken.',
      author: 'Inhaber',
      role: 'Großhandel · Bremen',
      avatar: 'G'
    },
    {
      text: 'Festpreise, klare Sprints, ein Ansprech­partner. Im Beratungs­geschäft sind wir solche Verträge nicht gewohnt — und sehr dankbar dafür.',
      author: 'Geschäftsführer',
      role: 'Beratungs­agentur · Schleswig',
      avatar: 'B'
    }
  ];
</script>

<section id="references" use:trackSection={'references'} class="refs">
  <div class="container">
    <header class="head" use:reveal>
      <span class="eyebrow">Referenzen</span>
      <h2>Stimmen von Mandanten und Partnern.</h2>
      <p>Auf Wunsch der Beteiligten anonymisiert — Original­referenzen stellen wir im Gespräch gerne bereit.</p>
    </header>

    <div class="industries" use:reveal data-delay="1">
      <span class="industries-label">Wir arbeiten regelmäßig mit</span>
      <div class="chips">
        {#each industries as ind}
          <span class="chip">{ind}</span>
        {/each}
      </div>
    </div>

    <div class="grid">
      {#each quotes as q, i}
        <figure class="quote" use:reveal data-delay={(i % 3) + 1}>
          <svg class="mark" viewBox="0 0 32 32" aria-hidden="true">
            <path
              d="M11 8 C7 10 5 13 5 17 V24 H12 V17 H9 C9 14 10 12 13 11 Z M25 8 C21 10 19 13 19 17 V24 H26 V17 H23 C23 14 24 12 27 11 Z"
              fill="currentColor"
            />
          </svg>
          <blockquote>{@html q.text}</blockquote>
          <figcaption>
            <span class="avatar">{q.avatar}</span>
            <span class="who">
              <strong>{q.author}</strong>
              <em>{q.role}</em>
            </span>
          </figcaption>
        </figure>
      {/each}
    </div>
  </div>
</section>

<style>
  .refs {
    background: var(--color-bg);
  }

  .head {
    max-width: 640px;
    margin-bottom: 2rem;
  }
  .head p {
    color: var(--color-text-muted);
  }

  /* Branchen-Chips */
  .industries {
    margin-bottom: 2.5rem;
    padding: 1.1rem 1.4rem;
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    border-radius: var(--radius);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.8rem 1.4rem;
  }
  .industries-label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-text-soft);
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  .chip {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    padding: 0.32rem 0.7rem;
    border-radius: 999px;
    background: var(--color-foam);
    color: var(--color-deep);
    border: 1px solid var(--color-line);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.2rem;
  }

  .quote {
    position: relative;
    margin: 0;
    background: var(--color-surface);
    border-radius: var(--radius);
    border: 1px solid var(--color-line);
    padding: 1.6rem 1.4rem 1.3rem;
    box-shadow: var(--shadow-sm);
    transition: transform var(--t-med) var(--ease), box-shadow var(--t-med) var(--ease);
  }
  .quote:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow);
  }

  .mark {
    width: 28px;
    height: 28px;
    color: var(--color-sun);
    margin-bottom: 0.5rem;
  }

  blockquote {
    margin: 0 0 1rem;
    font-family: var(--font-display);
    font-size: 1.05rem;
    line-height: 1.55;
    color: var(--color-deep);
  }

  figcaption {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    border-top: 1px solid var(--color-line);
    padding-top: 0.9rem;
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-tide), var(--color-deep));
    color: #fff;
    display: grid;
    place-items: center;
    font-family: var(--font-display);
    font-weight: 600;
  }

  .who {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }
  .who strong {
    color: var(--color-deep);
    font-weight: 500;
  }
  .who em {
    font-style: normal;
    color: var(--color-text-soft);
    font-size: 0.82rem;
  }
</style>
