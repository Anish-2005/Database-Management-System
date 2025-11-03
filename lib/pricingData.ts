import {
  Rocket,
  Database,
  Zap,
  Shield,
  HardDrive,
  Clock,
  Check,
} from "lucide-react"

export interface PricingPlan {
  name: string
  description: string
  price: { monthly: number; annual: number }
  features: string[]
  icon: any
  gradient: string
  popular: boolean
  cta: string
}

export interface Addon {
  name: string
  price: string
  icon: any
  color: string
}

export interface ComparisonFeature {
  feature: string
  starter: string | boolean
  pro: string | boolean
  enterprise: string | boolean
}

export interface FAQ {
  q: string
  a: string
}

export const pricingPlans: PricingPlan[] = [
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

export const addons: Addon[] = [
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

export const comparisonFeatures: ComparisonFeature[] = [
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

export const faqs: FAQ[] = [
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
]