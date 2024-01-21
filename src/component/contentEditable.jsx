import { useEffect, useState } from "react"

export default function ContentEditable(){
    const [lenght, setLength] = useState(0)
    const handleChange= (e) => {
        const target = e.target
        const children = e.target.children
        console.dir(target.children)
        if(target.children.length === 0){
            target.innerHTML = `<p class='text-base' ><br/></p>`
        }

        setLength(children[0].innerText.length)
        
    }

    useEffect(() => {
        console.log(lenght)
    })
    return(
        <div className="px-6 relative">
            <div className="relative z-[2] outline-none" contentEditable = {true} onInput={handleChange} suppressContentEditableWarning={true}>
                <p className="text-base">
                    <br/>
                </p>
            </div>
            <span className={`absolute top-0 z-0 text-slate-400 transition-none duration-100 ${lenght < 2 ? "opacity-100" : "opacity-0"}`}> Ecrivez votre etude ici</span>
        </div>
    )
}