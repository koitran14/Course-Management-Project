import { Content } from "./get-content";

export async function getContents(id: String): Promise<Content[]> {
    const res = await fetch(`http://localhost:8080/api/${id}/content`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return data.result;
    }