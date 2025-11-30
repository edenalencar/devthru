import { createBrowserClient } from '@supabase/ssr'

export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string
                    full_name: string | null
                    avatar_url: string | null
                    subscription_tier: 'free' | 'pro' | 'enterprise'
                    api_key: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    full_name?: string | null
                    avatar_url?: string | null
                    subscription_tier?: 'free' | 'pro' | 'enterprise'
                    api_key?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    full_name?: string | null
                    avatar_url?: string | null
                    subscription_tier?: 'free' | 'pro' | 'enterprise'
                    api_key?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            api_keys: {
                Row: {
                    id: string
                    user_id: string
                    name: string
                    key_prefix: string
                    key_hash: string
                    created_at: string
                    last_used_at: string | null
                    revoked_at: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    name: string
                    key_prefix: string
                    key_hash: string
                    created_at?: string
                    last_used_at?: string | null
                    revoked_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    name?: string
                    key_prefix?: string
                    key_hash?: string
                    created_at?: string
                    last_used_at?: string | null
                    revoked_at?: string | null
                }
            }
            generation_history: {
                Row: {
                    id: string
                    user_id: string
                    tool_id: string
                    tool_name: string
                    input: any
                    output: any
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    tool_id: string
                    tool_name: string
                    input: any
                    output: any
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    tool_id?: string
                    tool_name?: string
                    input?: any
                    output?: any
                    created_at?: string
                }
            }
            subscriptions: {
                Row: {
                    id: string
                    user_id: string
                    stripe_customer_id: string
                    stripe_subscription_id: string
                    plan_id: string
                    status: string
                    current_period_end: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    stripe_customer_id: string
                    stripe_subscription_id: string
                    plan_id: string
                    status: string
                    current_period_end: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    stripe_customer_id?: string
                    stripe_subscription_id?: string
                    plan_id?: string
                    status?: string
                    current_period_end?: string
                    created_at?: string
                    updated_at?: string
                }
            }
            user_configurations: {
                Row: {
                    id: string
                    user_id: string
                    tool_id: string
                    name: string
                    configuration: any
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    tool_id: string
                    name: string
                    configuration: any
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    tool_id?: string
                    name?: string
                    configuration?: any
                    created_at?: string
                }
            }
        }
    }
}

export const createClient = () =>
    createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
