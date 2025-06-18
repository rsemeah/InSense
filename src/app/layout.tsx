import './globals.css'
import { Inter } from 'next/font/google'
import { Header } from '../components/Header'
import { Navigation } from '../components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'InSense',
  description: 'InSense by Red',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Navigation />
      </body>
    </html>
  )
}
