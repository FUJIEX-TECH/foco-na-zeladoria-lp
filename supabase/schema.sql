-- Tabela de leads da LP Foco na Zeladoria
-- Rodar no SQL Editor do Supabase

CREATE TABLE IF NOT EXISTS leads (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  nome        TEXT        NOT NULL,
  sobrenome   TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  ddd         CHAR(2)     NOT NULL,
  whatsapp    CHAR(9)     NOT NULL,
  mensagem    TEXT        NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Apenas a service role key pode inserir (chamada server-side via API route)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service role insert" ON leads
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "service role select" ON leads
  FOR SELECT
  TO service_role
  USING (true);
