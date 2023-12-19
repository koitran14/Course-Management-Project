"use client"

import * as z from "zod";
import axios from "axios";

import toast from "react-hot-toast";


import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Course } from "@/actions/course-actions";
import { Attachment } from "@/actions/attachment-actions";
import { FileUpload } from "../ui/file-upload";
import { UploadButton } from "@/lib/uploadthing";

interface AttachmentFormProps {
    initialData?: Attachment[];
}

const formScema = z.object({
    url: z.string().min(1),
})

const AttachmentForm = ({
    initialData,
}: AttachmentFormProps) => {
    const params = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [deleteingId, setDeletingId] = useState<string | null>(null);

    const toggleEdit = () =>  setIsEditing((current) => !current);

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formScema>) => {
        try {
            await axios.post(`/api/attachments/${params.UserID}/${params.CourseID}`, values);
            toast.success("Course updated.");
            toggleEdit();  
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong.")
        }
    }

    const onDelete = async (id: string) => {
        try {
            setDeletingId(id);
            await axios.delete(`/api/attachments/${params.courseID}/`);
            toast.success("Attachment deleted.")
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setDeletingId(null);
        }
    }

    return(
        <div className=" border-2 hover:shadow-md hover:shadow-zinc-300 bg-white rounded-md px-4 py-2">
            <div className="font-medium flex items-center">
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <>
                                <PlusCircle className="h-4 w-4 mr-2 "/>
                                Add a file
                            </>
                        </>
                    )} 
                </Button>
            </div>
            {!isEditing ? (
            <>
                {initialData?.length === 0 && (
                    <p className="text-sm mt-2 text-slate-500 italic">
                        No attachment yet
                    </p>
                )}

                {(initialData !== undefined && initialData.length > 0 ) && (
                    <div className="space-y-2">
                        {initialData?.map((attachment) => (
                            <div
                                key={attachment.AttachID}
                                className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                            >
                                <File className="h-4 w-4 mr-2 flex-shrink-0"/>
                                <p className="text-xs line-clamp-1">
                                    {attachment.Attach_FileName}
                                </p>
                                    {deleteingId === attachment.AttachID ? (
                                        <div>
                                            <Loader2 className="h-4 w-4 animate-spin"/>
                                        </div>
                                    ): (
                                        <Button
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
            ): (
            <div>
                <FileUpload 
                    endpoint="courseAttachment"
                    onChange={(url) => {
                        if (url) {
                            onSubmit({ url: url});
                        }
                    }}
                />
                <div className="text-xs text-muted-foreground mt-4">
                    Add your additional documentation if needed.
                </div>
            </div>
            )}
    </div>
    )
}

export default AttachmentForm;