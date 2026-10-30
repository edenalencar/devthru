-- Migration: 20261031_harden_profiles_access.sql
-- Description: Fecha a leitura pública de profiles e restringe o que o usuário final pode gravar.
-- Plano, trial, Stripe, API key e flags de e-mail passam a ser alterados apenas pelo service role.
-- Requer em produção a versão do app em que lib/api/middleware.ts e lib/api/keys.ts usam createAdminClient.

-- 1. Cada usuário lê somente o próprio perfil
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile." ON public.profiles;
CREATE POLICY "Users can view own profile." ON public.profiles
    FOR SELECT TO authenticated
    USING (auth.uid() = id);

-- 2. O perfil é criado pelo trigger handle_new_user, sem insert direto pelo cliente
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;

-- 3. Update restrito à própria linha
DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;
CREATE POLICY "Users can update own profile." ON public.profiles
    FOR UPDATE TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 4. Privilégios por coluna: RLS filtra linhas, não colunas
REVOKE ALL ON public.profiles FROM anon;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.profiles FROM authenticated;
GRANT UPDATE (full_name, avatar_url, updated_at) ON public.profiles TO authenticated;
