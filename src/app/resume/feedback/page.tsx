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
import { Button } from '~/components/ui/button';

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

    const { state } = useAppCtx()

    const { resume } = state

    // console.log(resume, "resume")

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-20">
            <h1 
                // className="text-6xl font-bold text-white"
                className="text-6xl font-bold"
            >Resume Feedback</h1>

            <div className="my-20">
                {
                    htmlContent ? (
                        <Button onClick={handleDownload} size={"lg"} variant={"default"} className="min-w-2xs">Download Feedback</Button>
                        // <button
                        //     onClick={handleDownload}
                        //     className="px-6 py-4 bg-white text-blue-600 font-semibold rounded shadow hover:bg-blue-100 transition duration-300"
                        // >
                        //     Download Feedback
                        // </button>
                    ) : (
                        resume?.parsedText
                            ? (
                                <p className="text-2xl text-gray-200">Loading...</p>
                            )
                            : (
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <p className="text-2xl text-gray-200">No data available</p>
                                    {/* <p className="text-xl text-gray-200">Please upload your resume first.</p> */}
                                    <Link href="/resume/upload" className="px-6 py-4 bg-white/80 text-blue-600 font-semibold rounded shadow hover:bg-blue-100 transition duration-300">
                                        Upload Resume
                                    </Link>
                                </div>
                            )
                        // <p className="text-2xl text-gray-200">Loading...</p>
                    )
                }
            </div>

            <div className="bg-transparent rounded-lg shadow-lg">
                <FeedbackData getHtml={getHtml} />
            </div>
        </main>
    )

    // return (
    //     <main className="flex min-h-screen flex-col items-center justify-center">
    //         <h1>Resume Feedback</h1>

    //         <br />
    //         <br />
    //         {
    //             htmlContent ? (
    //                 <button onClick={handleDownload}>Download Feedback!</button>
    //             ) : (
    //                 <p>Loading...</p>
    //             )
    //         }
    //         {/* {
    //             keys.length && (
    //                 <button onClick={handleDownload}>Download Feedback!</button>
    //             )
    //         } */}
    //         <br />
    //         <br />

    //         <FeedbackData getHtml={getHtml} />
    //         {/* {
    //             isPending && <p>Loading...</p>
    //         }

    //         {
    //             error && <p>{error.message}</p>
    //         }

    //         {
    //             keys.length && values.length && <Link href="/">Go back to resume upload</Link>
    //         }

    //         {
    //             values?.map((value, index) => {
    //                 return <FeedbackSection key={index} label={keys[index]!} content={value as { [key: string]: string | string[] }} />
    //             })
    //         } */}
    //     </main>
    // )
}

export default ResumeFeedback