"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import  useAuth  from '@/hooks/useAuth'

const NavigatorForMain = [
    {
        title: 'Profile',
        path: 'profile'
    },
    {
        title: 'Edit',
        path: 'edit'
    }
]

const UserDropDown = () => {
    const { setAuth } = useAuth();
    const params = useParams();
    
    const signOut = () => {
        setAuth({})
    }

    return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size={"icon"} className="bg-white text-indigo-800 border-2 border-indigo-800 hover:bg-indigo-800 hover:text-white transition duration-300 ease-in-out">
                        <User />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[180px] bg-white/90 border rounded-lg px-3 py-5 flex flex-col gap-y-3">
                    {NavigatorForMain.map((nav) => (
                        <div key={nav.title}>
                            <DropdownMenuItem className="py-2 outline-none">
                                <Link href={`/${params.UserID}/${nav.path}`}>
                                    {nav.title}
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="border-b-2"/>
                        </div>
                    ))}

                    <DropdownMenuItem className=" outline-none pt-2 cursor-pointer" onClick={signOut}>
                            Log out
                     </DropdownMenuItem>
                     <DropdownMenuSeparator className="border-b-2"/>
                </DropdownMenuContent>
            </DropdownMenu>
    );
}
 
export default UserDropDown;