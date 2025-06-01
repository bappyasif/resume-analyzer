import React, { useEffect } from 'react'
import { useAppCtx } from '~/contexts/app'
import { useToFetchFeedback } from '../_hooks/useToFetchFeedback'
import { FeedbackSection } from './FeedbackSection'
import Link from 'next/link'
import { renderToString } from 'react-dom/server'
import { useSession } from 'next-auth/react'

export const FeedbackData = ({getHtml}: {getHtml: (htmlContent: string) => void}) => {
    const { state } = useAppCtx()
    const { resume } = state
    const { parsedText, feedback } = resume

    const {status} = useSession()

    console.log(feedback, "feedback")

    const result = useToFetchFeedback(parsedText)

    const { keys, values, error, isPending } = result

    const markups = values?.map((key, index) => {
        return <FeedbackSection key={index} label={keys[index]!} content={values[index] as { [key: string]: string | string[] }} status={status} />
    })

    // useEffect(() => {
    //     const htmlContent = getHtml(renderToString(markups));
    //     console.log(htmlContent);
    // }, [markups])

    useEffect(() => {
        if (!markups) return
        const htmlContent = renderToString(markups);
        getHtml?.(htmlContent);
    }, [markups, getHtml])

    if (!keys.length || !values.length) return null

    return (
        <div>
            {
                isPending && <p>Loading...</p>
            }

            {
                error && <p>{error.message}</p>
            }

            {
                keys.length && values.length && <Link href="/">Go back to resume upload</Link>
            }

            {
               values?.length && markups
            }

            {/* {
                keys.length && (
                    <button>Download Feedback</button>
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
