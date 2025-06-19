import './globals.css'                     // Tailwind base styles

export const metadata = {
  title: 'InSense – Inner Guidance',
  description:
    'InSense is your holistic companion for daily self-reflection, spiritual insights and mindful growth.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FCFCFC] text-[#1E1B2E]">
        {children}
      </body>
    </html>
  )
}
