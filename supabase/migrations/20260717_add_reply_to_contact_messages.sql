-- Create contact_messages table if it does not exist, and add reply-related columns
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    name text NOT NULL,
    email text NOT NULL,
    subject text NOT NULL,
    message text NOT NULL,
    status text DEFAULT 'pending',
    reply_message text,
    replied_at timestamp with time zone,
    replied_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure the reply-related columns exist in case the table was created previously without them
ALTER TABLE public.contact_messages 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS reply_message text,
ADD COLUMN IF NOT EXISTS replied_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS replied_by uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at DESC);
