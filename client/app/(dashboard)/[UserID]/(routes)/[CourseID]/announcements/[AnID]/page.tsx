"use client"

import { Announcement, getAnnouncement } from "@/actions/announcement-actions";
import { getAttachmentsByAnID, Attachment } from "@/actions/attachment-actions";
import { Description, Title, Author } from "@/components/ui/title";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { formatRelativeTimeOrSpecificDate, formatTextWithLineBreaks } from '@/actions/format'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog" 
import useAuth from "@/hooks/useAuth";
import { Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCourse } from "@/actions/course-actions";
import { getFullname } from "@/actions/user-actions";
import AttachFile from "@/components/attachments/attach-file";

interface Data {
    announcement: Announcement,
    attachments : Attachment[],
    author?: string,
}

const AnIDPage = () => {
    const params = useParams();
    const {auth} = useAuth();
    const [announcement, setAnnouncement] = useState<Data>();
    const router = useRouter();
    const getData = async(AnID: string, CourseID: string) => {
        const an = await getAnnouncement(AnID);
        const attach = await getAttachmentsByAnID(AnID);
        const courseInfo = await getCourse(CourseID);
        const author = await getFullname(courseInfo.UserID);

        setAnnouncement({announcement: an, attachments: attach, author: author})
    }

    useEffect(() => {
        getData(params.AnID as string, params.CourseID as string);
    },[params.AnID,  params.CourseID]);

    const onDelete = async () => {
        try{
            const result = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/announcement/${params.AnID}`);
            toast.success("Deleted.");
            router.back();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong.");
            console.log("Error in deleting assignment: ", error);
        }
    }

    return (
        <div className="h-full w-full py-3 md:px-24 sm:px-8 px-6 relative"> 
            <div className="py-4 flex flex-col gap-y-1">
                <div className="flex flex-col  pb-4 border-b-2 relative">
                    <div className="pl-2">
                        <Title classname="text-[32px]">{announcement?.announcement.AnTitle}</Title>
                        <Author classname="py-1">Author: {announcement?.author}</Author>
                        {announcement && announcement.announcement.AnDate && (
                            <p className="text-sm text-slate-400 flex flex-row items-center">
                                <Clock className="pr-2"/>
                                {formatRelativeTimeOrSpecificDate(new Date(announcement.announcement.AnDate))}
                            </p>
                        )}
                    </div>
                    

                    {auth.roleName === "Teacher" && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild> 
                                <Button variant={"outline"} onClick={() => {}} className="rounded-xl absolute top-0 right-0 z-10 border-2 hover:bg-indigo-800 hover:text-white hover:border-indigo-800" size={"icon"}>
                                    <Trash2 className="h-5 w-5"/>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        account and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={onDelete} className="bg-indigo-800">Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}          
                </div>
                {announcement && announcement.announcement.AnDesc && (
                    <div className="pb-8">
                        <Description classname="w-[95%]">{formatTextWithLineBreaks(announcement.announcement.AnDesc)}</Description>
                    </div>
                )}
                {announcement && announcement.attachments && (
                    <div className="flex flex-col gap-y-3 py-3 border-t-2">
                        <p className="text-sm font-medium text-slate-500">Attachments:</p>
                        <div className="flex sm:flex-row flex-col sm:gap-x-2 gap-y-3">
                            {announcement.attachments.map((data) => (
                                <div key={data.AttachID}>
                                    <AttachFile attachment={data} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default AnIDPage;