"use client"

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
    onChange: (url?:string, name?:string) => void;
    endpoint: keyof typeof ourFileRouter;
};

export const FileUpload = ({
    onChange,
    endpoint
}: FileUploadProps) => {
    return(
        <UploadDropzone className="border-2 border-zinc-500"
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url, res?.[0].name);
            }}
            onUploadError= {(error: Error) => {
                toast.error(`${error.message}`);
            }}
        />
    )
}