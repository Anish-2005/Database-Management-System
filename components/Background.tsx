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
            "radial-gradient(circle at 10% 10%, rgba(37,99,235,0.14), transparent 38%), radial-gradient(circle at 85% 15%, rgba(14,165,233,0.12), transparent 42%), linear-gradient(180deg, #0b1220 0%, #0a101d 55%, #090f1b 100%)",
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_45%)]" />

      <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${isPlaying ? "" : "hidden"}`}>
        <div className="absolute -top-20 -left-24 h-72 w-72 rounded-full bg-blue-400/8 blur-3xl animate-[floatOrb_20s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-300/8 blur-3xl animate-[floatOrb_26s_ease-in-out_infinite_reverse]" />
      </div>
    </>
  )
}
