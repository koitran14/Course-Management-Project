import { Course } from "./get-course";

export async function getCourses(id: String): Promise<Course[]> {
    const res = await fetch(`http://localhost:8080/api/${id}/course`,{ next: { revalidate: 0 }}); // time to revalidate (refetch new data updated)
    const data = await res.json();
    return data.result;
}