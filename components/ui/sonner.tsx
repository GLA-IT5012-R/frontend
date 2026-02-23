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
  const { theme = "light" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-center"
      className="toaster group z-10"
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
            "bg-green-50 text-blue-400 border border-green-500 ",
          error:
            "bg-red-50 text-red-400 border border-red-500 ",
          warning:
            "bg-yellow-50 text-yellow-500 border border-yellow-500  ",
          info:
            "bg-blue-50 text-blue-700 border border-blue-500 ",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
