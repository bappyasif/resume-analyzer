"use client"

import React from 'react'
import { DataSection } from './_components/DataSection'
import { useAppCtx } from '~/contexts/app'
import Link from 'next/link'

const ResumeAnalysis = () => {
  const { state } = useAppCtx()
  const { resume } = state
  const { parsedText } = resume

  // console.log(parsedText, "parsed text", state)

  return (
    <>
      <h1>Resume Analysis</h1>
      <Link href="/resume/upload">Resume upload</Link>
      <Link href="/resume/feedback">View Feedback</Link>
      <br />
      <br />
      <DataSection pdfText={parsedText} />
    </>
  )
}

export default ResumeAnalysis