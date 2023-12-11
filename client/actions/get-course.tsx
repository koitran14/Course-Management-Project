export interface Course {
    CourseID: string,
    CourseName: string,
    TutorID: string, 
    DeptID: string
}

export async function getCourse(id: String): Promise<Course> {
    const res = await fetch(`http://localhost:8080/api/course/${id}`,{ next: { revalidate: 0 }}); // time to revalidate (refetch new data updated)
    const data = await res.json();
    return data.result;
}