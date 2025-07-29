"use client"

export function HeroSection() {
  return (
    <section className="relative h-[27vh] lg:h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <iframe
          className="absolute top-1/2 left-1/2 w-[130%] h-[110%] -translate-x-1/2 -translate-y-1/2"
          src="https://www.youtube-nocookie.com/embed/rHgJADRsqFs?version=3&enablejsapi=1&html5=1&hd=1&wmode=opaque&showinfo=0&rel=0&controls=0&playsinline=1&autoplay=1&mute=1&loop=1&playlist=rHgJADRsqFs&disablekb=1&fs=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&start=0&end=0&origin=https://localhost:3001"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen={false}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            border: 'none',
            outline: 'none'
          }}
        />
        {/* Overlay untuk mencegah interaksi dengan video */}
        <div className="absolute inset-0 z-10 bg-transparent" style={{ pointerEvents: 'auto' }} />
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
