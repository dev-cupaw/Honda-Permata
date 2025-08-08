# Environment Variable Configuration Guide

## Overview

The Honda Permata website uses environment variables to manage sensitive configuration data and system settings. This approach ensures security, maintainability, and environment-specific customization without code changes.

## Required Environment Variables

### Production Environment

Create a `.env.local` file in the project root with the following variables:

```bash
# WhatsApp Integration (REQUIRED)
NEXT_PUBLIC_WHATSAPP_NUMBER=6282297098292

# Toast System Configuration (OPTIONAL)
NEXT_PUBLIC_TOAST_DELAY=5000

# Development/Debug Settings (OPTIONAL)
NODE_ENV=production
NEXT_PUBLIC_DEBUG_MODE=false
```

### Development Environment

For local development, use these settings:

```bash
# WhatsApp Integration (REQUIRED)
NEXT_PUBLIC_WHATSAPP_NUMBER=6282297098292

# Toast System Configuration (OPTIONAL)
NEXT_PUBLIC_TOAST_DELAY=5000

# Development Settings
NODE_ENV=development
NEXT_PUBLIC_DEBUG_MODE=true
```

## Variable Descriptions

### NEXT_PUBLIC_WHATSAPP_NUMBER
- **Type:** String
- **Required:** Yes
- **Format:** Indonesian phone number without spaces or dashes
- **Example:** `6282297098292`
- **Description:** The WhatsApp number used for all customer communications
- **Usage:** Used in all form submissions and contact links throughout the website

**Valid Formats:**
- `6282297098292` (recommended)
- `+6282297098292` (will be normalized)
- `082297098292` (will be converted to international format)

### NEXT_PUBLIC_TOAST_DELAY
- **Type:** Number (as string)
- **Required:** No
- **Default:** `5000`
- **Range:** 1000-30000 (1-30 seconds)
- **Example:** `5000`
- **Description:** Duration in milliseconds for toast notifications to remain visible
- **Usage:** Controls user feedback timing for form submissions and system messages

**Recommended Values:**
- `3000` - Quick notifications
- `5000` - Standard notifications (default)
- `7000` - Important notifications
- `10000` - Critical notifications

### NODE_ENV
- **Type:** String
- **Required:** No (set by Next.js)
- **Values:** `development`, `production`, `test`
- **Description:** Determines the application environment
- **Usage:** Controls logging, error handling, and optimization features

### NEXT_PUBLIC_DEBUG_MODE
- **Type:** Boolean (as string)
- **Required:** No
- **Default:** `false`
- **Values:** `true`, `false`
- **Description:** Enables additional debugging features and console logging
- **Usage:** Development and troubleshooting

## Configuration Validation

The system automatically validates environment variables on startup:

### Validation Rules

1. **Required Variables Check**
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` must be present
   - Must be a valid phone number format

2. **Optional Variables Validation**
   - `NEXT_PUBLIC_TOAST_DELAY` must be between 1000-30000 if provided
   - Invalid values will use safe defaults

3. **Format Validation**
   - Phone numbers are normalized to international format
   - Numeric values are validated for range and type

### Validation Error Messages

```typescript
// Missing required variable
"Missing required environment variables: NEXT_PUBLIC_WHATSAPP_NUMBER
Please add them to your .env.local file"

// Invalid phone number format
"Invalid WhatsApp number format. Expected: 6282297098292"

// Invalid toast delay
"Toast delay must be between 1000-30000 milliseconds. Using default: 5000"
```

## Environment-Specific Configuration

### Local Development
```bash
# .env.local (for local development)
NEXT_PUBLIC_WHATSAPP_NUMBER=6282297098292
NEXT_PUBLIC_TOAST_DELAY=3000
NEXT_PUBLIC_DEBUG_MODE=true
```

### Staging Environment
```bash
# .env.local (for staging)
NEXT_PUBLIC_WHATSAPP_NUMBER=6282297098292
NEXT_PUBLIC_TOAST_DELAY=5000
NEXT_PUBLIC_DEBUG_MODE=false
```

### Production Environment
```bash
# .env.local (for production)
NEXT_PUBLIC_WHATSAPP_NUMBER=6282297098292
NEXT_PUBLIC_TOAST_DELAY=5000
NODE_ENV=production
```

## Security Considerations

### Public vs Private Variables

**NEXT_PUBLIC_* Variables:**
- Exposed to the browser
- Visible in client-side code
- Safe for non-sensitive configuration
- Used for WhatsApp number (business contact information)

**Private Variables:**
- Server-side only
- Not exposed to browser
- Used for API keys, database credentials
- Not applicable to current Honda Permata setup

### Best Practices

1. **Never commit .env files to version control**
   - Add `.env*` to `.gitignore`
   - Use environment-specific deployment processes

2. **Use descriptive variable names**
   - Include purpose in name: `WHATSAPP_NUMBER` not just `PHONE`
   - Use consistent naming conventions

3. **Validate all inputs**
   - Check format and range
   - Provide meaningful error messages
   - Use safe defaults where possible

4. **Document all variables**
   - Maintain this configuration guide
   - Include examples and valid ranges
   - Update when adding new variables

## Configuration Access in Code

### Type-Safe Configuration Access

```typescript
// lib/contact-config.ts
export const getWhatsAppNumber = (): string => {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  if (!number) {
    throw new ConfigurationError(['NEXT_PUBLIC_WHATSAPP_NUMBER'], 'WhatsApp number not configured')
  }
  return normalizePhoneNumber(number)
}

export const getToastDelay = (): number => {
  const delay = parseInt(process.env.NEXT_PUBLIC_TOAST_DELAY || '5000')
  return Math.min(Math.max(delay, 1000), 30000) // Clamp between 1-30 seconds
}
```

### Usage in Components

```typescript
// In React components
import { getWhatsAppNumber, getToastDelay } from '@/lib/contact-config'

const ContactForm = () => {
  const whatsappNumber = getWhatsAppNumber()
  const toastDelay = getToastDelay()
  
  // Use configuration values...
}
```

## Deployment Configuration

### Vercel Deployment

1. **Add Environment Variables in Vercel Dashboard:**
   - Go to Project Settings → Environment Variables
   - Add each variable with appropriate values
   - Set environment scope (Production, Preview, Development)

2. **Environment Variable Settings:**
   ```
   Name: NEXT_PUBLIC_WHATSAPP_NUMBER
   Value: 6282297098292
   Environments: Production, Preview, Development
   ```

### Other Hosting Platforms

#### Netlify
```bash
# netlify.toml
[build.environment]
  NEXT_PUBLIC_WHATSAPP_NUMBER = "6282297098292"
  NEXT_PUBLIC_TOAST_DELAY = "5000"
```

#### Railway
```bash
# Set via Railway CLI
railway variables set NEXT_PUBLIC_WHATSAPP_NUMBER=6282297098292
railway variables set NEXT_PUBLIC_TOAST_DELAY=5000
```

#### Docker
```dockerfile
# Dockerfile
ENV NEXT_PUBLIC_WHATSAPP_NUMBER=6282297098292
ENV NEXT_PUBLIC_TOAST_DELAY=5000
```

## Troubleshooting Configuration Issues

### Common Problems

1. **Variables Not Loading**
   - Restart development server after adding variables
   - Check file name is exactly `.env.local`
   - Verify file is in project root directory

2. **Variables Undefined in Browser**
   - Ensure variables start with `NEXT_PUBLIC_`
   - Check for typos in variable names
   - Verify build process includes variables

3. **Invalid Values**
   - Check validation error messages in console
   - Verify value formats match requirements
   - Test with known good values

### Diagnostic Commands

```bash
# Check if .env.local exists
ls -la .env.local

# View environment variables (be careful with sensitive data)
printenv | grep NEXT_PUBLIC

# Test configuration in Node.js
node -e "console.log(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)"
```

### Validation Testing

```javascript
// Test configuration validation in browser console
import { validateContactConfig } from '@/lib/contact-config'

try {
  validateContactConfig()
  console.log('Configuration is valid')
} catch (error) {
  console.error('Configuration error:', error.message)
}
```

## Migration Guide

### From Hardcoded Values

If migrating from hardcoded contact information:

1. **Identify Hardcoded Values**
   ```bash
   # Search for hardcoded phone numbers
   grep -r "6282297098292" src/
   grep -r "082297098292" src/
   ```

2. **Replace with Configuration**
   ```typescript
   // Before
   const whatsappUrl = `https://wa.me/6282297098292`
   
   // After
   import { getWhatsAppNumber } from '@/lib/contact-config'
   const whatsappUrl = `https://wa.me/${getWhatsAppNumber()}`
   ```

3. **Test Migration**
   - Verify all contact links work
   - Check form submissions
   - Test with different environment values

### Adding New Configuration

When adding new environment variables:

1. **Update Configuration Types**
   ```typescript
   interface ContactConfig {
     whatsapp: {
       number: string
       businessHours: string // New field
     }
   }
   ```

2. **Add Validation**
   ```typescript
   export const getBusinessHours = (): string => {
     return process.env.NEXT_PUBLIC_BUSINESS_HOURS || '09:00-17:00'
   }
   ```

3. **Update Documentation**
   - Add to this configuration guide
   - Update deployment instructions
   - Include in troubleshooting guide

## Backup and Recovery

### Configuration Backup

1. **Document Current Values**
   - Keep secure record of production values
   - Store in password manager or secure vault
   - Include deployment platform settings

2. **Version Control**
   - Use `.env.example` file with dummy values
   - Document required variables
   - Include setup instructions

### Recovery Procedures

1. **Lost Configuration**
   - Restore from secure backup
   - Verify all required variables
   - Test application functionality

2. **Corrupted Values**
   - Use known good values from backup
   - Validate configuration after restore
   - Monitor for any issues

## Monitoring and Maintenance

### Regular Checks

1. **Monthly Configuration Review**
   - Verify all variables are still needed
   - Check for deprecated settings
   - Update documentation as needed

2. **Security Audit**
   - Review exposed variables
   - Check for sensitive data leaks
   - Validate access controls

3. **Performance Impact**
   - Monitor configuration loading time
   - Check for unused variables
   - Optimize validation processes

### Change Management

1. **Configuration Changes**
   - Test in development first
   - Use staging environment for validation
   - Plan rollback procedures

2. **Documentation Updates**
   - Update this guide with changes
   - Notify team of new requirements
   - Update deployment procedures