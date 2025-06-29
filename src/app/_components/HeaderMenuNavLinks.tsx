import Link from "next/link"

export const HeaderMenuNavLinks = () => {
    const navsMarkups = () => navs.map((nav) => (
        <li key={nav.name}>
            <Link href={nav.href} className="text-white hover:text-gray-300 transition-colors duration-200 text-lg font-semibold underline-offset-4 hover:no-underline">{nav.name}</Link>
        </li>
    ))

    return (
        <ul className="flex items-center space-x-10">
            {navsMarkups()}
        </ul>
    )
}

const navs = [
    {
        name: "Home",
        href: "/"
    },
    {
        name: "Pricing",
        href: "/pricing"
    },
    {
        name: "Features",
        href: "/features"
    }
]