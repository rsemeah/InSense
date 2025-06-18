export default function HomePage() {
  return (
    <div className="min-h-screen bg-white p-8 text-gray-800">
      <h1 className="text-3xl font-bold text-red-500 mb-4">InSense by Red</h1>
      <p className="mt-4 text-lg mb-8">
        Your sacred space for self-discovery and spiritual growth.
      </p>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <a
          href="/checkup"
          className="block p-6 bg-red-50 rounded-lg border border-red-100 hover:bg-red-100 transition-all"
        >
          <h2 className="text-xl font-semibold mb-2">Daily Check-In</h2>
          <p>Record your emotional, mental, physical, and spiritual state.</p>
        </a>

        <a
          href="/inner-horizon"
          className="block p-6 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-all"
        >
          <h2 className="text-xl font-semibold mb-2">Inner Horizon</h2>
          <p>Define your vision and clarity path with gentle guidance.</p>
        </a>
      </div>
    </div>
  )
}
