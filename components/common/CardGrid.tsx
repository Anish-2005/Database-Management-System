import { motion } from "framer-motion"
import { ReactNode } from "react"

interface CardGridProps {
  children: ReactNode[]
  columns?: 2 | 3 | 4
  className?: string
  itemAnimation?: boolean
}

export const CardGrid = ({
  children,
  columns = 3,
  className = "",
  itemAnimation = true
}: CardGridProps) => {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4"
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
      {children.map((child, index) => (
        itemAnimation ? (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            {child}
          </motion.div>
        ) : (
          <div key={index}>{child}</div>
        )
      ))}
    </div>
  )
}