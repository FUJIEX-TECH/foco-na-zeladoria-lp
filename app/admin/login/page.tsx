'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Senha incorreta.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div style={{ width: 80, height: 80, position: 'relative' }} className="mb-4">
            <Image src="/logo.svg" alt="Foco na Zeladoria" fill className="object-contain" />
          </div>
          <h1 className="text-xl font-bold text-zinc-900">Painel Admin</h1>
          <p className="text-zinc-400 text-sm mt-1">Foco na Zeladoria</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-zinc-200 p-8 space-y-5">
          <div>
            <label className="block text-sm text-zinc-600 mb-1.5">Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="input-base"
              placeholder="••••••••"
              required
              autoFocus
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-verde text-white font-bold py-3 text-sm hover:bg-verde-escuro transition-colors disabled:opacity-60"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
