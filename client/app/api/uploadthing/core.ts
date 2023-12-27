import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();

export const ourFileRouter = {
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
  .onUploadComplete(async ({ metadata, file }) => {
    // This code RUNS ON YOUR SERVER after upload
    console.log("Upload complete");
    console.log("file url", file.url);
    console.log("Metadata: ", metadata)
    console.log("File name: ", file.name)
  }),

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;