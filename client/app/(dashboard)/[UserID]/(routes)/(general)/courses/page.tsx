"use client"

import { useParams } from "next/navigation";
import { Title } from "@/components/ui/title";
import { useEffect, useState } from "react";
import { Course, getCourses } from "@/actions/course-actions";
import useAuth from "@/hooks/useAuth";
import { getUser } from "@/actions/user-actions";
import InfoCard from "@/components/homepage/assignment/As-info-card";

const C_CoursesPage = () => {
    const { auth } = useAuth();
    const params = useParams();
    const [courseData, setCourseData] = useState<{ course: Course, author: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const courses = await getCourses(params.UserID as string, auth.roleName as string);
            
            if (courses) {
                const coursesWithAuthors = await Promise.all(
                    courses.map(async (course) => {
                        const author = await getAuthor(course.UserID);
                        return { course, author };
                    })
                );
                setCourseData(coursesWithAuthors);
            }
        };

        fetchData();
    }, [params.UserID, auth.roleName]);

    const getAuthor = async (id: string) => {
        const result = await getUser(id);
        return result.UserFirstName + " " + result.UserLastName;
    };

    const counter = courseData?.length ?? 0;

    return (
        <div className="w-full h-full flex flex-col px-2 md:px-16 overflow-y-scroll">
            <div className="w-full flex flex-row justify-between items-center py-8 px-4">
                <Title classname="pl-6">My Courses ({counter})</Title>
            </div>
            <div className="flex flex-col gap-y-5 px-3">
                {courseData && courseData.map((data) => (
                    <div key={data.course.CourseID} >
                        <InfoCard title={data.course.CourseName} author={data.author} href={`/${params.UserID}/${data.course.CourseID}`} deleteApi={''}/>
                    </div>
                ))}
                {!courseData && (
                    <p className="w-full py-4 text-slate-400 italic flex items-center justify-center">No data.</p>
                )}
            </div>
        </div>
    );
}
 
export default C_CoursesPage;