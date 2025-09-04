"use client"

import React from 'react'
import { useToResumeDataExtraction } from '../_hooks/useToResumeDataExtraction'
import { useAppCtx } from '~/contexts/app';
import Link from 'next/link';
import { Button } from '~/components/ui/button';

export const DataSection = (
        // { pdfText }: { pdfText: string }
    ) => {
    const { state } = useAppCtx();

    const { resume } = state;
    const { analysis } = resume;

    // const { data, error, isPending } = useToResumeDataExtraction(pdfText);
    const { data, error, isPending } = useToResumeDataExtraction();

    return (
        <div className='flex flex-col items-center justify-center gap-4'>
            <div className="my-12">
                {isPending && <p className='text-center text-2xl font-bold'>Extracting details...</p>}
                
                {error && <p>Error: {error.message}</p>}
                
                {!(analysis ?? data) && !isPending && (
                    <div className='flex flex-col items-center justify-center gap-4'>
                        <p className='text-center text-2xl font-bold'>No data available</p>
                        <Link href="/resume/upload" className="px-6 py-4 bg-secondary/60 text-2xl text-primary/90 font-semibold rounded shadow hover:bg-secondary transition duration-300">Upload Resume</Link>
                    </div>
                )}

                {(analysis ?? data) && !isPending && (
                    <div className='flex justify-center items-center gap-4'>
                        <Button variant="secondary" size="lg" className="min-w-2xs">
                            <Link href="/resume/upload"
                                className='text-2xl'
                            >Upload Resume</Link>
                        </Button>
                        <Button variant="default" size="lg" className="min-w-2xs">
                            <Link href="/resume/feedback"
                                className='text-2xl'
                            >View Feedback</Link>
                        </Button>
                    </div>
                )}
            </div>

            {(analysis ?? data) && !isPending ? (
                <div className="space-y-10">
                    <div className="space-y-2 text-3xl font-sans">
                        <p><span className='text-sidebar-primary font-medium'>Name:</span> {(analysis ?? data)?.name}</p>
                        <p><span className='text-sidebar-primary font-medium'>Email:</span> {(analysis ?? data)?.email}</p>
                        <p><span className='text-sidebar-primary font-medium'>Phone:</span> {(analysis ?? data)?.phone}</p>
                    </div>

                    <div className="space-y-2">
                        <p
                            className="font-bold text-3xl text-primary/90 uppercase"
                        >Experience</p>
                        <div 
                            className={`grid ${(analysis ?? data)?.experience?.length <= 4 ? `grid-cols-${(analysis ?? data)?.experience?.length.toString()}` : "grid-cols-4"} gap-4`}
                        >
                            {
                                (analysis ?? data)?.experience?.map((exp: any, index: number) => (
                                    <div key={index} className="space-y-1">
                                        <p className="font-bold"><span className='text-primary font-extrabold
                                        '>Position: </span>{exp.title}</p>
                                        <p className="font-bold"><span className='text-primary font-extrabold
                                        '>Company: </span>{exp.company}</p>
                                        <p className="font-bold"><span className='text-primary font-extrabold
                                        '>Start Date: </span>{exp.dates}</p>
                                        <p>{exp.responsibilities}</p>
                                    </div>

                                ))
                            }
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p
                            className="font-bold text-3xl text-primary/90 uppercase"
                        >Education</p>
                        <div className={`grid ${(analysis ?? data)?.education?.length <= 4 ? `grid-cols-${(analysis ?? data)?.education?.length.toString()}` : "grid-cols-4"} gap-4`}>
                            {
                                (analysis ?? data)?.education?.map((edu: any, index: number) => (
                                    <div key={index} className="space-y-1 font-bold">
                                        <p><span className='text-primary font-extrabold
                                        ' >Degree: </span>{edu.degree}</p>
                                        <p><span className='text-primary font-extrabold
                                        '>Institution: </span>{edu.institution}</p>
                                        <p>{edu.dates}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {
                        (analysis ?? data)?.certifications ? (
                            <ResumeSection label='Certifications' content={(analysis ?? data)?.certifications} />
                        ) : null
                    }

                    {
                        (analysis ?? data)?.skills ? (
                            <ResumeSection label='Skills' content={(analysis ?? data)?.skills} />
                        ) : null
                    }

                    {
                        (analysis ?? data)?.projects ? (
                            <ResumeSection label='Projects' content={(analysis ?? data)?.projects} />
                        ) : null
                    }

                    {
                        (analysis ?? data)?.awards?.length ? (
                            <ResumeSection label='Awards' content={(analysis ?? data)?.awards} />
                        ) : null
                    }

                    {
                        (analysis ?? data)?.languages ? (
                            <ResumeSection label='Languages' content={(analysis ?? data)?.languages} />
                        ) : null
                    }

                    {
                        (analysis ?? data)?.interests ? (
                            <ResumeSection label='Interests' content={(analysis ?? data)?.interests} />
                        ) : null
                    }

                    {
                        (analysis ?? data)?.references ? (
                            <ResumeSection label='References' content={(analysis ?? data)?.references} />
                        ) : null
                    }

                    {
                        (analysis ?? data)?.achievements ? (
                            <ResumeSection label='Achievements' content={(analysis ?? data)?.achievements} />
                        ) : null
                    }
                </div>
            ) : (
                null
                // pdfText && (
                //     <p>No details extracted yet</p>
                // )
            )}

            {
                !(data ?? analysis) && isPending && (
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
            <h3
                className="font-bold text-3xl text-primary/90 uppercase"
            >{label}</h3>
            <ul
                className={`list-disc pl-4 grid ${(content ?? []).length <= 4 ? `grid-cols-${(content ?? []).length.toString()}` : "grid-cols-4"} gap-4`}
            >
                {
                    content.map((item, index) => (
                        <li key={index} className="my-2">{item}</li>
                    ))
                }
            </ul>
        </section>
    )
}
