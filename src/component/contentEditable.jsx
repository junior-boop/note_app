import { useEffect, useState } from "react"
import { RiBold, RiHeading, RiItalic, RiListUnordered, RiUnderline } from "./icons"


export default function ContentEditable(){
    const [lenght, setLength] = useState(0)
    const handleChange= (e) => {
        const target = e.target
        const children = e.target.children
        if(target.children.length === 0){
            target.innerHTML = `<p class='text-base mb-2'><br/></p>`
        }

        window.addEventListener('keydown', key => {
            if(key.key === 'Enter') {
                console.log("enter")
            }
        })
        setLength(children[0].innerText.length)

        for(let i = 0; i <= children.length; i++){
            if(children[i] !== undefined){
                CheckFirstValue(children[i])
            }
        }
        
    }

    return(
        <div className="px-6 relative">
            <div className="relative z-[2] outline-none" contentEditable = {true} onInput={handleChange} suppressContentEditableWarning={true}>
                <p className="text-base mb-2">
                    <br/>
                </p>
            </div>
            <span className={`absolute top-0 z-0 text-slate-400 transition-none duration-100 ${lenght <= 1 ? "opacity-100" : "opacity-0"}`}> Ecrivez votre etude ici</span>

            <div className="flex gap-2 h-[56px] w-full fixed bottom-0 bg-white border-t left-0 px-2 items-center">
                <button className="w-11 h-11 rounded-full flex items-center justify-center">
                    <RiHeading className = 'w-6 h-6' />
                </button>
                <button className="w-11 h-11 rounded-full flex items-center justify-center">
                    <RiBold className = "w-6 h-6" />
                </button>
                <button className="w-11 h-11 rounded-full flex items-center justify-center">
                    <RiItalic className = "w-6 h-6" />
                </button>
                <button className="w-11 h-11 rounded-full flex items-center justify-center">
                    <RiListUnordered className = 'w-6 h-6' />
                </button>
                <button className="w-11 h-11 rounded-full flex items-center justify-center">
                    <RiUnderline className = 'w-6 h-6' />
                </button>
                <button className="w-max px-3 h-10 rounded-md bg-slate-200 flex items-center justify-center font-semibold">
                    Verset
                </button>
            </div>
        </div>
    )
}


function CheckFirstValue(element) {
    const tag = element.innerText[0]
    switch (tag) {
        case '#':
            const p = document.createElement('p')
            p.setAttribute('class', 'un-slach')
            element.replaceWith(p)
            window.addEventListener('keydown', key => {
                if(key.key === 'Enter') {
                    console.log('ville')
                    const Pswitch = document.createElement('p')
                    Pswitch.setAttribute('class', 'text-base mb-3')
                    element.replaceWith(Pswitch)
                }
            })
            break;
    
        default:
            break;
    }
}
