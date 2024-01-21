import { useEffect, useState } from 'react'
import { HeaderApp } from './component/header'
import NewNote from './component/nouvelleNote'
import { RiSearchLine } from './component/icons'
import SearchBar from './component/search_bar'
import Titre from './component/titre'

import { useAppDatabase } from './databse-store'
import { allKeys, getData } from './database'



function App() {
  const [element, setElement] = useState([])
  const data = localStorage.getItem('note-app-user')
  const convert = JSON.parse(data)
  const { database, updatedDatabase } = useAppDatabase()




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


function NoteItems({text}){
  const { database, updatedDatabase } = useAppDatabase()

  // console.log(database)
  return(
    <div className='w-full rounded-xl bg-slate-50 p-4 max-h-[300px] flex flex-col'>
      <div className='font-bold text-base mb-3' style={{lineHeight :1}}>titre cviel cksnlkn</div>
      <div className='text-sm flex-1 overflow-hidden relative' style={{lineHeight : 1.1}}>
        {text}
        <div className='absolute bottom-0 h-[24px] w-full gradient'></div>
      </div>
      <div className='pt-2'>
        <div className='px-2 py-1 rounded-md text-black font-bold text-xs bg-slate-300 w-max'>Matt 23:12-3</div>
      </div>
    </div>
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
          data !== undefined && liste_1.map((el, key) => el !== undefined ? (<NoteItems text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae magna non lectus lacinia condimentum. Cras imperdiet blandit tortor, et rhoncus odio convallis et. Quisque nisi nunc, placerat ut diam at, euismod pulvinar risus. Nullam dolor nunc, molestie in ornare quis, mattis feugiat nibh. Sed pulvinar augue nunc, sit amet aliquam lacus rutrum sed. Nam felis dui, vulputate quis semper ut, rutrum fermentum urna. In consequat justo non venenatis tempor. '} key = {key} />) : null)
        }
      </div>
      <div className='flex-1 flex flex-col gap-2'>
        {
          data !== undefined && liste_2.map((el, key) => el !== undefined ? (<NoteItems text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae magna non lectus lacinia condimentum. Cras imperdiet blandit tortor, et rhoncus odio convallis et. Quisque nisi nunc, placerat ut diam at, euismod pulvinar risus. Nullam dolor nunc, molestie in ornare quis, mattis feugiat nibh. Sed pulvinar augue nunc, sit amet aliquam lacus rutrum sed. Nam felis dui, vulputate quis semper ut, rutrum fermentum urna. In consequat justo non venenatis tempor. '} key = {key} />) : null)
        }
      </div>
    </div>
  )
}