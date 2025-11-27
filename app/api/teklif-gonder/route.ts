import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // FormData'yı parse et
    const formData = await request.formData()
    
    const mekanTuru = formData.get('mekanTuru') as string
    const mekanAlani = formData.get('mekanAlani') as string
    const adSoyad = formData.get('adSoyad') as string
    const email = formData.get('email') as string
    const telefon = formData.get('telefon') as string

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

    // Web3Forms'a gönderilecek FormData - Web3Forms formatına uygun
    const web3FormsData = new FormData()
    web3FormsData.append('access_key', accessKey)
    web3FormsData.append('subject', `Yeni Teklif Talebi - ${adSoyad}`)
    web3FormsData.append('to', '8881eren@gmail.com')
    web3FormsData.append('name', adSoyad)
    web3FormsData.append('email', email)
    web3FormsData.append('message', `
Yeni Teklif Talebi

Mekan Türü: ${mekanTuru}
Mekan Alanı: ${mekanAlani}
Ad Soyad: ${adSoyad}
Email: ${email}
Telefon: ${telefon || 'Belirtilmemiş'}
    `.trim())
    // Ekstra alanlar
    web3FormsData.append('Mekan Türü', mekanTuru)
    web3FormsData.append('Mekan Alanı', mekanAlani)
    web3FormsData.append('Telefon', telefon || 'Belirtilmemiş')

    console.log('Web3Forms gönderiliyor:', { name: adSoyad, email: email })

    // Web3Forms API'sine istek gönder - FormData formatında
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: web3FormsData,
    })

    const result = await response.json()
    
    console.log('Web3Forms yanıtı:', { status: response.status, result })

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


