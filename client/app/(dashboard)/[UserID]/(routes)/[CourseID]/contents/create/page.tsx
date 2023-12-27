"use client"

import { Title } from "@/components/ui/title";
import ContentForm from "./_component/content-form";
import { useState } from 'react'
import { getUser } from "@/actions/user-actions";
import { getRole } from "@/actions/role-actions";
import { useParams, useRouter } from "next/navigation";

const ContentCreationPage =  () => {
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
            <Title classname="py-3 pl-5">Create new content</Title>
            <ContentForm />
        </div>
    );
}
 
export default ContentCreationPage;