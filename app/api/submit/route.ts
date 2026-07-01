import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const resend = new Resend(process.env.RESEND_API_KEY)
  const body = await req.json()
  const { nome, sobrenome, email, ddd, whatsapp, mensagem } = body

  // Validação server-side
  if (!nome?.trim() || !sobrenome?.trim() || !email?.trim() || !ddd || !whatsapp) {
    return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 })
  }
  if (!/^\d{2}$/.test(ddd)) {
    return NextResponse.json({ error: 'DDD inválido.' }, { status: 400 })
  }
  if (!/^\d{9}$/.test(whatsapp)) {
    return NextResponse.json({ error: 'Número de WhatsApp inválido.' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 })
  }

  // Salvar no Supabase
  const { error: dbError } = await supabase.from('leads').insert([
    { nome: nome.trim(), sobrenome: sobrenome.trim(), email: email.trim(), ddd, whatsapp, mensagem: mensagem?.trim() ?? '' },
  ])

  if (dbError) {
    console.error('[Supabase]', dbError)
    return NextResponse.json({ error: 'Erro ao salvar lead.' }, { status: 500 })
  }

  // Enviar e-mail de notificação
  const numeroFormatado = `(${ddd}) ${whatsapp.slice(0, 5)}-${whatsapp.slice(5)}`
  const { error: emailError } = await resend.emails.send({
    from: 'Foco na Zeladoria <onboarding@resend.dev>',
    to: [process.env.NOTIFICATION_EMAIL!],
    subject: `Novo relato: ${nome} ${sobrenome}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#0f0f0f;color:#fafafa;padding:32px;border-radius:8px;">
        <div style="background:#617A35;padding:4px 0;margin-bottom:24px;"></div>
        <h2 style="margin:0 0 24px;font-size:20px;">Novo lead — Foco na Zeladoria</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#aaa;width:120px;">Nome</td><td style="padding:8px 0;">${nome} ${sobrenome}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;">E-mail</td><td style="padding:8px 0;">${email}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;">WhatsApp</td><td style="padding:8px 0;">${numeroFormatado}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa;vertical-align:top;">Mensagem</td><td style="padding:8px 0;">${mensagem?.trim() || '(sem mensagem)'}</td></tr>
        </table>
        <p style="margin:24px 0 0;color:#666;font-size:12px;">Recebido via foconazeladoria.com.br</p>
      </div>
    `,
  })

  if (emailError) {
    // Lead já salvo no banco — apenas logar o erro de e-mail, não retornar 500
    console.error('[Resend]', emailError)
  }

  return NextResponse.json({ success: true })
}
