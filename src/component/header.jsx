import { useEffect, useState } from "react";
import { RiArrowLeftLine, RiDeleteBin6Line, RiPushpin2Fill, RiPushpin2Line, RiShareForwardBoxFill, RiUser6Fill } from "./icons";
import { useNavigate } from 'react-router-dom'

export function HeaderApp ({image, user}){
    return(
        <div className="h-[62px] w-full flex px-4 items-center justify-between fixed top-0 left-0 bg-white z-50">
            <div className="indie text-3xl">
                Note
            </div>
            <button className="flex items-center justify-center overflow-hidden rounded-full w-[38px] aspect-square">
                {
                    image.length === 0
                    ? <RiUser6Fill />
                    : <img src={image} alt="" className="w-full h-full object-cover " />
                }
            </button>
        </div>
    )
}


export function PageHeader({pinBtn}){
    const navigate = useNavigate()
    const  [pin, setPin] = useState(false)

    const handlePin = () => {
        setPin(!pin)
    }

    useEffect(() => {
        pinBtn(pin)
    }, [pin])
    return(
        <div className="h-[62px] w-full px-4 flex items-center justify-between">
            <button onClick={() => navigate('/')} className="h-[42px] flex items-center">
                <RiArrowLeftLine className = 'w-7 h-7' />
            </button>
            <div className="flex items-center gap-2">
                <button onClick={handlePin}  className={`h-[42px] w-[42px] flex items-center justify-center ${pin ? "rounded-full bg-blue-50" : ''}`}>
                    {
                        pin 
                        ? <RiPushpin2Fill className = "w-6 h-6 text-blue-700 " />
                        : <RiPushpin2Line className = "w-6 h-6" />
                    }
                </button>
                <button  className="h-[42px] w-[42px] flex items-center justify-center">
                    <RiDeleteBin6Line className = "w-6 h-6" />
                </button>
                <button  className="h-[42px] flex items-center justify-center pl-2 rounded-sm">
                    <RiShareForwardBoxFill className = "w-6 h-6" />
                </button>
            </div>
        </div>
    )
}