import { Attachment } from "@/actions/attachment-actions";
import { FileTextIcon } from "@radix-ui/react-icons";
import { ArrowDownToLine } from "lucide-react";
import Link from "next/link";

const AttachFile = ({ attachment }: { attachment: Attachment }) => {
    const getFileNameWithoutExtension = (fileName: string): string => {
        const lastDotIndex = fileName.lastIndexOf('.');
        if (lastDotIndex !== -1) {
            return fileName.substring(0, lastDotIndex); // Extracts the file name before the last dot
        }
        return fileName;
    };

    const getFileTypeFromFileName = (fileName: string): string => {
        const lastDotIndex = fileName.lastIndexOf('.');
        if (lastDotIndex !== -1) {
            return fileName.substring(lastDotIndex + 1).toUpperCase(); // Extracts the file type after the last dot
        }
        return 'Unknown';
    };

    const fileNameWithoutExtension = getFileNameWithoutExtension(attachment.Attach_FileName);
    const fileType = getFileTypeFromFileName(attachment.Attach_FileName);

    return (
        <Link href={attachment.Attach_URL} target="_blank">
            <div className="w-48 h-12 bg-slate rounded-xl bg-white border-2 hover:border-indigo-800 border-slate-800 flex flex-row gap-x-2 items-center px-3">
                <FileTextIcon className="h-14 w-14" />
                <div className="w-full">
                    <p className="text-sm font-medium w-full line-clamp-1">{fileNameWithoutExtension}</p>
                    <p className="text-[10px] text-slate-400 ">{fileType}</p>
                </div>
                <div className="border-2 rounded-full border-black p-1">
                    <ArrowDownToLine className="h-5 w-5"/>
                </div>
            </div>
        </Link>
    );
};

export default AttachFile;
