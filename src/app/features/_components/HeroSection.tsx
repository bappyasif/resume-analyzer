import React from 'react'

export const HeroSection = () => {
    return (
        <section className="relative z-10 text-center py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
                    Powerful
                    <span 
                        className="bg-gradient-to-r from-primary to-sidebar-foreground bg-clip-text text-transparent"
                    >
                        {" "}
                        Features
                    </span>
                </h1>
                <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
                    Everything you need to create a resume that gets you hired
                </p>
            </div>
        </section>
    )
}
