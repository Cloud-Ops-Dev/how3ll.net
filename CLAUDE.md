# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**how3ll.net** is a personal portfolio website for Mark Howell, a Cloud Operations professional. The website serves multiple purposes:
- Primary: Job search and professional networking
- Secondary: Showcase of cloud operations expertise, projects, and thought leadership

The project has two directories:
- `/home/clay/Documents/projects/how3ll.net` - Project data and source materials (LinkedIn data, example sites, assets)
- `/home/clay/Documents/GitHub/how3ll.net` - GitHub repository (source code, to be synced with github.com)

## Project Data & Content Sources

### LinkedIn Data (~/Documents/projects/how3ll.net/Data2site/linkedin/)
Primary source for website content - exported LinkedIn profile information:
- **Profile.csv** - Professional headline, summary, and bio
- **Positions.csv** - Employment history and experience (9 positions)
- **Skills.csv** - Technical and professional skills (80+ skills)
- **Endorsement_Received.csv** - Skill endorsements from colleagues
- **Recommendations_Received.csv** - Endorsements from managers/coworkers (20 recommendations)
- **Projects.csv** - Notable technical projects demonstrating expertise
- **Education.csv** - Educational background
- **Certifications.csv** - Professional certifications
- **Ad_Targeting.csv** - SEO keywords and job market positioning terms

### Example Sites Reference
Reference design patterns from:
1. paulford.com
2. austinkleon.com
3. glorialo.design/work/sealadder

Use these to inform design, layout, and user experience decisions for the portfolio.

## Site Architecture & Design Principles

### Content Structure
The website should showcase Mark's experience in a clean, professional, yet approachable manner. Key sections should include:
- **Hero/About** - Compelling introduction using Profile headline and summary
- **Experience** - Timeline or card-based layout of positions
- **Skills** - Organized by category with endorsement counts
- **Projects** - Featured work samples demonstrating technical depth
- **Recommendations** - Testimonials from colleagues/managers
- **Education & Certs** - Credentials and ongoing learning

### Design Goals
- **Attractive yet professional** - Balance between visual appeal and credibility
- **Easy to navigate** - Clear information hierarchy without overwhelming visual clutter
- **Responsive** - Works well on desktop, tablet, and mobile
- **SEO-friendly** - Incorporate keywords from Ad_Targeting.csv naturally throughout content

### Technical Stack
The project should use modern web technologies. Common choices for portfolio sites:
- Static site generator (Next.js, Hugo, Jekyll) OR traditional HTML/CSS/JS stack
- Make a decision on tech stack early and document in README

## Development Workflow

### Initial Setup
1. Initialize git repository in `/home/clay/Documents/GitHub/how3ll.net`
2. Create standard files: README.md, LICENSE, .gitignore
3. Set up chosen framework/build process
4. Create basic project structure

### Development Steps
1. Design page layouts based on example sites
2. Build data pipeline to convert LinkedIn CSV data into consumable format (likely JSON or frontmatter)
3. Implement components/pages for each major section
4. Integrate content from processed LinkedIn data
5. Style and refine for visual appeal
6. Test responsive design across devices
7. Optimize for SEO using Ad_Targeting keywords

### Build & Deployment Commands
Document these in README once tech stack is chosen:
- Build command
- Development server command (if applicable)
- Testing command
- Deployment process to host

## Key Considerations

### Content Processing
- LinkedIn CSV data needs to be parsed and transformed into structured format usable by the site
- Handle CSV formatting edge cases and special characters
- Organize skills data by category/relevance
- Preserve context from recommendations and positions

### SEO & Positioning
- Naturally incorporate terms from Ad_Targeting.csv in content
- Use semantic HTML
- Optimize meta tags and descriptions
- Ensure proper heading hierarchy

### Branding & Voice
- Maintain professional yet personable tone
- Avoid overselling - let credentials speak for themselves
- Balance technical depth with accessibility for non-technical hiring managers
- Emphasize results and impact (e.g., "90% reduction in security alerts", "50% faster onboarding")

## Next Steps for Initial Development

1. Decide on technology stack (Next.js, Astro, Hugo, static HTML, etc.)
2. Create README with project description and tech stack details
3. Set up repository structure
4. Build CSV-to-JSON data transformation script
5. Design and implement core page layouts
6. Integrate transformed LinkedIn data
7. Style components
8. Test and optimize
