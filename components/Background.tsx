"use client"

interface BackgroundProps {
  isPlaying?: boolean
}

export default function Background({ isPlaying = true }: BackgroundProps) {
  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle at 14% 12%, rgba(167, 139, 250, 0.2), transparent 36%), radial-gradient(circle at 86% 12%, rgba(34, 211, 238, 0.18), transparent 34%), linear-gradient(180deg, #080716 0%, #0b0a1c 52%, #0a0c1d 100%)",
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30 [background-image:linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] [background-size:58px_58px]" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_46%)]" />

      <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${isPlaying ? "" : "hidden"}`}>
        <div className="absolute -top-20 -left-24 h-72 w-72 rounded-full bg-violet-400/12 blur-3xl animate-[floatOrb_20s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl animate-[floatOrb_26s_ease-in-out_infinite_reverse]" />
      </div>
    </>
  )
}
