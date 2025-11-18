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

2. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

**That's it!** The app includes fallback Firebase credentials for local development, so no additional setup is required.

## 📋 Environment Variables

### For Replit

All environment variables are stored in **Replit Secrets**:
- Firebase credentials (6 variables)
- Typesense configuration
- CRON secret

The app automatically uses these on Replit.

### For Local Development

**No setup required!** The app includes fallback credentials for local development.

**Optional:** If you want to use custom Firebase credentials locally, create a `.env.local` file:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
TYPESENSE_API_KEY=your_key
TYPESENSE_HOST=your_host
CRON_SECRET=your_secret
```

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

### API Routes Returning 404

**Problem:** All API routes failing with 404 errors.

**Solution:**
1. Make sure Firebase credentials are configured correctly
2. On Replit: Check Replit Secrets are set
3. On localhost: App uses fallback credentials automatically
4. Restart the development server

### Changes Not Reflecting

1. Hard refresh your browser (Ctrl+Shift+R / Cmd+Shift+R)
2. Clear Next.js cache: `rm -rf .next`
3. Restart the development server

### Environment Variables Not Loading

**Replit:**
- Check Replit Secrets panel has all required Firebase variables
- Secrets are automatically available to the app

**Local:**
- No environment file needed (uses fallback credentials)
- Optional: Create `.env.local` to override defaults
- File must be named `.env.local` (not `.env`) if created
- Must be in project root directory
- Restart dev server after creating/changing environment file

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
