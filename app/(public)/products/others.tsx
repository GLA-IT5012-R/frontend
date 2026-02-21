import { HorizontalLine, VerticalLine } from "@/components/Line";
import { FaStar } from "react-icons/fa6";
import clsx from "clsx";

const VERTICAL_LINE_CLASSES =
    "absolute top-0 h-full stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";

const HORIZONTAL_LINE_CLASSES =
    "-mx-8 stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";
export function Title(data: any): React.ReactElement | null {

    return (<>
        <HorizontalLine className={HORIZONTAL_LINE_CLASSES} />
        <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "left-4")} />
        <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "right-4")} />
        <div className="flex items-center justify-between ~text-sm/2xl">
            <span>￡ {data.price} </span>
            <span>{String(data.asset.type).toUpperCase()}</span>
            <span className="inline-flex items-center gap-1">
                <FaStar className="text-yellow-400" /> {data.reviews}
            </span>
        </div>
        
    </>)
}