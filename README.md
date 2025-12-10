# 🍔 DevThru

A modern, fast, and secure developer toolkit. DevThru: Quick data for the road. Providing essential utilities for Brazilian document validation, data generation, and more.

## ✨ Features

### 📄 Document Validators & Generators
- **CPF** - Brazilian individual taxpayer registry validation and generation
- **CNPJ** - Brazilian company registry validation and generation
- **RG** - Brazilian identity card validation and generation
- **CNH** - Brazilian driver's license validation and generation

### 👤 Personal Data Generators
- **Names** - Generate realistic Brazilian names
- **Emails** - Create valid email addresses
- **Phone Numbers** - Generate Brazilian phone numbers
- **Addresses** - Generate complete Brazilian addresses

### 🔧 Utility Tools
- **UUID Generator** - Generate unique identifiers (v4)
- **Password Generator** - Create secure passwords with customizable options
- **Hash Generator** - Generate MD5, SHA-1, SHA-256, SHA-512 hashes
- **Base64 Encoder/Decoder** - Encode and decode Base64 strings
- **QR Code Generator** - Create QR codes from text
- **Lorem Ipsum Generator** - Generate placeholder text
- **JSON Formatter** - Format and validate JSON data

### 📊 Export Options
- Export generated data in **CSV**, **JSON**, or **Excel** formats
- Bulk generation capabilities for all tools

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI primitives
- **Authentication:** Supabase Auth
- **Database:** Supabase (PostgreSQL)
- **Payments:** Stripe integration
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

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run database migrations**

Execute the SQL schema located in `supabase/schema.sql` in your Supabase project.

5. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
devhubtools/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── settings/          # User settings
│   └── tools/             # Tool pages
│       ├── documents/     # Document validators
│       ├── personal/      # Personal data generators
│       └── utilities/     # Utility tools
├── components/            # React components
│   ├── tools/            # Tool-specific components
│   └── ui/               # Reusable UI components
├── lib/                   # Utility functions
│   ├── supabase/         # Supabase client & helpers
│   └── utils/            # Generators & validators
├── config/               # App configuration
└── public/               # Static assets
```

## 🔐 Authentication

The application uses Supabase Authentication with support for:
- Email/Password authentication
- Session management
- Protected routes via middleware

## 💳 Subscription & Payments

- Integrated with Stripe for subscription management
- Free tier with limited features
- Premium tier with unlimited access
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
