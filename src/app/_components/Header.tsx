"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { AiFillOpenAI, AiOutlineProfile, AiFillProfile, AiOutlineMenuUnfold, AiOutlineMenu } from "react-icons/ai"
import {BiLogIn, BiLogOut} from "react-icons/bi"
import { useToToggleBoolean } from '~/hooks/useToToggleBoolean'
import { Navigations } from './Navigations'
import { useToDetectClickedOutside } from '~/hooks/useToClickedOutside'
// import { signIn, signOut } from '~/server/auth'

export const Header = () => {
    const { status } = useSession()

    return (
        <header className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
            <p className="text-white font-bold text-xl flex items-center">
                LOGO <AiFillOpenAI className="ml-2 text-2xl" />
            </p>
            <div className="flex items-center space-x-4">
                <Profile status={status} />
                {/* <AiOutlineMenu className="text-white text-2xl hover:text-gray-300 transition-colors duration-200" /> */}
                <Menu />
            </div>
        </header>
    )
}

const Menu = () => {
    const { isTrue, toggle, setFalse } = useToToggleBoolean()

    const { status } = useSession()

    const actionMarkup = (
        isTrue ? (
            <AiOutlineMenuUnfold className="text-white text-2xl hover:text-gray-300 transition-colors duration-200" title='User' onClick={toggle} />
        ) : (
            <AiOutlineMenu className="text-white text-2xl hover:text-gray-300 transition-colors duration-200" title='Sign in' onClick={toggle} />
        )
    )

    const NavigationMenuOptionMarkup = (
        <Navigations />
    )

    const navigationsMenuOptionsMarkup = (
        <div className={`flex flex-col space-y-2 absolute top-6 right-0 bg-gray-800 p-0 ${status === "authenticated" ? "h-44" : "h-24"} w-44`}
            onClick={toggle}>
            {NavigationMenuOptionMarkup}
        </div>
    )

    const ref = React.useRef<HTMLDivElement>(null)

    useToDetectClickedOutside(ref as React.RefObject<HTMLDivElement>, setFalse)

    return (
        <div className="relative" ref={ref}>
            {actionMarkup}
            {isTrue && navigationsMenuOptionsMarkup}
        </div>
    )
}

const Profile = ({ status }: { status: string }) => {
    const { isTrue, toggle, setFalse } = useToToggleBoolean()

    const actionMarkup = (
        isTrue ? (
            <AiFillProfile className="text-white text-2xl hover:text-gray-300 transition-colors duration-200" title='User' onClick={toggle} />
        ) : (
            <AiOutlineProfile className="text-white text-2xl hover:text-gray-300 transition-colors duration-200" title='Sign in' onClick={toggle} />
        )
    )

    const profileMenuOptionMarkup = (
        status === "authenticated" ? (
            <BiLogOut className="text-white text-2xl hover:text-gray-300 transition-colors duration-200 absolute top-2 right-2" title='Logout'
                // onClick={toggle} 
                onClick={() => {
                    signOut()
                    toggle()
                }}
            />
        ) : (
            <BiLogIn className="text-white text-2xl hover:text-gray-300 transition-colors duration-200 absolute top-2 right-2" title='Log in'
                // onClick={toggle} 
                onClick={() => {
                    toggle()
                    signIn()
                }}
            />
        )
    )

    const profileMenuOptionsMarkup = (
        <div className='flex flex-col space-y-2 absolute top-6 right-0 bg-gray-800 p-2 h-11 w-11'>
            {profileMenuOptionMarkup}
        </div>
    )

    const ref2 = React.useRef<HTMLDivElement>(null)

    useToDetectClickedOutside(ref2 as React.RefObject<HTMLDivElement>, setFalse)

    return (
        <div className="relative" ref={ref2}>
            {actionMarkup}
            {isTrue && profileMenuOptionsMarkup}
        </div>
    )

    // return (
    //     status === "authenticated" ? (
    //         <AiFillProfile className="text-white text-2xl hover:text-gray-300 transition-colors duration-200" title='User' />
    //     ) : (
    //         <AiOutlineProfile className="text-white text-2xl hover:text-gray-300 transition-colors duration-200" title='Sign in' />
    //     )
    // )
}