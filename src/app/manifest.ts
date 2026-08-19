import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kids Daily Planner',
    short_name: 'Jagoan Kecil',
    description: 'Aplikasi jadwal harian anak yang menyenangkan!',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFF9F0',
    theme_color: '#FCD34D',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
