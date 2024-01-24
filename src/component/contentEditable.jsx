import { useEffect, useRef, useState } from "react"
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import Delimiter from '@editorjs/delimiter'
import BibleVerse from '../../bible/bible-verse.mjs'
import InlineBibleRef from '../component/tools/inlineBibleref'
// import { BxsBible, RiBold, RiHeading, RiItalic, RiListUnordered, RiUnderline } from "./icons"


export default function ContentEditable({data, onChangeValue}){
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
            data : {data},
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
            }
          });
        }


        useEffect(() => {
          if(editable.current === null){
            initalization()
          }
          
          return () => {
            // editable.current.destroy()
            editable.current = null
          }
        }, [])
    
    
    // .... other components
    return (
        <div className="px-4">
            <div id='editorjs'></div>
        </div>
    )
}
