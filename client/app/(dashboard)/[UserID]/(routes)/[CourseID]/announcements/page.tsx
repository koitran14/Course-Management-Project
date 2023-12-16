"use client"

import useAuth from "@/hooks/useAuth";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Title } from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AssignmentCard from "@/components/homepage/assignment/As-info-card";
import { getAnnouncements } from "@/actions/announcement-actions";

const C_AnnouncementPage = () => {
    const params = useParams();
    const { auth } = useAuth();
    const router = useRouter();
    const pathname  = usePathname();

    const announcements = async(id: string) => {
        return await getAnnouncements(params.CourseID as String);
    }
    
    const counter = (announcements !== undefined && announcements !== null) ? announcements?.length : 0;

    return (
        <div className="w-full h-full flex flex-col px-2 md:px-16">
            <div className="w-full flex flex-row justify-between items-center py-8 px-4">
                <Title classname="pl-6">Announcements ({counter})</Title>
                {auth.roleName === 'Teacher' 
                && ( 
                    <Button className="bg-white hover:bg-indigo-800 text-indigo-800 hover:text-white flex flex-row gap-x-2 border-2 border-indigo-800 rounded-xl hover:shadow-md hover:shadow-zinc-400"
                        onClick={() => router.push(`${pathname}/create`)}
                    >
                        <PlusCircle className="h-6 w-6" />
                        Create
                    </Button>
                )}
            </div>
            <div className="flex flex-col gap-y-5 px-3">
               <AssignmentCard />
            </div>
        </div>
    );
}
 
export default C_AnnouncementPage;