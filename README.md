# Production-API

A small, production-ready API template that uses Neon (Postgres) for the database, Arcjet for security and bot protection, and Warp for local developer productivity.

## Key technologies

- Database: Neon (Postgres) — https://neon.com/
- Security & bot protection: Arcjet — https://arcjet.com/
- Developer tooling / terminal: Warp — https://www.warp.dev/

## Features

- Postgres database hosted on Neon
- Rate limiting, bot detection, email validation, and data redaction via Arcjet
- Fast developer workflows with Warp

## Folder structure

middleware > functions that run before or after some other functions app dose logging functions authentication verification.

models > database scheemas

dev deps
npm install --save-dev eslint @eslint/js prettier eslint-config-prettier eslint-plugin-prettier


X npm install @neondatabase/serverless drizzle-orm
X npm install --save-dev drizzle-kit

- Generate Scheemas
npm run db:generate
- Maigrate / Push to neon
npm run db:migrate