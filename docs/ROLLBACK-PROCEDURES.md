# Honda Permata Rollback Procedures

## Emergency Rollback Overview

This document provides step-by-step rollback procedures for each critical fix implemented in the Honda Permata website. Use these procedures if any critical issues are detected after deployment.

## Quick Emergency Rollback (5 minutes)

### Immediate Actions
1. **Revert to previous deployment**
   ```bash
   # If using Git-based deployment
   git revert HEAD --no-edit
   git push origin main
   
   # If using platform deployment (Vercel/Netlify)
   # Use platform's rollback feature in dashboard
   ```

2. **Emergency environment variables**
   ```bash
   # Set emergency fallback values
   NEXT_PUBLIC_WHATSAPP_NUMBER=6282297098292
   NEXT_PUBLIC_TOAST_DELAY=5000
   ```

## Detailed Rollback Procedures by Fix

### 1. Toast System Fix Rollback
**Issue:** Toast notifications not working or causing UI problems

**Rollback Steps:**
1. **File:** `hooks/use-toast.ts`
   ```typescript
   // Emergency fallback - revert to safe value
   const TOAST_REMOVE_DELAY = 5000 // Safe 5-second delay
   ```

2. **Verification:**
   - Test toast notifications appear and disappear
   - Verify UI remains interactive
   - Check no console errors

**Risk Level:** LOW - Safe fallback values

### 2. WhatsApp Integration Rollback
**Issue:** Forms not redirecting to WhatsApp or errors in form submission

**Rollback Steps:**
1. **Disable WhatsApp integration temporarily**
   ```typescript
   // In form components, add emergency fallback
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault()
     
     // Emergency fallback - show contact info
     alert(`Silakan hubungi kami di WhatsApp: ${getWhatsAppNumber()}`)
     
     // Or redirect directly
     window.open(`https://wa.me/6282297098292`, '_blank')
   }
   ```

2. **Revert form handlers**
   - Replace `useFormHandler` with simple alert/redirect
   - Remove form validation temporarily
   - Use direct WhatsApp links

**Risk Level:** MEDIUM - Business critical function

### 3. Environment Configuration Rollback
**Issue:** Environment variables not loading or causing errors

**Rollback Steps:**
1. **Hardcode emergency values**
   ```typescript
   // In lib/contact-config.ts
   export const contactConfig = {
     whatsapp: {
       number: '6282297098292', // Hardcoded fallback
       url: 'https://wa.me'
     }
   }
   
   // Disable validation temporarily
   export const validateContactConfig = () => {
     // No-op for emergency
   }
   ```

2. **Update all components**
   - Replace `getWhatsAppNumber()` with hardcoded value
   - Remove environment variable dependencies

**Risk Level:** HIGH - Affects all contact functions

### 4. Performance Optimization Rollback
**Issue:** Images not loading or build failures

**Rollback Steps:**
1. **Disable image optimization**
   ```javascript
   // In next.config.mjs
   const nextConfig = {
     images: {
       unoptimized: true, // Disable optimization
     }
   }
   ```

2. **Revert to standard img tags**
   ```typescript
   // Replace Next.js Image components with standard img
   <img src="/path/to/image.jpg" alt="Description" />
   ```

**Risk Level:** LOW - Performance impact only

### 5. Memory Leak Fix Rollback
**Issue:** Event listeners not working or causing errors

**Rollback Steps:**
1. **Revert to simple event listeners**
   ```typescript
   // In desktop-header.tsx
   useEffect(() => {
     const handleClick = (e: MouseEvent) => {
       // Simple click handler
       if (!menuRef.current?.contains(e.target as Node)) {
         setIsOpen(false)
       }
     }
     
     document.addEventListener('click', handleClick)
     return () => document.removeEventListener('click', handleClick)
   }, []) // Simple dependency array
   ```

**Risk Level:** LOW - UI interaction only

### 6. Contact Information Migration Rollback
**Issue:** Contact information not displaying correctly

**Rollback Steps:**
1. **Hardcode contact information**
   ```typescript
   // In all components, replace dynamic values with:
   const WHATSAPP_NUMBER = '6282297098292'
   const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`
   ```

2. **Update all contact links**
   ```jsx
   <a href="https://wa.me/6282297098292" target="_blank" rel="noopener noreferrer">
     WhatsApp
   </a>
   ```

**Risk Level:** MEDIUM - Customer contact impact

## Emergency Fallback Configuration

### Complete Emergency Fallback
If all else fails, use this emergency configuration:

```typescript
// Emergency configuration object
const EMERGENCY_CONFIG = {
  WHATSAPP_NUMBER: '6282297098292',
  WHATSAPP_URL: 'https://wa.me/6282297098292',
  TOAST_DELAY: 5000,
  ENABLE_IMAGE_OPTIMIZATION: false,
  ENABLE_FORM_VALIDATION: false
}

// Emergency form handler
const emergencyFormHandler = (formData: any) => {
  const message = `Halo, saya ${formData.nama} (${formData.phone}). ${formData.message || 'Saya ingin konsultasi tentang Honda.'}`
  const url = `https://wa.me/6282297098292?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}
```

## Monitoring During Rollback

### Key Metrics to Watch
1. **Form Submission Success Rate**
   - Target: >95% successful WhatsApp redirects
   - Monitor: Browser console errors
   - Alert: If success rate drops below 90%

2. **Page Load Performance**
   - Target: <3 seconds initial load
   - Monitor: Core Web Vitals
   - Alert: If performance degrades >20%

3. **Error Rates**
   - Target: <1% JavaScript errors
   - Monitor: Browser console, error tracking
   - Alert: If error rate exceeds 5%

### Rollback Verification Checklist
- [ ] All forms redirect to WhatsApp successfully
- [ ] Toast notifications work correctly
- [ ] No JavaScript console errors
- [ ] Contact information displays correctly
- [ ] Images load properly
- [ ] Mobile experience is functional
- [ ] Performance is acceptable

## Communication Plan

### Internal Communication
1. **Immediate notification** to technical team
2. **Status update** to business stakeholders
3. **Progress updates** every 15 minutes during rollback
4. **Completion confirmation** when rollback is verified

### Customer Communication
1. **If rollback takes >30 minutes:** Post status update on website
2. **If forms are down:** Display emergency contact information
3. **After resolution:** Remove any status messages

## Post-Rollback Actions

### Investigation
1. **Identify root cause** of the issue
2. **Document lessons learned**
3. **Update rollback procedures** if needed
4. **Plan fix for the issue**

### Recovery Planning
1. **Schedule new deployment** with fixes
2. **Enhanced testing** for problematic areas
3. **Improved monitoring** for early detection
4. **Team retrospective** on incident

## Emergency Contact Information

### Technical Escalation
- **Primary:** [Technical Lead Contact]
- **Secondary:** [Senior Developer Contact]
- **Platform Support:** [Hosting Provider Support]

### Business Escalation
- **Primary:** [Business Owner Contact]
- **Secondary:** [Marketing Manager Contact]
- **Customer Service:** [Customer Service Manager]

---

**Remember:** The goal is to restore business functionality as quickly as possible. Don't hesitate to use the most direct rollback approach if time is critical.