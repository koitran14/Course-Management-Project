import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Attachment, generateUniqueAttachment } from "@/actions/attachment-actions";
import { useParams, useRouter } from "next/navigation";
import { FileUpload } from "../ui/file-upload";
import Link from "next/link";
import { cn } from "@/lib/utils";

const AttachmentForm = ({
    initialData,
    setAttachments,
    classname
}: {
    initialData: Attachment[] | undefined;
    setAttachments: Dispatch<SetStateAction<Attachment[] | undefined>>;
    classname?:string
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [deleteingId, setDeletingId] = useState<string | null>(null);
    
    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();
    const params = useParams();

    const onSubmit = async (url: string, name: string) => {
        const uniqueID = await generateUniqueAttachment();

        const courseID = params.CourseID as string | undefined; // Get CourseID from params
        if (!courseID) {
            throw new Error("Invalid CourseID");
        }

        const newAttachment = {
            AttachID: uniqueID,
            Attach_FileName: name,
            Attach_URL: url,
            Attach_Date: new Date(),
            CourseID: courseID,
        };


        console.log(newAttachment);

        try {
            toast.success("Attachment uploaded");
            setAttachments((currentAttachments) =>
                currentAttachments ? [...currentAttachments, newAttachment] : [newAttachment]
            );
        } catch (error) {
            console.error('Error uploading attachment:', newAttachment.Attach_FileName);
            toast.error("Something went wrong.");
        }
    };

    const onDelete = async (id: string) => {
        try {
            setAttachments((currentAttachments) =>
            currentAttachments ? currentAttachments.filter(attachment => attachment.AttachID !== id) : []);
            toast.success("Attachment deleted.");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className={cn("border-2 hover:shadow-md hover:shadow-zinc-300 bg-white rounded-md px-4 py-2", classname)}>
            <div className="font-medium flex items-center">
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? <>Cancel</> : <><PlusCircle className="h-4 w-4 mr-2" />Add a file</>}
                </Button>
            </div>
            {!isEditing ? (
                <>
                    {initialData === undefined || initialData === null || initialData.length === 0? (
                        <p className="text-sm mt-2 text-slate-400">No attachments yet</p>
                    ):(
                        <div className="space-y-2 pt-2">
                            {initialData.map((attachment) => (
                                <div
                                    key={attachment.AttachID}
                                    className="flex items-center px-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md py-2"
                                >
                                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                                   <Link href={attachment.Attach_URL}> 
                                        <p className="text-xs line-clamp-1">{attachment.Attach_FileName}</p>
                                   </Link>
                                    {deleteingId === attachment.AttachID ? (
                                        <div>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        </div>
                                    ) : (
                                        <Button variant={"outline"} size={"smallIcon"}
                                            className="ml-auto hover:opacity-75 transition"
                                            onClick={() => onDelete(attachment.AttachID)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div>
                    <FileUpload 
                        endpoint="courseAttachment"
                        onChange={(url, name) => {
                            if (url && name) {
                                onSubmit(url, name);
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Add additional documentation if needed.
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttachmentForm;
