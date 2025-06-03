"use client"

import React from 'react'
import { DataSection } from './_components/DataSection'
import { useAppCtx } from '~/contexts/app'
import Link from 'next/link'
import { HydrateClient } from '~/trpc/server'

const ResumeAnalysis = () => {
  const { state } = useAppCtx()
  const { resume } = state
  const { parsedText } = resume

  // console.log(parsedText, "parsed text", state)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="text-4xl font-bold">Resume Analysis</h1>

      <br />
      <br />
      <DataSection pdfText={parsedText} />
    </main>
  )
}

export default ResumeAnalysis