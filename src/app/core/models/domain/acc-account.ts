
export interface AccAccount {
    // Firma Genel Bilgileri
    name: string;                     // Firma Adı
    taxId: string | null;             // Vergi Numarası
    phone1: string | null;            // Telefon Numarası
    phone2: string | null;            // Telefon Numarası
    email: string | null;             // E-posta
    website: string | null;           // Web Sitesi

    accIndustryId: number | null;     // Sektör ID'si
    accIndustry?: AccIndustry | null; // Sektör (opsiyonel ve null olabilir)

    // Finansal Bilgiler
    bankAccountNumber: string | null; // Banka Hesap Numarası
    bankName: string | null;          // Banka Adı

    // Müşteri Özellikleri
    accountType: AccAccountTypeEnum | null; // Müşteri Tipi
    isVerified: boolean | null;             // Doğrulandı mı?
    creditLimit: number | null;             // Kredi Limiti
    paymentTerms: string | null;            // Ödeme Şartları

    // Sosyal Medya ve Web Bilgileri
    facebookUrl: string | null;            // Facebook URL
    twitterUrl: string | null;             // Twitter URL
    linkedInUrl: string | null;            // LinkedIn URL

    // Firma Durumu
    isActive: boolean | null;              // Firma aktif mi?

    // İlişkili Tablolar
    addresses?: (AccAddress | null)[] | null; // Adresler (null içerebilecek bir dizi veya null olabilir)
    contacts?: (AccContact | null)[] | null;  // İletişim bilgileri (aynı şekilde)
    itemTransactions?: (ItrItemTransaction | null)[] | null; // Ürün işlemleri
  }

  // Sektör arayüzü
  export interface AccIndustry {
    id: number | null;
    name: string | null;                // Sektör Adı
  }

  // Adres arayüzü
  export interface AccAddress {
    // Adres detayları buraya eklenebilir
  }

  // İletişim bilgileri arayüzü
  export interface AccContact {
    // İletişim detayları buraya eklenebilir
  }

  // Ürün işlemleri arayüzü
  export interface ItrItemTransaction {
    // Ürün işlem detayları buraya eklenebilir
  }


// Enum (Müşteri Tipleri)
export enum AccAccountTypeEnum {
    Individual = 0, // Bireysel
    Corporate = 1,  // Kurumsal
  }
