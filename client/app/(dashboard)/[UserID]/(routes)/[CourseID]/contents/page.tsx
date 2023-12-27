"use client"

import useAuth from "@/hooks/useAuth";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Title } from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import InfoCard from "@/components/homepage/assignment/As-info-card";
import { useState, useEffect } from "react";
import { Content, getContentsByCourseID } from "@/actions/content-actions";
import { formatDate } from "@/actions/announcement-actions";

const C_ContentPage = () => {
    const params = useParams();
    const { auth } = useAuth();
    const router = useRouter();
    const pathname  = usePathname();
    const [contents, setContents] = useState<Content[]>();

    const getcontents = async(id: string) => {
        const result = await getContentsByCourseID(id);
        setContents(result);
        return null;
    }
    
    useEffect(() => {
        getcontents(params.CourseID as string);
    },[params.CourseID])

    const counter = (contents !== undefined && contents !== null) ? contents?.length : 0;

    return (
        <div className="w-full h-full flex flex-col px-2 md:px-16">
            <div className="w-full flex flex-row justify-between items-center py-8 px-4">
                <Title classname="pl-6">Contents ({counter})</Title>
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
                {contents && contents.length > 0 ? (
                    contents.map((data) => (
                        <div key={data.ConID}>
                            <InfoCard title={data.ConTitle} description={data.ConDesc} time={formatDate(data.ConDate)} href={`/${params.UserID}/${data.CourseID}/contents/${data.ConID}`} deleteApi={`${process.env.NEXT_PUBLIC_API_URL}/content/${data.ConID}`}/>
                        </div>
                    ))
                ) : (
                    <p className="text-slate-400 text-sm font-medium">No data.</p>
                )}
            </div>
        </div>
    );
}
 
export default C_ContentPage;