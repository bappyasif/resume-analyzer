"use client"

import * as React from "react"
// import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import type { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"

type Checked = DropdownMenuCheckboxItemProps["checked"]

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HamburgerIcon, MenuIcon } from "lucide-react"
import { AuthenticationsActions, HomePage, Navigations } from "./Navigations"
import Link from "next/link"
import { useToDetectClickedOutside } from "~/hooks/useToClickedOutside"
import { useToToggleBoolean } from "~/hooks/useToToggleBoolean"

// export function DropdownMenuDemo() {
//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//                 <Button variant="secondary"><MenuIcon /></Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-48" align="end">
//                 {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
//         <DropdownMenuGroup>
//           <DropdownMenuItem>
//             Profile
//             <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             Billing
//             <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             Settings
//             <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             Keyboard shortcuts
//             <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
//           </DropdownMenuItem>
//         </DropdownMenuGroup> 
//         <DropdownMenuSeparator /> */}
//                 <DropdownMenuGroup>
//                     <DropdownMenuItem>Authentication</DropdownMenuItem>
//                     <DropdownMenuSub>
//                         <DropdownMenuSubTrigger>Ready</DropdownMenuSubTrigger>
//                         <DropdownMenuPortal>
//                             <DropdownMenuSubContent>
//                                 <AuthenticationsActions />
//                                 {/* <DropdownMenuItem>Log in</DropdownMenuItem>
//                 <DropdownMenuItem>Log out</DropdownMenuItem> */}
//                                 {/* <DropdownMenuSeparator /> */}
//                                 {/* <DropdownMenuItem>More...</DropdownMenuItem> */}
//                             </DropdownMenuSubContent>
//                         </DropdownMenuPortal>
//                     </DropdownMenuSub>
//                     {/* <DropdownMenuItem>
//             New Team
//             <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
//           </DropdownMenuItem> */}
//                 </DropdownMenuGroup>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuGroup>
//                     <DropdownMenuItem>Resume</DropdownMenuItem>
//                     <DropdownMenuSub>
//                         <DropdownMenuSubTrigger>Services</DropdownMenuSubTrigger>
//                         <DropdownMenuPortal>
//                             <DropdownMenuSubContent>
//                                 <Navigations />
//                                 {/* <DropdownMenuItem>Upload</DropdownMenuItem>
//                 <DropdownMenuItem>Analyze</DropdownMenuItem>
//                 <DropdownMenuItem>Feedback</DropdownMenuItem> */}
//                                 {/* <DropdownMenuSeparator /> */}
//                                 {/* <DropdownMenuItem>More...</DropdownMenuItem> */}
//                             </DropdownMenuSubContent>
//                         </DropdownMenuPortal>
//                     </DropdownMenuSub>
//                 </DropdownMenuGroup>
//                 {/* <DropdownMenuItem>GitHub</DropdownMenuItem>
//         <DropdownMenuItem>Support</DropdownMenuItem>
//         <DropdownMenuItem disabled>API</DropdownMenuItem>
//         <DropdownMenuSeparator /> */}
//                 {/* <DropdownMenuItem>
//           Log out
//           <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
//         </DropdownMenuItem> */}
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                     <Link href="/">Home</Link>
//                 </DropdownMenuItem>
//             </DropdownMenuContent>
//         </DropdownMenu>
//     )
// }

// export const NavigationsMenu = () => {
//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//                 <Button variant="secondary"><MenuIcon /></Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-48" align="end">
//                 <DropdownMenuGroup>
//                     <DropdownMenuItem>Authentication</DropdownMenuItem>
//                     <DropdownMenuSub>
//                         <DropdownMenuSubTrigger>Ready</DropdownMenuSubTrigger>
//                         <DropdownMenuPortal>
//                             <DropdownMenuSubContent>
//                                 <AuthenticationsActions />
//                             </DropdownMenuSubContent>
//                         </DropdownMenuPortal>
//                     </DropdownMenuSub>
//                 </DropdownMenuGroup>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuGroup>
//                     <DropdownMenuItem>Resume</DropdownMenuItem>
//                     <DropdownMenuSub>
//                         <DropdownMenuSubTrigger>Services</DropdownMenuSubTrigger>
//                         <DropdownMenuPortal>
//                             <DropdownMenuSubContent>
//                                 <Navigations />
//                             </DropdownMenuSubContent>
//                         </DropdownMenuPortal>
//                     </DropdownMenuSub>
//                 </DropdownMenuGroup>

//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                     <Link href="/">Home</Link>
//                 </DropdownMenuItem>
//             </DropdownMenuContent>
//         </DropdownMenu>
//     )
// }


export const NavigationsMenu = () => {
    const ref = React.useRef<HTMLDivElement>(null)

    const { isTrue, setFalse, setTrue } = useToToggleBoolean()

    useToDetectClickedOutside(ref as React.RefObject<HTMLDivElement>, () => {
        console.log("clicked outside")
        setFalse()
    })

    return (
        <DropdownMenu open={isTrue}>
            <DropdownMenuTrigger asChild onClick={setTrue}>
                <Button variant="secondary"><MenuIcon /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="end" ref={ref}>
                <DropdownMenuGroup>
                    <DropdownMenuItem>Authentication</DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Ready</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <AuthenticationsActions />
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>Resume</DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Services</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <Navigations />
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>

                {/* <DropdownMenuSeparator /> */}
                {/* <HomePage setFalse={setFalse} /> */}
                {/* <DropdownMenuItem onClick={setFalse}>
                    <Link href="/">Home</Link>
                </DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
