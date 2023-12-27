import { Title, Author, Description } from "@/components/ui/title";
import { Attachment } from "@/actions/attachment-actions";
import Link from "next/link";
import AttachFile from "@/components/attachments/attach-file";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Clock, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
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
import { formatRelativeTimeOrSpecificDate, formatTextWithLineBreaks } from "@/actions/format";
const InfoCard = ({
    title, description, author, time, href, daysLeft, attachments, deleteApi
}: {
    title: string;
    description?: string;
    author?: string;
    time?: string;
    daysLeft?: string;
    attachments?: Attachment[];
    href?: string;
    deleteApi: string
}) => {
    const {auth} = useAuth();
    const router = useRouter();
    
    const onDelete = async () => {
        try{
            const result = await axios.delete(deleteApi);
            toast.success("Deleted.");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong.");
            console.log("Error in deleting assignment: ", error);
        }
    }

    return (
        <div className="h-fit w-full px-4">
            <Link href={href? href: ''}>
                <div className="h-fit w-full border-2 border-indigo-800 rounded-2xl px-8 py-4 bg-white hover:shadow-md transition-all duration-300 hover:shadow-zinc-400 relative">
                    {auth.roleName === "Teacher" && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild> 
                            <Button variant={"outline"} onClick={() => {}} className="rounded-full absolute top-4 right-5 z-10 border-2 border-zinc-500 hover:bg-indigo-800 hover:text-white hover:border-indigo-800" size={"smallIcon"}>
                                <Trash2 className="h-5 w-5"/>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={onDelete} className="bg-indigo-800">Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    )}                     
                    
                    <div className="flex flex-col">
                        <Title classname="text-xl line-clamp-1 w-[80%]">{title}</Title>
                        {author &&<Author>{author}</Author>}
                        {time && !daysLeft && (
                            <p className="text-sm text-zinc-500 flex flex-row items-center">
                                <Clock className="pr-2"/>
                                {time}
                            </p>
                        )} 
                        {daysLeft && (
                            <p className="text-sm text-red-600 font-medium flex flex-row items-center">
                                <Clock className="pr-2"/>
                                Due Date: {daysLeft}
                            </p>
                        )} 
                        {description !== undefined &&<Description classname="w-full line-clamp-2 pt-3 text-sm">{formatTextWithLineBreaks(description)}</Description>}
                        {attachments !== undefined && attachments !== null && attachments.length > 0 && (
                            <div  className=" flex flex-row gap-x-3 overflow-x-auto no-scrollbar pt-4">
                                {attachments.map((attachment) => (
                                    <AttachFile attachment={attachment} key={attachment.AttachID}/>
                                ))}
                            </div>

                            )}
                    </div>
                </div>
            </Link>
        </div>
    );
}
 
export default InfoCard;