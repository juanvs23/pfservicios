import { useState } from "react"
import { Zustand } from '../../../libs'

const useFormInput = (props) => {
    
    const { userData } = Zustand.useStore()
    const [activeInput, setActiveInput] = useState(false)
    const [inputValue, setInputValue] = useState(userData[props.id])

    return {
        activeInput,
        setActiveInput,
        inputValue,
        setInputValue
    }
}

export default useFormInput