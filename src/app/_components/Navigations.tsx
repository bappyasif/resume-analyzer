import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export const Navigations = () => {
    const { status } = useSession()

    const optionsAdjusted = status !== "authenticated" ? options.slice(0, 2) : options

    const navs = optionsAdjusted.map((nav) => {
        return (
            <li key={nav.path}>
                {/* <a href={nav.path}>{nav.label}</a> */}
                <Link href={nav.path}>{nav.label}</Link>
            </li>
        )
    })

    return (
        <nav>
            <ul 
            style={{ listStyle: "none", display: "flex", gap: "1rem", justifyContent: "center", padding: "1rem", margin: "0", flexDirection: "column" }}
            >{navs}</ul>
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