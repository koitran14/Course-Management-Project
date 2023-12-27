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
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCourse } from "@/actions/course-actions";
import { getFullname } from "@/actions/user-actions";
import AttachFile from "@/components/attachments/attach-file";
import { Assignment, getAssignment } from "@/actions/assignment-actions";
import { formatDate } from "@/actions/announcement-actions";
import AttachmentForm from "@/components/attachments/AttachmentForm";
import { Submission, getSubmissionFromUserIDByA_ID } from "@/actions/submissions-action";
import { cn } from "@/lib/utils";

interface Data {
    assignment: Assignment,
    attachments : Attachment[],
    author?: string,
}

const A_IDPageForStudent = () => {
    const params = useParams();
    const router = useRouter();
    const [assignment, setAnnouncement] = useState<Data>();
    const [subAttachments, setSubAttachments] = useState<Attachment[]>();
    const [submission, setSubmission] = useState<Submission>();
    const [complete, setComplete] = useState(false);
    const getData = async(A_ID: string, CourseID: string, UserID: string) => {
        const a = await getAssignment(A_ID);
        const attach = await getAttachmentsByA_ID(A_ID);
        const courseInfo = await getCourse(CourseID);
        const author = await getFullname(courseInfo.UserID);
        const submission = await getSubmissionFromUserIDByA_ID(UserID, A_ID);
        
        setAnnouncement({assignment: a, attachments: attach, author: author})
        setSubmission(submission);
    }

    useEffect(() => {
        getData(params.A_ID as string, params.CourseID as string, params.UserID as string);
    },[params.A_ID,  params.CourseID, params.UserID]);

    const handleSubmit = async() => {
      try {
        const newData = {
            A_ID: params.A_ID as string,
            UserID: params.UserID as string,
            attachments: subAttachments
        }

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/submission`, newData);
        console.log(response);
        toast.success("Submit successfully.");
        router.back();
        router.refresh();
      } catch (error) {
        toast.error("Something went wrong.");
        console.error("Fail to submit: ", error);
      }
    }

    useEffect(() => {
        setComplete(!!(submission && submission.submissionInfo));
    },[submission])
    
    const handleCancel = () => {
        router.back();
        router.refresh();
    }

    return (
        <div className="h-full w-full py-8 md:px-24 sm:px-8 px-4 ">
            {complete ? (
                <div className="flex flex-col gap-y-5">
                {/* Complete state */}
                    <div className="px-6 py-5 border-2 border-slate-500 rounded-md flex flex-row justify-between ">
                        <div>
                            <h1 className="text-2xl font-medium text-orange-500">Congratulation</h1>
                            <h1 className="flex flex-row gap-x-1">You have completed the task !</h1>
                            {submission && (
                                <p className="text-indigo-800 font-semibold"> at {formatRelativeTimeOrSpecificDate(new Date(submission.submissionInfo.DoAt))}</p>
                            )}
                        </div>
                        {submission && submission.submissionInfo && (
                            <div className={cn("rounded-full h-20 w-20 bg-indigo-800 flex items-center justify-center",
                                submission?.submissionInfo.Grade < 0 && "bg-zinc-400"
                            )}>
                                <p className="text-sm font-medium text-white">{submission.submissionInfo.Grade <= 0 ? "--.--" : submission.submissionInfo.Grade}</p>
                            </div>
                        )}
                        
                    </div>
                    <div className="py-5 px-8 flex flex-col gap-y-1 relative bg-white border-2 border-slate-500 rounded-lg">
                        <div className="flex flex-col  pb-4 border-b-2 relative">
                            <Title classname="text-2xl">{assignment?.assignment.A_Title}</Title>
                            <Author classname="py-1">Author: {assignment?.author}</Author>
                            {assignment && assignment.assignment.A_DueDate && !complete &&(
                                <p className="text-sm font-medium text-red-600 flex flex-row items-center">
                                    <Clock className="pr-2"/>
                                    {/* {formatRelativeTimeOrSpecificDate(new Date(assignment.assignment.A_DueDate))} */}
                                    Due Date: {formatDate(assignment.assignment.A_DueDate)}
                                </p>
                            )}    
                        </div>
                        {assignment && assignment.assignment.A_Desc && (
                            <div className=" py-2 border-b-2">
                                <Description classname="w-[95%]">{formatTextWithLineBreaks(assignment.assignment.A_Desc)}</Description>
                            </div>
                        )}
                        {assignment && assignment.attachments && (
                            <div className="flex flex-col gap-y-3 py-2">
                                <p className="text-sm font-medium text-slate-500">Attachments:</p>
                                <div className="flex flex-row gap-x-2 overflow-x-auto no-scrollbar">
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
            ) : (
                <div className="flex flex-col gap-y-5">
                    <div className="py-5 px-8 flex flex-col gap-y-1 relative bg-white border-2 border-slate-500 rounded-lg">
                        <div className="flex flex-col  pb-4 border-b-2 relative">
                            <Title classname="text-2xl">{assignment?.assignment.A_Title}</Title>
                            <Author classname="py-1">Author: {assignment?.author}</Author>
                            {assignment && assignment.assignment.A_DueDate && !complete &&(
                                <p className="text-sm font-medium text-red-600 flex flex-row items-center">
                                    <Clock className="pr-2"/>
                                    Due Date: {formatDate(assignment.assignment.A_DueDate)}
                                </p>
                            )}    
                        </div>
                        {assignment && assignment.assignment.A_Desc && (
                            <div className=" py-2 border-b-2">
                                <Description classname="w-[95%]">{formatTextWithLineBreaks(assignment.assignment.A_Desc)}</Description>
                            </div>
                        )}
                        {assignment && assignment.attachments && (
                            <div className="flex flex-col gap-y-3 py-2">
                                <p className="text-sm font-medium text-slate-500">Attachments:</p>
                                <div className="flex flex-row gap-x-2 overflow-x-auto no-scrollbar">
                                    {assignment.attachments.map((data) => (
                                        <div key={data.AttachID}>
                                            <AttachFile attachment={data} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col pb-16 gap-y-2">
                        <AttachmentForm classname="border-2 border-slate-500" initialData={subAttachments} setAttachments={setSubAttachments} />
                        <div className="pt-4 w-full flex items-center justify-end flex-row gap-x-2">
                            <Button variant={"outline"} onClick={handleCancel}>Cancel</Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild> 
                                    <Button  className="bg-indigo-700 hover:bg-indigo-800" disabled={!subAttachments}>Submit</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently submit your
                                            work.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleSubmit} className="bg-indigo-800">Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default A_IDPageForStudent;