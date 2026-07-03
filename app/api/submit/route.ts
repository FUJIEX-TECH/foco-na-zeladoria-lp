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
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;">
        <div style="background:#617A35;padding:6px 0;"></div>
        <div style="padding:32px;">
          <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#617A35;font-weight:600;">Foco na Zeladoria</p>
          <h2 style="margin:0 0 24px;font-size:20px;color:#111827;font-weight:700;">Novo relato recebido</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr style="border-bottom:1px solid #f3f4f6;">
              <td style="padding:12px 0;font-size:13px;color:#6b7280;width:110px;">Nome</td>
              <td style="padding:12px 0;font-size:14px;color:#111827;font-weight:600;">${nome} ${sobrenome}</td>
            </tr>
            <tr style="border-bottom:1px solid #f3f4f6;">
              <td style="padding:12px 0;font-size:13px;color:#6b7280;">E-mail</td>
              <td style="padding:12px 0;font-size:14px;color:#111827;">${email}</td>
            </tr>
            <tr style="border-bottom:1px solid #f3f4f6;">
              <td style="padding:12px 0;font-size:13px;color:#6b7280;">WhatsApp</td>
              <td style="padding:12px 0;font-size:14px;"><a href="https://wa.me/55${ddd}${whatsapp}" style="color:#617A35;font-weight:600;text-decoration:none;">${numeroFormatado}</a></td>
            </tr>
            <tr>
              <td style="padding:12px 0;font-size:13px;color:#6b7280;vertical-align:top;">Mensagem</td>
              <td style="padding:12px 0;font-size:14px;color:#111827;line-height:1.6;">${mensagem?.trim() || '(sem mensagem)'}</td>
            </tr>
          </table>
          <p style="margin:24px 0 0;font-size:12px;color:#9ca3af;">Recebido via foconazeladoria.com.br</p>
        </div>
      </div>
    `,
  })

  if (emailError) {
    // Lead já salvo no banco — apenas logar o erro de e-mail, não retornar 500
    console.error('[Resend]', emailError)
  }

  return NextResponse.json({ success: true })
}
