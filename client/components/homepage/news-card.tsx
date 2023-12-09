'use client'

import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Course } from "@/actions/get-course";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NewCards ({
    title,
    data,
    href
}:{
    title: string;
    data?: Course[];
    href?: string;
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const pathname = usePathname();

    const toggleExpansion = () => {
        {(data !== undefined && data?.length !== 0)  && (
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
                        { !isExpanded && (data?.length !==0 && data!== undefined) ? (
                            <div className="w-full h-full flex items-center">
                                <div className="flex flex-col gap-y-3 w-full px-5">
                                    {data?.slice(0, 2).map((course) => (
                                        <div key={course.CourseID} className="border-b-2 py-3">
                                            <Link href={pathname+ (`/${course.CourseID}`)} className="py-4">
                                                <p>{course.CourseName}</p>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                                <div className="w-full h-full flex items-center">
                                    {data === undefined || data.length === 0 ? (
                                    <p className="italic text-zinc-500 justify-center flex w-full">No data.</p>
                                ) : (
                                    <div className="flex flex-col gap-y-3 w-full px-5">
                                        {data.map((course) => (
                                            <div key={course.CourseID} className="border-b-2 py-3">
                                                <Link href={pathname+ (`/${course.CourseID}`)}>
                                                    <p>{course.CourseName}</p>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            )}  
                    </div>
                </div>
        </div>
    );
}
