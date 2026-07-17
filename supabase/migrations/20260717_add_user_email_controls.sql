-- Adiciona colunas de controle de e-mail de boas-vindas e assinatura de newsletter na tabela profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS welcome_sent BOOLEAN DEFAULT false;

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS newsletter_subscribed BOOLEAN DEFAULT true;

-- Adiciona índice para otimização da busca da cron de newsletter
CREATE INDEX IF NOT EXISTS idx_profiles_newsletter_subscribed ON public.profiles(newsletter_subscribed);
