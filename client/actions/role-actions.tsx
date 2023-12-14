export interface Role {
    RoleID: string,
    RoleName: string,
    RoleDescription: string
}

export async function getRole(id: String): Promise<Role> {
    const res = await fetch(`http://localhost:8080/api/role/${id}`,{ next: { revalidate: 0 }}); // time to revalidate (refetch new data updated)
    const data = await res.json();
    return data.result;
}

export async function getRoles(): Promise<Role[]> {
    const res = await fetch(`http://localhost:8080/api/role`,{ next: { revalidate: 0 }}); // time to revalidate (refetch new data updated)
    const data = await res.json();
    return data.result;
}
