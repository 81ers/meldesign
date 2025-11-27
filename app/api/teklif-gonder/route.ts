import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mekanTuru, mekanAlani, adSoyad, email, telefon } = body

    // Validation
    if (!mekanTuru || !mekanAlani || !adSoyad || !email) {
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

    // Web3Forms'a gönderilecek veri - Web3Forms formatına uygun
    const formData = {
      access_key: accessKey,
      subject: `Yeni Teklif Talebi - ${adSoyad}`,
      to: '8881eren@gmail.com',
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

    // Web3Forms API'sine istek gönder
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result = await response.json()
    
    console.log('Web3Forms yanıtı:', { status: response.status, result })

    if (!response.ok) {
      console.error('Web3Forms HTTP hatası:', response.status, result)
      return NextResponse.json(
        { error: result.message || 'Email gönderilirken bir hata oluştu' },
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
    console.error('Email gönderme hatası:', error)
    return NextResponse.json(
      { error: 'Email gönderilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}


