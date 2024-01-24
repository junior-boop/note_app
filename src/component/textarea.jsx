import TextareaAutosize from 'react-textarea-autosize'
export default function TextArea({onChange}){

    return(
        <div className="text-2xl font-semibold px-4 py-2">
            <TextareaAutosize 
                style={{ width : "100%", outline : "none", lineHeight : 1.1}}
                autoFocus = {false}
                placeholder='Votre titre'
                onChange={onChange}
            />
        </div>
    )
}