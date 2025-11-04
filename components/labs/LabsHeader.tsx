import { FlaskConical } from "lucide-react"
import { PageHeader } from "../common/PageHeader"

export default function LabsHeader() {
  return (
    <PageHeader
      badge={{
        icon: FlaskConical,
        text: "Hands-on Learning Labs"
      }}
      title={{
        primary: "Database",
        secondary: "Labs"
      }}
      description="Dive deep into practical database scenarios with our comprehensive lab environment. Build real-world skills through guided exercises and complex database challenges."
    />
  )
}