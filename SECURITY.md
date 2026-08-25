# Security Policy

## Supply Chain Security

- **Minimum Release Age**: 7 days enforced via `.npmrc` (`minimum-release-age=604800000`)
- **Lockfile Integrity**: `pnpm-lock.yaml` is committed and verified in CI
- **Dependency Audits**: Automated via OSV Scanner + npm audit on every PR

## Secrets Management

- All secrets stored in GitHub Secrets / Vercel Environment Variables
- Gitleaks scans every commit for leaked credentials
- `.env.local` is gitignored — never commit secrets

## Authentication

- Better Auth (open-source) with HTTP-only secure cookies
- Sessions expire after 24h, refresh every 1h
- MFA recommended for all admin accounts

## Infrastructure

- Cloudflare WAF + DDoS protection on all endpoints
- Neon PostgreSQL with Row Level Security (RLS)
- All API routes rate-limited via middleware

## Reporting Vulnerabilities

Email: nejamulhaque.works@gmail.com
Expected response time: 48 hours
