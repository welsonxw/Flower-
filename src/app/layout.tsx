import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-elegant',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic']
})

export const metadata: Metadata = {
  title: 'Bloom for Her 🌸 | International Women\'s Day',
  description: 'Celebrate the women who inspire you with a beautiful animated bouquet',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${playfair.variable} min-h-screen flex flex-col relative`}>
        <main className="flex-1">{children}</main>
        <footer className="py-4 text-center text-sm text-white bg-transparent absolute bottom-0 w-full">
          © {new Date().getFullYear()} eXisT
        </footer>
      </body>
    </html>
  )
}
