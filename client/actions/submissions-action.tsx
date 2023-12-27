import { Attachment } from "./attachment-actions";

export interface DoAssignment {
    DoAssignmentID: string,
    A_ID: string,
    UserID: string,
    Grade: number, 
    DoAt: Date,
}

export interface Submission {
    submissionInfo: DoAssignment,
    attachments: Attachment[]
} 

export async function getAllByA_ID(id: string): Promise<DoAssignment[]>{
    const res = await fetch(`http://localhost:8080/api/submission/${id}`,{ next: { revalidate: 0 }})
    .then((data) => data.json())
    return res.result;
}

export async function getAllByUserID(id: string): Promise<Submission[]>{
    const res = await fetch(`http://localhost:8080/api/submission/user/${id}`,{ next: { revalidate: 0 }})
    .then((data) => data.json())
    return  res.result;
}

export async function getSubmissionFromUserIDByA_ID(UserID: string, A_ID: string): Promise<Submission>{
    const res = await fetch(`http://localhost:8080/api/submission/${UserID}/${A_ID}`,{ next: { revalidate: 0 }})
    .then((data) => data.json())
    return res.result;
}
