export type Locale = 'en' | 'ko'

export const en = {
  meta: {
    skipLink: 'Skip to content',
    languageToggle: 'Switch language',
  },
  hero: {
    title: 'JUNWOO KIM',
    subtitle: 'A career, in a nutshell',
    tagline: 'Full-stack · Rust & TypeScript · from data pipelines to UI',
    cta: 'SCROLL TO LAUNCH',
  },
  launch: {
    label: 'PRE-FLIGHT CHECK',
    title: 'Fueling up: Electronics & Control Engineering',
    body: 'Gyeonggi University of Science and Technology (2017–2023). Low-level programming, control systems, and optimization — the foundation for everything that followed.',
    countdown: '3 · 2 · 1 · LIFTOFF',
  },
  devrel: {
    label: 'CHAPTER 01 — FIRST ORBIT',
    period: '2023.10 – 2023.12',
    title: 'Developer Relations · Kana Labs',
    body: 'Wrote technical docs and SDK samples that cut onboarding time for external developers, and supported partners through SDK integrations.',
  },
  frontend: {
    label: 'CHAPTER 02 — TRADING UI',
    period: '2024.01 – 2024.06',
    title: 'Frontend Developer · Kana Labs',
    body: 'Built web interfaces — leaderboards, live trading UIs, and custom charting — across options, spot, and futures. Led a codebase refactor and integrated a multi-chain Web3 stack (Arbitrum · BSC · Aptos).',
  },
  backend: {
    label: 'CHAPTER 03 — THE GIANT',
    period: '2024.07 – 2026.03',
    title: 'Full-stack Developer — solo backend ownership · Kana Labs',
    pipeline: {
      title: 'The pipeline',
      body: "Owned a data pipeline end to end — ingestion (on-chain indexer) → ETL → read API — live in production. Rust, PostgreSQL, WebSockets, RabbitMQ. (Kana's Aptos perp DEX)",
      stat: '2,000+ events/sec',
      statSub: '~200GB over 3 months',
    },
    bots: {
      title: 'The trading bots',
      body: 'Deployed two automation bots — a market-making bot (Rust) that kept liquidity within <0.05% of mark price (excluding ATR) in production, and a cross-exchange arbitrage bot (Rust/Python) that turned the trading operation net-positive.',
    },
    scale: {
      title: 'Scale',
      body: 'Shipped a mobile-optimized trading frontend that lifted platform adoption by 30%. Supported 20K+ participants and distributed a total of 20K APT through automated reward systems across partners (T Wallet · Factblock · AhnLab).',
    },
  },
  saturn: {
    label: 'CHAPTER 04 — DESTINATION',
    period: '2026.03 – present',
    transit: 'Then, a new mission.',
    title: 'Co-founder & Engineer · Saturn Protocol',
    body: 'A non-custodial covered-call vault on Solana: deposit SOL, earn yield from weekly option premiums — no options expertise required.',
    diagram: ['Deposit SOL', 'Vault writes weekly calls', 'Dutch auction sells options', 'Premiums flow back as yield'],
    moons:
      'Three Anchor programs — vault · options-token · Dutch auction — wired with CPI, fed by Pyth prices and Helius webhooks. Indexer + read API on Hono/PostgreSQL; dApp on Next.js + Solana Wallet Adapter.',
    status: 'Live on Solana devnet · Submitted to Colosseum 2026 · Mainnet pre-flight (audit · KMS · production RPC)',
  },
  landing: {
    label: 'MISSION CONTROL',
    title: 'Landed. Say hello.',
    resumeCta: 'Download resume (PDF)',
  },
}

export type Dictionary = typeof en
