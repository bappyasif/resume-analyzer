import React, { useEffect } from 'react'
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

    console.log("feedback data", data && Object.keys(data), data && Object.values(data));

    return (
        <div>
            ResumeFeedback
            
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