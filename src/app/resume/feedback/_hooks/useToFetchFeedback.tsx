import { useEffect } from "react";
import { useAppCtx } from "~/contexts/app";
import { api } from "~/trpc/react";

export const useToFetchFeedback = (pdfText: string) => {
    const {state, dispatch} = useAppCtx()

    const {resume} = state;
    const {feedback, role} = resume;
    
    const { mutateAsync, data, isPending, error } = api.resume.feedback.useMutation({
        onSuccess: (data) => {
            dispatch({type: "UPDATE_RESUME_FEEDBACK", payload: data?.feedback ?? data})
        },
        onError: (error) => {
            console.log(error);
            // Forces the mutation state back to 'idle', killing the spinner instantly
            // reset(); 
        }
    });

    useEffect(() => {
        if (pdfText && !feedback && role) {
            // mutate({ text: pdfText, role: role ?? "Full Stack Developer" });
            mutateAsync({ text: pdfText, role: role ?? "Full Stack Developer" });
        }
    }, [pdfText, feedback]);

    const dataSource = feedback ?? data
    const keys = dataSource ? Object.keys(dataSource) : [];
    const values = dataSource ? Object.values(dataSource) : [];

    return { keys, values, isPending, error }; // this doesnt get through as datasource not being ready so loading ior erro wont be shown until datasource is ready by that tmie point of this is going to be needless
}