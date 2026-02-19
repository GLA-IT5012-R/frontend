"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-center"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          success:
            "bg-green-50 text-green-700 border border-green-500 dark:bg-green-950 dark:text-green-400",
          error:
            "bg-red-50 text-red-700 border border-red-500 dark:bg-red-950 dark:text-red-400",
          warning:
            "bg-yellow-50 text-yellow-700 border border-yellow-500 dark:bg-yellow-950 dark:text-yellow-400",
          info:
            "bg-blue-50 text-blue-700 border border-blue-500 dark:bg-blue-950 dark:text-blue-400",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
