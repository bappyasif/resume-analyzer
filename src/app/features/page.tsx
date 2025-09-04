import React from 'react'
import Link from 'next/link'
import { BarChart3, CheckCircle, Shield, Target, Zap } from 'lucide-react'
import { Card, CardContent } from '~/components/ui/card'
import { HeroSection } from './_components/HeroSection'

const FeaturesPage = () => {
    const features = [
        {
            icon: BarChart3,
            title: "ATS Compatibility Score",
            description:
                "Get a detailed score showing how well your resume passes through Applicant Tracking Systems used by 99% of Fortune 500 companies.",
            benefits: ["Real-time ATS scanning", "Format optimization tips", "Keyword density analysis"],
            gradient: "from-blue-400 to-blue-600",
        },
        {
            icon: Target,
            title: "Smart Keyword Optimization",
            description:
                "AI-powered keyword suggestions based on your target role and industry to help you get noticed by recruiters.",
            benefits: ["Industry-specific keywords", "Skill gap analysis", "Trending terms detection"],
            gradient: "from-green-400 to-green-600",
        },
        {
            icon: Shield,
            title: "Privacy & Security",
            description: "Your data is encrypted and secure. We never share your information with third parties.",
            benefits: ["End-to-end encryption", "GDPR compliant", "Automatic data deletion"],
            gradient: "from-red-400 to-red-600",
        },
        {
            icon: Zap,
            title: "Instant Analysis",
            description: "Get comprehensive feedback in under 30 seconds with our lightning-fast AI analysis engine.",
            benefits: ["Sub-30 second analysis", "Real-time feedback", "Batch processing"],
            gradient: "from-yellow-400 to-yellow-600",
        },
    ]

    return (
        <main className="max-w-5xl mx-auto px-8 py-12">
            <HeroSection />

            <section className="relative z-10 py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="backdrop-blur-md hover:bg-card/40 border-2 border-card hover:border-2 hover:border-accent transition-all duration-300 hover:scale-105 group"
                            >
                                <CardContent className="p-8">
                                    <div className="flex items-start space-x-6">
                                        <div
                                            className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <feature.icon className="w-8 h-8 text-foreground" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-foreground mb-3">{feature.title}</h3>
                                            <p className="text-foreground/80 mb-6 leading-relaxed">{feature.description}</p>
                                            <ul className="space-y-2">
                                                {feature.benefits.map((benefit, benefitIndex) => (
                                                    <li key={benefitIndex} className="flex items-center text-foreground/70">
                                                        <CheckCircle className="w-4 h-4 text-accent-foreground mr-3 flex-shrink-0" />
                                                        {benefit}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <Link
                href="/resume/upload"
                className="inline-block px-8 py-5 bg-gradient-to-r from-primary to-sidebar-primary font-bold rounded-lg shadow-lg hover:from-sidebar-primary hover:to-primary transition duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-blue-200 mt-8 w-full text-center text-muted"
            >
                Upload Resume
            </Link>
        </main>
    )
}

export default FeaturesPage