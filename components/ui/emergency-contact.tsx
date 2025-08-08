/**
 * Emergency Contact Information Component
 * Displays fallback contact methods when primary systems fail
 */

import React from 'react'
import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react'

interface EmergencyContactProps {
  reason?: 'form_error' | 'whatsapp_unavailable' | 'system_maintenance' | 'general'
  showTitle?: boolean
  compact?: boolean
  className?: string
}

const EmergencyContact: React.FC<EmergencyContactProps> = ({
  reason = 'general',
  showTitle = true,
  compact = false,
  className = ''
}) => {
  const getReasonMessage = (reason: string): string => {
    const messages = {
      form_error: 'Maaf, terjadi kesalahan pada formulir. Silakan hubungi kami langsung:',
      whatsapp_unavailable: 'WhatsApp sementara tidak tersedia. Hubungi kami melalui:',
      system_maintenance: 'Sistem sedang dalam pemeliharaan. Hubungi kami di:',
      general: 'Hubungi kami langsung untuk konsultasi:'
    }
    return messages[reason as keyof typeof messages] || messages.general
  }

  const contactInfo = {
    whatsapp: {
      number: '6282297098292',
      display: '+62 822-9709-8292',
      url: 'https://wa.me/6282297098292'
    },
    phone: {
      number: '02129709292',
      display: '(021) 2970-9292'
    },
    email: 'info@hondapermataserpong.com',
    address: 'Jl. Raya Serpong, Tangerang Selatan',
    hours: 'Senin - Sabtu: 08:00 - 17:00'
  }

  if (compact) {
    return (
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
        <p className="text-sm text-blue-800 mb-3">{getReasonMessage(reason)}</p>
        <div className="flex flex-wrap gap-4">
          <a
            href={contactInfo.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium"
          >
            <MessageCircle size={16} />
            {contactInfo.whatsapp.display}
          </a>
          <a
            href={`tel:${contactInfo.phone.number}`}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <Phone size={16} />
            {contactInfo.phone.display}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 ${className}`}>
      {showTitle && (
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Hubungi Honda Permata Serpong
        </h3>
      )}
      
      <p className="text-gray-700 mb-4">{getReasonMessage(reason)}</p>
      
      <div className="space-y-4">
        {/* WhatsApp */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">WhatsApp</h4>
            <p className="text-gray-600 text-sm mb-2">Chat langsung dengan tim kami</p>
            <a
              href={contactInfo.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <MessageCircle size={16} />
              {contactInfo.whatsapp.display}
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Phone className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">Telepon</h4>
            <p className="text-gray-600 text-sm mb-2">Hubungi showroom kami</p>
            <a
              href={`tel:${contactInfo.phone.number}`}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Phone size={16} />
              {contactInfo.phone.display}
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Mail className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">Email</h4>
            <p className="text-gray-600 text-sm mb-2">Kirim pertanyaan Anda</p>
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              <Mail size={16} />
              {contactInfo.email}
            </a>
          </div>
        </div>

        {/* Location & Hours */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <h5 className="font-medium text-gray-900 text-sm">Alamat</h5>
                <p className="text-gray-600 text-sm">{contactInfo.address}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <h5 className="font-medium text-gray-900 text-sm">Jam Operasional</h5>
                <p className="text-gray-600 text-sm">{contactInfo.hours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmergencyContact

/**
 * Emergency Contact Modal for critical failures
 */
interface EmergencyContactModalProps {
  isOpen: boolean
  onClose: () => void
  reason?: 'form_error' | 'whatsapp_unavailable' | 'system_maintenance' | 'general' | undefined
}

export const EmergencyContactModal: React.FC<EmergencyContactModalProps> = ({
  isOpen,
  onClose,
  reason = 'general'
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Hubungi Kami</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              aria-label="Tutup"
            >
              ×
            </button>
          </div>
          
          <EmergencyContact reason={reason} showTitle={false} />
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Hook for emergency contact functionality
 */
export const useEmergencyContact = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [modalReason, setModalReason] = React.useState<EmergencyContactProps['reason'] | undefined>('general')

  const showEmergencyContact = (reason?: EmergencyContactProps['reason']) => {
    setModalReason(reason || 'general')
    setIsModalOpen(true)
  }

  const hideEmergencyContact = () => {
    setIsModalOpen(false)
  }

  const EmergencyContactModalComponent = () => (
    <EmergencyContactModal
      isOpen={isModalOpen}
      onClose={hideEmergencyContact}
      reason={modalReason}
    />
  )

  return {
    showEmergencyContact,
    hideEmergencyContact,
    EmergencyContactModal: EmergencyContactModalComponent
  }
}