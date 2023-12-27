"use client"

import { Content, getContent } from "@/actions/content-actions";
import { Attachment, getAttachmentsByConID } from "@/actions/attachment-actions";
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
    content: Content,
    attachments : Attachment[],
    author?: string,
}

const AnIDPage = () => {
    const params = useParams();
    const {auth} = useAuth();
    const [content, setAnnouncement] = useState<Data>();
    const router = useRouter();
    const getData = async(ConID: string, CourseID: string) => {
        const con = await getContent(ConID);
        const attach = await getAttachmentsByConID(ConID);
        const courseInfo = await getCourse(CourseID);
        const author = await getFullname(courseInfo.UserID);

        setAnnouncement({content: con, attachments: attach, author: author})
    }

    useEffect(() => {
        getData(params.ConID as string, params.CourseID as string);
    },[params.ConID,  params.CourseID]);

    const onDelete = async () => {
        try{
            const result = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/content/${params.ConID}`);
            toast.success("Deleted.");
            router.back();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong.");
            console.log("Error in deleting assignment: ", error);
        }
    }

    return (
        <div className="h-full w-full py-8 md:px-24 sm:px-8 px-4 relative"> 
            <div className="py-6 flex flex-col gap-y-1 border-2 px-8 rounded-xl border-zinc-500 bg-white">
                <div className="flex flex-col  pb-4 border-b-2 relative">
                    <Title classname="text-2xl">{content?.content.ConTitle}</Title>
                    <Author classname="py-1">Author: {content?.author}</Author>
                    {content && content.content.ConDate && (
                        <p className="text-sm text-slate-400 flex flex-row items-center">
                            <Clock className="pr-2"/>
                            {formatRelativeTimeOrSpecificDate(new Date(content.content.ConDate))}
                        </p>
                    )}

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
                {content && content.content.ConDesc && (
                    <div className="py-4">
                        <Description classname="w-[95%]">{formatTextWithLineBreaks(content.content.ConDesc)}</Description>
                    </div>
                )}
                {content && content.attachments && (
                    <div className="flex flex-col gap-y-3 py-3 border-t-2">
                        <p className="text-sm font-medium text-slate-500">Attachments:</p>
                        <div className="flex flex-row gap-x-2">
                            {content.attachments.map((data) => (
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