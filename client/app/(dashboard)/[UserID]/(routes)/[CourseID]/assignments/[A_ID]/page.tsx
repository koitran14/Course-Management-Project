"use client"


import { useParams } from "next/navigation";

import useAuth from "@/hooks/useAuth";

import A_IDPageForTeacher from "./_component/teacher/teacher-page";
import A_IDPageForStudent from "./_component/student/student-page";

const A_IDPage = () => {
    const {auth} = useAuth();

   return(
        <div className="w-full h-full">
            {auth.roleName === "Teacher" ? 
            <A_IDPageForTeacher/> : 
            <A_IDPageForStudent/>
            }
        </div>
   );
}
 
export default A_IDPage;