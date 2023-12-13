export interface Content{
    ConID: string,
    ConTitle: string,
    ConDesc: string,
    ConDate: Date,
    CourseID:String
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

