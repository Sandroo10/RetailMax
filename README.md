# RetailMax

RetailMax is a Vite + React + TypeScript ecommerce frontend with Supabase integration.
It includes product browsing, authentication, profile editing, cart management, checkout, theme switching, and English/Georgian localization.

Live app: https://retail-max.vercel.app/

## Highlights

- Supabase-backed product and profile data
- Email/password auth (sign in, sign up, sign out)
- Category browsing, search, and max-price filtering
- Product detail pages with add-to-cart actions
- Cart dropdown with quantity controls
- Checkout form with `react-hook-form` + `zod`
- Profile update flow (username + avatar URL)
- Theme switcher (light/dark/system)
- Language switcher (English / Georgian)
- Route-level lazy loading with `React.lazy` + `Suspense`

## Tech Stack

- React + TypeScript (strict mode)
- Vite
- Tailwind CSS + `class-variance-authority` (CVA)
- `react-router-dom`
- TanStack Query
- Radix UI primitives
- `react-hook-form` + `zod`
- Supabase JS
- `i18next` + `react-i18next`

## Project Structure

```text
src/
  assets/              # Images, icons, and barrel exports
  components/
    ui/                # Shared UI primitives
    header/            # Header and controls (cart/theme/language)
    footer/            # Footer
    <feature>/         # Feature components + styles + sections
  contexts/            # User/cart providers
  data/                # Static mappings (for example categories)
  hooks/               # Feature and shared hooks
  layouts/             # Layout shells
  pages/               # Thin route wrappers
  supabase/            # Client + typed data access
  lib/                 # Shared helpers
```

## Development Conventions

- Pages are thin composition wrappers; business logic belongs in components/hooks.
- Component styles are co-located in `*.styles.ts` using CVA.
- Import assets from barrel files instead of raw paths.
- All user-facing strings should use `t("...")` keys.
- Keep translation keys in sync for both `en` and `ka`.
- Use `@/*` path alias for imports from `src/`.

## Prerequisites

- Node.js 18+
- npm 9+

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create `.env` in project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Start development server:

```bash
npm run dev
```

4. Open the URL printed by Vite (commonly `http://localhost:5173`).

## Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Type-check and create production build
- `npm run preview` - Preview production build locally
- `npm run ts-check` - Run TypeScript checks
- `npm run lint` - Run ESLint
- `npm run format` - Run Prettier
- `npm run generate:supabase-types` - Regenerate `public` schema types

## Routing

- `/` - Home
- `/shop` - Product listing
- `/shop/:category` - Category listing
- `/product/:id` - Product details
- `/checkout` - Checkout
- `/profile` - Profile
- `/auth` - Authentication
- `*` - Not found

## Internationalization

- i18n setup lives in `src/i18n.js`.
- Active languages:
  - `en` (English)
  - `ka` (Georgian)
- Header includes a language dropdown for runtime switching.
- When adding UI copy, add keys for both languages in `src/i18n.js`.

## Supabase Notes

This app expects Supabase Auth plus at least:

- `public.product`
- `public.profiles`

Auth session sync is handled by `useAuthSession` and shared through app providers.

## Deployment

Configured for SPA deployment (Vercel). `vercel.json` rewrites all routes to `index.html`.

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```
