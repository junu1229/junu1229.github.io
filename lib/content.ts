export const LINKS = {
  github: 'https://github.com/junu1229',
  linkedin: 'https://www.linkedin.com/in/junwoooooo-kim/',
  email: 'mailto:junu1229@gmail.com',
  resume: '/Junwoo_Kim_Resume.pdf',
} as const

export const SKILL_GROUPS = [
  { name: 'Languages', items: ['Rust', 'TypeScript', 'Python'] },
  { name: 'Backend & Infra', items: ['Node.js', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker'] },
  { name: 'Frontend', items: ['Next.js', 'React', 'TradingView', 'Solana Wallet Adapter'] },
  { name: 'Blockchain', items: ['Solana', 'Aptos', 'Anchor'] },
  {
    name: 'Trading Systems',
    items: ['market-making bots', 'cross-exchange arbitrage', 'options vaults', 'perps flows', 'on-chain indexers'],
  },
] as const
