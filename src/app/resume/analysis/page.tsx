"use client"

import React from 'react'
import { DataSection } from './_components/DataSection'
import { CurrentRoleBadge } from '../_components/CurrentRoleBadge'

const ResumeAnalysis = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-20">
      <h1 className="text-6xl font-bold text-sidebar-accent-foreground">Resume Analysis</h1>

      <CurrentRoleBadge />

      <br />
      <br />
      <DataSection  />
    </main>
  )
}

export default ResumeAnalysis