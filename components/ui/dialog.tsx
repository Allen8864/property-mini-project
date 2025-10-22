"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange?.(false)
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange?.(false)}
      />
      {/* Content */}
      <div className="relative z-50 w-full max-w-lg mx-4">
        {children}
      </div>
    </div>
  )
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative bg-background p-6 shadow-lg rounded-lg border max-h-[90vh] overflow-y-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
DialogContent.displayName = "DialogContent"

const DialogHeader = ({ className, children, ...props }: DialogHeaderProps) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)}
    {...props}
  >
    {children}
  </div>
)

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </h2>
  )
)
DialogTitle.displayName = "DialogTitle"

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)
DialogClose.displayName = "DialogClose"

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose }