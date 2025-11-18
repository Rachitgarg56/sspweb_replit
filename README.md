# Sri Sringeri Sharada Peetham Website

Next.js implementation of the SSP main website - works seamlessly on both Replit and localhost!

## 🚀 Quick Start

### Running on Replit

**No setup needed!** The project automatically detects Replit and configures itself:
- Runs on port 5000 using `npm run dev:replit`
- Auto-detects environment via `REPL_ID`
- Uses your configured Replit Secrets

Just click "Run" and you're good to go! The workflow is pre-configured to use the correct command.

### Running Locally

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   Create `.env.local` file:
   ```bash
   cp .env.local.example .env.local
   ```

   **IMPORTANT:** Edit `.env.local` and set:
   ```
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

   Also add your Firebase and Typesense credentials.

3. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Required Environment Variables

### For Local Development

Create a `.env.local` file with:

```env
# Base URL (REQUIRED)
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Firebase (REQUIRED)
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Typesense (REQUIRED)
TYPESENSE_API_KEY=your_key
TYPESENSE_HOST=your_host

# CRON
CRON_SECRET=your_secret
```

### For Replit

All environment variables are stored in **Replit Secrets**. The `NEXT_PUBLIC_BASE_URL` is automatically detected - no manual configuration needed!

## 🔧 How It Works

### Automatic Environment Detection

The project intelligently detects whether it's running on Replit or localhost:

**On Replit:**
- Detects via `REPL_ID` environment variable
- Uses `http://127.0.0.1:5000` for server-side API calls
- Client-side uses relative URLs

**Locally:**
- Uses `NEXT_PUBLIC_BASE_URL` from `.env.local`
- Defaults to `http://localhost:3000` for server-side API calls
- Client-side uses relative URLs

### API URL Resolution

From `config/api.ts`:

| Context | Replit | Local |
|---------|--------|-------|
| Server-side | `http://127.0.0.1:5000/api/` | `http://localhost:3000/api/` |
| Client-side | `/api/` | `/api/` |

This ensures API calls work correctly in both environments without code changes!

## 🛠️ Troubleshooting

### "ECONNREFUSED" Error

**Problem:** API calls failing with connection refused error.

**Solution:**
1. Verify `.env.local` exists (local only)
2. Check `NEXT_PUBLIC_BASE_URL` is set correctly
3. Ensure port matches your dev server (3000 locally, 5000 on Replit)
4. Restart the development server

### Changes Not Reflecting

1. Hard refresh your browser (Ctrl+Shift+R / Cmd+Shift+R)
2. Clear Next.js cache: `rm -rf .next`
3. Restart the development server

### Environment Variables Not Loading

**Local:**
- File must be named `.env.local` (not `.env`)
- Must be in project root
- Restart dev server after changes

**Replit:**
- Check Replit Secrets panel
- Secrets are automatically available

## 📁 Project Structure

```
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   ├── components/          # React components
│   └── [routes]/           # Page routes
├── config/
│   └── api.ts              # Smart API configuration
├── utils/                   # Helper functions
├── public/                  # Static assets
├── .env.local.example      # Environment template
├── package.json            # NPM scripts
└── README.md               # This file
```

## 📦 NPM Scripts

- `npm run dev` - Start local development server on **port 3000**
- `npm run dev:replit` - Start Replit development server on **port 5000** (used by Replit workflow)
- `npm run build` - Build for production
- `npm run start` - Start production server (default port)
- `npm run start:replit` - Start production server on port 5000 (for Replit)
- `npm run lint` - Run ESLint

## 🔑 Key Features

- ✅ **Environment Agnostic:** Works on Replit and localhost without code changes
- ✅ **Automatic Detection:** No manual configuration for Replit
- ✅ **Smart API Routing:** Server/client-side URLs handled automatically
- ✅ **Type Safe:** Full TypeScript support
- ✅ **Modern Stack:** Next.js 15, Tailwind CSS, Material-UI

## 🚢 Deployment

The app is configured to run on:
- **Development (Replit):** Port 5000
- **Development (Local):** Port 3000
- **Production:** Configure via deployment platform

## 📝 Development Notes

### Making API Calls

Always import from `config/api.ts`:

```typescript
import { API_URL } from '@/config/api';

// Will work on both Replit and localhost!
const data = await fetch(`${API_URL}endpoint`);
```

### Port Configuration

- **Replit:** Uses `npm run dev:replit` which runs on port 5000
- **Local:** Uses `npm run dev` which runs on port 3000 (Next.js default)
- **Code:** Always use `API_URL` from `config/api.ts` - never hardcode ports
- The environment detection in `config/api.ts` automatically selects the correct port

## 🐛 Known Issues

- Hydration warnings in development (Next.js related, non-blocking)
- Some legacy components may show deprecation warnings

## 📞 Support

For issues or questions:
1. Check this README
2. Review `.env.local.example` for required variables
3. Ensure all environment variables are set correctly

---

**Built with ❤️ for Sri Sringeri Sharada Peetham**
