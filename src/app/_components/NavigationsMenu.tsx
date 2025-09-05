"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MenuIcon } from "lucide-react"
import { AuthenticationsActions, Navigations } from "./Navigations"
import { useToDetectClickedOutside } from "~/hooks/useToClickedOutside"
import { useToToggleBoolean } from "~/hooks/useToToggleBoolean"

export const NavigationsMenu = () => {
    const ref = React.useRef<HTMLDivElement>(null)

    const { isTrue, setFalse, setTrue } = useToToggleBoolean()

    useToDetectClickedOutside(ref as React.RefObject<HTMLDivElement>, () => {
        setFalse()
    })

    return (
        <DropdownMenu open={isTrue}>
            <DropdownMenuTrigger asChild onClick={setTrue}>
                <Button variant="secondary" className="rounded"><MenuIcon /></Button>
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
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
