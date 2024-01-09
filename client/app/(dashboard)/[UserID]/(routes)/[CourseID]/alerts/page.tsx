"use client"

import { AssignmentWithAttachments, getAlertsByCourse } from "@/actions/assignment-actions";
import useAuth from "@/hooks/useAuth";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Title } from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import InfoCard from "@/components/homepage/assignment/As-info-card";
import { useState, useEffect } from "react";
import { formatDate } from "@/actions/announcement-actions";
import { getAttachmentsByA_ID } from "@/actions/attachment-actions";

const C_Alerts = () => {
    const params = useParams();
    const { auth } = useAuth();
    const router = useRouter();
    const pathname  = usePathname();
    const [assignment, setAssignments] = useState<AssignmentWithAttachments[]>();

    const getAssignmentsWithAttachments = async (id: string) => {
        const result = await getAlertsByCourse(id);

        if (result) {
            const attachmentsPromises = result.map(async (assignment) => {
                const attachments = await getAttachmentsByA_ID(assignment.A_ID);
                return { ...assignment, Attachments: attachments };
            });
            const assignmentsWithAttachments = await Promise.all(attachmentsPromises);
            setAssignments(assignmentsWithAttachments);
        }
    };
    useEffect(() => {
        getAssignmentsWithAttachments(params.CourseID as string);
    },[params.CourseID])
    const counter = (assignment !== undefined && assignment !== null) ? assignment?.length : 0;

    return (
        <div className="w-full h-full flex flex-col px-2 md:px-16">
            <div className="w-full flex flex-row justify-between items-center py-8 px-4">
                <Title classname="pl-6">My Alerts ({counter})</Title>
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
                {assignment ? (
                    assignment.map((data) => (
                        <div key={data.A_ID}>
                            <InfoCard title={data.A_Title} description={data.A_Desc} time={formatDate(data.A_StartAt)} daysLeft={formatDate(data.A_DueDate)} href={`/${params.UserID}/${data.CourseID}/assignments/${data.A_ID}`} attachments={data.Attachments} deleteApi={`${process.env.NEXT_PUBLIC_API_URL}/assignment/${data.A_ID}`}/>
                        </div>
                    ))
                ) : (
                    <p className="text-slate-400 text-sm font-medium w-full flex items-center justify-center">No data.</p>
                )}
            </div>
        </div>
    );
}
 
export default C_Alerts;