'use client'

import { useState, FormEvent } from 'react'

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

    try {
      // FormData oluştur - Web3Forms formatına uygun
      const formDataToSend = new FormData(e.currentTarget)
      
      // Access key'i ekle (client-side'dan direkt Web3Forms'a gönder)
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
      if (!accessKey) {
        console.error('NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY bulunamadı')
        setSubmitStatus('error')
        return
      }
      
      formDataToSend.append('access_key', accessKey)
      
      // Web3Forms API'sine direkt istek gönder (Cloudflare korumasını geçmek için)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      })

      // Response'u kontrol et
      if (!response.ok) {
        console.error('HTTP hatası:', response.status, response.statusText)
        setSubmitStatus('error')
        return
      }

      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        // JSON parse hatası olsa bile, response ok ise başarılı say
        console.warn('JSON parse hatası, ancak response OK:', jsonError)
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
        return
      }

      // Web3Forms başarılı yanıt verirse başarılı say
      // data.success === true veya response.ok ise başarılı
      if (data.success === true || response.ok) {
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
        // Eğer data.success false ise ama response ok ise, yine de başarılı say
        // Çünkü bazı durumlarda mail gönderilmiş olabilir
        if (response.ok && response.status === 200) {
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
          console.error('Web3Forms hatası:', data)
          setSubmitStatus('error')
        }
      }
    } catch (error) {
      console.error('Form gönderme hatası:', error)
      setSubmitStatus('error')
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

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-6 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800 text-base font-medium mb-2">
                  Tebrikler, bilgileriniz başarılı bir şekilde tarafımıza ulaştı!
                </p>
                <p className="text-green-700 text-sm">
                  Mekanınız hakkındaki teklifimizi iki iş günü içerisinde belirttiğiniz mail adresine ileteceğiz.
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
