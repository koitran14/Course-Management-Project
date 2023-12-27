import { Attachment } from "./attachment-actions";

export interface Announcement{
    AnID: string,
    AnTitle: string,
    AnDesc: string,
    AnDate: Date,
    CourseID:String
}

export interface AnnouncementWithAttachments extends Announcement {
    Attachments: Attachment[];
}

export async function generateUniqueAnnouncementID() {
    const randomValue = Math.floor(Math.random() * 100000);
    const paddedRandom = String(randomValue).padStart(4, '0');
    const uniqueID = `AN${paddedRandom}`;
    const available = await getAnnouncement(uniqueID);

    if (!available) {
        return uniqueID;
    } else {
        return generateUniqueAnnouncementID();
    }
}

export async function getAnnouncement(id: string): Promise<Announcement> {
    const res = await fetch(`http://localhost:8080/api/announcement/${id}`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return await data.result;

}

// ?
export async function getAnnouncements(id: String): Promise<Announcement[]> {
    const res = await fetch(`http://localhost:8080/api/user/${id}/announcement/`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return data.result;
}

export async function getAnnouncementsByCourse(id: String): Promise<Announcement[]> {
    const res = await fetch(`http://localhost:8080/api/${id}/announcement/`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return data.result;
}

export const formatDate = (inputDate: Date) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
};


