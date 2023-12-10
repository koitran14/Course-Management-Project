import { Announcement } from "./get-announcement";

export async function getAnnoucements(id: String): Promise<Announcement> {
    const res = await fetch(`http://localhost:8080/api/${id}/annnouncement`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return data.result;
    }