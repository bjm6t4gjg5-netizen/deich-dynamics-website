<script lang="ts">
  import { reveal, trackSection, countUp } from './actions';

  type Stat = {
    prefix?: string;
    value: number;
    suffix?: string;
    label: string;
  };

  const stats: Stat[] = [
    { prefix: '+', value: 120, label: 'Prozesse pro Mandant automatisiert' },
    { value: 92, suffix: '%', label: 'weniger manuelle Buchungen' },
    { prefix: '€ ', value: 6000, label: 'Ø Lizenzkosten gespart pro Jahr' },
    { value: 100, suffix: '%', label: 'maßgeschneidert auf Ihr Setup' }
  ];
</script>

<section id="about" use:trackSection={'about'} class="about">
  <div class="container grid">
    <div class="copy" use:reveal>
      <span class="eyebrow">Über uns</span>
      <h2>Lokal verwurzelt. Technisch tiefgehend.</h2>
      <p>
        Deich Dynamics Solutions wurde von <strong>Leon Schulte</strong> in St.&nbsp;Peter-Ording
        gegründet — dort, wo Wind, Wasser und Sand jeden Tag aufs Neue zeigen, was wirklich
        tragfähig ist. Genauso bauen wir unser <strong>hauseigenes CRM</strong> und die darauf
        aufsetzende Finanzanalyse: belastbar, anpassbar und ohne unnötigen Ballast.
      </p>
      <p>
        Wir glauben, dass gute Software nicht „passt schon" sein darf. Statt eines weiteren
        teuren Abos bekommen Sie ein System, das exakt zu Ihren Prozessen passt — und mit Ihnen
        wächst, wenn die Tide steigt.
      </p>
    </div>

    <div class="stats" use:reveal data-delay="1">
      {#each stats as stat}
        <div class="stat">
          <div class="num-row">
            {#if stat.prefix}<span class="affix">{stat.prefix}</span>{/if}<span class="num" use:countUp={stat.value}>0</span>{#if stat.suffix}<span class="affix">{stat.suffix}</span>{/if}
          </div>
          <span class="label">{stat.label}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .about {
    background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-2) 100%);
  }

  .grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: clamp(2rem, 5vw, 4rem);
    align-items: center;
  }

  @media (max-width: 880px) {
    .grid { grid-template-columns: 1fr; }
  }

  .copy p {
    color: var(--color-text-muted);
    max-width: 38em;
    font-size: 1.05rem;
  }
  .copy p strong {
    color: var(--color-deep);
    font-weight: 600;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  @media (max-width: 420px) {
    .stats { grid-template-columns: 1fr; }
  }

  .stat {
    background: var(--color-surface);
    border-radius: var(--radius);
    padding: 1.4rem 1.2rem;
    border: 1px solid var(--color-line);
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    box-shadow: var(--shadow-sm);
    transition: transform var(--t-med) var(--ease), box-shadow var(--t-med) var(--ease);
  }
  .stat:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow);
  }

  .num-row {
    display: inline-flex;
    align-items: baseline;
    line-height: 1;
    font-family: var(--font-display);
    color: var(--color-deep);
    font-variant-numeric: tabular-nums;
  }
  .num {
    font-size: clamp(2.3rem, 4.2vw, 2.9rem);
    font-weight: 600;
    line-height: 1;
  }
  .affix {
    font-size: clamp(1.2rem, 2.2vw, 1.55rem);
    font-weight: 500;
    color: var(--color-moss);
    line-height: 1;
    /* leicht abgesetzte Tonalität, sitzt sauber auf gemeinsamer Baseline */
    margin-inline: 0.04em;
  }
  .label {
    font-size: 0.92rem;
    color: var(--color-text-muted);
    line-height: 1.4;
  }
</style>
