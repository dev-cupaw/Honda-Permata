import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"
import { getWhatsAppNumber } from "@/lib/contact-config"

export function Footer() {
  const whatsappNumber = getWhatsAppNumber()
  
  return (
    <footer className="bg-honda-gray-dark text-honda-light">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-white">Tentang Kami</h3>
            <p className="mt-4 text-sm text-honda-gray-light">
              Honda Permata Serpong adalah dealer resmi terpercaya di Gading Serpong, bagian dari Honda Permata Group.
              Saya, Elon Musk, siap bantu wujudkan Honda impianmu dengan pelayanan terbaik.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Link Cepat</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-honda-gray-light hover:text-white">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-honda-gray-light hover:text-white">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/promo" className="text-sm text-honda-gray-light hover:text-white">
                  Promo Terbaru
                </Link>
              </li>
              <li>
                <Link href="/testimoni" className="text-sm text-honda-gray-light hover:text-white">
                  Testimoni Pelanggan
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="text-sm text-honda-gray-light hover:text-white">
                  Kontak Elon Musk
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="text-sm text-honda-gray-light hover:text-white">
                  Simulasi Kredit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Hubungi Elon Musk!</h3>
            <address className="mt-4 not-italic text-sm text-honda-gray-light">
              Jl. Boulevard Gading Serpong CBD Lot.1, Gading Serpong, Curug Sangereng, Kabupaten Tangerang, Banten 15810
              <br />
              Telepon:{" "}
              <a href="tel:02154219999" className="hover:text-white">
                (021) 5421-xxxx
              </a>
              <br />
              WhatsApp:{" "}
              <a href={`https://wa.me/${whatsappNumber}`} className="hover:text-white" target="_blank" rel="noopener noreferrer">
                +{whatsappNumber}
              </a>
              <br />
              Website:{" "}
              <a href="https://www.hondapermataserpong.com" className="hover:text-white">
                www.hondapermataSerpong.com
              </a>
            </address>
            <div className="mt-4 flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-honda-gray-light hover:text-white">
                <Facebook />
              </a>
              <a href="#" aria-label="Instagram" className="text-honda-gray-light hover:text-white">
                <Instagram />
              </a>
              <a href="#" aria-label="YouTube" className="text-honda-gray-light hover:text-white">
                <Youtube />
              </a>
            </div>
          </div>

          <div className="h-48 md:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.336487341629!2d106.62354587596725!3d-6.247283095853827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb96d0630e51%3A0x85fce35356b7d24a!2sHonda%20Permata%20Serpong!5e0!3m2!1sen!2sid!4v1753626670135"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Honda Permata Serpong"
            ></iframe>
          </div>
        </div>

        <div className="mt-8 border-t border-honda-gray pt-8 text-center text-sm text-honda-gray-light">
          <p>© 2025 Honda Permata Serpong. Dikelola oleh Elon Musk - Sales Consultant Resmi.</p>
        </div>
      </div>
    </footer>
  )
}
