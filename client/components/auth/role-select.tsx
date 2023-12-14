import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { getRoles, Role } from "@/actions/role-actions";

const RoleSelect = ({
    roleFromUser, 
    onChange
}: {
    roleFromUser?: Role 
    onChange: React.Dispatch<React.SetStateAction<Role | undefined>>
}) => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRole, setSelectedRole] = useState<Role | undefined>();

    useEffect(() => {
        async function fetchRoles() {
            try {
                const fetchedRoles: Role[] = await getRoles();
                setRoles(fetchedRoles);
            } catch (error) {
                // Handle error in fetching roles
                console.error("Error fetching roles:", error);
            }
        }
        fetchRoles();
    }, []);

    const handleRoleSelect = (selectedRoleID: string) => {
        const foundRole = roles.find(role => role.RoleID === selectedRoleID);
        console.log(foundRole);
        setSelectedRole(foundRole);
        onChange(foundRole); // Update the selected role ID in the parent component
        
    }

    return (
        <Select onValueChange={handleRoleSelect} value={selectedRole?.RoleID} defaultValue={roleFromUser?.RoleName}>
            <SelectTrigger>
                <SelectValue placeholder="Pick a role" />
            </SelectTrigger>
            <SelectContent>
                {roles.map((role) => (
                    <SelectItem key={role.RoleID} value={role.RoleID}>
                        {role.RoleName}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
 
export default RoleSelect;