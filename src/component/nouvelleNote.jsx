import { useAppStore } from "../store";
import { RiAddFill } from "./icons";
import { useNavigate } from 'react-router-dom'

import IdGenerator from '../globalContext/id_generator'

export default function NewNote(){
    const {userInfo} = useAppStore()
    const navigate = useNavigate()



    const handleClick = () => {
        const {userinfo} = userInfo
        const email = userinfo.email

        const idNote = email + '-' + Date.now()
        console.log(idNote)

        navigate(`/${idNote}`)
    }

    return(
        <div>
          <button onClick={handleClick} className='w-[58px] h-[58px] aspect-square rounded-full fixed bottom-6 right-6 bg-[#3ec2ff] flex items-center justify-center'>
            <RiAddFill className ="w-10 h-10 text-[#15323f]" />
          </button>
        </div>
    )
}