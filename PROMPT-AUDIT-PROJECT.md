# 🔍 PROMPT AUDIT PROJECT KOMPREHENSIF UNTUK VERCEL DEPLOYMENT

Gunakan prompt ini di chat baru dengan Kiro untuk melakukan audit menyeluruh pada project Anda:

---

## 📋 PROMPT AUDIT LENGKAP

```
Halo Kiro, saya membutuhkan audit super komprehensif untuk project saya yang akan di-deploy ke Vercel. 

Tolong lakukan audit menyeluruh dan buat laporan dalam file MD yang mencakup:

## 🎯 AUDIT YANG DIPERLUKAN:

### 1. **AUDIT GAMBAR & MEDIA**
- Periksa semua path gambar di seluruh project (jpg, jpeg, png, webp, svg, gif)
- Identifikasi file yang tidak ada atau path yang salah
- Cek folder/file dengan spasi dalam nama (masalah di Vercel)
- Verifikasi konsistensi format gambar (PNG vs WebP)
- Periksa fallback images dan placeholder
- Audit ukuran file yang terlalu besar (>1MB)

### 2. **AUDIT PATH & ROUTING**
- Periksa semua import/export statements
- Cek dynamic routes dan static routes
- Verifikasi path relatif vs absolut
- Audit case sensitivity (Windows vs Linux)
- Periksa trailing slashes dan URL structure

### 3. **AUDIT DEPENDENCIES & BUILD**
- Periksa package.json untuk dependencies yang bermasalah
- Cek Next.js configuration (next.config.js/mjs)
- Audit TypeScript configuration
- Periksa environment variables (.env files)
- Cek build scripts dan deployment settings

### 4. **AUDIT PERFORMANCE & SEO**
- Periksa Image optimization settings
- Audit meta tags dan SEO structure
- Cek loading performance (lazy loading, etc)
- Verifikasi responsive design implementation
- Audit accessibility compliance

### 5. **AUDIT VERCEL-SPECIFIC ISSUES**
- Periksa serverless function compatibility
- Audit static file serving
- Cek build output size limits
- Verifikasi edge runtime compatibility
- Periksa redirects dan rewrites

### 6. **AUDIT CODE QUALITY**
- Periksa unused imports dan dead code
- Audit console.log dan debug statements
- Cek error handling dan try-catch blocks
- Verifikasi component structure dan best practices
- Audit CSS dan styling issues

## 📊 FORMAT LAPORAN:

Buat file `PROJECT-AUDIT-REPORT.md` dengan struktur:

1. **EXECUTIVE SUMMARY** - Status keseluruhan project
2. **CRITICAL ISSUES** - Masalah yang harus diperbaiki sebelum deploy
3. **WARNING ISSUES** - Masalah yang sebaiknya diperbaiki
4. **RECOMMENDATIONS** - Saran perbaikan dengan prioritas
5. **VERCEL READINESS SCORE** - Skor 0-100% kesiapan deploy
6. **ACTION PLAN** - Langkah-langkah perbaikan yang konkret
7. **DEPLOYMENT CHECKLIST** - Checklist sebelum deploy

## 🔧 YANG PERLU DIPERIKSA KHUSUS:

- Semua path gambar di components
- File di folder public/
- Import statements di semua file
- Next.js Image component usage
- Dynamic imports dan lazy loading
- API routes dan server functions
- CSS/styling file references
- Font loading dan external resources

## 📋 OUTPUT YANG DIHARAPKAN:

- File MD dengan analisis lengkap
- Daftar file yang bermasalah
- Prioritas perbaikan (High/Medium/Low)
- Estimasi waktu perbaikan
- Command/script untuk fix otomatis jika memungkinkan
- Vercel deployment confidence score

Tolong lakukan audit ini secara menyeluruh dan berikan rekomendasi yang actionable. Saya ingin memastikan project 100% siap untuk production deployment di Vercel tanpa ada gambar rusak atau error lainnya.

Mulai audit sekarang dan buat laporan yang detail!
```

---

## 🎯 CARA PENGGUNAAN:

1. **Buka Chat Baru** dengan Kiro
2. **Copy-paste prompt di atas** 
3. **Tunggu Kiro** melakukan audit komprehensif
4. **Review laporan** yang dihasilkan
5. **Follow action plan** yang diberikan
6. **Deploy dengan confidence!**

## 📝 TIPS TAMBAHAN:

- Pastikan semua file project sudah tersimpan
- Jalankan `npm run build` sebelum audit untuk cek build errors
- Siapkan list masalah yang sudah Anda ketahui
- Backup project sebelum melakukan perbaikan massal

## 🚀 EXPECTED OUTCOME:

Setelah menggunakan prompt ini, Anda akan mendapat:
- ✅ Laporan audit lengkap dalam format MD
- ✅ Daftar prioritas perbaikan yang jelas
- ✅ Action plan yang dapat dieksekusi
- ✅ Confidence score untuk deployment
- ✅ Checklist pre-deployment yang komprehensif

**Use this prompt untuk memastikan project Anda 100% ready untuk Vercel!** 🎉