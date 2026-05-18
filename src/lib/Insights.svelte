<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { reveal, trackSection } from './actions';

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  /* ----------- bilanz.live – Forderungs­altersstaffel ----------- */
  let bilanzAge = 4;
  const b1 = tweened(480000, { duration: 1100, easing: cubicOut }); // 0–30 T
  const b2 = tweened(218000, { duration: 1100, easing: cubicOut }); // 30–60 T
  const b3 = tweened(92500,  { duration: 1100, easing: cubicOut }); // 60–90 T (Alarm)
  const b4 = tweened(50000,  { duration: 1100, easing: cubicOut }); // > 90 T (kritisch)

  function tickBilanz() {
    b1.update(v => clamp(Math.round(v + (Math.random() - 0.5) * 12000), 380000, 580000));
    b2.update(v => clamp(Math.round(v + (Math.random() - 0.5) * 8000),  150000, 280000));
    b3.update(v => clamp(Math.round(v + (Math.random() - 0.4) * 4500),  60000, 130000));
    b4.update(v => clamp(Math.round(v + (Math.random() - 0.3) * 3000),  20000, 90000));
    bilanzAge = 1;
  }

  /* ----------- pnl.live – Marge + Kostenarten ----------- */
  let pnlAge = 6;
  const ebit          = tweened(18.4,    { duration: 1100, easing: cubicOut });
  const material      = tweened(1420000, { duration: 1100, easing: cubicOut });
  const personnel     = tweened(920000,  { duration: 1100, easing: cubicOut });
  const other         = tweened(310000,  { duration: 1100, easing: cubicOut });
  const materialDelta = tweened(14,      { duration: 1100, easing: cubicOut });

  function tickPnL() {
    ebit.update(v          => clamp(+(v + (Math.random() - 0.5) * 0.6).toFixed(1), 13.5, 22));
    material.update(v      => clamp(Math.round(v + (Math.random() - 0.5) * 14000), 1320000, 1520000));
    personnel.update(v     => clamp(Math.round(v + (Math.random() - 0.5) * 6000),  880000, 960000));
    other.update(v         => clamp(Math.round(v + (Math.random() - 0.5) * 4000),  270000, 350000));
    materialDelta.update(v => clamp(+(v + (Math.random() - 0.5) * 1.4).toFixed(1), 8, 19));
    pnlAge = 1;
  }

  let timers: ReturnType<typeof setInterval>[] = [];
  onMount(() => {
    timers.push(setInterval(tickBilanz, 5200));
    timers.push(setInterval(() => (bilanzAge += 1), 1000));
    timers.push(setInterval(tickPnL, 4800));
    timers.push(setInterval(() => (pnlAge += 1), 1000));
  });
  onDestroy(() => timers.forEach(t => clearInterval(t)));

  const fmtK = (n: number) =>
    Math.round(n / 1000).toLocaleString('de-DE') + 'k';
  const fmtPct = (n: number) =>
    n.toFixed(1).replace('.', ',') + ' %';

  $: overdueSum = $b3 + $b4;
  $: maxBilanzBar = Math.max($b1, 580000);
</script>

<section id="insights" use:trackSection={'insights'} class="insights">
  <div class="container">
    <header class="head" use:reveal>
      <span class="eyebrow">Einblicke · FinTech-Erweiterung</span>
      <h2>Wenn das CRM auch Bilanz und GuV liest.</h2>
      <p class="lead">
        Setzen Sie unsere <strong>Finanzanalyse-Schicht</strong> auf das CRM auf, sieht es
        Dinge, die in Standard­software unsichtbar bleiben. Zwei anonymisierte Beispiele
        aus realen Mandaten — was die Dashboards melden, was wir vorschlagen, und wie viel
        das pro Jahr spart.
      </p>
    </header>

    <div class="cards">
      <!-- BILANZ -->
      <article class="insight-card" use:reveal data-delay="1">
        <header class="card-row">
          <span class="live"><span class="live-dot" aria-hidden="true"></span> LIVE</span>
          <span class="card-title">bilanz.live</span>
        </header>

        <div class="kpi">
          <span class="kpi-label">Forderungs­bestand &gt; 60 Tage</span>
          <span class="kpi-value danger">€ {fmtK(overdueSum)}</span>
        </div>

        <div class="rows" aria-label="Altersstaffel offener Forderungen">
          <div class="row">
            <span class="row-label">0–30&nbsp;T</span>
            <div class="row-bar"><div class="row-fill ok"    style="width: {Math.min(100, ($b1 / maxBilanzBar) * 100)}%"></div></div>
            <span class="row-value">€ {fmtK($b1)}</span>
          </div>
          <div class="row">
            <span class="row-label">30–60&nbsp;T</span>
            <div class="row-bar"><div class="row-fill warn"  style="width: {Math.min(100, ($b2 / maxBilanzBar) * 100)}%"></div></div>
            <span class="row-value">€ {fmtK($b2)}</span>
          </div>
          <div class="row">
            <span class="row-label">60–90&nbsp;T</span>
            <div class="row-bar"><div class="row-fill alert" style="width: {Math.min(100, ($b3 / maxBilanzBar) * 100)}%"></div></div>
            <span class="row-value">€ {fmtK($b3)}</span>
          </div>
          <div class="row">
            <span class="row-label">&gt;&nbsp;90&nbsp;T</span>
            <div class="row-bar"><div class="row-fill crit"  style="width: {Math.min(100, ($b4 / maxBilanzBar) * 100)}%"></div></div>
            <span class="row-value">€ {fmtK($b4)}</span>
          </div>
        </div>

        <div class="finding">
          <div class="finding-row">
            <span class="finding-icon" aria-hidden="true">!</span>
            <span class="finding-text">
              <strong>Außenstände &gt; 60 T binden Liquidität.</strong>
              <em>→ Mahnstufe 2 automatisch nach 3 statt 14 Tagen, Skonto-Erinnerung an Top-Debitoren.</em>
            </span>
          </div>
          <div class="saving">
            <span class="saving-label">Sofort freigesetzt</span>
            <span class="saving-value">€ {fmtK(overdueSum)}</span>
          </div>
        </div>

        <footer class="card-footer">
          <span class="tag">DATEV sync</span>
          <span class="tag tag-sun" class:flash={bilanzAge === 1}>aktualisiert vor {bilanzAge}&nbsp;s</span>
        </footer>
      </article>

      <!-- P&L -->
      <article class="insight-card" use:reveal data-delay="2">
        <header class="card-row">
          <span class="live"><span class="live-dot" aria-hidden="true"></span> LIVE</span>
          <span class="card-title">pnl.live</span>
        </header>

        <div class="kpi">
          <span class="kpi-label">EBIT-Marge · Q3 lfd.</span>
          <span class="kpi-value">{fmtPct($ebit)}</span>
        </div>

        <svg viewBox="0 0 320 80" class="spark" aria-hidden="true">
          <defs>
            <linearGradient id="pnl-sg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#5a7666" stop-opacity="0.45" />
              <stop offset="1" stop-color="#5a7666" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path class="spark-line"
                d="M0 58 L40 52 L80 48 L120 40 L160 46 L200 36 L240 30 L280 22 L320 26"
                stroke="#1d3f36" stroke-width="2.4" fill="none"
                stroke-linejoin="round" stroke-linecap="round"/>
          <path d="M0 58 L40 52 L80 48 L120 40 L160 46 L200 36 L240 30 L280 22 L320 26 L320 80 L0 80 Z"
                fill="url(#pnl-sg)"/>
        </svg>

        <div class="rows" aria-label="Kostenarten Q3">
          <div class="row">
            <span class="row-label">Material</span>
            <div class="row-bar"><div class="row-fill alert" style="width: {Math.min(100, ($material / 1600000) * 100)}%"></div></div>
            <span class="row-value">€ {fmtK($material)}<span class="badge alert">+{$materialDelta.toFixed(1).replace('.', ',')}%</span></span>
          </div>
          <div class="row">
            <span class="row-label">Personal</span>
            <div class="row-bar"><div class="row-fill ok" style="width: {Math.min(100, ($personnel / 1600000) * 100)}%"></div></div>
            <span class="row-value">€ {fmtK($personnel)}<span class="badge ok">±0%</span></span>
          </div>
          <div class="row">
            <span class="row-label">Sonstige</span>
            <div class="row-bar"><div class="row-fill warn" style="width: {Math.min(100, ($other / 1600000) * 100)}%"></div></div>
            <span class="row-value">€ {fmtK($other)}<span class="badge ok">−2%</span></span>
          </div>
        </div>

        <div class="finding">
          <div class="finding-row">
            <span class="finding-icon" aria-hidden="true">!</span>
            <span class="finding-text">
              <strong>Materialkosten +{$materialDelta.toFixed(1).replace('.', ',')}% über Budget.</strong>
              <em>→ 3 Lieferanten mit Volumen­anstieg &gt; 8% identifiziert. Rahmenvertrag prüfen.</em>
            </span>
          </div>
          <div class="saving">
            <span class="saving-label">Einsparpotenzial</span>
            <span class="saving-value">€ 38.000 / Jahr</span>
          </div>
        </div>

        <footer class="card-footer">
          <span class="tag">SAP sync</span>
          <span class="tag tag-sun" class:flash={pnlAge === 1}>aktualisiert vor {pnlAge}&nbsp;s</span>
        </footer>
      </article>
    </div>
  </div>
</section>

<style>
  .insights {
    background: var(--color-bg);
    background-image:
      radial-gradient(60% 50% at 20% 0%, rgba(29, 63, 54, 0.06), transparent 60%),
      radial-gradient(40% 40% at 100% 100%, rgba(184, 133, 54, 0.06), transparent 60%);
  }

  .head {
    max-width: 720px;
    margin-bottom: 3rem;
  }
  .head .lead {
    font-size: 1.1rem;
    color: var(--color-text-muted);
  }
  .head .lead strong {
    color: var(--color-deep);
    font-weight: 600;
  }

  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  @media (max-width: 880px) {
    .cards { grid-template-columns: 1fr; }
  }

  .insight-card {
    position: relative;
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-line);
    box-shadow: var(--shadow);
    padding: 1.5rem 1.5rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    transition: transform var(--t-med) var(--ease), box-shadow var(--t-med) var(--ease);
  }
  .insight-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  /* Header (LIVE-Pill + Titel) */
  .card-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
  }
  .live {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #4f7a4d;
    background: rgba(122, 158, 110, 0.14);
    padding: 0.25rem 0.55rem;
    border-radius: 999px;
  }
  .live-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #6f9e5e;
    box-shadow: 0 0 0 0 rgba(111, 158, 94, 0.55);
    animation: livePulse 1.7s ease-in-out infinite;
  }
  @keyframes livePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(111, 158, 94, 0.55); }
    50%      { box-shadow: 0 0 0 6px rgba(111, 158, 94, 0); }
  }
  .card-title {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--color-text-soft);
  }

  /* KPI – große Zahl */
  .kpi {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }
  .kpi-label {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-text-soft);
  }
  .kpi-value {
    font-family: var(--font-display);
    font-size: clamp(1.7rem, 3vw, 2.1rem);
    color: var(--color-deep);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    line-height: 1.1;
  }
  .kpi-value.danger {
    color: #a85638;
  }

  /* Sparkline */
  .spark {
    width: 100%;
    height: 64px;
  }
  .spark-line {
    stroke-dasharray: 720;
    stroke-dashoffset: 720;
    animation: drawSpark 2.4s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
  }
  @keyframes drawSpark {
    to { stroke-dashoffset: 0; }
  }

  /* Bucket-Rows mit Bars */
  .rows {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }
  .row {
    display: grid;
    grid-template-columns: 4.4rem 1fr auto;
    align-items: center;
    gap: 0.7rem;
  }
  .row-label {
    font-family: var(--font-mono);
    font-size: 0.74rem;
    color: var(--color-text-soft);
    letter-spacing: 0.04em;
  }
  .row-bar {
    height: 8px;
    background: var(--color-foam);
    border-radius: 999px;
    overflow: hidden;
  }
  .row-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 1.1s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .row-fill.ok    { background: linear-gradient(90deg, #7a9a72, #5a7666); }
  .row-fill.warn  { background: linear-gradient(90deg, #d4b87a, #b88536); }
  .row-fill.alert { background: linear-gradient(90deg, #d68f55, #b56838); }
  .row-fill.crit  { background: linear-gradient(90deg, #b94e3a, #8b3927); }
  .row-value {
    font-family: var(--font-display);
    font-size: 0.95rem;
    color: var(--color-deep);
    font-variant-numeric: tabular-nums;
    display: inline-flex;
    align-items: baseline;
    gap: 0.45rem;
    white-space: nowrap;
  }
  .badge {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    padding: 0.18rem 0.42rem;
    border-radius: 6px;
    font-weight: 500;
    letter-spacing: 0;
  }
  .badge.alert { background: rgba(181, 76, 58, 0.16); color: #8b3927; }
  .badge.ok    { background: rgba(122, 158, 110, 0.18); color: #4a6b40; }

  /* Findings-Callout */
  .finding {
    background: rgba(184, 133, 54, 0.08);
    border: 1px solid rgba(184, 133, 54, 0.22);
    border-radius: var(--radius);
    padding: 0.9rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }
  .finding-row {
    display: flex;
    gap: 0.7rem;
    align-items: flex-start;
  }
  .finding-icon {
    display: inline-grid;
    place-items: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--color-sun);
    color: #fff;
    font-weight: 700;
    font-size: 0.78rem;
    flex-shrink: 0;
  }
  .finding-text {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    font-size: 0.92rem;
    line-height: 1.45;
  }
  .finding-text strong {
    color: var(--color-deep);
    font-weight: 600;
  }
  .finding-text em {
    font-style: normal;
    color: var(--color-text-muted);
  }

  .saving {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding-top: 0.6rem;
    border-top: 1px dashed rgba(184, 133, 54, 0.32);
    gap: 0.6rem;
  }
  .saving-label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-text-soft);
  }
  .saving-value {
    font-family: var(--font-display);
    font-size: 1.05rem;
    font-weight: 600;
    color: #6e4b1a;
    font-variant-numeric: tabular-nums;
  }

  /* Footer-Tags */
  .card-footer {
    display: flex;
    gap: 0.4rem;
  }
  .tag {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    padding: 0.3rem 0.6rem;
    border-radius: 999px;
    background: var(--color-foam);
    color: var(--color-tide);
  }
  .tag-sun {
    background: rgba(184, 133, 54, 0.16);
    color: #6e4b1a;
    transition: background 600ms var(--ease), color 600ms var(--ease);
  }
  .tag-sun.flash {
    background: rgba(184, 133, 54, 0.45);
    color: #4a2f08;
  }

  @media (max-width: 600px) {
    .insight-card {
      padding: 1.1rem 1.1rem 1.2rem;
      gap: 0.9rem;
    }
    .kpi-value { font-size: 1.6rem; }
    .row { grid-template-columns: 3.8rem 1fr auto; gap: 0.5rem; }
    .row-value { font-size: 0.88rem; }
    .saving-value { font-size: 0.98rem; }
  }
</style>
