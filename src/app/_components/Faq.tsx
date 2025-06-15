import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"

export default function FAQSection() {
  const faqs = [
    {
      question: "Is Covry really free?",
      answer:
        "Yes! Covry is completely free to use. You can generate unlimited cover letters without any hidden fees or subscription costs. We believe everyone deserves access to professional cover letter tools.",
    },
    {
      question: "Is my data safe?",
      answer:
        "Absolutely. We take data security seriously. Your resume and personal information are encrypted and never shared with third parties. We only use your data to generate your personalized cover letters.",
    },
    {
      question: "What makes Covry different?",
      answer:
        "Covry uses advanced AI technology to create personalized cover letters that are specifically tailored to each job description. Unlike generic templates, our AI analyzes your resume and the job requirements to create unique, compelling cover letters.",
    },
    {
      question: "How does the AI write my cover letter?",
      answer:
        "Our AI analyzes your resume to understand your skills and experience, then matches them with the job description requirements. It creates a personalized narrative that highlights your most relevant qualifications for each specific role.",
    },
    {
      question: "Can I edit the generated cover letters?",
      answer:
        "Yes! After generating your cover letter, you can edit and customize it as needed. The AI provides a strong foundation, but you have full control to make any adjustments to match your personal style.",
    },
    {
      question: "What formats can I download my cover letter in?",
      answer:
        "You can download your cover letters in multiple formats including PDF, Word document (.docx), and plain text. All formats are ATS-friendly and professionally formatted.",
    },
    {
      question: "Are there any usage limits?",
      answer:
        "No usage limits! You can generate as many cover letters as you need, completely free. Whether you're applying to one job or hundreds, Covry has you covered.",
    },
    {
      question: "Can I use this for different industries and job types?",
      answer:
        "Our AI is trained to work across all industries and job types, from entry-level positions to executive roles. It adapts the tone and content based on the specific job requirements.",
    },
    {
      question: "How can I provide feedback or report issues?",
      answer:
        "We love hearing from our users! You can provide feedback or report issues through our feedback button, or contact us directly through our support page. Your input helps us improve Covry for everyone.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-transparent">
      <div className="mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-300">Everything you need to know about our cover letter generator</p>
        </div>

        {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4 mx-auto max-w-[42.4rem]">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index} max-w-[42rem]`} className="border border-gray-700 rounded-lg px-6 py-2">
                <AccordionTrigger className="text-left font-semibold text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 leading-relaxed pt-2 max-w-[38.2rem]">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
      </div>
    </section>
  )
}