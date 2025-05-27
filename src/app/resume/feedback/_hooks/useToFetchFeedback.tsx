import { useEffect } from "react";
import { useAppCtx } from "~/contexts/app";
import { api } from "~/trpc/react";

export const useToFetchFeedback = (pdfText: string) => {
    const {state, dispatch} = useAppCtx()

    const {resume} = state;
    const {feedback} = resume;
    
    const { mutate, data } = api.resume.feedback.useMutation({
        onSuccess: (data) => {
            console.log("feedback data is complete", data);
            dispatch({type: "UPDATE_RESUME_FEEDBACK", payload: data})
        },
        onError: (error) => {
            console.log(error);
        }
    });

    useEffect(() => {
        if (pdfText && !feedback) {
            mutate({ text: pdfText, role: "Full Stack Developer" });
        }
    }, [pdfText]);

    // if (!data) return null;

    const dataSource = feedback || data

    if (!dataSource) return null

    const keys = Object.keys(dataSource);
    const values = Object.values(dataSource);

    // console.log("feedback data~!!`", keys, values);
    return { keys, values };
}