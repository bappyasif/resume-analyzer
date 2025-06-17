import React from 'react'
import { PdfUploader } from './_components/pdfUploader'
import Link from 'next/link'
// import UploadPage from './_components/uploader'
import SinglePdfUploadPage from './_components/SingleFilePdfUploader'
// import UploadPage from './_components/uploader-multi'

const ResumeUploader = () => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <SinglePdfUploadPage />
      {/* <UploadPage /> */}
    {/* <PdfUploader /> */}
    {/* <Link href="/resume/analysis">view analysis</Link> */}
    </main>
  )
}

export default ResumeUploader