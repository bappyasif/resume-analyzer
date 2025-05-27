"use client"

import React from 'react'
import { useToFetchFeedback } from './_hooks/useToFetchFeedback'
import { FeedbackSection } from './_components/FeedbackSection';
import { useAppCtx } from '~/contexts/app';
import Link from 'next/link';

const ResumeFeedback = () => {
    const { state } = useAppCtx()
    const { resume } = state
    const { parsedText, feedback } = resume

    // console.log(feedback, "feedback")

    const result = useToFetchFeedback(parsedText)

    if (!result) return null

    // const { keys, values } = useToFetchFeedback(parsedText)!;

    const { keys, values } = result

    return (
        <div>
            ResumeFeedback
            <Link href="/resume/analysis">View Analysis</Link>
            <br />
            <br />
            {
                values.map((value, index) => {
                    return <FeedbackSection key={index} label={keys[index]!} content={value as { [key: string]: string | string[] }} />
                })
            }
        </div>
    )
}

export default ResumeFeedback