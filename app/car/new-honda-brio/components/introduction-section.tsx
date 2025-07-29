export function IntroductionSection() {
  const textBlocks = [
    {
      content:
        "New Honda Brio hadir dengan desain stylish, performa lincah, dan efisiensi bahan bakar yang luar biasa. Mobil perkotaan yang sempurna untuk menemani setiap aktivitas dinamis Anda.",
    },
    {
      content:
        "Mesin i-VTEC 1.2L yang responsif memberikan akselerasi yang sigap dan hemat bahan bakar, cocok untuk menjelajahi jalanan kota yang padat.",
    },
    {
      content:
        "Meskipun kompak, interior New Honda Brio dirancang untuk memberikan kenyamanan maksimal dengan ruang kabin yang lapang dan fitur-fitur modern yang mendukung gaya hidup Anda.",
    },
    {
      content:
        "Dilengkapi dengan fitur keselamatan standar Honda, New Honda Brio memberikan ketenangan pikiran dalam setiap perjalanan, memastikan Anda dan keluarga selalu aman.",
    },
    {
      content:
        "New Honda Brio adalah pilihan cerdas bagi Anda yang mencari mobil kompak, stylish, efisien, dan menyenangkan untuk dikendarai setiap hari.",
    },
  ]

  return (
    <section id="overview" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-honda-red-primary mb-12 text-center">
          New Honda Brio: Lincah, Efisien, Penuh Gaya
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
