import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import pdfParse from "pdf-parse";
import { TRPCError } from "@trpc/server";
import { type inferRouterOutputs } from "@trpc/server";
import { Buffer } from "buffer";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

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
        const browser = await puppeteer.launch({
          args: chromium.args,
          executablePath: await chromium.executablePath(),
          headless: true,
        });

        const page = await browser.newPage();

        // decode the HTML content
        input.htmlContent = decodeURIComponent(input.htmlContent);

        // Set page content
        await page.setContent(input.htmlContent, { waitUntil: 'networkidle0' });

        // Generate PDF
        const pdfBuffer = await page.pdf({ format: 'A4' });

        // Close the browser
        await page.close();
        await browser.close();

        // Return the PDF buffer
        return pdfBuffer;

      } catch (error) {
        console.error("Error parsing PDF:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to parse PDF",
        });
      }
    })
});

export type PdfRouterOutput = inferRouterOutputs<typeof pdfRouter>;