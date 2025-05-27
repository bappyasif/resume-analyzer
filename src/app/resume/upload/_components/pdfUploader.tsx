"use client";

import Link from "next/link";
import navigate, { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppCtx } from "~/contexts/app";
import { api } from "~/trpc/react";
// import { AnalyzeParsedPdf } from "./AnalysedParsedPdf";

export function PdfUploader() {
    const [pdfText, setPdfText] = useState<string | null>(null);
    const [pdfInfo, setPdfInfo] = useState<any | null>(null);
    const [numPages, setNumPages] = useState<number | null>(null);
    const { mutate, isPending: isLoading, error } = api.pdf.parsePdf.useMutation();

    const {dispatch} = useAppCtx()

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            const base64String = reader.result?.toString().split(",")[1];
            if (!base64String) return;
            mutate(
                { pdfData: base64String },
                {
                    onSuccess: (data) => {
                        setPdfText(data.text);
                        dispatch({type: "UPDATE_RESUME_PARSED_TEXT", payload: data.text})
                        setPdfInfo(data.info);
                        setNumPages(data.numpages);
                    },
                    onError: (error) => {
                        console.error("Error parsing PDF:", error);
                        alert("Error parsing PDF. Please check the console for details.");
                    },
                }
            );
        };
    };

    const router = useRouter();


    const handleNavigate = () => {
        // navigate.push("/resume/analysis")
        // navigate.useRouter().push("/resume-analysis");
        router.push("/resume/analysis");
    }

    useEffect(() => {
        if (!pdfText) return;
       handleNavigate()
    }, [pdfText]);


    return (
        <div>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {/* <Link */}
            {/* {pdfText && <AnalyzeParsedPdf pdfText={pdfText} />} */}
            {pdfText && (
                <div>
                    <h2>Parsed PDF Text:</h2>
                    <p>{pdfText}</p>
                    <h2>Info:</h2>
                    <pre>{JSON.stringify(pdfInfo, null, 2)}</pre>
                    <h2>Number of pages:</h2>
                    <p>{numPages}</p>
                </div>
            )}
        </div>
    );
}
