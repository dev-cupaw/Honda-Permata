export function IntroductionSection() {
  const textBlocks = [
    {
      content:
        "Honda Civic RS hadir dengan desain sporty yang memukau dan performa turbo yang bertenaga. Sedan premium ini menggabungkan gaya hidup dinamis dengan teknologi canggih untuk pengalaman berkendara yang tak terlupakan.",
    },
    {
      content:
        "Mesin VTEC Turbo 1.5L memberikan tenaga responsif dan efisiensi bahan bakar yang optimal. Setiap akselerasi terasa halus namun bertenaga, cocok untuk berkendara di perkotaan maupun perjalanan jauh.",
    },
    {
      content:
        "Interior premium dengan material berkualitas tinggi dan teknologi infotainment terdepan menciptakan kenyamanan maksimal. Desain cockpit yang ergonomis memberikan pengalaman berkendara yang menyenangkan.",
    },
    {
      content:
        "Dilengkapi Honda SENSING dan berbagai fitur keselamatan aktif, Civic RS memastikan perlindungan menyeluruh untuk pengemudi dan penumpang dalam setiap perjalanan.",
    },
    {
      content:
        "Honda Civic RS bukan hanya sedan, tetapi statement gaya hidup untuk mereka yang menghargai performa, kemewahan, dan inovasi teknologi otomotif terdepan.",
    },
  ]

  return (
    <section id="overview" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-honda-red-primary mb-12 text-center">
          Honda Civic RS: Performa Turbo, Gaya Sporty, Teknologi Canggih
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
