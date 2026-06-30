import Image from 'next/image'
import LeadForm from '@/components/LeadForm'
import WhatsAppButton from '@/components/WhatsAppButton'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5511000000000'

export default function Home() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}`

  return (
    <main className="bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/av-miguel-yunes.png"
          alt="Avenida Miguel Yunes, São Paulo"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.65) 100%)' }} />

        {/* Logo + Headline + CTAs — grupo centralizado */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
          <div className="mb-8" style={{ background: 'white', padding: '10px', display: 'inline-flex', boxShadow: '0 4px 20px rgba(0,0,0,0.28)' }}>
            <div style={{ width: 160, height: 160, position: 'relative' }}>
              <Image src="/logo.jpeg" alt="Foco na Zeladoria" fill className="object-contain" priority />
            </div>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', fontWeight: 800, color: 'white', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.25rem', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            Foco na zeladoria<br />da Av. Miguel Yunes
          </h1>

          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.95)', lineHeight: 1.7, maxWidth: '520px', marginBottom: '2.5rem', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
            Viu um problema na região? Buraco, esgoto, iluminação, entulho: reporte aqui. Cada ocorrência é verificada e encaminhada para quem pode resolver.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#formulario" className="bg-verde text-white font-bold px-8 py-4 text-base hover:bg-verde-escuro transition-colors">
              Fazer uma denúncia
            </a>
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 text-base transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.40)', backdropFilter: 'blur(4px)', background: 'rgba(255,255,255,0.08)' }}>
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <a href="#conteudo" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors animate-bounce" aria-label="Ver mais">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9l6 6 6-6" /></svg>
        </a>
      </section>

      {/* ── BENEFÍCIOS ───────────────────────────────────────────────── */}
      <section id="conteudo" className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-verde font-semibold text-sm tracking-widest uppercase mb-3">Como funciona</p>
            <h2 style={{ fontSize: 'clamp(1.25rem, 2.8vw, 2.25rem)', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1rem', whiteSpace: 'nowrap' }}>
              Um canal aberto para a comunidade
            </h2>
            <p className="text-zinc-500 text-lg leading-relaxed">
              A Av. Miguel Yunes é a nossa região. Se tem algo irregular ou precisa de atenção, a gente quer saber.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#617A35" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                ),
                title: 'Reporte irregularidades',
                text: 'Buraco na via, esgoto a céu aberto, entulho, iluminação quebrada. Qualquer problema da região pode ser reportado.',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#617A35" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                ),
                title: 'Mande fotos pelo WhatsApp',
                text: 'A forma mais direta: manda uma mensagem com foto do problema direto no WhatsApp.',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#617A35" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                ),
                title: 'Cada relato é verificado',
                text: 'Cada ocorrência é analisada e encaminhada para quem pode tomar providência. Sem burocracia.',
              },
            ].map((card) => (
              <div key={card.title} className="p-8 border border-zinc-100 hover:border-verde hover:shadow-md transition-all duration-200 group">
                <div className="w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-verde/10 transition-colors" style={{ background: 'rgba(97,122,53,0.08)' }}>
                  {card.icon}
                </div>
                <h3 className="text-zinc-900 font-bold text-lg mb-3 leading-snug">{card.title}</h3>
                <p className="text-zinc-500 text-base leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULÁRIO ───────────────────────────────────────────────── */}
      <section id="formulario" className="py-20 md:py-28 px-6" style={{ background: '#F2F7EA' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Coluna esquerda — copy */}
          <div className="lg:pt-2">
            <p className="text-verde font-semibold text-sm tracking-widest uppercase mb-3">Denúncia</p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
              Reporte um problema na região
            </h2>
            <p className="text-zinc-500 text-lg leading-relaxed mb-10">
              Descreva o que você viu. Cada relato é verificado e encaminhado para quem pode tomar providência.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                'Cobre toda a região da Av. Miguel Yunes',
                'Sem burocracia, sem custo',
                'Canal direto de denúncia',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                    <svg viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#617A35" fillOpacity="0.12" />
                      <path d="M6 10l3 3 5-5" stroke="#617A35" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-zinc-700 text-base">{item}</span>
                </li>
              ))}
            </ul>

            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-verde text-white font-bold px-7 py-4 text-base hover:bg-verde-escuro transition-colors">
              <WhatsAppIcon className="w-5 h-5" />
              Mandar fotos pelo WhatsApp
            </a>
          </div>

          {/* Coluna direita — formulário */}
          <div className="bg-white shadow-sm border border-zinc-100 p-8">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="py-6 px-6 bg-verde text-center">
        <p className="text-white/60 text-sm">
          Desenvolvido por <span className="text-white font-medium">Fujiex Tech</span>
        </p>
      </footer>

      <WhatsAppButton href={waLink} />
    </main>
  )
}

function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
