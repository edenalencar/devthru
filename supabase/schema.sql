-- Create profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  avatar_url text,
  subscription_tier text check (subscription_tier in ('free', 'pro', 'enterprise', 'business')) default 'free',
  api_key text,
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamp with time zone,
  cancel_at_period_end boolean default false,
  trial_ends_at timestamp with time zone default (now() + interval '7 days'),
  trial_warning_sent_at timestamp with time zone,
  trial_expired_sent_at timestamp with time zone,
  welcome_sent boolean default false,
  newsletter_subscribed boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create generation_history table
create table if not exists public.generation_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  tool_id text not null,
  tool_name text not null,
  input jsonb,
  output jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.generation_history enable row level security;

-- Create policies for profiles
create policy "Users can view own profile."
  on public.profiles for select to authenticated
  using ( auth.uid() = id );

create policy "Users can update own profile."
  on public.profiles for update to authenticated
  using ( auth.uid() = id )
  with check ( auth.uid() = id );

-- RLS filters rows, not columns: billing, trial and API key fields are service role only
revoke all on public.profiles from anon;
revoke insert, update, delete, truncate on public.profiles from authenticated;
grant update (full_name, avatar_url, updated_at) on public.profiles to authenticated;

-- Create policies for generation_history
create policy "Users can view their own history."
  on public.generation_history for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own history."
  on public.generation_history for insert
  with check ( auth.uid() = user_id );

-- Create function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

-- Create trigger for new user signup
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
