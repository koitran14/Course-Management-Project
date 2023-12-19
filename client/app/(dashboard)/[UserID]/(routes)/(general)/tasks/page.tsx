"use client"

import { useParams } from "next/navigation";
import { Title } from "@/components/ui/title";
import AssignmentCard from "@/components/homepage/assignment/As-info-card";
import { Announcement, getAnnouncements } from "@/actions/announcement-actions";
import { useEffect, useState } from "react";
import { Assignment, getAssignmentsByStudentID } from "@/actions/assignment-actions";

const C_AnnouncementPage = () => {
    const params = useParams();
    const [task, setTasks] = useState<Assignment[]>();

    const getannouncements = async(id: string) => {
        const result = await getAssignmentsByStudentID(id);
        setTasks(result);
        return null;
    }
    useEffect(() => {
        getannouncements(params.UserID as string);
    },[params.UserID])

    const counter = (task !== undefined && task !== null) ? task?.length : 0;

    return (
        <div className="w-full h-full flex flex-col px-2 md:px-16">
            <div className="w-full flex flex-row justify-between items-center py-8 px-4">
                <Title classname="pl-6">My Tasks ({counter})</Title>
            </div>
            <div className="flex flex-col gap-y-5 px-3">
               <AssignmentCard />
            </div>
        </div>
    );
}
 
export default C_AnnouncementPage;