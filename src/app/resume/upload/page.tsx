import React from 'react'
import { PdfUploader } from './_components/pdfUploader'
import Link from 'next/link'

const ResumeUploader = () => {
  return (
    <>
    <PdfUploader />
    <Link href="/resume/analysis">view analysis</Link>
    </>
  )
}

export default ResumeUploader