<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { pointer, scrollY } from './stores';
  import { trackSection } from './actions';

  // Parallax-Werte aus globalen Stores ableiten
  $: tiltX = ($pointer.x - 0.5) * 14;
  $: tiltY = ($pointer.y - 0.5) * 10;
  $: scrollOffset = Math.min($scrollY * 0.25, 160);

  /* ------------ Live CRM dashboard – Pipeline & Deal-Funnel ------------ */
  const pipelineValue = tweened(1843000, { duration: 1100, easing: cubicOut });
  // 5 Deal-Stages: Lead → Qualifiziert → Angebot → Verhandlung → Abschluss
  let stages: number[] = [48, 36, 26, 18, 9];
  let secondsAgo = 2;

  let refreshTimer: ReturnType<typeof setInterval> | undefined;
  let secondTimer: ReturnType<typeof setInterval> | undefined;

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  function refreshData() {
    // Pipeline-Wert leicht driften – leichter Aufwärtsbias.
    pipelineValue.update(v =>
      clamp(Math.round(v + (Math.random() - 0.4) * 35000), 1450000, 2250000)
    );
    // Stages funnelförmig neu würfeln (jeder Bucket bleibt um ±3 ähnlich).
    stages = stages.map((v, i) => {
      const drift = Math.round((Math.random() - 0.5) * 6);
      const min = Math.max(3, 14 - i * 3);
      const max = Math.max(15, 60 - i * 8);
      return Math.round(clamp(v + drift, min, max));
    });
    secondsAgo = 1;
  }

  onMount(() => {
    refreshTimer = setInterval(refreshData, 4500);
    secondTimer = setInterval(() => (secondsAgo += 1), 1000);
  });
  onDestroy(() => {
    if (refreshTimer) clearInterval(refreshTimer);
    if (secondTimer) clearInterval(secondTimer);
  });

  $: pipelineFmt =
    '€ ' + ($pipelineValue / 1_000_000).toFixed(2).replace('.', ',') + ' Mio';
  $: stageMax = Math.max(...stages, 30);
</script>

<section id="hero" use:trackSection={'hero'} class="hero">
  <!-- Animierter Himmel-Hintergrund -->
  <div class="sky" aria-hidden="true">
    <div class="sun" style="transform: translate3d({tiltX * 0.4}px, {tiltY * 0.4 - scrollOffset * 0.4}px, 0)"></div>
    <div class="cloud c1" style="transform: translate3d({tiltX * 1.2}px, {tiltY * 0.6}px, 0)"></div>
    <div class="cloud c2" style="transform: translate3d({tiltX * -1.6}px, {tiltY * 0.8}px, 0)"></div>
    <div class="cloud c3" style="transform: translate3d({tiltX * 0.8}px, {tiltY * 0.3}px, 0)"></div>
  </div>

  <div class="container content">
    <div class="copy">
      <span class="eyebrow">Haus­eigenes CRM · St. Peter-Ording</span>
      <h1>
        Unser CRM,
        <span class="accent">das mit der Tide</span>
        Ihres Unternehmens mitgeht.
      </h1>
      <p class="lead">
        Unser Hauptprodukt ist ein <strong>haus­eigen entwickeltes CRM-System</strong> — komplett
        individuell konfigurier­bar, ohne Lizenz-Pro-Tier, ohne Funktionen hinter einer Paywall.
        Auf Wunsch erweitern wir es um eine eigene <strong>FinTech- &amp; Finanzanalyse-Schicht</strong>:
        Bilanz, GuV und Liquidität live — statt am Monatsende.
      </p>

      <div class="ctas">
        <a class="btn" href="#contact">
          Unverbindlich Kontakt aufnehmen
          <span class="arrow" aria-hidden="true">→</span>
        </a>
        <a class="btn ghost" href="#services">Leistungen ansehen</a>
      </div>

      <ul class="badges" aria-label="Kernkompetenzen">
        <li class="primary">Hauseigenes CRM</li>
        <li>Workflow-Engine</li>
        <li>+&nbsp;Finanzanalyse</li>
        <li>DATEV &amp; API</li>
        <li>Reporting</li>
      </ul>
    </div>

    <!-- Reactive Pfahlbau-Karte -->
    <div
      class="card-3d"
      style="transform: perspective(900px) rotateY({tiltX * 0.6}deg) rotateX({-tiltY * 0.6}deg)"
    >
      <div class="card-inner">
        <div class="card-row">
          <span class="live">
            <span class="live-dot" aria-hidden="true"></span>
            LIVE
          </span>
          <span class="card-title">pipeline.live</span>
        </div>
        <div class="metric">
          <span class="metric-label">Pipeline · offen</span>
          <span class="metric-value">{pipelineFmt}</span>
        </div>
        <svg viewBox="0 0 320 110" class="spark" aria-hidden="true">
          <defs>
            <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#5a7666" stop-opacity="0.45" />
              <stop offset="1" stop-color="#5a7666" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path class="spark-line"
            d="M0 80 L30 60 L60 70 L90 40 L120 55 L150 30 L180 50 L210 25 L240 45 L270 20 L300 35 L320 18"
            stroke="#1d3f36"
            stroke-width="2.4"
            fill="none"
            stroke-linejoin="round"
            stroke-linecap="round"
          />
          <path
            d="M0 80 L30 60 L60 70 L90 40 L120 55 L150 30 L180 50 L210 25 L240 45 L270 20 L300 35 L320 18 L320 110 L0 110 Z"
            fill="url(#sg)"
          />
        </svg>
        <!-- 5 Deal-Stages als Funnel: Lead → Qualifiziert → Angebot → Verhandlung → Abschluss -->
        <div class="bars stages" aria-label="Deal-Pipeline nach Phase">
          {#each stages as count, i (i)}
            <span class="stage" style="height: {Math.min(100, (count / stageMax) * 100)}%" title="{['Lead', 'Qualifiziert', 'Angebot', 'Verhandlung', 'Abschluss'][i]}: {count} Deals"></span>
          {/each}
        </div>
        <div class="stage-labels" aria-hidden="true">
          <span>Lead</span>
          <span>Qual.</span>
          <span>Angeb.</span>
          <span>Verh.</span>
          <span>Won</span>
        </div>
        <div class="card-footer">
          <span class="tag">CRM core</span>
          <span class="tag tag-sun" class:flash={secondsAgo === 1}>
            aktualisiert vor {secondsAgo}&nbsp;s
          </span>
        </div>
      </div>
      <div class="card-glow" aria-hidden="true"></div>
    </div>
  </div>

  <!-- Wellen am unteren Rand – gedeckter Teal-Verlauf zum Deich-Grün -->
  <svg class="waves" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="w1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7a8d7f" />
        <stop offset="1" stop-color="#5a7666" />
      </linearGradient>
      <linearGradient id="w2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#355a4f" />
        <stop offset="1" stop-color="#1d3f36" />
      </linearGradient>
    </defs>

    <path class="wave wave-a" fill="url(#w1)" d="M0,120 C220,40 420,200 720,120 C1020,40 1220,200 1440,120 L1440,220 L0,220 Z" />
    <path class="wave wave-b" fill="url(#w2)" d="M0,160 C220,90 420,230 720,160 C1020,90 1220,230 1440,160 L1440,220 L0,220 Z" opacity="0.95" />
  </svg>

  <button class="scroll-cue" aria-label="Mehr anzeigen" on:click={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
    <span class="mouse"><span></span></span>
    <small>scroll</small>
  </button>
</section>

<style>
  .hero {
    min-height: 100vh;
    min-height: 100svh;
    display: grid;
    align-items: center;
    overflow: hidden;
    padding-top: clamp(7rem, 12vw, 9rem);
    padding-bottom: clamp(8rem, 14vw, 12rem);
    /* Blick vom Deich: heller Sand → Sand → Dünenton → gedämpftes Deichgrün */
    background:
      linear-gradient(180deg,
        #ece1c8 0%,
        #dccfb4 42%,
        #beb39a 72%,
        #8a9d8e 100%);
  }

  .sky {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  /* Sehr dezente, warme Lichtquelle statt poppiger Sonne */
  .sun {
    position: absolute;
    top: 4%;
    right: 6%;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, rgba(255, 244, 215, 0.55) 0%, rgba(231, 207, 161, 0.20) 45%, rgba(231, 207, 161, 0) 75%);
    filter: blur(8px);
    transition: transform 220ms var(--ease);
  }

  .cloud {
    position: absolute;
    background: rgba(255, 250, 240, 0.55);
    border-radius: 999px;
    filter: blur(14px);
    transition: transform 220ms var(--ease);
  }
  .cloud.c1 { width: 320px; height: 50px; top: 18%; left: 8%; opacity: 0.7; }
  .cloud.c2 { width: 400px; height: 60px; top: 32%; right: 14%; opacity: 0.45; }
  .cloud.c3 { width: 220px; height: 38px; top: 12%; left: 45%; opacity: 0.35; }

  .content {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: clamp(2rem, 5vw, 4rem);
    align-items: center;
  }

  @media (max-width: 980px) {
    .content { grid-template-columns: 1fr; }
  }

  /* monochromatischer, professioneller Akzent mit langsamem Shimmer */
  h1 .accent {
    color: var(--color-deep);
    font-style: italic;
    font-weight: 500;
    background: linear-gradient(110deg,
      var(--color-deep) 0%,
      var(--color-moss) 35%,
      var(--color-deep) 65%,
      var(--color-moss) 100%);
    background-size: 220% 100%;
    background-position: 0% 0%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: accentShimmer 9s ease-in-out infinite;
  }
  @keyframes accentShimmer {
    0%, 100% { background-position: 0% 0%; }
    50%      { background-position: 100% 0%; }
  }

  .lead {
    font-size: clamp(1.05rem, 1.5vw, 1.2rem);
    color: var(--color-text-muted);
    max-width: 38em;
    margin-bottom: 1.8rem;
  }
  .lead strong {
    color: var(--color-deep);
    font-weight: 600;
  }

  .ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .badges li {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    padding: 0.4rem 0.75rem;
    border-radius: 999px;
    background: rgba(250, 243, 223, 0.65);
    border: 1px solid var(--color-line);
    color: var(--color-deep);
    backdrop-filter: blur(6px);
  }
  .badges li.primary {
    background: var(--color-deep);
    color: var(--color-cloud);
    border-color: var(--color-deep);
  }

  /* 3D-Karte */
  .card-3d {
    position: relative;
    justify-self: center;
    width: min(440px, 100%);
    transform-style: preserve-3d;
    transition: transform 220ms var(--ease);
  }
  /* Auf Touch-Geräten kein 3D-Tilt durch Finger­bewegung */
  @media (hover: none) and (pointer: coarse) {
    .card-3d {
      transform: none !important;
    }
  }
  .card-inner {
    position: relative;
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 1.25rem 1.4rem 1.4rem;
    border: 1px solid rgba(255, 255, 255, 0.7);
    z-index: 2;
  }
  .card-glow {
    position: absolute;
    inset: -10px;
    background: radial-gradient(60% 60% at 50% 30%, rgba(90, 118, 102, 0.35), transparent 70%);
    filter: blur(30px);
    z-index: 1;
  }

  .card-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    margin-bottom: 1rem;
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

  .metric {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.6rem;
  }
  .metric-label {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    color: var(--color-text-soft);
    text-transform: uppercase;
  }
  .metric-value {
    font-family: var(--font-display);
    font-size: 1.6rem;
    color: var(--color-deep);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    transition: color 220ms var(--ease);
  }

  .spark {
    width: 100%;
    height: 90px;
    margin-bottom: 0.6rem;
  }
  /* Linie zeichnet sich beim Laden ein */
  .spark-line {
    stroke-dasharray: 720;
    stroke-dashoffset: 720;
    animation: drawSpark 2.4s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
  }
  @keyframes drawSpark {
    to { stroke-dashoffset: 0; }
  }

  .bars {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
    height: 64px;
    margin-bottom: 0.35rem;
  }
  .bars span {
    align-self: end;
    height: 0%;
    background: linear-gradient(180deg, var(--color-wave), var(--color-tide));
    border-radius: 6px;
    transition: height 1.1s cubic-bezier(0.22, 1, 0.36, 1);
  }
  /* Funnel-Effekt: jede Stage etwas heller, damit die Verjüngung erkennbar bleibt */
  .bars .stage:nth-child(1) { background: linear-gradient(180deg, #7a9a72, #5a7666); }
  .bars .stage:nth-child(2) { background: linear-gradient(180deg, #84a37a, #5f7d6a); }
  .bars .stage:nth-child(3) { background: linear-gradient(180deg, #6f8b78, #4f6b5a); }
  .bars .stage:nth-child(4) { background: linear-gradient(180deg, #5a7666, #354a40); }
  .bars .stage:nth-child(5) { background: linear-gradient(180deg, #2a544a, #1d3f36); }

  .stage-labels {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
    margin-bottom: 0.7rem;
  }
  .stage-labels span {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    letter-spacing: 0.05em;
    color: var(--color-text-soft);
    text-align: center;
  }

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

  /* Wellen */
  .waves {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    width: 100%;
    height: clamp(120px, 16vw, 220px);
    z-index: 1;
  }
  .wave {
    animation: waveShift 14s ease-in-out infinite;
    transform-origin: center;
  }
  .wave-b {
    animation-duration: 19s;
    animation-direction: reverse;
  }
  @keyframes waveShift {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-40px); }
  }

  .scroll-cue {
    position: absolute;
    left: 50%;
    bottom: clamp(22px, 3vw, 38px);
    transform: translateX(-50%);
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.45rem;
    background: none;
    border: none;
    /* warmes Weiß – gut sichtbar auf der dunklen Welle, dezent auf hellem Hintergrund */
    color: rgba(250, 243, 223, 0.92);
    text-shadow: 0 1px 4px rgba(29, 63, 54, 0.55);
  }
  .scroll-cue small {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    opacity: 0.8;
  }
  .mouse {
    width: 22px;
    height: 34px;
    border: 1.5px solid rgba(250, 243, 223, 0.85);
    border-radius: 14px;
    position: relative;
    box-shadow: 0 1px 6px rgba(29, 63, 54, 0.35);
  }
  .mouse span {
    position: absolute;
    left: 50%;
    top: 6px;
    width: 3px;
    height: 6px;
    border-radius: 2px;
    background: rgba(250, 243, 223, 0.92);
    transform: translateX(-50%);
    animation: scrollDot 1.6s var(--ease) infinite;
  }
  @keyframes scrollDot {
    0% { transform: translate(-50%, 0); opacity: 1; }
    70% { transform: translate(-50%, 12px); opacity: 0; }
    100% { transform: translate(-50%, 0); opacity: 0; }
  }

  /* iPhone / kleine Screens */
  @media (max-width: 600px) {
    .hero {
      padding-top: clamp(5rem, 14vw, 7rem);
      padding-bottom: clamp(8rem, 22vw, 11rem);
    }
    .content {
      gap: 2.5rem;
    }
    .ctas {
      flex-direction: column;
      align-items: stretch;
      gap: 0.55rem;
    }
    .ctas .btn {
      justify-content: center;
    }
    .badges {
      gap: 0.35rem;
    }
    .badges li {
      font-size: 0.7rem;
      padding: 0.32rem 0.6rem;
    }
    .sun {
      width: 240px;
      height: 240px;
    }
    .card-inner {
      padding: 1rem 1.1rem 1.1rem;
    }
    .metric-value {
      font-size: 1.4rem;
    }
  }
</style>
