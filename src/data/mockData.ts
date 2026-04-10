import type { Property, TestimonialItem, FaqItem, NavLink } from '../types';

export const HERO_SLIDES = [
    "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
];

export const NAV_LINKS: NavLink[] = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Properti', href: '#properti' },
    { label: 'Layanan', href: '#layanan' },
    { label: 'Tentang', href: '#keunggulan' },
    { label: 'Testimoni', href: '#testimoni' },
];

export const TESTIMONIALS: TestimonialItem[] = [
    {
        name: "Budi Santoso",
        role: "Pengusaha",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        quote: "Membeli rumah di Home Property adalah keputusan terbaik. Proses legalitas sangat transparan dan dibantu penuh hingga serah terima kunci."
    },
    {
        name: "Siti Rahmawati",
        role: "Dokter Spesialis",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        quote: "Desain rumahnya sangat elegan dan pencahayaan alaminya luar biasa. Tim sales tidak pushy, malah sangat solutif mencarikan unit sesuai budget."
    },
    {
        name: "Ahmad & Diana",
        role: "Keluarga Baru",
        image: "https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        quote: "Kami mengambil unit subsidi di Jatiagung. Walau subsidi, kualitas bangunan dan jalan perumahannya sangat premium melebihi ekspektasi kami."
    },
    {
        name: "Rina Gunawan",
        role: "Desainer Interior",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        quote: "Layout ruangannya sangat efisien. Saya tidak perlu banyak merombak ulang. Sangat cocok untuk gaya hidup modern dan minimalis."
    },
    {
        name: "Hendra Wijaya",
        role: "Karyawan BUMN",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        quote: "Sangat puas dengan fasilitas cluster-nya. Anak-anak bisa bermain dengan aman, dan security 24 jam membuat pikiran tenang saat dinas luar kota."
    }
];

export const FAQS: FaqItem[] = [
    {
        question: "Apakah bisa KPR dan bank apa saja yang bekerja sama?",
        answer: "Tentu bisa. Kami telah bekerja sama dengan lebih dari 10 bank nasional terkemuka (BCA, Mandiri, BNI, BTN, BSI, dll) untuk memudahkan proses KPR Anda dengan suku bunga yang kompetitif."
    },
    {
        question: "Berapa lama proses serah terima kunci (Handover)?",
        answer: "Untuk unit ready stock, serah terima kunci dapat dilakukan maksimal 14 hari kerja setelah akad kredit/pelunasan. Untuk unit inden, estimasi pembangunan memakan waktu 6-8 bulan."
    },
    {
        question: "Apakah harga yang tertera sudah termasuk pajak dan biaya notaris?",
        answer: "Harga yang tertera (All-in) mayoritas sudah termasuk PPN, BPHTB, Biaya Balik Nama, dan Notaris. Namun untuk biaya provisi KPR biasanya terpisah. Agen kami akan memberikan rincian transparan sebelum Anda booking."
    },
    {
        question: "Bisakah saya melakukan kustomisasi desain interior/denah?",
        answer: "Untuk unit komersil inden, Anda diberikan kebebasan merombak denah bagian dalam (selama tidak mengubah struktur utama dan fasad). Kami juga menyediakan layanan desain interior tambahan."
    }
];

export const PROPERTIES: Property[] = [
    {
        id: 1, title: "Griya Kirana Way Halim", location: "Bandar Lampung", type: "Rumah Komersil", price: "Rp 1.200.000.000",
        beds: 3, baths: 2, area: 150, image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        desc: "Berdiri tegak di denyut nadi Way Halim. Hunian ini bukan sekadar dinding pelindung, tapi ruang bertumbuh keluarga dengan pencahayaan alami optimal dan ventilasi silang yang menyejukkan."
    },
    {
        id: 2, title: "Pesona Kemiling Sejahtera", location: "Bandar Lampung", type: "Rumah Subsidi", price: "Rp 162.000.000",
        beds: 2, baths: 1, area: 60, image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1524813686514-a57563d77965?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502672023488-70e25813eb80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        desc: "Wujudkan impian memiliki rumah pertama di lingkungan yang asri dan sejuk. Udara bersih Kemiling menjadi teman Anda menyeruput teh hangat di teras rumah setiap pagi."
    },
    {
        id: 3, title: "Pramuka Hill Rajabasa", location: "Bandar Lampung", type: "Rumah Komersil", price: "Rp 850.000.000",
        beds: 3, baths: 2, area: 120, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        desc: "Tersembunyi dari hiruk pikuk namun selangkah dari akses tol dan pusat pendidikan. Desain fasad skandinavia yang manis memberikan kesan 'homey' seketika Anda memarkir kendaraan."
    },
    {
        id: 4, title: "Luminance Heights", location: "Jakarta", type: "Apartemen", price: "Rp 3.200.000.000",
        beds: 2, baths: 2, area: 120, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1e52508241?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        desc: "Oase vertikal di tengah kota metropolitan. Bayangkan melepas lelah sembari menatap kerlip lampu kota dari ketinggian, diiringi privasi tingkat tinggi."
    },
    {
        id: 5, title: "Senja Villa Seminyak", location: "Bali", type: "Villa", price: "Rp 5.500.000.000",
        beds: 4, baths: 4, area: 450, image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        desc: "Retret pribadi yang menyatukan unsur tropis dan kenyamanan modern. Ruang terbuka tanpa sekat membingkai kolam renang seakan menjadi oase peristirahatan harian Anda."
    },
    {
        id: 6, title: "Graha Pakuwon Harmoni", location: "Surabaya", type: "Rumah Komersil", price: "Rp 4.100.000.000",
        beds: 4, baths: 3, area: 250, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        desc: "Elegansi tata ruang yang dirancang untuk mendukung interaksi hangat keluarga besar. Setiap sudutnya dirancang dengan presisi, memancarkan wibawa dan rasa tenang."
    }
];