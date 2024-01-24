import { PageHeader } from "../component/header";
import { useParams } from 'react-router-dom'
import TextArea from "../component/textarea";
import { setData } from "../database";
import { useEffect, useState } from "react";
import { useAppDatabase } from "../databse-store";
import ContentEditable from "../component/contentEditable";


const createdAt = {
    date : new Date().toLocaleDateString(),
    time : Date.now()
}


export async function loader({params}) {
    return params.noteId
}

export default function Editor(){
    const [pin, setPin] = useState(false)
    const [title, setTitle] = useState('')
    const {id }=  useParams()
    const [dataNote, setData] = useState({})

    const { database, updatedDatabase } = useAppDatabase()

    const handlePin = (boolean) => {
        setPin(boolean)
    }

    const Value = {
        id, 
        pin : pin,
        title : title,
        createAt : createdAt, 
        updatedAt : Date.now(),
        donnee : dataNote
    }

    

    const handleChange = ({target}) => {
        setTitle(target.value)
    }

    useEffect(() => {
        updatedDatabase([...database, id])
    }, [])

    useEffect(() => {
        setData(id, Value)
    }, [dataNote])
    return(
        <div className="w-full h-[100dvh] flex flex-col">
            <PageHeader pinBtn={handlePin} />
            <div className="flex-1">
                <TextArea onChange={handleChange} />
                <ContentEditable onChangeValue={(data) => setData(data)}/>
            </div>
        </div>
    )
}