import { RiSearchLine } from "./icons";

export default function SearchBar(){
    return(
        <div className='px-4 mt-2'>
          <button className='flex items-center border rounded-xl w-full'>
            <div className='flex items-center justify-center w-[48px] aspect-square'>
              <RiSearchLine className = 'w-6 h-6 text-slate-700' />
            </div>
            <div className='text-slate-700'>
              Recherche...
            </div>
          </button>
        </div>
    )
}