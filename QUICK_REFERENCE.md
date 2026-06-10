# 🗂️ Haridasa Kosha - Quick Reference Guide

## 📍 Important Paths

### Pages
```
app/(marketing)/page.tsx          → /
app/(marketing)/layout.tsx        → Root marketing layout
app/(catalog)/haridasaru/page.tsx  → /haridasaru
app/(catalog)/haridasaru/[id]/page.tsx → /haridasaru/:id
app/(catalog)/library/page.tsx → /library
app/(catalog)/library/[id]/page.tsx → /library/:id
app/search/page.tsx               → /search?q=query
```

### Components
```
components/ui/Hero.tsx                    → Hero section
components/ui/SearchBar.tsx               → Search form
components/ui/ComposerCard.tsx            → Composer card
components/ui/CompositionCard.tsx         → Composition card
components/ui/FeaturedComposers.tsx       → Featured composers section
components/ui/FeaturedCompositions.tsx    → Featured compositions section
components/ui/Pagination.tsx              → Pagination component
components/ui/Filters.tsx                 → Filter sidebar
```

### API Routes
```
api/haridasaru/route.ts        → GET /api/haridasaru
api/haridasaru/[id]/route.ts   → GET /api/haridasaru/:id
api/library/route.ts     → GET /api/library
api/library/[id]/route.ts → GET /api/library/:id
api/search/route.ts           → GET /api/search?q=query
```

### Utilities
```
lib/utils.ts      → Formatting and string utilities
lib/constants.ts  → App-wide constants
lib/db.ts         → Prisma client singleton
lib/dailyEngagement.ts → Engagement tracking
```

### Configuration
```
tailwind.config.js → TailwindCSS config
next.config.js    → Next.js config
tsconfig.json     → TypeScript config
.env.local        → Environment variables (create from .env.example)
```

### Database
```
prisma/schema.prisma → Database schema
prisma/seed.ts       → Sample data
```

---

## 🎯 Useful Commands

### Development
```bash
npm run dev              # Start dev server on port 3000
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
```

### Database
```bash
npm run prisma:generate  # Generate Prisma client
npm run prisma:push      # Sync schema with database
npm run prisma:seed      # Run seed.ts
npx prisma studio       # Open Prisma Studio (GUI)
npx prisma migrate reset # Reset database (deletes all data)
```

### Development Helpers
```bash
npm install              # Install dependencies
npm update              # Update dependencies
npm ci                  # Clean install (for CI/CD)
```

---

## 🔑 Key Database Models

### Composer
```typescript
id: String
name: String (indexed)
biography: String?
ankitaId: String (foreign key)
timeline: String?
imageUrl: String?
featured: Boolean
compositions: Composition[]
createdAt: DateTime
updatedAt: DateTime
```

### Composition
```typescript
id: String
title: String (indexed)
firstLine: String
lyrics: String
transliteration: String?
composerId: String (indexed, foreign key)
deityId: String (indexed, foreign key)
ankitaId: String (indexed, foreign key)
featured: Boolean (indexed)
audioFiles: AudioFile[]
translations: Translation[]
createdAt: DateTime
updatedAt: DateTime
```

### Other Models
- **Ankita**: name (unique), composers[], compositions[]
- **Deity**: name (unique), compositions[]
- **Translation**: english, kannadaMeaning, wordByWord
- **AudioFile**: title, url, duration?
- **Theme**: name (unique), compositions[]
- **DailyComposition**: date (unique), commentary, isEditorial

---

## 🌐 API Quick Reference

### Get All Composers
```
GET /api/haridasaru
GET /api/haridasaru?search=purandara&limit=10&offset=0
```

### Get Single Composer
```
GET /api/haridasaru/purandara-dasa
```

### Get All Compositions
```
GET /api/library
GET /api/library?composer={composerId}
GET /api/library?deity={deityId}
GET /api/library?ankita={ankitaId}
GET /api/library?search=bhagyada&limit=12&offset=0
```

### Get Single Composition
```
GET /api/library/bhagyada-lakshmi-1
```

### Global Search
```
GET /api/search?q=krishna
```

---

## 🎨 Component Props

### Hero
```typescript
// No props - renders static content
```

### SearchBar
```typescript
interface SearchBarProps {
  placeholder?: string;           // Default: "Search compositions, composers..."
  type?: 'compositions' | 'composers' | 'all';  // Default: 'all'
}
```

### ComposerCard
```typescript
interface ComposerCardProps {
  composer: Composer & { _count?: { compositions: number } };
}
```

### CompositionCard
```typescript
interface CompositionCardProps {
  id: string;
  title: string;
  firstLine: string;
  composerName: string;
  deityName: string;
  featured?: boolean;
}
```

### Pagination
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}
```

### Filters
```typescript
interface FiltersProps {
  composers?: Array<{ id: string; name: string }>;
  deities?: Array<{ id: string; name: string }>;
  ankitas?: Array<{ id: string; name: string }>;
  themes?: Array<{ id: string; name: string }>;
}
```

---

## 🎯 Common Development Tasks

### Add a New Composer
```bash
# 1. Go to Prisma Studio
npx prisma studio

# 2. Add via GUI or update seed.ts
# 3. Run seed again
npm run prisma:seed
```

### Add a New Composition
```bash
# 1. Use Prisma Studio or seed.ts
npx prisma studio

# 2. Include: title, firstLine, lyrics, composerId, deityId, ankitaId
```

### Add a New API Endpoint
```bash
# 1. Create file in app/api/{resource}/route.ts
# 2. Export async GET/POST/PUT/DELETE function
# 3. Use NextResponse for responses
# 4. Add error handling
```

### Modify Database Schema
```bash
# 1. Edit prisma/schema.prisma
# 2. Run: npm run prisma:push
# 3. Update any related code
# 4. Generate client: npm run prisma:generate
```

### Add a New Page
```bash
# 1. Create directory in app/ with layout.tsx if needed
# 2. Add page.tsx file
# 3. Export default component
# 4. Add metadata if needed
# 5. Use layout groups for different styles
```

---

## 🔍 Search & Filter Logic

### Search Fields
- **Composers**: name, biography
- **Compositions**: title, firstLine, lyrics

### Filter Parameters
- **composer**: Filter by composerId
- **deity**: Filter by deityId
- **ankita**: Filter by ankitaId
- **theme**: Filter by theme (comma-separated IDs)

### Pagination
- **limit**: Items per page (default: 50)
- **offset**: Number of items to skip (default: 0)
- **page**: Human-friendly page number (1-indexed)

---

## 🎨 TailwindCSS Classes Used

### Layout
```
max-w-7xl, max-w-4xl, max-w-2xl
px-4, py-8, py-12, py-16
grid, flex, gap-6
```

### Colors
```
bg-slate-50, bg-slate-900
text-slate-900, text-slate-600
border-slate-200
bg-blue-600, bg-blue-100
```

### Effects
```
shadow-sm, shadow-lg
rounded-lg, rounded-full
backdrop-blur-sm
transition-all, duration-300
hover:scale-105
```

### Responsive
```
sm:, lg:, md:
grid-cols-1, sm:grid-cols-2, lg:grid-cols-4
hidden, sm:flex
```

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (default)
- **Small (sm)**: ≥ 640px
- **Medium (md)**: ≥ 768px
- **Large (lg)**: ≥ 1024px
- **Extra Large (xl)**: ≥ 1280px
- **2XL**: ≥ 1536px

---

## 🔄 Data Flow

### Homepage
1. Server-side fetch featured composers/library
2. Pass data to client components (FeaturedComposers, FeaturedCompositions)
3. Client renders with animations

### Composers Directory
1. Get page, search params from URL
2. Server-side fetch with filters
3. Render cards, pagination
4. Search params preserved in pagination links

### Detail Pages
1. Get [id] from URL params
2. Server-side fetch full details with relations
3. Render all information
4. Generate dynamic metadata

### Filters
1. Client-side checkbox/select changes
2. Update URL search params
3. Server re-fetches with new filters
4. Display updated results

---

## 🚨 Common Issues & Solutions

### Database Connection Failed
```
✓ Check DATABASE_URL in .env.local
✓ Ensure PostgreSQL is running
✓ Run: npm run prisma:push
```

### Prisma Client Not Generated
```
✓ Run: npm run prisma:generate
✓ Restart dev server
```

### Styling Not Applied
```
✓ Check tailwind.config.js content paths
✓ Ensure CSS files are imported
✓ Restart dev server
```

### Page Not Found
```
✓ Check route syntax in app/ directory
✓ Verify layout.tsx exists for groups
✓ Check spelling of [dynamic] parameters
```

---

## 📚 File Size Reference

Expected file sizes for reference:
- `page.tsx`: 2-3 KB
- `components/ui/*.tsx`: 1-2 KB each
- `api/*/route.ts`: 1-2 KB each
- `globals.css`: ~3 KB
- Total project: ~50-100 KB (without node_modules)

---

## 🎯 Performance Tips

1. **Search is optimized**: Indexes on frequently searched fields
2. **Pagination is required**: Prevents loading thousands of items
3. **Images are placeholder**: Replace with CDN URLs in production
4. **Animations are GPU-accelerated**: Use transform and opacity
5. **Component reuse**: All common patterns in components/ui/

---

## 🔐 Security Checklist

- [x] No hardcoded secrets
- [x] SQL injection prevention (Prisma)
- [x] Input validation (search queries)
- [x] CORS headers (if needed)
- [x] Type safety (TypeScript)
- [x] No client secrets in code

---

## 📞 Quick Contacts

- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **TailwindCSS**: https://tailwindcss.com
- **TypeScript**: https://www.typescriptlang.org

---

**Last Updated**: May 2026
**Version**: 1.0.0
