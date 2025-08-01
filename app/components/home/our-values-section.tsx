"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function OurValuesSection() {
  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Nilai-Nilai Kami di Honda Permata Serpong
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
              Lima pilar utama yang menjadi fondasi pelayanan terbaik kami untuk setiap customer Honda
            </p>
          </div>

          {/* Values Accordion */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem
              value="kepercayaan-kredibilitas"
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border-0 overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-honda-red-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                      Kepercayaan & Kredibilitas
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Dealer resmi Honda terpercaya dengan garansi resmi
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="pl-16">
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    Kami adalah dealer resmi Honda yang sudah teruji. Setiap unit Honda dijamin keasliannya dengan
                    garansi resmi Honda Motor Indonesia. Kepercayaan customer adalah aset paling berharga bagi kami, dan
                    kami berkomitmen menjaga reputasi ini dengan memberikan pelayanan terbaik dan produk berkualitas
                    tinggi.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="pelayanan-personal"
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border-0 overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-honda-red-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                      Pelayanan Personal Terbaik
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Tim berpengalaman 8+ tahun siap melayani dengan hati
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="pl-16">
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    Di sini, kamu bukan cuma angka. Saya, Elon Musk, dan tim sales senior lainnya punya pengalaman
                    rata-rata 8+ tahun, siap melayani dengan hati. Kami memahami bahwa setiap customer memiliki
                    kebutuhan unik, dan kami berkomitmen memberikan solusi yang tepat untuk setiap situasi dengan
                    pendekatan personal yang hangat dan profesional.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="proses-fleksibel"
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border-0 overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-honda-red-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                      Proses Fleksibel & Mudah
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Cash, kredit, DP ringan, atau tukar tambah - semua bisa diatur
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="pl-16">
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    Mau cash maupun kredit, DP ringan atau tukar tambah, semua bisa diatur! Kami punya kemitraan
                    strategis dengan banyak lembaga pembiayaan terpercaya. Proses approval yang cepat dengan tingkat
                    persetujuan hingga 90%, serta berbagai pilihan tenor dan bunga kompetitif yang disesuaikan dengan
                    kemampuan finansial Anda.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="inovasi-digital"
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border-0 overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-honda-red-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                      Inovasi Digital Terdepan
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Teknologi modern untuk kemudahan customer
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="pl-16">
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    Booking service online, tracking perbaikan via mobile app, sampai virtual showroom 360° – semua demi
                    kenyamananmu. Kami terus berinovasi menghadirkan teknologi terdepan untuk memberikan pengalaman
                    customer yang seamless dan modern. WhatsApp Business, sistem CRM canggih, dan platform digital
                    terintegrasi memudahkan setiap interaksi dengan kami.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="after-sales"
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border-0 overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-honda-red-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                      After Sales Tanpa Batas
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Layanan berkelanjutan setelah pembelian
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="pl-16">
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    Layanan kami nggak berhenti setelah kamu bawa pulang Honda impian. Kami siap bantu klaim asuransi,
                    perpanjangan STNK, dan service berkala. Tim after-sales kami tersedia 24/7 untuk memastikan Honda
                    Anda selalu dalam kondisi prima. Dari maintenance rutin hingga emergency roadside assistance, kami
                    adalah partner terpercaya dalam perjalanan berkendara Anda.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Call to Action */}
          <div className="text-center mt-12 md:mt-16">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              Siap merasakan pengalaman berbeda bersama Honda Permata Serpong?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/6281234567890"
                className="inline-flex items-center justify-center px-8 py-3 bg-honda-red-primary text-white font-semibold rounded-lg hover:bg-honda-red-dark transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                Hubungi Kami
              </a>
              <a
                href="/kontak"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-honda-red-primary text-honda-red-primary font-semibold rounded-lg hover:bg-honda-red-primary hover:text-white transition-colors"
              >
                Kunjungi Showroom
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
