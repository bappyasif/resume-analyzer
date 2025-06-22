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
    const { parsedText, feedback } = resume

    const { status } = useSession()

    // console.log(feedback, "feedback")

    const result = useToFetchFeedback(parsedText)

    const { keys, values, error, isPending } = result

    const markups = values?.map((value, index) => {
        return value ? <FeedbackSection key={index} label={keys[index]!} content={value as { [key: string]: string | string[] }} status={status} /> : null
    })

    // const markups = values?.map((key, index) => {
    //     return <FeedbackSection key={index} label={keys[index]!} content={values[index] as { [key: string]: string | string[] }} status={status} />
    // })

    // useEffect(() => {
    //     const htmlContent = getHtml(renderToString(markups));
    //     console.log(htmlContent);
    // }, [markups])

    useEffect(() => {
        if (!markups) return
        const htmlContent = renderToString(markups);
        // console.log(markups);
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
                    keys.length && values.length && <Link href="/" className="text-xl text-blue-600 underline hover:text-blue-800">Go back to resume upload</Link>
                }
            </div>

            {
                values?.length && (
                    <div className="grid gap-12 bg-transparent">
                        {markups}
                    </div>
                )
            }

            {/* {
                keys.length && (
                    <button className="mt-4 w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">Download Feedback</button>
                )
            } */}

            {/* {
                values?.map((value, index) => {
                    return <FeedbackSection key={index} label={keys[index]!} content={value as { [key: string]: string | string[] }} />
                })
            } */}
        </div>
    )
}
