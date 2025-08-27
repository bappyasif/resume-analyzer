"use client"

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Check, Sparkles, X } from 'lucide-react'

const PricingPage = () => {
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
            
            <section className="relative z-10 py-20 px-6">
                <div className="min-w-5xl mx-auto">
                    <div className="grid grid-cols-1 gap-8">
                        {plans.map((plan, index) => (
                            <Card
                                key={index}
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
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <Link
                href="/resume/upload"
                className="inline-block px-8 py-5 bg-gradient-to-r from-primary to-sidebar-primary font-bold rounded-lg shadow-lg hover:from-sidebar-primary hover:to-primary transition duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-blue-200 mt-8 text-center text-muted self-center"
            >
                Upload Your Resume Now
            </Link>
        </main>
    )
}

export default PricingPage