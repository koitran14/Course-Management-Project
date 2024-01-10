import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Input } from "../ui/input";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { CheckIcon } from "lucide-react";
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

export type SubmissionColumn = {
  StudentID: string | '';
  StudentName: string | '';
  SubmitAt: string | '';
  status: string | '';
  grade: number;
}

const GradeCell = ({ grade, userID } : {grade: number, userID: string}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGrade, setEditedGrade] = useState<number>(grade);
  const params = useParams();
  const router = useRouter();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedGrade(parseFloat(e.target.value));
  };

  const handleGradeUpdate = async () => {
    try {
      if (editedGrade <= 100 && editedGrade >= 0) {
        const newData = {
          UserID: userID,
          Grade: editedGrade,
          A_ID: params.A_ID
        }
        const result = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/submission`, newData)
        router.refresh();
        toast.success("Successfully grade.")
        setIsEditing(false);
      } else {
        toast.error("Invalid grade.")
      }
    } catch (error) {
      toast.error("Something went wrong.")
    }
  };

  return (
    <div onClick={handleEditClick} className="cursor-pointer w-fit" >
      {isEditing ? (
        <div className="flex items-center flex-row gap-x-2" >
          <Input
            type="number"
            value={editedGrade}
            onChange={handleGradeChange}
            autoFocus
            className="w-24"
            max={100}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild> 
              <Button variant={"outline"} className="rounded-full h-fit w-fit p-2 text-indigo-600">
                <CheckIcon className="h-6 w-6 cursor-pointer" />
              </Button>
              </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Please note that the grade has been revised to {editedGrade}. Kindly ensure accuracy in recording this updated information.                    
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleGradeUpdate} className="bg-indigo-800">Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
      </div>
      ) : (
        <span>{grade}</span>
      )}
    </div>
  );
};

export const columns: ColumnDef<SubmissionColumn>[] = [
  {
    accessorKey: "StudentID",
    header: "Student ID",
  },
  {
    accessorKey: "StudentName",
    header: "Name",
  },
  {
    accessorKey: "SubmitAt",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "grade",
    header: "Grade",
    cell: ({ row }) => <GradeCell grade={row.original.grade} userID={row.original.StudentID}  />,
  },
];
