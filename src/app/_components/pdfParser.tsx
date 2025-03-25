"use client"

import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import type { TextItem } from 'pdfjs-dist/types/src/display/api';
import { api } from '~/trpc/react';

// Configure the worker source (do this only once)
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

class PdfData {
  page: number;
  text: string;

  constructor(page: number, text: string) {
    this.page = page;
    this.text = text;
  }
}

export default function PdfParserClient() {
  const [parsedData, setParsedData] = useState<PdfData[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { mutate } = api.pdfParse.uploadPdf.useMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file?.type === 'application/pdf') {
        setFile(file);
      } else {
        setError('Only PDF files are allowed');
      }
    }
  };

//   const handleParse = async () => {
//     if (!file) return;
//     mutate(
//       { file: file },
//       {
//         onSuccess: async (arrayBuffer) => {
//           try {
//             const pdfDoc = await pdfjsLib.getDocument(arrayBuffer).promise;
//             const numPages = pdfDoc.numPages;
//             const parsedDataTemp: PdfData[] = [];

//             for (let i = 1; i <= numPages; i++) {
//               const page = await pdfDoc.getPage(i);
//               const textContent = await page.getTextContent();
//               const pageText = textContent.items
//                 .map((item: any) => item.str)
//                 .join(' ');

//               parsedDataTemp.push(new PdfData(i, pageText));
//             }
//             setParsedData(parsedDataTemp);
//           } catch (error) {
//             console.error('PDF parsing error:', error);
//             setError('Error parsing PDF: ' + error);
//           }
//         },
//         onError: (error) => {
//           console.error('Error parsing PDF', error);
//           setError('Error parsing PDF: ' + error.message);
//         },
//       }
//     );
//   };

const handleParse = async () => {
    if (!file) return;
    const blob = new Blob([file], { type: file.type });
    mutate(
      { file: blob },
      {
        onSuccess: async (arrayBuffer) => {
          try {
            const pdfDoc = await pdfjsLib.getDocument(arrayBuffer).promise;
            const numPages = pdfDoc.numPages;
            const parsedDataTemp: PdfData[] = [];
  
            for (let i = 1; i <= numPages; i++) {
              const page = await pdfDoc.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = textContent.items
                .map((item: any) => item.str)
                .join(' ');
  
              parsedDataTemp.push(new PdfData(i, pageText));
            }
            setParsedData(parsedDataTemp);
          } catch (error) {
            console.error('PDF parsing error:', error);
            setError('Error parsing PDF: ' + error);
          }
        },
        onError: (error) => {
          console.error('Error parsing PDF', error);
          setError('Error parsing PDF: ' + error.message);
        },
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleParse}>Parse PDF</button>
      {error && <p>{error}</p>}
      {parsedData.map((data) => (
        <div key={data.page}>
          <p>Page {data.page}</p>
          <p>{data.text}</p>
        </div>
      ))}
    </div>
  );
}

// 'use client';

// import { useState } from 'react';
// import * as pdfjsLib from 'pdfjs-dist';
// import type { TextItem } from 'pdfjs-dist/types/src/display/api';
// import { api } from '~/trpc/react';

// // Configure the worker source (do this only once)
// pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

// interface PdfData {
//   page: number;
//   text: string;
// }

// export default function PdfParserClient() {
//   const [parsedData, setParsedData] = useState<PdfData[]>([]);
//   const [file, setFile] = useState<File | null>(null);
//   const { mutate } = api.pdfParse.uploadPdf.useMutation();

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setFile(event.target.files[0]);
//     }
//   };

//   const handleParse = async () => {
//     if (!file) return;
//     mutate(
//       { file: file },
//       {
//         onSuccess: async (arrayBuffer) => {
//           try {
//             const pdfDoc = await pdfjsLib.getDocument(arrayBuffer).promise;
//             const numPages = pdfDoc.numPages;
//             const parsedDataTemp: PdfData[] = [];

//             for (let i = 1; i <= numPages; i++) {
//               const page = await pdfDoc.getPage(i);
//               const textContent = await page.getTextContent();
//               const pageText = textContent.items
//                 .map((item: any) => item.str)
//                 .join(' ');

//               parsedDataTemp.push({ page: i, text: pageText });
//             }
//             setParsedData(parsedDataTemp);
//           } catch (error) {
//             console.error('PDF parsing error:', error);
//           }
//         },
//         onError: (error) => {
//           console.error('Error parsing PDF', error);
//         },
//       }
//     );
//   };

//   return (
//     <div>
//       <input type="file" accept="application/pdf" onChange={handleFileChange} />
//       <button onClick={handleParse} 
//     //   disabled={isLoading}
//       >
//         Parse PDF
//       </button>

//       {parsedData.length > 0 && (
//         <div>
//           <h2>Parsed PDF Data:</h2>
//           <ul>
//             {parsedData.map((data, index) => (
//               <li key={index}>
//                 Page {data.page}: {data.text}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }