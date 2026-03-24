"use client"

import { Database, ShieldCheck, Gauge, Workflow, BarChart3, Cpu } from "lucide-react"
import Navbar from "../components/Navbar"
import Background from "../components/Background"
import Footer from "../components/Footer"

const highlights = [
  {
    icon: Gauge,
    title: "High Performance",
    description: "Optimized query flows and practical learning tracks for real-world workloads.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Foundation",
    description: "Strong defaults for security, consistency, and maintainable data operations.",
  },
  {
    icon: Workflow,
    title: "Structured Learning",
    description: "Tutorials, labs, and practice challenges organized into a clear progression.",
  },
  {
    icon: BarChart3,
    title: "Progress Visibility",
    description: "Track achievements, skills, and recent activity from one dashboard.",
  },
  {
    icon: Cpu,
    title: "Hands-On Labs",
    description: "Practical exercises for indexing, transactions, optimization, and scaling.",
  },
  {
    icon: Database,
    title: "Complete Toolkit",
    description: "Reference docs, resources, and community support in one place.",
  },
]

export default function HomePage() {
  return (
    <div className="app-shell">
      <Background isPlaying={false} />
      <Navbar currentPage="Home" showLaunchDemo />

      <main className="app-main">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="surface-panel px-6 py-14 sm:px-10 sm:py-16">
            <p className="text-sm font-semibold tracking-[0.16em] text-cyan-300 uppercase">
              Database Management Platform
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
              Professional, focused workspace for database engineering skills
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              QuantumDB brings tutorials, labs, documentation, and progress tracking together in
              a clean interface designed for consistent daily use by students and engineering teams.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/tutorials"
                className="rounded-md bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
              >
                Start Learning
              </a>
              <a
                href="/documentation"
                className="rounded-md border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-slate-600 hover:bg-slate-800"
              >
                Browse Documentation
              </a>
            </div>
          </section>

          <section className="mt-14">
            <div className="mb-8">
              <h2 className="section-title">What You Can Do</h2>
              <p className="section-subtitle mt-3 max-w-3xl">
                Built to reduce friction and keep attention on outcomes, not visual noise.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon
                return (
                  <article
                    key={item.title}
                    className="surface-panel p-6 transition-colors hover:border-slate-600"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 ring-1 ring-slate-700">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                  </article>
                )
              })}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
