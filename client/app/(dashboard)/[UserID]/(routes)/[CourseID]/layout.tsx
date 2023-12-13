import { getCourse } from "@/actions/course-actions";
import CourseNav from "@/components/homepage/course/c-nav-bar";
import { useParams } from "next/navigation";

const LayoutForCousePage = async({
    children,
    params
}:{
    children: React.ReactNode;
    params: {
        UserID: string;
        CourseID: string;
    };
}) => {
    const course = await getCourse(params.CourseID);
    
    return (
        <div className="w-full flex justify-center h-full">
            <div className="h-full w-full bg-white/90 relative">
                <div className="w-full absolute top-0 left-0 sm:h-20 h-16 z-50">
                    <CourseNav currentCourse={course.CourseName} />
                </div>
                <div className="pt-20 h-full w-full absolute top-0 left-0 z-10 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
 
export default LayoutForCousePage;