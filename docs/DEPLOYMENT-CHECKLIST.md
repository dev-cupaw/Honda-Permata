# Honda Permata Production Deployment Checklist

## Pre-Deployment Requirements

### Environment Variables Setup
**Required Environment Variables:**
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER=6282297098292`
  - Purpose: WhatsApp integration for form submissions
  - Format: Indonesian phone number with country code
  - Validation: Must be 13-15 digits starting with 62

**Optional Environment Variables:**
- [ ] `NEXT_PUBLIC_TOAST_DELAY=5000`
  - Purpose: Toast notification display duration
  - Default: 5000ms (5 seconds)
  - Range: 1000-30000ms (1-30 seconds)

### Environment File Configuration
- [ ] Create `.env.local` file in project root
- [ ] Add all required environment variables
- [ ] Verify no sensitive data in version control
- [ ] Test environment variable loading in development

### Build Verification
- [ ] Run `npm run build` successfully
- [ ] Verify no build errors or warnings
- [ ] Check bundle size is optimized
- [ ] Confirm image optimization is enabled
- [ ] Validate all imports resolve correctly

### Critical Function Testing
- [ ] Test WhatsApp integration on all forms
- [ ] Verify toast notifications display correctly (5 seconds)
- [ ] Confirm form validation works properly
- [ ] Test responsive design on mobile devices
- [ ] Validate all contact information is consistent

### Performance Validation
- [ ] Run Lighthouse audit (target: >90 performance score)
- [ ] Verify Core Web Vitals are within acceptable ranges
- [ ] Test image loading performance
- [ ] Confirm no memory leaks in repeated interactions
- [ ] Validate bundle size reduction from optimizations

### Security Checklist
- [ ] All external links have `rel="noopener noreferrer"`
- [ ] No hardcoded sensitive information in code
- [ ] Environment variables properly configured
- [ ] CSP headers configured for SVG handling
- [ ] Form validation prevents XSS attacks

### Browser Compatibility
- [ ] Test on Chrome (latest)
- [ ] Test on Safari (latest)
- [ ] Test on Firefox (latest)
- [ ] Test on mobile browsers (iOS Safari, Chrome Mobile)
- [ ] Verify WhatsApp integration works on all platforms

## Deployment Steps

### 1. Pre-Deployment
- [ ] Backup current production environment
- [ ] Document current environment variables
- [ ] Prepare rollback plan
- [ ] Schedule deployment window
- [ ] Notify stakeholders of deployment

### 2. Deployment
- [ ] Deploy to staging environment first
- [ ] Run full test suite on staging
- [ ] Verify all critical functions work
- [ ] Deploy to production
- [ ] Verify deployment success

### 3. Post-Deployment
- [ ] Test all critical user flows
- [ ] Monitor error logs for 30 minutes
- [ ] Verify form submissions work correctly
- [ ] Check performance metrics
- [ ] Confirm monitoring is active

## Success Criteria
- [ ] All forms redirect to WhatsApp successfully
- [ ] Toast notifications display for 5 seconds
- [ ] No console errors in browser
- [ ] Performance score >90 on Lighthouse
- [ ] All contact information is consistent
- [ ] Mobile experience is fully functional

## Emergency Contacts
- **Technical Lead:** [Contact Information]
- **Business Owner:** [Contact Information]
- **Hosting Provider:** [Contact Information]
- **Emergency Rollback:** See ROLLBACK-PROCEDURES.md
