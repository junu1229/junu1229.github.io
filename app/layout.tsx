import type { Metadata } from 'next'
import { Baloo_2, JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const baloo = Baloo_2({ subsets: ['latin'], weight: ['600', '800'], variable: '--font-baloo' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-mono' })
const pretendard = localFont({
  src: '../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://junu1229.github.io'),
  title: 'Junwoo Kim — Rust & On-chain Engineer',
  description:
    'Rust engineer specializing in on-chain protocols and trading infrastructure. Co-founder of Saturn Protocol; previously full-stack developer with solo backend ownership on a live Aptos perp DEX.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${baloo.variable} ${mono.variable} ${pretendard.variable}`}>
      <body>{children}</body>
    </html>
  )
}
