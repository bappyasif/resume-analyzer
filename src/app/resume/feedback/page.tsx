"use client"

import React from 'react'
import { useAppCtx } from '~/contexts/app';
import Link from 'next/link';
import { FeedbackData } from './_components/FeedbackData';
import { useToMakePdfDownloadable } from './_hooks/useToMakePdfDownloadable';
import { Button } from '~/components/ui/button';

const ResumeFeedback = () => {
    const { getHtml, handleDownload, htmlContent } = useToMakePdfDownloadable()

    const { state } = useAppCtx()

    const { resume } = state

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-20">
            <h1 
                className="text-6xl font-bold"
            >Resume Feedback</h1>

            <h2 className='text-2xl mt-20 font-bold'>Role: {resume?.role}</h2>

            <div className="my-20">
                {
                    htmlContent ? (
                        <Button onClick={handleDownload} size={"lg"} variant={"default"} className="min-w-2xs">Download Feedback</Button>
                    ) : (
                        resume?.parsedText
                            ? (
                                <p className="text-2xl text-gray-200">Loading...</p>
                            )
                            : (
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <p className="text-2xl text-gray-200">No data available</p>
                                    <Link href="/resume/upload" className="px-6 py-4 bg-white/80 text-blue-600 font-semibold rounded shadow hover:bg-blue-100 transition duration-300">
                                        Upload Resume
                                    </Link>
                                </div>
                            )
                    )
                }
            </div>

            <div className="bg-transparent rounded-lg shadow-lg">
                <FeedbackData getHtml={getHtml} />
            </div>
        </main>
    )
}

export default ResumeFeedback