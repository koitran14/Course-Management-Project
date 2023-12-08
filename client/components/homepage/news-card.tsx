'use client'

import { ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { CoursesByStudentID } from "@/actions/get-courses";
import Link from "next/link";

export function NewCards ({
    title,
    data
}:{
    title: string;
    data?: CoursesByStudentID[] | undefined;
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpansion = () => {
        {(data !== undefined && data.length !== 0)  && (
            setIsExpanded(!isExpanded)
        )}
    }

    const counter = data !== undefined ? data.length : 0;

    return (  
        <div className="h-full w-full relative">
                <div className='h-20 w-full bg-blue-900 rounded-xl absolute -top-14 -z-10 border-2 border-blue-950 shadow-md shadow-zinc-400
                    flex items-center px-5 pb-5 text-white/90 font-semibold'>
                    <div>
                        {title +  (` (${counter})`)} 
                    </div>
                </div>
                <Button size={'icon'} onClick={toggleExpansion} className="bg-transparent hover:bg-transparent hover:scale-110 transition-all duration-300 ease-in-out absolute z-20 -top-11 right-5 ">
                    <ChevronUp  className={`text-white hover:text-slate-200 h-8 w-8 transition-all ease-in-out duration-300 ${isExpanded ? 'rotate-180' : ''}`}/>
                </Button>
                <div className="h-fit w-full bg-white rounded-xl border-2 border-blue-950 shadow-md shadow-zinc-400">
                    <div className="h-full w-full py-6 px-3 flex items-center justify-center transition-all ease-in-out duration-300">
                        { !isExpanded && (data?.length !==0 && data!== undefined) ? (
                            <div className="w-full h-full flex items-center">
                                <div className="flex flex-col gap-y-3 w-full px-5">
                                    {data.slice(0, 2).map((course, index) => (
                                        <div key={course.CourseID} className="border-b-2 py-3">
                                            <Link href="/">
                                                <p>{course.CourseName}</p>
                                            </Link>
                                            {/* Additional course information can be displayed here */}
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
                                                <Link href='/'>
                                                    <p>{course.CourseName}</p>
                                                </Link>
                                                {/* Additional course information can be displayed here */}
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
