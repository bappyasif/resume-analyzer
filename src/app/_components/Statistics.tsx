import { AiFillClockCircle, AiFillFileText } from "react-icons/ai"
import { BiTrendingUp, BiUser } from "react-icons/bi"

export default function StatisticsSection() {
    const stats = [
        {
            icon: AiFillFileText,
            number: "100+",
            label: "Cover Letters Generated",
        },
        {
            icon: BiTrendingUp,
            number: "40%",
            label: "Interview Rate Increase",
        },
        {
            icon: AiFillClockCircle,
            number: "45",
            label: "Minutes Saved Per Letter",
        },
        {
            icon: BiUser,
            number: "98%",
            label: "User Satisfaction",
        },
    ]

    return (
        <section className="py-16 px-4 bg-transparent w-full">

            {/* Section Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Trusted by Job Seekers Worldwide</h2>
                <p className="text-lg text-gray-300">Real numbers from real success stories</p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                {stats.map((stat, index) => {
                    const IconComponent = stat.icon
                    return (
                        <div key={index} className="text-center">
                            {/* Icon */}
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                                    <IconComponent className="w-8 h-8 text-white" />
                                </div>
                            </div>

                            {/* Number */}
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>

                            {/* Label */}
                            <div className="text-gray-400 font-medium">{stat.label}</div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}