export function IntroductionSection() {
  const textBlocks = [
    {
      content:
        "All New Honda CR-V hadir dengan desain premium yang lebih gagah, teknologi canggih, dan performa tangguh. SUV mewah ini siap memberikan kenyamanan dan pengalaman petualangan tak terlupakan bagi keluarga Anda.",
    },
    {
      content:
        "Tersedia dalam pilihan mesin 1.5L VTEC Turbo dan 2.0L e:HEV Hybrid, CR-V terbaru menawarkan kombinasi sempurna antara tenaga responsif dan efisiensi bahan bakar yang superior.",
    },
    {
      content:
        "Interior yang sangat luas dan fleksibel dengan konfigurasi 7-seater (untuk varian tertentu) memberikan kenyamanan maksimal untuk seluruh penumpang, dilengkapi material berkualitas tinggi dan fitur-fitur modern.",
    },
    {
      content:
        "Dilengkapi dengan Honda SENSING generasi terbaru dan berbagai fitur keselamatan pasif, All New CR-V memastikan perlindungan menyeluruh di setiap perjalanan.",
    },
    {
      content:
        "All New Honda CR-V adalah pilihan ideal bagi Anda yang menginginkan SUV premium dengan gaya, performa, dan teknologi terdepan untuk mendukung gaya hidup aktif dan modern.",
    },
  ]

  return (
    <section id="overview" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-honda-red-primary mb-12 text-center">
          All New Honda CR-V: SUV Premium, Teknologi Canggih, Kenyamanan Maksimal
        </h2>

        <div className="space-y-6">
          {textBlocks.map((block, index) => (
            <div key={index} className="text-honda-gray leading-relaxed">
              <p className="text-center">{block.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
