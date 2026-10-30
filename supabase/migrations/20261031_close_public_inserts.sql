-- Migration: 20261031_close_public_inserts.sql
-- Description: Remove inserções públicas em newsletter_subscribers e api_usage.
-- As rotas do app gravam nessas tabelas pelo service role, que não depende dessas políticas.

DROP POLICY IF EXISTS "Enable insert for everyone" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Service role can insert API usage" ON public.api_usage;
