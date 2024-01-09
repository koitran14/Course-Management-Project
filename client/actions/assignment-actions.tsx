import { Attachment } from "./attachment-actions";

export interface Assignment{
    A_ID: string,
    A_Title: string,
    A_Desc: string,
    A_StartAt: Date,
    A_DueDate: Date,
    CourseID: string,
    FormattedDueDate: string,
    DaysLeft: number,
}

export interface AssignmentWithAttachments extends Assignment {
    Attachments: Attachment[];
}

export async function getAssignmentsByCourseID(id: String): Promise<Assignment[]> {
    const res = await fetch(`http://localhost:8080/api/course/${id}/assignment`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return data.result;
}
 
 export async function getAssignment(id: string): Promise<Assignment> {
     const res = await fetch(`http://localhost:8080/api/assignment/${id}`,{ next: { revalidate: 0 }}); 
     const data = await res.json();
     return await data.result;
 
 }

 export async function generateUniqueAssignment() {
    const randomValue = Math.floor(Math.random() * 100000);
    const paddedRandom = String(randomValue).padStart(4, '0');
    const uniqueID = `AS${paddedRandom}`;
    const available = await getAssignment(uniqueID);

    if (!available) {
        return uniqueID;
    } else {
        return generateUniqueAssignment();
    }
}

 
 
 export async function getAssignmentsByStudentID(id: String): Promise<Assignment[]> {
     const res = await fetch(`http://localhost:8080/api/user/${id}/assignment`,{ next: { revalidate: 0 }}); 
     const data = await res.json();
     return data.result;
     }

    
export async function getAlerts(id: String): Promise<Assignment[]> {
    const res = await fetch(`http://localhost:8080/api/student/${id}/assignment/near`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return data.result;
}

export async function getAlertsByCourse(id: String): Promise<Assignment[]> {
    const res = await fetch(`http://localhost:8080/api/course/${id}/assignment/near`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return data.result;
}

export async function getAssignmentsByCourse(id: String): Promise<Assignment[]> {
    const res = await fetch(`http://localhost:8080/api/course/${id}/assignment/`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return data.result;
}
