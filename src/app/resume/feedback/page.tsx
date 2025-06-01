"use client"

import React, { useState } from 'react'
import { useToFetchFeedback } from './_hooks/useToFetchFeedback'
import { FeedbackSection } from './_components/FeedbackSection';
import { useAppCtx } from '~/contexts/app';
import Link from 'next/link';
import { api } from '~/trpc/react';
import { renderToString } from 'react-dom/server';
import { FeedbackData } from './_components/FeedbackData';
import { useToMakePdfDownloadable } from './_hooks/useToMakePdfDownloadable';

const ResumeFeedback = () => {
    // const { state } = useAppCtx()
    // const { resume } = state
    // const { parsedText, feedback } = resume

    // console.log(feedback, "feedback")

    // const result = useToFetchFeedback(parsedText)

    // if (!result) return null

    // const { keys, values } = useToFetchFeedback(parsedText)!;

    // const { keys, values, error, isPending } = result
    // const { keys, values } = result

    // const { mutate, data, isPending: isLoading, error: downloadError } = api.pdf.downloadPdf.useMutation()

    // const htmlContent = renderToString(<FeedbackSection label={keys[index]!} content={value as { [key: string]: string | string[] }} />)
    // const htmlContent = data ? renderToString(<FeedbackData />) : renderToString("Loading...");

    // const [htmlContent, setHtmlContent] = useState("");

    // const getHtml = (htmlContent: string) => {
    //     setHtmlContent(htmlContent);
    // }

    //     const fullHtml = `
    // <html>
    //   <head>
    //     <style>
    //       body { font-family: sans-serif; padding: 40px; }
    //       h1 { color: #333; }
    //     </style>
    //   </head>
    //   <body>
    //     <h1>Resume Feedback</h1>
    //     ${htmlContent}
    //   </body>
    // </html>
    // `;

    // const getFullHtml = () => {
    //     return `
    //     <html>
    //       <head>
    //         <style>
    //           body { font-family: sans-serif; padding: 40px; }
    //           h1 { color: #333; }
    //         </style>
    //       </head>
    //       <body>
    //         <h1>Resume Feedback</h1>
    //         ${htmlContent}
    //       </body>
    //     </html>
    //     `;
    // }

    //     const handleDownload = () => {
    //         mutate({
    //             htmlContent: getFullHtml()
    //         }, {
    //             onSuccess: (data) => {
    //                 const blob = new Blob([data], { type: 'application/pdf' });
    //                 const url = URL.createObjectURL(blob);
    //                 const link = document.createElement('a');
    //                 link.href = url;
    //                 link.download = 'resume.pdf';
    //                 link.click();
    //                 URL.revokeObjectURL(url);
    //             },
    //             onError: (error) => {
    //                 console.log(error);
    //             }
    //         })
    //     }

    const { getHtml, handleDownload, htmlContent } = useToMakePdfDownloadable()

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <h1>Resume Feedback</h1>

            <br />
            <br />
            {
                htmlContent ? (
                    <button onClick={handleDownload}>Download Feedback!</button>
                ) : (
                    <p>Loading...</p>
                )
            }
            {/* {
                keys.length && (
                    <button onClick={handleDownload}>Download Feedback!</button>
                )
            } */}
            <br />
            <br />

            <FeedbackData getHtml={getHtml} />
            {/* {
                isPending && <p>Loading...</p>
            }

            {
                error && <p>{error.message}</p>
            }

            {
                keys.length && values.length && <Link href="/">Go back to resume upload</Link>
            }

            {
                values?.map((value, index) => {
                    return <FeedbackSection key={index} label={keys[index]!} content={value as { [key: string]: string | string[] }} />
                })
            } */}
        </main>
    )
}

export default ResumeFeedback