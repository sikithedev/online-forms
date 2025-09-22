# OnlineForms

**OnlineForms** is a form builder that makes creating and sharing forms simple. Built with **Next.js**, **Prisma**, and **Clerk** authentication, it features drag-and-drop form arrangement using **dnd-kit** and a polished UI with **shadcn/ui** components. The platform includes form statistics and responsive design for all devices.

## Features

- Various input types (text, checkbox, dropdown, etc.).
- Drag-and-drop field arrangement with **dnd-kit**.
- Live form preview before publishing.
- Unique URLs for publishing and sharing.
- Form visit and submission statistics.
- Modern, responsive UI with **shadcn/ui** and **Tailwind CSS**.
- Secure authentication and form ownership with **Clerk**.

## Demo

Try it live at [https://online-forms.vercel.app](https://online-forms.vercel.app)

_Deployed on [Vercel](https://vercel.com/) with [Neon Serverless Postgres](https://neon.com/) database._

## Local Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/sikithedev/online-forms.git

cd online-forms

npm install
```

Create a `.env` file and add the following environment variables:

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# --- use these exact values
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
# ---

# Database
DATABASE_URL=
```

Initialize database schema and run migrations:

```bash
npx prisma migrate dev --name init
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.
