export interface Attachment{
    AttachID: string,
    Attach_FileName: string,
    Attach_Date: Date,
    Attach_URL: string,
    CourseID: string
}

export async function generateUniqueAttachment() {
    const randomValue = Math.floor(Math.random() * 100000);
    const paddedRandom = String(randomValue).padStart(4, '0');
    const uniqueID = `ATT${paddedRandom}`;
    const available = await getAttachment(uniqueID);

    if (!available) {
        return uniqueID;
    } else {
        return generateUniqueAttachment();
    }
}

export async function getAttachment(id: string): Promise<Attachment> {
    const res = await fetch(`http://localhost:8080/api/attachment/${id}`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return await data.result;
}

export async function getAttachments(id: String): Promise<Attachment[]> {
    const res = await fetch(`http://localhost:8080/api/${id}/attachment`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return data.result;
}

export async function getAttachmentsByAnID(id: String): Promise<Attachment[]> {
    const res = await fetch(`http://localhost:8080/api/attachment/announcement/${id}`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return data.result;
}

export async function getAttachmentsByConID(id: String): Promise<Attachment[]> {
    const res = await fetch(`http://localhost:8080/api/attachment/content/${id}`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return data.result;
}

export async function getAttachmentsByA_ID(id: String): Promise<Attachment[]> {
    const res = await fetch(`http://localhost:8080/api/attachment/assignment/${id}`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return data.result;
}

export async function getAttachmentsBySubmissionID(UserID: string, A_ID: string): Promise<Attachment[]> {
    const res = await fetch(`http://localhost:8080/api/attachment/submission/${UserID}/${A_ID}`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return data.result;
}