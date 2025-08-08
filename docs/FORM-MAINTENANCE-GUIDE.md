# Form Maintenance Guide - Honda Permata Website

## Overview

This guide provides comprehensive instructions for maintaining and extending the form system on the Honda Permata website. The system is built around a centralized WhatsApp integration that handles all customer inquiries through a consistent, reusable architecture.

## System Architecture

### Core Components

1. **Form Handler Hook** (`hooks/use-form-handler.ts`)
   - Centralized form processing logic
   - Validation, submission, and error handling
   - WhatsApp integration and user feedback

2. **WhatsApp Integrator** (`lib/whatsapp-integration.ts`)
   - Message formatting and URL generation
   - Support for multiple form types
   - Proper encoding and security

3. **Contact Configuration** (`lib/contact-config.ts`)
   - Environment-based configuration
   - Type-safe configuration access
   - Validation and error handling

## Adding New Forms

### Step 1: Define Form Data Interface

Create a TypeScript interface for your new form:

```typescript
// In hooks/use-form-handler.ts or separate types file
interface ServiceBookingFormData extends BaseFormData {
  serviceType: string
  vehicleModel: string
  licensePlate?: string
  preferredDate: string
  preferredTime: string
  additionalNotes?: string
}
```

### Step 2: Update Form Type Union

Add your new form type to the existing union:

```typescript
// In hooks/use-form-handler.ts
type FormType = 
  | 'contact' 
  | 'test-drive' 
  | 'service'
  | 'service-booking' // New form type
  | 'brochure'
```

### Step 3: Create Form Component

```typescript
// components/forms/service-booking-form.tsx
'use client'

import { useState } from 'react'
import { useFormHandler } from '@/hooks/use-form-handler'
import { useToast } from '@/hooks/use-toast'

interface ServiceBookingFormProps {
  className?: string
}

export const ServiceBookingForm = ({ className }: ServiceBookingFormProps) => {
  const [formData, setFormData] = useState({
    nama: '',
    phone: '',
    email: '',
    serviceType: '',
    vehicleModel: '',
    licensePlate: '',
    preferredDate: '',
    preferredTime: '',
    additionalNotes: ''
  })

  const { toast } = useToast()

  const { handleSubmit, isSubmitting } = useFormHandler({
    formData,
    formType: 'service-booking',
    onSuccess: () => {
      setFormData({
        nama: '',
        phone: '',
        email: '',
        serviceType: '',
        vehicleModel: '',
        licensePlate: '',
        preferredDate: '',
        preferredTime: '',
        additionalNotes: ''
      })
      toast({
        title: "Berhasil!",
        description: "Permintaan service Anda telah dikirim.",
        variant: "default"
      })
    },
    onError: (error) => {
      console.error('Service booking error:', error)
    }
  })

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {/* Basic Information */}
      <div className="space-y-4">
        <div>
          <label htmlFor="nama" className="block text-sm font-medium">
            Nama Lengkap *
          </label>
          <input
            type="text"
            id="nama"
            value={formData.nama}
            onChange={(e) => updateFormData('nama', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Nomor HP *
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="081234567890"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        {/* Service-Specific Fields */}
        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium">
            Jenis Service *
          </label>
          <select
            id="serviceType"
            value={formData.serviceType}
            onChange={(e) => updateFormData('serviceType', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          >
            <option value="">Pilih Jenis Service</option>
            <option value="service-berkala">Service Berkala</option>
            <option value="perbaikan">Perbaikan</option>
            <option value="body-paint">Body & Paint</option>
            <option value="spare-part">Spare Part</option>
          </select>
        </div>

        <div>
          <label htmlFor="vehicleModel" className="block text-sm font-medium">
            Model Kendaraan *
          </label>
          <input
            type="text"
            id="vehicleModel"
            value={formData.vehicleModel}
            onChange={(e) => updateFormData('vehicleModel', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Honda Civic, Honda CR-V, dll."
            required
          />
        </div>

        <div>
          <label htmlFor="licensePlate" className="block text-sm font-medium">
            Nomor Polisi
          </label>
          <input
            type="text"
            id="licensePlate"
            value={formData.licensePlate}
            onChange={(e) => updateFormData('licensePlate', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="B 1234 ABC"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="preferredDate" className="block text-sm font-medium">
              Tanggal Preferensi *
            </label>
            <input
              type="date"
              id="preferredDate"
              value={formData.preferredDate}
              onChange={(e) => updateFormData('preferredDate', e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="preferredTime" className="block text-sm font-medium">
              Waktu Preferensi *
            </label>
            <select
              id="preferredTime"
              value={formData.preferredTime}
              onChange={(e) => updateFormData('preferredTime', e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            >
              <option value="">Pilih Waktu</option>
              <option value="08:00-10:00">08:00 - 10:00</option>
              <option value="10:00-12:00">10:00 - 12:00</option>
              <option value="13:00-15:00">13:00 - 15:00</option>
              <option value="15:00-17:00">15:00 - 17:00</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="additionalNotes" className="block text-sm font-medium">
            Catatan Tambahan
          </label>
          <textarea
            id="additionalNotes"
            value={formData.additionalNotes}
            onChange={(e) => updateFormData('additionalNotes', e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Keluhan atau permintaan khusus..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Mengirim...' : 'Book Service'}
      </button>
    </form>
  )
}
```

### Step 4: Update WhatsApp Message Formatting

Add field labels for your new form fields:

```typescript
// In lib/whatsapp-integration.ts
private getFieldLabel(key: string): string {
  const labelMap: Record<string, string> = {
    // Existing labels...
    nama: 'Nama',
    phone: 'No. HP',
    email: 'Email',
    message: 'Pesan',
    
    // New service booking labels
    serviceType: 'Jenis Service',
    vehicleModel: 'Model Kendaraan',
    licensePlate: 'Nomor Polisi',
    preferredDate: 'Tanggal Preferensi',
    preferredTime: 'Waktu Preferensi',
    additionalNotes: 'Catatan Tambahan'
  }
  return labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1)
}
```

### Step 5: Add Form-Specific Validation (Optional)

If your form needs custom validation beyond the standard rules:

```typescript
// In hooks/use-form-handler.ts
const validateForm = (data: FormData, formType: FormType): string[] => {
  const errors: string[] = []
  
  // Standard validation
  if (!data.nama?.trim()) {
    errors.push('Nama wajib diisi')
  }
  
  if (!data.phone?.trim()) {
    errors.push('Nomor HP wajib diisi')
  } else if (!/^(\+62|62|0)[0-9]{9,13}$/.test(data.phone.replace(/[-\s]/g, ''))) {
    errors.push('Format nomor HP tidak valid')
  }
  
  // Form-specific validation
  if (formType === 'service-booking') {
    const serviceData = data as ServiceBookingFormData
    
    if (!serviceData.serviceType) {
      errors.push('Jenis service wajib dipilih')
    }
    
    if (!serviceData.vehicleModel?.trim()) {
      errors.push('Model kendaraan wajib diisi')
    }
    
    if (!serviceData.preferredDate) {
      errors.push('Tanggal preferensi wajib dipilih')
    }
    
    if (!serviceData.preferredTime) {
      errors.push('Waktu preferensi wajib dipilih')
    }
    
    // Validate date is not in the past
    if (serviceData.preferredDate) {
      const selectedDate = new Date(serviceData.preferredDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (selectedDate < today) {
        errors.push('Tanggal preferensi tidak boleh di masa lalu')
      }
    }
  }
  
  return errors
}
```

## Modifying Existing Forms

### Step 1: Identify the Form Component

Locate the form component you want to modify:
- Contact forms: `app/components/home/contact-section.tsx`
- Main contact page: `app/kontak/page.tsx`
- Car model forms: `app/car/*/components/`

### Step 2: Update Form Data Structure

Add or modify fields in the form data state:

```typescript
// Add new field
const [formData, setFormData] = useState({
  // Existing fields...
  nama: '',
  phone: '',
  email: '',
  message: '',
  
  // New field
  preferredContactMethod: 'whatsapp' // New field with default value
})
```

### Step 3: Add Form Input Elements

```typescript
// Add new input field
<div>
  <label htmlFor="preferredContactMethod" className="block text-sm font-medium">
    Metode Kontak Preferensi
  </label>
  <select
    id="preferredContactMethod"
    value={formData.preferredContactMethod}
    onChange={(e) => setFormData(prev => ({ 
      ...prev, 
      preferredContactMethod: e.target.value 
    }))}
    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
  >
    <option value="whatsapp">WhatsApp</option>
    <option value="phone">Telepon</option>
    <option value="email">Email</option>
  </select>
</div>
```

### Step 4: Update Field Labels

Add the new field label to the WhatsApp integrator:

```typescript
// In lib/whatsapp-integration.ts
private getFieldLabel(key: string): string {
  const labelMap: Record<string, string> = {
    // Existing labels...
    preferredContactMethod: 'Metode Kontak Preferensi'
  }
  return labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1)
}
```

## Form Validation Customization

### Adding New Validation Rules

```typescript
// In hooks/use-form-handler.ts
const validateForm = (data: FormData): string[] => {
  const errors: string[] = []
  
  // Existing validation...
  
  // Custom validation for specific fields
  if (data.vehicleYear && (parseInt(data.vehicleYear) < 1990 || parseInt(data.vehicleYear) > new Date().getFullYear() + 1)) {
    errors.push('Tahun kendaraan tidak valid')
  }
  
  if (data.budget && parseFloat(data.budget) < 0) {
    errors.push('Budget tidak boleh negatif')
  }
  
  return errors
}
```

### Custom Validation Messages

```typescript
// Create validation message mapping
const getValidationMessage = (field: string, rule: string): string => {
  const messages: Record<string, Record<string, string>> = {
    nama: {
      required: 'Nama lengkap wajib diisi',
      minLength: 'Nama minimal 2 karakter'
    },
    phone: {
      required: 'Nomor HP wajib diisi',
      format: 'Format nomor HP tidak valid (contoh: 081234567890)'
    },
    email: {
      format: 'Format email tidak valid (contoh: nama@email.com)'
    }
  }
  
  return messages[field]?.[rule] || `${field} tidak valid`
}
```

## WhatsApp Message Customization

### Custom Message Templates

```typescript
// In lib/whatsapp-integration.ts
formatMessage(formData: FormData, formType: string): string {
  const templates: Record<string, (data: FormData) => string> = {
    'service-booking': (data) => {
      return `Halo, saya ingin booking service Honda.

Informasi Customer:
Nama: ${data.nama}
No. HP: ${data.phone}
${data.email ? `Email: ${data.email}` : ''}

Detail Service:
Jenis Service: ${data.serviceType}
Model Kendaraan: ${data.vehicleModel}
${data.licensePlate ? `Nomor Polisi: ${data.licensePlate}` : ''}
Tanggal Preferensi: ${data.preferredDate}
Waktu Preferensi: ${data.preferredTime}

${data.additionalNotes ? `Catatan: ${data.additionalNotes}` : ''}

Mohon konfirmasi ketersediaan jadwal. Terima kasih.`
    },
    
    'test-drive': (data) => {
      return `Halo, saya ingin booking test drive Honda.

Informasi Customer:
Nama: ${data.nama}
No. HP: ${data.phone}
${data.email ? `Email: ${data.email}` : ''}

Detail Test Drive:
Model Honda: ${data.model}
${data.preferredDate ? `Tanggal Preferensi: ${data.preferredDate}` : ''}
${data.preferredTime ? `Waktu Preferensi: ${data.preferredTime}` : ''}

Mohon konfirmasi ketersediaan unit dan jadwal. Terima kasih.`
    }
  }
  
  // Use custom template if available, otherwise use default
  if (templates[formType]) {
    return templates[formType](formData)
  }
  
  // Default template
  return this.getDefaultMessage(formData, formType)
}
```

### Dynamic Message Content

```typescript
// Add conditional content based on form data
formatMessage(formData: FormData, formType: string): string {
  let message = `Halo, saya ingin konsultasi tentang Honda.\n\n`
  
  // Add form context
  message += `Sumber: ${this.getFormTypeLabel(formType)}\n`
  
  // Add customer information
  message += `\nInformasi Customer:\n`
  message += `Nama: ${formData.nama}\n`
  message += `No. HP: ${formData.phone}\n`
  
  if (formData.email) {
    message += `Email: ${formData.email}\n`
  }
  
  // Add form-specific content
  if (formType === 'test-drive' && formData.model) {
    message += `\nModel yang Diminati: ${formData.model}\n`
  }
  
  if (formData.budget) {
    message += `Budget: ${formData.budget}\n`
  }
  
  // Add message/notes if provided
  if (formData.message || formData.additionalNotes) {
    message += `\nPesan: ${formData.message || formData.additionalNotes}\n`
  }
  
  return message.trim()
}

private getFormTypeLabel(formType: string): string {
  const labels: Record<string, string> = {
    'contact': 'Kontak Umum',
    'test-drive': 'Test Drive',
    'service-booking': 'Booking Service',
    'brochure': 'Permintaan Brosur'
  }
  return labels[formType] || formType
}
```

## Error Handling and User Feedback

### Custom Error Messages

```typescript
// In hooks/use-form-handler.ts
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  try {
    // Form processing...
  } catch (error) {
    // Custom error handling based on error type
    if (error instanceof FormValidationError) {
      toast({
        title: "Data tidak valid",
        description: error.message,
        variant: "destructive"
      })
    } else if (error instanceof WhatsAppIntegrationError) {
      toast({
        title: "Gagal membuka WhatsApp",
        description: "Silakan hubungi kami langsung di +62 822-9709-8292",
        variant: "destructive"
      })
    } else {
      toast({
        title: "Terjadi kesalahan",
        description: "Silakan coba lagi atau hubungi customer service",
        variant: "destructive"
      })
    }
  }
}
```

### Success Message Customization

```typescript
// Custom success messages based on form type
const getSuccessMessage = (formType: string): { title: string; description: string } => {
  const messages: Record<string, { title: string; description: string }> = {
    'contact': {
      title: "Pesan Terkirim!",
      description: "Kami akan menghubungi Anda segera melalui WhatsApp."
    },
    'test-drive': {
      title: "Test Drive Terjadwal!",
      description: "Tim kami akan mengkonfirmasi jadwal test drive Anda."
    },
    'service-booking': {
      title: "Service Terbooking!",
      description: "Booking service Anda telah diterima. Kami akan konfirmasi jadwal."
    }
  }
  
  return messages[formType] || {
    title: "Berhasil!",
    description: "Permintaan Anda telah dikirim."
  }
}
```

## Testing New Forms

### Manual Testing Checklist

1. **Form Validation**
   - [ ] Test with empty required fields
   - [ ] Test with invalid email format
   - [ ] Test with invalid phone number format
   - [ ] Test with edge case inputs (very long text, special characters)

2. **Form Submission**
   - [ ] Test successful submission
   - [ ] Verify WhatsApp opens with correct message
   - [ ] Check message formatting and readability
   - [ ] Test form reset after successful submission

3. **Error Handling**
   - [ ] Test network error scenarios
   - [ ] Test popup blocker scenarios
   - [ ] Verify error messages are user-friendly
   - [ ] Test fallback contact methods

4. **User Experience**
   - [ ] Test loading states during submission
   - [ ] Verify button disabled state during submission
   - [ ] Test toast notifications timing and content
   - [ ] Check form accessibility (keyboard navigation, screen readers)

### Automated Testing

```typescript
// Example test for new form
// __tests__/forms/service-booking-form.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ServiceBookingForm } from '@/components/forms/service-booking-form'

describe('ServiceBookingForm', () => {
  it('should validate required fields', async () => {
    render(<ServiceBookingForm />)
    
    const submitButton = screen.getByRole('button', { name: /book service/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/nama wajib diisi/i)).toBeInTheDocument()
      expect(screen.getByText(/nomor hp wajib diisi/i)).toBeInTheDocument()
    })
  })
  
  it('should generate correct WhatsApp URL', async () => {
    const mockOpen = jest.fn()
    Object.defineProperty(window, 'open', { value: mockOpen })
    
    render(<ServiceBookingForm />)
    
    // Fill form
    fireEvent.change(screen.getByLabelText(/nama lengkap/i), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByLabelText(/nomor hp/i), {
      target: { value: '081234567890' }
    })
    fireEvent.change(screen.getByLabelText(/jenis service/i), {
      target: { value: 'service-berkala' }
    })
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /book service/i }))
    
    await waitFor(() => {
      expect(mockOpen).toHaveBeenCalledWith(
        expect.stringContaining('wa.me/6282297098292'),
        '_blank',
        'noopener,noreferrer'
      )
    })
  })
})
```

## Performance Considerations

### Form Optimization

1. **Lazy Loading**
   ```typescript
   // Lazy load form components
   const ServiceBookingForm = lazy(() => import('@/components/forms/service-booking-form'))
   
   // Use with Suspense
   <Suspense fallback={<div>Loading form...</div>}>
     <ServiceBookingForm />
   </Suspense>
   ```

2. **Debounced Validation**
   ```typescript
   // Debounce validation for better UX
   import { useDebouncedCallback } from 'use-debounce'
   
   const debouncedValidation = useDebouncedCallback(
     (field: string, value: string) => {
       // Validate single field
       validateField(field, value)
     },
     300
   )
   ```

3. **Memoization**
   ```typescript
   // Memoize expensive calculations
   const whatsappIntegrator = useMemo(() => 
     new WhatsAppIntegrator({
       number: getWhatsAppNumber(),
       baseUrl: getWhatsAppBaseUrl()
     }), []
   )
   ```

## Security Best Practices

### Input Sanitization

```typescript
// Sanitize user inputs
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000) // Limit length
}

// Apply to form data
const sanitizedFormData = {
  ...formData,
  nama: sanitizeInput(formData.nama),
  message: sanitizeInput(formData.message)
}
```

### XSS Prevention

```typescript
// Escape special characters for URL encoding
const escapeForUrl = (text: string): string => {
  return encodeURIComponent(text)
    .replace(/[!'()*]/g, (c) => {
      return '%' + c.charCodeAt(0).toString(16)
    })
}
```

## Monitoring and Analytics

### Form Submission Tracking

```typescript
// Track form submissions
const trackFormSubmission = (formType: string, success: boolean) => {
  // Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'form_submit', {
      form_type: formType,
      success: success
    })
  }
  
  // Custom analytics
  console.log(`Form submission: ${formType} - ${success ? 'success' : 'failed'}`)
}
```

### Error Monitoring

```typescript
// Monitor form errors
const logFormError = (error: Error, formType: string, formData: any) => {
  console.error('Form error:', {
    error: error.message,
    formType,
    timestamp: new Date().toISOString(),
    // Don't log sensitive data
    hasName: !!formData.nama,
    hasPhone: !!formData.phone,
    hasEmail: !!formData.email
  })
}
```

## Troubleshooting Common Issues

### Form Not Submitting

1. **Check Console Errors**
   - Open browser developer tools
   - Look for JavaScript errors
   - Check network tab for failed requests

2. **Verify Environment Variables**
   - Ensure `NEXT_PUBLIC_WHATSAPP_NUMBER` is set
   - Check variable format and value

3. **Test Form Handler**
   ```typescript
   // Debug form handler
   console.log('Form data:', formData)
   console.log('Form type:', formType)
   console.log('WhatsApp number:', getWhatsAppNumber())
   ```

### WhatsApp Not Opening

1. **Check Popup Blockers**
   - Disable popup blockers
   - Test in incognito mode
   - Try different browsers

2. **Verify URL Generation**
   ```typescript
   // Test URL generation
   const testUrl = whatsappIntegrator.generateWhatsAppUrl(formData, formType)
   console.log('Generated URL:', testUrl)
   ```

### Validation Issues

1. **Check Validation Rules**
   - Verify regex patterns
   - Test with known good/bad inputs
   - Check for typos in field names

2. **Debug Validation**
   ```typescript
   // Test validation function
   const errors = validateForm(formData)
   console.log('Validation errors:', errors)
   ```

## Best Practices Summary

1. **Consistency**
   - Use the same form handler pattern for all forms
   - Follow established naming conventions
   - Maintain consistent validation rules

2. **User Experience**
   - Provide clear error messages in Indonesian
   - Show loading states during submission
   - Use appropriate input types and validation

3. **Maintainability**
   - Keep form logic in reusable hooks
   - Document custom validation rules
   - Use TypeScript for type safety

4. **Performance**
   - Lazy load large forms
   - Debounce validation
   - Memoize expensive operations

5. **Security**
   - Sanitize all user inputs
   - Use proper URL encoding
   - Don't log sensitive information

6. **Testing**
   - Test all validation scenarios
   - Verify WhatsApp integration
   - Check error handling paths

This maintenance guide should be updated whenever new forms are added or existing forms are modified to ensure consistency and maintainability of the Honda Permata website form system.