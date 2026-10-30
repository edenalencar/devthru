# 🍔 DevThru

A modern, fast, and secure developer toolkit. DevThru: Quick data for the road. Providing essential utilities for Brazilian document validation, data generation, and more.

## ✨ Features

- **71 tools in 10 categories** (`automotive`, `business`, `converters`, `development`, `documents`, `finance`, `image`, `personal`, `text`, `utilities`), cataloged in `config/tools.ts`
- **Brazilian data focus**: CPF, CNPJ, NF-e/CT-e/MDF-e, boleto, Pix, CNAB, vehicle documents and test data
- **Bulk generation and export** to CSV, JSON, Excel and SQL on paid plans
- **REST API** (`/api/v1/generate`, `/api/v1/validate`, `/api/v1/usage`) on the Business plan
- **Blog and programmatic guides** for SEO
- **Native CRM** at `/admin` for sponsorship deals, users, campaigns, messages and feedback

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI primitives
- **Authentication:** Supabase Auth
- **Database:** Supabase (PostgreSQL)
- **Payments:** Stripe integration
- **Email:** Resend + React Email
- **State Management:** Zustand
- **Form Handling:** React Hook Form + Zod validation

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account
- Stripe account (for payment features)

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/edenalencar/devhubtools.git
cd devhubtools
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PRICE_ID_PRO=your_pro_price_id
NEXT_PUBLIC_STRIPE_PRICE_ID_BUSINESS=your_business_price_id

# Email
RESEND_API_KEY=your_resend_api_key
MAIL_FROM=contato@your-domain.com
RESEND_WEBHOOK_SECRET=your_resend_webhook_secret
UNSUBSCRIBE_SECRET=random_string_used_to_sign_unsubscribe_links

# Security
CRON_SECRET=random_string_used_by_vercel_cron
ADMIN_EMAILS=admin@your-domain.com
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GTM_ID=your_gtm_id
INDEXNOW_KEY=your_indexnow_key
```

4. **Run database migrations**

Execute `supabase/schema.sql` and then the files in `supabase/migrations/` in your Supabase project.

5. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
devhubtools/
├── app/                    # Next.js app directory
│   ├── admin/             # CRM and admin area
│   ├── api/               # API routes
│   ├── blog/              # Blog
│   ├── dashboard/         # Logged-in user area
│   ├── guides/            # Programmatic SEO guides
│   └── tools/             # Tool pages, one folder per category
├── components/            # React components
│   ├── emails/           # React Email templates
│   ├── tools/            # Tool-specific components
│   └── ui/               # Reusable UI components
├── config/               # Site and tool catalog
├── docs/specs/           # Tool specs, mirroring app/tools
├── lib/                   # Business logic
│   ├── api/              # Public API auth, rate limit and generators
│   ├── content/          # Blog posts and programmatic content
│   ├── supabase/         # Supabase clients
│   └── utils/            # Generators & validators
├── public/               # Static assets
└── supabase/             # Schema and migrations
```

## 🔐 Authentication

The application uses Supabase Authentication with support for:
- Email/Password authentication
- Session management
- Protected routes via `proxy.ts`
- Admin access restricted to `ADMIN_EMAILS`

## 💳 Subscription & Payments

- Integrated with Stripe for subscription management
- Free tier with limited features, plus a 7-day Pro trial for new accounts
- Pro (R$ 29) and Business (R$ 99) tiers, with API access on Business
- Webhook handling for subscription events

## 📝 License

This project is private and proprietary.

## 👨‍💻 Author

**Eden Alencar**
- GitHub: [@edenalencar](https://github.com/edenalencar)

## 🤝 Contributing

This is a private project. Contributions are currently not accepted.

## 📞 Support

For support, please contact the repository owner.

---

Built with ❤️ using Next.js and modern web technologies.
