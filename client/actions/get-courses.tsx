export interface CoursesByStudentID {
    CourseID: string,
    CourseName: string,
    TutorID: string
}

export async function getCourses(id: string): Promise<CoursesByStudentID[]> {
    const res = await fetch(`${process.env.API_URL}/user/course/${id}`,{ next: { revalidate: 0 }}); // time to revalidate (refetch new data updated)
    const data = await res.json();
    return data.result;
}