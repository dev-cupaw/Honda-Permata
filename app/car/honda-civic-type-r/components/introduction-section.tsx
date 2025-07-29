export function IntroductionSection() {
  const textBlocks = [
    {
      content:
        "Honda Civic Type R adalah puncak dari rekayasa performa Honda, dirancang untuk memberikan sensasi berkendara yang mendebarkan di lintasan maupun jalan raya. Ini adalah mobil sport legendaris yang siap menaklukkan setiap tantangan.",
    },
    {
      content:
        "Ditenagai mesin 2.0L VTEC Turbo yang menghasilkan tenaga luar biasa dan torsi instan, Civic Type R menawarkan akselerasi brutal dan kecepatan puncak yang mengagumkan.",
    },
    {
      content:
        "Desain aerodinamis yang agresif tidak hanya memukau secara visual, tetapi juga berfungsi untuk meningkatkan downforce dan stabilitas pada kecepatan tinggi, memastikan kontrol penuh di setiap tikungan.",
    },
    {
      content:
        "Interior berorientasi pengemudi dengan kursi sport bucket, detail merah khas Type R, dan sistem infotainment canggih, menciptakan lingkungan yang sempurna untuk pengalaman berkendara yang imersif.",
    },
    {
      content:
        "Honda Civic Type R adalah manifestasi sejati dari semangat balap Honda, menawarkan kombinasi sempurna antara performa ekstrem, teknologi inovatif, dan desain yang tak tertandingi.",
    },
  ]

  return (
    <section id="overview" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-honda-red-primary mb-12 text-center">
          Honda Civic Type R: Performa Balap, Desain Agresif, Sensasi Mendebarkan
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
