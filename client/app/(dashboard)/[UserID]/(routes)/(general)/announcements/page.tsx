/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useParams } from "next/navigation";
import { Title } from "@/components/ui/title";

import  InfoCard  from "@/components/homepage/assignment/As-info-card";
import { AnnouncementWithAttachments, formatDate, getAnnouncementByUserID } from "@/actions/announcement-actions";
import { useEffect, useState } from "react";
import { getAttachmentsByAnID } from "@/actions/attachment-actions";

const GeneralAnnouncementPage = () => {
    const params = useParams();
    const [announcements, setAnnouncements] = useState<AnnouncementWithAttachments[]>([]);

    const getAnnouncementsAndAttachments = async (id: string) => {
        setAnnouncements([]);
        const result = await getAnnouncementByUserID(id);

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
        getAnnouncementsAndAttachments(params.UserID as string);
    },[params.UserID])

    const counter = (announcements !== undefined && announcements !== null) ? announcements?.length : 0;

    return (
        <div className="w-full h-full flex flex-col px-2 md:px-16">
            <div className="w-full flex flex-row justify-between items-center py-8 px-4">
                <Title classname="pl-6">Announcements ({counter})</Title>
            </div>
            <div className="flex flex-col gap-y-5 px-3">
                {announcements && announcements.map((data) => (
                    <div key={data.AnID} >
                        <InfoCard title={data.AnTitle} description={data.AnDesc} time={formatDate(data.AnDate)} href={`/${params.UserID}/${data.CourseID}/announcements/${data.AnID}`} attachments={data.Attachments} deleteApi={`${process.env.NEXT_PUBLIC_API_URL}/announcement/${data.AnID}`}/>
                    </div>
                ))}
                {counter === 0  && (
                    <p className="w-full py-4 text-slate-400 italic flex items-center justify-center">No data.</p>
                )}
            </div>
        </div>
    );
}
 
export default GeneralAnnouncementPage;