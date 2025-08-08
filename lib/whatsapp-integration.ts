/**
 * WhatsApp Integration System for Honda Permata
 * Handles form data formatting and WhatsApp URL generation
 */

// Form data interfaces and type definitions
export interface BaseFormData {
  nama?: string;
  phone?: string;
  email?: string;
  message?: string;
  [key: string]: unknown;
}

export interface ContactFormData extends BaseFormData {
  service?: string;
}

export interface TestDriveFormData extends BaseFormData {
  model?: string;
  carModel?: string; // For compatibility with existing forms
  preferredDate?: string;
  preferredTime?: string;
  province?: string;
  city?: string;
  dealer?: string;
  purchasePlan?: string;
}

export interface ServiceFormData extends BaseFormData {
  serviceType?: string;
  vehicleModel?: string;
  licensePlate?: string;
}

export type FormData = ContactFormData | TestDriveFormData | ServiceFormData;

export interface WhatsAppConfig {
  number: string;
  baseUrl: string;
}

export class WhatsAppIntegrationError extends Error {
  constructor(
    public reason: 'URL_GENERATION' | 'INVALID_CONFIG' | 'INVALID_DATA' | 'WINDOW_BLOCKED' | 'NETWORK_ERROR' | 'POPUP_BLOCKED',
    message: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'WhatsAppIntegrationError';
  }
}

/**
 * WhatsApp Integration Class
 * Handles formatting form data into WhatsApp messages and generating URLs
 */
export class WhatsAppIntegrator {
  private config: WhatsAppConfig;

  constructor(config: WhatsAppConfig) {
    this.validateConfig(config);
    this.config = config;
  }

  /**
   * Validates the WhatsApp configuration
   */
  private validateConfig(config: WhatsAppConfig): void {
    if (!config.number || !config.baseUrl) {
      throw new WhatsAppIntegrationError(
        'INVALID_CONFIG',
        'WhatsApp number and base URL are required'
      );
    }

    // Validate phone number format (Indonesian format)
    const phoneRegex = /^(\+?62|0)[0-9]{9,13}$/;
    if (!phoneRegex.test(config.number.replace(/[-\s]/g, ''))) {
      throw new WhatsAppIntegrationError(
        'INVALID_CONFIG',
        'Invalid WhatsApp number format'
      );
    }
  }

  /**
   * Get user-friendly field labels in Indonesian
   */
  private getFieldLabel(key: string): string {
    const labelMap: Record<string, string> = {
      nama: 'Nama',
      fullName: 'Nama Lengkap',
      phone: 'No. HP',
      mobile: 'No. HP',
      email: 'Email',
      message: 'Pesan',
      service: 'Layanan',
      model: 'Model Honda',
      carModel: 'Model Honda',
      preferredDate: 'Tanggal Pilihan',
      preferredTime: 'Waktu Pilihan',
      serviceType: 'Jenis Layanan',
      vehicleModel: 'Model Kendaraan',
      licensePlate: 'Nomor Polisi',
      province: 'Provinsi',
      city: 'Kota',
      dealer: 'Dealer',
      purchasePlan: 'Rencana Pembelian'
    };
    
    return labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
  }

  /**
   * Format form data into a readable WhatsApp message
   */
  public formatMessage(formData: FormData, formType: string): string {
    if (!formData || typeof formData !== 'object') {
      throw new WhatsAppIntegrationError(
        'INVALID_DATA',
        'Form data must be a valid object'
      );
    }

    const greeting = "Halo, saya ingin konsultasi tentang Honda.";
    const separator = "\n";
    
    let message = greeting + separator + separator;
    
    // Add form context with proper formatting
    const formTypeLabels: Record<string, string> = {
      contact: 'Formulir Kontak',
      'test-drive': 'Booking Test Drive',
      service: 'Layanan Service',
      general: 'Formulir Umum'
    };
    
    const formLabel = formTypeLabels[formType] || 'Formulir';
    message += `📋 Sumber: ${formLabel}${separator}${separator}`;
    
    // Add form fields dynamically with validation
    const processedFields: string[] = [];
    
    Object.entries(formData).forEach(([key, value]) => {
      if (value && typeof value === 'string' && value.trim()) {
        const label = this.getFieldLabel(key);
        const cleanValue = value.trim();
        
        // Add appropriate emoji for different field types
        let emoji = '';
        switch (key) {
          case 'nama':
            emoji = '👤 ';
            break;
          case 'phone':
            emoji = '📱 ';
            break;
          case 'email':
            emoji = '📧 ';
            break;
          case 'model':
            emoji = '🚗 ';
            break;
          case 'service':
          case 'serviceType':
            emoji = '🔧 ';
            break;
          case 'message':
            emoji = '💬 ';
            break;
          default:
            emoji = '• ';
        }
        
        processedFields.push(`${emoji}${label}: ${cleanValue}`);
      }
    });
    
    if (processedFields.length === 0) {
      throw new WhatsAppIntegrationError(
        'INVALID_DATA',
        'No valid form data provided'
      );
    }
    
    message += processedFields.join(separator);
    message += separator + separator;
    message += "Terima kasih! 🙏";
    
    return message.trim();
  }

  /**
   * Generate WhatsApp URL with proper encoding
   */
  public generateWhatsAppUrl(formData: FormData, formType: string): string {
    try {
      const message = this.formatMessage(formData, formType);
      const encodedMessage = encodeURIComponent(message);
      
      // Clean phone number for URL (remove + and spaces)
      const cleanNumber = this.config.number.replace(/^\+/, '').replace(/[-\s]/g, '');
      
      const url = `${this.config.baseUrl}/${cleanNumber}?text=${encodedMessage}`;
      
      // Validate URL length (WhatsApp has limits)
      if (url.length > 2000) {
        throw new WhatsAppIntegrationError(
          'URL_GENERATION',
          'Generated URL is too long for WhatsApp'
        );
      }
      
      return url;
    } catch (error) {
      if (error instanceof WhatsAppIntegrationError) {
        throw error;
      }
      
      throw new WhatsAppIntegrationError(
        'URL_GENERATION',
        `Failed to generate WhatsApp URL: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get the configured WhatsApp number
   */
  public getWhatsAppNumber(): string {
    return this.config.number;
  }

  /**
   * Get the configured base URL
   */
  public getBaseUrl(): string {
    return this.config.baseUrl;
  }

  /**
   * Detect if popup was blocked by browser
   */
  public static detectPopupBlocked(windowRef: Window | null): boolean {
    if (!windowRef) return true;
    
    try {
      // Check if window was closed immediately (popup blocker)
      if (windowRef.closed) return true;
      
      // Check if we can access the window location (same-origin policy)
      // This will throw an error if popup was blocked
      void windowRef.location;
      return false;
    } catch (_error) {
      // If we can't access the window, it might be blocked
      return true;
    }
  }

  /**
   * Generate fallback WhatsApp URL for direct navigation
   */
  public generateFallbackUrl(formData: FormData, formType: string): string {
    try {
      // Generate a simplified message for fallback
      const simplifiedMessage = this.generateSimplifiedMessage(formData, formType);
      const encodedMessage = encodeURIComponent(simplifiedMessage);
      const cleanNumber = this.config.number.replace(/^\+/, '').replace(/[-\s]/g, '');
      
      return `${this.config.baseUrl}/${cleanNumber}?text=${encodedMessage}`;
    } catch (_error) {
      // Ultimate fallback - just the WhatsApp number
      const cleanNumber = this.config.number.replace(/^\+/, '').replace(/[-\s]/g, '');
      return `${this.config.baseUrl}/${cleanNumber}`;
    }
  }

  /**
   * Generate simplified message for fallback scenarios
   */
  private generateSimplifiedMessage(formData: FormData, _formType: string): string {
    const greeting = "Halo, saya ingin konsultasi tentang Honda.";
    const separator = "\n";
    
    let message = greeting + separator;
    
    // Add only essential fields to keep message short
    const essentialFields = ['nama', 'phone', 'model', 'carModel'];
    const processedFields: string[] = [];
    
    essentialFields.forEach(key => {
      const value = formData[key];
      if (value && typeof value === 'string' && value.trim()) {
        const label = this.getFieldLabel(key);
        processedFields.push(`${label}: ${value.trim()}`);
      }
    });
    
    if (processedFields.length > 0) {
      message += separator + processedFields.join(separator);
    }
    
    return message.trim();
  }

  /**
   * Get direct contact information for manual fallback
   */
  public getDirectContactInfo(): { phone: string; whatsappUrl: string } {
    const cleanNumber = this.config.number.replace(/^\+/, '').replace(/[-\s]/g, '');
    return {
      phone: this.config.number,
      whatsappUrl: `${this.config.baseUrl}/${cleanNumber}`
    };
  }

  /**
   * Test WhatsApp URL accessibility
   */
  public async testWhatsAppAccess(): Promise<boolean> {
    try {
      // Try to create a test URL
      const testUrl = `${this.config.baseUrl}/${this.config.number.replace(/^\+/, '').replace(/[-\s]/g, '')}`;
      
      // In browser environment, we can't easily test network connectivity
      // So we'll just validate the URL format
      const url = new URL(testUrl);
      return url.protocol === 'https:' && url.hostname === 'wa.me';
    } catch (_error) {
      return false;
    }
  }
}

/**
 * Factory function to create WhatsApp integrator with default config
 */
export function createWhatsAppIntegrator(customConfig?: Partial<WhatsAppConfig>): WhatsAppIntegrator {
  const defaultConfig: WhatsAppConfig = {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6282297098292',
    baseUrl: 'https://wa.me'
  };
  
  const config = { ...defaultConfig, ...customConfig };
  
  return new WhatsAppIntegrator(config);
}

/**
 * Fallback action types for different error scenarios
 */
export interface FallbackAction {
  type: 'DIRECT_URL' | 'MANUAL_CONTACT' | 'SIMPLIFIED_MESSAGE' | 'COPY_TO_CLIPBOARD';
  url?: string;
  message?: string;
  contactInfo?: { phone: string; whatsappUrl: string };
}

/**
 * Comprehensive fallback handler for WhatsApp integration failures
 */
export class WhatsAppFallbackHandler {
  private integrator: WhatsAppIntegrator;
  private toastFunction: ((options: unknown) => void) | undefined;

  constructor(integrator: WhatsAppIntegrator, toastFunction?: (options: unknown) => void) {
    this.integrator = integrator;
    this.toastFunction = toastFunction;
  }

  /**
   * Handle WhatsApp integration errors with appropriate fallback actions
   */
  public async handleError(
    error: WhatsAppIntegrationError,
    formData: FormData,
    formType: string
  ): Promise<FallbackAction> {
    console.error('WhatsApp integration error:', error);

    switch (error.reason) {
      case 'URL_GENERATION':
        return this.handleUrlGenerationError(formData, formType);
      
      case 'WINDOW_BLOCKED':
      case 'POPUP_BLOCKED':
        return this.handlePopupBlockedError(formData, formType);
      
      case 'NETWORK_ERROR':
        return this.handleNetworkError();
      
      case 'INVALID_CONFIG':
        return this.handleConfigError();
      
      case 'INVALID_DATA':
        return this.handleDataError();
      
      default:
        return this.handleGenericError(formData, formType);
    }
  }

  /**
   * Handle URL generation failures
   */
  private handleUrlGenerationError(formData: FormData, formType: string): FallbackAction {
    try {
      // Try to generate a simplified fallback URL
      const fallbackUrl = this.integrator.generateFallbackUrl(formData, formType);
      
      this.showToast({
        title: "Menggunakan Mode Sederhana",
        description: "Anda akan diarahkan ke WhatsApp dengan pesan sederhana.",
        variant: "default"
      });

      return {
        type: 'SIMPLIFIED_MESSAGE',
        url: fallbackUrl,
        message: "Fallback URL generated successfully"
      };
    } catch (_fallbackError) {
      return this.handleManualContactFallback();
    }
  }

  /**
   * Handle popup blocker scenarios
   */
  private handlePopupBlockedError(formData: FormData, formType: string): FallbackAction {
    try {
      const directUrl = this.integrator.generateWhatsAppUrl(formData, formType);
      
      this.showToast({
        title: "Popup Diblokir",
        description: "Anda akan diarahkan langsung ke WhatsApp.",
        variant: "default"
      });

      // Try direct navigation as fallback
      setTimeout(() => {
        window.location.href = directUrl;
      }, 1000);

      return {
        type: 'DIRECT_URL',
        url: directUrl,
        message: "Direct navigation initiated"
      };
    } catch (_directError) {
      return this.handleManualContactFallback();
    }
  }

  /**
   * Handle network connectivity issues
   */
  private handleNetworkError(): FallbackAction {
    const contactInfo = this.integrator.getDirectContactInfo();
    
    this.showToast({
      title: "Koneksi Bermasalah",
      description: `Silakan hubungi langsung: ${contactInfo.phone}`,
      variant: "destructive"
    });

    return {
      type: 'MANUAL_CONTACT',
      contactInfo,
      message: "Network error - manual contact required"
    };
  }

  /**
   * Handle configuration errors
   */
  private handleConfigError(): FallbackAction {
    this.showToast({
      title: "Konfigurasi Bermasalah",
      description: "Silakan hubungi kami langsung via telepon.",
      variant: "destructive"
    });

    return {
      type: 'MANUAL_CONTACT',
      contactInfo: {
        phone: '6282297098292', // Fallback number
        whatsappUrl: 'https://wa.me/6282297098292'
      },
      message: "Configuration error - using fallback contact"
    };
  }

  /**
   * Handle invalid data errors
   */
  private handleDataError(): FallbackAction {
    this.showToast({
      title: "Data Tidak Valid",
      description: "Silakan periksa kembali data yang diisi.",
      variant: "destructive"
    });

    return {
      type: 'MANUAL_CONTACT',
      contactInfo: this.integrator.getDirectContactInfo(),
      message: "Invalid data - manual contact suggested"
    };
  }

  /**
   * Handle generic/unknown errors
   */
  private handleGenericError(formData: FormData, formType: string): FallbackAction {
    // Try multiple fallback strategies
    try {
      const fallbackUrl = this.integrator.generateFallbackUrl(formData, formType);
      
      this.showToast({
        title: "Terjadi Kesalahan",
        description: "Mencoba dengan metode alternatif...",
        variant: "default"
      });

      return {
        type: 'SIMPLIFIED_MESSAGE',
        url: fallbackUrl,
        message: "Generic error - using simplified fallback"
      };
    } catch (_fallbackError) {
      return this.handleManualContactFallback();
    }
  }

  /**
   * Ultimate fallback - manual contact information
   */
  private handleManualContactFallback(): FallbackAction {
    const contactInfo = this.integrator.getDirectContactInfo();
    
    this.showToast({
      title: "Hubungi Kami Langsung",
      description: `WhatsApp: ${contactInfo.phone}`,
      variant: "default"
    });

    return {
      type: 'MANUAL_CONTACT',
      contactInfo,
      message: "All automated methods failed - manual contact required"
    };
  }

  /**
   * Show toast notification if toast function is available
   */
  private showToast(options: unknown): void {
    if (this.toastFunction) {
      this.toastFunction(options);
    }
  }

  /**
   * Test all fallback mechanisms
   */
  public async testFallbackMechanisms(formData: FormData, formType: string): Promise<{
    urlGeneration: boolean;
    fallbackUrl: boolean;
    directContact: boolean;
    popupDetection: boolean;
  }> {
    const results = {
      urlGeneration: false,
      fallbackUrl: false,
      directContact: false,
      popupDetection: false
    };

    // Test URL generation
    try {
      this.integrator.generateWhatsAppUrl(formData, formType);
      results.urlGeneration = true;
    } catch (error) {
      console.warn('URL generation test failed:', error);
    }

    // Test fallback URL generation
    try {
      this.integrator.generateFallbackUrl(formData, formType);
      results.fallbackUrl = true;
    } catch (error) {
      console.warn('Fallback URL test failed:', error);
    }

    // Test direct contact info
    try {
      const contactInfo = this.integrator.getDirectContactInfo();
      results.directContact = !!(contactInfo.phone && contactInfo.whatsappUrl);
    } catch (error) {
      console.warn('Direct contact test failed:', error);
    }

    // Test popup detection (simulate)
    try {
      const mockWindow = { closed: true } as Window;
      results.popupDetection = WhatsAppIntegrator.detectPopupBlocked(mockWindow);
    } catch (error) {
      console.warn('Popup detection test failed:', error);
    }

    return results;
  }
}
