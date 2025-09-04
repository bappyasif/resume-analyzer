import { useEffect } from "react";
import { useAppCtx } from "~/contexts/app";
import { api } from "~/trpc/react";

export const useToResumeDataExtraction = (
    // pdfText: string
) => {
    const {state, dispatch} = useAppCtx()

    const {resume} = state;
    const {analysis, role, parsedText: pdfParsedText} = resume;

    const { mutate, data, isPending, error } = api.resume.extractDetails.useMutation({
        onSuccess: (data) => {
            dispatch({type: "UPDATE_RESUME_ANALYSIS", payload: data})
        },
        onError: (error) => {
            console.log(error);
        }
    });

    useEffect(() => {
        if (pdfParsedText && !analysis) {
            mutate({ text: pdfParsedText, role: role || "Full Stack Developer" });
        }
    }, [pdfParsedText]);

    return {
        data,
        isPending,
        error,
    }
};