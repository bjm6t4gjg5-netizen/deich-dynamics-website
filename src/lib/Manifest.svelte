<script lang="ts">
  import { reveal } from './actions';

  const principles = [
    {
      n: '01',
      title: 'Code & Daten gehören Ihnen.',
      text: 'Der Quellcode liegt auf Ihren Servern. Die Daten ebenso. Wir bauen, Sie besitzen — von Tag eins. Wenn Sie irgendwann ohne uns weiterarbeiten wollen, hindert Sie nichts daran.'
    },
    {
      n: '02',
      title: 'Kein Lock-in, keine Pro-Tier-Tricks.',
      text: 'Alle Funktionen sind enthalten. Keine künstlich gekappten Features, keine Abo-Eskalation pro Nutzer, keine „das geht erst im Enterprise-Plan"-Gespräche.'
    },
    {
      n: '03',
      title: 'EU-Hosting. DSGVO. GoBD.',
      text: 'Server in Frankfurt am Main, klare Auftrags­verarbeitungs­verträge, revisions­sicheres Archiv ab Werk. Ihr Steuer­berater und Ihr Datenschutz­beauftragter wissen sofort, was sie haben.'
    },
    {
      n: '04',
      title: 'Festpreise statt schwarze Box.',
      text: 'Pro Modul ein Festpreis. Pro Sprint ein klares Lieferdatum. Wir glauben nicht an Stunden­paket­ratespiele — wenn etwas länger dauert, ist das unser Problem.'
    }
  ];
</script>

<section id="principles" class="principles">
  <div class="container">
    <header class="head" use:reveal>
      <span class="eyebrow">Prinzipien</span>
      <h2>Vier Sätze, die für jedes Angebot gelten.</h2>
      <p>Damit Sie wissen, was wir mit „maßgeschneidert" wirklich meinen — und was bei uns garantiert <em>nicht</em> passiert.</p>
    </header>

    <div class="grid">
      {#each principles as p, i}
        <article class="card" use:reveal data-delay={(i % 4) + 1}>
          <span class="num" aria-hidden="true">{p.n}</span>
          <h3>{p.title}</h3>
          <p>{p.text}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .principles {
    background:
      radial-gradient(40% 60% at 100% 0%, rgba(29, 63, 54, 0.06), transparent 70%),
      linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-2) 100%);
  }

  .head {
    max-width: 680px;
    margin-bottom: 2.8rem;
  }
  .head p {
    color: var(--color-text-muted);
    font-size: 1.05rem;
  }
  .head p em {
    font-style: italic;
    color: var(--color-deep);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
  }
  @media (max-width: 720px) {
    .grid { grid-template-columns: 1fr; }
  }

  .card {
    position: relative;
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    border-radius: var(--radius);
    padding: 1.8rem 1.6rem 1.6rem;
    overflow: hidden;
    isolation: isolate;
    transition: transform var(--t-med) var(--ease), box-shadow var(--t-med) var(--ease),
      border-color var(--t-med) var(--ease);
  }
  .card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow);
    border-color: rgba(29, 63, 54, 0.32);
  }

  .num {
    font-family: var(--font-display);
    font-size: 2.4rem;
    font-weight: 500;
    color: var(--color-moss);
    line-height: 1;
    display: block;
    margin-bottom: 0.6rem;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
    opacity: 0.6;
    transition: opacity var(--t-med) var(--ease), color var(--t-med) var(--ease);
  }
  .card:hover .num {
    opacity: 1;
    color: var(--color-deep);
  }

  h3 {
    margin-bottom: 0.45rem;
    font-size: 1.15rem;
  }
  p {
    color: var(--color-text-muted);
    font-size: 0.96rem;
    margin: 0;
    line-height: 1.55;
  }
</style>
