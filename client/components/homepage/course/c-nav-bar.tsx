"use client"

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import MainNav from "../navbar/main-nav";

const CourseNav = () => {
    const params = useParams();

    return (
        <div className="flex items-center md:px-8 px-5 justify-between w-full h-full bg-zinc-300/90">
            <div className="text-sm text-zinc-600 flex flex-row gap-x-1 items-center">
                <Link href={`/${params.UserID}`} className="hover:text-blue-600 hover:scale-105 transition-all duration-300 ease-in-out">
                    <Home />
                </Link>
                <ChevronRight />
                <h1 className="font-semibold text-md text-blue-800"> 
                    Principle of Database Management
                </h1>
            </div>
            <MainNav />
        </div>
    );
}
 
export default CourseNav;