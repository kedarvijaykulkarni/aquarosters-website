// Pure CORS helpers for the submit-public-form Edge Function. Framework-free
// so they can be unit tested under `node --test` — see cors.test.ts.

export function parseAllowedOrigins(raw: string | undefined | null): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function resolveAllowedOrigin(origin: string | null, allowedOrigins: string[]): string | null {
  if (!origin) return null;
  return allowedOrigins.includes(origin) ? origin : null;
}

export function buildCorsHeaders(allowedOrigin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
  if (allowedOrigin) {
    headers["Access-Control-Allow-Origin"] = allowedOrigin;
  }
  return headers;
}
