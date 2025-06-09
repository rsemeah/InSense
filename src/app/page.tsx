"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-black/50 backdrop-blur-sm">
        <h1 className="text-5xl font-extrabold text-center mb-6 drop-shadow-xl">
          InSense <span className="text-red-brand">by Red</span>
        </h1>
        <p className="text-xl text-center max-w-xl mb-8 text-white/90 drop-shadow-md">
          A sanctuary for inner alignment. Check in with your Emotional, Mental, Physical, and Spiritual self — then receive loving reflection.
        </p>
        <Link
          href="/check-ups"
          className="px-8 py-4 text-lg font-semibold bg-red-brand rounded-full shadow-lg hover:bg-red-600 transition"
        >
          Begin Your Journey
        </Link>
      </div>
    </main>
  );
}
