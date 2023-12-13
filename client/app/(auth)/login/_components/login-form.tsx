"use client"

import { useRef, useState, useEffect, FormEvent } from 'react';
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation';
import { getUserByLoginId } from '@/actions/user-actions';
import { getRole } from '@/actions/role-actions';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useAuth from '@/hooks/useAuth'

const Login = () => {
    const { setAuth } = useAuth();
    const router = useRouter();
    const userRef = useRef<HTMLInputElement>(null);
    
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(user, pwd);
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: user, password: pwd }),
            });

            if (!response.ok) {
                if (response.status === 409) {
                    toast.error('Missing username or password.');
                } else if (response.status === 500) {
                    toast.error('Internal server error. Please try again.');
                } else {
                  toast.error('An error occurred. Please try again later.');
                }    
                throw new Error('Network response was not ok');            
            }

            const data = await response.json();
            console.log('Response:', data);
            console.log(data.LoginID)
            const userInfo = await getUserByLoginId(data.LoginID as string);
            console.log(userInfo);
            const userID = userInfo.UserID;
            const role = await getRole(userInfo.LoginID);
            setAuth({ userID, user, pwd, role })
            // Further actions with the data received
        } catch (error) {
            console.log('There was a problem with the fetch operation:', error);
        }
    };
    

    return (
        <section className='w-[300px] h-fit'>
            <div className='h-fit w-full px-3 flex flex-col gap-y-3'>
                <h1 className='text-3xl font-semibold'>Sign In</h1>
                <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <Input 
                        type="text" 
                        id="username"
                        ref={userRef}
                        autoComplete='off' 
                        onChange={(e) => setUser(e.target.value)}  
                        value={user}
                        required  
                    />

                    <label htmlFor="password">Password:</label>
                    <Input 
                        type='password'
                        id='password'
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <Button className='bg-blue-800 hover:opacity-90 hover:bg-blue-800 hover:shadow-md hover:shadow-zinc-400/70'>Sign In</Button>
                </form>
                <span className='relative w-full border-b-2 border-zinc-500/50'/>
                <Button className='bg-white border-2 border-indigo-500/50 text-indigo-800 hover:opacity-90 hover:bg-white hover:shadow-md hover:shadow-zinc-700/50'
                    onClick={() => router.push('/register')}
                >Register</Button>
            </div>
        </section>
    )
}

export default Login;