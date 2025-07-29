export function IntroductionSection() {
  const textBlocks = [
    {
      content:
        "All New Honda Accord hadir dengan desain yang lebih elegan dan modern, menawarkan kenyamanan premium serta performa berkendara yang responsif. Dirancang untuk para eksekutif yang menghargai kemewahan dan inovasi.",
    },
    {
      content:
        "Dengan ruang kabin yang luas dan fitur-fitur canggih, Accord memberikan pengalaman berkendara yang tak tertandingi. Setiap perjalanan menjadi lebih menyenangkan dan berkelas.",
    },
    {
      content:
        "Teknologi mesin yang efisien memberikan performa optimal dengan konsumsi bahan bakar yang irit, cocok untuk perjalanan dalam kota maupun luar kota.",
    },
    {
      content:
        "Fitur keselamatan Honda SENSING hadir sebagai standar, memberikan perlindungan menyeluruh untuk Anda dan keluarga tercinta dalam setiap perjalanan.",
    },
    {
      content:
        "All New Honda Accord bukan hanya sekadar kendaraan, tetapi simbol status dan gaya hidup yang dinamis dan modern.",
    },
  ]

  return (
    <section id="overview" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-honda-red-primary mb-12 text-center">
          Kemewahan dan Inovasi dalam Satu Kesatuan
        </h2>

        {/* Single Column Layout for both Desktop and Mobile */}
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
