-- Add chart_data column to store structured chart configurations
ALTER TABLE public.posts 
ADD COLUMN chart_data jsonb DEFAULT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.posts.chart_data IS 'JSON array of chart configurations. Each chart has: type (bar, line, pie), title, subtitle, data[], xKey, yKey, colors';