"use client"

import React, { useState } from 'react'
import { FeatureCards } from '../_components/FeatureCards'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Check, Crown, Sparkles, Star, X, Zap } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { PagesHeroSection } from '../_components/PagesHeroSection'

const PricingPage = () => {
    // const [isAnnual, setIsAnnual] = useState(true)

    const plans = [
        {
            name: "Free",
            description: "Perfect for trying out our service",
            price: { monthly: 0, annual: 0 },
            icon: Sparkles,
            gradient: "from-gray-400 to-gray-600",
            features: [
                { name: "1 resume analysis per month", included: true },
                { name: "Basic ATS score", included: true },
                { name: "General improvement tips", included: true },
                { name: "Email support", included: true },
                { name: "Advanced keyword optimization", included: false },
                { name: "Industry-specific insights", included: false },
                { name: "Priority support", included: false },
                { name: "Resume templates", included: false },
            ],
        }
    ]

    return (
        <main className='flex flex-col items-center gap-2 justify-center max-w-5xl mx-auto pb-10'>
            <h1 className="text-5xl font-extrabold tracking-tight text-center text-foreground my-12">
                Simple, <span className="text-secondary-foreground">transparent</span> pricing
            </h1>
            {/* <p className="text-lg text-gray-300">
                Choose the plan that fits your needs. We don't believe in hidden fees or surprise charges.
            </p> */}

            {/* <PagesHeroSection /> */}

            {/* Pricing Cards */}
            <section className="relative z-10 py-20 px-6">
                <div className="min-w-5xl mx-auto">
                    <div className="grid grid-cols-1 gap-8">
                        {plans.map((plan, index) => (
                            <Card
                                key={index}
                                // className={`relative bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 ring-yellow-400 scale-105`}
                                className="backdrop-blur-md hover:bg-card/40 border-2 border-card hover:border-2 hover:border-accent transition-all duration-300 hover:scale-105 group"
                            >
                                <CardHeader className="text-center pb-8 pt-8">
                                    <div
                                        className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-xl flex items-center justify-center mx-auto mb-4`}
                                    >
                                        <plan.icon className="w-8 h-8 text-foreground" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                                    <p className="text-foreground/70 mb-6">{plan.description}</p>
                                </CardHeader>

                                <CardContent className="px-6 pb-8">
                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center justify-center">
                                                <p className='min-w-[17rem] flex'>
                                                    {feature.included ? (
                                                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                                ) : (
                                                    <X className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                                                )}
                                                <span className={`${feature.included ? "text-foreground" : "text-foreground/50"}`}>{feature.name}</span>
                                                </p>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* <Button
                                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg hover:shadow-xl`}
                                    >
                                        {plan.price.monthly === 0 ? "Get Started Free" : "Start Free Trial"}
                                    </Button> */}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            {/* <FeatureCards /> */}
            <Link
                href="/resume/upload"
                // className="px-8 py-5 bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold rounded-lg shadow-lg transition duration-200 ease-in-out hover:scale-105 hover:shadow-xl text-xl underline-offset-4 hover:decoration-wavyhover:decoration-blue-500 hover:underline-offset-8 hover:decoration-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-blue-200 mt-8 w-1/4 text-center mx-auto justify-center items-center flex my-4"
                className="inline-block px-8 py-5 bg-gradient-to-r from-primary to-sidebar-primary font-bold rounded-lg shadow-lg hover:from-sidebar-primary hover:to-primary transition duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-blue-200 mt-8 text-center text-muted self-center"
            >
                Upload Your Resume Now
            </Link>
        </main>
    )
}

export default PricingPage

/**
 * 
 * 
 
const PricingPage = () => {
    const [isAnnual, setIsAnnual] = useState(true)

    const plans = [
        {
            name: "Free",
            description: "Perfect for trying out our service",
            price: { monthly: 0, annual: 0 },
            icon: Sparkles,
            gradient: "from-gray-400 to-gray-600",
            features: [
                { name: "1 resume analysis per month", included: true },
                { name: "Basic ATS score", included: true },
                { name: "General improvement tips", included: true },
                { name: "Email support", included: true },
                { name: "Advanced keyword optimization", included: false },
                { name: "Industry-specific insights", included: false },
                { name: "Priority support", included: false },
                { name: "Resume templates", included: false },
            ],
        },
        {
            name: "Pro",
            description: "Best for active job seekers",
            price: { monthly: 19, annual: 15 },
            icon: Zap,
            gradient: "from-blue-400 to-blue-600",
            popular: true,
            features: [
                { name: "Unlimited resume analyses", included: true },
                { name: "Advanced ATS optimization", included: true },
                { name: "Smart keyword suggestions", included: true },
                { name: "Industry-specific insights", included: true },
                { name: "Performance tracking", included: true },
                { name: "Priority email support", included: true },
                { name: "Resume templates", included: true },
                { name: "Cover letter analysis", included: false },
            ],
        },
        {
            name: "Premium",
            description: "For serious career advancement",
            price: { monthly: 39, annual: 31 },
            icon: Crown,
            gradient: "from-purple-400 to-purple-600",
            features: [
                { name: "Everything in Pro", included: true },
                { name: "Cover letter analysis", included: true },
                { name: "LinkedIn profile optimization", included: true },
                { name: "1-on-1 career consultation", included: true },
                { name: "Custom resume templates", included: true },
                { name: "Interview preparation tips", included: true },
                { name: "24/7 priority support", included: true },
                { name: "Job matching recommendations", included: true },
            ],
        },
    ]
    return (
        <div>
            <h1 className="text-5xl font-extrabold tracking-tight text-center text-white my-12">
                Simple, <span className="text-yellow-400">transparent</span> pricing
            </h1>
            {/* <p className="text-lg text-gray-300">
                Choose the plan that fits your needs. We don't believe in hidden fees or surprise charges.
            </p> /}
            {/* <PagesHeroSection /> /}

            {/* Pricing Cards /}
            <section className="relative z-10 py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <Card
                                key={index}
                                className={`relative bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 ${plan.popular ? "ring-2 ring-yellow-400 scale-105" : ""
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                                            <Star className="w-4 h-4 mr-1" />
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                <CardHeader className="text-center pb-8 pt-8">
                                    <div
                                        className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-xl flex items-center justify-center mx-auto mb-4`}
                                    >
                                        <plan.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                    <p className="text-white/70 mb-6">{plan.description}</p>
                                    <div className="text-center">
                                        <span className="text-5xl font-bold text-white">
                                            ${isAnnual ? plan.price.annual : plan.price.monthly}
                                        </span>
                                        <span className="text-white/70 ml-2">{plan.price.monthly === 0 ? "" : "/month"}</span>
                                        {isAnnual && plan.price.monthly > 0 && (
                                            <div className="text-sm text-white/60 mt-1">Billed annually (${plan.price.annual * 12})</div>
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent className="px-6 pb-8">
                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center">
                                                {feature.included ? (
                                                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                                ) : (
                                                    <X className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                                                )}
                                                <span className={`${feature.included ? "text-white" : "text-white/50"}`}>{feature.name}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${plan.popular
                                            ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg hover:shadow-xl"
                                            : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                                            }`}
                                    >
                                        {plan.price.monthly === 0 ? "Get Started Free" : "Start Free Trial"}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            <FeatureCards />
            <Link
                href="/resume/upload"
                className="inline-block px-6 py-4 bg-white text-blue-600 font-semibold rounded shadow hover:bg-blue-100 transition duration-300"
            >
                Upload Resume
            </Link>
        </div>
    )
}
 */