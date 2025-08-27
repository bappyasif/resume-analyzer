import React, { useEffect } from 'react'
import { useAppCtx } from '~/contexts/app'
import { useToFetchFeedback } from '../_hooks/useToFetchFeedback'
import { FeedbackSection } from './FeedbackSection'
import Link from 'next/link'
import { renderToString } from 'react-dom/server'
import { useSession } from 'next-auth/react'

export const FeedbackData = ({ getHtml }: { getHtml: (htmlContent: string) => void }) => {
    const { state } = useAppCtx()
    const { resume } = state
    const { parsedText } = resume

    const { status } = useSession()

    const result = useToFetchFeedback(parsedText)

    const { keys, values, error, isPending } = result

    const markups = values?.map((value, index) => {
        if (typeof value === "number" || !value) return null
        return value ? <FeedbackSection key={index} label={keys[index]!} content={value as { [key: string]: string | string[] }} status={status} /> : null
    })

    useEffect(() => {
        if (!markups) return
        const htmlContent = renderToString(markups);
        getHtml?.(htmlContent);
    }, [markups, getHtml])

    if (!keys.length || !values.length) return null

    return (
        <div className="mx-auto bg-transparent space-y-10">
            <div className="flex items-center justify-center">
                {
                    isPending && <p className="text-xl text-gray-600">Loading...</p>
                }

                {
                    error && <p className="text-xl text-red-600">{error.message}</p>
                }

                {
                    keys.length && values.length && (
                        <div className='flex gap-4 items-center justify-center px-2'>
                            <Link href="/resume/analysis" className="text-xl text-primary underline hover:text-blue-800">Back to resume analysis</Link>
                            <Link href="/" className="text-xl text-primary underline hover:text-blue-800">Back to resume upload</Link>
                        </div>
                    )
                }
            </div>

            {
                values?.length && (
                    <div className="grid gap-12 bg-transparent">
                        {markups}
                    </div>
                )
            }
        </div>
    )
}
