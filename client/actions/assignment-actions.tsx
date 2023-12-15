export interface Assignment{
    A_ID: string,
    A_Title: string,
    A_Desc: string,
    A_StartAt: Date,
    A_DueDate: Date,
    A_TextSubmission: string,
    A_Comment: string,
    CourseID: string
 }
 
 export async function getAssignment(id: string): Promise<Assignment> {
     const res = await fetch(`http://localhost:8080/api/assignment/${id}`,{ next: { revalidate: 0 }}); 
     const data = await res.json();
     return await data.result;
 
 }
 
 
 export async function getAssignments(id: String): Promise<Assignment[]> {
     const res = await fetch(`http://localhost:8080/api/student/${id}/assignment`,{ next: { revalidate: 0 }}); 
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