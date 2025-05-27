"use client"

import React, { useEffect } from 'react'
import { useToResumeDataExtraction } from '../_hooks/useToResumeDataExtraction'
import { useAppCtx } from '~/contexts/app';

export const DataSection = ({ pdfText }: { pdfText: string }) => {
    const { state } = useAppCtx();

    const { resume } = state;
    const { analysis } = resume;

    const { data } = useToResumeDataExtraction(pdfText);
    // const {data} = analysis || useToResumeDataExtraction(pdfText);

    // useEffect(() => {
    //     if (data && !analysis) {
    //         dispatch({type: "UPDATE_RESUME_ANALYSIS", payload: data});
    //     }
    // }, [data]);

    return (
        <div>
            <h3>Extracted Details (via tRPC):</h3>
            {(analysis || data) ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <p>Name: {(analysis || data)?.name}</p>
                    <p>Email: {(analysis || data)?.email}</p>
                    <p>Phone: {(analysis || data)?.phone}</p>

                    <div>
                        <p>Experience</p>
                        {
                            (analysis || data)?.experience?.map((exp: any, index: number) => (
                                <div key={index} style={{ marginBottom: "1rem" }}>
                                    <p>Position: {exp.title}</p>
                                    <p>Company: {exp.company}</p>
                                    <p>Start Date: {exp.dates}</p>
                                    <p>Description: {exp.responsibilities}</p>
                                </div>

                            ))
                        }
                    </div>

                    <div>
                        <p>Education</p>
                        {
                            (analysis || data)?.education?.map((edu: any, index: number) => (
                                <div key={index} style={{ marginBottom: "1rem" }}>
                                    <p>{edu.degree}</p>
                                    <p>{edu.institution}</p>
                                    <p>{edu.dates}</p>
                                </div>
                            ))
                        }
                    </div>

                    {
                        (analysis || data)?.certifications && (
                            <ResumeSection label='Certifications' content={(analysis || data)?.certifications} />
                        )
                    }

                    {
                        (analysis || data)?.skills && (
                            <ResumeSection label='Skills' content={(analysis || data)?.skills} />
                        )
                    }

                    {
                        (analysis || data)?.projects && (
                            <ResumeSection label='Projects' content={(analysis || data)?.projects} />
                        )
                    }

                    {
                        (analysis || data)?.awards?.length && (
                            <ResumeSection label='Awards' content={(analysis || data)?.awards} />
                        )
                    }

                    {
                        (analysis || data)?.languages && (
                            <ResumeSection label='Languages' content={(analysis || data)?.languages} />
                        )
                    }

                    {
                        (analysis || data)?.interests && (
                            <ResumeSection label='Interests' content={(analysis || data)?.interests} />
                        )
                    }

                    {
                        (analysis || data)?.references && (
                            <ResumeSection label='References' content={(analysis || data)?.references} />
                        )
                    }

                    {
                        (analysis || data)?.achievements && (
                            <ResumeSection label='Achievements' content={(analysis || data)?.achievements} />
                        )
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
        <div>
            <h3>{label}</h3>
            <ul>
                {content.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}
