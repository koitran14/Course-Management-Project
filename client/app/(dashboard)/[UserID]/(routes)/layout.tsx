import CourseNav from "@/components/homepage/course/c-nav-bar";

const LayoutForCousePage = ({
    children
}:{
    children: React.ReactNode
}) => {
    return (
        <div className="w-full bg-white/30 flex justify-center h-full">
            <div className="h-full w-full bg-white/90 relative">
                <div className="w-full absolute top-0 left-0 sm:h-20 h-16">
                    <CourseNav />
                </div>
                <div className="pt-20 h-full w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
 
export default LayoutForCousePage;