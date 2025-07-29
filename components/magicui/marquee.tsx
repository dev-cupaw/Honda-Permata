import { cn } from "@/lib/utils"
import React from "react"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children?: React.ReactNode
  vertical?: boolean
  repeat?: number
  [key: string]: any
}

const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  ({ className, reverse = false, pauseOnHover = false, children, vertical = false, repeat = 4, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "group flex overflow-hidden p-2 [--gap:1rem] [--duration:20s] [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]",
          {
            "flex-row": !vertical,
            "flex-col": vertical,
          },
          className,
        )}
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
                "animate-marquee flex-row": !vertical,
                "animate-marquee-vertical flex-col": vertical,
                "group-hover:[animation-play-state:paused]": pauseOnHover,
                "[animation-direction:reverse]": reverse,
              })}
            >
              {children}
            </div>
          ))}
      </div>
    )
  },
)

Marquee.displayName = "Marquee"

export { Marquee }
