"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Rocket,
  Database,
  Zap,
  Shield,
  Globe,
  Check,
  Star,
  TrendingUp,
  Users,
  Clock,
  HardDrive,
  Cpu,
  Activity,
  Lock,
  Cloud,
  BarChart3,
  ArrowUpRight,
  Sparkles,
  Award,
  Heart,
  CreditCard,
  Calendar
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Background from "../../components/Background"

export default function PricingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  // Load animation state from localStorage after hydration
  useEffect(() => {
    const saved = localStorage.getItem('animation-playing')
    if (saved !== null) {
      setIsPlaying(JSON.parse(saved))
    }
  }, [])

  // Save animation state to localStorage
  useEffect(() => {
    localStorage.setItem('animation-playing', JSON.stringify(isPlaying))
  }, [isPlaying])

  const plans = [
    {
      name: "Starter",
      description: "Perfect for learning and small projects",
      price: { monthly: 0, annual: 0 },
      features: [
        "1 Database instance",
        "1 GB Storage",
        "100 Connections",
        "Community Support",
        "Basic Analytics",
        "99.5% Uptime SLA",
        "Daily Backups",
        "Standard Security"
      ],
      icon: Rocket,
      gradient: "from-green-500 to-emerald-500",
      popular: false,
      cta: "Get Started Free"
    },
    {
      name: "Professional",
      description: "For production applications and teams",
      price: { monthly: 49, annual: 490 },
      features: [
        "5 Database instances",
        "50 GB Storage",
        "1,000 Connections",
        "Priority Support",
        "Advanced Analytics",
        "99.9% Uptime SLA",
        "Hourly Backups",
        "Enhanced Security",
        "Query Optimization",
        "Performance Monitoring",
        "Team Collaboration"
      ],
      icon: Database,
      gradient: "from-purple-500 to-pink-500",
      popular: true,
      cta: "Start Free Trial"
    },
    {
      name: "Enterprise",
      description: "For large-scale applications with custom needs",
      price: { monthly: 299, annual: 2990 },
      features: [
        "Unlimited Databases",
        "500 GB Storage",
        "10,000+ Connections",
        "24/7 Dedicated Support",
        "Custom Analytics",
        "99.99% Uptime SLA",
        "Real-time Backups",
        "Enterprise Security",
        "Custom Query Engine",
        "Advanced Monitoring",
        "Multi-region Deployment",
        "Compliance Tools",
        "Custom SLA",
        "White-label Option"
      ],
      icon: Zap,
      gradient: "from-cyan-500 to-blue-500",
      popular: false,
      cta: "Contact Sales"
    }
  ]

  const addons = [
    {
      name: "Extra Storage",
      price: "$5 per 10GB",
      icon: HardDrive,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Additional Instances",
      price: "$20 per instance",
      icon: Database,
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Priority Support",
      price: "$99/month",
      icon: Clock,
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Advanced Security",
      price: "$149/month",
      icon: Shield,
      color: "from-red-500 to-pink-500"
    }
  ]

  const comparison = [
    { feature: "Database Instances", starter: "1", pro: "5", enterprise: "Unlimited" },
    { feature: "Storage", starter: "1 GB", pro: "50 GB", enterprise: "500 GB" },
    { feature: "Connections", starter: "100", pro: "1,000", enterprise: "10,000+" },
    { feature: "Backup Frequency", starter: "Daily", pro: "Hourly", enterprise: "Real-time" },
    { feature: "Uptime SLA", starter: "99.5%", pro: "99.9%", enterprise: "99.99%" },
    { feature: "Support", starter: "Community", pro: "Priority", enterprise: "24/7 Dedicated" },
    { feature: "Analytics", starter: "Basic", pro: "Advanced", enterprise: "Custom" },
    { feature: "Security", starter: "Standard", pro: "Enhanced", enterprise: "Enterprise" },
    { feature: "Multi-region", starter: false, pro: false, enterprise: true },
    { feature: "Custom SLA", starter: false, pro: false, enterprise: true },
    { feature: "White-label", starter: false, pro: false, enterprise: true }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      <Background isPlaying={isPlaying} />

      {/* Navigation */}
      <Navbar
        currentPage="Pricing"
        subtitle="Choose Your Plan"
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <div className="relative z-10 pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-sm font-medium text-cyan-400 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <CreditCard className="w-4 h-4" />
              Flexible Pricing Plans
            </motion.span>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Simple,
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Transparent Pricing
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan for your needs. Start free and scale as you grow.
              All plans include our core features with no hidden fees.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center items-center gap-4 mb-12"
          >
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
              Monthly
            </span>
            <motion.button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="relative w-16 h-8 bg-slate-800 rounded-full border border-slate-700"
            >
              <motion.div
                className="absolute top-1 left-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                animate={{ x: billingCycle === 'annual' ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
            <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-white' : 'text-slate-400'}`}>
              Annual
            </span>
            {billingCycle === 'annual' && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-400"
              >
                Save 17%
              </motion.span>
            )}
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {plans.map((plan, index) => {
              const Icon = plan.icon
              const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual
              const displayPrice = billingCycle === 'annual' ? Math.floor(price / 12) : price

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`relative p-8 rounded-3xl backdrop-blur-sm border transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-purple-500/50 shadow-2xl shadow-purple-500/20'
                      : 'bg-slate-900/30 border-slate-700 hover:border-purple-500/30'
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-medium text-white shadow-lg">
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg mb-6`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Plan Info */}
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">${displayPrice}</span>
                      <span className="text-slate-400">/month</span>
                    </div>
                    {billingCycle === 'annual' && price > 0 && (
                      <p className="text-sm text-slate-500 mt-1">Billed annually at ${price}</p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full px-6 py-3 rounded-xl font-semibold mb-6 transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-slate-800/40 text-white hover:bg-slate-700/40 border border-slate-700'
                    }`}
                  >
                    {plan.cta}
                  </motion.button>

                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Add-ons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Available Add-ons</h2>
              <p className="text-slate-400">Customize your plan with additional features</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {addons.map((addon, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-purple-500/50 transition-all text-center"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${addon.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <addon.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{addon.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{addon.price}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl text-slate-300 hover:text-white transition-colors border border-slate-700 text-sm"
                  >
                    Add to Plan
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Plan Comparison</h2>
              <p className="text-slate-400">Compare features across all plans</p>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[800px] bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-4 gap-4 p-6 border-b border-slate-700 bg-slate-800/40">
                  <div className="font-semibold text-white">Feature</div>
                  <div className="text-center font-semibold text-white">Starter</div>
                  <div className="text-center font-semibold text-white">Professional</div>
                  <div className="text-center font-semibold text-white">Enterprise</div>
                </div>

                {/* Rows */}
                {comparison.map((row, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-4 gap-4 p-6 ${
                      index !== comparison.length - 1 ? 'border-b border-slate-700/50' : ''
                    }`}
                  >
                    <div className="text-slate-300">{row.feature}</div>
                    <div className="text-center">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? (
                          <Check className="w-5 h-5 text-green-400 mx-auto" />
                        ) : (
                          <span className="text-slate-500">—</span>
                        )
                      ) : (
                        <span className="text-slate-300">{row.starter}</span>
                      )}
                    </div>
                    <div className="text-center">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <Check className="w-5 h-5 text-green-400 mx-auto" />
                        ) : (
                          <span className="text-slate-500">—</span>
                        )
                      ) : (
                        <span className="text-slate-300">{row.pro}</span>
                      )}
                    </div>
                    <div className="text-center">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? (
                          <Check className="w-5 h-5 text-green-400 mx-auto" />
                        ) : (
                          <span className="text-slate-500">—</span>
                        )
                      ) : (
                        <span className="text-slate-300">{row.enterprise}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-400">Everything you need to know about our pricing</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Can I change plans anytime?",
                  a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards, PayPal, and bank transfers for enterprise plans."
                },
                {
                  q: "Is there a free trial available?",
                  a: "Yes, all paid plans come with a 14-day free trial. No credit card required."
                },
                {
                  q: "What happens if I exceed my plan limits?",
                  a: "You'll receive a notification and can either upgrade your plan or purchase add-ons."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-2xl"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-slate-400">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="relative p-12 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-3xl overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Still have questions?
                </h2>
                <p className="text-xl text-slate-400 mb-8">
                  Our sales team is here to help you choose the right plan
                </p>
                <div className="flex gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white shadow-lg shadow-purple-500/25"
                  >
                    Contact Sales
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl font-semibold text-white border border-slate-700"
                  >
                    Schedule Demo
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
