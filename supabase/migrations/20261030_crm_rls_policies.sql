-- Migration: 20261030_crm_rls_policies.sql
-- Description: Habilita Row Level Security (RLS) nas tabelas do CRM nativo e protege os dados contra acesso público não autorizado

-- 1. Habilitar RLS em todas as tabelas do CRM
ALTER TABLE public.crm_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_campaigns ENABLE ROW LEVEL SECURITY;

-- 2. Permitir inserção pública na tabela newsletter_subscribers (apenas INSERT, leitura bloqueada para proteger e-mails)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'newsletter_subscribers' AND policyname = 'Enable insert for everyone'
    ) THEN
        CREATE POLICY "Enable insert for everyone" ON public.newsletter_subscribers 
            FOR INSERT TO public WITH CHECK (true);
    END IF;
END
$$;

