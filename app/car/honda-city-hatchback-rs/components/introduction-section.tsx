export function IntroductionSection() {
  const textBlocks = [
    {
      content:
        "Honda City Hatchback RS hadir dengan desain sporty yang memukau dan kepraktisan hatchback yang luar biasa. Kombinasi sempurna antara gaya urban yang dinamis dengan fungsionalitas sehari-hari.",
    },
    {
      content:
        "Mesin i-VTEC 1.5L memberikan performa yang responsif dan efisiensi bahan bakar yang optimal. Cocok untuk mobilitas perkotaan yang padat maupun perjalanan luar kota yang nyaman.",
    },
    {
      content:
        "Interior yang luas dengan konfigurasi fleksibel memberikan ruang maksimal untuk penumpang dan barang. Desain modern dengan teknologi infotainment canggih untuk pengalaman berkendara yang menyenangkan.",
    },
    {
      content:
        "Fitur keselamatan Honda SENSING dan berbagai teknologi bantuan berkendara memastikan perlindungan optimal dalam setiap perjalanan, memberikan ketenangan pikiran untuk seluruh keluarga.",
    },
    {
      content:
        "Honda City Hatchback RS adalah pilihan cerdas untuk mereka yang menginginkan mobil stylish, praktis, dan berteknologi canggih dalam satu paket yang sempurna.",
    },
  ]

  return (
    <section id="overview" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-honda-red-primary mb-12 text-center">
          Honda City Hatchback RS: Sporty, Praktis, Teknologi Canggih
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
