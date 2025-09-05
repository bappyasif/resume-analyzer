import Link from "next/link"
import { Button } from "~/components/ui/button"

export const HeaderMenuNavLinks = () => {
    const navsMarkups = () => navs.map((nav) => (
        <li key={nav.name}>
            <Button variant="ghost" size={"lg"} className="">
                <Link
                    href={nav.href}
                    className="transition-colors duration-200 text-xl font-semibold underline-offset-4 hover:no-underline decoration-accent rounded"
                >{nav.name}</Link>
            </Button>
        </li>
    ))

    return (
        <ul className="flex items-center space-x-10 justify-end w-2/3">
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