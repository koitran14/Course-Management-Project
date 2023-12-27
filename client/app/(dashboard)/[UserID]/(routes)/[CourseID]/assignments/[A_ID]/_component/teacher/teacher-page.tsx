"use client"

import { Attachment, getAttachmentsByA_ID } from "@/actions/attachment-actions";
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
import { Calendar, Clock, Dot, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCourse } from "@/actions/course-actions";
import { getFullname } from "@/actions/user-actions";
import AttachFile from "@/components/attachments/attach-file";
import { Assignment, getAssignment } from "@/actions/assignment-actions";
import { formatDate } from "@/actions/announcement-actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubmissionTable from "./table-submission";

interface Data {
    assignment: Assignment,
    attachments : Attachment[],
    author?: string,
}

const A_IDPageForTeacher = () => {
    const params = useParams();
    const {auth} = useAuth();
    const [assignment, setAnnouncement] = useState<Data>();
    const router = useRouter();
    const getData = async(A_ID: string, CourseID: string) => {
        const a = await getAssignment(A_ID);
        const attach = await getAttachmentsByA_ID(A_ID);
        const courseInfo = await getCourse(CourseID);
        const author = await getFullname(courseInfo.UserID);

        setAnnouncement({assignment: a, attachments: attach, author: author})
    }

    useEffect(() => {
        getData(params.A_ID as string, params.CourseID as string);
    },[params.A_ID,  params.CourseID]);

    const onDelete = async () => {
        try{
            const result = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/assignment/${params.A_ID}`);
            toast.success("Deleted.");
            router.back();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong.");
            console.log("Error in deleting assignment: ", error);
        }
    }

    return (
        <Tabs defaultValue="details" className="h-full w-full py-8 md:px-24 sm:px-8 px-4 flex flex-col gap-y-1">
            <div className="w-full flex items-center justify-end">
                <TabsList className="grid w-[250px] grid-cols-2 bg-indigo-800 text-white">
                    <TabsTrigger value="details">Detail</TabsTrigger>
                    <TabsTrigger value="responses" className="relative">
                        Responses
                    </TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="details">
                <div className="flex flex-col gap-y-5"> 
                    <div className="py-5 px-8 flex flex-col gap-y-1 relative bg-white border-2 border-slate-500 rounded-xl">
                        <div className="flex flex-col  pb-4 border-b-2 relative">
                            <div className="flex flex-row gap-x-1/2 w-[90%] items-center">
                                <Title classname="text-2xl max-w-[80%]">{assignment?.assignment.A_Title}</Title>
                                {assignment && assignment.assignment.A_StartAt && (
                                    <div className="flex flex-row gap-x-1/2 items-center text-sm font-medium text-slate-500">
                                        <Dot />
                                        <p className="flex flex-row gap-x-2 items-center">
                                            {formatRelativeTimeOrSpecificDate(new Date(assignment.assignment.A_StartAt))} 
                                            <Clock className="pr-2"/>
                                        </p>
                                    </div>
                                )}
                            </div>
                            <Author classname="py-1 text-sm font-medium">{assignment?.author}</Author>
                            {assignment && assignment.assignment.A_DueDate && (
                                <p className="text-sm font-medium text-red-600 flex flex-row items-center">
                                    <Calendar className="pr-2"/>
                                    {/* {formatRelativeTimeOrSpecificDate(new Date(assignment.assignment.A_DueDate))} */}
                                    Due Date: {formatDate(assignment.assignment.A_DueDate)}
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
                        {assignment && assignment.assignment.A_Desc && (
                            <div className=" py-2">
                                <Description classname="w-[95%]">{formatTextWithLineBreaks(assignment.assignment.A_Desc)}</Description>
                            </div>
                        )}
                        {assignment && assignment.attachments && (
                            <div className="flex flex-col gap-y-3 py-2 border-t-2">
                                <p className="text-sm font-medium text-slate-500">Attachments:</p>
                                <div className="flex flex-row gap-x-3 overflow-x-auto no-scrollbar">
                                    {assignment.attachments.map((data) => (
                                        <div key={data.AttachID}>
                                            <AttachFile attachment={data} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="responses">
                <div className="w-full h-fit flex flex-col gap-y-4">
                    <SubmissionTable />
                </div>
            </TabsContent>
        </Tabs>
    );
}
 
export default A_IDPageForTeacher;