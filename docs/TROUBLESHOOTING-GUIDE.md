# Honda Permata Website - Troubleshooting Guide

## Common Issues and Solutions

### 1. WhatsApp Integration Issues

#### Problem: Forms submit but WhatsApp doesn't open
**Symptoms:**
- Form shows success message
- No WhatsApp window opens
- Console shows no errors

**Solutions:**
1. **Check Pop-up Blocker**
   - Disable pop-up blocker for the website
   - Try holding Ctrl/Cmd while clicking submit
   - Check browser settings for blocked pop-ups

2. **Browser Compatibility**
   - Test in different browsers (Chrome, Firefox, Safari, Edge)
   - Ensure JavaScript is enabled
   - Clear browser cache and cookies

3. **Mobile Device Issues**
   - Ensure WhatsApp is installed on mobile device
   - Check if WhatsApp Web is accessible
   - Try opening WhatsApp manually first

**Diagnostic Steps:**
\`\`\`javascript
// Test WhatsApp URL generation in browser console
const testUrl = `https://wa.me/6282297098292?text=${encodeURIComponent('Test message')}`
window.open(testUrl, '_blank')
\`\`\`

#### Problem: WhatsApp opens but message is malformed
**Symptoms:**
- WhatsApp opens successfully
- Message contains encoded characters or is unreadable
- Missing form data in message

**Solutions:**
1. **Check Form Data**
   - Verify all form fields have proper names
   - Ensure form data is being collected correctly
   - Check for special characters in form inputs

2. **URL Encoding Issues**
   - Verify `encodeURIComponent` is working correctly
   - Check for double encoding
   - Test with simple ASCII characters first

**Diagnostic Steps:**
\`\`\`javascript
// Test message formatting in browser console
const testData = { nama: 'Test User', phone: '081234567890' }
const integrator = new WhatsAppIntegrator({
  number: '6282297098292',
  baseUrl: 'https://wa.me'
})
console.log(integrator.formatMessage(testData, 'contact'))
\`\`\`

### 2. Form Validation Issues

#### Problem: Valid forms show validation errors
**Symptoms:**
- Correctly filled forms show error messages
- Specific fields flagged as invalid despite correct format
- Form won't submit

**Solutions:**
1. **Phone Number Validation**
   - Check phone number format: `+62`, `62`, or `0` prefix
   - Remove spaces and dashes: `081234567890`
   - Ensure 9-13 digits after country code

2. **Email Validation**
   - Verify email format: `user@domain.com`
   - Check for spaces or special characters
   - Ensure email field is not required if marked optional

3. **Name Validation**
   - Ensure name field is not empty
   - Check for leading/trailing spaces
   - Verify minimum length requirements

**Diagnostic Steps:**
\`\`\`javascript
// Test validation in browser console
const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/
const testPhone = '081234567890'
console.log('Phone valid:', phoneRegex.test(testPhone.replace(/[-\s]/g, '')))

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const testEmail = 'test@example.com'
console.log('Email valid:', emailRegex.test(testEmail))
\`\`\`

### 3. Toast Notification Issues

#### Problem: Toast notifications don't appear or last too long
**Symptoms:**
- No feedback after form submission
- Toast messages block interface for extended periods
- Multiple toast messages stack up

**Solutions:**
1. **Check Toast Configuration**
   - Verify `NEXT_PUBLIC_TOAST_DELAY` environment variable
   - Ensure delay is between 1000-30000 milliseconds
   - Default should be 5000ms (5 seconds)

2. **Toast System Reset**
   - Clear browser cache
   - Restart development server
   - Check for JavaScript errors in console

**Diagnostic Steps:**
\`\`\`javascript
// Check current toast delay setting
console.log('Toast delay:', process.env.NEXT_PUBLIC_TOAST_DELAY || '5000')

// Test toast functionality
import { useToast } from '@/hooks/use-toast'
const { toast } = useToast()
toast({
  title: "Test Toast",
  description: "This is a test message",
  variant: "default"
})
\`\`\`

### 4. Environment Configuration Issues

#### Problem: Missing or incorrect environment variables
**Symptoms:**
- Application fails to start
- Contact information shows as undefined
- Configuration validation errors

**Solutions:**
1. **Check .env.local File**
   - Ensure file exists in project root
   - Verify all required variables are present
   - Check for typos in variable names

2. **Required Environment Variables**
   \`\`\`
   NEXT_PUBLIC_WHATSAPP_NUMBER=6282297098292
   NEXT_PUBLIC_TOAST_DELAY=5000
   \`\`\`

3. **Restart Development Server**
   - Stop the development server (Ctrl+C)
   - Run `npm run dev` or `yarn dev`
   - Check console for configuration errors

**Diagnostic Steps:**
\`\`\`javascript
// Check environment variables in browser console
console.log('WhatsApp Number:', process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)
console.log('Toast Delay:', process.env.NEXT_PUBLIC_TOAST_DELAY)
\`\`\`

### 5. Performance Issues

#### Problem: Slow page loading or image loading issues
**Symptoms:**
- Pages take long time to load
- Images don't display or load slowly
- High memory usage

**Solutions:**
1. **Image Optimization**
   - Verify `next.config.mjs` has `unoptimized: false`
   - Check image formats (WebP, AVIF support)
   - Ensure images are properly sized

2. **Memory Leaks**
   - Check for event listener accumulation
   - Verify component cleanup on unmount
   - Monitor memory usage in browser dev tools

3. **Bundle Size**
   - Check for duplicate dependencies
   - Verify motion library usage (should use framer-motion only)
   - Run bundle analyzer: `npm run analyze`

**Diagnostic Steps:**
\`\`\`bash
# Check bundle size
npm run build
npm run analyze

# Performance testing
npm run lighthouse
\`\`\`

### 6. Mobile-Specific Issues

#### Problem: Forms don't work properly on mobile devices
**Symptoms:**
- Touch events don't register
- Virtual keyboard interferes with form
- WhatsApp doesn't open on mobile

**Solutions:**
1. **Mobile WhatsApp Integration**
   - Ensure WhatsApp app is installed
   - Test with WhatsApp Web as fallback
   - Check mobile browser compatibility

2. **Touch and Input Issues**
   - Verify touch event handlers
   - Check viewport meta tag
   - Test on different mobile browsers

3. **Responsive Design**
   - Verify form layouts on small screens
   - Check button sizes for touch targets
   - Test keyboard navigation

## Emergency Procedures

### 1. Complete System Failure
If the entire form system fails:

1. **Immediate Rollback**
   - Revert to previous working commit
   - Deploy emergency contact information
   - Display manual contact details

2. **Emergency Contact Display**
   \`\`\`typescript
   // Add to any page as emergency fallback
   <div className="emergency-contact">
     <h3>Hubungi Kami Langsung</h3>
     <p>WhatsApp: +62 822-9709-8292</p>
     <p>Email: info@hondapermataserpong.com</p>
   </div>
   \`\`\`

### 2. WhatsApp Service Outage
If WhatsApp service is unavailable:

1. **Alternative Contact Methods**
   - Display phone number prominently
   - Show email contact form
   - Provide physical address

2. **Temporary Form Storage**
   - Store form submissions locally
   - Implement email fallback
   - Queue submissions for later processing

### 3. Environment Variable Issues
If environment variables are corrupted:

1. **Hardcoded Fallback**
   \`\`\`typescript
   const EMERGENCY_WHATSAPP = '6282297098292'
   const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || EMERGENCY_WHATSAPP
   \`\`\`

2. **Configuration Reset**
   - Restore .env.local from backup
   - Verify all required variables
   - Restart application

## Monitoring and Logging

### Key Metrics to Monitor
- Form submission success rate
- WhatsApp redirect success rate
- Toast notification performance
- Page load times
- Error rates

### Logging Best Practices
- Log form submission attempts
- Track WhatsApp integration failures
- Monitor validation error patterns
- Record performance metrics

### Error Reporting
- Implement error boundary components
- Set up error tracking (Sentry, LogRocket)
- Monitor console errors in production
- Track user feedback and complaints

## Getting Help

### Internal Support
1. Check this troubleshooting guide first
2. Review system documentation
3. Check recent code changes
4. Contact development team

### External Resources
- Next.js Documentation: https://nextjs.org/docs
- React Documentation: https://react.dev
- WhatsApp Business API: https://developers.facebook.com/docs/whatsapp

### Emergency Contacts
- Development Team: [Insert contact information]
- System Administrator: [Insert contact information]
- Business Owner: [Insert contact information]
