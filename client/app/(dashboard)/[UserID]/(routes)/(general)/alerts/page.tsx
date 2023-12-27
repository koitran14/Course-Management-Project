"use client"

import { useParams } from "next/navigation";
import { Title } from "@/components/ui/title";
import { useEffect, useState } from "react";
import { Assignment, getAlerts } from "@/actions/assignment-actions";
import { InfoCard } from "@/components/homepage/assignment/As-info-card";

const G_AlertsPage = () => {
    const params = useParams();
    const [alerts, setAlerts] = useState<Assignment[]>();


    useEffect(() => {
        const fetchData = async () => {
            const data = await getAlerts(params.UserID as string);
            setAlerts(data);
        };
        fetchData();
    }, [params.UserID]);

    const counter = alerts?.length ?? 0;

    return (
        <div className="w-full h-full flex flex-col px-2 md:px-16">
            <div className="w-full flex flex-row justify-between items-center py-8 px-4">
                <Title classname="pl-6">My Alerts ({counter})</Title>
            </div>
            <div className="flex flex-col gap-y-5 px-3">
                {alerts && alerts.map((data) => (
                    <div key={data.A_ID} >
                        <InfoCard title={data.A_Title} time={data.FormattedDueDate} daysLeft={data.DaysLeft} href={`/${params.UserID}/${data.CourseID}/assignments/${data.A_ID}`}/>
                    </div>
                ))}
                {!alerts && (
                    <p className="w-full py-4 text-slate-400 italic flex items-center justify-center">No data.</p>
                )}
            </div>
        </div>
    );
}
 
export default G_AlertsPage;