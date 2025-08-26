import { useEffect } from "react";
import { useAppCtx } from "~/contexts/app";
import { api } from "~/trpc/react";

export const useToResumeDataExtraction = (pdfText: string) => {
    const {state, dispatch} = useAppCtx()

    const {resume} = state;
    const {analysis, role} = resume;

    const { mutate, data, isPending, error } = api.resume.extractDetails.useMutation({
        onSuccess: (data) => {
            console.log("data extraction is complete", data);
            dispatch({type: "UPDATE_RESUME_ANALYSIS", payload: data})
        },
        onError: (error) => {
            console.log(error);
        }
    });

    useEffect(() => {
        if (pdfText && !analysis) {
            mutate({ text: pdfText, role: role || "Full Stack Developer" });
            // feedbackMutate({text: pdfText, role: "Full Stack Developer"});
        }
    }, [pdfText]);

    return {
        data,
        isPending,
        error,
    }
};