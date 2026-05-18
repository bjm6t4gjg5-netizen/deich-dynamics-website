<script lang="ts">
  import { fade } from 'svelte/transition';
  import { reveal, trackSection } from './actions';
  import { pointer } from './stores';

  type Service = {
    icon: string;
    title: string;
    text: string;
    bullets: string[];
  };

  type Track = {
    id: 'fintech' | 'crm';
    label: string;
    sub: string;
    services: Service[];
  };

  const tracks: Track[] = [
    {
      id: 'crm',
      label: 'CRM & Geschäfts­prozesse',
      sub: 'Kernprodukt',
      services: [
        {
          icon: 'users',
          title: 'Individuelles Datenmodell',
          text: 'Kontakte, Pipelines und Custom-Felder, die exakt zu Ihrem Geschäft passen — nicht zu dem, was Salesforce vorgibt.',
          bullets: ['Custom Entities', 'n-zu-n Beziehungen', 'Vererbung & Rollen']
        },
        {
          icon: 'flow',
          title: 'Workflow- & Prozess-Engine',
          text: 'Leads, Tickets, Aufgaben, Wieder­vorlagen — automatisch durch klare Regeln statt Excel-Listen und Karteikästen.',
          bullets: ['Regel-Editor', 'E-Mail-Trigger', 'Eskalations­ketten']
        },
        {
          icon: 'dashboard',
          title: 'Reporting & Dashboards',
          text: 'Pipeline-Forecasts, Aktivitäts-Heatmaps und Custom-KPIs — direkt aus dem CRM, ohne BI-Aufsatz.',
          bullets: ['Custom-KPIs', 'Aktivitäts-Heatmaps', 'Forecast-Module']
        },
        {
          icon: 'api',
          title: 'Telefonie · E-Mail · Buchhaltung',
          text: 'Ein CRM, das mit Ihren restlichen Systemen spricht — von der Anlage bis zur Rechnung in einem Klick.',
          bullets: ['3CX / Placetel / Sipgate', 'IMAP / SMTP / Exchange', 'Buchhaltungs-Brücke']
        },
        {
          icon: 'wand',
          title: 'Migration aus Standard-CRMs',
          text: 'Salesforce, HubSpot, Pipedrive — wir übernehmen Daten, Historien und Workflows verlustfrei.',
          bullets: ['Mapping-Tool', 'Historien-Übernahme', 'Roll-back-fähig']
        },
        {
          icon: 'shield',
          title: 'Hosting, Backup &amp; Betrieb',
          text: 'EU-Hosting, tägliche Backups, klare SLAs. Wir betreiben Ihr CRM — oder übergeben es bei Bedarf an Ihr Team.',
          bullets: ['EU-Hosting (Frankfurt)', 'Daily Backup', 'SLA-Betreuung']
        }
      ]
    },
    {
      id: 'fintech',
      label: 'FinTech & Finanzanalyse',
      sub: 'Erweiterung',
      services: [
        {
          icon: 'dashboard',
          title: 'Live-Cashflow & Liquidität',
          text: 'Echtzeit-Sicht auf Konten, Forderungen und Liquiditäts­forecast bis 90 Tage. Frühwarnung statt Monatsend-Schock.',
          bullets: ['Live-Bankabgleich (PSD2/FinTS)', 'Forecast-Modell', 'Frühwarn-Alerts']
        },
        {
          icon: 'flow',
          title: 'Forderungs­management',
          text: 'Altersstaffel, automatisches Mahnwesen, Skonto-Steuerung — bevor Liquidität zu lange gebunden ist.',
          bullets: ['4-stufiger Mahnlauf', 'Skonto-Algorithmus', 'DATEV-Export']
        },
        {
          icon: 'ledger',
          title: 'Marge & Kosten­controlling',
          text: 'Kostenstellen, Kostenarten und Soll-Ist live. Anomalie-Erkennung meldet sich, bevor ein Quartal kippt.',
          bullets: ['Live-GuV', 'Kostenstellen­auswertung', 'Anomalie-Erkennung']
        },
        {
          icon: 'api',
          title: 'DATEV · SAP · lexware Anbindung',
          text: 'Bidirektionale Schnittstellen zu den Standards der deutschen Buchhaltung — überwachbar und revisionsfest.',
          bullets: ['DATEV (Online & Pro)', 'SAP B1 / S/4HANA', 'lexware office']
        },
        {
          icon: 'shield',
          title: 'GoBD-konformes Reporting',
          text: 'Revisions­sicheres Archiv ab Werk, vollständiger Audit-Trail, klare Rollen — ohne Audit-Stress.',
          bullets: ['GoBD-konform', 'EU-Hosting', '10-Jahres-Archiv']
        },
        {
          icon: 'wand',
          title: 'Migration aus Standard­software',
          text: 'Sie wollen weg von einer teuren Standard-App? Wir migrieren Daten, Workflows und Anwender — ohne Stillstand.',
          bullets: ['Dual-Run-Phase', 'Daten-Validierung', 'Schulung & Support']
        }
      ]
    }
  ];

  let active: Track['id'] = 'crm';

  $: tiltX = ($pointer.x - 0.5) * 6;
  $: tiltY = ($pointer.y - 0.5) * 6;

  $: currentTrack = tracks.find(t => t.id === active)!;
</script>

<section id="services" use:trackSection={'services'} class="services">
  <div class="container">
    <header class="head" use:reveal>
      <span class="eyebrow">Leistungen</span>
      <h2>Ein Fundament. Eine Erweiterung. Beides handgefertigt.</h2>
      <p class="lead">
        <strong>Unser CRM</strong> ist das Fundament — ein haus­eigen entwickeltes System,
        das wir seit Jahren weiter­bauen. Wer mehr will, setzt unsere
        <strong>Finanzanalyse-Schicht</strong> obendrauf: Bilanz, GuV, Liquidität live.
      </p>
    </header>

    <div class="tabs" use:reveal data-delay="1" role="tablist" aria-label="Leistungsbereiche">
      {#each tracks as t}
        <button
          role="tab"
          id="tab-{t.id}"
          aria-selected={active === t.id}
          aria-controls="panel-{t.id}"
          class:active={active === t.id}
          on:click={() => (active = t.id)}
        >
          <span class="tab-sub">{t.sub}</span>
          <span class="tab-label">{t.label}</span>
        </button>
      {/each}
    </div>

    {#key active}
      <div
        class="grid"
        id="panel-{currentTrack.id}"
        role="tabpanel"
        aria-labelledby="tab-{currentTrack.id}"
        in:fade|local={{ duration: 240 }}
      >
        {#each currentTrack.services as service, i}
          <article
            class="card"
            use:reveal
            data-delay={(i % 4) + 1}
            style="--tx: {tiltX}px; --ty: {tiltY}px;"
          >
            <div class="icon" aria-hidden="true">
              {#if service.icon === 'ledger'}
                <svg viewBox="0 0 32 32" fill="none">
                  <rect x="5" y="5" width="22" height="22" rx="3" stroke="currentColor" stroke-width="1.6" />
                  <path d="M5 11 H27 M10 16 H22 M10 20 H18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                </svg>
              {:else if service.icon === 'flow'}
                <svg viewBox="0 0 32 32" fill="none">
                  <circle cx="7" cy="8" r="3" stroke="currentColor" stroke-width="1.6" />
                  <circle cx="25" cy="16" r="3" stroke="currentColor" stroke-width="1.6" />
                  <circle cx="7" cy="24" r="3" stroke="currentColor" stroke-width="1.6" />
                  <path d="M10 9 L22 15 M10 23 L22 17" stroke="currentColor" stroke-width="1.6" />
                </svg>
              {:else if service.icon === 'api'}
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M9 6 L4 16 L9 26 M23 6 L28 16 L23 26" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M18 8 L14 24" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                </svg>
              {:else if service.icon === 'dashboard'}
                <svg viewBox="0 0 32 32" fill="none">
                  <rect x="5" y="5" width="9" height="12" rx="2" stroke="currentColor" stroke-width="1.6" />
                  <rect x="18" y="5" width="9" height="7" rx="2" stroke="currentColor" stroke-width="1.6" />
                  <rect x="5" y="20" width="9" height="7" rx="2" stroke="currentColor" stroke-width="1.6" />
                  <rect x="18" y="15" width="9" height="12" rx="2" stroke="currentColor" stroke-width="1.6" />
                </svg>
              {:else if service.icon === 'shield'}
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M16 4 L26 8 V16 C26 22 21 26 16 28 C11 26 6 22 6 16 V8 Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
                  <path d="M12 16 L15 19 L21 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              {:else if service.icon === 'users'}
                <svg viewBox="0 0 32 32" fill="none">
                  <circle cx="11" cy="11" r="4" stroke="currentColor" stroke-width="1.6" />
                  <circle cx="22" cy="13" r="3" stroke="currentColor" stroke-width="1.6" />
                  <path d="M4 26 C4 21 7 18 11 18 C15 18 18 21 18 26" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                  <path d="M19 26 C19 22 22 20 25 20 C27 20 28 21 28 22" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                </svg>
              {:else}
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M6 26 L20 12 L26 18 L12 26 Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
                  <path d="M21 6 L24 9 M19 9 L17 7 M26 12 L28 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                  <circle cx="22" cy="14" r="1.4" fill="currentColor" />
                </svg>
              {/if}
            </div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <ul>
              {#each service.bullets as bullet}
                <li>{bullet}</li>
              {/each}
            </ul>
            <span class="card-glow" aria-hidden="true"></span>
          </article>
        {/each}
      </div>
    {/key}
  </div>
</section>

<style>
  .services {
    background: var(--color-bg);
  }

  .head {
    max-width: 740px;
    margin-bottom: 2rem;
  }
  .head .lead {
    font-size: 1.1rem;
    color: var(--color-text-muted);
  }
  .head .lead strong {
    color: var(--color-deep);
    font-weight: 600;
  }

  /* Segmented tabs */
  .tabs {
    display: inline-flex;
    flex-wrap: wrap;
    background: var(--color-bg-2);
    border: 1px solid var(--color-line);
    border-radius: 999px;
    padding: 0.35rem;
    gap: 0.25rem;
    margin-bottom: 2.5rem;
    box-shadow: var(--shadow-sm);
  }
  .tabs button {
    appearance: none;
    border: none;
    background: transparent;
    padding: 0.6rem 1.2rem 0.7rem;
    border-radius: 999px;
    color: var(--color-text-muted);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 1.1;
    transition: background var(--t-med) var(--ease),
      color var(--t-med) var(--ease),
      transform var(--t-fast) var(--ease);
    text-align: left;
  }
  .tabs button:hover {
    color: var(--color-deep);
  }
  .tabs button.active {
    background: var(--color-deep);
    color: var(--color-cloud);
  }
  .tabs button.active .tab-sub {
    color: rgba(255, 255, 255, 0.55);
  }
  .tab-sub {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-text-soft);
    margin-bottom: 0.2rem;
  }
  .tab-label {
    font-family: var(--font-sans);
    font-weight: 500;
    font-size: 0.98rem;
  }

  @media (max-width: 520px) {
    .tabs {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: stretch;
      border-radius: var(--radius);
    }
    .tabs button {
      align-items: center;
      text-align: center;
      border-radius: 999px;
    }
  }

  /* Grid – Karten (gleicher Look wie vorher) */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.1rem;
  }
  @media (max-width: 380px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }

  .card {
    position: relative;
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    border-radius: var(--radius);
    padding: 1.6rem 1.4rem 1.4rem;
    overflow: hidden;
    isolation: isolate;
    transition: transform var(--t-med) var(--ease), box-shadow var(--t-med) var(--ease),
      border-color var(--t-med) var(--ease);
  }
  .card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(29, 63, 54, 0.07), transparent 60%);
    opacity: 0;
    transition: opacity var(--t-med) var(--ease);
    z-index: -1;
  }
  .card:hover {
    transform: translate3d(var(--tx, 0), calc(-4px + var(--ty, 0)), 0);
    box-shadow: var(--shadow);
    border-color: rgba(29, 63, 54, 0.4);
  }
  .card:hover::before {
    opacity: 1;
  }

  .card-glow {
    position: absolute;
    inset: auto -40% -60% auto;
    width: 240px;
    height: 240px;
    background: radial-gradient(circle, rgba(184, 133, 54, 0.20), transparent 70%);
    filter: blur(20px);
    opacity: 0;
    transition: opacity var(--t-med) var(--ease);
    z-index: -1;
  }
  .card:hover .card-glow {
    opacity: 1;
  }

  .icon {
    display: inline-grid;
    place-items: center;
    width: 46px;
    height: 46px;
    border-radius: 12px;
    background: var(--color-foam);
    color: var(--color-tide);
    margin-bottom: 1rem;
    transition: background var(--t-med) var(--ease), color var(--t-med) var(--ease),
      transform var(--t-med) var(--ease);
  }
  .card:hover .icon {
    background: var(--color-deep);
    color: var(--color-sun);
    transform: rotate(-6deg);
  }

  .card p {
    color: var(--color-text-muted);
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  ul li {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--color-tide);
    padding-left: 1.1rem;
    position: relative;
  }
  ul li::before {
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
