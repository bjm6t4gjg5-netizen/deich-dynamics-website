<script lang="ts">
  import { reveal, trackSection } from './actions';

  type Step = {
    n: string;
    title: string;
    text: string;
    bullets: string[];
  };

  const steps: Step[] = [
    {
      n: '01',
      title: 'Peilung',
      text: 'Wir hören zu, analysieren Ihre Buchhaltungs- und Geschäfts­prozesse und identifizieren, wo Sie tatsächlich Zeit oder Geld verlieren — ohne Buzzwords, ohne 80-Seiten-Konzept.',
      bullets: ['1–2 Workshop-Tage', 'Prozess-Mapping', 'Risiko­einschätzung']
    },
    {
      n: '02',
      title: 'Deichbau',
      text: 'Wir entwerfen ein maßgeschneidertes System: Datenmodell, Schnittstellen, Rollen, UI. Sie sehen Klick-Prototypen und einen verbindlichen Festpreis, bevor eine Zeile Code entsteht.',
      bullets: ['Klick-Prototyp (Figma)', 'Daten­modell-Skizze', 'Schnittstellen­plan']
    },
    {
      n: '03',
      title: 'Flutung',
      text: 'Iterative Umsetzung in 2-Wochen-Sprints, mit echten Daten und echtem Feedback. Sie sind während der gesamten Entwicklung an Bord — keine 4-Monats-Black-Box.',
      bullets: ['2-Wochen-Sprints', 'Dual-Run-Phase', 'Schulung & Übergabe']
    },
    {
      n: '04',
      title: 'Wartung & Wachstum',
      text: 'Nach dem Go-Live bleiben wir an Ihrer Seite: Support, Monitoring, neue Module — so lange Sie uns brauchen, keinen Tag länger.',
      bullets: ['Monitoring & Updates', 'Quartals-Review', 'Modulare Erweiterung']
    }
  ];
</script>

<section id="approach" use:trackSection={'approach'} class="approach">
  <div class="container">
    <header class="head" use:reveal>
      <span class="eyebrow">Vorgehen</span>
      <h2>Vier Phasen, ein Rhythmus.</h2>
      <p>
        Wie der Tidenwechsel an der Nordsee: planbar, transparent — und mit dem nötigen Respekt
        vor dem, was bereits funktioniert.
      </p>
    </header>

    <ol class="timeline">
      {#each steps as step, i}
        <li use:reveal data-delay={(i % 4) + 1}>
          <div class="marker">
            <span class="num">{step.n}</span>
          </div>
          <div class="content">
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <ul class="bullets">
              {#each step.bullets as b}
                <li>{b}</li>
              {/each}
            </ul>
          </div>
        </li>
      {/each}
    </ol>
  </div>
</section>

<style>
  .approach {
    background:
      radial-gradient(60% 60% at 80% 0%, rgba(29, 63, 54, 0.12), transparent 60%),
      radial-gradient(50% 50% at 0% 100%, rgba(184, 133, 54, 0.10), transparent 70%),
      var(--color-bg-2);
  }

  .head {
    max-width: 640px;
    margin-bottom: 3rem;
  }
  .head p {
    color: var(--color-text-muted);
    font-size: 1.05rem;
  }

  .timeline {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.4rem;
    position: relative;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 22px;
    height: 2px;
    background: repeating-linear-gradient(
      to right,
      var(--color-line) 0 8px,
      transparent 8px 16px
    );
    z-index: 0;
  }
  @media (max-width: 620px) {
    .timeline::before { display: none; }
  }

  .timeline li {
    position: relative;
    z-index: 1;
    background: var(--color-surface);
    border-radius: var(--radius);
    padding: 2.4rem 1.4rem 1.4rem;
    border: 1px solid var(--color-line);
    box-shadow: var(--shadow-sm);
    transition: transform var(--t-med) var(--ease), box-shadow var(--t-med) var(--ease);
    display: flex;
    flex-direction: column;
  }
  .timeline li:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow);
  }

  .marker {
    position: absolute;
    top: -22px;
    left: 1.4rem;
    background: var(--color-deep);
    color: var(--color-sun);
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    box-shadow: 0 6px 18px rgba(29, 63, 54, 0.25);
  }
  .marker .num {
    font-family: var(--font-mono);
    font-weight: 500;
    font-size: 0.8rem;
    letter-spacing: 0.06em;
  }

  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .content h3 {
    margin-bottom: 0.3rem;
  }
  .content > p {
    color: var(--color-text-muted);
    margin: 0 0 1rem;
    font-size: 0.96rem;
    flex: 1;
  }

  .bullets {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    border-top: 1px dashed var(--color-line);
    padding-top: 0.9rem;
  }
  .bullets li {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-tide);
    padding-left: 1.1rem;
    position: relative;
    letter-spacing: 0.02em;
  }
  .bullets li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-sun);
  }
</style>
