import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://junu1229.github.io'),
  title: 'Junwoo Kim — Rust & On-chain Engineer',
  description:
    'Rust engineer specializing in on-chain protocols and trading infrastructure. Co-founder of Saturn Protocol; previously solo backend engineer on a live Aptos perp DEX.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
