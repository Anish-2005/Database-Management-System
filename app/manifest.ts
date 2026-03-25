import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "QuantumDB",
    short_name: "QuantumDB",
    description:
      "Professional platform for learning database systems through tutorials, labs, and practice.",
    start_url: "/",
    display: "standalone",
    background_color: "#2c001e",
    theme_color: "#77216f",
    icons: [
      {
        src: "/logo-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  }
}

