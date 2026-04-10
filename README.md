# Nirwana Estate - Real Estate Website

Proyek website properti yang dibangun dengan React, TypeScript, dan Tailwind CSS.

## Struktur Folder

```
src/
├── components/          # Komponen React terpisah
│   └── FaqAccordionItem.tsx
├── data/               # Data mock dan konstanta
│   └── mockData.ts
├── hooks/              # Custom hooks
│   ├── useScrollReveal.ts
│   ├── useScrollNavbar.ts
│   └── useActiveSection.ts
├── types/              # TypeScript interfaces
│   └── index.ts
├── utils/              # Fungsi utilitas
│   └── scrollUtils.ts
├── App.tsx             # Komponen utama
└── main.tsx           # Entry point
```

## Fitur

- **Hero Section** dengan slider gambar otomatis
- **Filter Properti** berdasarkan lokasi dan tipe
- **Galeri Properti** dengan modal detail
- **Testimoni** dengan animasi marquee
- **FAQ Accordion** interaktif
- **Navigation** yang responsif dengan efek scroll
- **Animasi Scroll Reveal** untuk pengalaman yang smooth

## Teknologi

- React 18
- TypeScript
- Tailwind CSS
- Lucide React (ikon)
- Vite (build tool)

## Cara Menjalankan

1. Install dependencies:
   ```bash
   npm install
   ```

2. Jalankan development server:
   ```bash
   npm run dev
   ```

3. Build untuk production:
   ```bash
   npm run build
   ```

## Struktur Kode yang Rapi

Kode telah diorganisir dengan baik untuk kemudahan maintenance:

- **Components**: Komponen UI terpisah untuk reusability
- **Data**: Data mock terpusat untuk mudah diubah
- **Hooks**: Logika state dan efek terpisah
- **Types**: Type definitions untuk type safety
- **Utils**: Fungsi helper yang bisa digunakan ulang

## Optimisasi

- Lazy loading untuk gambar
- Intersection Observer untuk animasi scroll
- Debounced scroll events
- CSS animations yang performant
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
