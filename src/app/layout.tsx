import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Orantis Global | Professional IT Consulting & Technology Solutions',
  description: 'Expert IT consulting services to transform your business with cutting-edge technology solutions. Digital transformation, cloud migration, cybersecurity, and more.',
  keywords: 'IT consulting, technology solutions, digital transformation, cloud migration, cybersecurity, software development, Orantis Global',
  authors: [{ name: 'Orantis Global' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Orantis Global | Professional IT Consulting & Technology Solutions',
    description: 'Expert IT consulting services to transform your business with cutting-edge technology solutions.',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
