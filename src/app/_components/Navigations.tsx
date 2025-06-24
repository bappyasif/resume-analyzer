import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { DropdownMenuItem } from '~/components/ui/dropdown-menu'

// export const Navigations = () => {
//     const { status } = useSession()

//     const optionsAdjusted = status !== "authenticated" ? options.slice(0, 2) : options

//     const navs = optionsAdjusted.map((nav) => {
//         return (
//             <li key={nav.path}>
//                 {/* <a href={nav.path}>{nav.label}</a> */}
//                 <Link href={nav.path}>{nav.label}</Link>
//             </li>
//         )
//     })

//     return (
//         <nav>
//             <ul 
//             style={{ listStyle: "none", display: "flex", gap: "1rem", justifyContent: "center", padding: "1rem", margin: "0", flexDirection: "column" }}
//             >{navs}</ul>
//         </nav>
//     )
// }

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

    // useEffect(() => {
    //     console.log("viewing", pathname)
    //     handleChange(pathname)
    // }, [])
    return (
        <DropdownMenuItem onClick={setFalse} disabled={checkIfHome}>
            <Link href="/">Home</Link>
        </DropdownMenuItem>
    )
}

// this works well when menu is not using any explicit ref to control open state for menu trigger
// export const Navigations = () => {
//     const { status } = useSession()

//     const optionsAdjusted = status !== "authenticated" ? options.slice(0, 1) : options

//     const [viewing, setViewing] = React.useState("")

//     const navs = optionsAdjusted.map((nav) => {
//         return (
//             <DropdownMenuItem key={nav.path} onClick={() => setViewing(nav.label)} disabled={viewing === nav.label}>
//                 {/* <a href={nav.path}>{nav.label}</a> */}
//                 <Link href={nav.path}>{nav.label}</Link>
//             </DropdownMenuItem>
//         )
//     })

//     return (
//         navs
//     )
// }

export const Navigations = () => {
    const { status } = useSession()

    const optionsAdjusted = status !== "authenticated" ? options.slice(0, 1) : options

    const [viewing, setViewing] = React.useState("")

    // const pathname = usePathname()
    // console.log("pathname", pathname)


    // const navs = optionsAdjusted.map((nav) => {
    //     return (
    //         <DropdownMenuItem key={nav.path} onClick={() => setViewing(nav.path)} disabled={viewing === pathname}>
    //             <Link href={nav.path}>{nav.label}</Link>
    //         </DropdownMenuItem>
    //     )
    // })

    const changeCurrentlyViewing = (pathname: string) => {
        setViewing(pathname)
    }

    const navs = optionsAdjusted.map((nav) => <NavOption key={nav.path} item={nav} handleChange={changeCurrentlyViewing} currentlyViewing={viewing} />)

    // useEffect(() => {
    //     console.log("viewing", viewing)
    // }, [])

    return (
        navs
    )
}

const NavOption = ({ item, handleChange, currentlyViewing }: { item: { label: string, path: string }, handleChange: (pathname: string) => void, currentlyViewing: string }) => {
    const pathname = usePathname()

    useEffect(() => {
        console.log("viewing", pathname)
        handleChange(pathname)
    }, [])

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