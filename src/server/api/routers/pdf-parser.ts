import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { createTRPCRouter, publicProcedure } from '../trpc';

const pdfFileSchema = z.object({
  file: z.instanceof(Blob),
});

export const pdfFileRoute = createTRPCRouter({
  uploadPdf: publicProcedure
    .input(pdfFileSchema)
    .mutation(async ({ input }) => {
      const file = input.file;

      // Check file type
      if (file.type !== 'application/pdf') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid file type. Only PDF files are allowed.',
        });
      }

      // Parse the PDF file
      try {
        const arrayBuffer = await file.arrayBuffer();
        return arrayBuffer;
      } catch (error) {
        console.error('PDF parsing error:', error);
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Failed to parse PDF file.',
        });
      }
    }),
});

// import { z } from 'zod';
// import { TRPCError } from '@trpc/server';
// import { createTRPCRouter, publicProcedure } from '../trpc';

// const pdfFileSchema = z.object({
//   file: z.instanceof(Blob),
// });

// // const pdfFileSchema = z.object({
// //   file: z.instanceof(File),
// // });

// // const pdfFileSchema = z.object({
// //   file: z.instanceof(File) || z.instanceof(Blob),
// // });

// export const pdfFileRoute = createTRPCRouter({
//   uploadPdf: publicProcedure
//     .input(pdfFileSchema)
//     .mutation(async ({ input }) => {
//       const file = input.file;

//       // Check file type
//       if (file.type !== 'application/pdf') {
//         throw new TRPCError({
//           code: 'BAD_REQUEST',
//           message: 'Invalid file type. Only PDF files are allowed.',
//         });
//       }
//       try {
//         const arrayBuffer = await file.arrayBuffer();
//         return arrayBuffer;
//       } catch (error) {
//         console.error('PDF parsing error:', error);
//         throw new TRPCError({
//           code: 'BAD_REQUEST',
//           message: 'Failed to parse PDF file.',
//         });
//       }
//     }),
// });

// import { z } from 'zod';
// import { TRPCError } from '@trpc/server';
// import { createTRPCRouter, publicProcedure } from '../trpc';
// import * as pdfjsLib from 'pdfjs-dist';
// import type { TextItem } from 'pdfjs-dist/types/src/display/api';

// // Configure the worker source (do this only once)
// pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

// const pdfFileSchema = z.object({
//   file: z.instanceof(Blob),
// });

// export const pdfFileRoute = createTRPCRouter({
//   uploadPdf: publicProcedure
//     .input(pdfFileSchema)
//     .mutation(async ({ input }) => {
//       const file = input.file;

//       // Check file type
//       if (file.type !== 'application/pdf') {
//         throw new TRPCError({
//           code: 'BAD_REQUEST',
//           message: 'Invalid file type. Only PDF files are allowed.',
//         });
//       }

//       // Parse the PDF file
//       try {
//         const arrayBuffer = await file.arrayBuffer();
//         const pdfDoc = await pdfjsLib.getDocument(arrayBuffer).promise;
//         const numPages = pdfDoc.numPages;
//         const parsedData = [];

//         for (let i = 1; i <= numPages; i++) {
//           const page = await pdfDoc.getPage(i);
//           const textContent = await page.getTextContent();
//           const pageText = textContent.items.map((item: any) => item.str).join(' ');

//           parsedData.push({ page: i, text: pageText });
//         }

//         return parsedData;
//       } catch (error) {
//         console.error('PDF parsing error:', error);
//         throw new TRPCError({
//           code: 'BAD_REQUEST',
//           message: 'Failed to parse PDF file.',
//         });
//       }
//     }),
// });

// import { z } from 'zod';
// import { TRPCError } from '@trpc/server';
// import { createTRPCRouter, publicProcedure } from '../trpc';
// import * as pdfjsLib from 'pdfjs-dist';
// // import 'pdfjs-dist/build/pdf.worker.entry';

// // The workerSrc property shall be specified.
// // pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs'; // or '/pdf.worker.js'
// // or if you are using a cdn
// // pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

// const pdfFileSchema = z.object({
//     file: z.instanceof(Blob),
//   });

// export const pdfFileRoute = createTRPCRouter({
//   uploadPdf: publicProcedure
//     .input(pdfFileSchema)
//     .mutation(async ({ input }) => {
//       const file = input.file;

//       // Check file type
//       if (file.type !== 'application/pdf') {
//         throw new TRPCError({
//           code: 'BAD_REQUEST',
//           message: 'Invalid file type. Only PDF files are allowed.',
//         });
//       }

//       // Parse the PDF file
//       try {
//         const arrayBuffer = await file.arrayBuffer();
//         // Configure the worker source
//         pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js'; // Adjust the path if needed

//         const pdfDoc = await pdfjsLib.getDocument(arrayBuffer).promise;
//         const numPages = pdfDoc.numPages;
//         const parsedData = [];

//         for (let i = 1; i <= numPages; i++) {
//           const page = await pdfDoc.getPage(i);
//           const textContent = await page.getTextContent();
//           const pageText = textContent.items.map((item: any) => item.str).join(' ');

//           parsedData.push({ page: i, text: pageText });
//         }

//         return parsedData;
//       } catch (error) {
//         console.error("PDF parsing error:", error);
//         throw new TRPCError({
//           code: 'BAD_REQUEST',
//           message: 'Failed to parse PDF file.',
//         });
//       }
//     }),
// });


// import { z } from 'zod';
// import { TRPCError } from '@trpc/server';
// import { createTRPCRouter, publicProcedure } from '../trpc';
// // import { pdfjs } from 'pdfjs';
// import * as pdfjsLib from 'pdfjs-dist';
// import 'pdfjs-dist/build/pdf.worker.entry';
// const pdfjs = pdfjsLib


// const pdfFileSchema = z.object({
//   file: z.instanceof(Blob),
// });

// export const pdfFileRoute = createTRPCRouter({
//   uploadPdf: publicProcedure
//     .input(pdfFileSchema)
//     .mutation(async ({ input }) => {
//       const file = input.file;

//       // Check file type
//       if (file.type !== 'application/pdf') {
//         throw new TRPCError({
//           code: 'BAD_REQUEST',
//           message: 'Invalid file type. Only PDF files are allowed.',
//         });
//       }

//       // Parse the PDF file
//       try {
//         // const pdfData = await pdfParse(file);
//         // const parsedData = {
//         //     text: pdfData.text,
//         //     numpages: pdfData.numpages,
//         //     info: pdfData.info,
//         //   };
//         //   return parsedData;
//         // const arrayBuffer = await file.arrayBuffer();
//         // const buffer = Buffer.from(arrayBuffer);
//         // // const pdfData = await pdfParse(buffer);
//         // const pdfData = await pdfParse(buffer, { buffer: true });
//         // const parsedData = {
//         //   text: pdfData.text,
//         //   numpages: pdfData.numpages,
//         //   info: pdfData.info,
//         // };
//         // return parsedData;

//         const arrayBuffer = await file.arrayBuffer();
//         const pdfDoc = await pdfjs.getDocument(arrayBuffer).promise;
//         const numPages = pdfDoc.numPages;
//         const parsedData = [];

//         for (let i = 1; i <= numPages; i++) {
//           const page = await pdfDoc.getPage(i);
//           const textContent = await page.getTextContent();
//           const pageText = textContent.items.map((item) => item.str).join(' ');

//           parsedData.push({ page: i, text: pageText });
//         }

//         return parsedData;
//       } catch (error) {
//         throw new TRPCError({
//           code: 'BAD_REQUEST',
//           message: 'Failed to parse PDF file.',
//         });
//       }
//     }),
// });