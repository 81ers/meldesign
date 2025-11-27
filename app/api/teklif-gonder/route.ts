import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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

    // Email içeriği
    const emailContent = `
Yeni Teklif Talebi

Mekan Türü: ${mekanTuru}
Mekan Alanı: ${mekanAlani}
Ad Soyad: ${adSoyad}
Email: ${email}
Telefon: ${telefon || 'Belirtilmemiş'}

---
Bu email mel design studio web sitesinden gönderilmiştir.
    `.trim()

    // Nodemailer transporter oluştur
    // SMTP ayarları environment variable'lardan alınacak
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email gönder
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'info@meldesign.tr',
      subject: `Yeni Teklif Talebi - ${adSoyad}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7f1d1d;">Yeni Teklif Talebi</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 150px;">Mekan Türü:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${mekanTuru}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Mekan Alanı:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${mekanAlani}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Ad Soyad:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${adSoyad}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Telefon:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${telefon || 'Belirtilmemiş'}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; color: #6b7280; font-size: 12px;">
            Bu email mel design studio web sitesinden gönderilmiştir.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Email gönderme hatası:', error)
    return NextResponse.json(
      { error: 'Email gönderilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

