const currencies = {
    AED: 'د.إ',  // United Arab Emirates Dirham
    AFN: 'Afs',  // Afghanistan Afghani
    ALL: 'L',    // Albania Lek
    AMD: '֏',    // Armenia Dram
    ANG: 'ƒ',    // Netherlands Antillean Guilder
    AOA: 'Kz',   // Angola Kwanza
    ARS: '$',    // Argentina Peso
    AUD: '$',    // Australia Dollar
    AWG: 'ƒ',    // Aruba Florin
    AZN: '₼',    // Azerbaijan Manat
    BAM: 'KM',   // Bosnia and Herzegovina Convertible Marka
    BBD: '$',    // Barbados Dollar
    BDT: '৳',    // Bangladesh Taka
    BGN: 'лв',   // Bulgaria Lev
    BHD: 'د.ب',  // Bahrain Dinar
    BIF: 'Fr',   // Burundi Franc
    BMD: '$',    // Bermuda Dollar
    BND: '$',    // Brunei Dollar
    BOB: 'Bs.',  // Bolivia Boliviano
    BRL: 'R$',   // Brazil Real
    BSD: '$',    // Bahamas Dollar
    BTN: 'Nu.',  // Bhutan Ngultrum
    BWP: 'P',    // Botswana Pula
    BYN: 'Br',   // Belarus Ruble
    BZD: '$',    // Belize Dollar
    CAD: '$',    // Canada Dollar
    CDF: 'Fr',   // Democratic Republic of Congo Franc
    CHF: 'CHF',  // Switzerland Franc
    CLP: '$',    // Chile Peso
    CNY: '¥',    // China Yuan
    COP: '$',    // Colombia Peso
    CRC: '₡',    // Costa Rica Colón
    CUP: '₱',    // Cuba Peso
    CVE: '$',    // Cape Verde Escudo
    CZK: 'Kč',   // Czech Republic Koruna
    DJF: 'Fdj',  // Djibouti Franc
    DKK: 'kr',   // Denmark Krone
    DOP: 'RD$',  // Dominican Republic Peso
    DZD: 'د.ج',  // Algeria Dinar
    EGP: 'ج.م',  // Egypt Pound
    ERN: 'Nfk',  // Eritrea Nakfa
    ETB: 'Br',   // Ethiopia Birr
    EUR: '€',    // Eurozone Euro
    FJD: '$',    // Fiji Dollar
    FKP: '£',    // Falkland Islands Pound
    GBP: '£',    // United Kingdom Pound
    GEL: '₾',    // Georgia Lari
    GHS: '₵',    // Ghana Cedi
    GIP: '£',    // Gibraltar Pound
    GMD: 'D',    // Gambia Dalasi
    GNF: 'Fr',   // Guinea Franc
    GTQ: 'Q',    // Guatemala Quetzal
    GYD: '$',    // Guyana Dollar
    HKD: '$',    // Hong Kong Dollar
    HNL: 'L',    // Honduras Lempira
    HRK: 'kn',   // Croatia Kuna
    HTG: 'G',    // Haiti Gourde
    HUF: 'Ft',   // Hungary Forint
    IDR: 'Rp',   // Indonesia Rupiah
    ILS: '₪',    // Israel Shekel
    INR: '₹',    // India Rupee
    IQD: 'د.ع',  // Iraq Dinar
    IRR: '﷼',   // Iran Rial
    ISK: 'kr',   // Iceland Krona
    JMD: '$',    // Jamaica Dollar
    JOD: 'د.ا',  // Jordan Dinar
    JPY: '¥',    // Japan Yen
    KES: 'KSh',  // Kenya Shilling
    KGS: 'лв',   // Kyrgyzstan Som
    KHR: '៛',    // Cambodia Riel
    KMF: 'Fr',   // Comoros Franc
    KRW: '₩',    // South Korea Won
    KWD: 'د.ك',  // Kuwait Dinar
    KYD: '$',    // Cayman Islands Dollar
    KZT: '₸',    // Kazakhstan Tenge
    LAK: '₭',    // Laos Kip
    LBP: 'ل.ل',  // Lebanon Pound
    LKR: 'Rs',   // Sri Lanka Rupee
    LRD: '$',    // Liberia Dollar
    LSL: 'L',    // Lesotho Loti
    LTL: 'Lt',   // Lithuania Litas
    LVL: 'Ls',   // Latvia Lats
    MAD: 'د.م.', // Morocco Dirham
    MDL: 'lei',  // Moldova Leu
    MGA: 'Ar',   // Madagascar Ariary
    MKD: 'ден',  // North Macedonia Denar
    MMK: 'Ks',   // Myanmar Kyat
    MNT: '₮',    // Mongolia Tugrik
    MOP: 'P',    // Macau Pataca
    MRU: 'UM',   // Mauritania Ouguiya
    MUR: 'Rs',   // Mauritius Rupee
    MVR: 'Rf',   // Maldives Rufiyaa
    MWK: 'K',    // Malawi Kwacha
    MXN: '$',    // Mexico Peso
    MYR: 'RM',   // Malaysia Ringgit
    MZN: 'MT',   // Mozambique Metical
    NAD: '$',    // Namibia Dollar
    NPR: 'Rs',   // Nepal Rupee
    NZD: '$',    // New Zealand Dollar
    NGN: '₦',    // Nigeria Naira
    OMR: 'ر.ع.', // Oman Rial
    PAB: 'B/.',  // Panama Balboa
    PEN: 'S/',   // Peru Nuevo Sol
    PGK: 'K',    // Papua New Guinea Kina
    PHP: '₱',    // Philippines Peso
    PKR: '₨',    // Pakistan Rupee
    PLN: 'zł',   // Poland Zloty
    PYG: '₲',    // Paraguay Guarani
    QAR: '﷼',   // Qatar Rial
    RON: 'lei',  // Romania Leu
    RSD: 'дин',  // Serbia Dinar
    RUB: '₽',    // Russia Ruble
    RWF: 'Fr',   // Rwanda Franc
    SAR: 'ر.س',  // Saudi Arabia Riyal
    SBD: '$',    // Solomon Islands Dollar
    SCR: 'Rs',   // Seychelles Rupee
    SDG: 'ج.س.', // Sudan Pound
    SEK: 'kr',   // Sweden Krona
    SGD: '$',    // Singapore Dollar
    SHP: '£',    // Saint Helena Pound
    SLL: 'Le',   // Sierra Leone Leone
    SOS: 'Sh',   // Somalia Shilling
    SRD: '$',    // Suriname Dollar
    SSP: '£',    // South Sudan Pound
    STN: 'Db',   // São Tomé and Príncipe Dobra
    SVC: '$',    // El Salvador Colon
    SYP: 'ل.س',  // Syria Pound
    SZL: 'L',    // Eswatini Lilangeni
    THB: '฿',    // Thailand Baht
    TJS: 'SM',   // Tajikistan Somoni
    TMT: 'm',    // Turkmenistan Manat
    TND: 'د.ت',  // Tunisia Dinar
    TOP: 'T$',   // Tonga Paʻanga
    TRY: '₺',    // Turkey Lira
    TTD: 'TT$',  // Trinidad and Tobago Dollar
    TWD: 'NT$',  // Taiwan Dollar
    TZS: 'Sh',   // Tanzania Shilling
    UAH: '₴',    // Ukraine Hryvnia
    UGX: 'Sh',   // Uganda Shilling
    USD: '$',    // United States Dollar
    UYU: '$',    // Uruguay Peso
    UZS: 'лв',   // Uzbekistan Som
    VEF: 'Bs.F.',// Venezuela Bolívar
    VND: '₫',    // Vietnam Dong
    VUV: 'Vt',   // Vanuatu Vatu
    WST: 'T',    // Samoa Tala
    XOF: 'Fr',   // West African CFA Franc
    YER: '﷼',   // Yemen Rial
    ZAR: 'R',    // South Africa Rand
    ZMW: 'K',    // Zambia Kwacha
    ZWD: 'Z$',   // Zimbabwe Dollar
  };
  
export default currencies;  