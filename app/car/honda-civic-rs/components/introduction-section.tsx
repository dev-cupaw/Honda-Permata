export function IntroductionSection() {
  const textBlocks = [
    {
      content:
        "New Honda Civic RS e:HEV hadir dengan desain sporty yang memukau dan performa hybrid yang bertenaga. Sedan premium ini menggabungkan gaya hidup dinamis dengan teknologi canggih untuk pengalaman berkendara yang tak terlupakan.",
    },
    {
      content:
        "Mesin 2.0L DOHC i-VTEC Engine + Electric Motor menghasilkan tenaga 203 PS yang responsif dan efisiensi bahan bakar yang optimal. Setiap akselerasi terasa halus namun bertenaga, cocok untuk berkendara di perkotaan maupun perjalanan jauh.",
    },
    {
      content:
        "Interior premium dengan material berkualitas tinggi dan teknologi infotainment 9\" Advanced Capacitive Touchscreen menciptakan kenyamanan maksimal. Desain cockpit yang ergonomis dengan 10.2\" Interactive Cluster Meter memberikan pengalaman berkendara yang menyenangkan.",
    },
    {
      content:
        "Dilengkapi Honda SENSING dan berbagai fitur keselamatan aktif, Civic RS e:HEV memastikan perlindungan menyeluruh untuk pengemudi dan penumpang dalam setiap perjalanan.",
    },
    {
      content:
        "New Honda Civic RS e:HEV bukan hanya sedan, tetapi statement gaya hidup untuk mereka yang menghargai performa, kemewahan, dan inovasi teknologi hybrid terdepan.",
    },
  ]

  return (
    <section id="overview" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-honda-red-primary mb-12 text-center">
          New Honda Civic RS e:HEV: Performa Hybrid, Gaya Sporty, Teknologi Canggih
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
