import { motion, HTMLMotionProps } from "framer-motion"
import { ReactNode } from "react"

interface SectionWrapperProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode
  className?: string
  delay?: number
  once?: boolean
}

export const SectionWrapper = ({
  children,
  className = "mb-16",
  delay = 0,
  once = true,
  ...motionProps
}: SectionWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once }}
      transition={{ delay }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}