## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

## Start Stripe

open cmd.exe to run file stripe.exe

```bash
# Step 1:  log in with your Stripe account
stripe login

# Forward events to your webhook
stripe listen --forward-to localhost:3000/api/webhook

```
