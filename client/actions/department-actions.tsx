export interface Department {
    DeptID: string,
    DeptName: string
}

export async function getDepartment(id: string): Promise<Department> {
    const res = await fetch(`http://localhost:8080/api/department/${id}`,{ next: { revalidate: 0 }}); // time to revalidate (refetch new data updated)
    const data = await res.json();
    return data.result;
}

export async function getDepartments(): Promise<Department[]> {
    const res = await fetch(`http://localhost:8080/api/department`,{ next: { revalidate: 0 }}); // time to revalidate (refetch new data updated)
    const data = await res.json();
    return data.result;
}
