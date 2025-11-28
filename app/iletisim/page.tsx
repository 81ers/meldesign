'use client'

import { useState } from 'react'

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form gönderme işlemi burada yapılacak
    console.log('Form submitted:', formData)
    alert('Mesajınız gönderildi! (Demo)')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-vizon-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            İletişim
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Projeleriniz için bizimle iletişime geçin
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                İletişim Bilgileri
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Adres
                  </h3>
                  <p className="text-gray-600">
                    İçerik yakında eklenecek...
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Telefon
                  </h3>
                  <p className="text-gray-600">
                    +90 (XXX) XXX XX XX
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    E-posta
                  </h3>
                  <p className="text-gray-600">
                    info@meldedesign.com
                  </p>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Harita yakında eklenecek...</p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                Mesaj Gönderin
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    E-posta
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-vizon-700 text-white font-medium hover:bg-vizon-600 transition-colors duration-200"
                >
                  Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}




