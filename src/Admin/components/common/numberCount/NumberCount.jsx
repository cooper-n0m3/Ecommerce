import { animate, motion, useMotionValue, useTransform } from "motion/react"
import { useEffect } from "react"

export default function NumberCount({ Number, className = "" }) {
    const count = useMotionValue(0)
    const rounded = useTransform(count, (latest) => String(Math.round(latest)).padStart(4, "0")) // Ensures 4-digit format

    const text = {
        fontSize: 25,
        color: "#4ff0b7",
        fontFamily: "'Asap', sans-serif", // Monospace font for better alignment
        fontWeight: 600, // Bold to make numbers pop
        letterSpacing: "2px", // Adds spacing for clarity
    }

    useEffect(() => {
        const controls = animate(count, Number, { duration: 3 })
        return () => controls.stop()
    }, [Number]) // Ensure animation updates when the number changes

    return <motion.pre style={text} className={className}>{rounded}</motion.pre>
}
