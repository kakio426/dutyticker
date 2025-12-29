import { motion, HTMLMotionProps } from "motion/react"
import { cn } from "@/lib/utils"
import React from "react"

interface AnimatedCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode
}

export function AnimatedCard({ children, className, ...props }: AnimatedCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn("rounded-3xl shadow-xl overflow-hidden", className)}
            {...props}
        >
            {children}
        </motion.div>
    )
}
