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
        const pdfData = await pdfParse(pdfBuffer)
        //     , {
        //   // Set pdf-parse options to handle specific PDF file formats or encodings
        //   // ...
        // });

        return {
          text: pdfData.text,
          numpages: pdfData.numpages,
          info: pdfData.info,
        };
      } catch (error) {
        console.error("Error parsing PDF:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to parse PDF",
        });
      }
    }),
});

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