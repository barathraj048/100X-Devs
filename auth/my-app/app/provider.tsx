'use client'
import React from 'react'
import { SessionProvider } from "next-auth/react"

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SessionProvider>
        {children}
      </SessionProvider>
    </div>
  )
}

export default Provider
