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
            "radial-gradient(circle at 14% 12%, rgba(145, 65, 172, 0.26), transparent 36%), radial-gradient(circle at 86% 12%, rgba(233, 84, 32, 0.16), transparent 34%), linear-gradient(180deg, #160516 0%, #1c0a24 52%, #170a20 100%)",
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30 [background-image:linear-gradient(rgba(145,65,172,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(233,84,32,0.08)_1px,transparent_1px)] [background-size:58px_58px]" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_46%)]" />

      <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${isPlaying ? "" : "hidden"}`}>
        <div className="absolute -top-20 -left-24 h-72 w-72 rounded-full bg-violet-400/14 blur-3xl animate-[floatOrb_20s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-400/12 blur-3xl animate-[floatOrb_26s_ease-in-out_infinite_reverse]" />
      </div>
    </>
  )
}
