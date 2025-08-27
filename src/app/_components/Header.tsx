"use client"

import React from 'react'
import { AiFillOpenAI } from "react-icons/ai"
import { NavigationsMenu } from './NavigationsMenu'
import { HeaderMenuNavLinks } from './HeaderMenuNavLinks'
import { ThemeToggle } from '~/components/ThemeToggle'

export const Header = () => {
    return (
        <header 
            className="flex items-center justify-between p-4 bg-gradient-to-tr from-sidebar-accent to-sidebar shadow-lg"
        >
            <div className='flex items-center space-x-4 w-full'>
                <p className="text-foreground font-bold text-xl flex items-center">
                    LOGO <AiFillOpenAI className="ml-2 text-2xl" />
                </p>

                <HeaderMenuNavLinks />
            </div>

            <div className="flex items-center space-x-4 w-1/4 justify-end">
                <ThemeToggle />

                <NavigationsMenu />
            </div>
        </header>
    )
}