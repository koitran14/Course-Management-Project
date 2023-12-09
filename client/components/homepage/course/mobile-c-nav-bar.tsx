"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";


const MobileNavForCourse = () => {
    const params = useParams();

    const Navigator = [
        {
            title: "Home",
            href: `/${params.UserID}/${params.CourseID}`
        },
        {
            title: "Announcement",
            href: `/${params.UserID}/${params.CourseID}/announcements`
        },
        {
            title: "Content",
            href: `/${params.UserID}/${params.CourseID}/contents`
        },
        {
            title: "Assignment",
            href: `/${params.UserID}/${params.CourseID}/assignments`
        }
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"icon"} className="text-md font-bold text-blue-700 bg-white hover:text-white hover:bg-indigo-700">
                        <AlignJustify size={20} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[180px] bg-white/90 border rounded-lg px-3 py-5 flex flex-col gap-y-3" >
                {Navigator.map((nav) => (
                    <div key={nav.title}>
                        <DropdownMenuItem className="outline-none py-2">
                            <Link href={nav.href}>
                                {nav.title}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="border-b-2"/>
                    </div>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
 
export default MobileNavForCourse;