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
            {isPending && <p className='text-center text-white text-2xl font-bold'>Extracting details...</p>}
            {error && <p>Error: {error.message}</p>}
            {!(analysis || data) && <p>No data available</p>}

            {(analysis || data) && (
                <Link href="/resume/feedback" className='text-center text-white text-2xl font-bold w-full'>View Feedback</Link>
            )}

            {(analysis || data) ? (
                <div className="space-y-4">
                    <p className="font-bold">Name: {(analysis || data)?.name}</p>
                    <p className="font-bold">Email: {(analysis || data)?.email}</p>
                    <p className="font-bold">Phone: {(analysis || data)?.phone}</p>

                    <div className="space-y-2">
                        <p className="font-bold">Experience</p>
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

                    <div className="space-y-2">
                        <p className="font-bold">Education</p>
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
                <p>No details extracted yet or extraction in progress.</p>
            )}
            {/* Optionally, add a button to re-trigger if needed, though useEffect handles initial load */}
            {/* <button onClick={handleExtractDetails} disabled={extractMutation.isPending}>
            {extractMutation.isPending ? 'Extracting...' : 'Re-Extract Details'}
        </button> */}
        </div>
    )
}

const ResumeSection = ({ label, content }: { label: string, content: string[] }) => {
    if (!content || content.length === 0) return null;

    return (
        <section className="my-4">
            <h3 className="text-lg font-semibold">{label}</h3>
            <ul className="list-disc pl-4">
                {content.map((item, index) => (
                    <li key={index} className="my-1">{item}</li>
                ))}
            </ul>
        </section>
    )
}
