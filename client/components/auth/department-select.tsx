import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { getDepartments, Department } from "@/actions/department-actions";

const DeptSelect = ({
    deptFromUser, 
    onChange
}: {
    deptFromUser?: Department 
    onChange: React.Dispatch<React.SetStateAction<Department | undefined>>
}) => {
    const [dept, setDepts] = useState<Department[]>([]);
    const [selectedDept, setSelectedDept] = useState<Department | undefined>();

    useEffect(() => {
        async function fetchDepts() {
            try {
                const fetchedDepts: Department[] = await getDepartments();
                setDepts(fetchedDepts);
            } catch (error) {
                // Handle error in fetching roles
                console.error("Error fetching roles:", error);
            }
        }
        fetchDepts();
    }, []);

    const handleRoleSelect = (selectedDeptId: string) => {
        const foundDept = dept.find(dept => dept.DeptID === selectedDeptId);
        setSelectedDept(foundDept);
        onChange(foundDept); // Update the selected dept ID in the parent component
    }

    return (
        <Select onValueChange={handleRoleSelect} value={selectedDept?.DeptID} defaultValue={deptFromUser?.DeptName}>
            <SelectTrigger>
                <SelectValue placeholder="Pick a major" />
            </SelectTrigger>
            <SelectContent>
                {dept.map((dept) => (
                    <SelectItem key={dept.DeptID} value={dept.DeptID}>
                        {dept.DeptName}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
 
export default DeptSelect;