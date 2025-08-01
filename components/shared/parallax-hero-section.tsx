interface ParallaxHeroSectionProps {
  title: string
  subtitle: string
}

export function ParallaxHeroSection({ title, subtitle }: ParallaxHeroSectionProps) {
  return (
    <section
      className="relative h-[50vh] bg-cover bg-center bg-fixed flex items-center justify-center text-center"
      style={{ backgroundImage: 'url("/section-kontak/Honda-2015.webp")' }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div> {/* Overlay for readability */}
      <div className="relative z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">{title}</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">{subtitle}</p>
      </div>
    </section>
  )
}
