import { Info } from "lucide-react"
import { PageHeader } from "../common/PageHeader"

export const AboutHeader = () => {
  return (
    <PageHeader
      badge={{
        icon: Info,
        text: "About QuantumDB"
      }}
      title={{
        primary: "Revolutionizing",
        secondary: "Database Learning"
      }}
      description="QuantumDB is an innovative, AI-powered learning platform designed to make database management accessible, engaging, and effective for everyone, from beginners to experts."
    />
  )
}