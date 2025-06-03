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
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center w-full max-w-md p-12 bg-blue-800 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold mb-4">Upload your resume</h1>
                <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />
                {isLoading && <p className="text-center text-gray-600">Loading...</p>}
                {error && <p className="text-center text-red-500">{error.message}</p>}
                {/* <Link */}
                {/* {pdfText && <AnalyzeParsedPdf pdfText={pdfText} />} */}
                {/* {pdfText && (
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-2xl font-bold mb-4">Parsed PDF Text:</h2>
                        <p className="whitespace-pre-wrap">{pdfText}</p>
                        <h2 className="text-2xl font-bold mb-4">Info:</h2>
                        <pre className="whitespace-pre-wrap">{JSON.stringify(pdfInfo, null, 2)}</pre>
                        <h2 className="text-2xl font-bold mb-4">Number of pages:</h2>
                        <p className="whitespace-pre-wrap">{numPages}</p>
                    </div>
                )} */}
            </div>
        </div>
    );
}
