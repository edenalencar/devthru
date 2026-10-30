-- Migration: 20261030_crm_initial_setup.sql
-- Description: Cria tabelas e colunas para o CRM nativo do DevThru (Deals, Newsletter Subscribers, Campanhas e Controles de Trial)

-- 1. Tabela crm_deals (Pipeline Comercial e Gestão de Patrocínios B2B)
CREATE TABLE IF NOT EXISTS public.crm_deals (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    contact_message_id uuid REFERENCES public.contact_messages(id) ON DELETE SET NULL,
    company_name text NOT NULL,
    contact_name text NOT NULL,
    contact_email text NOT NULL,
    contact_website text,
    ad_format text DEFAULT 'banner-ferramentas',
    deal_stage text DEFAULT 'lead' CHECK (deal_stage IN ('lead', 'proposal_sent', 'negotiating', 'won', 'lost')),
    deal_value numeric(10, 2) DEFAULT 0,
    notes text,
    start_date date,
    end_date date,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para crm_deals
CREATE INDEX IF NOT EXISTS idx_crm_deals_stage ON public.crm_deals(deal_stage);
CREATE INDEX IF NOT EXISTS idx_crm_deals_created_at ON public.crm_deals(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crm_deals_contact_email ON public.crm_deals(contact_email);

-- 2. Tabela newsletter_subscribers (Captura Pública de Audiência sem dependência de login)
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email text UNIQUE NOT NULL,
    source text DEFAULT 'website',
    active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    unsubscribed_at timestamp with time zone
);

-- Índices para newsletter_subscribers
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_active ON public.newsletter_subscribers(active);

-- 3. Tabela crm_campaigns (Histórico de Disparos e Broadcasts da Audiência)
CREATE TABLE IF NOT EXISTS public.crm_campaigns (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    subject text NOT NULL,
    target_segment text NOT NULL CHECK (target_segment IN ('all_newsletter', 'pro_users', 'free_users', 'expired_trials', 'business_users')),
    content text NOT NULL,
    sent_count integer DEFAULT 0 NOT NULL,
    status text DEFAULT 'draft' CHECK (status IN ('draft', 'sending', 'sent', 'failed')),
    sent_at timestamp with time zone,
    created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para crm_campaigns
CREATE INDEX IF NOT EXISTS idx_crm_campaigns_created_at ON public.crm_campaigns(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crm_campaigns_status ON public.crm_campaigns(status);

-- 4. Adicionar colunas de controle de idempotência do ciclo de vida de trial na tabela profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS trial_warning_sent_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS trial_expired_sent_at timestamp with time zone;

