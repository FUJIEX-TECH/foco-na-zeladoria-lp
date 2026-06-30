'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled
        ? { background: 'white', borderBottom: '1px solid #e4e4e7' }
        : { background: 'rgba(0,0,0,0.18)', backdropFilter: 'blur(6px)' }
      }
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
        <div style={{ width: 52, height: 52, position: 'relative' }}>
          <Image src="/logo.jpeg" alt="Foco na Zeladoria" fill className="object-contain" priority />
        </div>
        <a
          href="#formulario"
          className="text-sm font-bold px-5 py-2.5 transition-colors"
          style={scrolled
            ? { background: '#617A35', color: 'white' }
            : { background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.35)' }
          }
        >
          Solicitar orçamento
        </a>
      </div>
    </header>
  )
}
