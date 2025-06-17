import { useRouter } from "next/navigation";
import { useAppCtx } from "~/contexts/app";
import { api } from "~/trpc/react";

export const handleAnalyze = () => {
    const { mutate, isPending: isLoading, error } = api.pdf.parsePdf.useMutation();

    const { dispatch } = useAppCtx()

    // const handleFileChange = async (file: any) => {
    //     // const file = event.target.files?.[0];
    //     if (!file) return;

    //     if (!(file instanceof Blob)) {
    //         console.error('Invalid file type:', file, typeof file);
    //         return;
    //     }

    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);

    //     reader.onload = () => {
    //         const base64String = reader.result?.toString().split(",")[1];
    //         if (!base64String) return;
    //         mutate(
    //             { pdfData: base64String },
    //             {
    //                 onSuccess: (data) => {
    //                     // setPdfText(data.text);
    //                     dispatch({ type: "UPDATE_RESUME_PARSED_TEXT", payload: data.text })
    //                     // setPdfInfo(data.info);
    //                     // setNumPages(data.numpages);
    //                 },
    //                 onError: (error) => {
    //                     console.error("Error parsing PDF:", error);
    //                     alert("Error parsing PDF. Please check the console for details.");
    //                 },
    //             }
    //         );
    //     };
    // };

    const handleFile = (file: any) => {
        // const file = event.target.files?.[0];
        if (!file) return;

        if (!(file instanceof Blob)) {
            console.error('Invalid file type:', file, typeof file);
            const blobbed = new Blob([file], { type: file.type });
            file = blobbed;
            // return;
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

    // const router = useRouter();


    // const handleNavigate = () => {
    //     // navigate.push("/resume/analysis")
    //     // navigate.useRouter().push("/resume-analysis");
    //     router.push("/resume/analysis");
    // }

    return { handleFile, isLoading, error }
};