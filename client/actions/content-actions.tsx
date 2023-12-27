import { Attachment } from "./attachment-actions";

export interface Content{
    ConID: string,
    ConTitle: string,
    ConDesc: string,
    ConDate: Date,
    CourseID:String
}

export interface ContentWithAttachments extends Content {
    Attachments: Attachment[];
}

export async function generateUniqueContentID() {
    const randomValue = Math.floor(Math.random() * 100000);
    const paddedRandom = String(randomValue).padStart(4, '0');
    const uniqueID = `CON${paddedRandom}`;
    const available = await getContent(uniqueID);

    if (!available) {
        return uniqueID;
    } else {
        return generateUniqueContentID();
    }
}


export async function getContent(id: string): Promise<Content> {
    const res = await fetch(`http://localhost:8080/api/content/${id}`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return await data.result;
}

export async function getContents(id: String): Promise<Content[]> {
    const res = await fetch(`http://localhost:8080/api/${id}/content`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return data.result;
}

export async function getContentsByCourseID(id: String): Promise<Content[]> {
    const res = await fetch(`http://localhost:8080/api/${id}/content/`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return data.result;
}

