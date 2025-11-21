# Development Guide

## Project Setup & Architecture

### What Was Done

This Next.js portfolio website has been initialized with the following structure:

1. **Technology Stack**: Next.js 16 + React 19 + TypeScript + Tailwind CSS
2. **Data Pipeline**: CSV → JSON transformation (LinkedIn export data)
3. **Component Architecture**: Modular, reusable React components
4. **Styling**: Tailwind CSS with a professional dark/light theme

### File Structure

```
how3ll.net/
├── app/
│   ├── layout.tsx          # Root layout with global styles
│   ├── page.tsx            # Home page (uses all components)
│   ├── globals.css         # Tailwind CSS setup
│   └── favicon.ico
├── components/
│   ├── Hero.tsx            # Hero section with profile intro
│   ├── Experience.tsx      # Employment history timeline
│   ├── Skills.tsx          # Skills grid with endorsements
│   └── Recommendations.tsx # Testimonials section
├── lib/
│   └── linkedin-data.ts    # Data loading & utilities
├── scripts/
│   └── process-linkedin-data.ts  # CSV → JSON converter
├── public/
│   └── data/
│       └── linkedin-data.json    # Generated data (from build)
├── CLAUDE.md               # Claude Code guidance
├── DEVELOPMENT.md          # This file
├── README.md               # Project overview
└── package.json            # Dependencies & build scripts
```

## Development Workflow

### Starting Development

```bash
# Install dependencies (if not already done)
npm install

# Start development server (with hot reload)
npm run dev

# Visit http://localhost:3000
```

### Building for Production

```bash
# This automatically:
# 1. Processes LinkedIn CSV data → JSON
# 2. Builds optimized Next.js site
npm run build

# Then start production server
npm run start
```

### Running Linting

```bash
npm run lint
```

## Data Processing Pipeline

### How It Works

1. **LinkedIn CSV Export** located at `/home/clay/Documents/projects/how3ll.net/Data2site/linkedin/`
   - Profile.csv
   - Positions.csv
   - Skills.csv
   - Certifications.csv
   - Education.csv
   - Recommendations_Received.csv
   - Projects.csv
   - Endorsement_Received.csv

2. **Transformation Script**: `scripts/process-linkedin-data.ts`
   - Reads all CSV files from the LinkedIn data directory
   - Parses and structures the data into TypeScript-typed objects
   - Generates `/public/data/linkedin-data.json`
   - **Runs automatically** as part of the build process

3. **Usage in Components**: `lib/linkedin-data.ts`
   - Exports helper functions to load and access the data
   - Provides utility functions like `getTopSkills()`, `getFeaturedPositions()`, etc.
   - Used by components and pages during build time (static generation)

### Regenerating Data

To refresh the data after updating LinkedIn exports:

```bash
npm run process-data
```

This reads the LinkedIn CSV files and regenerates `/public/data/linkedin-data.json`.

## Component Architecture

### Hero Component
- **Purpose**: Hero/banner section with profile intro
- **Props**: `profile: Profile`
- **Location**: `components/Hero.tsx`

### Experience Component
- **Purpose**: Employment history with descriptions
- **Props**: `positions: Position[]`
- **Location**: `components/Experience.tsx`

### Skills Component
- **Purpose**: Technical skills with endorsement counts
- **Props**: `skills: Skill[]`, `topCount?: number`
- **Location**: `components/Skills.tsx`

### Recommendations Component
- **Purpose**: Testimonials from colleagues/managers
- **Props**: `recommendations: Recommendation[]`, `limit?: number`
- **Location**: `components/Recommendations.tsx`

## Extending the Site

### Adding a New Section

1. **Create a new component** in `components/NewSection.tsx`
   ```tsx
   export interface NewSectionProps {
     data: DataType[];
   }

   export default function NewSection({ data }: NewSectionProps) {
     return (
       <section className="py-20">
         {/* Your content */}
       </section>
     );
   }
   ```

2. **Add it to the main page** in `app/page.tsx`
   ```tsx
   import NewSection from '@/components/NewSection';

   // In Home component:
   <NewSection data={data.yourData} />
   ```

### Using LinkedIn Data in a New Component

The `lib/linkedin-data.ts` file provides:
- `getLinkedInData()` - Get all data
- `getTopSkills(limit)` - Get top N skills
- `getSkillsByCategory()` - Get skills grouped by category
- `getFeaturedPositions()` - Get unique positions

Example:
```tsx
import { getLinkedInData } from '@/lib/linkedin-data';

export default async function MyComponent() {
  const data = await getLinkedInData();
  return (
    // Use data.profile, data.positions, etc.
  );
}
```

## Styling Guidelines

- **Theme**: Dark hero, alternating light/dark sections for contrast
- **Colors**: Blues for accents, slate for text hierarchy
- **Responsive**: Mobile-first with Tailwind breakpoints (sm, md, lg)
- **Typography**: Large headings, readable line heights

### Key Tailwind Classes Used
- `bg-slate-900`, `bg-slate-50` - Section backgrounds
- `text-blue-500`, `text-blue-600` - Accent colors
- `border-l-4 border-blue-500` - Left accent borders
- `rounded-lg`, `shadow-sm` - Subtle elevation

## Build Configuration

### Next.js Config (`next.config.ts`)
Standard configuration with no special optimizations yet.

### TypeScript Config (`tsconfig.json`)
- `resolveJsonModule: true` - Allows importing JSON files
- Path alias `@/*` - For clean imports

## Common Development Tasks

### View generated data
```bash
cat public/data/linkedin-data.json | jq '.' | less
```

### Test a single component
Create a test file or temporary page to import and use the component.

### Clean build artifacts
```bash
npm run clean  # If configured
# or
rm -rf .next node_modules
npm install
```

## Next Steps for Future Development

1. **Add more sections**: Education, Certifications, Featured Projects
2. **Improve styling**: Add animations, gradients, better spacing
3. **Add interactivity**: Dark mode toggle, smooth scrolling, filtering
4. **SEO optimization**: Meta tags, sitemap, structured data
5. **Performance**: Image optimization, code splitting
6. **Deployment**: Set up GitHub Actions CI/CD
7. **Analytics**: Add Google Analytics or similar

## Troubleshooting

### Build fails with "Cannot find module"
- Run `npm install` to ensure dependencies are installed
- Check that the data file was generated: `ls public/data/linkedin-data.json`

### Dev server won't start
- Kill any existing Node processes: `pkill -f "node"`
- Clear cache: `rm -rf .next`
- Reinstall: `rm -rf node_modules && npm install`

### Data not showing
- Verify LinkedIn CSV files exist in `/home/clay/Documents/projects/how3ll.net/Data2site/linkedin/`
- Run `npm run process-data` to regenerate the JSON
- Check for TypeScript errors with `npm run lint`

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
