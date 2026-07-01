'use client'

import { useRouter } from 'next/navigation'

export default function AdminLogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-zinc-500 hover:text-zinc-800 transition-colors px-4 py-2 border border-zinc-200 hover:border-zinc-400"
    >
      Sair
    </button>
  )
}
