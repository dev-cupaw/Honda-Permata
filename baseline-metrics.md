# Honda Project Baseline Metrics

## Build Performance Metrics
- **Build Time**: 17.03 seconds
- **Build Status**: ✓ Compiled successfully
- **Total Routes**: 19 routes
- **Static Pages Generated**: 21/21

## Bundle Size Analysis
- **Largest Page**: /tentang (8.95 kB + 197 kB First Load JS)
- **Smallest Page**: /testimoni (187 B + 109 kB First Load JS)
- **Homepage Size**: 6.71 kB + 202 kB First Load JS
- **Shared JS Bundle**: 101 kB
  - chunks/1acdb12c-91df4ff8444e831e.js: 53.2 kB
  - chunks/5575-1ca65cd651a4f770.js: 45.8 kB
  - other shared chunks: 2 kB

## Dependency Metrics
- **Node Modules Size**: 419.53 MB
- **Total Files in node_modules**: 30,665 files
- **Direct Dependencies**: 33 packages
- **Production Dependencies**: 44 packages (from package.json)
- **Dev Dependencies**: 6 packages (from package.json)

## Route Analysis
All routes are static (○) and prerendered:
- Homepage: /
- Car Models: 14 different car model pages
- Brochure: /brochure
- Contact: /kontak
- About: /tentang
- Testimonials: /testimoni
- Promotions: /promo

## Build Configuration Status
- TypeScript validation: Skipped (ignoreBuildErrors: true)
- ESLint validation: Skipped (ignoreDuringBuilds: true)
- All pages successfully generated

## Current Issues Identified
- Build ignores TypeScript errors
- Build ignores ESLint warnings
- Many "latest" version dependencies
- Large node_modules size relative to project complexity

## Baseline Screenshots Required
The following pages need to be manually tested and documented:
- [ ] Homepage (/)
- [ ] About page (/tentang)
- [ ] Contact page (/kontak)
- [ ] Brochure page (/brochure)
- [ ] Testimonials page (/testimoni)
- [ ] Promotions page (/promo)
- [ ] Sample car model pages (at least 3-4 different models)

## Navigation Elements to Test
- [ ] Main navigation menu
- [ ] Mobile responsive menu
- [ ] Footer links
- [ ] Car model navigation
- [ ] Contact forms (if any)
- [ ] Interactive elements (buttons, dropdowns, etc.)

## Performance Baseline
- Build completes successfully in ~17 seconds
- All static pages generate without errors
- No runtime errors during build process
- Bundle sizes are reasonable for a car dealership website