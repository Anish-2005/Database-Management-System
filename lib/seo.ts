import type { Metadata } from "next"

export const SITE_NAME = "QuantumDB"

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()

function getSafeSiteUrl() {
  try {
    if (rawSiteUrl) {
      return new URL(rawSiteUrl)
    }
    return new URL("http://localhost:3000")
  } catch {
    return new URL("http://localhost:3000")
  }
}

export const siteUrl = getSafeSiteUrl()
export const SITE_ORIGIN = siteUrl.origin
export const DEFAULT_OG_IMAGE = "/logo-horizontal.svg"

export const defaultKeywords = [
  "database management",
  "DBMS tutorials",
  "SQL practice",
  "database learning platform",
  "database labs",
  "query optimization",
  "database architecture",
]

type SeoOptions = {
  title: string
  description: string
  path: string
  keywords?: string[]
  noIndex?: boolean
}

export function createMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
}: SeoOptions): Metadata {
  return {
    title,
    description,
    keywords: keywords ?? defaultKeywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  }
}

