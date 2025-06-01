import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import pdfParse from "pdf-parse";
import { TRPCError } from "@trpc/server";
import { type inferRouterOutputs } from "@trpc/server";
import { Buffer } from "buffer";

export const pdfRouter = createTRPCRouter({
  parsePdf: publicProcedure
    .input(z.object({ pdfData: z.string() })) // Expecting a base64 encoded string
    .mutation(async ({ input }) => {
      try {
        // Decode the base64 string to a Buffer
        const pdfBuffer = Buffer.from(input.pdfData, "base64");

        // Parse the PDF
        const { text, numpages, info } = await pdfParse(pdfBuffer);

        return {
          text,
          numpages,
          info,
        };
      } catch (error) {
        console.error("Error parsing PDF:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to parse PDF",
        });
      }
    }),
  downloadPdf: publicProcedure
    .input(z.object({ htmlContent: z.string() })) // Expecting a base64 encoded string
    .mutation(async ({ input }) => {
      try {
        // Validate the input
        if (!input.htmlContent) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid HTML content",
          });
        }

        // Create a browser instance
        const browser = await import('puppeteer');
        const browserInstance = await browser.launch({headless: true});
        const page = await browserInstance.newPage();

        // Set page content
        await page.setContent(input.htmlContent, {waitUntil: 'networkidle0'});

        // Generate PDF
        const pdfBuffer = await page.pdf({ format: 'A4' });

        // Close the browser
        await browserInstance.close();

        // Return the PDF buffer
        return pdfBuffer;

      }
      catch (error) {
        console.error("Error parsing PDF:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to parse PDF",
        });
      }
    })
});

// export const pdfRouter = createTRPCRouter({
//   parsePdf: publicProcedure
//     .input(z.object({ pdfData: z.string() })) // Expecting a base64 encoded string
//     .mutation(async ({ input }) => {
//       try {
//         // Decode the base64 string to a Buffer
//         const pdfBuffer = Buffer.from(input.pdfData, "base64");

//         // Parse the PDF
//         const pdfData = await pdfParse(pdfBuffer)
//         //     , {
//         //   // Set pdf-parse options to handle specific PDF file formats or encodings
//         //   // ...
//         // });

//         return {
//           text: pdfData.text,
//           numpages: pdfData.numpages,
//           info: pdfData.info,
//         };
//       } catch (error) {
//         console.error("Error parsing PDF:", error);
//         throw new TRPCError({
//           code: "INTERNAL_SERVER_ERROR",
//           message: "Failed to parse PDF",
//         });
//       }
//     }),
// });

// import { z } from "zod";
// import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
// import pdfParse from "pdf-parse";
// import { TRPCError } from "@trpc/server";
// import { type inferRouterOutputs } from "@trpc/server";

// export const pdfRouter = createTRPCRouter({
//     parsePdf: publicProcedure
//         .input(z.object({ pdfData: z.string() })) // Expecting a base64 encoded string
//         .mutation(async ({ input }) => {
//             try {
//                 // Decode the base64 string to a Buffer
//                 const pdfBuffer = Buffer.from(input.pdfData, "base64");

//                 // Parse the PDF
//                 const data = await pdfParse(pdfBuffer);

//                 return {
//                     text: data.text,
//                     numpages: data.numpages,
//                     info: data.info,
//                 };
//             } catch (error) {
//                 console.error("Error parsing PDF:", error);
//                 throw new TRPCError({
//                     code: "INTERNAL_SERVER_ERROR",
//                     message: "Failed to parse PDF",
//                 });
//             }
//         }),
// });

export type PdfRouterOutput = inferRouterOutputs<typeof pdfRouter>;