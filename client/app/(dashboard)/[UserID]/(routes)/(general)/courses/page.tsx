"use client"

import { useParams } from "next/navigation";
import { Title } from "@/components/ui/title";
import AssignmentCard from "@/components/homepage/assignment/As-info-card";
import { useEffect, useState } from "react";
import { Course, getCourses } from "@/actions/course-actions";
import useAuth from "@/hooks/useAuth";

const C_AnnouncementPage = () => {
    const {auth} = useAuth();
    const params = useParams();
    const [courses, setCourses] = useState<Course[]>();

    const getannouncements = async(id: string, role: string) => {
        const result = await getCourses(id, role);
        setCourses(result);
        return null;
    }
    useEffect(() => {
        getannouncements(params.UserID as string, auth.roleName as string);
    },[params.UserID, auth.roleName])

    const counter = (courses !== undefined && courses !== null) ? courses?.length : 0;

    return (
        <div className="w-full h-full flex flex-col px-2 md:px-16">
            <div className="w-full flex flex-row justify-between items-center py-8 px-4">
                <Title classname="pl-6">My Courses ({counter})</Title>
            </div>
            <div className="flex flex-col gap-y-5 px-3">
               <AssignmentCard />
            </div>
        </div>
    );
}
 
export default C_AnnouncementPage;