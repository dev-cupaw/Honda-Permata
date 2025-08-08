# WhatsApp Integration System - Usage Guide

## Overview

The Honda Permata website uses a centralized WhatsApp integration system that automatically redirects form submissions to WhatsApp with pre-formatted messages. This system replaces the previous console.warn implementations and provides a seamless customer experience.

## System Architecture

### Core Components

1. **WhatsApp Integrator Class** (`lib/whatsapp-integration.ts`)
   - Handles message formatting and URL generation
   - Supports multiple form types with context-aware messaging
   - Provides proper URL encoding for special characters

2. **Form Handler Hook** (`hooks/use-form-handler.ts`)
   - Reusable hook for all form components
   - Includes validation, loading states, and error handling
   - Integrates with toast notifications for user feedback

3. **Contact Configuration** (`lib/contact-config.ts`)
   - Centralized configuration management
   - Environment variable validation
   - Type-safe configuration access

## Usage Instructions

### For New Form Components

1. **Import the Form Handler Hook**
\`\`\`typescript
import { useFormHandler } from '@/hooks/use-form-handler'
\`\`\`

2. **Set Up Form State**
\`\`\`typescript
const [formData, setFormData] = useState({
  nama: '',
  phone: '',
  email: '',
  message: ''
})
\`\`\`

3. **Initialize the Form Handler**
\`\`\`typescript
const { handleSubmit, isSubmitting } = useFormHandler({
  formData,
  formType: 'contact', // or 'test-drive', 'service', etc.
  onSuccess: () => {
    // Reset form or show success message
    setFormData({ nama: '', phone: '', email: '', message: '' })
  },
  onError: (error) => {
    console.error('Form submission error:', error)
  }
})
\`\`\`

4. **Connect to Form Element**
\`\`\`typescript
<form onSubmit={handleSubmit}>
  {/* Form fields */}
  <button type="submit" disabled={isSubmitting}>
    {isSubmitting ? 'Mengirim...' : 'Kirim'}
  </button>
</form>
\`\`\`

### Supported Form Types

- `contact` - General contact forms
- `test-drive` - Test drive booking forms
- `service` - Service appointment forms
- `brochure` - Brochure request forms

### Message Formatting

The system automatically formats messages based on form type:

**Contact Form Example:**
\`\`\`
Halo, saya ingin konsultasi tentang Honda.

Sumber: contact
Nama: John Doe
No. HP: 081234567890
Email: john@example.com
Pesan: Saya tertarik dengan Honda Civic
\`\`\`

**Test Drive Form Example:**
\`\`\`
Halo, saya ingin konsultasi tentang Honda.

Sumber: test-drive
Nama: Jane Smith
No. HP: 081234567890
Model Honda: Honda CR-V
Tanggal Preferensi: 2024-01-15
\`\`\`

## Field Mapping

The system uses Indonesian labels for better customer experience:

| Field Key | Indonesian Label |
|-----------|------------------|
| nama | Nama |
| phone | No. HP |
| email | Email |
| message | Pesan |
| service | Layanan |
| model | Model Honda |
| preferredDate | Tanggal Preferensi |
| preferredTime | Waktu Preferensi |

## Validation Rules

### Required Fields
- `nama` (Name) - Must not be empty
- `phone` (Phone) - Must match Indonesian phone number format

### Optional Fields
- `email` - Must be valid email format if provided
- `message` - No specific validation

### Phone Number Validation
Accepts these formats:
- `+6281234567890`
- `6281234567890`
- `081234567890`
- `0812-3456-7890`
- `0812 3456 7890`

## Error Handling

The system provides comprehensive error handling:

1. **Validation Errors** - Shown as toast notifications with specific field errors
2. **WhatsApp Integration Errors** - Fallback to direct contact information
3. **Network Errors** - Alternative contact methods displayed

## Security Features

- All WhatsApp links include `rel="noopener noreferrer"` attributes
- Form data is properly URL encoded
- No sensitive data is logged to console
- Environment variables protect contact information

## Testing

To test the WhatsApp integration:

1. Fill out any form with valid data
2. Submit the form
3. Verify WhatsApp opens with pre-filled message
4. Check that the message format is correct and readable

## Maintenance

### Adding New Form Types

1. Add the new form type to the `FormType` union in `hooks/use-form-handler.ts`
2. Update the `getFieldLabel` method in `lib/whatsapp-integration.ts` if new fields are used
3. Test the new form type with sample data

### Updating Message Templates

Modify the `formatMessage` method in `lib/whatsapp-integration.ts` to adjust message structure or add new context.

### Changing Contact Information

Update the `NEXT_PUBLIC_WHATSAPP_NUMBER` environment variable - no code changes required.
