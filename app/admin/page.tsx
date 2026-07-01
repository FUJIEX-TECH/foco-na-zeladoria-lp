import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import AdminLogoutButton from '@/components/AdminLogoutButton'
import AdminExportButton from '@/components/AdminExportButton'

export const dynamic = 'force-dynamic'

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

async function getLeads(): Promise<Lead[]> {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export default async function AdminPage() {
  const leads = await getLeads()

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div style={{ width: 40, height: 40, position: 'relative' }}>
              <Image src="/logo.svg" alt="Foco na Zeladoria" fill className="object-contain" />
            </div>
            <div>
              <h1 className="text-base font-bold text-zinc-900">Painel Admin</h1>
              <p className="text-zinc-400 text-xs">{leads.length} relato{leads.length !== 1 ? 's' : ''} recebido{leads.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {leads.length > 0 && <AdminExportButton leads={leads} />}
            <AdminLogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {leads.length === 0 ? (
          <div className="text-center py-24 text-zinc-400">
            <p className="text-lg">Nenhum relato recebido ainda.</p>
          </div>
        ) : (
          <div className="bg-white border border-zinc-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-zinc-50 border-b border-zinc-200">
                  <tr>
                    <th className="text-left px-5 py-3 text-zinc-500 font-medium">Nome</th>
                    <th className="text-left px-5 py-3 text-zinc-500 font-medium">E-mail</th>
                    <th className="text-left px-5 py-3 text-zinc-500 font-medium">WhatsApp</th>
                    <th className="text-left px-5 py-3 text-zinc-500 font-medium">Mensagem</th>
                    <th className="text-left px-5 py-3 text-zinc-500 font-medium whitespace-nowrap">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="px-5 py-4 font-medium text-zinc-900 whitespace-nowrap">
                        {lead.nome} {lead.sobrenome}
                      </td>
                      <td className="px-5 py-4 text-zinc-600">{lead.email}</td>
                      <td className="px-5 py-4 text-zinc-600 whitespace-nowrap">
                        ({lead.ddd}) {lead.whatsapp.slice(0, 5)}-{lead.whatsapp.slice(5)}
                      </td>
                      <td className="px-5 py-4 text-zinc-500 max-w-xs">
                        <span className="line-clamp-2">{lead.mensagem || '—'}</span>
                      </td>
                      <td className="px-5 py-4 text-zinc-400 whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleString('pt-BR', {
                          day: '2-digit', month: '2-digit', year: 'numeric',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
