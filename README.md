# Calcutta Walks — Heritage & City Tours Web Experience

Rebuilt from the ground up as a modern, premium, conversion-focused heritage web platform for **Calcutta Walks** (est. 2007 by Iftekhar Ahsan).

---

## Architecture & Funnel Design

Every page strictly implements the conversion funnel:
`Hero -> Main Content -> Reviews -> Our Story -> Inquire Now CTA -> Footer`

- **Visual Tone**: Old-world Calcutta luxury (parchment `#F4EDE1`, ivory `#FBF8F2`, ink `#1C1917`, brass `#B48A3C`, terracotta `#7A2E22`).
- **Typography**: Cormorant Garamond (display/serif with italic accents) paired with Inter (body).
- **Glassmorphism**: Apple-style backdrop-blur panels with soft lighting and hairline borders.
- **Top Bar Contract**: Minimalist one-row 3-zone header with single wordmark and clean navigation links.
- **Mobile Experience**: Floating bottom bar with 1-click WhatsApp (`wa.me/919830184030`) and "Inquire Now" adhering to the 15% sticky cap.

---

## Content Management Guide

All tours, explorer biographies, testimonials, and gallery data are separated into typed, well-structured TypeScript data files.

### 1. Editing & Adding Tours (`src/data/tours.ts`)
Each tour is an object implementing the `Tour` interface:
```typescript
{
  id: 'white-town',
  slug: 'in-the-footsteps-of-the-raj',
  title: 'In the Footsteps of the Raj',
  subtitle: 'White Town Architectural Walk',
  area: 'Dalhousie Square (B.B.D. Bagh)',
  mode: 'Walk', // 'Walk' | 'Car/Coach' | 'Bicycle' | 'Motorbike' | 'River Boat' | 'Public Transport'
  themes: ['Colonial', 'Architecture', 'Photography'],
  duration: '3 Hours',
  timings: '07:00 – 10:00 (Apr–Sep) · 08:00 – 11:00 (Oct–Mar)',
  meetingPoint: 'Lalit Great Eastern Hotel Bakery, Old Court House Street',
  priceShared: 2500, // INR per person
  pricePrivate: 5000, // INR for private party
  oneLineHook: '...',
  overview: '...',
  highlights: ['...', '...'],
  practicalInfo: ['...'],
  imageUrl: 'https://...',
  gallery: ['https://...']
}
```
To add a new tour, append a new object to `TOURS_DATA`. The tour catalog, filters, calendar, and tour detail template will dynamically render it.

### 2. Editing Testimonials & Press Mentions (`src/data/testimonials.ts`)
- Modify `TESTIMONIALS_DATA` to add customer reviews or TripAdvisor feedback.
- Modify `PRESS_DATA` to add new articles from publications like *The New York Times*, *The Telegraph*, or *Lonely Planet*.

### 3. Editing Explorers & Philosophy (`src/data/explorers.ts`)
- `EXPLORERS_DATA`: Team members, biographies, favorite neighborhoods, quotes, and avatars.
- `PHILOSOPHY_CONTENT`: Core manifesto and live statistics counter values.

### 4. Updating the Inquiry Form Endpoint (`src/components/InquireForm.tsx`)
In `src/components/InquireForm.tsx`, locate line 6:
```typescript
export const INQUIRY_API_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID';
```
Replace the placeholder with your Formspree endpoint, Basin URL, or backend webhook. The form will automatically POST submissions with the prefilled tour name, date, group size, and message.

### 5. Managing Sister Properties & Footer
Sister properties **Calcutta Bungalow** (`calcuttabungalow.com`) and **Calcutta Rooms** (`calcuttarooms.com`) are showcased in the "Stay with us" section in `src/components/Footer.tsx`.

---

## Known Issues Resolved
- Replaced dead Google+ link with active Instagram, Facebook, and X links.
- Corrected the "0 Explorers" counter to dynamically reflect the 12 active local Explorers.
- Removed legacy broken links pointing to `atravelcircle.com`.
- Preserved legacy WordPress URLs through `src/data/redirects.json` and `public/sitemap.xml`.
