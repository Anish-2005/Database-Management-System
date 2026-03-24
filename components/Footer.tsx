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
    <footer className="relative z-10 mt-20 border-t border-slate-800 bg-slate-950/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-100">QuantumDB</h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            Professional learning and workflow platform for database engineering teams.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-200">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            {footerLinks.product.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-slate-100">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-200">Resources</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            {footerLinks.resources.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-slate-100">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-200">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            {footerLinks.company.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-slate-100">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-xs text-slate-500 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} QuantumDB. All rights reserved.</p>
          <p>Built for reliable, scalable data systems.</p>
        </div>
      </div>
    </footer>
  )
}
