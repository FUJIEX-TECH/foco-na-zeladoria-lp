'use client'

type Lead = {
  id: string
  nome: string
  sobrenome: string
  email: string
  ddd: string
  whatsapp: string
  mensagem: string
  created_at: string
}

export default function AdminExportButton({ leads }: { leads: Lead[] }) {
  function exportCSV() {
    const headers = ['Nome', 'Sobrenome', 'E-mail', 'DDD', 'WhatsApp', 'Mensagem', 'Data']
    const rows = leads.map(l => [
      l.nome,
      l.sobrenome,
      l.email,
      l.ddd,
      l.whatsapp,
      l.mensagem || '',
      new Date(l.created_at).toLocaleString('pt-BR'),
    ])

    const csv = [headers, ...rows]
      .map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `leads-foco-na-zeladoria-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={exportCSV}
      className="text-sm font-medium text-verde hover:text-verde-escuro transition-colors px-4 py-2 border border-verde hover:border-verde-escuro"
    >
      Exportar CSV
    </button>
  )
}
