import { SvgSpinners90RingWithBg } from "../component/icons";

export default function Loading(){
    return(
        <div className="w-full h-[100vh] bg-[#fff7] flex items-center justify-center">
            <div className="flex items-center justify-center flex-col gap-4">
                <SvgSpinners90RingWithBg className = 'w-8 h-8 text-blue-400' />
                <div className="text-center">
                    Chargement...
                </div>
            </div>
        </div>
    )
}