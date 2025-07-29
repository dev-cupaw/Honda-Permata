export function IntroductionSection() {
  const textBlocks = [
    {
      content:
        "Honda e:N1 adalah langkah maju Honda dalam mobilitas listrik, menggabungkan desain futuristik, performa listrik yang responsif, dan komitmen terhadap lingkungan.",
    },
    {
      content:
        "Rasakan pengalaman berkendara yang tenang dan bertenaga dengan teknologi terdepan yang menghadirkan masa depan mobilitas berkelanjutan.",
    },
    {
      content:
        "Dengan jarak tempuh yang impresif dan kemampuan pengisian daya cepat, e:N1 siap menemani setiap perjalanan Anda, baik di dalam kota maupun antar kota.",
    },
    {
      content:
        "Fitur keselamatan canggih dan konektivitas pintar memastikan setiap perjalanan aman dan terhubung, memberikan ketenangan pikiran bagi pengemudi dan penumpang.",
    },
    {
      content:
        "Honda e:N1 bukan hanya sekadar kendaraan, tetapi sebuah pernyataan tentang inovasi dan tanggung jawab terhadap masa depan.",
    },
  ]

  return (
    <section id="overview" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-honda-red-primary mb-12 text-center">
          Era Baru Kendaraan Listrik
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
