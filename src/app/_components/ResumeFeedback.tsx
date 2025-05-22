import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import { auth } from '~/server/auth';
import { api } from '~/trpc/react';

export const ResumeFeedback = ({ pdfText }: { pdfText: string }) => {
    const { mutate, data } = api.resume.feedback.useMutation({
        onSuccess: (data) => {
            console.log("feedback data is complete", data);
        },
        onError: (error) => {
            console.log(error);
        }
    });

    useEffect(() => {
        if (pdfText) {
            mutate({ text: pdfText, role: "Full Stack Developer" });
        }
    }, [pdfText]);

    if (!data) return null;

    const keys = Object.keys(data);
    const values = Object.values(data);

    console.log("feedback data~!!`", keys, values);

    return (
        <div>
            ResumeFeedback
            {
                values.map((value, index) => {
                    return <FeedbackSection key={index} label={keys[index]!} content={value} />
                })
            }
        </div>
    )
}

const FeedbackSection = ({ label, content }: { label: string, content: { [key: string]: string | string[] } }) => {
    if (!content) return null;
    if (Object.keys(content).length === 0) return null;

    const { status } = useSession();
    console.log("status", status);

    // useEffect(() => {
    //     auth().then((session) => {
    //         console.log("session", session);
    //     }).catch((error) => {
    //         console.log("error", error);
    //     })
    // }, [content]);


    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", margin: "1rem 0" }}>
            <h3>{label}</h3>
            {
                status === "unauthenticated" && label !== "education" ? (
                    <p>Sign in to view feedback</p>
                ) : (
                    Object.entries(content).map(([key, value]) => {
                        if (typeof value === 'string') {
                            return <FeedbackSectionAsString key={key} label={key} content={value} />
                        } else if (Array.isArray(value)) {
                            return <FeedbackSectionAsArray key={key} label={key} content={value} />
                        } else {
                            return null;
                        }
                    })
                )
            }
        </div>
    )
}

const FeedbackSectionAsString = ({ label, content }: { label: string, content: string }) => {
    if (!content || content.length === 0) return null;

    return (
        <div>
            <h3>{label}</h3>
            <p>{content}</p>
        </div>
    )
}

const FeedbackSectionAsArray = ({ label, content }: { label: string, content: string[] }) => {
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