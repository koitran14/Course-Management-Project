"use client"

import { Title } from "@/components/ui/title";
import AssignmentForm from "./_component/assignment-form";
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation'
import { getUser } from "@/actions/user-actions";
import { getRole } from "@/actions/role-actions";
const AsPage =  () => {
    const [role, setRole] = useState('');
    const params = useParams();
    const router = useRouter();

    const getDataAsRole = async() => {
        const user = await getUser(params.UserID as string);
        const roleData = await getRole(user.RoleID as string);
        setRole(roleData.RoleName);
        if (roleData.RoleName !== 'Teacher'){
            router.back();
        }
        return null;
    }
    getDataAsRole();

    
    return (
        <div className="py-5 md:px-12 px-6">
            <Title classname="py-3 pl-5">Create new assignment</Title>
            <AssignmentForm />
        </div>
    );
}
 
export default AsPage;