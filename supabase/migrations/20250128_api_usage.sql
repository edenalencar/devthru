-- API Usage Tracking Table
CREATE TABLE IF NOT EXISTS public.api_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  api_key_id UUID,
  tool_id TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  response_time_ms INTEGER,
  status_code INTEGER
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_api_usage_user_id ON public.api_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_created_at ON public.api_usage(created_at);
CREATE INDEX IF NOT EXISTS idx_api_usage_tool_id ON public.api_usage(tool_id);

-- Enable RLS
ALTER TABLE public.api_usage ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own usage
CREATE POLICY "Users can view own API usage"
  ON public.api_usage
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Service role can insert usage records
CREATE POLICY "Service role can insert API usage"
  ON public.api_usage
  FOR INSERT
  WITH CHECK (true);

COMMENT ON TABLE public.api_usage IS 'Tracks API usage for rate limiting and analytics';
