"use client"

import React from 'react'
import { DataSection } from './_components/DataSection'
import { useAppCtx } from '~/contexts/app'
import Link from 'next/link'
import { HydrateClient } from '~/trpc/server'

const ResumeAnalysis = () => {
  const { state } = useAppCtx()
  const { resume } = state
  const { parsedText, role } = resume

  // console.log(parsedText, "parsed text", state)

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-20">
      <h1 className="text-6xl font-bold text-sidebar-accent-foreground">Resume Analysis</h1>

      <h2 className='text-2xl mt-20 font-bold'>Role: {role}</h2>

      <br />
      <br />
      <DataSection pdfText={parsedText} />
    </main>
  )
}

export default ResumeAnalysis