"use client"

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import MainNav from "../navbar/main-nav";
import { useParams } from "next/navigation";
  
const CourseNav = ({
    currentCourse
}: {
    currentCourse?: string;
}) => {
    const params = useParams();
    console.log(params);

    return (
        <div className="flex items-center md:px-8 px-5 justify-between w-full h-full bg-zinc-300/90">
            <div className="text-sm text-zinc-600 flex flex-row gap-x-2 items-center">
                <Link href={`/${params.UserID}`} className="hover:text-blue-600 hover:scale-105 transition-all duration-300 ease-in-out">
                    <Home />
                </Link>
                <ChevronRight className="h-8 w-8"/>
                <Link href={`/${params.UserID}/${params.CourseID}`}  className="font-semibold text-[17px] text-indigo-800 line-clamp-1 w-full max-w-[350px] h-full">
                    {currentCourse ? currentCourse : ''}
                </Link>
            </div>
            <MainNav />
        </div>
    );
}
 
export default CourseNav;