import React, { useEffect } from 'react'
import { api } from '~/trpc/react';

export const ResumeFeedback = ({pdfText}: {pdfText: string}) => {
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
            mutate({text: pdfText, role: "Full Stack Developer"});
        }
    }, [pdfText]);

    return (
        <div>ResumeFeedback</div>
    )
}
