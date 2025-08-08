"use client"

import React, { useState } from 'react'
import { useFormHandler } from '@/hooks/use-form-handler'
import { 
  InputWithError, 
  TextareaWithError, 
  FormErrorSummary, 
  FormSuccess 
} from '@/components/ui/form-error'
import { Button } from '@/components/ui/button'
import { FormData } from '@/lib/whatsapp-integration'

/**
 * Demo form component showcasing the complete form validation system
 * This demonstrates all the validation features implemented in Task 12:
 * - FormValidationError class for structured error handling
 * - Field-specific validation messages in Indonesian
 * - Visual error indicators on form fields
 * - Error message display components
 */
export function ValidationDemoForm() {
  const [formData, setFormData] = useState<FormData>({
    nama: '',
    phone: '',
    email: '',
    message: ''
  })
  
  const [showSuccess, setShowSuccess] = useState(false)
  
  const {
    handleSubmit,
    isSubmitting,
    errors,
    clearErrors,
    validateForm
  } = useFormHandler({
    formData,
    formType: 'contact',
    onSuccess: () => {
      setShowSuccess(true)
      // Reset form after successful submission
      setFormData({
        nama: '',
        phone: '',
        email: '',
        message: ''
      })
    },
    onError: (error) => {
      console.error('Form submission error:', error)
      setShowSuccess(false)
    },
    onReset: () => {
      setFormData({
        nama: '',
        phone: '',
        email: '',
        message: ''
      })
    }
  })
  
  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      clearErrors()
    }
    
    // Hide success message when user starts editing
    if (showSuccess) {
      setShowSuccess(false)
    }
  }
  
  const handleValidateClick = () => {
    const isValid = validateForm()
    if (isValid) {
      setShowSuccess(true)
    }
  }
  
  const handleClearForm = () => {
    setFormData({
      nama: '',
      phone: '',
      email: '',
      message: ''
    })
    clearErrors()
    setShowSuccess(false)
  }
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Demo Form Validasi Honda Permata
        </h2>
        <p className="text-gray-600">
          Form ini mendemonstrasikan sistem validasi lengkap dengan:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
          <li>Validasi field dengan pesan error dalam Bahasa Indonesia</li>
          <li>Indikator visual untuk field yang error</li>
          <li>Komponen display error yang terstruktur</li>
          <li>Sanitasi input untuk keamanan</li>
          <li>Integrasi WhatsApp untuk lead generation</li>
        </ul>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Summary */}
        {errors.length > 0 && (
          <FormErrorSummary
            errors={errors}
            title="Terdapat kesalahan pada form:"
            dismissible
            onDismiss={clearErrors}
          />
        )}
        
        {/* Success Message */}
        {showSuccess && (
          <FormSuccess
            message="Form berhasil divalidasi! Anda akan diarahkan ke WhatsApp."
            dismissible
            onDismiss={() => setShowSuccess(false)}
          />
        )}
        
        {/* Name Field */}
        <InputWithError
          label="Nama Lengkap"
          required
          value={formData.nama}
          onChange={handleInputChange('nama')}
          placeholder="Masukkan nama lengkap Anda"
          helpText="Nama minimal 2 karakter, hanya huruf dan spasi"
          error={errors.find(e => e.includes('Nama')) || null}
        />
        
        {/* Phone Field */}
        <InputWithError
          label="Nomor HP"
          required
          type="tel"
          value={formData.phone}
          onChange={handleInputChange('phone')}
          placeholder="081234567890 atau +6281234567890"
          helpText="Format: +62xxx, 62xxx, atau 0xxx (10-15 digit)"
          error={errors.find(e => e.includes('HP') || e.includes('Nomor')) || null}
        />
        
        {/* Email Field */}
        <InputWithError
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleInputChange('email')}
          placeholder="nama@example.com"
          helpText="Email bersifat opsional"
          error={errors.find(e => e.includes('Email') || e.includes('email')) || null}
        />
        
        {/* Message Field */}
        <TextareaWithError
          label="Pesan"
          value={formData.message}
          onChange={handleInputChange('message')}
          placeholder="Tuliskan pesan atau pertanyaan Anda tentang Honda..."
          helpText="Pesan bersifat opsional, maksimal 1000 karakter"
          rows={4}
          error={errors.find(e => e.includes('Pesan')) || null}
        />
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim ke WhatsApp'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={handleValidateClick}
            disabled={isSubmitting}
          >
            Validasi Form
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            onClick={handleClearForm}
            disabled={isSubmitting}
          >
            Bersihkan
          </Button>
        </div>
        
        {/* Form State Info */}
        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
          <strong>Status Form:</strong>
          <ul className="mt-1 space-y-1">
            <li>• Submitting: {isSubmitting ? 'Ya' : 'Tidak'}</li>
            <li>• Jumlah Error: {errors.length}</li>
            <li>• Field Terisi: {Object.values(formData).filter(v => typeof v === 'string' && v.trim()).length}/4</li>
            <li>• Success State: {showSuccess ? 'Ya' : 'Tidak'}</li>
          </ul>
        </div>
      </form>
      
      {/* Test Cases Section */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-3">
          🧪 Test Cases untuk Validasi
        </h3>
        <div className="text-sm text-blue-800 space-y-2">
          <div>
            <strong>Nama Invalid:</strong> &quot;&quot;, &quot;A&quot;, &quot;John123&quot;, &quot;A&quot;.repeat(101)
          </div>
          <div>
            <strong>HP Invalid:</strong> &quot;&quot;, &quot;123&quot;, &quot;081234&quot;, &quot;abcd1234567890&quot;
          </div>
          <div>
            <strong>Email Invalid:</strong> &quot;invalid-email&quot;, &quot;@example.com&quot;, &quot;user@&quot;
          </div>
          <div>
            <strong>Pesan Invalid:</strong> &quot;A&quot;.repeat(1001)
          </div>
        </div>
      </div>
    </div>
  )
}

export default ValidationDemoForm