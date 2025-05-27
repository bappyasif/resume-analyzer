import React from 'react'
import { PdfUploader } from './_components/pdfUploader'
import Link from 'next/link'

const ResumeUploader = () => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
    <PdfUploader />
    {/* <Link href="/resume/analysis">view analysis</Link> */}
    </main>
  )
}

export default ResumeUploader