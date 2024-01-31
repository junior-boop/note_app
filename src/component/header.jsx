import { useEffect, useState } from "react";
import { RiArrowLeftLine, RiDeleteBin6Line, RiMore2Fill, RiPushpin2Fill, RiPushpin2Line, RiSaveFill, RiSaveLine, RiShareForwardBoxFill, RiUser6Fill } from "./icons";
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
    const [openMenu, setOpenmenu] = useState(false)

    const handlePin = () => {
        setPin(!pin)
    }

    const handleToggleMenu = () => {
        setOpenmenu(!openMenu)
    }

    useEffect(() => {
        pinBtn(pin)
    }, [pin])
    return(
        <div className="h-[62px] w-full pl-4 pr-2 flex items-center justify-between relative">
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
                    <RiSaveLine className = "w-6 h-6" />
                </button>
                <button onClick={() => setOpenmenu(!openMenu)}  className={`h-[42px] w-[42px] flex items-center justify-center ${openMenu ? "rounded-full bg-blue-50" : ''}`}>
                    {
                        openMenu 
                        ? <RiMore2Fill className = "w-6 h-6 text-blue-700 " />
                        : <RiMore2Fill className = "w-6 h-6" />
                    }
                </button>
            </div>
            <div className={`absolute bg-white w-[250px] right-[10px] border top-[56px] z-[4] p-2 shadow-md shadow-[#0001] ${openMenu ? "" : "hidden"}`}>
                <button className={`h-[48px] flex items-center justify-center pl-2 rounded-sm gap-2`}>
                    <div>
                        <RiShareForwardBoxFill  className = "w-6 h-6" />
                    </div>
                    <div>
                        Partager
                    </div>
                </button>
                <button className={`h-[48px] flex items-center justify-center pl-2 rounded-sm gap-2`}>
                    <div>
                        <RiDeleteBin6Line  className = "w-6 h-6" />
                    </div>
                    <div>
                        Supprimer
                    </div>
                </button>
            </div>
        </div>
    )
}