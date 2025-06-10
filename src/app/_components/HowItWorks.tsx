import { AiFillFileText, AiFillStar, AiOutlineDownload } from "react-icons/ai"
import { BiBriefcase } from "react-icons/bi"

export default function HowItWorksSection() {
    const steps = [
        {
            number: "01",
            icon: AiFillFileText,
            title: "Upload Resume",
            description: "Upload your existing resume or CV to provide your experience and skills.",
        },
        {
            number: "02",
            icon: BiBriefcase,
            title: "Add Job Description",
            description: "Paste the job description to tailor your cover letter to the specific role.",
        },
        {
            number: "03",
            icon: AiOutlineDownload,
            title: "Generate & Download",
            description: "Get your personalized cover letter instantly, ready to send to employers.",
        },
    ]

    return (
        <section className="py-16 px-4 bg-transparent w-full">
            {/* Section Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
                <p className="text-lg text-gray-300">Three simple steps to your perfect cover letter</p>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {steps.map((step, index) => {
                    const IconComponent = step.icon
                    return (
                        <div key={index} className="text-center">
                            {/* Step Number */}
                            <div className="inline-block bg-teal-100 text-teal-600 font-bold text-lg px-4 py-2 rounded-lg mb-6">
                                {step.number}
                            </div>

                            {/* Icon */}
                            <div className="flex justify-center mb-6">
                                <IconComponent className="w-12 h-12 text-white" />
                            </div>

                            {/* Title */}
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{step.title}</h3>

                            {/* Description */}
                            <p className="text-gray-300 leading-relaxed">{step.description}</p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}