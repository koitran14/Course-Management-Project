export interface Announcement{
    AnID: string,
    AnTitle: string,
    AnDesc: string,
    AnDate: Date,
    CourseID:String
}

export async function getAnnoucements(id: String): Promise<Announcement> {
    const res = await fetch(`http://localhost:8080/api/${id}/annnouncement`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return data.result;
}

export async function getAnnouncement(id: string): Promise<Announcement[]> {
    const res = await fetch(`http://localhost:8080/api/announcement/${id}`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return await data.result;

}