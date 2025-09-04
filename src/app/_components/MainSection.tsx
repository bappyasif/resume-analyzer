import Link from 'next/link'
import React from 'react'
import { BiListCheck } from 'react-icons/bi'
import { Button } from '~/components/ui/button'

export const MainSection = () => {
    return (
        <div className="min-h-screen bg-transparent flex flex-col w-full">
            {/* Main Hero Section */}
            <div className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="mx-auto text-center">
                    {/* Main Heading */}
                    <h1
                        className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-tight"
                    >
                        Dream Career At Your Fingertips
                    </h1>
                    <h1
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary/80 mb-8 leading-tight"
                    >
                        Perfectly Tailor Your Resume For Job Market
                    </h1>

                    {/* Description */}
                    <p
                        className="text-lg md:text-xl text-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
                    >
                        Utilize our advanced AI-driven platform to analyze your resume and provide constructive feedback instantly.
                        Enhance your application and boost your chances of landing your dream job.
                    </p>

                    {/* CTA Button */}
                    <Button
                        className="p-8 text-lg font-semibold rounded-lg mb-16 inline-flex items-center gap-2 cursor-pointer"
                        size="lg"
                        variant="default"
                    >
                        <Link
                            href="/resume/upload"
                        >
                            Upload Resume
                        </Link>
                    </Button>

                    {/* Feature Badges */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                        <HeroFeature text="100% Free Forever" />

                        <HeroFeature text="No Credit Card" />

                        <HeroFeature text="Unlimited Analysis" />

                        <HeroFeature text="Unlimited Feedback" />
                    </div>
                </div>
            </div>
        </div>
    )
}

const HeroFeature = ({ text }: { text: string }) => {
    return (
        <div
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
            <div
                className="w-5 h-5 bg-primary/80 rounded-full flex items-center justify-center"
            >
                <BiListCheck className="w-3 h-3 text-foreground" />
            </div>
            <span className="font-medium">{text}</span>
        </div>
    )
}