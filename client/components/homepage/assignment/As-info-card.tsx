import { Title, Author, Description } from "@/components/ui/title";


const AssignmentCard = () => {

    return (
            <div className="h-fit w-full border-2 border-indigo-800 rounded-2xl px-8 py-4 bg-white hover:shadow-md transition-all duration-300 hover:shadow-zinc-400">
                <Title classname="text-lg line-clamp-1 w-[80%]">Assignment Title</Title>
                <Author>Tutor Name</Author>
                <Description classname="pt-2">Assignment Description</Description>
            </div>
    );
}
 
export default AssignmentCard;