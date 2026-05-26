-- ═══════════════════════════════════════════════════════════════
-- Nexora — PostgreSQL Initialization Script
-- This runs once when the container is first created
-- ═══════════════════════════════════════════════════════════════

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";     -- Trigram similarity for fuzzy search
CREATE EXTENSION IF NOT EXISTS "btree_gin";   -- GIN indexes for composite queries

-- Set default timezone
SET timezone = 'UTC';

-- Log initialization
DO $$
BEGIN
  RAISE NOTICE 'Nexora DB initialized successfully at %', NOW();
END $$;
