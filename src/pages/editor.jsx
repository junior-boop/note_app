import { PageHeader } from "../component/header";
import { useParams } from 'react-router-dom'
import TextArea from "../component/textarea";
import { setData, getData } from "../database";
import { useEffect, useState } from "react";
import { useAppDatabase } from "../databse-store";
import ContentEditable from "../component/contentEditable";
import { useGlobalContext } from "../globalContext/context";


const createdAt = {
    date : new Date().toLocaleDateString(),
    time : Date.now()
}


export async function loader({params}) {
   
}

export default function Editor(){
    const [pin, setPin] = useState(false)
    const [title, setTitle] = useState('')
    const {id}=  useParams()
    const [dataNote, setDataNote] = useState({})
    const [initialeData, setInitialData] = useState({})
    const {DATABASE} = useGlobalContext()

    const { database, updatedDatabase } = useAppDatabase()

    const handlePin = (boolean) => {
        setPin(boolean)
    }

    const {DB} = DATABASE


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
        setData(id, {...dataNote, title})
    }

    const handleEditorContent = (value) => {
        const note_metadata = {
            id, 
            pin : pin,
            title : title,
            createAt : createdAt, 
            updatedAt : Date.now(),
            donnee : value
        }
        setData(id, note_metadata)
        console.log(note_metadata)
    }

    useEffect(() => {
        const check = database.filter((el) => el === id)
        if(check.length === 0){
            updatedDatabase([...database, id])
        } else {
            console.log(DB);
            (async() => {
                const getDatafromDatabase = await getData(id)
                console.log(getDatafromDatabase.donnee)
                setInitialData(getDatafromDatabase.donnee)
                setTitle(getDatafromDatabase.title)
                setDataNote(getDatafromDatabase)
                
                // setData(id, {id, pin, title, createdAt, updatedAt : Date.now(), donnee : getDatafromDatabase})
            })()

        }
    }, [])

    // useEffect(() => {
    //     setData(id, Value)
    // }, [dataNote])
    return(
        <div className="w-full h-[100dvh] flex flex-col">
            <PageHeader pinBtn={handlePin} />
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                <TextArea onChange={handleChange} value={title} />
                <ContentEditable onChangeValue={handleEditorContent} datablock={initialeData}/>
            </div>
        </div>
    )
}