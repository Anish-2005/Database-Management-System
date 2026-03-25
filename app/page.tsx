"use client"

import { ArrowRight, BarChart3, BookOpen, Boxes, Database, ShieldCheck, Zap } from "lucide-react"
import Navbar from "../components/Navbar"
import Background from "../components/Background"
import Footer from "../components/Footer"

const kpis = [
  { label: "Interactive Tutorials", value: "140+" },
  { label: "Hands-on Labs", value: "80+" },
  { label: "Practice Challenges", value: "250+" },
  { label: "Community Members", value: "12k+" },
]

const modules = [
  {
    icon: BookOpen,
    title: "Guided Learning",
    text: "Structured tutorial paths from fundamentals to advanced query optimization.",
    href: "/tutorials",
  },
  {
    icon: Boxes,
    title: "Lab Environment",
    text: "Apply concepts in realistic labs covering schema design, indexing, and tuning.",
    href: "/labs",
  },
  {
    icon: BarChart3,
    title: "Progress Intelligence",
    text: "Measure growth with skill tracking, milestones, and personalized practice loops.",
    href: "/progress",
  },
]

const capabilities = [
  {
    icon: Database,
    name: "Production-Grade Content",
    detail: "Focused on real DBMS workflows used in engineering teams.",
  },
  {
    icon: ShieldCheck,
    name: "Reliable Learning Flow",
    detail: "Clear navigation and consistent interface patterns across all modules.",
  },
  {
    icon: Zap,
    name: "Fast Iteration",
    detail: "Move between docs, labs, and practice without context switching overhead.",
  },
]

export default function HomePage() {
  return (
    <div className="app-shell">
      <Background isPlaying />
      <Navbar currentPage="Home" subtitle="Next-Gen Database System" showLaunchDemo />

      <main className="app-main">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="surface-panel px-6 py-14 sm:px-10 sm:py-16">
            <span className="brand-badge">Industry-Focused DBMS Platform</span>
            <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
              <span className="brand-gradient">Professional learning flow</span> for modern database engineering
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300/90">
              Keep the energy of the original theme while bringing enterprise clarity to your
              workflow. Learn, practice, document, and track progress in one consistent platform.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="/tutorials" className="btn-brand inline-flex items-center gap-2">
                Start Tutorials
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/labs"
                className="rounded-lg border border-violet-300/30 bg-[#2a1133]/72 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:border-orange-300/55 hover:bg-[#351941]/90"
              >
                Explore Labs
              </a>
            </div>
          </section>

          <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((item) => (
              <article key={item.label} className="surface-panel panel-hover p-5">
                <p className="text-3xl font-semibold brand-gradient">{item.value}</p>
                <p className="mt-2 text-sm text-slate-200/90">{item.label}</p>
              </article>
            ))}
          </section>

          <section className="mt-14">
            <div className="mb-8">
              <h2 className="section-title">Core Modules</h2>
              <p className="section-subtitle mt-3 max-w-3xl">
                A clean progression designed to reduce clutter and keep momentum high.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {modules.map((module) => {
                const Icon = module.icon
                return (
                  <article key={module.title} className="surface-panel panel-hover p-6">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/20 ring-1 ring-violet-300/35">
                      <Icon className="h-5 w-5 text-orange-200" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100">{module.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300/85">{module.text}</p>
                    <a
                      href={module.href}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-orange-200 hover:text-orange-100"
                    >
                      Open Module
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="mt-14 grid gap-5 md:grid-cols-3">
            {capabilities.map((capability) => {
              const Icon = capability.icon
              return (
                <article key={capability.name} className="surface-panel p-6">
                  <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/12 ring-1 ring-orange-300/30">
                    <Icon className="h-4 w-4 text-orange-200" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-100">{capability.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300/85">{capability.detail}</p>
                </article>
              )
            })}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
