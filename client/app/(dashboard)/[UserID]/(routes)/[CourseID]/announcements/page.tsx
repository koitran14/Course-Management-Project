/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import useAuth from "@/hooks/useAuth";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Title } from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import  InfoCard  from "@/components/homepage/assignment/As-info-card";
import { AnnouncementWithAttachments, formatDate, getAnnouncementsByCourse } from "@/actions/announcement-actions";
import { useEffect, useState } from "react";
import { getAttachmentsByAnID } from "@/actions/attachment-actions";

const C_AnnouncementPage = () => {
    const params = useParams();
    const { auth } = useAuth();
    const router = useRouter();
    const pathname  = usePathname();
    const [announcements, setAnnouncements] = useState<AnnouncementWithAttachments[]>([]);

    const getAnnouncementsAndAttachments = async (id: string) => {
        setAnnouncements([]);
        const result = await getAnnouncementsByCourse(id);

        if (result) {
            const attachmentsPromises = result.map(async (announcement) => {
                const attachments = await getAttachmentsByAnID(announcement.AnID);
                return { ...announcement, Attachments: attachments };
            });
            const announcementsWithAttachments = await Promise.all(attachmentsPromises);
            setAnnouncements(announcementsWithAttachments);
        }
    };
    useEffect(() => {
        getAnnouncementsAndAttachments(params.CourseID as string);
    },[params.CourseID])

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
                {announcements && announcements.map((data) => (
                    <div key={data.AnID} >
                        <InfoCard title={data.AnTitle} description={data.AnDesc} time={formatDate(data.AnDate)} href={`/${params.UserID}/${data.CourseID}/announcements/${data.AnID}`} attachments={data.Attachments} deleteApi={`${process.env.NEXT_PUBLIC_API_URL}/announcement/${data.AnID}`}/>
                    </div>
                ))}
                {!announcements && (
                    <p className="w-full py-4 text-slate-400 italic flex items-center justify-center">No data.</p>
                )}
            </div>
        </div>
    );
}
 
export default C_AnnouncementPage;