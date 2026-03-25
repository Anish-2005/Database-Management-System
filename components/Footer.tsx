"use client"

import Link from "next/link"
import BrandLogo from "./BrandLogo"

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
    { name: "Settings", href: "/settings" },
    { name: "Login", href: "/login" },
  ],
}

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-violet-400/25 bg-[#150718]/75">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <BrandLogo
            size="md"
            subtitle="Industry-grade database learning platform"
            className="mb-1"
          />
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300/85">
            Professional learning and workflow platform for database engineering teams.
          </p>
          <div className="mt-4 inline-flex items-center rounded-full border border-violet-300/35 bg-violet-500/12 px-3 py-1 text-xs text-violet-100">
            Built for modern DBMS workflows
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-100">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300/85">
            {footerLinks.product.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="transition-colors hover:text-orange-200">
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
                <Link href={link.href} className="transition-colors hover:text-orange-200">
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
                <Link href={link.href} className="transition-colors hover:text-orange-200">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-violet-400/25">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-xs text-slate-400 sm:px-6 lg:px-8">
          <p>(c) {new Date().getFullYear()} QuantumDB. All rights reserved.</p>
          <p>Reliable, scalable, and production-ready by design.</p>
        </div>
      </div>
    </footer>
  )
}
