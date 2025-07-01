import { useEffect } from "react";
import { useAppCtx } from "~/contexts/app";
import { api } from "~/trpc/react";

export const useToFetchFeedback = (pdfText: string) => {
    const {state, dispatch} = useAppCtx()

    const {resume} = state;
    const {feedback} = resume;
    
    const { mutate, data, isPending, error } = api.resume.feedback.useMutation({
        onSuccess: (data) => {
            // console.log("feedback data is complete", data);
            dispatch({type: "UPDATE_RESUME_FEEDBACK", payload: data?.feedback || data})
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
    // const dataSource = feedback || feedback?.feedback || data

    // console.log("feedback data", dataSource, feedback);

    // if (!dataSource) return null

    // const keys = Object.keys(dataSource);
    // const values = Object.values(dataSource);

    // const keys = Object.keys(dataSource) || [];
    // const values = Object.values(dataSource) || [];

    const keys = dataSource ? Object.keys(dataSource) : [];
    const values = dataSource ? Object.values(dataSource) : [];

    // console.log("feedback data~!!`", keys, values);
    return { keys, values, isPending, error }; // this doesnt get through as datasource not being ready so loading ior erro wont be shown until datasource is ready by that tmie point of this is going to be needless
    // return { keys, values };
}