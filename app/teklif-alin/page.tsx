'use client'

import { useState, FormEvent } from 'react'

export default function TeklifAlin() {
  const [formData, setFormData] = useState({
    mekanTuru: '',
    mekanAlani: '',
    adSoyad: '',
    email: '',
    telefon: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.mekanTuru) {
      newErrors.mekanTuru = 'Mekan türü seçimi zorunludur'
    }
    if (!formData.mekanAlani) {
      newErrors.mekanAlani = 'Mekan alanı seçimi zorunludur'
    }
    if (!formData.adSoyad.trim()) {
      newErrors.adSoyad = 'Ad Soyad zorunludur'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email adresi zorunludur'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir email adresi giriniz'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/teklif-gonder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          mekanTuru: '',
          mekanAlani: '',
          adSoyad: '',
          email: '',
          telefon: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
          Teklif Alın
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Mekanınızın bilgilerini girerek size özel teklifinizi alın.
        </p>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-6">
            {/* Mekan Türü */}
            <div>
              <label htmlFor="mekanTuru" className="block text-sm font-medium text-gray-700 mb-2">
                Mekanınızın Türü <span className="text-red-600">*</span>
              </label>
              <select
                id="mekanTuru"
                name="mekanTuru"
                value={formData.mekanTuru}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-950 ${
                  errors.mekanTuru ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Seçiniz</option>
                <option value="Konut">Konut</option>
                <option value="Otel">Otel</option>
                <option value="Ofis & Ticari">Ofis & Ticari</option>
                <option value="Kafe & Restoran">Kafe & Restoran</option>
                <option value="Mağaza">Mağaza</option>
                <option value="Diğer">Diğer</option>
              </select>
              {errors.mekanTuru && (
                <p className="mt-1 text-sm text-red-600">{errors.mekanTuru}</p>
              )}
            </div>

            {/* Mekan Alanı */}
            <div>
              <label htmlFor="mekanAlani" className="block text-sm font-medium text-gray-700 mb-2">
                Mekanınızın Alanı <span className="text-red-600">*</span>
              </label>
              <select
                id="mekanAlani"
                name="mekanAlani"
                value={formData.mekanAlani}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-950 ${
                  errors.mekanAlani ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Seçiniz</option>
                <option value="0-50m²">0-50m²</option>
                <option value="50-100m²">50-100m²</option>
                <option value="100-200m²">100-200m²</option>
                <option value="200m² ve üstü">200m² ve üstü</option>
              </select>
              {errors.mekanAlani && (
                <p className="mt-1 text-sm text-red-600">{errors.mekanAlani}</p>
              )}
            </div>

            {/* Ad Soyad */}
            <div>
              <label htmlFor="adSoyad" className="block text-sm font-medium text-gray-700 mb-2">
                Adınız Soyadınız <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="adSoyad"
                name="adSoyad"
                value={formData.adSoyad}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-950 ${
                  errors.adSoyad ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.adSoyad && (
                <p className="mt-1 text-sm text-red-600">{errors.adSoyad}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Mail Adresiniz <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-950 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Telefon */}
            <div>
              <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-2">
                Telefon Numaranız <span className="text-gray-400 text-xs">(Opsiyonel)</span>
              </label>
              <input
                type="tel"
                id="telefon"
                name="telefon"
                value={formData.telefon}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-950"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-3 bg-red-950 text-white font-medium hover:bg-red-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Gönderiliyor...' : 'Mekan Bilgilerimi Gönder'}
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800 text-sm">
                  Teşekkürler! Bilgileriniz başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800 text-sm">
                  Bir hata oluştu. Lütfen tekrar deneyiniz.
                </p>
              </div>
            )}

            <p className="text-xs text-gray-500 mt-4">
              <span className="text-red-600">*</span> ile işaretli alanlar zorunludur.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
