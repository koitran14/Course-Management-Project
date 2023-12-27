"use client"

import { useParams } from "next/navigation";
import { Title } from "@/components/ui/title";
import { Announcement, formatDate, getAnnouncements } from "@/actions/announcement-actions";
import { useEffect, useState } from "react";
import  InfoCard  from "@/components/homepage/assignment/As-info-card";

const AnnouncementPage = () => {
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
        <div className="w-full h-full flex flex-col px-2 md:px-16 overflow-y-scroll pb-8">
            <div className="w-full flex flex-row justify-between items-center py-8 px-4">
                <Title classname="pl-6">My Announcements ({counter})</Title>
            </div>
            <div className="flex flex-col gap-y-5 px-3">
                {announcements && announcements.map((data) => (
                    <div key={data.AnID} >
                        <InfoCard title={data.AnTitle} description={data.AnDesc} time={formatDate(data.AnDate)} href={`/${params.UserID}/${data.CourseID}/announcements/${data.AnID}`} deleteApi={`${process.env.NEXT_PUBLIC_API_URL}/announcement/${data.AnID}`}/>
                    </div>
                ))}
                {!announcements && (
                    <p className="w-full py-4 text-slate-400 italic flex items-center justify-center">No data.</p>
                )}
            </div>
        </div>
    );
}
 
export default AnnouncementPage;