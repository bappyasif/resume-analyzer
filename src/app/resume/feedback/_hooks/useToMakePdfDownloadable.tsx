import { useState } from "react";
import { api } from "~/trpc/react";

export const useToMakePdfDownloadable = () => {
    const { mutate } = api.pdf.downloadPdf.useMutation();

    const [htmlContent, setHtmlContent] = useState("");

    const getHtml = (htmlContent: string) => {
        setHtmlContent(htmlContent);
    }

    const getFullHtml = () => {
        return `
    <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 40px; }
          h1 { color: #333; }
        </style>
      </head>
      <body>
        <h1>Resume Feedback</h1>
        ${htmlContent}
      </body>
    </html>
    `;
    }

    const handleDownload = () => {
        mutate({
            htmlContent: encodeURIComponent(getFullHtml())
        }, {
            onSuccess: (data) => {
                const blob = new Blob([data as any], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'resume_feedback.pdf';
                link.click();
                URL.revokeObjectURL(url);
            },
            onError: (error) => {
                console.log(error);
            }
        })
    }

    return { handleDownload, getHtml, htmlContent }
};