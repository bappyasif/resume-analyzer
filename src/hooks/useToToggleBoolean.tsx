import { useState } from "react"

export const useToToggleBoolean = () => {
    const [isTrue, setIsTrue] = useState(false)

    const toggle = () => {
        setIsTrue(!isTrue)
    }

    const  setTrue = () => {
        setIsTrue(true)
    }

    const setFalse = () => {
        setIsTrue(false)
    }


    return { isTrue, toggle, setTrue, setFalse }
}