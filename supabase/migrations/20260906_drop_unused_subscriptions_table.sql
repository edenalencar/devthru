-- Drop obsolete and unused subscriptions table
-- Subscription management is fully handled within public.profiles columns (subscription_tier, stripe_customer_id, stripe_subscription_id, etc.)
DROP TABLE IF EXISTS public.subscriptions CASCADE;
