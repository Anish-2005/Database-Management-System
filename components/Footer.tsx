"use client"

import Link from "next/link"

const footerLinks = {
  product: [
    { name: "Home", href: "/" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "Labs", href: "/labs" },
    { name: "Pricing", href: "/pricing" },
  ],
  resources: [
    { name: "Documentation", href: "/documentation" },
    { name: "Resources", href: "/resources" },
    { name: "Practice", href: "/practice" },
    { name: "Community", href: "/community" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Profile", href: "/profile" },
    { name: "Login", href: "/login" },
  ],
}

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-indigo-400/20 bg-slate-950/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold brand-gradient">QuantumDB</h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300/85">
            Professional learning and workflow platform for database engineering teams.
          </p>
          <div className="mt-4 inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-200">
            Built for modern DBMS workflows
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-100">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300/85">
            {footerLinks.product.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="transition-colors hover:text-cyan-200">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-100">Resources</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300/85">
            {footerLinks.resources.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="transition-colors hover:text-cyan-200">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-100">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300/85">
            {footerLinks.company.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="transition-colors hover:text-cyan-200">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-indigo-400/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-xs text-slate-400 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} QuantumDB. All rights reserved.</p>
          <p>Reliable, scalable, and production-ready by design.</p>
        </div>
      </div>
    </footer>
  )
}
