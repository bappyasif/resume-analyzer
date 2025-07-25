import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

// Define the input schema for type safety
const extractDetailsInput = z.object({
  text: z.string().min(1, "Resume text cannot be empty."),
  role: z.string().min(1, "Role cannot be empty."),
});

// Define the output schema (adjust based on what your Gemini API actually returns)
const extractedDetailsOutput = z.object({
  // Example fields - update these to match your actual API response
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  summary: z.string().optional(),
  skills: z.array(z.string()).optional(),
  // experience: z.number().optional(),
  experience: z.array(z.any()).optional(),
  // education: z.array(z.string()).optional(),
  education: z.array(z.any()).optional(),
  // certifications: z.array(z.string()).optional(),
  projects: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
  references: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  awards: z.array(z.string()).optional(),
});

// const feedbackOutput = z.object({
//   achievements: z.object({suggestions: z.string().optional(), improvements: z.string().optional()}).optional(),
//   awards: z.object({suggestions: z.string().optional(), improvements: z.string().optional()}).optional(),
//   certifications: z.object({suggestions: z.string().optional(), improvements: z.string().optional()}).optional(),
//   education: z.object({suggestions: z.string().optional(), improvements: z.array(z.string()).optional()}).optional(),
//   experience: z.object({quantification: z.string().optional(), tailoring: z.string().optional(), improvements: z.array(z.string()).optional(), suggestions: z.string().optional()}).optional(),
//   interests: z.object({suggestions: z.string().optional(), improvements: z.array(z.string()).optional()}).optional(),
//   projects: z.object({suggestions: z.string().optional(), improvements: z.array(z.string()).optional()}).optional(),
//   references: z.object({suggestions: z.string(), improvements: z.string().optional()}).optional(),
//   skills: z.object({improvements: z.array(z.string()).optional(), suggestions: z.string().optional(), better_highlighting: z.string().optional(), missing_skills: z.array(z.string())}).optional(),
//   summary: z.object({suggestions: z.string().optional(), improvements: z.string().optional()}).optional(),
// })

const feedbackOutput = z.record(z.any()).optional()

export const resumeRouter = createTRPCRouter({
  extractDetails: publicProcedure
    .input(extractDetailsInput)
    .output(extractedDetailsOutput)
    .mutation(async ({ input }) => {
      const { text, role } = input;
      const response = await fetch(
        // 'http://localhost:3001/resume-gemini'
        // 'http://localhost:3001/resume-gemini/extraction'
        'http://localhost:3003/resume-analysis/'
        , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text, role }),
        });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data, "success trpc: extraction", data?.output);

      return data;
    }),
  feedback: publicProcedure
    .input(extractDetailsInput)
    .output(feedbackOutput)
    .mutation(async ({ input }) => {
      const { text, role } = input;
      const response = await fetch(
        // 'http://localhost:3001/resume-gemini'
        // 'http://localhost:3001/resume-gemini/feedback',
        'http://localhost:3003/resume-feedback',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text, role }),
        });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data, "success trpc: feedback", data?.output);

      return data;
    }),
})