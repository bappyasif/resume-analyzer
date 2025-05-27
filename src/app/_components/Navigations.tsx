import Link from 'next/link'
import React from 'react'

export const Navigations = () => {
    const navs = options.map((nav) => {
        return (
            <li key={nav.path}>
                {/* <a href={nav.path}>{nav.label}</a> */}
                <Link href={nav.path}>{nav.label}</Link>
            </li>
        )
    })

    return (
        <nav>
            <ul style={{ listStyle: "none", display: "flex", gap: "1rem", justifyContent: "center", padding: "1rem", margin: "0" }}>{navs}</ul>
        </nav>
    )
}

const options = [
    {
        label: "Home",
        path: "/",
    },
    {
        label: "Upload Resume",
        path: "/resume/upload",
    },
    {
        label: "Resume Analysis",
        path: "/resume/analysis",
    },
    {
        label: "Resume Feedback",
        path: "/resume/feedback",
    },
]