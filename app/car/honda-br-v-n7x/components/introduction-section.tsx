export function IntroductionSection() {
  const textBlocks = [
    {
      content:
        "Honda BR-V N7X Edition hadir dengan desain sporty yang lebih menawan, interior nyaman, dan fitur keselamatan canggih. SUV 7-seater ini adalah pilihan ideal untuk keluarga modern yang aktif dan dinamis.",
    },
    {
      content:
        "Mesin 1.5L i-VTEC yang bertenaga dan efisien memberikan performa responsif untuk setiap perjalanan, baik di perkotaan maupun petualangan luar kota.",
    },
    {
      content:
        "Kabin yang luas dan fleksibel dengan tiga baris kursi memastikan kenyamanan maksimal bagi seluruh anggota keluarga. Desain interior yang modern dan fungsional mendukung setiap aktivitas.",
    },
    {
      content:
        "Dilengkapi dengan Honda SENSING dan berbagai fitur keselamatan pasif, BR-V N7X Edition memberikan perlindungan menyeluruh, meningkatkan rasa aman dan percaya diri di setiap perjalanan.",
    },
    {
      content:
        "Honda BR-V N7X Edition bukan hanya sekadar kendaraan, tetapi partner terpercaya yang siap menemani setiap momen berharga keluarga Anda dengan gaya dan keamanan.",
    },
  ]

  return (
    <section id="overview" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-honda-red-primary mb-12 text-center">
          Honda BR-V N7X Edition: SUV 7-Seater Stylish & Aman
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
