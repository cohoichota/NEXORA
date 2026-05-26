// ═══════════════════════════════════════════════════════════════
// Nexora — Shared Utility Functions
// ═══════════════════════════════════════════════════════════════

import crypto from 'crypto';

// ── String Utilities ──────────────────────────────────────────

/**
 * Generate a URL-friendly slug from a string
 * @example slugify('Hello World!') → 'hello-world'
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate a string to a max length with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

/**
 * Capitalize the first letter of a string
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// ── Number Utilities ──────────────────────────────────────────

/**
 * Format a number as currency
 * @example formatCurrency(1999.99, 'USD') → '$1,999.99'
 */
export function formatCurrency(amount: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Round to a specific number of decimal places
 */
export function round(value: number, decimals = 2): number {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

// ── Date Utilities ────────────────────────────────────────────

/**
 * Format a date for display
 * @example formatDate(new Date(), 'long') → 'January 1, 2025'
 */
export function formatDate(
  date: Date | string,
  style: 'short' | 'medium' | 'long' = 'medium',
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = {
    short: { month: 'numeric', day: 'numeric', year: '2-digit' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric' },
  }[style] as Intl.DateTimeFormatOptions;
  return new Intl.DateTimeFormat('en-US', options).format(d);
}

/**
 * Get relative time string
 * @example timeAgo(new Date(Date.now() - 60000)) → '1 minute ago'
 */
export function timeAgo(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const diff = d.getTime() - Date.now();
  const absDiff = Math.abs(diff);

  if (absDiff < 60000) return rtf.format(Math.round(diff / 1000), 'second');
  if (absDiff < 3600000) return rtf.format(Math.round(diff / 60000), 'minute');
  if (absDiff < 86400000) return rtf.format(Math.round(diff / 3600000), 'hour');
  if (absDiff < 2592000000) return rtf.format(Math.round(diff / 86400000), 'day');
  return rtf.format(Math.round(diff / 2592000000), 'month');
}

/**
 * Add seconds to a date
 */
export function addSeconds(date: Date, seconds: number): Date {
  return new Date(date.getTime() + seconds * 1000);
}

// ── ID Utilities ──────────────────────────────────────────────

/**
 * Generate a UUID v4
 */
export function generateUUID(): string {
  return crypto.randomUUID();
}

/**
 * Generate an idempotency key (UUID based)
 */
export function generateIdempotencyKey(prefix = ''): string {
  const uuid = generateUUID();
  return prefix ? `${prefix}_${uuid}` : uuid;
}

// ── Pagination Utilities ──────────────────────────────────────

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationResult {
  skip: number;
  take: number;
  page: number;
  limit: number;
}

/**
 * Calculate pagination params from page/limit
 */
export function paginate(params: PaginationParams): PaginationResult {
  const page = Math.max(1, params.page ?? 1);
  const limit = Math.min(100, Math.max(1, params.limit ?? 20));
  const skip = (page - 1) * limit;
  return { skip, take: limit, page, limit };
}

/**
 * Build pagination metadata
 */
export function buildPaginationMeta(total: number, page: number, limit: number) {
  const totalPages = Math.ceil(total / limit);
  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

// ── Validation Utilities ──────────────────────────────────────

/**
 * Validate an email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate a phone number (E.164 format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
}

// ── Object Utilities ──────────────────────────────────────────

/**
 * Remove undefined/null values from an object (shallow)
 */
export function removeNullish<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined),
  ) as Partial<T>;
}

/**
 * Pick specific keys from an object
 */
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce(
    (acc, key) => {
      if (key in (obj as object)) acc[key] = obj[key];
      return acc;
    },
    {} as Pick<T, K>,
  );
}

/**
 * Omit specific keys from an object
 */
export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
}

// ── Error Utilities ───────────────────────────────────────────

/**
 * Safe JSON parse — returns null instead of throwing
 */
export function safeJsonParse<T = unknown>(json: string): T | null {
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

/**
 * Sleep for a given number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelayMs = 1000,
): Promise<T> {
  let lastError: Error;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await sleep(baseDelayMs * Math.pow(2, i));
      }
    }
  }
  throw lastError!;
}
