"use client"

import React from 'react'
import { AiFillOpenAI } from "react-icons/ai"
import { NavigationsMenu } from './NavigationsMenu'
import { HeaderMenuNavLinks } from './HeaderMenuNavLinks'
import { ThemeToggle } from '~/components/ThemeToggle'
import Image from 'next/image'

export const Header = () => {
    return (
        <header 
            className="flex items-center justify-between p-4 bg-gradient-to-tr from-sidebar-primary to-sidebar dark:from-sidebar dark:to-sidebar-primary shadow-lg backdrop-blur-sm"
        >
            <div className='flex items-center space-x-4 w-full'>
                <p className="text-foreground font-bold text-xl flex items-center">
                    {/* LOGO <AiFillOpenAI className="ml-2 text-2xl" /> */}
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={90}
                        height={20}
                        className='w-24 h-14 hover:opacity-80 transition-opacity duration-300 border-secondary border-2 rounded'
                    />
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