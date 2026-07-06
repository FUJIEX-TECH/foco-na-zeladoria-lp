import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Foco na Zeladoria | Avenida Miguel Yunes, São Paulo',
  description:
    'Canal de denúncias e relatos de irregularidades na Avenida Miguel Yunes, São Paulo. Envie sua reclamação.',
  openGraph: {
    title: 'Foco na Zeladoria | Avenida Miguel Yunes',
    description: 'Canal de denúncias de irregularidades na Av. Miguel Yunes. Envie seu relato.',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
