# Sri Sringeri Sharada Peetham Website

## Overview

This is a Next.js-based web application for the Sri Sringeri Sharada Peetham, a major Hindu religious institution. The website serves as a comprehensive digital platform providing information about events, pilgrim services, spiritual resources, temple details, and organizational activities. It features a multi-language interface, dynamic content management, event calendaring, search functionality, and integration with various online services.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### November 17, 2025 - API Configuration Fix for Replit Environment
- Fixed API URL configuration for client-side and server-side components
  - Created separate CLIENT_API_URL constant for client components
  - Server-side components use absolute localhost URLs
  - Client-side components use relative URLs (/api/) for Replit proxy compatibility
- Updated client components to use CLIENT_API_URL:
  - app/stotras/PageContent.tsx
  - app/anugraha-bhashanams/[[...slug]]/PageContent.tsx
- Current Status:
  - /temples - ✅ Fully working with Introduction content
  - /stotras - ⚠️ Page loads, API returns data (200), but deity content not displaying
  - /anugraha-bhashanams - ⚠️ Page loads, API returns data (200), but video content not displaying

### November 17, 2025 - Temples Page Fix  
- Fixed temples page data fetching issue
  - Corrected API route to handle empty slug (root page uses "temples" not "temples/")
  - Updated page component to call /api/temples instead of /api/tp/temples
  - Added null data handling in PageContent component

### November 17, 2025 - Vercel to Replit Migration
- Migrated project from Vercel to Replit
- Updated development server to run on port 5000 (Replit requirement)
- Moved all hardcoded API keys to environment variables for security:
  - Firebase configuration (6 environment variables)
  - Typesense API credentials
  - CRON_SECRET for scheduled sync endpoint protection
- Updated internal API URLs from port 3000 to 5000
- Configured Next.js workflow for Replit environment

## Environment Variables

The following environment variables must be configured in Replit Secrets:

**Firebase Configuration** (required for database access):
- `NEXT_PUBLIC_FIREBASE_API_KEY` - Firebase API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - Firebase project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID` - Firebase app ID

**Typesense Configuration** (required for search functionality):
- `TYPESENSE_API_KEY` - Typesense API key for authentication
- `TYPESENSE_HOST` - Typesense server host URL

**Security**:
- `CRON_SECRET` - Secret token for protecting the scheduled sync endpoint

## System Architecture

### Frontend Architecture

**Framework**: Next.js 15 (App Router architecture)
- Server-side rendering (SSR) with dynamic routes
- Static generation where appropriate using `generateMetadata` for SEO
- Client-side interactivity with `'use client'` directives
- Font optimization using next/font (Inter, PT Serif, Noto Sans)

**Styling Solution**: 
- Tailwind CSS for utility-first styling
- CSS custom properties for theming (colors defined in globals.css)
- Material-UI (MUI) components and icons
- FontAwesome icons for additional iconography
- Emotion for CSS-in-JS styling with MUI

**Component Architecture**:
- Reusable presentational components (NavLinks, Footer, PageHero, etc.)
- Layout components with shared navigation and hero sections
- Client components for interactive features (search, modals, dropdowns)
- Server components for data fetching and static content

**State Management**:
- React Context API for global loading state (LoadingProvider)
- Local component state with useState hooks
- No global state management library (Redux, Zustand, etc.)

**Routing Strategy**:
- File-based routing using App Router
- Dynamic routes for events, announcements, and content pages
- Route groups for organizational sections (about, events, resources, etc.)
- Middleware for CORS handling on API routes

### Backend Architecture

**API Layer**:
- Next.js API routes (files in app/api/ directory, though not included in this snapshot)
- RESTful endpoints for fetching announcements, events, pages, etc.
- Environment-based API URL configuration (production vs development)
- External API URL: `https://www.sringeri.net/api/`

**Data Fetching Patterns**:
- Server-side data fetching using native fetch with cache control
- Cache functions using React's `cache()` for deduplication
- Dynamic imports with `export const dynamic = "force-dynamic"` where needed
- Static data generation for SEO with `generateMetadata` functions

**Content Management**:
- Temporary pages system for dynamic content rendering
- Sidebar data structure for hierarchical navigation
- Multi-language content support with transliteration utilities
- HTML content parsing with html-to-react library

### Data Storage Solutions

**Firebase Integration**:
- Firebase Data Connect configured (see firebase.json)
- Firestore for document storage (rules and indexes configured)
- Firebase emulators for local development
- Generated connector in dataconnect-generated/js/default-connector

**Search Infrastructure**:
- Typesense integration for full-text search
- Scheduled sync job via Vercel crons (runs 4 times daily at 0:30, 6:30, 12:30, 18:30)
- Client-side search component with collection filtering

**Data Models**:
- Events with timestamps, locations, images, online/offline flags
- Announcements with similar structure to events
- Deity-based content with multi-language titles
- Stotra (hymn) collections with transliteration support
- Jagadguru (guru lineage) information
- Temporary pages for dynamic content

### Authentication and Authorization

No explicit authentication system is implemented in the provided codebase. The application appears to be primarily public-facing content.

### External Dependencies

**Third-Party Services**:
- Vercel for hosting and deployment
- Vercel Analytics for usage tracking
- Firebase (Data Connect, Firestore) for data storage
- Typesense for search functionality
- External media storage at files.sringeri.net

**External Links and Services**:
- Online seva booking: seva.sringeri.net
- Accommodation booking: yatri.sringeri.net
- Donations: donate.sringeri.net
- Online bookstore: books.sringeri.net
- Bhajan resources: bhajan.sringeri.net
- Affiliated sites (Tattvaloka, Vidyatheertha Foundation, etc.)

**Image and Asset Hosting**:
- Primary CDN: files.sringeri.net
- Approved image domains: files.sringeri.net, images.unsplash.com, plus.unsplash.com
- Legacy WordPress content redirected from wp-content paths

**Key Libraries**:
- Material-UI (@mui/material, @mui/icons-material) with package import optimization
- FontAwesome icon libraries (solid, regular, brands)
- Sanscript.js for Indic script transliteration (loaded via Script component)
- UUID for unique identifier generation
- html-to-react for content parsing
- clsx for conditional className management

**Development Tools**:
- TypeScript for type safety
- PostCSS for CSS processing
- Tailwind Typography plugin for rich text formatting

**Redirects**:
- Schedule page redirects to onlineservices.sringeri.net/schedule
- Section deity pages redirect to stotras deity pages
- Legacy WordPress content redirects to files.sringeri.net

**CORS Configuration**:
- Middleware sets permissive CORS headers for API routes
- Allows all origins in development (Access-Control-Allow-Origin: *)
- Supports GET, POST, PUT, DELETE, OPTIONS methods