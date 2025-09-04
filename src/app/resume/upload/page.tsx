import React from 'react'
import SinglePdfUploadPage from './_components/SingleFilePdfUploader'
import { UploaderHeader } from './_components/UploaderHeader'

const ResumeUploader = () => {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center p-4 gap-3.5'>
      <UploaderHeader />
      <SinglePdfUploadPage />
    </main>
  )
}

export default ResumeUploader