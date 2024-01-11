"use client"

import { DataTable } from "@/components/teacher/data-table";
import { SubmissionColumn, columns } from "@/components/teacher/columns"
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import { getAllByA_ID } from "@/actions/submissions-action";
import { getFullname } from "@/actions/user-actions";
import { Title } from "@/components/ui/title";
import { formatRelativeTimeOrSpecificDate } from "@/actions/format";
import { getAssignment } from "@/actions/assignment-actions";
import { Input } from "@/components/ui/input";

const SubmissionTable = () => {
    const [data, setData] = useState<SubmissionColumn[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const params = useParams();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const filteredData = data.filter(item =>
        item.StudentID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.StudentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.SubmitAt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.grade.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getData = async (id: string) => {
        try {
          const result = await getAllByA_ID(id);
          const assignment = await getAssignment(id);
      
          const formattedData: SubmissionColumn[] = [];
      
          for (const submission of result) {
            const fullName = await getFullname(submission.UserID);
            const submissionStatus = assignment.A_DueDate < submission.DoAt ? "Late" : "Valid"
            const grade = submission.Grade === -1 ? 0 : submission.Grade
            
            formattedData.push({
              StudentID: submission.UserID,
              StudentName: fullName,
              SubmitAt: formatRelativeTimeOrSpecificDate(new Date(submission.DoAt)),
              status: submissionStatus,
              grade: grade,
            });
          }
      
          setData(formattedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    
      
    useEffect(() => {
        getData(params.A_ID as string);
    },[params.A_ID]);

    return (
        <div className="w-full flex flex-col gap-y-5">
            <div className="flex flex-row justify-between pt-2">
                <Title classname="">Responses ({data.length})</Title>
                <Input 
                    type="text" 
                    value={searchTerm} 
                    onChange={handleSearch} 
                    placeholder="Search..." 
                    className="w-[40%]"
                />
            </div>
            <DataTable data={filteredData} columns={columns}/>
        </div>
    );
}
 
export default SubmissionTable;