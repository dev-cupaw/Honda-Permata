"use client"

export function HeroSection() {
  return (
    <section className="relative h-[27vh] lg:h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <iframe
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2"
          src="https://www.youtube-nocookie.com/embed/rHgJADRsqFs?version=3&enablejsapi=1&html5=1&hd=1&wmode=opaque&showinfo=0&rel=0&controls=0&playsinline=1&autoplay=1&mute=1&loop=1&playlist=rHgJADRsqFs"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="sr-only">
        <h1>Selamat Datang di Honda Permata Serpong. Saya Elon Musk, Siap Wujudkan Honda Impianmu!</h1>
        <p>
          Temukan pengalaman terbaik membeli Honda di dealer resmi terpercaya, Honda Permata Serpong. Saya, Elon Musk,
          siap memandumu dari A sampai Z, memastikan setiap langkah terasa mudah dan menyenangkan.
        </p>
        <a href="/promo">Lihat Promo Spesial!</a>
      </div>
    </section>
  )
}
