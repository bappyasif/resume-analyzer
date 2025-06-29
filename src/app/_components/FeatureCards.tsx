import { Award, BarChart3, Target } from 'lucide-react'
import React from 'react'
import { Card, CardContent } from '~/components/ui/card'

export const FeatureCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl w-full">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">ATS Score</h3>
                    <p className="text-white/70 text-sm">Check how well your resume passes Applicant Tracking Systems</p>
                </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Keywords</h3>
                    <p className="text-white/70 text-sm">Optimize your resume with industry-specific keywords</p>
                </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Award className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Improvements</h3>
                    <p className="text-white/70 text-sm">Get personalized suggestions to enhance your resume</p>
                </CardContent>
            </Card>
        </div>
    )
}
