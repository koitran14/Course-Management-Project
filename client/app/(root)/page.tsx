"use client";

import { useEffect } from "react";
import useAuth from '@/hooks/useAuth';
import { redirect } from 'next/navigation'

const SetupPage = () => {
    const {auth} = useAuth();
    useEffect(() =>{
        if (!auth){
            redirect('/login');
        } else {
            redirect(`/${auth.userID}`);
        }
    })
    return null;
}
 
export default SetupPage;