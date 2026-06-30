'use client'

import { useRef, useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function LeadForm() {
  const [state, setState] = useState<FormState>('idle')
  const [fields, setFields] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    ddd: '',
    whatsapp: '',
    mensagem: '',
  })
  const [errors, setErrors] = useState<Partial<typeof fields>>({})
  const whatsappRef = useRef<HTMLInputElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  function handleDDDChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 2)
    setFields(prev => ({ ...prev, ddd: raw }))
    if (raw.length === 2) whatsappRef.current?.focus()
  }

  function handleWhatsAppChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 9)
    setFields(prev => ({ ...prev, whatsapp: raw }))
  }

  function validate() {
    const errs: Partial<typeof fields> = {}
    if (!fields.nome.trim()) errs.nome = 'Campo obrigatório'
    if (!fields.sobrenome.trim()) errs.sobrenome = 'Campo obrigatório'
    if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      errs.email = 'E-mail inválido'
    if (!/^\d{2}$/.test(fields.ddd)) errs.ddd = 'DDD inválido'
    if (!/^\d{9}$/.test(fields.whatsapp)) errs.whatsapp = 'Número inválido (9 dígitos)'
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setState('loading')

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error()
      setState('success')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-verde flex items-center justify-center mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 mb-2">Relato recebido!</h3>
        <p className="text-zinc-500">Seu relato foi recebido e será verificado em breve.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Nome / Sobrenome */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Nome" error={errors.nome}>
          <input
            name="nome"
            type="text"
            required
            value={fields.nome}
            onChange={handleChange}
            className="input-base"
            placeholder="Seu nome"
          />
        </Field>
        <Field label="Sobrenome" error={errors.sobrenome}>
          <input
            name="sobrenome"
            type="text"
            required
            value={fields.sobrenome}
            onChange={handleChange}
            className="input-base"
            placeholder="Seu sobrenome"
          />
        </Field>
      </div>

      {/* E-mail */}
      <Field label="E-mail" error={errors.email}>
        <input
          name="email"
          type="email"
          required
          value={fields.email}
          onChange={handleChange}
          className="input-base"
          placeholder="seu@email.com"
        />
      </Field>

      {/* WhatsApp */}
      <fieldset>
        <legend className="block text-zinc-600 text-sm mb-1.5">WhatsApp *</legend>
        <div className="flex gap-3 items-start">
          <div className="w-20">
            <input
              name="ddd"
              type="text"
              inputMode="numeric"
              required
              maxLength={2}
              value={fields.ddd}
              onChange={handleDDDChange}
              className={`input-base text-center ${errors.ddd ? 'border-red-500' : ''}`}
              placeholder="DDD"
              aria-label="DDD"
            />
          </div>
          <div className="flex-1">
            <input
              ref={whatsappRef}
              name="whatsapp"
              type="text"
              inputMode="numeric"
              required
              maxLength={9}
              value={fields.whatsapp}
              onChange={handleWhatsAppChange}
              className={`input-base ${errors.whatsapp ? 'border-red-500' : ''}`}
              placeholder="9 dígitos"
              aria-label="Número do WhatsApp"
            />
          </div>
        </div>
        {(errors.ddd || errors.whatsapp) && (
          <p className="text-red-400 text-xs mt-1.5">{errors.ddd || errors.whatsapp}</p>
        )}
        <p className="text-zinc-400 text-xs mt-1">Número de celular com 9 dígitos</p>
      </fieldset>

      {/* Mensagem */}
      <Field label="Mensagem" optional>
        <textarea
          name="mensagem"
          rows={4}
          value={fields.mensagem}
          onChange={handleChange}
          className="input-base resize-none"
          placeholder="Descreva o problema ou irregularidade..."
        />
      </Field>

      {state === 'error' && (
        <p className="text-red-400 text-sm">
          Ocorreu um erro. Tente novamente ou entre em contato pelo WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full bg-verde text-white font-bold py-4 text-base hover:bg-verde-escuro transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === 'loading' ? 'Enviando...' : 'Enviar relato'}
      </button>
    </form>
  )
}

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string
  error?: string
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-zinc-600 text-sm mb-1.5">
        {label}{optional ? '' : ' *'}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  )
}
