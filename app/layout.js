import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../lib/auth/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'InSense',
  description: 'InSense by Red',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
