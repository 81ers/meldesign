export default function GizlilikPolitikasiPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-vizon-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-white">
            Gizlilik Politikası
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-500 mb-8">
              Son Güncelleme: 2025
            </p>

            <p className="text-gray-700 mb-8 leading-relaxed">
              Bu Gizlilik Politikası, web sitemiz üzerinden topladığımız kişisel verilerin nasıl işlendiğini, saklandığını ve korunduğunu açıklamaktadır. Web sitemizi kullanarak bu gizlilik politikasını kabul etmiş sayılırsınız.
            </p>

            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 mt-12">
              1. Toplanan Bilgiler
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Web sitemizdeki teklif formu ve analiz araçları aracılığıyla aşağıdaki bilgiler toplanmaktadır:
            </p>

            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4 mt-8">
              1.1. Form Üzerinden Toplanan Bilgiler (Web3Forms)
            </h3>

            <h4 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
              Zorunlu Bilgiler
            </h4>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Ad ve Soyad</li>
              <li>Mekan Türü</li>
              <li>Mekanın Alanı (m²)</li>
              <li>E-posta Adresi</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
              Opsiyonel Bilgiler
            </h4>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Telefon Numarası</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
              Web3Forms'un otomatik olarak topladığı bilgiler
            </h4>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Kullanıcının IP Adresi</strong>
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Web3Forms, güvenlik ve spam koruması amacıyla göndericinin IP adresini form e-posta çıktısına ekler.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Bu IP adresi bize e-posta yoluyla iletilmiş olur ancak tarafımızca analiz edilmez veya profil oluşturma amacıyla kullanılmaz.
            </p>

            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4 mt-8">
              1.2. Ziyaretçi Analiz Verileri (Vercel Analytics)
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Sitemizde Vercel Analytics kullanılmaktadır. Bu araç:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Sayfa görüntüleme istatistikleri,</li>
              <li>Cihaz türü (mobil/masaüstü),</li>
              <li>Tarayıcı türü,</li>
              <li>Yaklaşık konum (şehir/bölge bazında anonim),</li>
              <li>Yönlendiren kaynak (referrer)</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              gibi ziyaretçi davranışı verilerini anonim olarak toplar.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Vercel Analytics, kişisel veri niteliğinde olan IP adreslerini tam olarak kaydetmez, anonimleştirerek işler.
            </p>

            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 mt-12">
              2. Bilgilerin Toplanma Amaçları
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Toplanan veriler şu amaçlarla kullanılmaktadır:
            </p>
            <p className="text-gray-700 mb-2 leading-relaxed">
              <strong>Form verileri için:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Kullanıcıya teklif oluşturmak ve iletişim kurmak</li>
              <li>Talep edilen hizmete ilişkin dönüş sağlamak</li>
              <li>Spam ve kötüye kullanımı tespit etmek (Web3Forms tarafında)</li>
            </ul>
            <p className="text-gray-700 mb-2 leading-relaxed">
              <strong>Analitik verileri için:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Web sitemizin performansını ve kullanıcı deneyimini iyileştirmek</li>
              <li>Trafik yoğunluğunu anlamak ve teknik hataları tespit etmek</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Verileriniz bu amaçlar dışında kullanılmaz.
            </p>

            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 mt-12">
              3. Üçüncü Taraflarla Paylaşım
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Topladığımız veriler aşağıdaki üçüncü taraf hizmetlerle paylaşılmaktadır:
            </p>

            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4 mt-8">
              3.1. Web3Forms
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Form verilerini (ad, e-posta, telefon, mesaj, IP adresi vb.) e-posta yoluyla bize iletir.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Web3Forms güvenlik amacıyla IP adresini otomatik şekilde toplar.
            </p>

            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4 mt-8">
              3.2. Vercel Analytics
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Ziyaretçi davranış verilerini anonim şekilde işler.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Kişiyi doğrudan tanımlayabilecek bir veri üretmez.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Hiçbir kişisel veri; pazarlama, satış veya üçüncü taraf reklam amaçlarıyla paylaşılmaz, satılmaz veya kullanılmaz.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Yalnızca yasal zorunluluk varsa yetkili kurumlara bilgi sağlanabilir.
            </p>

            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 mt-12">
              4. Veri Güvenliği
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Kişisel bilgilerinizin güvenliği için teknik ve idari önlemler alınmıştır:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Sistemimiz HTTPS üzerinden çalışır.</li>
              <li>Form verileri doğrudan bizim tarafımızdan saklanmaz; yalnızca e-posta olarak tarafımıza iletilir.</li>
              <li>E-postalar yalnızca yetkili kişiler tarafından görüntülenir.</li>
              <li>Vercel, Web3Forms ve diğer altyapılar kendi güvenlik altyapılarını uygular.</li>
            </ul>

            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 mt-12">
              5. Verilerin Saklanma Süresi
            </h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Form verileriniz teklif süreci tamamlanıncaya kadar saklanır.</li>
              <li>Talep etmeniz halinde tüm verileriniz derhal silinir.</li>
              <li>Analitik verileri Vercel tarafından anonim şekilde saklanır ve kişisel bir bilgi içermez.</li>
            </ul>

            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 mt-12">
              6. Kullanıcı Hakları
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              KVKK kapsamında:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Kişisel verilerinize erişme,</li>
              <li>Yanlışsa düzeltilmesini talep etme,</li>
              <li>Silinmesini isteme,</li>
              <li>İşlemenin kısıtlanmasını talep etme,</li>
              <li>Verilerin işlenmesine itiraz etme</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              haklarına sahipsiniz.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Bu hakları kullanmak için bizimle e-posta aracılığıyla iletişime geçebilirsiniz.
            </p>

            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 mt-12">
              7. Çerezler (Cookies)
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Web sitemiz şu anda çerez kullanmamaktadır.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Gelecekte çerez kullanımı başlarsa bu politika güncellenecektir.
            </p>

            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 mt-12">
              8. Gizlilik Politikasındaki Değişiklikler
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Bu gizlilik politikası zaman zaman güncellenebilir.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Güncellenen politikalar bu sayfada yayınlanır ve yayım tarihinde yürürlüğe girer.
            </p>

            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 mt-12">
              9. İletişim
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Gizlilik politikasıyla ilgili her türlü soru için:
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              E-posta: <a href="mailto:info@meldesign.tr" className="text-vizon-700 hover:text-vizon-800 transition-colors">info@meldesign.tr</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}


