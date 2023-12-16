export interface Assignment{
    A_ID: string ,
    A_Title: string,
    A_Desc: string,
    A_StartAt: Date,
    A_DueDate: Date,
    CourseID: string,
}


export async function getAssignmentByID(id: string): Promise<Assignment> {
    const res = await fetch(`http://localhost:8080/api/assignment/${id}`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return await data.result;
}

export async function getAssignmentsByCourseID(id: String): Promise<Assignment[]> {
    const res = await fetch(`http://localhost:8080/api/assignment/course/${id}`,{ next: { revalidate: 0 }}); 
    const data = await res.json();
    return data.result;
}
