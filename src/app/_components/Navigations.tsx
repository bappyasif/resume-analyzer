import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { DropdownMenuItem } from '~/components/ui/dropdown-menu'

export const AuthenticationsActions = () => {
    const { status } = useSession()

    const markups = (
        status === "authenticated" ? (
            <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
        ) : (
            <DropdownMenuItem onClick={() => signIn()}>Log in</DropdownMenuItem>
        )
    )

    return (
        markups
    )
}

export const HomePage = ({ setFalse }: { setFalse: () => void }) => {
    const pathname = usePathname()

    const checkIfHome = pathname === "/"

    return (
        <DropdownMenuItem onClick={setFalse} disabled={checkIfHome}>
            <Link href="/">Home</Link>
        </DropdownMenuItem>
    )
}

export const Navigations = () => {
    const { status } = useSession()

    const optionsAdjusted = status !== "authenticated" ? options.slice(0, 1) : options

    const [viewing, setViewing] = React.useState("")

    const changeCurrentlyViewing = (pathname: string) => {
        setViewing(pathname)
    }

    const navs = optionsAdjusted.map((nav) => <NavOption key={nav.path} item={nav} handleChange={changeCurrentlyViewing} currentlyViewing={viewing} />)

    return (
        navs
    )
}

const NavOption = ({ item, handleChange, currentlyViewing }: { item: { label: string, path: string }, handleChange: (pathname: string) => void, currentlyViewing: string }) => {
    const pathname = usePathname()

    useEffect(() => {
        handleChange(pathname)
    }, [pathname, handleChange])

    return (
        <DropdownMenuItem onClick={() => handleChange(item.path)} disabled={currentlyViewing === item.path}>
            <Link href={item.path}>{item.label}</Link>
        </DropdownMenuItem>
    )
}

const options = [
    // {
    //     label: "Home",
    //     path: "/",
    // },
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