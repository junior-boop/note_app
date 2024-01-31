import { useEffect, useState } from 'react'
import { HeaderApp } from './component/header'
import NewNote from './component/nouvelleNote'
import SearchBar from './component/search_bar'
import Titre from './component/titre'

import { useAppDatabase } from './databse-store'
import { allKeys, getData } from './database'
import { NavLink } from 'react-router-dom/dist'
import { useGlobalContext } from './globalContext/context'



function App() {
  const [element, setElement] = useState([])
  const data = localStorage.getItem('note-app-user')
  const convert = JSON.parse(data)
  const { database, updatedDatabase } = useAppDatabase()

  const {DATABASE} = useGlobalContext()
  const {DB} = DATABASE

  useEffect(() => {
    console.log(DB)
  }, [])

  useEffect(() => {
    setElement(database)

  }, [database])

  return (
    <div className='w-full h-[100vh] overflow-y-auto overflow-x-hidden relative'>
      <HeaderApp image={convert.userinfo.photo} />
      <div className='h-[62px]'></div>
      <div>
        <SearchBar />
        <Titre titre={'autres Notres'} />
        <div className='min-h-[70vh] px-2'>
          {
            element.length === 0
            ? (<div></div>)
            :( <>
              <Column data = {element} />  
              <div className='h-[56px]'></div> 
            </> )
          }    
        </div>
        <NewNote />
      </div>
    </div>
  )
}

export default App


function NoteItems({dataNote}){
  const [note, setNote] = useState(null)

  useEffect(() => {
    return async () => {
      const data = await getData(dataNote)
      setNote(data)
    }
  }, [dataNote])

  const Blocks_reference = () => {
    if(note!== null && note.donnee.hasOwnProperty('blocks')){
      const t = note.donnee.blocks.filter((el) =>  el.type === "BibleVerse")
      console.log(t)
      if(t.length === 0){
        return null
      }
      if( t.length > 3){
        return t.slice(0, 2)
      } else return t
    } else return null
  }


  /**
   * @returns {Array}
   */
  const block_text = () => {
    console.log(note)
    if(note !== null && note.donnee.hasOwnProperty('blocks')){
      const t = note.donnee.blocks.filter((el) => el.type === 'paragraph')

       return t
    } else return []
  }
 

  return(
    <NavLink to={`/${dataNote}`}>
      <div className='w-full rounded-lg bg-slate-50 border p-4 max-h-[300px] flex flex-col' style={{ userSelect : 'none'}} >
      {
        note !== null && (<>
          {
            note.title.length > 0 
            ? <div className='font-bold text-base mb-3' style={{lineHeight :1}}>{note.title}</div>
            : null
          }
        </>)
      }
      <div className='flex-1 overflow-hidden relative'>
        {note!== null && block_text().map((el, key) =>  <div className='text-sm' key = {key} style={{lineHeight : 1.1}}>{el.data.text}</div>)}
        <div className='absolute bottom-0 h-[24px] w-full gradient'></div>
      </div>
      <div className='pt-2'>
        {Blocks_reference() !== null && Blocks_reference().map((el, key) => (<div className='px-2 py-1 rounded-sm text-slate-800 font-bold text-xs bg-slate-200 w-max' key={key}>el.data.reference</div>))}
      </div>
    </div>
    </NavLink>
  )
}



/**
 * 
 * @param {{data : Array}} param0 
 * @returns 
 */
function Column({data}){
  const liste_1 = data !== undefined && data.map((el, key) => {
    if(key % 2 === 0) return el
  })
  const liste_2 = data !== undefined && data.map((el, key) => {
    if(key % 2 === 1) return el
  })

  return(
    <div className='flex gap-2'>
      <div className='flex-1 flex flex-col gap-2'>
        {
          data !== undefined && liste_1.map((el, key) => el !== undefined ? (<NoteItems dataNote = {el} text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae magna non lectus lacinia condimentum. Cras imperdiet blandit tortor, et rhoncus odio convallis et. Quisque nisi nunc, placerat ut diam at, euismod pulvinar risus. Nullam dolor nunc, molestie in ornare quis, mattis feugiat nibh. Sed pulvinar augue nunc, sit amet aliquam lacus rutrum sed. Nam felis dui, vulputate quis semper ut, rutrum fermentum urna. In consequat justo non venenatis tempor. '} key = {key} />) : null)
        }
      </div>
      <div className='flex-1 flex flex-col gap-2'>
        {
          data !== undefined && liste_2.map((el, key) => el !== undefined ? (<NoteItems dataNote = {el} text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae magna non lectus lacinia condimentum. Cras imperdiet blandit tortor, et rhoncus odio convallis et. Quisque nisi nunc, placerat ut diam at, euismod pulvinar risus. Nullam dolor nunc, molestie in ornare quis, mattis feugiat nibh. Sed pulvinar augue nunc, sit amet aliquam lacus rutrum sed. Nam felis dui, vulputate quis semper ut, rutrum fermentum urna. In consequat justo non venenatis tempor. '} key = {key} />) : null)
        }
      </div>
    </div>
  )
}