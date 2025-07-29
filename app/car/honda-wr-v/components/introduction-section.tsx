export function IntroductionSection() {
  const textBlocks = [
    {
      content:
        "Honda WR-V adalah SUV kompak yang dirancang untuk petualangan urban. Dengan desain stylish, performa tangguh, dan fitur canggih, WR-V siap menemani setiap perjalanan Anda.",
    },
    {
      content:
        "Mesin 1.5L i-VTEC yang bertenaga memberikan akselerasi responsif dan efisiensi bahan bakar yang baik, cocok untuk menjelajahi kota maupun perjalanan luar kota.",
    },
    {
      content:
        "Interior yang lapang dan nyaman dengan berbagai fitur modern memastikan pengalaman berkendara yang menyenangkan bagi pengemudi dan penumpang.",
    },
    {
      content:
        "Dilengkapi dengan Honda SENSING dan berbagai fitur keselamatan aktif, WR-V memberikan perlindungan menyeluruh, meningkatkan rasa percaya diri di setiap kondisi jalan.",
    },
    {
      content:
        "Honda WR-V adalah pilihan ideal bagi Anda yang mencari SUV kompak dengan gaya, performa, dan kepraktisan untuk mendukung gaya hidup aktif dan dinamis.",
    },
  ]

  return (
    <section id="overview" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-honda-red-primary mb-12 text-center">
          Honda WR-V: SUV Kompak, Stylish, Siap Petualangan
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
