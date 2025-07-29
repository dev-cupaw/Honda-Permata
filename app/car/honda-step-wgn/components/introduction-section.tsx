export function IntroductionSection() {
  const textBlocks = [
    {
      content:
        "Mobil yang Kamu Butuhkan jadi Mobil yang Kamu Inginkan. Honda STEP WGN e:HEV hadir dengan desain yang lebih segar dan teknologi hybrid terdepan untuk memenuhi kebutuhan mobilitas keluarga modern.",
    },
    {
      content:
        "Dengan ruang kabin yang luas dan fleksibel, STEP WGN memberikan kenyamanan maksimal untuk seluruh keluarga. Setiap perjalanan menjadi pengalaman yang menyenangkan.",
    },
    {
      content:
        "Teknologi e:HEV (hybrid) yang canggih memberikan efisiensi bahan bakar terbaik di kelasnya, sehingga Anda dapat menikmati perjalanan yang lebih hemat dan ramah lingkungan.",
    },
    {
      content:
        "Fitur keselamatan Honda SENSING hadir sebagai standar, memberikan perlindungan menyeluruh untuk keluarga tercinta dalam setiap perjalanan.",
    },
    {
      content:
        "STEP WGN e:HEV bukan hanya sekadar kendaraan, tetapi partner terpercaya untuk mendukung gaya hidup aktif keluarga Indonesia.",
    },
  ]

  return (
    <section id="overview" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-honda-red-primary mb-12 text-center">
          Mobil yang Kamu Butuhkan jadi Mobil yang Kamu Inginkan
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
