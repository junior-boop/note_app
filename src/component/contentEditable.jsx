import { useEffect, useRef, useState } from "react"
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import Delimiter from '@editorjs/delimiter'
import BibleVerse from '../../bible/bible-verse.mjs'
import InlineBibleRef from '../component/tools/inlineBibleref'
// import { BxsBible, RiBold, RiHeading, RiItalic, RiListUnordered, RiUnderline } from "./icons"

const data= {
  blocks: [
    {
      type: 'BibleVerse',
      data: {
        reference : "Daniel 1: 12",
        content : [
              {
                  "n": 12,
                  "v": "Éprouve tes serviteurs pendant dix jours, et qu'on nous donne des légumes à manger et de l'eau à boire;"
              }
          ]
      },
    }
  ],
}

export default function ContentEditable({datablock, onChangeValue}){
        const editable = useRef()

        const initalization = () => {
          const editor = new EditorJS({
            holder: "editorjs",
            autofocus : false,
            placeholder : "Commencez votre étude biblique",
            onReady : () => {
              editable.current = editor
            },
            onChange: () => {
              editor.save().then( result => {
                onChangeValue(result)
              })

            },
            tools: {
                BibleVerse : {
                  class : BibleVerse
                },
                heading: {
                  class: Header,
                  config: {
                    placeholder: 'Enter a header',
                    levels: [2, 3],
                    defaultLevel: 2,
                  }
                },
                delimiter: Delimiter,
                inlineCode: InlineBibleRef,
            },

            data : datablock
          });
        }


        useEffect(() => {
          if(datablock.hasOwnProperty('blocks')){
            if(editable.current === null){
              initalization()
            }
          } else {
            console.log(false)
          }
          
          return () => {
            // editable.current.destroy()
            editable.current = null
          }
        }, [datablock])
    
    
    // .... other components
    return (
        <div className="px-4">
            <div id='editorjs'></div>
        </div>
    )
}
