"use client"

import { useParams } from "next/navigation";
import { Title } from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AssignmentCard from "@/components/homepage/assignment/As-info-card";
import { useEffect, useState } from "react";
import { Assignment, getAlerts } from "@/actions/assignment-actions";

const C_AnnouncementPage = () => {
    const params = useParams();
    const [alert, setAlerts] = useState<Assignment[]>();

    const getannouncements = async(id: string) => {
        const result = await getAlerts(id);
        setAlerts(result);
        return null;
    }
    useEffect(() => {
        getannouncements(params.UserID as string);
    },[params.UserID])

    const counter = (alert !== undefined && alert !== null) ? alert?.length : 0;

    return (
        <div className="w-full h-full flex flex-col px-2 md:px-16">
            <div className="w-full flex flex-row justify-between items-center py-8 px-4">
                <Title classname="pl-6">My Alerts ({counter})</Title>
            </div>
            <div className="flex flex-col gap-y-5 px-3">
               <AssignmentCard />
            </div>
        </div>
    );
}
 
export default C_AnnouncementPage;