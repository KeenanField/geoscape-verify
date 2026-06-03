import { AnimatePresence, motion } from "motion/react"
import { Monitor, Moon, Sun } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

const ORDER = ["light", "dark", "system"] as const

const ICONS = {
  light: Sun,
  dark: Moon,
  system: Monitor,
}

const LABELS = {
  light: "Light",
  dark: "Dark",
  system: "System",
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const Icon = ICONS[theme]

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]
        setTheme(next)
      }}
      aria-label={`Theme: ${LABELS[theme]}. Click to switch.`}
      title={`Theme: ${LABELS[theme]}`}
      className="relative overflow-hidden"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
          exit={{ y: -14, opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 360, damping: 26 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Icon className="size-4" />
        </motion.span>
      </AnimatePresence>
    </Button>
  )
}
