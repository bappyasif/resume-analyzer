"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function PdfUploader() {
    const [pdfText, setPdfText] = useState<string | null>(null);
    const [pdfInfo, setPdfInfo] = useState<any | null>(null);
    const [numPages, setNumPages] = useState<number | null>(null);
    const { mutate, isPending: isLoading } = api.pdf.parsePdf.useMutation();

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

    return (
        <div>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            {isLoading && <p>Loading...</p>}
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
