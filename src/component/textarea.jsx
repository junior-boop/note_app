import TextareaAutosize from 'react-textarea-autosize'
export default function TextArea({onChange}){

    return(
        <div className="text-xl font-medium px-6 py-2">
            <TextareaAutosize 
                style={{ width : "100%", outline : "none"}}
                autoFocus = {false}
                placeholder='Votre titre'
                onChange={onChange}
            />
        </div>
    )
}