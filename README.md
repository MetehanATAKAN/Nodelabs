# Fintech Dashboard

Modern, responsive fintech dashboard uygulaması. Kullanıcı kimlik doğrulama, finansal veri görselleştirme, para birimi desteği ve uluslararası tarih formatları ile kapsamlı bir finansal yönetim platformu.

## 🚀 Özellikler

### Kimlik Doğrulama
- Kullanıcı kaydı ve girişi
- JWT tabanlı kimlik doğrulama
- Otomatik token yenileme mekanizması
- Güvenli oturum yönetimi
- Form validasyonu (Formik & Yup)

### Dashboard
- **Özet Kartları**: Toplam bakiye, harcama ve tasarruf görünümü
- **Working Capital Grafiği**: Gelir ve gider trendlerinin görselleştirilmesi
- **Cüzdan Kartları**: Kredi kartı bilgilerinin görüntülenmesi
- **Zamanlanmış Transferler**: Planlanmış ödemelerin listesi
- **Son İşlemler**: Yakın zamandaki finansal işlemlerin tablosu

### Uluslararası Destek
- **Para Birimi Desteği**: 150+ ulusal para birimi desteği
- **Dinamik Para Birimi Dönüşümü**: API verilerinin seçilen para birimine otomatik dönüştürülmesi
- **Tarih Formatları**: 10+ uluslararası tarih formatı desteği
- **Dinamik Format Değişimi**: Tüm tarih alanlarının seçilen formata göre güncellenmesi

### Kullanıcı Deneyimi
- Tam responsive tasarım (mobil, tablet, desktop)
- **Dark/Light Mode**: Tema değiştirme desteği
- Loading skeleton efektleri
- Error boundary ve merkezi hata yönetimi
- Toast bildirimleri
- Erişilebilirlik desteği (ARIA labels, semantic HTML)

## 🛠️ Teknolojiler

### Core
- **React 19** - UI kütüphanesi
- **TypeScript** - Tip güvenliği
- **Vite** - Build tool ve dev server

### State Management
- **Redux Toolkit** - Global state yönetimi
- **TanStack React Query** - Server state ve cache yönetimi

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Veri görselleştirme
- **Lucide React** - Icon kütüphanesi

### Form & Validation
- **Formik** - Form state yönetimi
- **Yup** - Schema validasyonu

### Routing
- **React Router DOM v6** - Client-side routing
- Protected ve public route guards

### HTTP & API
- Fetch API ile custom HTTP client
- Otomatik token yenileme interceptor
- Centralized error handling

## 📁 Proje Yapısı

```
src/
├── app/                    # Uygulama seviyesi yapılandırma
│   ├── providers/         # Context providers
│   ├── query/             # React Query yapılandırması
│   ├── router/           # Route tanımları ve guards
│   └── store/            # Redux store yapılandırması
│
├── features/              # Feature-based modüller
│   ├── auth/             # Kimlik doğrulama
│   │   ├── api/         # API çağrıları ve hooks
│   │   ├── lib/         # Utility fonksiyonlar
│   │   ├── model/       # Redux slice ve types
│   │   └── ui/          # UI bileşenleri
│   ├── currency/         # Para birimi yönetimi
│   ├── dateFormat/       # Tarih formatı yönetimi
│   ├── theme/            # Tema yönetimi (Dark/Light mode)
│   └── dashboard/        # Dashboard özellikleri
│
├── pages/                 # Sayfa bileşenleri
│   ├── auth/             # Auth sayfaları
│   └── dashboard/        # Dashboard sayfaları
│
└── shared/                # Paylaşılan kaynaklar
    ├── api/              # HTTP client ve error handling
    ├── config/           # Yapılandırma dosyaları
    ├── lib/              # Utility fonksiyonlar
    └── ui/               # Paylaşılan UI bileşenleri
```

## 🏗️ Mimari Özellikler

### Feature-Based Architecture
Her özellik kendi modülü içinde organize edilmiştir:
- `api/` - API çağrıları ve React Query hooks
- `model/` - Redux slice, types ve selectors
- `ui/` - UI bileşenleri
- `lib/` - Feature-specific utility fonksiyonlar

### State Management Stratejisi
- **Redux Toolkit**: Global UI state (auth, currency, dateFormat, theme)
- **React Query**: Server state, caching, synchronization
- **Local Storage**: Auth state ve theme tercihi persistence

### HTTP Client Architecture
- Interceptor pattern ile otomatik token yenileme
- Race condition koruması
- Centralized error handling
- Retry mekanizması

### Internationalization
- Para birimi: `Intl.NumberFormat` ile formatlama
- Tarih formatları: Dinamik format desteği
- Merkezi utility fonksiyonlar

## 🚦 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Adımlar

1. **Bağımlılıkları yükleyin**
```bash
npm install
```

2. **Environment değişkenlerini ayarlayın**
`.env` dosyası oluşturun:
```env
VITE_API_BASE_URL=https://case.nodelabs.dev/api
```

3. **Development server'ı başlatın**
```bash
npm run dev
```

Uygulama `http://localhost:4008` adresinde çalışacaktır.

4. **Production build**
```bash
npm run build
```

5. **Build'i preview etme**
```bash
npm run preview
```

## 📝 Kullanım

### Authentication
1. `/sign-up` sayfasından yeni hesap oluşturun
2. `/sign-in` sayfasından giriş yapın
3. Token otomatik olarak localStorage'a kaydedilir
4. Token expire olduğunda otomatik yenilenir

### Dashboard
- Dashboard sayfası otomatik olarak finansal verileri yükler
- Para birimi ve tarih formatı header'dan değiştirilebilir
- Tüm veriler seçilen ayarlara göre dinamik olarak güncellenir

### API Entegrasyonu
Tüm API çağrıları `shared/api/httpClient.ts` üzerinden yapılır:
- Otomatik token ekleme
- 401 hatası durumunda token yenileme
- Retry mekanizması

## 🔒 Güvenlik

- JWT token tabanlı kimlik doğrulama
- Refresh token httpOnly cookie'de saklanır
- Access token localStorage'da saklanır
- Otomatik token yenileme mekanizması
- XSS koruması için httpOnly cookies

## 🎨 Styling

- Tailwind CSS utility classes
- **Dark Mode Support**: Tailwind dark mode class-based implementation
- Custom color palette
- Responsive breakpoints
- Custom fonts (Kumbh Sans, Gordita)
- Theme persistence (localStorage)

## 🧪 Geliştirme

### Code Style
- ESLint ile linting
- TypeScript strict mode
- Prettier formatlama (önerilir)

### Best Practices
- Feature-based modüler yapı
- Type-safe API calls
- Error boundary kullanımı
- Loading ve error state'leri
- Accessibility standartları

## 📦 Build & Deploy

### Build
```bash
npm run build
```



**Not**: Bu proje ekstra şeylerde ekledim kendim insiyatif alarak.(Örnek: Header da para birimi dönüştürme ve tarih formatını değiştirme seçenekleri vardır.)
