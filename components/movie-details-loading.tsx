"use client"

import { Loader2 } from "lucide-react"

export function MovieDetailsLoading() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex items-center gap-2 bg-card p-4 rounded-lg shadow-lg">
        <Loader2 className="h-6 w-6 animate-spin" />
        <p className="text-lg">Loading movie details...</p>
      </div>
    </div>
  )
}