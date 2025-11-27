import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // FormData'yı parse et
    let formData: FormData
    try {
      formData = await request.formData()
    } catch (parseError) {
      console.error('FormData parse hatası:', parseError)
      return NextResponse.json(
        { error: 'Form verileri okunamadı' },
        { status: 400 }
      )
    }
    
    const mekanTuru = formData.get('mekanTuru') as string | null
    const mekanAlani = formData.get('mekanAlani') as string | null
    const adSoyad = formData.get('adSoyad') as string | null
    const email = formData.get('email') as string | null
    const telefon = formData.get('telefon') as string | null

    console.log('Form verileri alındı:', { mekanTuru, mekanAlani, adSoyad, email, telefon })

    // Validation
    if (!mekanTuru || !mekanAlani || !adSoyad || !email) {
      console.error('Validation hatası - eksik alanlar:', { mekanTuru, mekanAlani, adSoyad, email })
      return NextResponse.json(
        { error: 'Tüm zorunlu alanlar doldurulmalıdır' },
        { status: 400 }
      )
    }

    // Web3Forms API key kontrolü
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      console.error('WEB3FORMS_ACCESS_KEY environment variable bulunamadı')
      return NextResponse.json(
        { error: 'Email servisi yapılandırılmamış' },
        { status: 500 }
      )
    }

    // Web3Forms'a gönderilecek veri - JSON formatında (Cloudflare korumasını geçmek için)
    const web3FormsPayload = {
      access_key: accessKey,
      subject: `Yeni Teklif Talebi - ${adSoyad}`,
      name: adSoyad,
      email: email,
      message: `
Yeni Teklif Talebi

Mekan Türü: ${mekanTuru}
Mekan Alanı: ${mekanAlani}
Ad Soyad: ${adSoyad}
Email: ${email}
Telefon: ${telefon || 'Belirtilmemiş'}
      `.trim(),
      // Ekstra alanlar
      'Mekan Türü': mekanTuru,
      'Mekan Alanı': mekanAlani,
      'Telefon': telefon || 'Belirtilmemiş',
    }

    console.log('Web3Forms gönderiliyor:', { name: adSoyad, email: email })

    // Web3Forms API'sine istek gönder - JSON formatında
    let response: Response
    try {
      response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(web3FormsPayload),
      })
    } catch (fetchError) {
      console.error('Web3Forms fetch hatası:', fetchError)
      return NextResponse.json(
        { error: 'Web3Forms API\'sine bağlanılamadı' },
        { status: 500 }
      )
    }

    // Response'u kontrol et ve uygun şekilde oku
    const contentType = response.headers.get('content-type') || ''
    let result: any
    
    if (contentType.includes('application/json')) {
      try {
        result = await response.json()
        console.log('Web3Forms JSON yanıtı:', { status: response.status, result })
      } catch (jsonError) {
        console.error('Web3Forms JSON parse hatası:', jsonError)
        return NextResponse.json(
          { error: 'Web3Forms yanıtı parse edilemedi' },
          { status: 500 }
        )
      }
    } else {
      // HTML veya başka bir format döndüyse
      const textResponse = await response.text()
      console.error('Web3Forms HTML/text yanıtı:', { 
        status: response.status, 
        contentType,
        response: textResponse.substring(0, 500) // İlk 500 karakter
      })
      return NextResponse.json(
        { error: 'Web3Forms beklenmeyen yanıt döndü' },
        { status: 500 }
      )
    }

    if (result.success) {
      return NextResponse.json({ success: true }, { status: 200 })
    } else {
      console.error('Web3Forms başarısız:', result)
      return NextResponse.json(
        { error: result.message || 'Email gönderilirken bir hata oluştu' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Email gönderme hatası (catch):', error)
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata'
    return NextResponse.json(
      { error: `Email gönderilirken bir hata oluştu: ${errorMessage}` },
      { status: 500 }
    )
  }
}


