import { useEffect, useState } from "react"


export default function ContentEditable(){
    const [lenght, setLength] = useState(0)
    const handleChange= (e) => {
        const target = e.target
        const children = e.target.children
        if(target.children.length === 0){
            target.innerHTML = `<p class='text-base mb-3' ><br/></p>`
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

    useEffect(() => {
        console.log(lenght)
    })
    return(
        <div className="px-6 relative">
            <div className="relative z-[2] outline-none" contentEditable = {true} onInput={handleChange} suppressContentEditableWarning={true}>
                <p className="text-base mb-3">
                    <br/>
                </p>
            </div>
            <span className={`absolute top-0 z-0 text-slate-400 transition-none duration-100 ${lenght < 2 ? "opacity-100" : "opacity-0"}`}> Ecrivez votre etude ici</span>
        </div>
    )
}


function CheckFirstValue(element) {
    const tag = element.innerText[0]
    switch (tag) {
        case '#':
            
            element.setAttribute('class', 'text-xl my-2 font-semibold')
            element.innerText.substring(1)
            window.addEventListener('keydown', key => {
                if(key.key === 'Enter') {
                element.setAttribute('class', 'text-base mb-3')
                }
            })
            break;
    
        default:
            break;
    }
}