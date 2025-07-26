import { AiFillFileText, AiFillStar, AiOutlineDownload } from "react-icons/ai"
import { BiBadgeCheck } from "react-icons/bi"
import type { IconType } from "react-icons/lib"
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card"

export default function HowItWorksSection() {
    const steps = [
        {
            number: "Step 1",
            icon: AiFillStar,
            title: "Upload Resume",
            description: "Upload your existing resume or CV to provide your experience and skills.",
        },
        {
            number: "Step 2",
            icon: AiFillFileText,
            title: "See analysis",
            description: "Review your resume analysis to understand your strengths and weaknesses.",
        },
        {
            number: "Step 3",
            icon: BiBadgeCheck,
            title: "View Feedback",
            description: "Provide feedback on the quality and content of your cover letter.",
        },
        {
            number: "Step 4",
            icon: AiOutlineDownload,
            title: "Download Feedback",
            description: "Get your personalized cover letter instantly, ready to send to employers.",
        },
    ]

    return (
        <section className="py-40 px-4 bg-transparent w-full">
            {/* Section Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
                <p className="text-lg text-gray-300">Three simple steps to your perfect cover letter</p>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
                {steps.map((step, index) => {
                    const IconComponent = step.icon
                    return (
                        <StepCard key={index} number={step.number} icon={IconComponent} title={step.title} description={step.description} />
                        // <div key={index} className="text-center">
                        //     {/* Step Number */}
                        //     <div className="inline-block bg-teal-100 text-teal-600 font-bold text-lg px-4 py-2 rounded-lg mb-6">
                        //         {step.number}
                        //     </div>

                        //     {/* Icon */}
                        //     <div className="flex justify-center mb-6">
                        //         <IconComponent className="w-12 h-12 text-white" />
                        //     </div>

                        //     {/* Title */}
                        //     <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{step.title}</h3>

                        //     {/* Description */}
                        //     <p className="text-gray-300 leading-relaxed">{step.description}</p>
                        // </div>
                    )
                })}
            </div>
        </section>
    )
}

const StepCard = ({ number, icon, title, description }: { number: string, icon: IconType, title: string, description: string }) => {
    const IconComponent = icon
    return (
        <Card className="backdrop-blur-md border-foreground/20 hover:bg-primary/20 transition-all duration-300 hover:scale-105">
            <CardHeader>
                {/* Step Number */}
                <div className="inline-block bg-teal-100 text-teal-600 font-bold text-lg px-4 py-2 rounded-lg mb-6 text-center">
                    {number}
                </div>
            </CardHeader>

            <CardContent>
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    {<IconComponent className="w-12 h-12 text-white" />}
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">{title}</h3>
            </CardContent>

            <CardFooter>
                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-center">{description}</p>
            </CardFooter>
        </Card>
    )
    // return (
    //     <div className="text-center">
    //         {/* Step Number */}
    //         <div className="inline-block bg-teal-100 text-teal-600 font-bold text-lg px-4 py-2 rounded-lg mb-6">
    //             {number}
    //         </div>

    //         {/* Icon */}
    //         <div className="flex justify-center mb-6">
    //             {<IconComponent className="w-12 h-12 text-white" />}
    //         </div>

    //         {/* Title */}
    //         <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{title}</h3>

    //         {/* Description */}
    //         <p className="text-gray-300 leading-relaxed">{description}</p>
    //     </div>
    // )
}