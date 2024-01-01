import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("yanimate-pulse yrounded-md ybg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
