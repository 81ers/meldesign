'use client'

import { useState, FormEvent, useEffect } from 'react'

export default function TeklifAlin() {
  const [formData, setFormData] = useState({
    mekanTuru: '',
    mekanTuruDiger: '',
    mekanAlani: '',
    aciklama: '',
    adSoyad: '',
    email: '',
    telefon: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [kvkkOnay, setKvkkOnay] = useState(false)
  const [showKvkkError, setShowKvkkError] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.mekanTuru) {
      newErrors.mekanTuru = 'Mekan türü seçimi zorunludur'
    }
    if (formData.mekanTuru === 'Diğer' && !formData.mekanTuruDiger.trim()) {
      newErrors.mekanTuruDiger = 'Lütfen mekan türünü belirtin'
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
    if (!kvkkOnay) {
      newErrors.kvkkOnay = 'Gizlilik politikasını kabul etmelisiniz'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!kvkkOnay) {
      setErrors(prev => ({ ...prev, kvkkOnay: 'Gizlilik politikasını kabul etmelisiniz' }))
      // Animasyonu tetiklemek için state'i resetle
      setShowKvkkError(false)
      setTimeout(() => {
        setShowKvkkError(true)
        setTimeout(() => setShowKvkkError(false), 500)
      }, 10)
      return
    }
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    // İnternet bağlantısını kontrol et
    const isOnline = navigator.onLine
    
    if (!isOnline) {
      // İnternete bağlı değil - hata mesajı göster
      setSubmitStatus('error')
      setIsSubmitting(false)
      return
    }

    // İnternete bağlı - formu direkt Web3Forms'a gönder
    try {
      // Access key kontrolü
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
      if (!accessKey) {
        console.error('NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY bulunamadı')
        setSubmitStatus('error')
        setIsSubmitting(false)
        return
      }

      // FormData oluştur
      const formDataToSend = new FormData(e.currentTarget)
      formDataToSend.append('access_key', accessKey)
      
      // Web3Forms API'sine direkt istek gönder
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      })

      // İnternet bağlıysa başarı mesajı göster (yanıt kontrolü yapmadan)
      if (isOnline) {
        setSubmitStatus('success')
        setFormData({
          mekanTuru: '',
          mekanTuruDiger: '',
          mekanAlani: '',
          aciklama: '',
          adSoyad: '',
          email: '',
          telefon: '',
        })
        setKvkkOnay(false)
        e.currentTarget.reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      // İnternet bağlıysa başarı say
      if (isOnline) {
        setSubmitStatus('success')
        setFormData({
          mekanTuru: '',
          mekanTuruDiger: '',
          mekanAlani: '',
          aciklama: '',
          adSoyad: '',
          email: '',
          telefon: '',
        })
        setKvkkOnay(false)
        e.currentTarget.reset()
      } else {
        setSubmitStatus('error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const closeSuccessModal = () => {
    setSubmitStatus(null)
  }

  // ESC tuşu ile modal'ı kapat
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && submitStatus === 'success') {
        closeSuccessModal()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [submitStatus])

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Success Modal Pop-up */}
      {submitStatus === 'success' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={closeSuccessModal}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={closeSuccessModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Kapat"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                Tebrikler!
              </h3>
              <p className="text-green-800 text-base font-medium mb-2">
                Bilgileriniz başarılı bir şekilde tarafımıza ulaştı!
              </p>
              <p className="text-gray-600 text-sm mb-6">
                Mekanınız hakkındaki teklifimizi iki iş günü içerisinde belirttiğiniz mail adresine ileteceğiz.
              </p>
              <button
                onClick={closeSuccessModal}
                className="w-full px-6 py-3 bg-vizon-800 text-white font-medium hover:bg-vizon-700 transition-colors duration-200 rounded-md"
              >
                Tamam
              </button>
            </div>
          </div>
        </div>
      )}

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
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-vizon-700 ${
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
              {formData.mekanTuru === 'Diğer' && (
                <div className="mt-4">
                  <label htmlFor="mekanTuruDiger" className="block text-sm font-medium text-gray-700 mb-2">
                    Mekan Türü İsmi
                  </label>
                  <input
                    type="text"
                    id="mekanTuruDiger"
                    name="mekanTuruDiger"
                    value={formData.mekanTuruDiger}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-vizon-700 ${
                      errors.mekanTuruDiger ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Örn. Klinik, Atölye..."
                  />
                  {errors.mekanTuruDiger && (
                    <p className="mt-1 text-sm text-red-600">{errors.mekanTuruDiger}</p>
                  )}
                </div>
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
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-vizon-700 ${
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

            {/* Açıklama */}
            <div>
              <label htmlFor="aciklama" className="block text-sm font-medium text-gray-700 mb-2">
                Açıklama
              </label>
              <textarea
                id="aciklama"
                name="aciklama"
                value={formData.aciklama}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vizon-700 resize-none"
              />
              <p className="mt-1 text-sm text-gray-500 italic">
                İstekleriniz ve mekan ayrıntılarını belirtebilirsiniz.
              </p>
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
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-vizon-700 ${
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
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-vizon-700 ${
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vizon-700"
              />
            </div>

            {/* KVKK Onay */}
            <div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="kvkkOnay"
                  checked={kvkkOnay}
                  onChange={(e) => {
                    setKvkkOnay(e.target.checked)
                    if (errors.kvkkOnay) {
                      setErrors(prev => ({ ...prev, kvkkOnay: '' }))
                    }
                  }}
                  className="mt-1 w-4 h-4 text-vizon-700 border-gray-300 rounded focus:ring-vizon-700"
                />
                <label htmlFor="kvkkOnay" className="text-sm text-gray-700">
                  <span className="text-red-600">*</span> KVKK kapsamındaki{' '}
                  <a
                    href="/gizlilik-politikasi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-gray-900 underline font-medium"
                  >
                    Gizlilik Politikası
                  </a>
                  'nı okudum, anladım ve kabul ediyorum.
                </label>
              </div>
              {errors.kvkkOnay && (
                <p 
                  key={`error-${showKvkkError}`}
                  className={`mt-1 text-sm text-red-600 font-medium ${
                    showKvkkError ? 'animate-error-flash' : ''
                  }`}
                >
                  {errors.kvkkOnay}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !kvkkOnay}
              className="w-full px-8 py-3 bg-vizon-800 text-white font-medium hover:bg-vizon-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Gönderiliyor...' : 'Mekan Bilgilerimi Gönder'}
            </button>

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800 text-sm">
                  Form gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.
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
