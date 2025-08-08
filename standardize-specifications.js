// Script untuk standardisasi spesifikasi di semua halaman mobil
// Format standar yang akan diterapkan:

const standardSpecificationFormat = `
<div className="space-y-6 mt-12 text-left">
  <h3 className="text-xl font-bold text-honda-gray-dark text-center mb-4">Spesifikasi Utama</h3>
  <div className="space-y-2">
    {variant.specs.map((spec, specIndex) => (
      <div key={specIndex} className="py-2 border-b border-honda-gray-light flex items-start">
        <span className="text-honda-red-primary mr-2 mt-1">•</span>
        <span className="text-honda-gray-dark text-sm font-semibold leading-6">{spec}</span>
      </div>
    ))}
  </div>
</div>
`;

// Standar yang akan diterapkan:
// 1. Menggunakan bullet point (•) dengan warna honda-red-primary
// 2. Text align left
// 3. Menggunakan text-sm untuk ukuran font yang konsisten
// 4. Menggunakan leading-6 untuk line-height yang konsisten
// 5. Menggunakan font-semibold untuk ketebalan font yang konsisten
// 6. Spacing yang konsisten: space-y-6 untuk container, space-y-2 untuk items
// 7. Padding py-2 untuk setiap item
// 8. Border bottom untuk pemisah antar item

console.log("Standar format spesifikasi telah didefinisikan");