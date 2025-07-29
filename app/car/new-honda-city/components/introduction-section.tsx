export function IntroductionSection() {
  const textBlocks = [
    {
      content:
        "New Honda City hadir dengan desain yang lebih elegan, interior mewah, dan performa efisien. Sedan premium ini dirancang untuk memberikan kenyamanan dan gaya hidup modern yang dinamis.",
    },
    {
      content:
        "Mesin 1.5L i-VTEC yang responsif dan efisien memberikan pengalaman berkendara yang halus namun bertenaga, cocok untuk perjalanan dalam kota maupun luar kota.",
    },
    {
      content:
        "Interior yang lapang dengan material berkualitas tinggi, fitur-fitur canggih, dan desain ergonomis menciptakan suasana kabin yang nyaman dan menyenangkan bagi pengemudi dan penumpang.",
    },
    {
      content:
        "Dilengkapi dengan Honda SENSING dan berbagai fitur keselamatan aktif, New Honda City memastikan perlindungan menyeluruh, memberikan ketenangan pikiran di setiap perjalanan.",
    },
    {
      content:
        "New Honda City adalah pilihan sempurna bagi Anda yang mencari sedan stylish, nyaman, dan berteknologi canggih untuk menunjang aktivitas sehari-hari dan gaya hidup premium.",
    },
  ]

  return (
    <section id="overview" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-honda-red-primary mb-12 text-center">
          New Honda City: Elegan, Mewah, Performa Efisien
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
