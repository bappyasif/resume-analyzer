import { useAppCtx } from "~/contexts/app";
import { api } from "~/trpc/react";

export const handleAnalyze = () => {
    const { mutate, isPending: isLoading, error } = api.pdf.parsePdf.useMutation();

    const { dispatch } = useAppCtx()

    const handleFile = (file: any) => {
        if (!file) return;

        if (!(file instanceof Blob)) {
            console.error('Invalid file type:', file, typeof file);
            const blobbed = new Blob([file], { type: file.type });
            file = blobbed;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            const base64String = reader.result?.toString().split(",")[1];
            if (!base64String) return;
            mutate(
                { pdfData: base64String },
                {
                    onSuccess: (data) => {
                        
                        dispatch({type: "UPDATE_RESUME_PARSED_TEXT", payload: data.text})
                    },
                    onError: (error) => {
                        console.error("Error parsing PDF:", error);
                        alert("Error parsing PDF. Please check the console for details.");
                    },
                }
            );
        };
    }

    return { handleFile, isLoading, error }
};