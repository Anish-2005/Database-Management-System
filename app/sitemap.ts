import type { MetadataRoute } from "next"
import { SITE_ORIGIN } from "@/lib/seo"

const publicRoutes = [
  "",
  "/about",
  "/tutorials",
  "/labs",
  "/practice",
  "/resources",
  "/progress",
  "/documentation",
  "/community",
  "/pricing",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return publicRoutes.map((route) => ({
    url: `${SITE_ORIGIN}${route || "/"}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }))
}

