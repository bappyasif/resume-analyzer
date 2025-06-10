import Link from 'next/link'
import React from 'react'
import { AiFillCheckCircle, AiOutlineArrowRight } from 'react-icons/ai'
import { BiCheck, BiCheckCircle, BiListCheck, BiMessageSquare } from 'react-icons/bi'

export const MainSection = () => {
    return (
        <div className="min-h-screen bg-transparent flex flex-col w-full">
            {/* Main Hero Section */}
            <div className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="mx-auto text-center">
                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                        Dream Career At Your Fingertips
                    </h1>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-300 mb-8 leading-tight">
                        Perfectly Tailor Your Resume For Job Market
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Utilize our advanced AI-driven platform to analyze your resume and provide constructive feedback instantly.
                        Enhance your application and boost your chances of landing your dream job.
                    </p>

                    {/* CTA Button */}
                    <button
                        className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 text-lg font-semibold rounded-lg mb-16 inline-flex items-center gap-2 cursor-pointer"
                    >
                        <Link href="/resume/upload" className="text-white">
                            Upload Resume
                        </Link>
                    </button>

                    {/* Feature Badges */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                        <div className="flex items-center gap-2 text-gray-200">
                            <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                                <BiListCheck className="w-3 h-3 text-white" />
                            </div>
                            <span className="font-medium">100% Free Forever</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-200">
                            <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                                <BiListCheck className="w-3 h-3 text-white" />
                            </div>
                            <span className="font-medium">No Credit Card</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-200">
                            <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                                <BiListCheck className="w-3 h-3 text-white" />
                            </div>
                            <span className="font-medium">Unlimited Analysis</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-200">
                            <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                                <BiListCheck className="w-3 h-3 text-white" />
                            </div>
                            <span className="font-medium">Unlimited Feedback</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback button */}
            <div className="fixed bottom-6 right-6">
                <button className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-6 py-3 shadow-lg inline-flex items-center gap-2">
                    <BiMessageSquare className="w-4 h-4" />
                    Feedback
                </button>
            </div>
        </div>
    )
}
