"use client"

import { useParams } from "next/navigation";
import { Title } from "@/components/ui/title";
import AssignmentCard from "@/components/homepage/assignment/As-info-card";
import { Announcement, getAnnouncements } from "@/actions/announcement-actions";
import { useEffect, useState } from "react";

const C_AnnouncementPage = () => {
    const params = useParams();
    const [announcements, setAnnouncements] = useState<Announcement[]>();

    const getannouncements = async(id: string) => {
        const result = await getAnnouncements(id);
        setAnnouncements(result);
        return null;
    }
    useEffect(() => {
        getannouncements(params.UserID as string);
    },[params.UserID])

    const counter = (announcements !== undefined && announcements !== null) ? announcements?.length : 0;

    return (
        <div className="w-full h-full flex flex-col px-2 md:px-16">
            <div className="w-full flex flex-row justify-between items-center py-8 px-4">
                <Title classname="pl-6">My Announcements ({counter})</Title>
            </div>
            <div className="flex flex-col gap-y-5 px-3">
               <AssignmentCard />
            </div>
        </div>
    );
}
 
export default C_AnnouncementPage;