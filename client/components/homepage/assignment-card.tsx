'use client'

import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Assignment} from "@/actions/assignment-actions";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AssignmentCards ({
    title,
    data,
    href
}:{
    title: string;
    data?: Assignment[];
    href?: string;
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const pathname = usePathname();

    const toggleExpansion = () => {
        {(data !== undefined && data !== null && data.length > 2)  && (
            setIsExpanded(!isExpanded)
        )}
    }

    const counter = (data !== undefined && data !== null) ? data?.length : 0;
    return (  
        <div className="h-full w-full relative py-14">
                <div className='h-20 w-full bg-blue-900 rounded-xl absolute top-0 -z-10 border-2 border-blue-950 shadow-md shadow-zinc-400
                    text-white/90 font-semibold'></div>
                <div className="w-full absolute top-2 left-0 flex items-center justify-between px-6">
                    <Link href={href ? href: ''} className="text-md font-semibold text-white hover:text-blue-100">
                        <p>{title + ` (${counter})`}</p>
                    </Link>
                    <Button size={'icon'} onClick={toggleExpansion} className="bg-transparent hover:bg-transparent hover:scale-110 transition-all duration-300 ease-in-out ">
                        <ChevronDown  className={`text-white hover:text-slate-200 h-8 w-8 transition-all ease-in-out duration-300 ${isExpanded ? 'rotate-180' : ''}`}/>
                    </Button>
                </div>
                
                <div className="h-fit w-full bg-white rounded-xl border-2 border-blue-950 shadow-md shadow-zinc-400">
                    <div className="h-full w-full py-6 px-3 flex items-center justify-center transition-all ease-in-out duration-300">
                        { !isExpanded && (data !== null && data!== undefined) ? (
                            <div className="w-full h-full flex items-center">
                                <div className="flex flex-col gap-y-3 w-full px-5">
                                    {data?.slice(0, 2).map((assignment) => (
                                        <div key={assignment.A_ID} className="border-b-2 py-3">
                                            <Link href={pathname+ (`/${assignment.A_ID}`)} className="py-4">
                                                <p>{assignment.A_Title}</p>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                                <div className="w-full h-full flex items-center">
                                    {data === null || data === undefined ? (
                                    <p className="italic text-zinc-500 justify-center flex w-full">No data.</p>
                                ) : (
                                    <div className="flex flex-col gap-y-3 w-full px-5">
                                        {data.map((assignment) => (
                                            <div key={assignment.A_ID} className="border-b-2 py-3">
                                                <Link href={pathname+ (`/${assignment.A_ID}`)}>
                                                    <p>{assignment.A_Title}</p>
                                                </Link>
                                            </div>
                                        ))}
                                        {data.length > 6 && (
                                            <Link href={href ? href: ''}>
                                                <p className="pt-2  w-full flex items-center justify-end text-slate-400">More...</p>
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                            )}  
                    </div>
                </div>
        </div>
    );
}
