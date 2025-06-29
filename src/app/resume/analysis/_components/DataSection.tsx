"use client"

import React, { useEffect } from 'react'
import { useToResumeDataExtraction } from '../_hooks/useToResumeDataExtraction'
import { useAppCtx } from '~/contexts/app';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const DataSection = ({ pdfText }: { pdfText: string }) => {
    const { state } = useAppCtx();

    const { resume } = state;
    const { analysis } = resume;

    const { data, error, isPending } = useToResumeDataExtraction(pdfText);
    // const {data} = analysis || useToResumeDataExtraction(pdfText);

    // useEffect(() => {
    //     if (data && !analysis) {
    //         dispatch({type: "UPDATE_RESUME_ANALYSIS", payload: data});
    //     }
    // }, [data]);

    // const router = useRouter();

    // useEffect(() => {
    //     if (data) {
    //         router.push("/resume/feedback");
    //     }
    // }, [data]);

    return (
        <div className='flex flex-col items-center justify-center gap-4'>
            {/* <h3>Extracted Details (via tRPC):</h3> */}
            {/* {isPending && <p className='text-center text-white text-2xl font-bold'>Extracting details...</p>}
            {error && <p>Error: {error.message}</p>}
            {!(analysis || data) && !isPending && <p>No data available</p>} */}

            <div className="my-12">
                {isPending && <p className='text-center text-white text-2xl font-bold'>Extracting details...</p>}
                {error && <p>Error: {error.message}</p>}
                {!(analysis || data) && !isPending && (
                    <div className='flex flex-col items-center justify-center gap-4'>
                        <p className='text-center text-white text-2xl font-bold'>No data available</p>
                        <Link href="/resume/upload" className="px-6 py-4 bg-white/80 text-blue-600 font-semibold rounded shadow hover:bg-blue-100 transition duration-300">Upload Resume</Link>
                    </div>
                )}
                {(analysis || data) && !isPending && (
                    <Link href="/resume/feedback"
                        // className='text-center text-white text-2xl font-bold w-full'
                        className="px-6 py-4 bg-white/80 text-blue-600 font-semibold rounded shadow hover:bg-blue-100 transition duration-300"
                    >View Feedback</Link>
                )}
            </div>

            {/* {(analysis || data) && !isPending && (
                <Link href="/resume/feedback" 
                // className='text-center text-white text-2xl font-bold w-full'
                className="px-6 py-4 bg-white/80 text-blue-600 font-semibold rounded shadow hover:bg-blue-100 transition duration-300"
                >View Feedback</Link>
            )} */}

            {(analysis || data) && isPending ? (
                <div className="space-y-10">
                    <div className="space-y-2">
                        <p className="font-bold">Name: {(analysis || data)?.name}</p>
                        <p className="font-bold">Email: {(analysis || data)?.email}</p>
                        <p className="font-bold">Phone: {(analysis || data)?.phone}</p>
                    </div>

                    <div className="space-y-2">
                        <p className="font-bold text-3xl text-blue-200 uppercase">Experience</p>
                        <div className={`grid ${(analysis || data)?.experience?.length <= 4 ? `grid-cols-${(analysis || data)?.experience?.length.toString()}` : "grid-cols-4"} gap-4`}>
                            {
                                (analysis || data)?.experience?.map((exp: any, index: number) => (
                                    <div key={index} className="space-y-1">
                                        <p className="font-bold">Position: {exp.title}</p>
                                        <p className="font-bold">Company: {exp.company}</p>
                                        <p className="font-bold">Start Date: {exp.dates}</p>
                                        <p>{exp.responsibilities}</p>
                                    </div>

                                ))
                            }
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="font-bold text-3xl text-blue-200 uppercase">Education</p>
                        <div className={`grid ${(analysis || data)?.education?.length <= 4 ? `grid-cols-${(analysis || data)?.education?.length.toString()}` : "grid-cols-4"} gap-4`}>
                            {
                                (analysis || data)?.education?.map((edu: any, index: number) => (
                                    <div key={index} className="space-y-1">
                                        <p className="font-bold">{edu.degree}</p>
                                        <p className="font-bold">{edu.institution}</p>
                                        <p className="font-bold">{edu.dates}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {
                        (analysis || data)?.certifications ? (
                            <ResumeSection label='Certifications' content={(analysis || data)?.certifications} />
                        ) : null
                    }

                    {
                        (analysis || data)?.skills ? (
                            <ResumeSection label='Skills' content={(analysis || data)?.skills} />
                        ) : null
                    }

                    {
                        (analysis || data)?.projects ? (
                            <ResumeSection label='Projects' content={(analysis || data)?.projects} />
                        ) : null
                    }

                    {
                        (analysis || data)?.awards?.length ? (
                            <ResumeSection label='Awards' content={(analysis || data)?.awards} />
                        ) : null
                    }

                    {
                        (analysis || data)?.languages ? (
                            <ResumeSection label='Languages' content={(analysis || data)?.languages} />
                        ) : null
                    }

                    {
                        (analysis || data)?.interests ? (
                            <ResumeSection label='Interests' content={(analysis || data)?.interests} />
                        ) : null
                    }

                    {
                        (analysis || data)?.references ? (
                            <ResumeSection label='References' content={(analysis || data)?.references} />
                        ) : null
                    }

                    {
                        (analysis || data)?.achievements ? (
                            <ResumeSection label='Achievements' content={(analysis || data)?.achievements} />
                        ) : null
                    }

                    {/* <p>Summary: {Data?.summary}</p>
                <p>Experience: {Data?.experience}</p>
                <p>Skills: {Data?.skills}</p>
                <p>Education: {Data?.education}</p>
                <p>Projects: {Data?.projects}</p>
                <p>Certifications: {Data?.certifications}</p>
                <p>Languages: {Data?.languages}</p>
                <p>Interests: {Data?.interests}</p>
                <p>References: {Data?.references}</p> */}
                </div>
            ) : (

                pdfText && (
                    <p>No details extracted yet</p>
                )

                // <p>Extraction data in progress.</p>
            )}
            {/* Optionally, add a button to re-trigger if needed, though useEffect handles initial load */}
            {/* <button onClick={handleExtractDetails} disabled={extractMutation.isPending}>
            {extractMutation.isPending ? 'Extracting...' : 'Re-Extract Details'}
        </button> */}

            {
                (data || analysis) && !isPending && (
                    <p>Extraction in progress.</p>
                )
            }
        </div>
    )
}

const ResumeSection = ({ label, content }: { label: string, content: string[] }) => {
    if (!content || content.length === 0) return null;

    return (
        <section className="my-4">
            <h3 className="font-bold text-3xl text-blue-200 uppercase">{label}</h3>
            <ul
                // className="list-disc pl-4"
                className={`list-disc pl-4 grid ${(content || []).length <= 4 ? `grid-cols-${(content || []).length.toString()}` : "grid-cols-4"} gap-4`}
            >
                {
                    content.map((item, index) => (
                        <li key={index} className="my-1">{item}</li>
                    ))
                }
            </ul>
        </section>
    )
}
