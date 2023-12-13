"use client";

import { useEffect } from "react";
import useAuth from '@/hooks/useAuth';
import { redirect } from 'next/navigation'

const SetupPage = () => {
    const {auth} = useAuth();
    useEffect(() => {
        if (auth.user === undefined){
            redirect('/login');
        } else {
            redirect(`/${auth.userID}`);
        }
    },[auth])
    
    return null;
}
 
export default SetupPage;