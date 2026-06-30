import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Foco na Zeladoria | Avenida Miguel Yunes, São Paulo',
  description:
    'Serviços de zeladoria para condomínios e residências na Avenida Miguel Yunes, São Paulo. Solicite um orçamento agora.',
  openGraph: {
    title: 'Foco na Zeladoria | Avenida Miguel Yunes',
    description: 'Zeladoria profissional na sua região. Solicite um orçamento.',
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
