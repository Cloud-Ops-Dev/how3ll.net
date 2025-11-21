# how3ll.net - Mark Howell's Portfolio Website

A modern, responsive portfolio website showcasing cloud operations expertise, professional experience, and technical projects. Built with [Next.js](https://nextjs.org), [React](https://react.dev), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com).

## Project Overview

This portfolio website is designed to:
- Highlight Mark Howell's cloud operations and DevOps expertise
- Showcase professional experience across enterprise cloud environments
- Display technical projects and notable achievements
- Serve as a hub for job search and professional networking

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Linting**: ESLint
- **Node Version**: 18+

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm (comes with Node.js)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
# Visit http://localhost:3000
```

### Build & Production

```bash
# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

## Project Structure

```
/app              - Next.js App Router pages and layouts
/public           - Static assets (images, etc)
/components       - Reusable React components
/lib              - Utility functions and helpers
/data             - Processed content from LinkedIn export
/styles           - Global styles and Tailwind config
```

## Content Data

Content is populated from LinkedIn profile export data (in `/home/clay/Documents/projects/how3ll.net/Data2site/linkedin/`):
- Professional summary and headline
- Employment positions and experience
- Technical skills and endorsements
- Project highlights
- Recommendations from colleagues
- Education and certifications

## Development

### Common Commands

```bash
# Development
npm run dev          # Start dev server (watches for changes)

# Building
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint

# Cleanup
rm -rf .next        # Clear build cache
```

### Key Development Files
- `app/layout.tsx` - Root layout and navigation
- `app/page.tsx` - Home page
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration

## Design References

Portfolio design inspired by:
1. [paulford.com](https://paulford.com/)
2. [austinkleon.com](https://austinkleon.com/)
3. [glorialo.design](https://www.glorialo.design/)

## Deployment

This project is configured to deploy on [Vercel](https://vercel.com) (recommended) or any Node.js hosting.

### Deploy to Vercel

1. Push to GitHub
2. Connect repository to Vercel
3. Vercel automatically deploys on push to main branch

## License

MIT License - See LICENSE file for details
