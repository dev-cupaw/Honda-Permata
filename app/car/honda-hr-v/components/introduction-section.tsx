export function IntroductionSection() {
  const textBlocks = [
    {
      content:
        "New Honda HR-V hadir dengan desain yang lebih stylish dan modern, siap menemani setiap petualangan Anda. Perpaduan sempurna antara performa, kenyamanan, dan teknologi canggih.",
    },
    {
      content:
        "Interior yang lapang dan fleksibel memberikan kenyamanan maksimal bagi pengemudi dan penumpang. Desain ergonomis dan material berkualitas tinggi menciptakan pengalaman berkendara yang menyenangkan.",
    },
    {
      content:
        "Dilengkapi dengan berbagai fitur inovatif dan teknologi keselamatan terdepan, New Honda HR-V memastikan setiap perjalanan Anda aman dan penuh percaya diri.",
    },
    {
      content:
        "Pilihan mesin yang bertenaga dan efisien, termasuk varian e:HEV hybrid, memberikan performa responsif dan hemat bahan bakar untuk mobilitas harian maupun perjalanan jauh.",
    },
    {
      content:
        "New Honda HR-V bukan hanya sekadar kendaraan, tetapi representasi gaya hidup modern yang dinamis dan penuh semangat.",
    },
  ]

  return (
    <section id="overview" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-honda-red-primary mb-12 text-center">
          New Honda HR-V: Desain Stylish, Fitur Canggih, Performa Responsif
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
